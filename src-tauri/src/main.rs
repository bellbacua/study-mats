// Study Mats desktop app. The web app runs inside the window; these three
// commands load and save its SQLite progress file, and a dated backup is made
// once a day when the app starts.
//
// Files (Windows): %APPDATA%\com.bellbacua.studymats\
//   study_mats.db            your progress (same format as data/study_mats.db)
//   backups\study_mats-YYYY-MM-DD.db   the last 30 daily copies
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::fs;
use std::path::PathBuf;
use std::time::{SystemTime, UNIX_EPOCH};
use tauri::ipc::{InvokeBody, Request, Response};
use tauri::{AppHandle, Manager};

const KEEP_BACKUPS: usize = 30;

fn data_dir(app: &AppHandle) -> Result<PathBuf, String> {
    let dir = app.path().app_data_dir().map_err(|e| e.to_string())?;
    fs::create_dir_all(&dir).map_err(|e| e.to_string())?;
    Ok(dir)
}

fn db_file(app: &AppHandle) -> Result<PathBuf, String> {
    Ok(data_dir(app)?.join("study_mats.db"))
}

#[tauri::command]
fn load_db(app: AppHandle) -> Result<Response, String> {
    let path = db_file(&app)?;
    let bytes = if path.exists() { fs::read(&path).map_err(|e| e.to_string())? } else { Vec::new() };
    Ok(Response::new(bytes))
}

#[tauri::command]
fn save_db(app: AppHandle, request: Request<'_>) -> Result<(), String> {
    let InvokeBody::Raw(bytes) = request.body() else {
        return Err("expected the database as raw bytes".into());
    };
    // A real SQLite file starts with this header; never overwrite with junk.
    if bytes.len() < 100 || !bytes.starts_with(b"SQLite format 3\0") {
        return Err("refusing to save: not a SQLite database".into());
    }
    let path = db_file(&app)?;
    let tmp = path.with_extension("db.tmp");
    fs::write(&tmp, bytes).map_err(|e| e.to_string())?;
    fs::rename(&tmp, &path).map_err(|e| e.to_string())?;
    Ok(())
}

#[tauri::command]
fn db_path(app: AppHandle) -> Result<String, String> {
    Ok(db_file(&app)?.display().to_string())
}

// Days since 1970-01-01 → (year, month, day), from Howard Hinnant's
// civil-from-days algorithm.
fn civil(days: i64) -> (i64, u32, u32) {
    let z = days + 719_468;
    let era = z.div_euclid(146_097);
    let doe = z.rem_euclid(146_097);
    let yoe = (doe - doe / 1_460 + doe / 36_524 - doe / 146_096) / 365;
    let doy = doe - (365 * yoe + yoe / 4 - yoe / 100);
    let mp = (5 * doy + 2) / 153;
    let d = (doy - (153 * mp + 2) / 5 + 1) as u32;
    let m = if mp < 10 { mp + 3 } else { mp - 9 } as u32;
    (yoe + era * 400 + i64::from(m <= 2), m, d)
}

fn daily_backup(app: &AppHandle) -> Result<(), String> {
    let db = db_file(app)?;
    if !db.exists() {
        return Ok(());
    }
    let dir = data_dir(app)?.join("backups");
    fs::create_dir_all(&dir).map_err(|e| e.to_string())?;
    let secs = SystemTime::now().duration_since(UNIX_EPOCH).map_err(|e| e.to_string())?.as_secs() as i64;
    let (y, m, d) = civil((secs + 8 * 3600).div_euclid(86_400)); // Philippine time
    let target = dir.join(format!("study_mats-{y:04}-{m:02}-{d:02}.db"));
    if !target.exists() {
        fs::copy(&db, &target).map_err(|e| e.to_string())?;
    }
    let mut old: Vec<PathBuf> = fs::read_dir(&dir)
        .map_err(|e| e.to_string())?
        .filter_map(|e| e.ok().map(|e| e.path()))
        .filter(|p| p.file_name().and_then(|n| n.to_str()).is_some_and(|n| n.starts_with("study_mats-") && n.ends_with(".db")))
        .collect();
    old.sort();
    while old.len() > KEEP_BACKUPS {
        let _ = fs::remove_file(old.remove(0));
    }
    Ok(())
}

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            if let Err(e) = daily_backup(app.handle()) {
                eprintln!("backup skipped: {e}");
            }
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![load_db, save_db, db_path])
        .run(tauri::generate_context!())
        .expect("error while running Study Mats");
}

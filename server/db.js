import { DatabaseSync } from 'node:sqlite';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { configureDb } from './dbCore.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.resolve(__dirname, '../data');
const DB_PATH = process.env.STUDY_DB_PATH || path.join(DATA_DIR, 'study_mats.db');

configureDb({
  open() {
    if (!fs.existsSync(path.dirname(DB_PATH))) fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
    const db = new DatabaseSync(DB_PATH);
    db.exec('PRAGMA journal_mode = WAL;');
    db.exec('PRAGMA foreign_keys = ON;');
    return db;
  },
  info() {
    let fileSizeBytes = 0;
    try {
      if (fs.existsSync(DB_PATH)) fileSizeBytes = fs.statSync(DB_PATH).size;
    } catch {
      // ignore
    }
    return { dbPath: DB_PATH, fileSizeBytes };
  },
});

export * from './dbCore.js';

import {
  getProgress,
  saveProgress,
  passLesson,
  completeLab,
  toggleReading,
  saveBrainDump,
  saveLessonNote,
  noteVersions,
  saveExamResult,
  saveReviewCard,
  logStudyDay,
  updateSettings,
  resetProgress,
  getStats,
} from './db.js';

function sendJson(res, statusCode, data) {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.end(JSON.stringify(data));
}

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
      if (body.length > 2 * 1024 * 1024) {
        req.destroy();
        reject(new Error('Payload too large'));
      }
    });
    req.on('end', () => {
      if (!body) return resolve({});
      try {
        resolve(JSON.parse(body));
      } catch {
        reject(new Error('Invalid JSON format'));
      }
    });
    req.on('error', reject);
  });
}

export async function handleApiRequest(req, res, next) {
  const url = new URL(req.url, 'http://localhost');
  const pathname = url.pathname;

  if (!pathname.startsWith('/api')) {
    if (next) return next();
    res.statusCode = 404;
    return res.end('Not found');
  }

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.end();
  }

  try {
    // Health & Stats
    if (pathname === '/api/health' && req.method === 'GET') {
      const stats = getStats();
      return sendJson(res, 200, {
        status: 'ok',
        storage: 'sqlite',
        ...stats,
      });
    }

    if (pathname === '/api/stats' && req.method === 'GET') {
      const stats = getStats();
      return sendJson(res, 200, { success: true, ...stats });
    }

    // Get all progress
    if (pathname === '/api/progress' && req.method === 'GET') {
      const progress = getProgress();
      return sendJson(res, 200, { success: true, ...progress });
    }

    // Save full or partial progress / sync from client
    if (pathname === '/api/progress' && (req.method === 'POST' || req.method === 'PUT')) {
      const body = await parseBody(req);
      const updated = saveProgress(body);
      return sendJson(res, 200, { success: true, progress: updated });
    }

    // Pass a lesson gate
    if (pathname === '/api/progress/pass-lesson' && req.method === 'POST') {
      const body = await parseBody(req);
      if (!body.lessonId) {
        return sendJson(res, 400, { error: 'lessonId is required' });
      }
      const result = passLesson(body.lessonId, body.score ?? 100, body.passedAt);
      return sendJson(res, 200, { success: true, result });
    }

    // Complete a visual lab
    if (pathname === '/api/progress/complete-lab' && req.method === 'POST') {
      const body = await parseBody(req);
      if (!body.lessonId) {
        return sendJson(res, 400, { error: 'lessonId is required' });
      }
      const result = completeLab(body.lessonId, body.completed !== false);
      return sendJson(res, 200, { success: true, result });
    }

    // Toggle reading done
    if (pathname === '/api/progress/toggle-reading' && req.method === 'POST') {
      const body = await parseBody(req);
      if (!body.readingId) {
        return sendJson(res, 400, { error: 'readingId is required' });
      }
      const result = toggleReading(body.readingId, Boolean(body.completed));
      return sendJson(res, 200, { success: true, result });
    }

    // Save brain dump notes
    if (pathname === '/api/progress/brain-dump' && req.method === 'POST') {
      const body = await parseBody(req);
      const notes = body.notes ?? body.brainDump ?? '';
      saveBrainDump(notes);
      return sendJson(res, 200, { success: true, notes });
    }

    // Record a finished quiz or exam
    if (pathname === '/api/progress/exam' && req.method === 'POST') {
      const body = await parseBody(req);
      if (!body.examId) return sendJson(res, 400, { error: 'examId is required' });
      const result = saveExamResult(String(body.examId), Number(body.score) || 0, Number(body.total) || 0, body.detail);
      return sendJson(res, 200, { success: true, result });
    }

    // Move one question along the spaced-review ladder
    if (pathname === '/api/progress/review' && req.method === 'POST') {
      const body = await parseBody(req);
      if (!body.cardId || !body.lessonId) return sendJson(res, 400, { error: 'cardId and lessonId are required' });
      if (!/^\d{4}-\d{2}-\d{2}$/.test(String(body.due))) return sendJson(res, 400, { error: 'due must be YYYY-MM-DD' });
      const result = saveReviewCard(String(body.cardId), String(body.lessonId), Number(body.box) || 0, body.due, Number(body.lapses) || 0);
      return sendJson(res, 200, { success: true, result });
    }

    // Count study activity for the calendar / streak
    if (pathname === '/api/progress/activity' && req.method === 'POST') {
      const body = await parseBody(req);
      if (!/^\d{4}-\d{2}-\d{2}$/.test(String(body.day))) return sendJson(res, 400, { error: 'day must be YYYY-MM-DD' });
      const result = logStudyDay(body.day, Number(body.actions) || 0, Number(body.minutes) || 0);
      return sendJson(res, 200, { success: true, result });
    }

    // Save notes for one lesson
    if (pathname === '/api/progress/lesson-note' && req.method === 'POST') {
      const body = await parseBody(req);
      if (!body.lessonId) {
        return sendJson(res, 400, { error: 'lessonId is required' });
      }
      const at = Number(body.at) || Date.now();
      const result = saveLessonNote(String(body.lessonId), String(body.notes ?? ''), at);
      return sendJson(res, 200, { success: true, result });
    }

    // Earlier versions of one lesson's notes (newest first)
    if (pathname === '/api/progress/note-versions' && req.method === 'GET') {
      const id = url.searchParams.get('lessonId');
      if (!id) return sendJson(res, 400, { error: 'lessonId is required' });
      return sendJson(res, 200, { success: true, versions: noteVersions(id) });
    }

    // Update app settings
    if (pathname === '/api/progress/settings' && req.method === 'POST') {
      const body = await parseBody(req);
      const updated = updateSettings(body);
      return sendJson(res, 200, { success: true, settings: updated });
    }

    // Reset all progress
    if (pathname === '/api/progress/reset' && req.method === 'POST') {
      const resetData = resetProgress();
      return sendJson(res, 200, { success: true, progress: resetData });
    }

    // Route not recognized
    return sendJson(res, 404, { error: `API endpoint not found: ${pathname}` });
  } catch (error) {
    console.error('API Error:', error);
    return sendJson(res, 500, { error: error.message || 'Internal server error' });
  }
}

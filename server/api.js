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
} from './dbCore.js';

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

// The API as a plain function, so the desktop app can call it without a
// web server: route(method, pathname, searchParams, body) → { status, data }.
const reply = (status, data) => ({ status, data });

export function route(method, pathname, searchParams, body = {}) {
  // Health & Stats
  if (pathname === '/api/health' && method === 'GET') {
    const stats = getStats();
    return reply(200, {
      status: 'ok',
      storage: 'sqlite',
      ...stats,
    });
  }

  if (pathname === '/api/stats' && method === 'GET') {
    const stats = getStats();
    return reply(200, { success: true, ...stats });
  }

  // Get all progress
  if (pathname === '/api/progress' && method === 'GET') {
    const progress = getProgress();
    return reply(200, { success: true, ...progress });
  }

  // Save full or partial progress / sync from client
  if (pathname === '/api/progress' && (method === 'POST' || method === 'PUT')) {
    
    const updated = saveProgress(body);
    return reply(200, { success: true, progress: updated });
  }

  // Pass a lesson gate
  if (pathname === '/api/progress/pass-lesson' && method === 'POST') {
    
    if (!body.lessonId) {
      return reply(400, { error: 'lessonId is required' });
    }
    const result = passLesson(body.lessonId, body.score ?? 100, body.passedAt);
    return reply(200, { success: true, result });
  }

  // Complete a visual lab
  if (pathname === '/api/progress/complete-lab' && method === 'POST') {
    
    if (!body.lessonId) {
      return reply(400, { error: 'lessonId is required' });
    }
    const result = completeLab(body.lessonId, body.completed !== false);
    return reply(200, { success: true, result });
  }

  // Toggle reading done
  if (pathname === '/api/progress/toggle-reading' && method === 'POST') {
    
    if (!body.readingId) {
      return reply(400, { error: 'readingId is required' });
    }
    const result = toggleReading(body.readingId, Boolean(body.completed));
    return reply(200, { success: true, result });
  }

  // Save brain dump notes
  if (pathname === '/api/progress/brain-dump' && method === 'POST') {
    
    const notes = body.notes ?? body.brainDump ?? '';
    saveBrainDump(notes);
    return reply(200, { success: true, notes });
  }

  // Record a finished quiz or exam
  if (pathname === '/api/progress/exam' && method === 'POST') {
    
    if (!body.examId) return reply(400, { error: 'examId is required' });
    const result = saveExamResult(String(body.examId), Number(body.score) || 0, Number(body.total) || 0, body.detail);
    return reply(200, { success: true, result });
  }

  // Move one question along the spaced-review ladder
  if (pathname === '/api/progress/review' && method === 'POST') {
    
    if (!body.cardId || !body.lessonId) return reply(400, { error: 'cardId and lessonId are required' });
    if (!/^\d{4}-\d{2}-\d{2}$/.test(String(body.due))) return reply(400, { error: 'due must be YYYY-MM-DD' });
    const result = saveReviewCard(String(body.cardId), String(body.lessonId), Number(body.box) || 0, body.due, Number(body.lapses) || 0);
    return reply(200, { success: true, result });
  }

  // Count study activity for the calendar / streak
  if (pathname === '/api/progress/activity' && method === 'POST') {
    
    if (!/^\d{4}-\d{2}-\d{2}$/.test(String(body.day))) return reply(400, { error: 'day must be YYYY-MM-DD' });
    const result = logStudyDay(body.day, Number(body.actions) || 0, Number(body.minutes) || 0);
    return reply(200, { success: true, result });
  }

  // Save notes for one lesson
  if (pathname === '/api/progress/lesson-note' && method === 'POST') {
    
    if (!body.lessonId) {
      return reply(400, { error: 'lessonId is required' });
    }
    const at = Number(body.at) || Date.now();
    const result = saveLessonNote(String(body.lessonId), String(body.notes ?? ''), at);
    return reply(200, { success: true, result });
  }

  // Earlier versions of one lesson's notes (newest first)
  if (pathname === '/api/progress/note-versions' && method === 'GET') {
    const id = searchParams.get('lessonId');
    if (!id) return reply(400, { error: 'lessonId is required' });
    return reply(200, { success: true, versions: noteVersions(id) });
  }

  // Update app settings
  if (pathname === '/api/progress/settings' && method === 'POST') {
    
    const updated = updateSettings(body);
    return reply(200, { success: true, settings: updated });
  }

  // Reset all progress
  if (pathname === '/api/progress/reset' && method === 'POST') {
    const resetData = resetProgress();
    return reply(200, { success: true, progress: resetData });
  }

  // Route not recognized
  return reply(404, { error: `API endpoint not found: ${pathname}` });
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
    const body = req.method === 'GET' ? {} : await parseBody(req);
    const { status, data } = route(req.method, pathname, url.searchParams, body);
    return sendJson(res, status, data);
  } catch (error) {
    console.error('API Error:', error);
    return sendJson(res, 500, { error: error.message || 'Internal server error' });
  }
}

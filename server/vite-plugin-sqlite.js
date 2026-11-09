import './db.js'; // opens data/study_mats.db with node:sqlite
import { handleApiRequest } from './api.js';

export function sqliteApiPlugin() {
  return {
    name: 'vite-plugin-sqlite',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url && req.url.startsWith('/api')) {
          await handleApiRequest(req, res, next);
        } else {
          next();
        }
      });
    },
    configurePreviewServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url && req.url.startsWith('/api')) {
          await handleApiRequest(req, res, next);
        } else {
          next();
        }
      });
    },
  };
}

export default sqliteApiPlugin;

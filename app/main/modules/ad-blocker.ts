import fs from 'fs';
import path from 'path';
import type { Session } from 'electron';

const DEFAULT_FILTERS = ['ads', 'tracking'];

export async function createAdBlocker() {
  const rules = new Set<string>();

  async function loadLists() {
    const listsDir = path.join(appRoot(), 'app', 'main', 'rules');
    if (!fs.existsSync(listsDir)) {
      return;
    }

    for (const file of fs.readdirSync(listsDir)) {
      const filePath = path.join(listsDir, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      content
        .split('\n')
        .map((line) => line.trim())
        .filter((line) => line && !line.startsWith('!'))
        .forEach((line) => rules.add(line));
    }
  }

  function appRoot() {
    return process.cwd();
  }

  await loadLists();

  function shouldBlock(url: string) {
    return Array.from(rules).some((rule) => url.includes(rule));
  }

  function attach(session: Session) {
    session.webRequest.onBeforeRequest((details, callback) => {
      if (shouldBlock(details.url)) {
        callback({ cancel: true });
        return;
      }

      callback({ cancel: false });
    });
  }

  return {
    attach,
    defaultFilters: DEFAULT_FILTERS
  };
}

import { protocol } from 'electron';
import path from 'path';
import fs from 'fs';

export function registerExtensionProtocol() {
  protocol.registerSchemesAsPrivileged([
    {
      scheme: 'hypergx-extension',
      privileges: {
        secure: true,
        supportFetchAPI: true,
        corsEnabled: true
      }
    }
  ]);

  protocol.registerFileProtocol('hypergx-extension', (request, callback) => {
    const url = request.url.replace('hypergx-extension://', '');
    const extensionPath = path.join(process.cwd(), 'ext', url);
    const normalized = path.normalize(extensionPath);

    if (!normalized.startsWith(path.join(process.cwd(), 'ext'))) {
      callback({ error: -6 });
      return;
    }

    if (!fs.existsSync(normalized)) {
      callback({ error: -6 });
      return;
    }

    callback({ path: normalized });
  });
}

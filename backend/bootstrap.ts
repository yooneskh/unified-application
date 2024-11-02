import { Config } from 'config';
import { ensureFile } from '@std/fs';
import { bootstrap as bootstrapDatabase } from 'unified-kv';
import { createApp } from './app.ts';


await ensureFile(Config.database.path);
await bootstrapDatabase(Config.database.path);


const app = createApp();

app.listen({
  port: Config.http.port,
});

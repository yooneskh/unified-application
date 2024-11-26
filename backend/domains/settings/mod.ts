import { IUnifiedApp } from 'unified-app';
import { install as installApplicationSettings } from './application-settings.ts';


export function install(app: IUnifiedApp) {
  installApplicationSettings(app);
}

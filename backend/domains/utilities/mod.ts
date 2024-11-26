import { IUnifiedApp } from 'unified-app';


export function install(app: IUnifiedApp) {
  app.addActions({
    'get-admin-header-links': {
      method: 'get',
      path: '/admin/header/links',
      handler: () => {      
        return [
          {
            label: 'Dashboard',
            to: { name: 'admin.dashboard' },
          },
          {
            label: 'User Control',
            children: [
              {
                label: 'Users',
                to: { name: 'admin.resources', params: { resourceIdentifier: 'users' } },
              },
            ],
          },
          {
            label: 'Settings',
            children: [
              {
                label: 'Application Settings',
                to: { name: 'admin.settings', params: { settingIdentifier: 'application-settings' } },
              },
            ],
          },
        ];
      },
    },
  });
}
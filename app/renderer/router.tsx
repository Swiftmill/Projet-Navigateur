import { createHashRouter } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { BrowserPage } from './pages/BrowserPage';
import { NewTabPage } from './pages/NewTabPage';
import { SettingsPage } from './pages/SettingsPage';
import { GXCornerPage } from './pages/GXCornerPage';
import { ThemeSettings } from './components/settings/ThemeSettings';
import { GXControlSettings } from './components/settings/GXControlSettings';
import { PrivacySettings } from './components/settings/PrivacySettings';
import { PerformanceSettings } from './components/settings/PerformanceSettings';
import { ExtensionsSettings } from './components/settings/ExtensionsSettings';

export const router = createHashRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <BrowserPage />
      },
      {
        path: 'new-tab',
        element: <NewTabPage />
      },
      {
        path: 'settings',
        element: <SettingsPage />,
        children: [
          { index: true, element: <ThemeSettings /> },
          { path: 'themes', element: <ThemeSettings /> },
          { path: 'gx-control', element: <GXControlSettings /> },
          { path: 'privacy', element: <PrivacySettings /> },
          { path: 'performance', element: <PerformanceSettings /> },
          { path: 'extensions', element: <ExtensionsSettings /> }
        ]
      },
      {
        path: 'gx-corner',
        element: <GXCornerPage />
      }
    ]
  }
]);

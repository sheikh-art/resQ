import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.resq.app',
  appName: 'ResQ',
  webDir: 'dist/public',
  server: {
    androidScheme: 'https',
  },
  android: {
    backgroundColor: '#0a0e1f',
  },
};

export default config;

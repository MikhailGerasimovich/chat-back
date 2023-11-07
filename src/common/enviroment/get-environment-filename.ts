import { ENV } from './env.constant';

export function getEnvironmentFilename(env: string) {
  if (!env) {
    return '.env';
  }

  switch (env.trim()) {
    case ENV.DEV:
      return '.env';
    case ENV.PROD:
      return '.envProduction';
    default:
      return '.env';
  }
}

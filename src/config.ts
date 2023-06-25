import dotenv from 'dotenv';

interface EnvFiles {
    [key: string]: string;
  }

const envFiles:EnvFiles = {
  local: '.env.local',
  development: '.env.dev',
  production: '.env.prod',
};

const getEnvironment = (): string => {
  const environment = process.env.NODE_ENV || 'local';
  return environment.toLowerCase();
};

const config = (): void => {
  const environment = getEnvironment();
  const path = envFiles[environment];
  dotenv.config({ path });
};

export default config;

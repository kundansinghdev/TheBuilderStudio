import { AppConfig, Environment } from '@/types';

// Environment detection
const getEnvironment = (): Environment => {
  const env = process.env.NODE_ENV;
  if (env === 'production') return 'production';
  if (env === 'test') return 'test';
  if (env === 'staging') return 'staging';
  return 'development';
};

// Base configuration
const baseConfig: Omit<AppConfig, 'environment'> = {
  name: 'The Builder Studio',
  version: '1.0.0',
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
    timeout: 30000,
    retries: 3,
  },
  features: {
    analytics: process.env.NEXT_PUBLIC_ANALYTICS_ENABLED === 'true',
    notifications: process.env.NEXT_PUBLIC_NOTIFICATIONS_ENABLED === 'true',
    realtime: process.env.NEXT_PUBLIC_REALTIME_ENABLED === 'true',
    darkMode: process.env.NEXT_PUBLIC_DARK_MODE_ENABLED === 'true',
  },
  limits: {
    maxFileSize: 10 * 1024 * 1024, // 10MB
    maxUploads: 5,
    maxProjects: 10,
  },
};

// Environment-specific configurations
const environmentConfigs: Record<Environment, Partial<AppConfig>> = {
  development: {
    api: {
      baseUrl: 'http://localhost:3000/api',
      timeout: 60000,
      retries: 5,
    },
    features: {
      analytics: false,
      notifications: true,
      realtime: true,
      darkMode: true,
    },
    limits: {
      maxFileSize: 50 * 1024 * 1024, // 50MB for development
      maxUploads: 10,
      maxProjects: 50,
    },
  },
  test: {
    api: {
      baseUrl: 'http://localhost:3000/api',
      timeout: 10000,
      retries: 1,
    },
    features: {
      analytics: false,
      notifications: false,
      realtime: false,
      darkMode: false,
    },
    limits: {
      maxFileSize: 1024 * 1024, // 1MB for tests
      maxUploads: 1,
      maxProjects: 1,
    },
  },
  staging: {
    api: {
      baseUrl: process.env.NEXT_PUBLIC_API_URL || 'https://staging-api.thebuilderstudio.co',
      timeout: 30000,
      retries: 3,
    },
    features: {
      analytics: true,
      notifications: true,
      realtime: true,
      darkMode: true,
    },
    limits: {
      maxFileSize: 10 * 1024 * 1024,
      maxUploads: 5,
      maxProjects: 10,
    },
  },
  production: {
    api: {
      baseUrl: process.env.NEXT_PUBLIC_API_URL || 'https://api.thebuilderstudio.co',
      timeout: 30000,
      retries: 3,
    },
    features: {
      analytics: true,
      notifications: true,
      realtime: true,
      darkMode: true,
    },
    limits: {
      maxFileSize: 10 * 1024 * 1024,
      maxUploads: 5,
      maxProjects: 10,
    },
  },
};

// Merge configurations
const mergeConfig = (base: any, env: any): any => {
  const result = { ...base };
  for (const key in env) {
    if (typeof env[key] === 'object' && env[key] !== null && !Array.isArray(env[key])) {
      result[key] = mergeConfig(result[key] || {}, env[key]);
    } else {
      result[key] = env[key];
    }
  }
  return result;
};

// Create final configuration
const environment = getEnvironment();
const envConfig = environmentConfigs[environment];
const config: AppConfig = mergeConfig(baseConfig, envConfig) as AppConfig;
config.environment = environment;

// Export configuration
export default config;

// Export individual configuration sections
export const apiConfig = config.api;
export const featuresConfig = config.features;
export const limitsConfig = config.limits;

// Export environment helpers
export const isDevelopment = environment === 'development';
export const isProduction = environment === 'production';
export const isTest = environment === 'test';
export const isStaging = environment === 'staging';

// Export feature flags
export const isAnalyticsEnabled = config.features.analytics;
export const isNotificationsEnabled = config.features.notifications;
export const isRealtimeEnabled = config.features.realtime;
export const isDarkModeEnabled = config.features.darkMode;

// Export limits
export const maxFileSize = config.limits.maxFileSize;
export const maxUploads = config.limits.maxUploads;
export const maxProjects = config.limits.maxProjects;

// Export API configuration
export const apiBaseUrl = config.api.baseUrl;
export const apiTimeout = config.api.timeout;
export const apiRetries = config.api.retries;

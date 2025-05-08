export const MAX_NAME_LENGTH = 40;
export const DEFAULT_API_ERROR = 'Error while making request';
export const ACCESS_TOKEN = 'token';
export const AUTH_USER = 'user';
export const TOAST_DELAY = 5000;

export const HTTP_ERRORS = Object.freeze({
  400: 'Bad Request',
  401: 'Un-Authorized',
  403: 'Forbidden',
  404: 'Not Found',
  409: 'Conflict',
  500: 'Internal Server Error',
});

export const TOAST_HEADERS = Object.freeze({
  SUCCESS: 'success',
  WARN: 'warn',
  ERROR: 'error',
});

export const DRIVER_STATUSES = [
  { type: 'APPROVED', value: 'Approved' },
  { type: 'SUSPENDED', value: 'Suspended' },
  { type: 'ACTION_REQUIRED', value: 'Action Required' },
  { type: 'IN_REVIEW', value: 'In Review' },
];

export const ADMIN_REGIONS = [
  { type: 'PK', value: 'Pakistan' },
  { type: 'UK', value: 'United Kingdom' },
  { type: 'KSA', value: 'Saudi Arabia' },
  { type: 'USA', value: 'United States' },
];

export const MODAL_ACTIONS = Object.freeze({
  CONFIRM: 'confirm',
  CLOSE: 'close',
});

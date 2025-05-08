export const AUTH_API_ROUTES = Object.freeze({
  MAIN: 'admin',
  LOGIN: 'login',
  VERIFY_OTP: 'verify-otp',
  RESEND_OTP: 'resend-otp',
});

export const ADMIN_API_ROUTES = Object.freeze({
  GET_ALL: 'admin/list',
  CREATE: 'admin',
  UPDATE: (id: string) => `admin/${id}`,
});

export const DRIVER_API_ROUTES = Object.freeze({
  ADD_DRIVER: 'driver',
  ADMIN_ALL_DRIVERS: 'driver/admin/all',
  UPDATE_DRIVER_STATUS: (id: string) => `driver/admin/status/${id}`,
});

export const CONFIG_API_ROUTES = Object.freeze({
  MAIN: 'config',
  UPDATE: (regionCode: string) => `config/${regionCode}`,
});

export const VEHICLE_API_ROUTES = Object.freeze({
  ADD_VEHICLE: 'vehicle',
});

export const IMAGE_API_ROUTES = Object.freeze({
  GET_SIGNED_URL: (id: string) => `image/${id}`,
});

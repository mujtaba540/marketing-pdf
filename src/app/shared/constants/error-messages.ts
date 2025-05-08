export const FORM_ERROR_MESSGAES: Record<string, (field: string) => string> = {
  required: (field: any) => `${field} is required`,
  email: (field: any) => `${field} should be valid address`,
};

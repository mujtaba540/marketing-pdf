export interface IUser {
  created_at: string;
  deleted_at: string | null;
  designation: string | null;
  email: string;
  password?: string;
  id: number;
  is_active: number;
  name: string;
  phone_number: string | null;
  supplier_id: string | null;
  updated_at: string;
}

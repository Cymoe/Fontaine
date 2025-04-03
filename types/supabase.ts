import { User } from '@supabase/supabase-js';

export interface AuthError {
  message: string;
  status?: number;
}

export interface AuthState {
  user: User | null;
  error: AuthError | null;
  loading: boolean;
}

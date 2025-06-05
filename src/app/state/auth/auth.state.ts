import { Usuario } from '../../core/services/auth.service';

export interface AuthState {
  user: Usuario | null;
}

export const initialAuthState: AuthState = {
  user: null
};

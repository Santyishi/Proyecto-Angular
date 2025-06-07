import { createReducer, on } from '@ngrx/store';
import { setUser, logout } from './auth.actions';
import { AuthState, initialAuthState } from './auth.state';

export const authReducer = createReducer(
  initialAuthState,
  on(setUser, (state, { user }) => ({ ...state, user })),
  on(logout, () => initialAuthState)
);

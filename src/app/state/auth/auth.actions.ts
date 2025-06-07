import { createAction, props } from '@ngrx/store';
import { Usuario } from '../../core/services/auth.service';

export const setUser = createAction(
  '[Auth] Set User',
  props<{ user: Usuario }>()
);
export const logout = createAction('[Auth] Logout');

import { Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const RoleGuard = (allowedRoles: string[]): CanActivateFn => {
  return () => {
    const auth = inject(AuthService);
    const router = inject(Router);
    const role = auth.getRole();

    if (role && allowedRoles.includes(role)) {
      return true;
    }

    return router.createUrlTree(['/dashboard/enrollments']);
  };
};

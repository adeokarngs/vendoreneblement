import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SessionHelperService } from '../helpers/session-helper.service';

export const authGuard: CanActivateFn = (route, state) => {

  const session = inject(SessionHelperService)
  const router = inject(Router)
  if (session.getCurrentUser()) {

    return true;
  }
  router.navigateByUrl("auth/login")
  return false
};

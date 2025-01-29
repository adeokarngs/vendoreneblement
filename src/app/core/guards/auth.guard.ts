import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { SessionHelperService } from '../helpers/session-helper.service';
import { AlertService } from '../helpers/alert.service';

export const authGuard: CanActivateFn = (route, state) => {
  const session = inject(SessionHelperService);
  const router = inject(Router);
  const alert = inject(AlertService);

  const currentUser = session.getCurrentUser();
  
  // If no user logged in
  if (!currentUser) {
    alert.error("Please login to access this page.");
    router.navigateByUrl("auth/login");
    return false;
  }

  // Collect data from entire route hierarchy
  const { roles } = getRouteData(route);
  
  // Check role permissions if specified
  if (roles.length > 0) {
    const userRole = currentUser.user?.role?.code;
    if (!userRole || !roles.includes(userRole)) {
      alert.error("You don't have permission to access this page.");
      router.navigateByUrl("/unauthorized");
      return false;
    }
  }

  return true;
};

// Helper function to collect data from route hierarchy
const getRouteData = (route: ActivatedRouteSnapshot) => {
  let roles: string[] = [];
  while (route) {
    // Aggregate roles
    if (route.data['isAccessibleTo']) {
      roles = [...new Set([...roles, ...route.data['isAccessibleTo']])];
    }

    route = route.parent!;
  }

  return { roles };
};
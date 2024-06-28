import { inject } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../services';

export const authenticationGuard = (activeRouteConfig: any) => {
  //tạm return ở đây để bypass role & login, muốn test login & roles thì xóa dòng này.
  // return true;
    const authRepository = inject(AuthenticationService);
    const router: Router = inject(Router);
    if (authRepository.isLoggedIn()) {
      // chỗ check role để cho vào parent route /admin, /student or lecturer
      const userRole = authRepository.getRole();
      if (activeRouteConfig.data.role && activeRouteConfig.data.role.indexOf(userRole) === -1) {
        router.navigate(['/']);
        return false;
      }
      return true;
    } else {
      router.navigate(['/sign-in']);
      return false;
    }
};

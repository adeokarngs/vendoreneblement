import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { SessionHelperService } from '../helpers/session-helper.service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  //Whitelisted Urls to bypass token
  const whitelist: Array<string> = [];

  // Check if the request URL matches any whitelist pattern
  const isWhitelisted = whitelist.some((url) => req.url.includes(url));
  const _session = inject(SessionHelperService);
  if (_session.$isLoggedIn.getValue() == true && !isWhitelisted) {
    const token = _session.getCurrentUser()?.token?.value;
    if (token) {
      let cloneRequest = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`),
      });
      return next(cloneRequest);
    }
  }

  return next(req);
};

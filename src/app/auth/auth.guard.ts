import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanLoad,
  Route,
  Router,
  UrlSegment,
} from '@angular/router';
import { Observable } from 'rxjs';
import { skipWhile, take, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanLoad {
  constructor(private authService: AuthService, private route: Router) {}
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.signedIn$.pipe(
      skipWhile((value) => value === null),
      // Tricks subscribers to think that the Observable is complete
      // Section 23 - Lesson 316
      take(1),
      tap((authenticated) => {
        if (!authenticated) {
          this.route.navigateByUrl('/');
        }
      })
    );
  }
}

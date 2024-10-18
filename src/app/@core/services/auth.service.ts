import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { KEY_STORAGE_USER, KEY_STORAGE_USER_JWT } from '../constant';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser = signal<User | null>(null);

  constructor(private router: Router) {}

  async initializeUser() {
    const user = localStorage.getItem(KEY_STORAGE_USER);
    const jwt = localStorage.getItem(KEY_STORAGE_USER_JWT);
    if (user && jwt) {
      this.setCurrentUser({ payload: JSON.parse(user), raw: JSON.parse(jwt) });
    }
  }

  decodeJwt(jwt: string) {
    let token: any = {};
    token.raw = jwt;
    token.header = JSON.parse(window.atob(jwt.split('.')[0]));
    token.payload = JSON.parse(window.atob(jwt.split('.')[1]));
    return token;
  }

  setCurrentUser(data: any) {
    this.currentUser.set(data.payload);
    localStorage.setItem(KEY_STORAGE_USER, JSON.stringify(data.payload));
    localStorage.setItem(KEY_STORAGE_USER_JWT, JSON.stringify(data.raw));
  }

  signIn(user: User) {
    // from(
    //   db.users.add({
    //     username: user.username,
    //   })
    // )
    //   .pipe(
    //     take(1),
    //     tap((data) => {
    //       this.setCurrentUser({ id: data, username: user.username });
    //       this.router.navigate(['/']);
    //     })
    //   )
    //   .subscribe();
  }

  signOut() {
    this.currentUser.set(null);
    localStorage.removeItem(KEY_STORAGE_USER);
  }

  getToken() {
    const tString = localStorage.getItem(KEY_STORAGE_USER_JWT);
    return tString ? JSON.parse(tString) : null;
  }
}

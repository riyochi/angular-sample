import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth, User } from 'firebase/app';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // 最新のログイン情報をとれるストリーム
  afUser$: Observable<User> = this.afAuth.user;
  uid: string;
  ownerGithubId: number;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.afUser$.subscribe((user) => {
      this.uid = user && user.uid;
      this.ownerGithubId = +user.providerData[0].uid;
    });
  }

  login() {
    // ログインするとポップアップでGithubログイン画面が開く
    this.afAuth.signInWithPopup(new auth.GithubAuthProvider()).then(() => {
      this.snackBar.open('ログインしました😃', null, {
        duration: 2000,
      });
      // ログイン後にリダイレクト
      this.router.navigateByUrl('/create');
    });
  }

  logout() {
    this.afAuth.signOut().then(() => {
      this.snackBar.open('ログアウトしました😇', null, {
        duration: 2000,
      });
      // ログアウト後にリダイレクト
      this.router.navigateByUrl('/welcome');
    });
  }
}

import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { firebase } from '@firebase/app';
import '@firebase/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AdminsService } from '../adminsservices/admins.service';
import { auth } from 'firebase';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any;
  public errormsg: string;
  public errormsg2: string;
  public errormsg3: string;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private addadmin: AdminsService
  ) {}

  // Sign up with email/password
  SignUp(email, password, data) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.addadmin.createAdmin({ ...data, uid: result.user.uid });
      })
      .catch((error) => {
        this.errormsg = error.message;
        window.alert(error.message);
      });
  }

  // Sign in with email/password
  SignIn(email, password) {
    this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.afs
          .collection('Admins')
          .get()
          .subscribe((docs) => {
            docs.forEach((doc) => {
              if (
                doc.data().uid === firebase.auth().currentUser.uid &&
                doc.data().userType === 'admin'
              ) {
                localStorage.setItem('user', JSON.stringify(doc.data()));
                localStorage.setItem('doc', JSON.stringify(doc.id));
                this.router.navigate(['/myprofile']);
                // window.location.reload();
              }
            });
          });
      })
      .catch((error) => {
        this.errormsg2 = error.message;
        window.alert(error.message);
        //console.log(error.message);
      });
  }

  ForgotPassword(passwordResetEmail) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
        this.router.navigate(['/restform']);
      })
      .catch((error) => {
        //this.errormsg3 = error.message;
        window.alert(error);
      });
  }

  get isLoggedIn(): boolean {
    const user = localStorage.getItem('user');
    return user !== null ? true : false;
  }

  SignOut() {
    return this.afAuth
      .signOut()
      .then(() => {
        localStorage.removeItem('user');
        this.router.navigate(['signin']);
      })
      .catch((e) => console.log(e));
  }
}

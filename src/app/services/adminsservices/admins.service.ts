import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { Admins } from '../../models/admins';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AdminsService {
  constructor(
    private angularFirestore: AngularFirestore,
    private act: ActivatedRoute,
    private afAuth: AngularFireAuth,

    private router: Router
  ) {}
  createAdmin(admin: Admins) {
    return new Promise<any>((resolve, reject) => {
      this.angularFirestore
        .collection('Admins')
        .add(admin)
        .then((response) => {
          if (response != null) {
            this.router.navigate(['myprofile']);
          }
        }),
        (error) => reject(error);
    });
  }
  deleteAdmin(admin) {
    this.angularFirestore.collection('Admins').doc(admin.id).delete();
    localStorage.removeItem('user');
  }
  updateAdmin(admin: Admins, id) {
    return this.angularFirestore.collection('Admins').doc(id).update({
      name: admin.name,
      phone: admin.phone,
    });
  }
  getAdminDoc(id) {
    return this.angularFirestore.collection('Admins').doc(id).valueChanges();
  }
  getAdminList() {
    return this.angularFirestore.collection('Admins').snapshotChanges();
  }
}

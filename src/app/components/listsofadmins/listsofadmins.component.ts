import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import '@firebase/auth';
import { AdminsService } from 'src/app/services/adminsservices/admins.service';
import { AuthService } from 'src/app/services/authservices/auth.service';
import { Admins } from '../../models/admins';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-listsofadmins',
  templateUrl: './listsofadmins.component.html',
  styleUrls: ['./listsofadmins.component.css'],
})
export class ListsofadminsComponent implements OnInit {
  Admins: Admins[];
  adminRef?: any;
  constructor(
    private adminService: AdminsService,
    private auth: AuthService,
    private afs: AngularFirestore
  ) {}

  ngOnInit() {
    this.adminService.getAdminList().subscribe((res) => {
      this.Admins = res.map((e) => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as object),
        } as Admins;
      });
    });
    this.adminRef = JSON.parse(localStorage.getItem('user'));
    console.log(this.adminRef);
  }

  removeAdmin = (admin) => {
    this.adminService.deleteAdmin(admin);
  };
}

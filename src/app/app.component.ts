import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminsService } from './services/adminsservices/admins.service';
import { Admins } from 'src/app/models/admins';
import { firebase } from '@firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent  implements OnInit{
  title = 'dashboard';
  public ids
  Admins: Admins[];
  

  constructor(public router: Router,private route: ActivatedRoute,private adminService:  AdminsService, private afs: AngularFirestore,
    ) {
  }
  ngOnInit() {
    this.adminService.getAdminList().subscribe(res => {
      const localUser=firebase.auth().currentUser.uid;
   //   console.log(localUser);
      this.Admins= res.map( e => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as object)
        } as Admins;
      });
      //console.log(this.Admins[0].id);
  });
}
}

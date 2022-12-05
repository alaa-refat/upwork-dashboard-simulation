import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/authservices/auth.service';
import { firebase } from '@firebase/app';
import { AdminsService } from 'src/app/services/adminsservices/admins.service';
import { NavbarService } from 'src/app/services/navbarservices/navbar.service';
import { SidebarService } from 'src/app/services/sidebarservices/sidebar.service';

@Component({
  selector: 'app-resetpassform',
  templateUrl: './resetpassform.component.html',
  styleUrls: ['./resetpassform.component.css'],
})
export class ResetpassformComponent implements OnInit, AfterViewInit {
  adminRef?: any;
  public fieldTextType: boolean;
  ids?: any;
  public editForm: FormGroup;

  constructor(
    public afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    public adminService: AdminsService,
    private cdr: ChangeDetectorRef,
    public Auth: AuthService,
    public formBuilder: FormBuilder,
    private act: ActivatedRoute,
    private router: Router,
    public Nav: NavbarService,
    public side: SidebarService
  ) {
    this.editForm = this.formBuilder.group({
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$'
          ),
        ],
      ],
    });
  }
  ngOnInit(): void {
    this.Nav.hide();
    this.side.hide();
  }

  ngAfterViewInit(): void {}

  ChangePassword() {
    this.afs
      .collection('Admins')
      .get()
      .subscribe((docs) => {
        docs.forEach((doc) => {
          if (doc.data().uid === firebase.auth().currentUser.uid) {
            console.log(this.editForm.get('password'));
            this.afs
              .collection('Admins')
              .doc(doc.id)
              .update({
                password: this.editForm.get('password').value,
              });
            this.router.navigate(['/myprofile']);
          }
        });
      });
  }
  onSubmit() {}

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
}

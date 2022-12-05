import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as firebase from 'firebase';
import { finalize } from 'rxjs/operators';
import { AdminsService } from 'src/app/services/adminsservices/admins.service';
import { AuthService } from 'src/app/services/authservices/auth.service';
import { NavbarService } from 'src/app/services/navbarservices/navbar.service';

@Component({
  selector: 'app-signup2',
  templateUrl: './signup2.component.html',
  styleUrls: ['./signup2.component.css'],
})
export class Signup2Component implements OnInit {
  public adminForm: FormGroup;
  public fieldTextType: boolean;
  public selectedFile;
  public ref;
  public downloadURL;
  public fb;
  public errormsg;
  constructor(
    public adminService: AdminsService,
    public formBuilder: FormBuilder,
    private act: ActivatedRoute,
    private router: Router,
    public AuthenticationService: AuthService,
    private storage: AngularFireStorage,
    private afAuth: AngularFireAuth,
    public nav: NavbarService
  ) {
    this.adminForm = this.formBuilder.group({
      name: [
        '',
        [
          Validators.required,
          ,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      phone: [
        ,
        [
          Validators.required,
          Validators.maxLength(11),
          Validators.pattern('^((\\+91-?)|0)?[0-9]{11}$'),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$'
          ),
        ],
      ],
      imgurl: [''],
    });
  }

  ngOnInit(): void {
    this.nav.hide();
  }

  onSubmit() {
    var email = this.adminForm.get('email').value;
    var pass = this.adminForm.get('password').value;
    var data = {
      name: this.adminForm.get('name').value,
      email: this.adminForm.get('email').value,
      phone: this.adminForm.get('phone').value,
      password: this.adminForm.get('password').value,
      imgProfile: this.fb,
      userType:'admin',
    };
    this.AuthenticationService.SignUp(email, pass, data);
    this.errormsg = this.AuthenticationService.errormsg;
  }

  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
    const uploadStep = this.storage
      .ref(`adminsimages/${this.selectedFile.name}`)
      .put(this.selectedFile);
    uploadStep
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = this.storage
            .ref(`adminsimages/${this.selectedFile.name}`)
            .getDownloadURL();
          this.downloadURL.subscribe((url) => {
            if (url) {
              this.fb = url;
            }
            console.log(this.fb);
          });
        })
      )
      .subscribe((url) => {
        if (url) {
          console.log(url);
        }
      });
  }
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
}

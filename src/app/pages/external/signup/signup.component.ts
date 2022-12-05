import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminsService } from 'src/app/services/adminsservices/admins.service';
import { NavbarService } from 'src/app/services/navbarservices/navbar.service';
import { SidebarService } from 'src/app/services/sidebarservices/sidebar.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  public editForm: FormGroup;
  adminRef: any;

  constructor(
    public adminService: AdminsService,
    public formBuilder: FormBuilder,
    private act: ActivatedRoute,
    private router: Router,
    public nav: NavbarService,
    public side: SidebarService
  ) {
    this.editForm = this.formBuilder.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      phone: [
        ,
        [
          Validators.required,
          Validators.maxLength(11),
          Validators.pattern('^((\\+91-?)|0)?[0-9]{11}$'),
        ],
      ],
    });
  }

  ngOnInit(): void {
    this.nav.hide();
    const id = this.act.snapshot.paramMap.get('id');
    console.log(id);
    this.adminService.getAdminDoc(id).subscribe((res) => {
      this.adminRef = res;
      console.log(this.adminRef);
      this.editForm = this.formBuilder.group({
        name: [this.adminRef.name],
        phone: [this.adminRef.phone],
      });
    });
  }

  onSubmit() {
    const id = this.act.snapshot.paramMap.get('id');
    this.adminService.updateAdmin(this.editForm.value, id);
    this.router.navigate(['list-admins']);
  }
}

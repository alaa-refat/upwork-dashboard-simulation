import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { NavbarService } from 'src/app/services/navbarservices/navbar.service';
import { SidebarService } from 'src/app/services/sidebarservices/sidebar.service';

@Component({
  selector: 'app-editclient',
  templateUrl: './editclient.component.html',
  styleUrls: ['./editclient.component.css'],
})
export class EditclientComponent implements OnInit {
  public editForm1: FormGroup;
  adminRef: any;

  constructor(
    public clientService: ClientService,
    public formBuilder: FormBuilder,
    private act: ActivatedRoute,
    private router: Router,
    public nav: NavbarService,
    public side: SidebarService
  ) {
    this.editForm1 = this.formBuilder.group({
      firstName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      password: ['', [Validators.required, Validators.maxLength(8)]],
    });
  }

  ngOnInit(): void {
    this.nav.hide();
    this.side.hide();
    const id = this.act.snapshot.paramMap.get('id');
    this.clientService.getClientDoc(id).subscribe((res) => {
      this.adminRef = res;
      console.log(res);
      console.log(this.adminRef);
      this.editForm1 = this.formBuilder.group({
        firstName: [this.adminRef.firstName],
        lastName: [this.adminRef.lastName],
        password: [this.adminRef.password],
      });
    });
  }
  onSubmit() {
    const id = this.act.snapshot.paramMap.get('id');
    console.log(id);
    console.log(this.editForm1.value);
    this.clientService.updateClient(this.editForm1.value, id);

    this.router.navigate(['clientlist']);
  }
}

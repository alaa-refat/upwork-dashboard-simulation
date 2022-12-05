import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NavbarService } from 'src/app/services/navbarservices/navbar.service';
import { SidebarService } from 'src/app/services/sidebarservices/sidebar.service';
import { TalentService } from 'src/app/services/talent.service';

@Component({
  selector: 'app-edittalent',
  templateUrl: './edittalent.component.html',
  styleUrls: ['./edittalent.component.css'],
})
export class EdittalentComponent implements OnInit {
  public editForm2: FormGroup;
  adminRef: any;

  constructor(
    public talentService: TalentService,
    public formBuilder: FormBuilder,
    private act: ActivatedRoute,
    private router: Router,
    public nav: NavbarService,
    public side: SidebarService
  ) {
    this.editForm2 = this.formBuilder.group({
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
    console.log(id);
    this.talentService.getTalentDoc(id).subscribe((res) => {
      this.adminRef = res;
      console.log(res);
      console.log(this.adminRef);
      this.editForm2 = this.formBuilder.group({
        firstName: [this.adminRef.firstName],
        lastName: [this.adminRef.lastName],
        password: [this.adminRef.password],
      });
    });
  }
  onSubmit() {
    const id = this.act.snapshot.paramMap.get('id');
    console.log(id);
    console.log(this.editForm2.value);
    this.talentService.updateTalent(this.editForm2.value, id);
    this.router.navigate(['talentlist']);
  }
}

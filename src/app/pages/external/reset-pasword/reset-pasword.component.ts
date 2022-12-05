import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/authservices/auth.service';
import { NavbarService } from 'src/app/services/navbarservices/navbar.service';
import { SidebarService } from 'src/app/services/sidebarservices/sidebar.service';

@Component({
  selector: 'app-reset-pasword',
  templateUrl: './reset-pasword.component.html',
  styleUrls: ['./reset-pasword.component.css']
})
export class ResetPaswordComponent implements OnInit {

  constructor( public Auth: AuthService, public Nav: NavbarService,
    public side: SidebarService) { }

  ngOnInit(): void {
    this.Nav.hide();
    this.side.hide();
  }

}

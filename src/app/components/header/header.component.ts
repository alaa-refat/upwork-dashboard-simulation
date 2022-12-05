import { AuthService } from 'src/app/services/authservices/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarService } from 'src/app/services/navbarservices/navbar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  adminRef?: any;

  constructor(public router: Router,  public nav: NavbarService ,public AuthService:AuthService) {
    this.adminRef = JSON.parse(localStorage.getItem('user'));
    console.log(this.adminRef.imgProfile);
    
    
  }

  ngOnInit(): void {
  }
  signOut(){
    this.AuthService.SignOut();
  }
}

import { Component, OnInit } from '@angular/core';
import { NavbarService } from 'src/app/services/navbarservices/navbar.service';
import { SidebarService } from 'src/app/services/sidebarservices/sidebar.service';

@Component({
  selector: 'app-specialaccount',
  templateUrl: './specialaccount.component.html',
  styleUrls: ['./specialaccount.component.css'],
})
export class SpecialaccountComponent implements OnInit {
  constructor(public nav: NavbarService, public side: SidebarService) {}

  ngOnInit(): void {
    this.nav.show();
    this.side.show();
  }
}

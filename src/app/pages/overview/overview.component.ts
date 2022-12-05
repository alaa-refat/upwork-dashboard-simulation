import { Component, OnInit } from '@angular/core';
import { NavbarService } from 'src/app/services/navbarservices/navbar.service';
import { SidebarService } from 'src/app/services/sidebarservices/sidebar.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css'],
})
export class OverviewComponent implements OnInit {
  constructor(public nav: NavbarService, public side: SidebarService) {}

  ngOnInit(): void {
    this.nav.show();
    this.side.show();
  }
}

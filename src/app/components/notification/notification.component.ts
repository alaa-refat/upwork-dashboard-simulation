import { Component, OnInit } from '@angular/core';
import { NavbarService } from 'src/app/services/navbarservices/navbar.service';
import { SidebarService } from 'src/app/services/sidebarservices/sidebar.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
})
export class NotificationComponent implements OnInit {
  constructor(public Nav: NavbarService, public side: SidebarService) {}

  ngOnInit(): void {
    this.side.show();
    this.Nav.show();
  }
}

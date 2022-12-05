import { Client } from 'src/app/models/client.model';
import { ClientService } from 'src/app/services/client.service';
import { Component, OnInit } from '@angular/core';
import { NavbarService } from 'src/app/services/navbarservices/navbar.service';
import { SidebarService } from 'src/app/services/sidebarservices/sidebar.service';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css'],
})
export class ClientListComponent implements OnInit {
  clients: Client[];
  page: Number = 1;
  total: Number;
  constructor(
    private clientService: ClientService,
    public nav: NavbarService,
    public side: SidebarService
  ) {}

  ngOnInit(): void {
    this.nav.show();
    this.side.show();
    this.clientService.getClientList().subscribe((res) => {
      this.clients = res.map((e) => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as object),
        } as Client;
      });
    });
  }
  deleteClient(client) {
    this.clientService.deleteClient(client);
  }
}

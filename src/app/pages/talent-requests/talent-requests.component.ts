import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Talent } from 'src/app/models/talent.model';
import { NavbarService } from 'src/app/services/navbarservices/navbar.service';
import { SidebarService } from 'src/app/services/sidebarservices/sidebar.service';
import { TalentService } from 'src/app/services/talent.service';

@Component({
  selector: 'app-talent-requests',
  templateUrl: './talent-requests.component.html',
  styleUrls: ['./talent-requests.component.css'],
})
export class TalentRequestsComponent implements OnInit {
  talents: Talent[];
  page: Number = 1;
  total: Number;
  constructor(
    private talentService: TalentService,
    private angularFirestore: AngularFirestore,
    public nav: NavbarService,
    public side: SidebarService
  ) {}
  ngOnInit(): void {
    this.nav.show();
    this.side.show();
    this.talentService.getTalentRequestsList().subscribe((res) => {
      this.talents = res.map((e) => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as object),
        } as unknown as Talent;
      });
    });
  }

  updateTalentRequests(talent) {
    return this.angularFirestore.collection('talent').doc(talent).update({
      accepted: true,
    });
  }

  deleteTalentRequests(talent) {
    return this.angularFirestore.collection('talent').doc(talent).update({
      accepted: false,
    });
  }
}

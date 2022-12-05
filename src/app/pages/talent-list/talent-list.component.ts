import { TalentService } from 'src/app/services/talent.service';
import { Component, OnInit } from '@angular/core';
import { Talent } from 'src/app/models/talent.model';
import { NgxPaginationModule } from 'ngx-pagination';
import { NavbarService } from 'src/app/services/navbarservices/navbar.service';
import { SidebarService } from 'src/app/services/sidebarservices/sidebar.service';

@Component({
  selector: 'app-talent-list',
  templateUrl: './talent-list.component.html',
  styleUrls: ['./talent-list.component.css'],
})
export class TalentListComponent implements OnInit {
  talents: Talent[];
  page: Number = 1;
  total: Number;
  constructor(
    private talentService: TalentService,
    public nav: NavbarService,
    public side: SidebarService
  ) {}
  ngOnInit(): void {
    this.nav.show();
    this.side.show();
    this.talentService.getTalentList().subscribe((res) => {
      this.talents = res.map((e) => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as object),
        } as unknown as Talent;
      });
    });
  }
  deleteTalent(talent) {
    this.talentService.deleteTalent(talent);
  }
}

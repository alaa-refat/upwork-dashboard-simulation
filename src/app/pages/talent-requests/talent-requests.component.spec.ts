import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TalentRequestsComponent } from './talent-requests.component';

describe('TalentRequestsComponent', () => {
  let component: TalentRequestsComponent;
  let fixture: ComponentFixture<TalentRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TalentRequestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TalentRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

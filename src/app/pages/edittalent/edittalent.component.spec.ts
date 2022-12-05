import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdittalentComponent } from './edittalent.component';

describe('EdittalentComponent', () => {
  let component: EdittalentComponent;
  let fixture: ComponentFixture<EdittalentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EdittalentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EdittalentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

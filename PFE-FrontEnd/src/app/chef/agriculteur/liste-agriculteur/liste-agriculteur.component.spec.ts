import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeAgriculteurComponent } from './liste-agriculteur.component';

describe('ListeAgriculteurComponent', () => {
  let component: ListeAgriculteurComponent;
  let fixture: ComponentFixture<ListeAgriculteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeAgriculteurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeAgriculteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

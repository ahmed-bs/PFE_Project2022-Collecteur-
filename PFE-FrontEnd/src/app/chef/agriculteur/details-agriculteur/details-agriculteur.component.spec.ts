import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsAgriculteurComponent } from './details-agriculteur.component';

describe('DetailsAgriculteurComponent', () => {
  let component: DetailsAgriculteurComponent;
  let fixture: ComponentFixture<DetailsAgriculteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsAgriculteurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsAgriculteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

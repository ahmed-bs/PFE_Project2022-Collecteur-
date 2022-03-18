import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAgriculteurComponent } from './update-agriculteur.component';

describe('UpdateAgriculteurComponent', () => {
  let component: UpdateAgriculteurComponent;
  let fixture: ComponentFixture<UpdateAgriculteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateAgriculteurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateAgriculteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

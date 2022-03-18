import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAgriculteurComponent } from './create-agriculteur.component';

describe('CreateAgriculteurComponent', () => {
  let component: CreateAgriculteurComponent;
  let fixture: ComponentFixture<CreateAgriculteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAgriculteurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAgriculteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

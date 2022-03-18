import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTankComponent } from './create-tank.component';

describe('CreateTankComponent', () => {
  let component: CreateTankComponent;
  let fixture: ComponentFixture<CreateTankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateTankComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

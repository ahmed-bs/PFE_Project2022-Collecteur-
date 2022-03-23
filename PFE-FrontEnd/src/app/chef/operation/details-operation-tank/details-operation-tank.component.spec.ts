import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsOperationTankComponent } from './details-operation-tank.component';

describe('DetailsOperationTankComponent', () => {
  let component: DetailsOperationTankComponent;
  let fixture: ComponentFixture<DetailsOperationTankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsOperationTankComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsOperationTankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

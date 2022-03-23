import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeOperationTankComponent } from './liste-operation-tank.component';

describe('ListeOperationTankComponent', () => {
  let component: ListeOperationTankComponent;
  let fixture: ComponentFixture<ListeOperationTankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeOperationTankComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeOperationTankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

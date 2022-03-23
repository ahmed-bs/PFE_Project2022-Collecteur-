import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsOperationRetraitComponent } from './details-operation-retrait.component';

describe('DetailsOperationRetraitComponent', () => {
  let component: DetailsOperationRetraitComponent;
  let fixture: ComponentFixture<DetailsOperationRetraitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsOperationRetraitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsOperationRetraitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsOperationComponent } from './details-operation.component';

describe('DetailsOperationComponent', () => {
  let component: DetailsOperationComponent;
  let fixture: ComponentFixture<DetailsOperationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsOperationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

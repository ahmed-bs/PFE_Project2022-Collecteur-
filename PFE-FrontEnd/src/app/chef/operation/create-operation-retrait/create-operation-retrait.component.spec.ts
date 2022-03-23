import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOperationRetraitComponent } from './create-operation-retrait.component';

describe('CreateOperationRetraitComponent', () => {
  let component: CreateOperationRetraitComponent;
  let fixture: ComponentFixture<CreateOperationRetraitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateOperationRetraitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOperationRetraitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

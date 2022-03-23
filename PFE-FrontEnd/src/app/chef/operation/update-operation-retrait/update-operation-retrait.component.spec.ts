import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateOperationRetraitComponent } from './update-operation-retrait.component';

describe('UpdateOperationRetraitComponent', () => {
  let component: UpdateOperationRetraitComponent;
  let fixture: ComponentFixture<UpdateOperationRetraitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateOperationRetraitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateOperationRetraitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

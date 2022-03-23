import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeOperationRetraitComponent } from './liste-operation-retrait.component';

describe('ListeOperationRetraitComponent', () => {
  let component: ListeOperationRetraitComponent;
  let fixture: ComponentFixture<ListeOperationRetraitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeOperationRetraitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeOperationRetraitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

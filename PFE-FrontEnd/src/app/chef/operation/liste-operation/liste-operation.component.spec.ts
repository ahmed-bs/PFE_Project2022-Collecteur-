import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeOperationComponent } from './liste-operation.component';

describe('ListeOperationComponent', () => {
  let component: ListeOperationComponent;
  let fixture: ComponentFixture<ListeOperationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeOperationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

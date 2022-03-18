import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeTankComponent } from './liste-tank.component';

describe('ListeTankComponent', () => {
  let component: ListeTankComponent;
  let fixture: ComponentFixture<ListeTankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeTankComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeTankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

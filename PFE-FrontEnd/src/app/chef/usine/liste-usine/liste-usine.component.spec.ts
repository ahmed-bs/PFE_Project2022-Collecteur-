import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeUsineComponent } from './liste-usine.component';

describe('ListeUsineComponent', () => {
  let component: ListeUsineComponent;
  let fixture: ComponentFixture<ListeUsineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeUsineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeUsineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

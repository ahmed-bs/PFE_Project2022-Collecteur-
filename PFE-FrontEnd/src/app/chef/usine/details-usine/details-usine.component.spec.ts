import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsUsineComponent } from './details-usine.component';

describe('DetailsUsineComponent', () => {
  let component: DetailsUsineComponent;
  let fixture: ComponentFixture<DetailsUsineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsUsineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsUsineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

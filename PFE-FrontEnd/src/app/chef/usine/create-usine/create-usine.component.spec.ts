import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUsineComponent } from './create-usine.component';

describe('CreateUsineComponent', () => {
  let component: CreateUsineComponent;
  let fixture: ComponentFixture<CreateUsineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUsineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUsineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

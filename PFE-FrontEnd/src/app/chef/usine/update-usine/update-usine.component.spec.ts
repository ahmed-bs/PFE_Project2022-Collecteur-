import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateUsineComponent } from './update-usine.component';

describe('UpdateUsineComponent', () => {
  let component: UpdateUsineComponent;
  let fixture: ComponentFixture<UpdateUsineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateUsineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateUsineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

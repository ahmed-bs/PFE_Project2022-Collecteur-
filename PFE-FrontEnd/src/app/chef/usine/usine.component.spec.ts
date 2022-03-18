import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsineComponent } from './usine.component';

describe('UsineComponent', () => {
  let component: UsineComponent;
  let fixture: ComponentFixture<UsineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsTankComponent } from './details-tank.component';

describe('DetailsTankComponent', () => {
  let component: DetailsTankComponent;
  let fixture: ComponentFixture<DetailsTankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsTankComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsTankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

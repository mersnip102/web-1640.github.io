import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QacComponent } from './qac.component';

describe('QacComponent', () => {
  let component: QacComponent;
  let fixture: ComponentFixture<QacComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QacComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

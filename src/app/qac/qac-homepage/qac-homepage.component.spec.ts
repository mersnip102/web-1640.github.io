import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QacHomepageComponent } from './qac-homepage.component';

describe('QacHomepageComponent', () => {
  let component: QacHomepageComponent;
  let fixture: ComponentFixture<QacHomepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QacHomepageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QacHomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

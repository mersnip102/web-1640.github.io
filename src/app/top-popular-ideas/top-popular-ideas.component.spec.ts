import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopPopularIdeasComponent } from './top-popular-ideas.component';

describe('TopPopularIdeasComponent', () => {
  let component: TopPopularIdeasComponent;
  let fixture: ComponentFixture<TopPopularIdeasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopPopularIdeasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopPopularIdeasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

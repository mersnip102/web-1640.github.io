import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostPopularIdeaComponent } from './most-popular-idea.component';

describe('MostPopularIdeaComponent', () => {
  let component: MostPopularIdeaComponent;
  let fixture: ComponentFixture<MostPopularIdeaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MostPopularIdeaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MostPopularIdeaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

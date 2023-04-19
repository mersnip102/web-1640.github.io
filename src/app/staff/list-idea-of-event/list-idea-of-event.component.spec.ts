import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListIdeaOfEventComponent } from './list-idea-of-event.component';

describe('IdeaOfEventComponent', () => {
  let component: ListIdeaOfEventComponent;
  let fixture: ComponentFixture<ListIdeaOfEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListIdeaOfEventComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListIdeaOfEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

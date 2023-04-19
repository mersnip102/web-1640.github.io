import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EventAndDeadLineComponent } from './event-and-deadline.component';



describe('EventAndDeadlineComponent', () => {
  let component: EventAndDeadLineComponent;
  let fixture: ComponentFixture<EventAndDeadLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventAndDeadLineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventAndDeadLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CurrentRoundComponent } from './current-round.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('CurrentRoundComponent', () => {
  let component: CurrentRoundComponent;
  let fixture: ComponentFixture<CurrentRoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentRoundComponent ],
      imports: [ FormsModule, BrowserAnimationsModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentRoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

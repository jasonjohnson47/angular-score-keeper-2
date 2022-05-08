import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameSetupComponent } from './game-setup.component';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';

describe('GameSetupComponent', () => {
  let component: GameSetupComponent;
  let fixture: ComponentFixture<GameSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameSetupComponent ],
      imports: [ FormsModule, AppRoutingModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

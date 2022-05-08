import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditRoundComponent } from './edit-round.component';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';

describe('EditRoundComponent', () => {
  let component: EditRoundComponent;
  let fixture: ComponentFixture<EditRoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditRoundComponent ],
      imports: [ FormsModule, AppRoutingModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

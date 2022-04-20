import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSubToggleComponent } from './add-sub-toggle.component';

describe('AddSubToggleComponent', () => {
  let component: AddSubToggleComponent;
  let fixture: ComponentFixture<AddSubToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSubToggleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSubToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormcaseboxComponent } from './formcasebox.component';

describe('FormcaseboxComponent', () => {
  let component: FormcaseboxComponent;
  let fixture: ComponentFixture<FormcaseboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormcaseboxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormcaseboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

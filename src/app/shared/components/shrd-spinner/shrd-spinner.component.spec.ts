import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShrdSpinnerComponent } from './shrd-spinner.component';

describe('ShrdSpinnerComponent', () => {
  let component: ShrdSpinnerComponent;
  let fixture: ComponentFixture<ShrdSpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShrdSpinnerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShrdSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

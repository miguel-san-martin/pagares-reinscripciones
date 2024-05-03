import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreciosExtraComponent } from './precios-extra.component';

describe('PreciosExtraComponent', () => {
  let component: PreciosExtraComponent;
  let fixture: ComponentFixture<PreciosExtraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreciosExtraComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PreciosExtraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

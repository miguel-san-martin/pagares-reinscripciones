import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectPagaresGeneracionComponent } from './select-pagares-generacion.component';

describe('SelectPagaresGeneracionComponent', () => {
  let component: SelectPagaresGeneracionComponent;
  let fixture: ComponentFixture<SelectPagaresGeneracionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectPagaresGeneracionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SelectPagaresGeneracionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

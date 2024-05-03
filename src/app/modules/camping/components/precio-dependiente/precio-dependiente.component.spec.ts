import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrecioDependienteComponent } from './precio-dependiente.component';

describe('PrecioDependienteComponent', () => {
  let component: PrecioDependienteComponent;
  let fixture: ComponentFixture<PrecioDependienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrecioDependienteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrecioDependienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneradorEspecificoComponent } from './generador-especifico.component';

describe('GeneradorEspecificoComponent', () => {
  let component: GeneradorEspecificoComponent;
  let fixture: ComponentFixture<GeneradorEspecificoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeneradorEspecificoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GeneradorEspecificoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

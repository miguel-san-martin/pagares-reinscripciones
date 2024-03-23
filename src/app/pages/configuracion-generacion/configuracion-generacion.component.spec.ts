import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguracionGeneracionComponent } from './configuracion-generacion.component';

describe('ConfiguracionGeneracionComponent', () => {
  let component: ConfiguracionGeneracionComponent;
  let fixture: ComponentFixture<ConfiguracionGeneracionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfiguracionGeneracionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfiguracionGeneracionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

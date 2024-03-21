import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaContraloriaComponent } from './tabla-contraloria.component';

describe('TablaContraloriaComponent', () => {
  let component: TablaContraloriaComponent;
  let fixture: ComponentFixture<TablaContraloriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablaContraloriaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TablaContraloriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

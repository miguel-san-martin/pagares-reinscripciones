import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuloCerradoComponent } from './modulo-cerrado.component';

describe('ModuloCerradoComponent', () => {
  let component: ModuloCerradoComponent;
  let fixture: ComponentFixture<ModuloCerradoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModuloCerradoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModuloCerradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

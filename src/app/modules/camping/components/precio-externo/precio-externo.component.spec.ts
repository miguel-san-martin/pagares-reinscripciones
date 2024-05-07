import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrecioExternoComponent } from './precio-externo.component';

describe('PrecioExternoComponent', () => {
  let component: PrecioExternoComponent;
  let fixture: ComponentFixture<PrecioExternoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrecioExternoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PrecioExternoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

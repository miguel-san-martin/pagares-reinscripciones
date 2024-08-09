import { Component, computed, model, Signal } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { MaterialModule } from '../../shared-material-module/material.module';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-calculadora-nu',
  standalone: true,
  imports: [SharedModule, MaterialModule, DecimalPipe],
  templateUrl: './calculadora-nu.component.html',
  styleUrl: './calculadora-nu.component.scss',
})
export class CalculadoraNuComponent {
  value = model(0);
  rendimiento: number = 14.25;
  year: Signal<number> = computed(
    () => this.value() * (this.rendimiento / 100),
  );
  dia: Signal<number> = computed(() => this.year() / 365);

  mes: Signal<number> = computed(() => this.dia() * 30);

  constructor() {}
}

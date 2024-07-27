import { Component, inject, OnInit, signal, WritableSignal } from "@angular/core";
import { EspecialityServicesAService } from "../services/especiality-services-a.service";

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
})
export class MainPageComponent implements OnInit {
  private special = inject(EspecialityServicesAService);
  protected especialidades = signal([]);
  ngOnInit(): void {
    this.special.getAllEspecialities()
      .subscribe((r)=> {
      console.log(r);
      this.especialidades.set(r)
    });
  }
}



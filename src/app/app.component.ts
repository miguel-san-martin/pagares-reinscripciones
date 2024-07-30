import { Component, OnInit, ViewChild } from "@angular/core";
import { RouterLink, RouterOutlet } from '@angular/router';
import { MaterialModule } from './shared-material-module/material.module';
import { SharedModule } from './shared/shared.module';
import { MatDrawer } from "@angular/material/sidenav";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MaterialModule, SharedModule, RouterLink, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './shared/scss/custom-template-miguel-v2.scss',
})
export class AppComponent implements OnInit{


  @ViewChild('drawer') drawer!: MatDrawer;

  readonly flag!: boolean;

  opened :boolean = true;
  constructor() {}

  title = 'Contraloría';


  protected readonly close = close;

  closemap(){
    this.drawer.toggle()
  }

  ngOnInit(): void {
    console.log();
  }

}

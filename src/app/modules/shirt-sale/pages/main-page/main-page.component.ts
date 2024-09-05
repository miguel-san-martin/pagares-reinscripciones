<<<<<<< HEAD
import { Component, computed, signal } from '@angular/core';
=======
import { Component, computed, inject, OnInit, signal, WritableSignal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Item } from "../../interfaces/items.interface";
import { MatDialog } from "@angular/material/dialog";
import { DetailItemComponent } from "../../components/detail-item/detail-item.component";
import { ShirtsSaleService } from "../../services/shirts-sale.service";
>>>>>>> 4d81352aca7d65275047930844aa5acbd8b4b0fd

@Component({
  templateUrl: './main-page.component.html',
  styleUrl: '../../../../shared/scss/custom-template-miguel-v2.scss',
})
<<<<<<< HEAD
export class MainPageComponent {
  public state = signal<string>('Mujer');
  public precio = computed(() => (this.state() === 'Hombre' ? 300 : 150));
=======
export class MainPageComponent implements OnInit{


  readonly http = inject(HttpClient);
  readonly dialog = inject(MatDialog);
  readonly shirt = inject(ShirtsSaleService)

  protected cardElements = signal(null)
  protected state = signal<string>('Mujer');
  protected precio = computed(() => (this.state() === 'Hombre' ? 300 : 150));

  readonly items: WritableSignal<Item[]|null> = signal<Item[] | null>(null);

  ngOnInit(): void {
    this.http.get<Item[]>('/assets/articulos.json').subscribe( (res:Item[]) => {
      this.items.set(res);
    })


    localStorage.setItem('iestcart', 'value');
    console.log(localStorage.getItem('iestcart'));


  }



>>>>>>> 4d81352aca7d65275047930844aa5acbd8b4b0fd
  changePage() {
    this.state.update((current: string): string =>
      current === 'Mujer' ? 'Hombre' : 'Mujer',
    );
    console.log(this.state());
<<<<<<< HEAD
    /*
    this.state.set('abajo')
*/
=======

  }

  openProductDetails(item:Item) {
    this.dialog.open(DetailItemComponent,{
      height: '80%',
      width: '90%',
      data: item
    })
>>>>>>> 4d81352aca7d65275047930844aa5acbd8b4b0fd
  }
}

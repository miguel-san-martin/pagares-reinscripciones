import { Component, computed, inject, OnInit, signal, WritableSignal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Item } from "../../interfaces/items.interface";
import { MatDialog } from "@angular/material/dialog";
import { DetailItemComponent } from "../../components/detail-item/detail-item.component";
import { ShirtsSaleService } from "../../services/shirts-sale.service";

@Component({
  templateUrl: './main-page.component.html',
  styleUrl: '../../../../shared/scss/custom-template-miguel-v2.scss',
})
export class MainPageComponent implements OnInit{


  readonly http = inject(HttpClient);
  readonly dialog = inject(MatDialog);
  readonly shirt = inject(ShirtsSaleService)

  protected cardElements = signal(0)
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



  changePage() {
    this.state.update((current: string): string =>
      current === 'Mujer' ? 'Hombre' : 'Mujer',
    );
    console.log(this.state());

  }

  openProductDetails(item:Item) {
    this.dialog.open(DetailItemComponent,{
      height: '80%',
      width: '90%',
      data: item
    })
  }
}

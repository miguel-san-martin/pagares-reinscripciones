import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';

export interface Nodito {
  name: string;
  img: string;
  sub_nodes?: SubNode[];
  path?: string;
}

export interface SubNode {
  name: string;
  path: string;
  img: string;
}

@Component({
  selector: 'shrd-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss',
})
export class SideNavComponent implements OnInit {
  http = inject(HttpClient);
  focus: boolean[] = [];
  modulos!: Nodito[];

  ngOnInit(): void {
    this.http.get<Nodito[]>('/assets/index.json').subscribe((res: Nodito[]) => {
      console.log(res);
      this.modulos = res;
    });
  }
}

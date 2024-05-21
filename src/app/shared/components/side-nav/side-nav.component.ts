import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject, Output, EventEmitter } from "@angular/core";

export interface Node {
  name:      string;
  img:       string;
  sub_nodes?: SubNode[];
  path?:    string;
}

export interface SubNode {
  name: string;
  path: string;
  img:  string;
}


@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'shrd-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss'
})
export class SideNavComponent implements OnInit{


  http = inject(HttpClient);
  focus: boolean[] = [];
  modulos!:Node[];


  ngOnInit(): void {

    this.http.get<Node[]>('/assets/index.json').subscribe( (res:Node[]) => {
      this.modulos = res;
    })
  }


}

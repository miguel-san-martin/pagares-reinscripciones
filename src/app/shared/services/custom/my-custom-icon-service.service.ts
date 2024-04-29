import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';

@Injectable({
  providedIn: 'root'
})
export class MyCustomIconServiceService {


  constructor(private matIconRegistry: MatIconRegistry) {
    this.registerCustomIcons();
  }

  private registerCustomIcons() {
    const iconPath = 'assets/icons/my-custom-icon.svg';
    LIST_OF_ICONS.forEach(
      (row:any)=> {
        const name:string[] = Object.keys(row)
        this.matIconRegistry.addSvgIcon(name[0],row[name[0]]);
      }
    )
  }
}




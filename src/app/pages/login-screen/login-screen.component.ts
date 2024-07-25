import { Component } from '@angular/core';
import { MatIcon } from "@angular/material/icon";
import { MatButtonToggle } from "@angular/material/button-toggle";
import { MaterialModule } from "../../shared-material-module/material.module";

@Component({
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './login-screen.component.html',
  styleUrl: './login-screen.component.scss',
})
export class LoginScreenComponent {
  navegate() {
    window.location.href = 'https://sie.iest.edu.mx/SIE/Login/Securelogv4.php';
  }
}

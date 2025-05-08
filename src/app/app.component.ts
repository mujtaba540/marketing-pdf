import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SelectComponent } from './ui-components/components/select/select.component';
import { MainComponent } from './pages/properties/components/main/main.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MainComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'sha-pdf';
}

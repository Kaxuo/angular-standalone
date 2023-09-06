import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from 'src/app/shared/navbar/navbar.component';
import { HeroComponent } from './components/hero/hero.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './shared/footer/footer.component';
import { LoadingComponent } from './shared/loading/loading.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    HeroComponent,
    RouterOutlet,
    FooterComponent,
    LoadingComponent,
    HttpClientModule,
  ],
  providers: [],
})
export class AppComponent {
  title = 'standalone';
  constructor() {}
}

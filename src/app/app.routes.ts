import { Routes } from '@angular/router';
import { HeroComponent } from './components/hero/hero.component';
import { PricingComponent } from './components/pricing/pricing.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { LoaderInterceptor } from './interceptors/loader.interceptor';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'main',
  },
  {
    path: 'main',
    component: HeroComponent,
  },
  {
    path: 'people',
    component: ProjectsComponent,
    providers: [provideHttpClient(withInterceptors([LoaderInterceptor]))],
  },
  {
    path: 'pricing',
    component: PricingComponent,
  },
];

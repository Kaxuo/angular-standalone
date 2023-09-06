import { Routes } from '@angular/router';
import { HeroComponent } from './components/hero/hero.component';
import { PricingComponent } from './components/pricing/pricing.component';
import { ProjectsComponent } from './components/projects/projects.component';

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
  },
  {
    path: 'pricing',
    component: PricingComponent,
  },
];

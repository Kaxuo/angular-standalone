import {Routes} from '@angular/router';
import {HeroComponent} from './components/hero/hero.component';
import {PricingComponent} from './components/pricing/pricing.component';
import {ProjectsComponent} from './components/projects/projects.component';
import {LoaderInterceptor} from './interceptors/loader.interceptor';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {PlaygroundComponent} from './components/playground/playground.component';
import {SignalComponent} from './components/signal/signal.component';
import {DialogComponent} from './components/dialog/dialog.component';
import {ObsComponent} from './components/obs/obs.component';

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
    path: 'obs',
    component: ObsComponent,
    providers: [provideHttpClient(withInterceptors([LoaderInterceptor]))],
  },
  {
    path: 'pricing',
    component: PricingComponent,
  },
  {
    path: 'playground',
    component: PlaygroundComponent,
  },
  {
    path: 'signal',
    component: SignalComponent,
    providers: [provideHttpClient(withInterceptors([LoaderInterceptor]))],
  },
  {
    path: 'dialog',
    component: DialogComponent,
  },
];

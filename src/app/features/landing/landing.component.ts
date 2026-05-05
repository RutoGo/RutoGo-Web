import { Component } from '@angular/core';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { HeroComponent } from './components/hero/hero.component';
import { StatsComponent } from './components/stats/stats.component';
import { BenefitsComponent } from './components/benefits/benefits.component';
import { TripsPreviewComponent } from './components/trips/trips-preview.component';
import { HowItWorksComponent } from './components/how-it-works/how-it-works.component';
import { CtaComponent } from './components/cta/cta.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    NavbarComponent,
    FooterComponent,
    HeroComponent,
    StatsComponent,
    BenefitsComponent,
    TripsPreviewComponent,
    HowItWorksComponent,
    CtaComponent
  ],
  template: `
    <app-navbar />
    <main>
      <app-hero />
      <app-stats />
      <app-benefits />
      <app-trips-preview />
      <app-how-it-works />
      <app-cta />
    </main>
    <app-footer />
  `
})
export class LandingComponent {}

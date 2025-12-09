import { Component } from "@angular/core";
import { bootstrapApplication } from "@angular/platform-browser";
import { HeroComponent } from "./app/components/hero/hero.component";
import { CountdownComponent } from "./app/components/countdown/countdown.component";
import { EventSectionComponent } from "./app/components/event-section/event-section.component";
import { DressCodeComponent } from "./app/components/dress-code/dress-code.component";
import { PhotosComponent } from "./app/components/photos/photos.component";
import { GalleryComponent } from "./app/components/gallery/gallery.component";
import { GiftsComponent } from "./app/components/gifts/gifts.component";
import { RSVPComponent } from "./app/components/rsvp/rsvp.component";
import { WeddingService } from "./app/services/wedding.service";
import { provideHttpClient } from "@angular/common/http";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [
    HeroComponent,
    CountdownComponent,
    EventSectionComponent,
    DressCodeComponent,
    PhotosComponent,
    GalleryComponent,
    GiftsComponent,
    RSVPComponent,
  ],
  template: `
    <main class="wedding-site">
      <app-hero></app-hero>

      <app-countdown></app-countdown>

      <app-event-section
        [eventDetails]="ceremonyDetails"
        iconType="rings"
      ></app-event-section>

      <app-event-section
        [eventDetails]="celebrationDetails"
        iconType="glasses"
        [showMessage]="true"
      ></app-event-section>

      <app-dress-code></app-dress-code>

      <app-photos></app-photos>

      <app-gallery></app-gallery>

      <app-gifts></app-gifts>

      <app-rsvp></app-rsvp>
    </main>
  `,
})
export class App {
  ceremonyDetails = this.weddingService.getCeremonyDetails();
  celebrationDetails = this.weddingService.getCelebrationDetails();

  constructor(private weddingService: WeddingService) {}
}

bootstrapApplication(App, {
  providers: [provideHttpClient()],
});

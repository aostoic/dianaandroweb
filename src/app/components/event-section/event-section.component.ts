import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { WeddingService } from "../../services/wedding.service";
import { EventDetails } from "../../models/wedding.model";

@Component({
  selector: "app-event-section",
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="py-16 text-center" style="background-color: var(--color-warm-white)">
      <div class="max-w-2xl mx-auto px-5">
        <div
          class="w-14 h-14 mx-auto flex items-center justify-center rounded-full"
          style="background: rgba(184, 164, 114, 0.1)"
        >
          <span class="material-icons text-3xl" style="color: var(--color-gold)">
            {{ getIcon() }}
          </span>
        </div>

        <h1 style="margin-top: -25px;">
          {{ eventDetails.title }}
        </h1>

        <div class="section-divider mb-6"></div>

        <p class="text-lg font-light mb-1" style="color: var(--color-text-light)">
          {{ eventDetails.location }}
        </p>

        <p class="text-sm font-light mb-4" style="color: var(--color-text-light)" *ngIf="showMessage">
          {{ getMessage() }}
        </p>

        <div class="flex justify-center items-center gap-6 my-6">
          <div class="text-3xl font-light" style="color: var(--color-text)">
            {{ eventDetails.date }}
          </div>
          <div class="w-px h-10" style="background-color: var(--color-gold-light)"></div>
          <div class="text-3xl font-light" style="color: var(--color-text)">
            {{ eventDetails.time }}
          </div>
        </div>

        <p class="text-sm font-light mb-8" *ngIf="eventDetails.address" style="color: var(--color-text-light)">
          {{ eventDetails.address }}
        </p>

        <button (click)="openLocation()" class="buttonAction">
          <span class="material-icons text-lg">place</span>
          VER UBICACIÓN
        </button>
      </div>
    </section>
  `,
})
export class EventSectionComponent {
  @Input() eventDetails!: EventDetails;
  @Input() iconType: "rings" | "glasses" = "rings";
  @Input() showMessage: boolean = true;

  constructor(private weddingService: WeddingService) {}

  getIcon(): string {
    return this.iconType === "rings" ? "favorite" : "local_bar";
  }

  getMessage(): string {
    return this.iconType === "rings"
      ? "Te esperamos el"
      : "La celebración será a las";
  }

  openLocation(): void {
    this.weddingService.openLocation();
  }
}

import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { WeddingService } from "../../services/wedding.service";
import { EventDetails } from "../../models/wedding.model";

@Component({
  selector: "app-event-section",
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="py-16 bg-white text-center border-b border-gray-200">
      <div class="max-w-2xl mx-auto px-5">
        <div
          class="w-16 h-16 mx-auto  flex items-center justify-center bg-gray-100 rounded-full"
        >
          <span class="material-icons text-4xl text-primary">
            {{ getIcon() }}
          </span>
        </div>

        <h1 style="    margin-top: -30px;">
          {{ eventDetails.title }}
        </h1>

        <p class="text-xl text-gray-600 ">
          {{ eventDetails.location }}
        </p>

        <p class="text-base text-gray-600 " *ngIf="showMessage">
          {{ getMessage() }}
        </p>

        <div class="flex justify-center items-center gap-8 my-4">
          <div class="text-4xl font-light text-gray-600">
            {{ eventDetails.date }}
          </div>
          <div class="text-4xl text-gray-300">|</div>
          <div class="text-4xl font-light text-gray-600">
            {{ eventDetails.time }}
          </div>
        </div>

        <p class="text-gray-600 mb-8" *ngIf="eventDetails.address">
          {{ eventDetails.address }}
        </p>

        <button (click)="openLocation()" class="buttonAction">
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

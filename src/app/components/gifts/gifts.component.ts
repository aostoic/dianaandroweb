import { Component } from "@angular/core";
import { WeddingService } from "../../services/wedding.service";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-gifts",
  standalone: true,
  imports: [CommonModule],
  template: `
    <section
      id="gifts"
      class="py-16 text-center"
      style="background-color: var(--color-warm-white)"
    >
      <div class="max-w-2xl mx-auto px-5">
        <div
          class="w-14 h-14 mx-auto flex items-center justify-center rounded-full"
          style="background: rgba(184, 164, 114, 0.1)"
        >
          <span
            class="material-icons text-3xl"
            style="color: var(--color-gold)"
          >
            card_giftcard
          </span>
        </div>

        <h1 style="margin-top: -25px;">Regalos</h1>

        <div class="section-divider mb-6"></div>

        <p
          class="text-sm font-light max-w-md mx-auto mb-8 leading-relaxed"
          style="color: var(--color-text-light)"
        >
          Lo más importante es tu presencia, pero si deseas hacernos un regalo,
          puedes ver nuestra lista de regalos.
        </p>

        <button (click)="openGifts()" class="buttonAction">
          <span class="material-icons text-lg">redeem</span>
          VER LISTA DE REGALOS
        </button>
      </div>
    </section>
  `,
})
export class GiftsComponent {
  constructor(private weddingService: WeddingService) {}

  openGifts(): void {
    // Dispatch a custom event that the root app listens to
    window.dispatchEvent(new CustomEvent("open-gift-modal"));
  }
}

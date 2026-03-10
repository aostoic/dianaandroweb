import { Component } from "@angular/core";

@Component({
  selector: "app-dress-code",
  standalone: true,
  styles: [
    `
      .color-circle {
        position: relative;
        width: 3.5rem;
        height: 3.5rem;
        border-radius: 9999px;
        border: 2px solid #e5e5e5;
      }
      .color-circle::after {
        content: "";
        position: absolute;
        inset: 4px;
        border-radius: 9999px;
        border: 2px solid rgba(220, 50, 50, 0.7);
      }
      .color-circle::before {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        width: 110%;
        height: 2px;
        background: rgba(220, 50, 50, 0.7);
        transform: translate(-50%, -50%) rotate(-45deg);
        border-radius: 1px;
      }
      .color-label {
        font-size: 0.65rem;
        font-family: "Poppins", sans-serif;
        color: var(--color-text-light);
        margin-top: 0.35rem;
        letter-spacing: 0.5px;
      }
      .warning-box {
        border: 1.5px solid rgba(220, 50, 50, 0.25);
        background: rgba(220, 50, 50, 0.04);
        border-radius: 0.75rem;
        padding: 0.75rem 1.25rem;
        margin-top: 1.5rem;
        margin-bottom: 2rem;
      }
      .warning-box p {
        font-family: "Poppins", sans-serif !important;
        font-size: 0.8rem;
        font-weight: 500;
        color: #b04040;
        letter-spacing: 0.3px;
      }
    `,
  ],
  template: `
    <section
      id="dress-code"
      class="py-16 text-center"
      style="background-color: var(--color-cream)"
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
            checkroom
          </span>
        </div>

        <h1 style="margin-top: -25px;">Dress Code</h1>

        <div class="section-divider mb-6"></div>

        <p class="text-lg font-light mb-1" style="color: var(--color-text)">
          Elegante
        </p>
        <p
          class="text-xs font-light mb-0"
          style="color: var(--color-text-light)"
        >
          Vestimenta formal o semi-formal
        </p>

        <!-- Colores prohibidos con X visual -->
        <div class="flex justify-center items-start gap-6 mt-6">
          <div class="flex flex-col items-center">
            <div class="color-circle" style="background-color: #ffffff"></div>
            <span class="color-label">Blanco</span>
          </div>
          <div class="flex flex-col items-center">
            <div class="color-circle" style="background-color: #f5f0e1"></div>
            <span class="color-label">Beige</span>
          </div>
          <div class="flex flex-col items-center">
            <div class="color-circle" style="background-color: #f0d86e"></div>
            <span class="color-label">Amarillo</span>
          </div>
        </div>

        <!-- Warning box -->
        <div class="warning-box inline-flex items-center gap-2 mx-auto">
          <span class="material-icons" style="color: #b04040; font-size: 18px"
            >block</span
          >
          <p>Por favor, evitar vestir estos colores</p>
        </div>

        <button (click)="openInspirationalLooks()" class="buttonAction">
          <span class="material-icons text-lg">auto_awesome</span>
          INSPÍRATE
        </button>
      </div>
    </section>
  `,
})
export class DressCodeComponent {
  openInspirationalLooks(): void {
    window.open("https://pin.it/1KxjnrDGG", "_blank", "noopener,noreferrer");
  }
}

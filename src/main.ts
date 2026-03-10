import { Component, AfterViewInit, OnDestroy } from "@angular/core";
import { bootstrapApplication } from "@angular/platform-browser";
import { CommonModule } from "@angular/common";
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
    CommonModule,
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

      <div class="fade-in-section">
        <app-countdown></app-countdown>
      </div>

      <div class="fade-in-section">
        <app-event-section
          [eventDetails]="ceremonyDetails"
          iconType="rings"
        ></app-event-section>
      </div>

      <div class="fade-in-section">
        <app-event-section
          [eventDetails]="celebrationDetails"
          iconType="glasses"
          [showMessage]="true"
        ></app-event-section>
      </div>

      <div class="fade-in-section">
        <app-dress-code></app-dress-code>
      </div>

      <div class="fade-in-section">
        <app-photos></app-photos>
      </div>

      <div class="fade-in-section">
        <app-gallery></app-gallery>
      </div>

      <div class="fade-in-section">
        <app-gifts></app-gifts>
      </div>

      <div class="fade-in-section">
        <app-rsvp></app-rsvp>
      </div>

      <!-- Modal de regalos a nivel root para evitar problemas con transform/fixed -->
      @if (showGiftModal) {
        <div
          class="gift-modal-overlay"
          [class.gift-modal-active]="giftModalAnimating"
          (click)="closeGiftModal()"
        >
          <div
            class="gift-modal-panel"
            [class.gift-modal-visible]="giftModalAnimating"
            (click)="$event.stopPropagation()"
          >
            <!-- Drag handle mobile -->
            <div class="gift-drag-handle sm:hidden">
              <div
                class="w-10 h-1 rounded-full"
                style="background: rgba(255,255,255,0.4)"
              ></div>
            </div>

            <!-- Banner countdown -->
            <div class="gift-alert-banner">
              <span class="material-icons" style="font-size: 16px"
                >celebration</span
              >
              <span
                >¡Faltan <strong>{{ daysLeft }} días</strong> para la
                boda!</span
              >
              <button (click)="closeGiftModal()" class="gift-close-btn">
                <span class="material-icons" style="font-size: 18px; color: #fff">close</span>
              </button>
            </div>

            <!-- Header -->
            <div class="gift-modal-header">
              <div
                class="w-11 h-11 mx-auto flex items-center justify-center rounded-full"
                style="background: rgba(184, 164, 114, 0.1)"
              >
                <span
                  class="material-icons text-xl"
                  style="color: var(--color-gold)"
                  >card_giftcard</span
                >
              </div>
              <h2 class="text-3xl" style="margin: -0.25rem 0 0.25rem">
                Lista de Regalos
              </h2>
              <p
                class="text-xs font-light leading-relaxed"
                style="color: var(--color-text-light); max-width: 280px; margin: 0 auto"
              >
                Si deseas hacernos un regalo, cualquier detalle será recibido
                con mucho cariño.
              </p>
            </div>

            <!-- Dress code reminder -->
            <div class="gift-dresscode-alert">
              <span class="material-icons" style="font-size: 15px">block</span>
              <span
                >Recuerda: evitar vestir de <strong>blanco</strong>,
                <strong>beige</strong> o <strong>amarillo</strong></span
              >
            </div>

            <!-- Gift list -->
            <ul class="gift-list gift-scroll">
              @for (gift of giftsList; track gift.name; let i = $index) {
                <li
                  class="gift-list-item gift-item-anim"
                  [style.animation-delay]="i * 60 + 'ms'"
                >
                  <div class="flex items-center gap-3">
                    @if (gift.img) {
                      <img
                        [src]="gift.img"
                        [alt]="gift.name"
                        class="gift-item-img"
                        loading="lazy"
                      />
                    }
                    <div class="flex-1 min-w-0">
                      <p class="gift-item-name">{{ gift.name }}</p>
                      <p class="gift-item-desc">{{ gift.description }}</p>
                      <div class="flex items-center justify-between mt-1">
                        <span class="gift-item-price">{{
                          gift.price | currency: "COP " : "symbol" : "1.0-0"
                        }}</span>
                        <button
                          (click)="openGiftLink(gift.link)"
                          class="gift-action-btn"
                        >
                          <span class="material-icons" style="font-size:13px"
                            >favorite</span
                          >
                          Regalar
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              }
            </ul>
          </div>
        </div>
      }

      <!-- Footer -->
      <footer
        class="py-12 text-center"
        style="background: linear-gradient(135deg, #b8a472 0%, #9a8a5e 100%)"
      >
        <div class="max-w-2xl mx-auto px-5">
          <h1
            class="text-white mb-2"
            style="color: #fff !important; font-size: 3rem !important"
          >
            Andro & Diana
          </h1>
          <p class="text-white/80 text-sm font-light tracking-wider">
            04 de abril de 2026
          </p>
          <p class="text-white/60 text-xs font-light mt-1">
            Espaço Ondas · Florianópolis
          </p>
          <div class="w-12 h-px bg-white/30 mx-auto my-4"></div>
          <p class="text-white/50 text-xs font-light">#AndroYDiana</p>
        </div>
      </footer>
    </main>
  `,
})
export class App implements AfterViewInit, OnDestroy {
  ceremonyDetails = this.weddingService.getCeremonyDetails();
  celebrationDetails = this.weddingService.getCelebrationDetails();

  showGiftModal = false;
  giftModalAnimating = false;
  daysLeft = Math.max(
    0,
    Math.ceil((new Date(2026, 3, 4).getTime() - Date.now()) / 86400000),
  );

  private giftModalHandler = () => this.openGiftModal();

  giftsList = [
    {
      name: "Viaje a Marte",
      description: "Una aventura espacial única.",
      price: 49990,
      img: "assets/premios/9.jpg",
      link: "https://mpago.la/2X58gYR",
    },
    {
      name: "Mapa estelar personalizado",
      description: "Estrellas de la noche de la boda.",
      price: 59900,
      img: "assets/premios/6.jpg",
      link: "https://mpago.la/2nsBbVG",
    },
    {
      name: "Noche de observación astronómica",
      description: "Telescopio y guía astrónomo.",
      price: 69900,
      img: "assets/premios/3.jpg",
      link: "https://mpago.la/1vedi7B",
    },
    {
      name: "Experiencia spa de lujo",
      description: "Día completo de relajación con tratamientos exclusivos.",
      price: 99900,
      img: "assets/premios/5.jpg",
      link: "https://mpago.la/1f1Jr53",
    },
    {
      name: "Pase anual arte y cultura",
      description: "Acceso ilimitado a museos y galerías.",
      price: 199900,
      img: "assets/premios/2.jpg",
      link: "https://mpago.la/2sNxDeu",
    },
    {
      name: "Suscripción vinos artesanales",
      description: "6 botellas cada 3 meses, por un año.",
      price: 249900,
      img: "assets/premios/7.jpg",
      link: "https://mpago.la/2sNxDeu",
    },
    {
      name: "Escapada romántica en cabaña",
      description: "Fin de semana con jacuzzi y chimenea.",
      price: 349900,
      img: "assets/premios/8.jpg",
      link: "https://mpago.la/2chPbU5",
    },
    {
      name: "Cena en globo aerostático",
      description: "Menú gourmet a más de 500 m de altura.",
      price: 449900,
      img: "assets/premios/4.jpg",
      link: "https://mpago.la/1HBfDCT",
    },
    {
      name: "Viaje a la luna",
      description: "Una aventura espacial para dos, con todo incluido.",
      price: 500000,
      img: "assets/premios/1.jpg",
      link: "https://mpago.la/2BZq9zc",
    },
  ];

  constructor(private weddingService: WeddingService) {
    window.addEventListener("open-gift-modal", this.giftModalHandler);
  }

  ngOnDestroy(): void {
    window.removeEventListener("open-gift-modal", this.giftModalHandler);
  }

  ngAfterViewInit(): void {
    // Fade-in sections on scroll
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    );

    document.querySelectorAll(".fade-in-section").forEach((el) => {
      observer.observe(el);
    });

    // Abrir modal de regalos automáticamente al cargar
    setTimeout(() => this.openGiftModal(), 1200);
  }

  openGiftModal(): void {
    this.showGiftModal = true;
    requestAnimationFrame(() => {
      this.giftModalAnimating = true;
    });
  }

  closeGiftModal(): void {
    this.giftModalAnimating = false;
    setTimeout(() => {
      this.showGiftModal = false;
    }, 350);
  }

  openGiftLink(link?: string): void {
    if (link) {
      window.open(link, "_blank", "noopener,noreferrer");
    }
  }
}

bootstrapApplication(App, {
  providers: [provideHttpClient()],
});

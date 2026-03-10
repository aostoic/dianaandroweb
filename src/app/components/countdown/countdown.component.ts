import { Component, OnInit, OnDestroy } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Subscription } from "rxjs";
import { WeddingService } from "../../services/wedding.service";
import { CountdownTime } from "../../models/wedding.model";

@Component({
  selector: "app-countdown",
  standalone: true,
  imports: [CommonModule],
  template: `
    <section
      class="py-20 text-center"
      style="background-color: var(--color-cream)"
    >
      <div class="max-w-2xl mx-auto px-5">
        <p
          class="text-xs tracking-[0.25em] uppercase font-medium mb-2"
          style="color: var(--color-gold)"
        >
          Cuenta regresiva
        </p>
        <div class="section-divider mb-8"></div>

        <div class="flex justify-center gap-6 sm:gap-8 mb-10">
          <div class="flex flex-col items-center">
            <div
              class="w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center text-2xl sm:text-3xl font-light mb-3 countdown-circle"
            >
              {{ countdown.days }}
            </div>
            <span
              class="text-[10px] tracking-[0.2em] uppercase font-medium"
              style="color: var(--color-text-light)"
              >Días</span
            >
          </div>
          <div class="flex flex-col items-center">
            <div
              class="w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center text-2xl sm:text-3xl font-light mb-3 countdown-circle"
            >
              {{ countdown.hours }}
            </div>
            <span
              class="text-[10px] tracking-[0.2em] uppercase font-medium"
              style="color: var(--color-text-light)"
              >Horas</span
            >
          </div>
          <div class="flex flex-col items-center">
            <div
              class="w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center text-2xl sm:text-3xl font-light mb-3 countdown-circle"
            >
              {{ countdown.minutes }}
            </div>
            <span
              class="text-[10px] tracking-[0.2em] uppercase font-medium"
              style="color: var(--color-text-light)"
              >Minutos</span
            >
          </div>
          <div class="flex flex-col items-center">
            <div
              class="w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center text-2xl sm:text-3xl font-light mb-3 countdown-circle"
            >
              {{ countdown.seconds }}
            </div>
            <span
              class="text-[10px] tracking-[0.2em] uppercase font-medium"
              style="color: var(--color-text-light)"
              >Segundos</span
            >
          </div>
        </div>

        <button (click)="createReminder()" class="buttonAction">
          <span class="material-icons text-lg">event</span>
          Agendar Recordatorio
        </button>
      </div>
    </section>
  `,
  styles: [
    `
      .countdown-circle {
        border: 2px solid var(--color-gold-light);
        color: var(--color-gold-dark);
        background: rgba(184, 164, 114, 0.05);
        transition: all 0.3s ease;
      }
      .countdown-circle:hover {
        border-color: var(--color-gold);
        background: rgba(184, 164, 114, 0.1);
      }
    `,
  ],
})
export class CountdownComponent implements OnInit, OnDestroy {
  countdown: CountdownTime = { days: 0, hours: 0, minutes: 0, seconds: 0 };
  private subscription?: Subscription;

  constructor(private weddingService: WeddingService) {}

  ngOnInit(): void {
    this.subscription = this.weddingService
      .getCountdown()
      .subscribe((countdown) => (this.countdown = countdown));
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  createReminder(): void {
    this.weddingService.createCalendarEvent();
  }
}

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
    <section class="pt-16 bg-white text-center">
      <div class="max-w-2xl mx-auto px-5">
        <div class="flex justify-center gap-4 mb-8">
          <div class="flex flex-col items-center">
            <span
              class="w-20 h-20 background-primary text-white rounded-full flex items-center justify-center text-2xl font-semibold mb-2"
            >
              {{ countdown.days }}
            </span>
            <span class="text-sm font-medium text-gray-600">DÍAS</span>
          </div>
          <div class="flex flex-col items-center">
            <span
              class="w-20 h-20 background-primary text-white rounded-full flex items-center justify-center text-2xl font-semibold mb-2"
            >
              {{ countdown.hours }}
            </span>
            <span class="text-sm font-medium text-gray-600">HORAS</span>
          </div>
          <div class="flex flex-col items-center">
            <span
              class="w-20 h-20 background-primary text-white rounded-full flex items-center justify-center text-2xl font-semibold mb-2"
            >
              {{ countdown.minutes }}
            </span>
            <span class="text-sm font-medium text-gray-600">MINUTOS</span>
          </div>
          <div class="flex flex-col items-center">
            <span
              class="w-20 h-20 background-primary text-white rounded-full flex items-center justify-center text-2xl font-semibold mb-2"
            >
              {{ countdown.seconds }}
            </span>
            <span class="text-sm font-medium text-gray-600">SEGUNDOS</span>
          </div>
        </div>

        <button (click)="createReminder()" class="buttonAction">
          <span class="material-icons text-lg">event</span>
          Agendar Recordatorio
        </button>
      </div>
    </section>
  `,
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

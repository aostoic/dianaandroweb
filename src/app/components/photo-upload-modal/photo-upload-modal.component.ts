import { Component, Input, Output, EventEmitter } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-photo-upload-modal",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      *ngIf="isOpen"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm"
      (click)="onBackdropClick($event)"
    >
      <div
        class="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 transform transition-all duration-300 ease-out"
        [class.scale-100]="isOpen"
        [class.opacity-100]="isOpen"
        (click)="$event.stopPropagation()"
      >
        <!-- Header -->
        <div class="relative p-6 pb-4">
          <button
            (click)="close()"
            class="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors duration-200"
          >
            <span class="material-icons text-gray-600 ">close</span>
          </button>

          <div class="text-center">
            <div
              class="w-16 h-16 mx-auto  flex items-center justify-center rounded-full"
              style="background: rgba(184, 164, 114, 0.1)"
            >
              <span class="material-icons text-2xl" style="color: var(--color-gold)"
                >photo_camera</span
              >
            </div>
            <h4>¡Pronto podrás subir fotos!</h4>
          </div>
        </div>

        <!-- Content -->
        <div class="px-6 pb-6">
          <div class=" rounded-xl p-4 mb-6">
            <div class="flex items-center gap-3">
              <div
                class="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
              style="background-color: var(--color-gold)"
              >
                <span class="material-icons text-white text-sm">info</span>
              </div>
              <div class="text-sm text-gray-600 leading-relaxed">
                Esta función solo estará habilitada
                <strong>días antes de la boda</strong> para que puedas subir tu
                proceso de viaje y compartir tu experiencia con nosotros.
              </div>
            </div>
          </div>

          <div class="text-center mb-6">
            <div class="flex items-center justify-center gap-2  mb-2">
              <span class="text-sm font-bold"
                >¡Esperamos ver tus aventuras!</span
              >
            </div>
            <p class="text-xs text-gray-500">Camino a nuestro gran día</p>
          </div>

          <!-- Features Preview -->
          <div class="grid grid-cols-2 gap-3 mb-6">
            <div class="bg-gray-50 rounded-lg p-3 text-center">
              <span class="material-icons text-gray-600 text-xl mb-1"
                >flight_takeoff</span
              >
              <p class="text-xs text-gray-600">Tu viaje</p>
            </div>
            <div class="bg-gray-50 rounded-lg p-3 text-center">
              <span class="material-icons text-gray-600 text-xl mb-1"
                >hotel</span
              >
              <p class="text-xs text-gray-600">Tu estadía</p>
            </div>
            <div class="bg-gray-50 rounded-lg p-3 text-center">
              <span class="material-icons text-gray-600 text-xl mb-1"
                >restaurant</span
              >
              <p class="text-xs text-gray-600">Experiencias</p>
            </div>
            <div class="bg-gray-50 rounded-lg p-3 text-center">
              <span class="material-icons text-gray-600 text-xl mb-1"
                >celebration</span
              >
              <p class="text-xs text-gray-600">Momentos</p>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex gap-3">
            <button
              (click)="close()"
              class="flex-1 px-4 py-3 border-2 border-gray-200 text-gray-600 rounded-full text-sm font-medium hover:bg-gray-50 transition-all duration-200"
            >
              Entendido
            </button>
            <button (click)="notifyMe()" class="buttonAction ">
              <span class="flex items-center justify-center gap-1">
                <span class="material-icons text-sm">notifications</span>
                Notificarme
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .backdrop-blur-sm {
        backdrop-filter: blur(4px);
      }

      @keyframes modalEnter {
        from {
          opacity: 0;
          transform: scale(0.9) translateY(-10px);
        }
        to {
          opacity: 1;
          transform: scale(1) translateY(0);
        }
      }

      .modal-enter {
        animation: modalEnter 0.3s ease-out;
      }
    `,
  ],
})
export class PhotoUploadModalComponent {
  @Input() isOpen = false;
  @Output() closeModal = new EventEmitter<void>();

  close(): void {
    this.closeModal.emit();
  }

  onBackdropClick(event: Event): void {
    if (event.target === event.currentTarget) {
      this.close();
    }
  }

  notifyMe(): void {
    // Aquí podrías implementar la lógica para notificar al usuario
    alert("¡Te notificaremos cuando la función esté disponible! 📱");
    this.close();
  }
}

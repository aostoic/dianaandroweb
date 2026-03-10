import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { WeddingService } from "../../services/wedding.service";
import { RSVPForm } from "../../models/wedding.model";

@Component({
  selector: "app-rsvp",
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section class="py-16 text-center" style="background-color: var(--color-cream)">
      <div class="max-w-2xl mx-auto px-5">
        <div
          class="w-14 h-14 mx-auto flex items-center justify-center rounded-full"
          style="background: rgba(184, 164, 114, 0.1)"
        >
          <span class="material-icons text-3xl" style="color: var(--color-gold)">
            check_circle
          </span>
        </div>
        <h1 style="margin-top: -25px;">Confirmación</h1>

        <div class="section-divider mb-6"></div>

        <p class="text-sm font-light mb-10" style="color: var(--color-text-light)">
          Por favor, confirma tu asistencia
          <br />
          ¡Esperamos que estés allí!
        </p>

        <form
          (ngSubmit)="onSubmit()"
          #rsvpForm="ngForm"
          class="max-w-lg mx-auto"
        >
          <div class="flex justify-center gap-8 mb-8">
            <label
              class="flex items-center cursor-pointer text-sm"
              style="color: var(--color-text)"
            >
              <input
                type="radio"
                name="attendance"
                value="yes"
                [(ngModel)]="formData.attendance"
                class="hidden"
              />
              <span
                class="w-5 h-5 border-2 rounded-full mr-2 relative flex items-center justify-center transition-colors"
                [style.border-color]="formData.attendance === 'yes' ? 'var(--color-gold)' : '#ccc'"
              >
                <span
                  *ngIf="formData.attendance === 'yes'"
                  class="w-2.5 h-2.5 rounded-full"
                  style="background-color: var(--color-gold)"
                ></span>
              </span>
              Sí, allí estaré!
            </label>

            <label
              class="flex items-center cursor-pointer text-sm"
              style="color: var(--color-text)"
            >
              <input
                type="radio"
                name="attendance"
                value="no"
                [(ngModel)]="formData.attendance"
                class="hidden"
              />
              <span
                class="w-5 h-5 border-2 rounded-full mr-2 relative flex items-center justify-center transition-colors"
                [style.border-color]="formData.attendance === 'no' ? 'var(--color-gold)' : '#ccc'"
              >
                <span
                  *ngIf="formData.attendance === 'no'"
                  class="w-2.5 h-2.5 rounded-full"
                  style="background-color: var(--color-gold)"
                ></span>
              </span>
              No podré asistir
            </label>
          </div>
          <input
            type="text"
            placeholder="Nombre y apellido"
            [(ngModel)]="formData.name"
            name="name"
            required
            class="rsvp-input"
          />
          @if(formData.attendance === 'yes'){

          <input
            type="text"
            placeholder="Teléfono"
            [(ngModel)]="formData.phone"
            name="phone"
            required
            class="rsvp-input"
          />

          <div class="flex justify-center gap-8">
            <label
              class="mb-4 flex items-center cursor-pointer text-sm"
              style="color: var(--color-text)"
            >
              <input
                (click)="clickChangeCompanion()"
                type="radio"
                name="companion"
                value="yes"
                [(ngModel)]="formData.companion"
                class="hidden"
              />
              <span
                class="w-5 h-5 border-2 rounded-full mr-2 relative flex items-center justify-center transition-colors"
                [style.border-color]="formData.companion === 'yes' ? 'var(--color-gold)' : '#ccc'"
              >
                @if(formData.companion === 'yes'){
                <span
                  class="w-2.5 h-2.5 rounded-full"
                  style="background-color: var(--color-gold)"
                ></span>
                }
              </span>
              ¿Vas con acompañante?
            </label>
          </div>
          @if(formData.companion === 'yes'){
          <input
            type="text"
            placeholder="Nombre del acompañante:"
            [(ngModel)]="formData.companionName"
            name="companionName"
            required
            class="rsvp-input"
          />
          }

          <textarea
            placeholder="Intolerancias o alergias alimentarias:"
            [(ngModel)]="formData.allergies"
            name="allergies"
            rows="3"
            class="rsvp-input resize-y"
          ></textarea>

          <textarea
            placeholder="¿Qué canción no puede faltar?:"
            [(ngModel)]="formData.song"
            name="song"
            rows="3"
            class="rsvp-input resize-y"
          ></textarea>

          <textarea
            placeholder="Mensaje para los novios:"
            [(ngModel)]="formData.message"
            name="message"
            rows="4"
            class="rsvp-input resize-y"
          ></textarea>
          } @if(!loading){
          <button
            [disabled]="disabledButton()"
            type="submit"
            class="buttonAction mt-4 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            ENVIAR RESPUESTA
          </button>
          }@else {
          <button
            type="button"
            class="buttonAction mt-4 disabled:opacity-40"
            disabled
          >
            Enviando...
          </button>
          }
        </form>
      </div>
    </section>

    @if(viewModal){
    <div
      class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
      (click)="closeModal()"
    >
      <div class="bg-white rounded-2xl w-full max-w-md mx-4 p-6 relative" (click)="$event.stopPropagation()">
        <button
          (click)="closeModal()"
          class="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
        >
          <span class="material-icons text-gray-500">close</span>
        </button>
        <h2 class="text-3xl mb-2">¡Gracias!</h2>
        <div class="section-divider mb-4"></div>
        <p class="text-sm" style="color: var(--color-text-light)">
          Hemos recibido tu confirmación de asistencia.
        </p>
        @if(this.formData.attendance === "yes"){
        <a class="buttonAction mt-4" href="#dress-code" (click)="closeModal()">
          Revisa el dress code
        </a>
        <a class="buttonAction mt-4" href="#gifts" (click)="closeModal()">
          Ver lista de regalos
        </a>
        } @else {
        <p class="text-sm mt-2" style="color: var(--color-text-light)">
          Lamentamos que no puedas asistir. ¡Te extrañaremos!
        </p>
        }
      </div>
    </div>
    }
  `,
  styles: [`
    .rsvp-input {
      width: 100%;
      padding: 0.875rem 1rem;
      margin-bottom: 0.75rem;
      border: 1.5px solid #e5e5e5;
      border-radius: 0.75rem;
      font-family: inherit;
      font-size: 0.875rem;
      color: var(--color-text);
      background: #fff;
      transition: border-color 0.3s ease, box-shadow 0.3s ease;
      outline: none;
    }
    .rsvp-input:focus {
      border-color: var(--color-gold);
      box-shadow: 0 0 0 3px rgba(184, 164, 114, 0.1);
    }
    .rsvp-input::placeholder {
      color: #bbb;
    }
  `]
})
export class RSVPComponent {
  // Aquí puedes implementar la lógica para cerrar el modal
  formData: RSVPForm = {
    attendance: null,
    name: "",
    phone: "",
    companion: "no",
    allergies: "",
    song: "",
    message: "",
    companionName: "",
  };
  viewModal = false;

  loading = false;

  constructor(private weddingService: WeddingService) {}

  closeModal(): void {
    this.viewModal = false;
    this.resetForm();
  }

  onSubmit(): void {
    this.loading = true;
    if (!this.formData.attendance) {
      alert("Por favor, selecciona si podrás asistir o no.");
      return;
    }

    if (!this.formData.name.trim()) {
      alert("Por favor, ingresa tu nombre y apellido.");
      return;
    }

    this.weddingService.submitRSVP(this.formData).subscribe({
      next: (response) => {
        this.loading = false;
        console.log("Respuesta del servidor:", response);

        this.viewModal = true;
      },
      error: (error) => {
        this.loading = false;
        this.resetForm();

        console.error("Error al enviar la respuesta:", error);
        alert("Hubo un error al enviar tu respuesta.");
      },
    });
  }

  private resetForm(): void {
    this.formData = {
      attendance: null,
      name: "",
      phone: "",
      allergies: "",
      song: "",
      message: "",
      companion: "no",
      companionName: "",
    };
  }

  clickChangeCompanion(): void {
    this.formData.companion = this.formData.companion === "yes" ? "no" : "yes";
    if (this.formData.companion === "no") {
      this.formData.companionName = "";
    }
  }

  disabledButton(): boolean {
    if (this.formData.attendance === "yes") {
      // Validar todos los campos obligatorios
      return !(
        this.formData.name.trim() &&
        this.formData.phone.trim() &&
        this.formData.allergies.trim() &&
        this.formData.song.trim() &&
        this.formData.message.trim() &&
        (this.formData.companion === "no" ||
          (this.formData.companion === "yes" &&
            this.formData.companionName.trim()))
      );
    }

    if (this.formData.attendance === "no" && !this.formData.name.trim()) {
      return true;
    } else {
      if (this.formData.attendance === "no" && this.formData.name.trim()) {
        return false;
      }
    }
    return true;
  }
}

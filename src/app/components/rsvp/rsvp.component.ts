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
    <section class="py-16 bg-white text-center">
      <div class="max-w-2xl mx-auto px-5">
        <div
          class="w-16 h-16 mx-auto mb-8 flex items-center justify-center bg-gray-100 rounded-full"
        >
          <span class="material-icons text-4xl text-primary">
            check_circle
          </span>
        </div>
        <h1 style="    margin-top: -30px;">Confirmación</h1>

        <p class="text-base text-gray-600 mb-12">
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
              class="flex items-center cursor-pointer text-sm text-gray-600"
            >
              <input
                type="radio"
                name="attendance"
                value="yes"
                [(ngModel)]="formData.attendance"
                class="hidden"
              />
              <span
                class="w-5 h-5 border-2 border-gray-600 rounded-full mr-2 relative flex items-center justify-center"
              >
                <span
                  *ngIf="formData.attendance === 'yes'"
                  class="w-2.5 h-2.5 background-primary rounded-full"
                ></span>
              </span>
              Sí, allí estaré!
            </label>

            <label
              class="flex items-center cursor-pointer text-sm text-gray-600"
            >
              <input
                type="radio"
                name="attendance"
                value="no"
                [(ngModel)]="formData.attendance"
                class="hidden"
              />
              <span
                class="w-5 h-5 border-2 border-gray-600 rounded-full mr-2 relative flex items-center justify-center"
              >
                <span
                  *ngIf="formData.attendance === 'no'"
                  class="w-2.5 h-2.5 background-primary rounded-full"
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
            class="w-full p-4 mb-4 border-2 border-gray-200 rounded-lg font-inherit text-sm focus:outline-none focus:border-gray-600 transition-colors"
          />
          @if(formData.attendance === 'yes'){

          <input
            type="text"
            placeholder="Teléfono"
            [(ngModel)]="formData.phone"
            name="phone"
            required
            class="w-full p-4 mb-4 border-2 border-gray-200 rounded-lg font-inherit text-sm focus:outline-none focus:border-gray-600 transition-colors"
          />

          <!-- Acompañante -->
          <div class="flex justify-center gap-8">
            <label
              class="mb-4 flex items-center cursor-pointer text-sm text-gray-600"
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
                class="w-5 h-5 border-2 border-gray-600 rounded-full mr-2 relative flex items-center justify-center"
              >
                @if(formData.companion === 'yes'){
                <span
                  class="w-2.5 h-2.5 background-primary rounded-full"
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
            class="w-full p-4 mb-4 border-2 border-gray-200 rounded-lg font-inherit text-sm focus:outline-none focus:border-gray-600 transition-colors"
          />
          }

          <textarea
            placeholder="Intolerancias o alergias alimentarias:"
            [(ngModel)]="formData.allergies"
            name="allergies"
            rows="3"
            class="w-full p-4 mb-4 border-2 border-gray-200 rounded-lg font-inherit text-sm resize-y focus:outline-none focus:border-gray-600 transition-colors"
          ></textarea>

          <textarea
            placeholder="¿Qué canción no puede faltar?:"
            [(ngModel)]="formData.song"
            name="song"
            rows="3"
            class="w-full p-4 mb-4 border-2 border-gray-200 rounded-lg font-inherit text-sm resize-y focus:outline-none focus:border-gray-600 transition-colors"
          ></textarea>

          <textarea
            placeholder="Mensaje para los novios:"
            [(ngModel)]="formData.message"
            name="message"
            rows="4"
            class="w-full p-4 border-2 border-gray-200 rounded-lg font-inherit text-sm resize-y focus:outline-none focus:border-gray-600 transition-colors"
          ></textarea>
          } @if(!loading){
          <button
            [disabled]="disabledButton()"
            type="submit"
            class="buttonAction mt-4 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:text-gray-500"
          >
            ENVIAR RESPUESTA
          </button>
          }@else {
          <button
            type="button"
            class="buttonAction mt-4 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:text-gray-500"
            disabled
          >
            Cargando...
          </button>
          }
        </form>

        <!-- <div class="text-center">
          <p class="font-great-vibes text-4xl text-gray-600 mb-2">
            Te esperamos
          </p>
          <p class="font-great-vibes text-3xl text-gray-600">Andro y Diana</p>
        </div> -->
      </div>
    </section>

    <!-- modal gracias  -->
    @if(viewModal){
    <div
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-lg w-full max-w-2xl mx-4 p-4 relative">
        <button
          (click)="closeModal()"
          class="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>
        <h2 class="text-3xl  mb-4">¡Gracias por tu respuesta!</h2>
        <p class="text-gray-600">
          Hemos recibido tu confirmación de asistencia.
        </p>
        @if(this.formData.attendance === "yes"){
        <!-- <p class="text-gray-600">
          ¡Estamos emocionados de verte en nuestro gran día!
        </p> -->
        <a class="buttonAction mt-4" href="#dress-code" (click)="closeModal()">
          Revisa el dress code
        </a>
        <a class="buttonAction mt-4" href="#gifts" (click)="closeModal()">
          Ver lista de regalos
        </a>

        } @else {
        <p class="text-gray-600">
          Lamentamos que no puedas asistir. ¡Te extrañaremos!
        </p>
        }
      </div>
    </div>
    }
  `,
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

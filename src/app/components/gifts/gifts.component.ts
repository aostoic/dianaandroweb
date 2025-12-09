import { Component } from "@angular/core";
import { WeddingService } from "../../services/wedding.service";
import { CommonModule } from "@angular/common";
interface Gift {
  name: string;
  description: string;
  price: number;
  img?: string; // Optional image property
  link?: string; // Optional link property for external purchases
}
@Component({
  selector: "app-gifts",
  standalone: true,
  imports: [CommonModule],
  template: `
    <section
      id="gifts"
      class="py-16 bg-white text-center border-b border-gray-200"
    >
      <div class="max-w-2xl mx-auto px-5">
        <div
          class="w-16 h-16 mx-auto mb-8 flex items-center justify-center bg-gray-100 rounded-full"
        >
          <span class="material-icons text-4xl text-primary">
            card_giftcard
          </span>
        </div>

        <h1 style="    margin-top: -30px;">Regalos</h1>

        <p
          class="text-base text-gray-600 max-w-md mx-auto mb-8 leading-relaxed"
        >
          Lo más importante es tu presencia, pero si deseas hacernos un regalo,
          puedes ver nuestra lista de regalos.
        </p>

        <button (click)="openModal()" class="buttonAction">
          VER LISTA DE REGALOS
        </button>
      </div>
    </section>
    @if (isModalOpen) {
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
        <h2 class="text-3xl  mb-4">Nuestra Lista de Regalos</h2>
        <ul style="max-height: 40rem" class="space-y-4 overflow-y-auto">
          <li
            *ngFor="let gift of gifts; let i = index"
            class="border rounded-lg p-4"
          >
            <!-- Contenedor principal: imagen + contenido -->
            <div class="flex items-start space-x-4">
              <!-- Imagen a la izquierda -->
              <img
                *ngIf="gift.img"
                [src]="gift.img"
                alt="{{ gift.name }}"
                class="w-24 h-24 object-cover rounded-2xl flex-shrink-0"
              />
              <!-- Título y descripción a la derecha -->
              <div class="flex-1 text-left ">
                <p class="font-bold text-lg">{{ gift.name }}</p>
                <p class="text-gray-600">{{ gift.description }}</p>
              </div>
            </div>

            <!-- Precio y botón en fila separada -->
            <div class="mt-4 flex items-end justify-between w-full">
              <span class="font-semibold text-primary">
                {{ gift.price | currency : "" : "symbol" : "1.0-0" }}
              </span>
              <button (click)="weddingService.openLink(gift.link)" class="">
                Regalar
              </button>
            </div>
          </li>
        </ul>
      </div>
    </div>
    }
  `,
})
export class GiftsComponent {
  constructor(public weddingService: WeddingService) {}

  isModalOpen = false;

  gifts: Gift[] = [
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

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }
}

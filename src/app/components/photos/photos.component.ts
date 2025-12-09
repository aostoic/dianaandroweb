import { Component } from "@angular/core";
import { WeddingService } from "../../services/wedding.service";
import { PhotoUploadModalComponent } from "../photo-upload-modal/photo-upload-modal.component";

@Component({
  selector: "app-photos",
  standalone: true,
  imports: [PhotoUploadModalComponent],
  styles: [
    `
      section.bg {
        background-color: #e7da97;
      }
    `,
  ],
  template: `
    <section class="py-16 bg  text-white text-center">
      <div class="max-w-2xl mx-auto px-5">
        <div
          class="w-16 h-16 mx-auto mb-8 flex items-center justify-center bg-white bg-opacity-20 rounded-full"
        >
          <span class="material-icons text-4xl text-white"> photo_camera </span>
        </div>

        <h1 style="margin-top: -30px;">Fotos</h1>

        <p class="text-base mb-8 opacity-90">Sube fotos de la boda al álbum!</p>

        <div class="flex flex-col gap-4 max-w-xs mx-auto">
          <button
            (click)="openUploadModal()"
            class="border-2 border-white text-white px-8 py-4 rounded-full text-sm font-medium hover:bg-white hover:text-gray-600 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <span class="material-icons text-lg">cloud_upload</span>
            SUBIR FOTO
          </button>

          <button
            (click)="viewPhotos()"
            class="border-2 border-white text-white px-8 py-4 rounded-full text-sm font-medium hover:bg-white hover:text-gray-600 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <span class="material-icons text-lg">photo_library</span>
            VER FOTOS SUBIDAS
          </button>
        </div>
      </div>
    </section>

    <app-photo-upload-modal
      [isOpen]="isModalOpen"
      (closeModal)="closeModal()"
    ></app-photo-upload-modal>

    <!-- modal para ver fotos subidas -->
    @if(modalUpload){
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
        <h4>Fotos subidas</h4>
        <p class="text-base text-gray-600 mb-8">
          Acá se verán las fotos que has subido y las de los invitados.
        </p>
        <!-- Aquí iría el componente o lógica para mostrar las fotos subidas -->
      </div>
    </div>
    }
  `,
})
export class PhotosComponent {
  constructor(private weddingService: WeddingService) {}

  uploadPhoto(): void {
    this.weddingService.showUploadPhotoMessage();
  }
  isModalOpen = false;
  modalUpload = false;

  openUploadModal(): void {
    this.isModalOpen = true;
    this.modalUpload = false;
  }
  openModalUpload(): void {
    this.modalUpload = true;
    this.isModalOpen = false;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.modalUpload = false;
  }

  viewPhotos(): void {
    this.openModalUpload();
  }
}

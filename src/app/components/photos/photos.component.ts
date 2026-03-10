import { Component } from "@angular/core";
import { WeddingService } from "../../services/wedding.service";
import { PhotoUploadModalComponent } from "../photo-upload-modal/photo-upload-modal.component";

@Component({
  selector: "app-photos",
  standalone: true,
  imports: [PhotoUploadModalComponent],
  template: `
    <section class="py-16 text-white text-center photos-section">
      <div class="max-w-2xl mx-auto px-5">
        <div
          class="w-14 h-14 mx-auto flex items-center justify-center rounded-full"
          style="background: rgba(255,255,255,0.15)"
        >
          <span class="material-icons text-3xl text-white"> photo_camera </span>
        </div>

        <h1 style="margin-top: -25px; color: #fff">Fotos</h1>

        <div
          class="section-divider mb-6"
          style="background: rgba(255,255,255,0.4)"
        ></div>

        <p class="text-sm font-light mb-8 opacity-90">
          Sube fotos de la boda al álbum
        </p>

        <div class="flex flex-col gap-4 max-w-xs mx-auto">
          <button
            (click)="openUploadModal()"
            class="border-2 border-white/70 text-white px-8 py-3.5 rounded-full text-sm font-medium hover:bg-white hover:text-gray-700 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <span class="material-icons text-lg">cloud_upload</span>
            SUBIR FOTO
          </button>

          <button
            (click)="viewPhotos()"
            class="border-2 border-white/70 text-white px-8 py-3.5 rounded-full text-sm font-medium hover:bg-white hover:text-gray-700 transition-all duration-300 flex items-center justify-center gap-2"
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

    @if (modalUpload) {
      <div
        class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
        (click)="closeModal()"
      >
        <div
          class="bg-white rounded-2xl w-full max-w-2xl mx-4 p-6 relative"
          (click)="$event.stopPropagation()"
        >
          <button
            (click)="closeModal()"
            class="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          >
            <span class="material-icons text-gray-500">close</span>
          </button>
          <h4>Fotos subidas</h4>
          <div class="section-divider mb-4"></div>
          <p class="text-sm text-gray-500">
            Acá se verán las fotos que has subido y las de los invitados.
          </p>
        </div>
      </div>
    }
  `,
  styles: [
    `
      .photos-section {
        background: linear-gradient(135deg, #b8a472 0%, #9a8a5e 100%);
      }
    `,
  ],
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

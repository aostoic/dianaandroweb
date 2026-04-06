import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PhotoUploadModalComponent } from "../photo-upload-modal/photo-upload-modal.component";
import { MediaService } from "../../services/media.service";
import { MediaItem } from "../../models/wedding.model";

@Component({
  selector: "app-photos",
  standalone: true,
  imports: [CommonModule, PhotoUploadModalComponent],
  template: `
    <section class="py-16 text-white text-center photos-section">
      <div class="max-w-2xl mx-auto px-5">
        <div
          class="w-14 h-14 mx-auto flex items-center justify-center rounded-full"
          style="background: rgba(255,255,255,0.15)"
        >
          <span class="material-icons text-3xl text-white">photo_camera</span>
        </div>

        <h1 style="margin-top: -25px; color: #fff">Fotos</h1>

        <div
          class="section-divider mb-6"
          style="background: rgba(255,255,255,0.4)"
        ></div>

        <p class="text-sm font-light mb-8 opacity-90">
          Sube fotos y videos de la boda al álbum compartido
        </p>

        <div class="flex flex-col gap-4 max-w-xs mx-auto">
          <button
            (click)="openUploadModal()"
            class="border-2 border-white/70 text-white px-8 py-3.5 rounded-full text-sm font-medium hover:bg-white hover:text-gray-700 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <span class="material-icons text-lg">cloud_upload</span>
            SUBIR FOTO / VIDEO
          </button>

          <button
            (click)="openGallery()"
            class="border-2 border-white/70 text-white px-8 py-3.5 rounded-full text-sm font-medium hover:bg-white hover:text-gray-700 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <span class="material-icons text-lg">photo_library</span>
            VER GALERÍA
            @if (mediaCount > 0) {
              <span
                class="ml-1 text-xs bg-white/20 px-2 py-0.5 rounded-full"
                >{{ mediaCount }}</span
              >
            }
          </button>
        </div>
      </div>
    </section>

    <!-- Upload Modal -->
    <app-photo-upload-modal
      [isOpen]="showUploadModal"
      (closeModal)="showUploadModal = false"
      (uploadComplete)="refreshMedia()"
    ></app-photo-upload-modal>

    <!-- Gallery Modal -->
    @if (showGallery) {
      <div
        class="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex flex-col gallery-overlay-enter"
      >
        <!-- Gallery Header -->
        <div
          class="flex items-center justify-between px-4 py-3 flex-shrink-0"
        >
          <div class="flex items-center gap-3">
            <h3 class="text-white text-lg" style="margin: 0; font-size: 1.8rem !important">
              Galería
            </h3>
            <span class="text-white/50 text-xs">{{ mediaItems.length }} archivos</span>
          </div>
          <div class="flex items-center gap-2">
            <!-- Filter buttons -->
            <div class="flex bg-white/10 rounded-full p-0.5 gap-0.5">
              <button
                (click)="filterType = 'all'"
                class="px-3 py-1 rounded-full text-[11px] font-medium transition-all"
                [class.bg-white]="filterType === 'all'"
                [class.text-gray-700]="filterType === 'all'"
                [style.color]="filterType !== 'all' ? 'rgba(255,255,255,0.7)' : null"
              >
                Todo
              </button>
              <button
                (click)="filterType = 'photo'"
                class="px-3 py-1 rounded-full text-[11px] font-medium transition-all"
                [class.bg-white]="filterType === 'photo'"
                [class.text-gray-700]="filterType === 'photo'"
                [style.color]="filterType !== 'photo' ? 'rgba(255,255,255,0.7)' : null"
              >
                Fotos
              </button>
              <button
                (click)="filterType = 'video'"
                class="px-3 py-1 rounded-full text-[11px] font-medium transition-all"
                [class.bg-white]="filterType === 'video'"
                [class.text-gray-700]="filterType === 'video'"
                [style.color]="filterType !== 'video' ? 'rgba(255,255,255,0.7)' : null"
              >
                Videos
              </button>
            </div>
            <button
              (click)="closeGallery()"
              class="w-9 h-9 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
            >
              <span class="material-icons text-white">close</span>
            </button>
          </div>
        </div>

        <!-- Gallery Grid -->
        <div class="flex-1 overflow-y-auto px-3 pb-4 gallery-scroll">
          @if (loading) {
            <div class="flex flex-col items-center justify-center py-20">
              <div class="media-spinner mb-3"></div>
              <p class="text-white/50 text-sm">Cargando galería...</p>
            </div>
          } @else if (filteredItems.length === 0) {
            <div class="flex flex-col items-center justify-center py-20">
              <span class="material-icons text-5xl text-white/20 mb-3"
                >photo_library</span
              >
              <p class="text-white/50 text-sm mb-4">
                @if (mediaItems.length === 0) {
                  Aún no hay fotos ni videos
                } @else {
                  No hay {{ filterType === 'photo' ? 'fotos' : 'videos' }}
                }
              </p>
              <button
                (click)="closeGallery(); openUploadModal()"
                class="px-5 py-2 rounded-full text-sm font-medium border border-white/30 text-white hover:bg-white/10 transition-all"
              >
                Subir la primera
              </button>
            </div>
          } @else {
            <div class="grid grid-cols-3 sm:grid-cols-4 gap-1.5">
              @for (item of filteredItems; track item.id) {
                <div
                  class="relative aspect-square cursor-pointer group overflow-hidden rounded-lg"
                  (click)="openLightbox(item)"
                >
                  @if (item.type === 'photo') {
                    <img
                      [src]="item.url"
                      class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                      alt=""
                    />
                  } @else {
                    <div
                      class="w-full h-full bg-gray-800 flex items-center justify-center relative"
                    >
                      <video
                        [src]="item.url"
                        class="w-full h-full object-cover"
                        preload="metadata"
                      ></video>
                      <div
                        class="absolute inset-0 flex items-center justify-center bg-black/30"
                      >
                        <span
                          class="material-icons text-white text-3xl drop-shadow-lg"
                          >play_circle_filled</span
                        >
                      </div>
                    </div>
                  }
                  <!-- Overlay con info -->
                  <div
                    class="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <p class="text-white text-[10px] truncate">
                      {{ item.uploaderName }}
                    </p>
                  </div>
                  @if (item.type === 'video') {
                    <span
                      class="absolute top-1.5 right-1.5 material-icons text-white text-sm drop-shadow"
                      >videocam</span
                    >
                  }
                  @if (isOwn(item)) {
                    <button
                      (click)="deleteMedia(item); $event.stopPropagation()"
                      class="absolute top-1.5 left-1.5 w-6 h-6 bg-red-500/80 hover:bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"
                      title="Eliminar"
                    >
                      <span class="material-icons" style="font-size: 14px">delete</span>
                    </button>
                  }
                </div>
              }
            </div>
          }
        </div>

        <!-- FAB para subir desde galería -->
        <button
          (click)="closeGallery(); openUploadModal()"
          class="fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-transform hover:scale-110 z-[60]"
          style="background: var(--color-gold)"
        >
          <span class="material-icons text-white text-2xl">add_a_photo</span>
        </button>
      </div>
    }

    <!-- Lightbox -->
    @if (lightboxItem) {
      <div
        class="fixed inset-0 z-[70] bg-black flex items-center justify-center lightbox-enter"
        (click)="closeLightbox()"
      >
        <!-- Close button -->
        <button
          class="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          (click)="closeLightbox()"
        >
          <span class="material-icons text-white">close</span>
        </button>

        <!-- Navigation arrows -->
        @if (filteredItems.length > 1) {
          <button
            class="absolute left-2 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            (click)="navigateLightbox(-1); $event.stopPropagation()"
          >
            <span class="material-icons text-white">chevron_left</span>
          </button>
          <button
            class="absolute right-2 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            (click)="navigateLightbox(1); $event.stopPropagation()"
          >
            <span class="material-icons text-white">chevron_right</span>
          </button>
        }

        <!-- Media content -->
        <div
          class="max-w-[95vw] max-h-[85vh] flex items-center justify-center"
          (click)="$event.stopPropagation()"
        >
          @if (lightboxItem.type === 'photo') {
            <img
              [src]="lightboxItem.url"
              class="max-w-full max-h-[85vh] object-contain rounded-lg"
              alt=""
            />
          } @else {
            <video
              [src]="lightboxItem.url"
              class="max-w-full max-h-[85vh] rounded-lg"
              controls
              autoplay
            ></video>
          }
        </div>

        <!-- Info bar -->
        <div
          class="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent"
        >
          <div class="max-w-lg mx-auto text-center">
            <p class="text-white text-sm font-medium">
              {{ lightboxItem.uploaderName }}
            </p>
            @if (lightboxItem.caption) {
              <p class="text-white/70 text-xs mt-0.5">
                {{ lightboxItem.caption }}
              </p>
            }
            <p class="text-white/40 text-[10px] mt-1">
              {{ formatDate(lightboxItem.uploadedAt) }}
            </p>
            @if (isOwn(lightboxItem)) {
              <button
                (click)="deleteMedia(lightboxItem); $event.stopPropagation()"
                class="mt-2 inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium bg-red-500/80 hover:bg-red-600 text-white transition-colors"
              >
                <span class="material-icons" style="font-size: 14px">delete</span>
                Eliminar
              </button>
            }
          </div>
        </div>
      </div>
    }
  `,
  styles: [
    `
      .photos-section {
        background: linear-gradient(135deg, #b8a472 0%, #9a8a5e 100%);
      }
      @keyframes galleryOverlayEnter {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
      .gallery-overlay-enter {
        animation: galleryOverlayEnter 0.3s ease-out;
      }
      @keyframes lightboxEnter {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
      .lightbox-enter {
        animation: lightboxEnter 0.2s ease-out;
      }
      .media-spinner {
        width: 32px;
        height: 32px;
        border: 3px solid rgba(255, 255, 255, 0.1);
        border-top-color: var(--color-gold);
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
      }
      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }
      .gallery-scroll::-webkit-scrollbar {
        width: 3px;
      }
      .gallery-scroll::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.2);
        border-radius: 2px;
      }
    `,
  ],
})
export class PhotosComponent implements OnInit {
  showUploadModal = false;
  showGallery = false;
  loading = false;

  mediaItems: MediaItem[] = [];
  mediaCount = 0;
  filterType: "all" | "photo" | "video" = "all";
  lightboxItem: MediaItem | null = null;

  constructor(private mediaService: MediaService) {}

  ngOnInit(): void {
    this.loadMediaCount();
  }

  get filteredItems(): MediaItem[] {
    if (this.filterType === "all") return this.mediaItems;
    return this.mediaItems.filter((m) => m.type === this.filterType);
  }

  openUploadModal(): void {
    this.showUploadModal = true;
  }

  openGallery(): void {
    this.showGallery = true;
    this.loadMedia();
  }

  closeGallery(): void {
    this.showGallery = false;
    this.lightboxItem = null;
  }

  refreshMedia(): void {
    this.loadMediaCount();
    if (this.showGallery) {
      this.loadMedia();
    }
  }

  private loadMediaCount(): void {
    this.mediaService.getMedia().subscribe((items) => {
      this.mediaCount = items.length;
    });
  }

  private loadMedia(): void {
    this.loading = true;
    this.mediaService.getMedia().subscribe({
      next: (items) => {
        this.mediaItems = items;
        this.mediaCount = items.length;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  openLightbox(item: MediaItem): void {
    this.lightboxItem = item;
  }

  closeLightbox(): void {
    this.lightboxItem = null;
  }

  navigateLightbox(direction: number): void {
    if (!this.lightboxItem) return;
    const items = this.filteredItems;
    const currentIndex = items.findIndex((m) => m.id === this.lightboxItem!.id);
    const nextIndex = (currentIndex + direction + items.length) % items.length;
    this.lightboxItem = items[nextIndex];
  }

  isOwn(item: MediaItem): boolean {
    const sid = this.mediaService.getSessionId();
    return sid === 'ADMIN' || (!!item.sessionId && item.sessionId === sid);
  }

  deleteMedia(item: MediaItem): void {
    if (!confirm('¿Eliminar este archivo?')) return;

    this.mediaService.deleteFile(item.id).subscribe({
      next: () => {
        this.mediaItems = this.mediaItems.filter((m) => m.id !== item.id);
        this.mediaCount = this.mediaItems.length;
        if (this.lightboxItem?.id === item.id) {
          this.closeLightbox();
        }
      },
      error: () => {
        alert('No se pudo eliminar el archivo.');
      },
    });
  }

  formatDate(dateStr: string): string {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString("es-CL", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return dateStr;
    }
  }
}

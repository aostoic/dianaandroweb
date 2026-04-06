import { Component, Input, Output, EventEmitter } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MediaService } from "../../services/media.service";
import { UploadProgress } from "../../models/wedding.model";

@Component({
  selector: "app-photo-upload-modal",
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    @if (isOpen) {
      <div
        class="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm"
        (click)="onBackdropClick($event)"
      >
        <div
          class="bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl w-full sm:max-w-lg sm:mx-4 max-h-[92dvh] flex flex-col upload-modal-enter"
          (click)="$event.stopPropagation()"
        >
          <!-- Header -->
          <div class="relative p-5 pb-3 flex-shrink-0">
            <!-- Drag handle mobile -->
            <div class="flex justify-center mb-2 sm:hidden">
              <div
                class="w-10 h-1 rounded-full bg-gray-300"
              ></div>
            </div>
            <button
              (click)="close()"
              class="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
            >
              <span class="material-icons text-gray-500">close</span>
            </button>

            <div class="text-center">
              <div
                class="w-14 h-14 mx-auto flex items-center justify-center rounded-full"
                style="background: rgba(184, 164, 114, 0.1)"
              >
                <span
                  class="material-icons text-2xl"
                  style="color: var(--color-gold)"
                  >cloud_upload</span
                >
              </div>
              <h4 style="margin-top: -10px">Subir fotos y videos</h4>
              <p class="text-xs text-gray-500 -mt-1">
                Comparte tus momentos del matrimonio
              </p>
            </div>
          </div>

          <!-- Content - Scrollable -->
          <div class="px-5 pb-5 overflow-y-auto flex-1 min-h-0">
            <!-- Uploading state -->
            @if (isUploading) {
              <div class="space-y-3 mb-4">
                @for (item of uploadQueue; track item.file.name + $index) {
                  <div class="border border-gray-100 rounded-xl p-3">
                    <div class="flex items-center gap-3">
                      @if (item.preview) {
                        <img
                          [src]="item.preview"
                          class="w-12 h-12 object-cover rounded-lg flex-shrink-0"
                          alt="preview"
                        />
                      } @else {
                        <div
                          class="w-12 h-12 rounded-lg flex-shrink-0 bg-gray-100 flex items-center justify-center"
                        >
                          <span class="material-icons text-gray-400">videocam</span>
                        </div>
                      }
                      <div class="flex-1 min-w-0">
                        <p class="text-xs text-gray-600 truncate">
                          {{ item.file.name }}
                        </p>
                        <div class="w-full bg-gray-100 rounded-full h-1.5 mt-1.5">
                          <div
                            class="h-1.5 rounded-full transition-all duration-300"
                            [style.width.%]="item.progress"
                            [style.background]="
                              item.status === 'error'
                                ? '#ef4444'
                                : item.status === 'done'
                                  ? '#22c55e'
                                  : 'var(--color-gold)'
                            "
                          ></div>
                        </div>
                        <div class="flex items-center justify-between mt-1">
                          <span class="text-[10px] text-gray-400">
                            @if (item.status === 'uploading') {
                              {{ item.progress }}%
                            } @else if (item.status === 'done') {
                              <span class="text-green-500">✓ Subido</span>
                            } @else if (item.status === 'error') {
                              <span class="text-red-500">{{ item.error || 'Error' }}</span>
                            } @else {
                              En espera...
                            }
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                }
              </div>

              @if (allDone) {
                <div class="text-center py-4">
                  <div
                    class="w-16 h-16 mx-auto flex items-center justify-center rounded-full mb-3"
                    style="background: rgba(34, 197, 94, 0.1)"
                  >
                    <span class="material-icons text-3xl text-green-500"
                      >check_circle</span
                    >
                  </div>
                  <p class="text-sm font-medium text-gray-700 mb-1">
                    ¡Fotos subidas con éxito!
                  </p>
                  <p class="text-xs text-gray-500">
                    Gracias por compartir tus momentos
                  </p>
                  <button
                    (click)="resetAndClose()"
                    class="mt-4 px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300"
                    style="
                      background: var(--color-gold);
                      color: #fff;
                    "
                  >
                    Cerrar
                  </button>
                </div>
              }
            } @else {
              <!-- Name input -->
              <div class="mb-4">
                <label class="block text-xs font-medium text-gray-600 mb-1.5"
                  >Tu nombre</label
                >
                <input
                  type="text"
                  [(ngModel)]="uploaderName"
                  placeholder="¿Cómo te llamas?"
                  class="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[var(--color-gold)] transition-colors"
                  maxlength="100"
                />
              </div>

              <!-- Caption input -->
              <div class="mb-4">
                <label class="block text-xs font-medium text-gray-600 mb-1.5"
                  >Comentario
                  <span class="text-gray-400 font-normal"
                    >(opcional)</span
                  ></label
                >
                <input
                  type="text"
                  [(ngModel)]="caption"
                  placeholder="Un recuerdo especial..."
                  class="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[var(--color-gold)] transition-colors"
                  maxlength="500"
                />
              </div>

              <!-- File drop zone -->
              <div
                class="border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-200 mb-4"
                [class.border-gray-200]="!isDragging"
                [class.border-gold-400]="isDragging"
                [class.bg-amber-50]="isDragging"
                (click)="fileInput.click()"
                (dragover)="onDragOver($event)"
                (dragleave)="isDragging = false"
                (drop)="onDrop($event)"
              >
                <span
                  class="material-icons text-3xl mb-2"
                  style="color: var(--color-gold)"
                  >add_photo_alternate</span
                >
                <p class="text-sm text-gray-600 mb-1">
                  Toca para seleccionar o arrastra aquí
                </p>
                <p class="text-[10px] text-gray-400">
                  Fotos (JPG, PNG, WEBP) y Videos (MP4, MOV) · Máx 100MB
                </p>
                <input
                  #fileInput
                  type="file"
                  multiple
                  accept="image/*,video/*"
                  class="hidden"
                  (change)="onFilesSelected($event)"
                />
              </div>

              <!-- Selected files preview -->
              @if (selectedFiles.length > 0) {
                <div class="mb-4">
                  <div
                    class="flex items-center justify-between mb-2"
                  >
                    <span class="text-xs font-medium text-gray-600"
                      >{{ selectedFiles.length }}
                      {{ selectedFiles.length === 1 ? "archivo" : "archivos" }}
                      seleccionados</span
                    >
                    <button
                      (click)="clearFiles()"
                      class="text-xs text-red-400 hover:text-red-500"
                    >
                      Limpiar
                    </button>
                  </div>
                  <div class="grid grid-cols-4 gap-2">
                    @for (
                      preview of filePreviews;
                      track preview.name + $index
                    ) {
                      <div class="relative group">
                        @if (preview.type === "photo") {
                          <img
                            [src]="preview.url"
                            class="w-full aspect-square object-cover rounded-lg"
                            alt="preview"
                          />
                        } @else {
                          <div
                            class="w-full aspect-square bg-gray-100 rounded-lg flex flex-col items-center justify-center"
                          >
                            <span class="material-icons text-gray-400 text-xl"
                              >videocam</span
                            >
                            <span class="text-[9px] text-gray-400 mt-0.5"
                              >Video</span
                            >
                          </div>
                        }
                        <button
                          (click)="removeFile($index)"
                          class="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          ✕
                        </button>
                      </div>
                    }
                  </div>
                </div>
              }

              <!-- Upload button -->
              <button
                (click)="startUpload()"
                [disabled]="!canUpload"
                class="w-full py-3 rounded-full text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2"
                [style.background]="canUpload ? 'var(--color-gold)' : '#e5e7eb'"
                [style.color]="canUpload ? '#fff' : '#9ca3af'"
              >
                <span class="material-icons text-lg">cloud_upload</span>
                Subir {{ selectedFiles.length }}
                {{ selectedFiles.length === 1 ? "archivo" : "archivos" }}
              </button>
            }
          </div>
        </div>
      </div>
    }
  `,
  styles: [
    `
      @keyframes uploadModalEnter {
        from {
          opacity: 0;
          transform: translateY(40px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      .upload-modal-enter {
        animation: uploadModalEnter 0.35s cubic-bezier(0.22, 1, 0.36, 1);
      }
    `,
  ],
})
export class PhotoUploadModalComponent {
  @Input() isOpen = false;
  @Output() closeModal = new EventEmitter<void>();
  @Output() uploadComplete = new EventEmitter<void>();

  uploaderName = "";
  caption = "";
  selectedFiles: File[] = [];
  filePreviews: { url: string; name: string; type: "photo" | "video" }[] = [];
  isDragging = false;

  isUploading = false;
  uploadQueue: UploadProgress[] = [];
  allDone = false;

  constructor(private mediaService: MediaService) {}

  get canUpload(): boolean {
    return this.uploaderName.trim().length > 0 && this.selectedFiles.length > 0;
  }

  close(): void {
    if (!this.isUploading || this.allDone) {
      this.closeModal.emit();
      this.reset();
    }
  }

  onBackdropClick(event: Event): void {
    if (event.target === event.currentTarget) {
      this.close();
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = true;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = false;
    if (event.dataTransfer?.files) {
      this.addFiles(Array.from(event.dataTransfer.files));
    }
  }

  onFilesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.addFiles(Array.from(input.files));
      input.value = "";
    }
  }

  private addFiles(files: File[]): void {
    const validFiles = files.filter((f) => {
      const isMedia =
        f.type.startsWith("image/") || f.type.startsWith("video/");
      const validSize = f.size <= 100 * 1024 * 1024;
      return isMedia && validSize;
    });

    this.selectedFiles.push(...validFiles);

    for (const file of validFiles) {
      if (file.type.startsWith("image/")) {
        const url = URL.createObjectURL(file);
        this.filePreviews.push({ url, name: file.name, type: "photo" });
      } else {
        this.filePreviews.push({ url: "", name: file.name, type: "video" });
      }
    }
  }

  removeFile(index: number): void {
    if (this.filePreviews[index]?.url) {
      URL.revokeObjectURL(this.filePreviews[index].url);
    }
    this.selectedFiles.splice(index, 1);
    this.filePreviews.splice(index, 1);
  }

  clearFiles(): void {
    this.filePreviews.forEach((p) => {
      if (p.url) URL.revokeObjectURL(p.url);
    });
    this.selectedFiles = [];
    this.filePreviews = [];
  }

  startUpload(): void {
    if (!this.canUpload) return;

    this.isUploading = true;
    this.allDone = false;
    this.uploadQueue = this.selectedFiles.map((file) => ({
      file,
      progress: 0,
      status: "pending" as const,
      preview: this.filePreviews.find((p) => p.name === file.name)?.url,
    }));

    this.uploadNext(0);
  }

  private uploadNext(index: number): void {
    if (index >= this.uploadQueue.length) {
      this.allDone = true;
      this.uploadComplete.emit();
      return;
    }

    const item = this.uploadQueue[index];
    item.status = "uploading";

    this.mediaService
      .uploadFile(item.file, this.uploaderName.trim(), this.caption.trim())
      .subscribe({
        next: (event) => {
          item.progress = event.progress;
        },
        error: (err) => {
          item.status = "error";
          item.progress = 0;
          item.error = err?.error?.error || "Error al subir";
          this.uploadNext(index + 1);
        },
        complete: () => {
          item.status = "done";
          item.progress = 100;
          this.uploadNext(index + 1);
        },
      });
  }

  resetAndClose(): void {
    this.closeModal.emit();
    this.uploadComplete.emit();
    this.reset();
  }

  private reset(): void {
    this.clearFiles();
    this.isUploading = false;
    this.uploadQueue = [];
    this.allDone = false;
    this.caption = "";
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeddingService } from '../../services/wedding.service';
import { GalleryImage } from '../../models/wedding.model';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="py-10" style="background-color: var(--color-warm-white)">
      <div class="max-w-2xl mx-auto px-5">
        <div class="grid grid-cols-2 gap-3">
          <div 
            *ngFor="let image of images; trackBy: trackByIndex"
            [class]="getGridClass(image)"
            class="rounded-xl overflow-hidden group"
          >
            <img 
              [src]="image.src" 
              [alt]="image.alt"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              loading="lazy"
              decoding="async"
            >
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class GalleryComponent implements OnInit {
  images: GalleryImage[] = [];

  constructor(private weddingService: WeddingService) {}

  ngOnInit(): void {
    this.images = this.weddingService.getGalleryImages();
  }

  trackByIndex(index: number): number {
    return index;
  }

  getGridClass(image: GalleryImage): string {
    const baseClass = 'aspect-square';
    
    if (image.class === 'large') {
      return `${baseClass} row-span-2`;
    } else if (image.class === 'wide') {
      return `${baseClass} col-span-2`;
    }
    
    return baseClass;
  }
}
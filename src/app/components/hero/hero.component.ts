import {
  Component,
  OnInit,
  OnDestroy,
  ElementRef,
  ViewChild,
  AfterViewInit,
} from "@angular/core";

@Component({
  selector: "app-hero",
  standalone: true,
  template: `
    <section
      #heroSection
      class="relative h-screen flex flex-col justify-center items-center text-center text-white overflow-hidden"
    >
      <div class="absolute inset-0 z-0">
        <img
          src="assets/48.jpg"
          alt="Andro y Diana"
          class="w-full h-full object-cover"
          fetchpriority="high"
          #heroImage
        />
        <div class="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/50"></div>
      </div>

      <div class="z-10 pt-24 mb-auto hero-fade-in">
        <p class="text-sm tracking-[0.3em] uppercase font-light mb-3 opacity-90">Nos casamos</p>
        <h1 class="mb-2 drop-shadow-lg text-white" style="color: #fff">Andro & Diana</h1>
        <p class="text-lg font-light tracking-wider opacity-90">04 . 04 . 2026</p>
        <div class="mt-8">
          <div class="scroll-arrow"></div>
        </div>
      </div>

      <div class="z-10 pb-14 mt-auto hero-fade-in-delayed">
        <h1 class="mb-3 text-white" style="color: #fff">¡Estás invitado/a!</h1>
        <p class="text-base md:text-lg font-light max-w-md mx-auto px-4 opacity-90">
          ¡Falta poco para nuestro gran día!
        </p>
      </div>
    </section>
  `,
  styles: [`
    .hero-fade-in {
      animation: heroFadeIn 1.2s ease-out 0.3s both;
    }
    .hero-fade-in-delayed {
      animation: heroFadeIn 1.2s ease-out 0.8s both;
    }
    @keyframes heroFadeIn {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `]
})
export class HeroComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild("heroImage") heroImage!: ElementRef<HTMLImageElement>;
  @ViewChild("heroSection") heroSection!: ElementRef<HTMLElement>;

  private scrollHandler = this.handleScroll.bind(this);

  ngOnInit(): void {
    window.addEventListener("scroll", this.scrollHandler, { passive: true });
  }

  ngAfterViewInit(): void {}

  ngOnDestroy(): void {
    window.removeEventListener("scroll", this.scrollHandler);
  }

  private handleScroll(): void {
    if (this.heroImage && this.heroSection) {
      const scrolled = window.pageYOffset;
      const heroHeight = this.heroSection.nativeElement.offsetHeight;

      if (scrolled < heroHeight) {
        this.heroImage.nativeElement.style.transform = `translateY(${
          scrolled * 0.4
        }px)`;
      }
    }
  }
}

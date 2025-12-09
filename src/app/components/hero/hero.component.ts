import {
  Component,
  OnInit,
  OnDestroy,
  ElementRef,
  ViewChild,
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
          class="w-full h-full object-cover brightness-75"
          #heroImage
        />
      </div>

      <div class="z-10 pt-20 mb-auto">
        <h1 class="  mb-4 drop-shadow-lg">Andro & Diana</h1>
        <div class="mb-8">
          <div class="scroll-arrow"></div>
        </div>
      </div>

      <div class="z-10 pb-12 mt-auto">
        <h1 class=" mb-4">¡Estás invitado/a!</h1>
        <p class="text-base md:text-lg font-light max-w-md mx-auto px-4">
          <!-- Nos encantaría que seas parte de este momento tan especial para
          nosotros.  -->
          ¡Falta poco!
        </p>
      </div>
    </section>
  `,
})
export class HeroComponent implements OnInit, OnDestroy {
  @ViewChild("heroImage") heroImage!: ElementRef<HTMLImageElement>;
  @ViewChild("heroSection") heroSection!: ElementRef<HTMLElement>;

  ngOnInit(): void {
    window.addEventListener("scroll", this.handleScroll.bind(this));
  }

  ngOnDestroy(): void {
    window.removeEventListener("scroll", this.handleScroll.bind(this));
  }

  private handleScroll(): void {
    if (this.heroImage && this.heroSection) {
      const scrolled = window.pageYOffset;
      const heroHeight = this.heroSection.nativeElement.offsetHeight;

      if (scrolled < heroHeight) {
        this.heroImage.nativeElement.style.transform = `translateY(${
          scrolled * 0.5
        }px)`;
      }
    }
  }
}

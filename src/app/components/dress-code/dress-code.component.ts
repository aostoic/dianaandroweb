import { Component } from "@angular/core";

@Component({
  selector: "app-dress-code",
  standalone: true,
  template: `
    <section
      id="dress-code"
      class="py-16 bg-white text-center border-b border-gray-200"
    >
      <div class="max-w-2xl mx-auto px-5">
        <div
          class="w-16 h-16 mx-auto  flex items-center justify-center bg-gray-100 rounded-full"
        >
          <span class="material-icons text-4xl text-primary"> checkroom </span>
        </div>

        <h1 style="    margin-top: -30px;">DressCode</h1>

        <p class="text-xl text-gray-600 ">Elegante</p>
        <p class="text-base text-gray-600 mb-8 ">
          Prohibido vestir de blanco, beige o amarillo.
        </p>

        <button (click)="openInspirationalLooks()" class="buttonAction">
          INSPÍRATE
        </button>
      </div>
    </section>
  `,
})
export class DressCodeComponent {
  // CLICK OPEN URL https://pin.it/1KxjnrDGG
  openInspirationalLooks(): void {
    window.open("https://pin.it/1KxjnrDGG");
  }
  // Eliminado el constructor y método openLocation ya que no se necesitan
}

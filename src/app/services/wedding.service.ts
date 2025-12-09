import { Injectable } from "@angular/core";
import { BehaviorSubject, interval, map, Observable } from "rxjs";
import {
  CountdownTime,
  EventDetails,
  GalleryImage,
  RSVPForm,
} from "../models/wedding.model";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class WeddingService {
  private weddingDate = new Date("2026-04-04T16:00:00").getTime();
  private countdownSubject = new BehaviorSubject<CountdownTime>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  constructor(private http: HttpClient) {
    this.startCountdown();
  }

  private startCountdown(): void {
    interval(1000)
      .pipe(map(() => this.calculateCountdown()))
      .subscribe((countdown) => {
        this.countdownSubject.next(countdown);
      });
  }

  private calculateCountdown(): CountdownTime {
    const now = new Date().getTime();
    const distance = this.weddingDate - now;

    if (distance > 0) {
      return {
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      };
    }

    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  getCountdown(): Observable<CountdownTime> {
    return this.countdownSubject.asObservable();
  }

  getCeremonyDetails(): EventDetails {
    return {
      title: "Ceremonia",
      location: "Salón de Eventos",
      date: "04 ABR",
      time: "4:00 P.M.",
      address: "1765 Estr. Dom João Becker, Florianópolis, Brasil",
    };
  }

  getCelebrationDetails(): EventDetails {
    return {
      title: "Celebración",
      location: "Salón de Eventos",
      date: "04 ABR",
      time: "5:00 P.M.",
      address: "1765 Estr. Dom João Becker, Florianópolis, Brasil",
    };
  }

  getGalleryImages(): GalleryImage[] {
    return [
      {
        src: "assets/47.jpg",
        alt: "Andro y Diana - Ceremonia en la playa",
        class: "large",
      },

      {
        src: "assets/49.jpg",

        alt: "Andro y Diana - Ceremonia en la playa",
        class: "normal",
      },

      {
        src: "assets/51.jpg",

        alt: "Andro y Diana - Ceremonia en la playa",
        class: "wide",
      },
      {
        src: "assets/50.jpg",

        alt: "Andro y Diana - Ceremonia en la playa",
        class: "normal",
      },
      {
        src: "assets/52.jpg",

        alt: "Andro y Diana - Ceremonia en la playa",
        class: "normal",
      },
    ];
  }

  // LARGE
  //   WIDE
  //   NORMAL
  createCalendarEvent(): void {
    const startDate = new Date("2026-04-04T16:00:00");
    const endDate = new Date("2026-04-05T05:00:00");

    const title = "Matrimonio de Andro y Diana";
    const details = "Ceremonia y celebración del matrimonio de Andro y Diana.";
    const location = "1765 Estr. Dom João Becker, Florianópolis, Brasil";

    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      title
    )}&dates=${startDate.toISOString().replace(/[-:]/g, "").split(".")[0]}Z/${
      endDate.toISOString().replace(/[-:]/g, "").split(".")[0]
    }Z&details=${encodeURIComponent(details)}&location=${encodeURIComponent(
      location
    )}`;

    // Detectar si es dispositivo móvil para mejor experiencia
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );

    if (isMobile) {
      // En móviles, abrir en la misma pestaña para mejor experiencia
      window.location.href = googleCalendarUrl;
    } else {
      // En desktop, abrir en nueva ventana con tamaño optimizado
      const windowFeatures =
        "width=800,height=600,scrollbars=yes,resizable=yes,toolbar=no,menubar=no";
      window.open(googleCalendarUrl, "_blank", windowFeatures);
    }
  }

  openLocation(): void {
    // Usar el enlace específico de Google Maps proporcionado para la ceremonia
    const googleMapsUrl = "https://maps.app.goo.gl/ycGac3siuXENaSAM9";
    window.open(googleMapsUrl);
  }

  showBankDetails(): void {
    const bankInfo = `
Datos Bancarios para Regalos:

Banco: [Nombre del Banco]
Titular: Andro y Diana
Cuenta: [Número de cuenta]
CBU/IBAN: [Código bancario]

¡Gracias por tu generosidad!
    `;
    alert(bankInfo);
  }

  submitRSVP(rsvp: RSVPForm): Observable<any> {
    const fd = new FormData();
    fd.append("name", rsvp.name || "");
    fd.append("phone", rsvp.phone || "");
    fd.append("attendance", rsvp.attendance || "");
    fd.append("companion", rsvp.companion || "");
    fd.append("companionName", rsvp.companionName || "");
    fd.append("allergies", rsvp.allergies || "");
    fd.append("song", rsvp.song || "");
    fd.append("message", rsvp.message || "");

    return this.http.post(
      "https://script.google.com/macros/s/AKfycbxP81Zt3D4Cb0E5vGI52k4FWe5xFXlOze1SqEDySNyq5qsbElehmEMSF6OQ_0QWvMM1/exec",

      fd,
      { responseType: "text" }
    );
  }

  // Nuevo método para el popup de subir fotos
  showUploadPhotoMessage(): void {
    const message = `
📸 ¡Pronto podrás subir fotos!

Esta función solo estará habilitada días antes de la boda para que puedas subir tu proceso de viaje y compartir tu experiencia con nosotros.

¡Esperamos ver tus aventuras camino a nuestro gran día! 💕

Andro y Diana
    `;
    alert(message);
  }

  openLink(link?: string): void {
    if (link) {
      window.open(link);
    } else {
      alert("No hay enlace disponible para este regalo.");
    }
  }
}

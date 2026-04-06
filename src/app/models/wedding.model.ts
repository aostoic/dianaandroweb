export interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export interface EventDetails {
  title: string;
  location: string;
  date: string;
  time: string;
  address: string;
}

export interface RSVPForm {
  attendance: "yes" | "no" | null;
  name: string;
  phone: string; // Optional phone number
  allergies: string;
  song: string;
  message: string;
  companion: "yes" | "no" | null;
  companionName: string;
}

export interface GalleryImage {
  src: string;
  alt: string;
  class?: string;
}

export interface MediaItem {
  id: string;
  url: string;
  uploaderName: string;
  uploadedAt: string;
  type: "photo" | "video";
  caption: string;
  contentType: string;
  sessionId?: string;
}

export interface UploadProgress {
  file: File;
  progress: number;
  status: "pending" | "uploading" | "done" | "error";
  preview?: string;
  error?: string;
}

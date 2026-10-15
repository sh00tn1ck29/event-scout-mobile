export interface Event {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  time: string;
  location: string;
  imageUrl?: string;
  latitude?: number;
  longitude?: number;
}

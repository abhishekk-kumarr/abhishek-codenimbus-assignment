export interface Wish {
  id: string;
  name: string;
  message: string;
  date?: string;
}

export interface ScheduleEvent {
  eventName: string;
  eventTime: string;
}

export interface ScheduleDay {
  sectionTitle: string;
  date: string;
  displayDate: string;
  locationAddress: string;
  mapLocation: string;
  image: string;
  events: ScheduleEvent[];
}

export interface StoryEvent {
  year: string;
  title: string;
  date: string;
  description: string;
  image: string;
}

export type NavTab = 'home' | 'about' | 'gallery';

export interface BioInterface {
  email: string;
  github: string;
  linkedin: string;
  name: string;
  objective: string;
  tagline: string;
}

export interface PositionInterface {
  id: string;
  title: string;
  company: string;
  startDate: string;
  endDate?: string;
}

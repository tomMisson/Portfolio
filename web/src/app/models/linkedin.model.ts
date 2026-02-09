export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
  location: string;
  logo?: string;
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  logo?: string;
  url?: string;
}
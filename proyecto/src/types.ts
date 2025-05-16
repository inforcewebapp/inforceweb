export interface FormData {
  name: string;
  email?: string;
  phone: string;
  message?: string;
  cv?: File;
}

export interface Service {
  id: number;
  title: string;
  description: string;
  image: string;
}

export interface Client {
  id: number;
  name: string;
  logo: string;
}
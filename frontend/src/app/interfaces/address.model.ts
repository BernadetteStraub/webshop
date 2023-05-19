export interface AddressRequest {
  id: number | null;
  street: string;
  line2: string;
  country: string;
  city: string;
  zipCode: string;
  state: string;
}

export interface AddressResponse {
  id: number;
  street: string;
  line2: string;
  country: string;
  city: string;
  zipCode: string;
  state: string;
}

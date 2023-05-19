import {AddressRequest, AddressResponse} from "./address.model";

export interface AuthRequest {
  email: string;
  password: string;
}

export interface UserRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dateOfBirth: string;
  role: string;
  type: string;
  photoUrl: string;
  addresses: AddressRequest[];
}

export interface UserUpdate {
  id: number;
  firstName: string | null;
  lastName: string | null
  email: string;
  addresses: AddressRequest[];
}


export interface UserResponse {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  role: string;
  type: string;
  photoUrl: string;
  addresses: AddressResponse[];
}

export interface AuthResponse {
  user: UserResponse;
  token: string;
}

export interface User {

  id: string;

  first_name: string;

  last_name: string;

  email: string;

  education_level: string;

  role?: string;

}


export interface TokenResponse {

  access_token: string;

}


export interface AuthResponse {

  user: User;

  token: TokenResponse;

}


export interface RegisterPayload {

  first_name: string;

  last_name: string;

  email: string;

  password: string;

  education_level: string;

}

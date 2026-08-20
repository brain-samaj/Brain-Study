import api from "@/lib/api";

export interface RegisterPayload {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  education_level: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export async function registerUser(
  payload: RegisterPayload,
) {
  const response = await api.post(
    "/auth/register",
    payload,
  );

  return response.data;
}

export async function loginUser(
  payload: LoginPayload,
) {
  const response = await api.post(
    "/auth/login",
    payload,
  );

  return response.data;
}

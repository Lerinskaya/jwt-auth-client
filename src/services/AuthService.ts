import $api from "../http";
import {AxiosResponse} from 'axios';
import { AuthResponse } from "../models/response/AuthResponse";

export default class AuthService {
  static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('./login', {email, password});
  }

  static async registration(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('./registration', {email, password});
  }

  static async logout(): Promise<void> {
    return $api.post('./logout')
  }

  static async deleteUser(id: string): Promise<AxiosResponse<void>> {
    return $api.delete<void>(`/users/${id}`);
  }

  static async blockUser(id: string): Promise<AxiosResponse<void>> {
    const data = {
      status: "Blocked"
    };
    return $api.put<void>(`/users/${id}`, data);
  }
  static async unblockUser(id: string): Promise<AxiosResponse<void>> {
    const data = {
      status: "Active"
    };
    return $api.put<void>(`/users/${id}/unblock`, data);
  }
}
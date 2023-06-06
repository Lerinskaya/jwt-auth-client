import { makeAutoObservable } from 'mobx';
import axios from 'axios';
import {IUser}from '../models/IUser';
import AuthService from '../services/AuthService';
import { AuthResponse } from '../models/response/AuthResponse';
import { API_URL } from '../http';
import UserService from '../services/UserService';

export default class Store {
  user = {} as IUser;
  users = [] as IUser[];
  isAuth = false;
  isLoading = false;
  selectedUser: IUser | null = null;
  selectedUsers: string[] = [];
  error: string = '';

  constructor() {
    makeAutoObservable(this);
  }

  setAuth(boolean: boolean) {
    this.isAuth = boolean
  }

  setUser(user: IUser) {
    this.user = user
  }

  setLoading(boolean: boolean) {
    this.isLoading = boolean
  }


  async login(email:string, password:string) {
    try {
      const response = await AuthService.login(email, password);
      localStorage.setItem('token', response.data.accessToken);
      this.getUsers();
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e:any) {
      this.setError(e.response?.data?.message);
    }
  }

  async registration(email:string, password:string) {
    try {
      const response = await AuthService.registration(email, password);
      localStorage.setItem('token', response.data.accessToken);
      this.getUsers();
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e:any) {
      this.setError(e.response?.data?.message);
    }
  }

  async logout() {
    try {
      const response = await AuthService.logout;
      localStorage.removeItem('token');
      this.setAuth(false);
      this.setUser({} as IUser);
    } catch (e:any) {
      this.setError(e.response?.data?.message);
    }
  }

  async checkAuth() {
    this.setLoading(true);
    try {
        const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {withCredentials: true})
        console.log(response);
        localStorage.setItem('token', response.data.accessToken);
        this.setAuth(true);
        this.setUser(response.data.user);
        this.getUsers();
    } catch (e:any) {
      this.setError(e.response?.data?.message);
    } finally {
        this.setLoading(false);
    }
  }

  async getUsers() {
    try {
      const response = await UserService.fetchUsers();
      this.users = response.data
    } catch(e:any) {
      this.setError(e.response?.data?.message);
    }
  }

  async deleteUser(id: string) {
    try {
      await AuthService.deleteUser(id);
      this.users = this.users.filter((user) => user._id !== id);
      this.selectedUser = null;
      this.setAuth(false);
    } catch (e:any) {
      this.setError(e.response?.data?.message);
    }
  }

  async blockUser(id: string) {
    try {
      await AuthService.blockUser(id);
      await this.getUsers();
      this.selectedUser = null;
      this.setAuth(false);
    } catch (e:any) {
      this.setError(e.response?.data?.message);
    }
  }

  async unblockUser(id: string) {
    try {
      await AuthService.unblockUser(id);
      await this.getUsers();
      this.selectedUser = null;
      this.setAuth(true);
    } catch (e:any) {
      this.setError(e.response?.data?.message);
    }
  }

  setError(error: string): void {
    this.error = error;
  }

  clearError(): void {
    this.error = '';
  }
}


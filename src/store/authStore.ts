import { defineStore } from 'pinia'

// user type definition
type User = {
  email: string;
  password: string;
}

export const useAuthStore = defineStore({
  id: 'auth', // identifier for store
  state: () => ({
    isAuthenticated: !!sessionStorage.getItem('isAuthenticated'), // track authentication status
    user: null as User | null
  }),
  actions: {
    // logs in user, stores user data & sets auth flag
    login(user: User) {
      sessionStorage.setItem('isAuthenticated', 'true');
      this.user = user; // set object in store
      this.isAuthenticated = true;
    },
    // Logs out & removes auth flag
    logout() {
      sessionStorage.removeItem('isAuthenticated');
      this.user = null; // clear user object
      this.isAuthenticated = false;
    },
    // checks auth status based on session storage
    checkAuthentication() {
      this.isAuthenticated = !!sessionStorage.getItem('isAuthenticated');
    }
  }
});

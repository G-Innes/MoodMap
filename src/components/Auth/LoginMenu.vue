<template>
    <div class="flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8 darkMode">
      <div class="max-w-md w-full space-y-8">
        <div>
          <img class="h-64 m-auto" src="../../assets/yoga.svg" alt="Logo" />
          <h2 class="mt-0 text-center text-3xl font-extrabold ">Login to your account</h2>
        </div>
        <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
          <div class="rounded-md shadow-sm -space-y-px">
            <div>
              <label for="email-address" class="sr-only">Email address</label>
              <input v-model="email" type="email" id="email-address" name="email" required class=" rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 darkMode rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address">
            </div>
            <div>
              <label for="password" class="sr-only">Password</label>
              <input v-model="password" type="password" id="password" name="password" required class="rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 darkMode rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password">
            </div>
          </div>
          <div>
            <button type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Login
            </button>
            <p class="mt-4 text-center">Don't have an account? <router-link to="/SignUp" class="text-blue hover:text-indigo-700">Sign up</router-link></p>
          </div>
        </form>
      </div>
    </div>
  </template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { useAuthStore } from '../../store/authStore';
  import Swal from 'sweetalert2'

  interface User {
    email: string;
    password: string;
  };

  const email = ref('');
  const password = ref('');
  const router = useRouter();
  const authStore = useAuthStore();


  // Display notification depending on validation results
  function showNotification(type: 'success' | 'error', title: string, text: string, timer: number = 800) {
      Swal.fire({
          position: 'center',
          icon: type,
          title: title,
          text: text,
          showConfirmButton: false,
          timer: timer
      });
  };

  // checks entered credentials against the stored values & call relevant notifications
  // If match login method is called and page redirect to home
  const handleLogin = () => {
    const storedEmail = localStorage.getItem('email');
    const storedPassword = localStorage.getItem('password');

    if (email.value === storedEmail) {
        if (password.value === storedPassword) {
            const user: User = { email: email.value, password: password.value };
            authStore.login(user);
            showNotification('success', 'Login Successful!', '');
            router.push('/');
        } else {
            showNotification('error', 'Oops...', 'Password not recognised!');
        }
    } else if (storedEmail) {
        showNotification('error', 'Oops...', 'Email address not recognised!');
    } else {
        showNotification('error', 'Oops...', 'Invalid credentials!');
    }
};


</script>

<style scoped>
  button{
  background-color: #009be2;
  }
  button:hover{
    background-color: #8bcfa3;
  }
</style>

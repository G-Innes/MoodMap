<template>
    <div class="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full space-y-8">
        <div>
          <img class="h-64 m-auto" src="../../assets/yoga.svg" alt="Logo" />
          <h2 class="mt-6 text-center text-3xl font-extrabold">
            Sign Up
          </h2>
        </div>
        <form class="mt-8 space-y-6" @submit.prevent="handleSignup">
          <div class="rounded-md shadow-sm -space-y-px">
            <div>
              <label for="email-address" class="sr-only">Email address</label>
              <input v-model="email" type="email" required class="darkMode appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address">
            </div>
            <div>
              <label for="password" class="sr-only">Password</label>
              <input v-model="password" type="password" required class="darkMode appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password">
            </div>
          </div>
          <div>
            <button type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  </template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import Swal from 'sweetalert2';

  const email = ref('');
  const password = ref('');
  const router = useRouter();

  // Validation functions using regex
  const isValidEmail = (email: string): boolean => {
    return /\S+@\S+\.\S+/.test(email);
  };
  const isValidPassword = (password: string): boolean => {
    return /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}/.test(password);
  };

  // Display notification depending on validation results
  const showNotification = (type: 'success' | 'error', title: string) => {
    Swal.fire({
      position: 'center',
      icon: type,
      title: title,
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
    });
  };
  // Set credentials in local storage upon validation checks & redirect to login page
  const handleSignup = () => {
    if (!isValidEmail(email.value)) {
      showNotification('error', 'Please enter a valid email address.');
      return;
    }
    if (!isValidPassword(password.value)) {
      showNotification('error', 'Password must be at least 8 characters, contain at least one uppercase letter, one lowercase letter, and a number.');
      return;
    }
    localStorage.setItem('email', email.value);
    localStorage.setItem('password', password.value);

    showNotification('success', 'Sign Up Successful!');
    router.push('/Login');
  };
</script>

<style scoped>
  button {
  background-color: #009be2;
  }
  button:hover {
    background-color: #8bcfa3;
  }
</style>

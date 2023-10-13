<template>
    <Disclosure as="nav" class="darkMode" v-slot="{ open }">
      <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div class="relative flex h-16 items-center justify-between">
          <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <!-- Mobile menu button-->
            <DisclosureButton class=" ml-0 relative inline-flex items-center justify-center rounded-md p-2">
              <span class="absolute -inset-0.5" />
              <span class="sr-only">Open main menu</span>
              <Bars3Icon
              v-if="!open"
              class="block h-8 w-8"
              aria-hidden="true" />
              <XMarkIcon
              v-else class="block h-6 w-6"
              aria-hidden="true" />
            </DisclosureButton>
          </div>
          <!-- Logo & Site title -->
          <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div class="flex flex-shrink-0 items-center ml-5">
              <img class="h-10 w-auto" src="../../assets/yoga.svg" alt="Logo" />
              <p class="ml-1">MoodMap</p>
            </div>
            <!-- Nav links (M-L screens)-->
            <div class="hidden sm:ml-6 sm:block">
              <div class="flex space-x-4">
                <router-link
                  v-for="item in navigation"
                  :key="item.name"
                  :to="item.href"
                  class="cursor-pointer"
                  :class="[item.current ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-white hover:text-white', 'rounded-md px-3 py-2 text-sm']"
                  :aria-current="item.current ? 'page' : undefined">{{ item.name }}
                </router-link>
              </div>
            </div>
          </div>
              <!-- Right Section (Dark/Light Mode Toggle and Profile) -->
        <div class="relative inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <!-- Dark/Light Mode Toggle -->
            <button
                type="button"
                class="relative rounded-full p-1 text-white-400 hover:text-white focus:outline-none focus:ring-2  focus:ring-offset-2 focus:ring-offset-gray-800"
                @click="toggleTheme">
                <span class="absolute -inset-1.5" />
                <span class="sr-only">Toggle Theme</span>
                <MoonIcon v-if="isDarkMode" class="h-6 w-6" />
                <SunIcon v-else class="h-6 w-6" />
            </button>
            <!-- Profile dropdown -->
            <Menu as="div" class="relative ml-3">
              <div>
                <MenuButton class=" relative flex rounded-full text-white-400 hover:text-white text-sm focus:outline-none focus:ring-2  focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span class="absolute -inset-1.5" />
                  <span class="sr-only">Open user menu</span>
                  <UserIcon class="h-6 w-6" aria-hidden="true" />
                </MenuButton>
              </div>
              <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                <MenuItems class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md darkMode py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <!-- If NOT authenticated -->
                  <MenuItem v-if="!authStore.isAuthenticated" v-slot="{ active }">
                      <router-link to="/Login" :class="[active ? 'darkMode' : '', 'block px-4 py-2 text-sm darkMode']">Login</router-link>
                  </MenuItem>
                  <MenuItem v-if="!authStore.isAuthenticated" v-slot="{ active }">
                      <router-link to="/SignUp" :class="[active ? 'darkMode' : '', 'block px-4 py-2 text-sm darkMode']">Signup</router-link>
                  </MenuItem>
                  <!-- If authenticated -->
                  <MenuItem v-if="authStore.isAuthenticated" v-slot="{ active }">
                      <router-link to="/profile" :class="[active ? 'darkMode' : '', 'block px-4 py-2 text-sm darkMode']">Profile</router-link>
                  </MenuItem>
                  <MenuItem v-if="authStore.isAuthenticated" v-slot="{ active }">
                      <a href="#" @click="logout" :class="[active ? 'darkMode' : '', 'block px-4 py-2 text-sm darkMode']">Logout</a>
                  </MenuItem>
              </MenuItems>
              </transition>
            </Menu>
          </div>
        </div>
      </div>
      <!-- Nav menu for sm screens -->
      <DisclosurePanel class="sm:hidden">
        <div class="space-y-1 px-2 pb-3 pt-2">
          <DisclosureButton
          v-for="item in navigation"
          :key="item.name"
          @click="navigate(item.href)"
          :class="[item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-white hover:text-white', 'flex-row m-1 rounded-md px-3 py-2 text-base font-medium']"
          :aria-current="item.current ? 'page' : undefined">{{ item.name }}</DisclosureButton>
        </div>
      </DisclosurePanel>
    </Disclosure>
  </template>

<script setup lang="ts">
  import { ref, computed } from 'vue';
  import { RouteLocationRaw, useRoute, useRouter } from 'vue-router';
  import { useAuthStore } from '../../store/authStore';
  import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';
  import { Bars3Icon, UserIcon, XMarkIcon, SunIcon, MoonIcon } from '@heroicons/vue/24/outline';

  // Nav item structure
  interface NavigationItem {
    name: string;
    href: string;
    current: ReturnType<typeof computed>;
  }

  const authStore = useAuthStore();
  const router = useRouter();
  const route = useRoute();
  const isDarkMode = ref(document.documentElement.classList.contains('dark'));

  // Nav menu items & paths
  const navigation: NavigationItem[] = [
    { name: 'Home', href: '/', current: computed(() => route.path === '/') },
    { name: 'Map', href: '/Map', current: computed(() => route.path === '/Map') },
    { name: 'Boost', href: 'Boost', current: computed(() => route.path === '/Boost') },
  ];

  // Navigate to different page
  const navigate = (path: RouteLocationRaw) => {
    router.push(path);
  };
  // Call authstore method to clear auth status
  const logout = () => {
    authStore.logout();
    router.push('/Login');
  };
  // Toggle dark/light them- primarily dark
  const toggleTheme = () => {
    // Determin theme based on isDarkMode state
    const theme = isDarkMode.value ? 'light' : 'dark';
    document.documentElement.classList.toggle('dark', theme === 'dark'); // toggle class
    localStorage.setItem('theme', theme); // store selected theme in local storage for persistance
    isDarkMode.value = theme === 'dark'; // update staet
  };

  // Check local storage for saved theme
  const savedTheme = localStorage.getItem('theme') || 'dark';
  isDarkMode.value = savedTheme === 'dark';
  document.documentElement.classList.toggle('dark', isDarkMode.value); // apply saved them to doc element
</script>

<script>
  import { fly } from 'svelte/transition';
  import { userStore } from '$lib/store';
  import { onMount } from 'svelte';
  import axios from 'axios';
  import rmutl from '$lib/assets/rmutl.jpg';
  import Navbar from '$lib/components/Navbar.svelte';
  onMount(async () => {
    const response = await axios
      .get('http://localhost:5000/auth/check', {
        withCredentials: true
      })
      .catch((e) => {
        console.log(e);
      });
      
    if (response) {
      const body = response.data;

      if (body.isAuthenticated == true) {
        $userStore = body.user;
      }
    }
  });
</script>

<Navbar/>

<div class="p-5" in:fly={{ x: -50, duration: 100, delay: 300 }} out:fly={{ x: -50, duration: 100 }}>
  <slot />
</div>

<footer class="text-gray-600 body-font bg-slate-50">
  <div class="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
    <div
      class="flex title-font font-medium items-center md:justify-start justify-center text-gray-900"
    >
      <img alt="gallery" class="w-10 object-cover h-full object-center " src={rmutl} />
    </div>
    <p
      class="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4"
    >
      © Rajamangala University of Technology Lanna —
      <a
        href="https://www.rmutl.ac.th/"
        class="text-gray-600 ml-1"
        rel="noopener noreferrer"
        target="_blank">@RMUTL</a
      >
    </p>
    <span class="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
      <div class="text-gray-500">
        <svg
          fill="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          class="w-5 h-5"
          viewBox="0 0 24 24"
        >
          <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
        </svg>
      </div>
    </span>
  </div>
</footer>

<script>
  import axios from 'axios';
  import { onMount } from 'svelte';
  import { userStore } from '$lib/store';
  import { goto } from '$app/navigation';

  onMount(async () => {
    const res = await axios
      .post(
        'http://localhost:5000/auth/sign-out',
        {},
        {
          withCredentials: true
        }
      )
      .catch((e) => {
        console.log(e);
      });

    if (res) {
      const body = res.data;

      if (body.result == 'ok') {
        $userStore = null;
        goto('/sign-in');
      }
    }
  });
</script>

<script>
  import { page } from '$app/stores';
  import axios from 'axios';
  import { userStore } from '$lib/store';
  let list = [
    {
      path: '/admin',
      text: 'Dashboard'
    },
    {
      path: '/admin/brand',
      text: 'Brand'
    },
    {
      path: '/admin/equipment',
      text: 'Equipment'
    },
    {
      path: '/admin/rent',
      text: 'Rent'
    },
    {
      path: '/admin/broken',
      text: 'broken'
    }
  ];

  async function handleLogout() {
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
        goto('/admin');
      }
    }
  }
</script>

<div class="py-3 pl-3 pr-1 uppercase font-bold">
  {#each list as item (item.path)}
    <a href={item.path} class="menu-link {$page.route.id == item.path && 'active'}">
      <span class="ml-2">{item.text}</span>
    </a>
  {/each}
  {#if $userStore != null}
    <button on:click={() => handleLogout()} class="menu-link block w-full uppercase text-left">
      <span class="ml-2">Logout</span>
    </button>
  {/if}
</div>

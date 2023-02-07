<script>
  import axios from 'axios';
  import { userStore, equipmentStore } from '$lib/store';
  import { onMount } from 'svelte';
  import { fly } from 'svelte/transition';

  onMount(async () => {
    let res = await axios.get('http://localhost:5000/api/equipment').catch((e) => console.log(e));

    const body = res.data;

    if (body && body.result == 'ok') {
      delete body.result;

      $equipmentStore = body;
    }
  });
  
</script>

<div class="p-5" in:fly={{ y: 32, duration: 500 }}>
  {#if $userStore}
    <button class="btn">
      Request Equipment
    </button>
  {/if}

  <div class="rounded-lg overflow-hidden border border-amber-800">
    <table class="w-full">
      <tr class="border-b bg-amber-800 text-white">
        <th>Name</th>
        <th>Count</th>
        <th>Remain</th>
        <th>Model</th>
        <th>Brand</th>
      </tr>
      {#each $equipmentStore.data as item (item.id)}
        <tr class="odd:bg-amber-50">
          <td>{item.name}</td>
          <td>{item.count}</td>
          <td>{item.remain}</td>
          <td>{item.model}</td>
          <td>{item.brand.name}</td>
        </tr>
      {/each}
    </table>
  </div>
</div>

<style lang="postcss">
  th,
  td {
    @apply px-3 py-2 text-center;
  }
</style>

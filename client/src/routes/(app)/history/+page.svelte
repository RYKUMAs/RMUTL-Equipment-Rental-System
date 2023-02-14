<script>
  import axios from 'axios';
  import { historyStore, userStore } from '$lib/store';
  import { onMount } from 'svelte';
  import { fly } from 'svelte/transition';
  import moment from 'moment';

  async function getData() {
    if (!$userStore) {
      return;
    }

    let res = await axios
      .get(`http://localhost:5000/api/rent?userId=${$userStore.username}`)
      .catch((e) => console.log(e));

    const body = res.data;

    if (body && body.result == 'ok') {
      delete body.result;

      $historyStore = body;
    }
  }

  onMount(getData);

  $: if ($userStore != null) {
    getData();
  }

  $: {
    console.log($historyStore);
  }
</script>

<div class="p-5" in:fly={{ y: 32, duration: 500 }}>
  <div class="rounded-lg overflow-hidden border border-amber-800">
    <table class="w-full">
      <tr class="border-b bg-amber-800 text-white">
        <th>ID</th>
        <th>User</th>
        <th>Equipment</th>
        <th>Count</th>
        <th>Request Date</th>
        <th>Return Date</th>
        <th>Status</th>
      </tr>
      {#each $historyStore.data as item (item.id)}
        <tr class="odd:bg-amber-50">
          <td>{item.id}</td>
          <td>{item.user.firstname} {item.user.lastname}</td>
          <td>{item.equipment.name} / {item.equipment.model} / {item.equipment.brand.name}</td>
          <td>{item.count}</td>
          <td>
            {moment().diff(moment(item.date)) < 2 * 24 * 60 * 60 * 1000
              ? moment(item.date).fromNow()
              : new Date(item.date).toLocaleString()}
          </td>
          <td>
            {item.return
              ? moment().diff(moment(item.date)) < 2 * 24 * 60 * 60 * 1000
                ? moment(item.date).fromNow()
                : new Date(item.date).toLocaleString()
              : item.status == 'rejected' || item.status == 'waiting'
              ? '-'
              : 'Not Returned'}
          </td>
          <td>
            <span
              class="uppercase text-sm {item.return
                ? 'bg-blue-600'
                : item.status == 'waiting'
                ? 'bg-yellow-600'
                : item.status == 'accepted'
                ? 'bg-green-500'
                : 'bg-red-600'} py-1 px-2 text-white font-bold rounded-lg"
            >
              {#if !item.return}
                {item.status}
              {:else}
                returned
              {/if}
            </span>
          </td>
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

<script>
  import axios from 'axios';
  import moment from 'moment';
  import { historyStore, userStore } from '$lib/store';
  import { onMount } from 'svelte';
  import { fly } from 'svelte/transition';
  import Pagination from '$lib/components/Pagination.svelte';

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

  async function paginationCallback(offset) {
    let res = await axios
      .get(`http://localhost:5000/api/rent?userId=${$userStore.username}&offset=${offset}`)
      .catch((e) => console.log(e));

    const body = res.data;

    if (body && body.result == 'ok') {
      delete body.result;

      $historyStore = body;
    }

    return {
      limit: body.limit,
      offset: body.offset,
      total: body.total
    };
  }

  async function submitBroken(data) {
    try {
      const res = await axios.post('http://localhost:5000/api/broken', {
        equipmentId: data.equipment.id,
        count: data.count,
        rentId: data.id
      });

      const body = res.data;

      const idx = $historyStore.data.findIndex((item) => item.id == data.id);

      $historyStore.data[idx].broken = body.data;
    } catch (err) {
      console.log(err);
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
  <div class="rounded-lg overflow-hidden border border-amber-800 mb-3">
    <table class="w-full">
      <tr class="border-b bg-amber-800 text-white">
        <th>ID</th>
        <th>User</th>
        <th>Equipment</th>
        <th>Count</th>
        <th>Request Date</th>
        <th>Return Date</th>
        <th>Status</th>
        <th>Action</th>
      </tr>
      {#if $userStore == null}
        <td colspan="7"> You must be logged in to view your own history. </td>
      {/if}
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
              ? moment().diff(moment(item.return.date)) < 2 * 24 * 60 * 60 * 1000
                ? moment(item.return.date).fromNow()
                : new Date(item.return.date).toLocaleString()
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
          <td>
            {#if item.status == 'accepted' && item.return == null && item.broken != null}
              <div class="flex justify-center gap-5">
                <button
                  on:click={() => submitBroken(item)}
                  class="rounded-full transition-all text-orange-500 hover:text-indigo-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 008.835-2.535m0 0A23.74 23.74 0 0018.795 3m.38 1.125a23.91 23.91 0 011.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 001.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 010 3.46"
                    />
                  </svg>
                </button>
              </div>
            {/if}
          </td>
        </tr>
      {/each}
    </table>
  </div>

  {#if $userStore != null}
    <Pagination
      bind:limit={$historyStore.limit}
      bind:offset={$historyStore.offset}
      bind:total={$historyStore.total}
      callback={paginationCallback}
    />
  {/if}
</div>

<style lang="postcss">
  th,
  td {
    @apply px-3 py-2 text-center;
  }
</style>

<script>
  import axios from 'axios';
  import { rentStore } from '$lib/store';
  import Pagination from '$lib/components/Pagination.svelte';
  import { onMount } from 'svelte';
  import { fly } from 'svelte/transition';
  import Add from './Add.svelte';
  import moment from 'moment';

  onMount(async () => {
    let res = await axios.get('http://localhost:5000/api/rent').catch((e) => console.log(e));

    const body = res.data;

    if (body && body.result == 'ok') {
      delete body.result;

      $rentStore = body;
      console.log($rentStore);
    }
  });

  let addData = false;

  function showAddData() {
    addData = !addData;
  }

  async function updateStatus(id, status) {
    try {
      const res = await axios.put(`http://localhost:5000/api/rent/${id}`, {
        status: status
      });

      const { data } = res.data;

      const idx = $rentStore.data.findIndex((item) => item.id == data.id);

      $rentStore.data[idx] = data;
    } catch (err) {
      console.log(err);
    }
  }

  async function paginationCallback(offset) {
    let res = await axios
      .get(`http://localhost:5000/api/rent?offset=${offset}`)
      .catch((e) => console.log(e));

    const body = res.data;

    if (body && body.result == 'ok') {
      delete body.result;

      $rentStore = body;
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

      const idx = $rentStore.data.findIndex((item) => item.id == data.id);

      $rentStore.data[idx].broken = body.data;
    } catch (err) {
      console.log(err);
    }
  }

  async function updateReturn(id) {
    try {
      await axios.post(`http://localhost:5000/api/return`, {
        rentId: id
      });
    } catch (err) {
      console.log(err.response.data);
    }

    let res = await axios.get(`http://127.0.0.1:5000/api/rent?offset=${$rentStore.offset}`).catch((e) => console.log(e));

    const body = res.data;

    if (body && body.result == 'ok') {
      delete body.result;

      $rentStore = body;
    }
  }
</script>

<Add bind:state={addData} />

<div class="p-5" in:fly={{ y: 32, duration: 500 }}>
  <div class="mb-5">
    <button class="btn bg-slate-500 hover:bg-slate-600" on:click={() => showAddData()}>Add</button>
  </div>
  <div class="rounded-lg overflow-hidden border border-slate-500 mb-3">
    <table class="w-full">
      <tr class="border-b bg-slate-500 text-white">
        <th>ID</th>
        <th>User</th>
        <th>Equipment</th>
        <th>Count</th>
        <th>Request Date</th>
        <th>Return Date</th>
        <th>Status</th>
        <th>Action</th>
      </tr>
      {#each $rentStore.data as item (item.id)}
        <tr class="odd:bg-slate-100">
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
          <td class="flex gap-3">
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
            {#if item.broken}
              <span
                class="uppercase text-sm py-1 bg-orange-600 px-2 text-white font-bold rounded-lg"
                >broken</span
              >
            {/if}
          </td>
          <td>
            {#if item.status != 'accepted' && item.status != 'rejected'}
              <div class="flex justify-center gap-5">
                <button
                  on:click={() => updateStatus(item.id, 'accepted')}
                  class="rounded-full transition-all text-green-500 hover:text-indigo-700"
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
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                </button>
                <button
                  on:click={() => updateStatus(item.id, 'rejected')}
                  class="rounded-full transition-all text-red-500 hover:text-red-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            {:else if !item.return && item.status != 'rejected'}
              <button
                on:click={() => updateReturn(item.id)}
                class="rounded-full transition-all text-blue-500 hover:text-indigo-700"
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
                    d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
                  />
                </svg>
              </button>
            {/if}
            {#if item.status == 'accepted' && item.return == null && item.broken == null}
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
            {/if}
          </td>
        </tr>
      {/each}
    </table>
  </div>
  <div>
    <Pagination
      bind:limit={$rentStore.limit}
      bind:offset={$rentStore.offset}
      bind:total={$rentStore.total}
      callback={paginationCallback}
      admin={true}
    />
  </div>
</div>

<style lang="postcss">
  th,
  td {
    @apply px-3 py-2 text-center;
  }
</style>

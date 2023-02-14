<script>
  import axios from 'axios';
  import { rentStore } from '$lib/store';
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

  async function updateReturn(id) {
    try {
      await axios.post(`http://localhost:5000/api/return`, {
        rentId: id
      });
    } catch (err) {
      console.log(err.response.data);
    }

    let res = await axios.get('http://127.0.0.1:5000/api/rent').catch((e) => console.log(e));

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
  <div class="rounded-lg overflow-hidden border border-slate-500">
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

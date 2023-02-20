<script>
  import axios from 'axios';
  import { brokenStore } from '$lib/store';
  import Pagination from '$lib/components/Pagination.svelte';
  import { onMount } from 'svelte';
  import { fly } from 'svelte/transition';
  import Add from './Add.svelte';

  onMount(async () => {
    let res = await axios.get('http://localhost:5000/api/broken').catch((e) => console.log(e));

    const body = res.data;

    if (body && body.result == 'ok') {
      delete body.result;

      $brokenStore = body;
    }
  });

  let addData = false;

  function showAddData() {
    addData = !addData;
  }

  async function updateStatus(id, status) {
    try {
      const res = await axios.put(`http://localhost:5000/api/broken/${id}`, {
        status: status
      });

      const { data } = res.data;

      const idx = $brokenStore.data.findIndex((item) => item.id == data.id);

      $brokenStore.data[idx] = data;
    } catch (err) {
      console.log(err);
    }
  }

  async function paginationCallback(offset) {
    let res = await axios
      .get(`http://localhost:5000/api/broken?offset=${offset}`)
      .catch((e) => console.log(e));

    const body = res.data;

    if (body && body.result == 'ok') {
      delete body.result;

      $brokenStore = body;
    }

    return {
      limit: body.limit,
      offset: body.offset,
      total: body.total
    };
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
        <th>Equipment</th>
        <th>Count</th>
        <th>Status</th>
        <th>Action</th>
      </tr>
      {#each $brokenStore.data as item (item.id)}
        <tr class="odd:bg-slate-100">
          <td>{item.id}</td>
          <td>{item.equipment.name} / {item.equipment.model} / {item.equipment.brand.name}</td>
          <td>{item.count}</td>
          <td>
            <span
              class="uppercase text-sm {item.status == 'fixed'
                ? 'bg-green-500'
                : 'bg-red-600'} py-1 px-2 text-white font-bold rounded-lg"
            >
              {item.status}
            </span>
          </td>
          <td>
            {#if item.status != 'fixed'}
              <button
                on:click={() => updateStatus(item.id, 'fixed')}
                class="rounded-full transition-all text-yellow-500 hover:text-indigo-700"
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
                    d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z"
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
      bind:limit={$brokenStore.limit}
      bind:offset={$brokenStore.offset}
      bind:total={$brokenStore.total}
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

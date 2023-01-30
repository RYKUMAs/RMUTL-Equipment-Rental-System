<script>
  import axios from 'axios';
  import { equipmentStore } from '$lib/store';
  import { onMount } from 'svelte';
  import { fly } from 'svelte/transition';
  import Add from './Add.svelte';

  onMount(async () => {
    let res = await axios.get('http://localhost:5000/api/equipment').catch((e) => console.log(e));

    const body = res.data;

    if (body && body.result == 'ok') {
      delete body.result;

      $equipmentStore = body;
    }
  });

  async function getData() {
    let res = await axios.get('http://127.0.0.1:5000/api/equipment').catch((e) => console.log(e));

    const body = res.data;

    if (body && body.result == 'ok') {
      delete body.result;

      $equipmentStore = body;
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Are you sure?')) {
      return;
    }

    let res = await axios
      .delete(`http://localhost:5000/api/equipment/${id}`)
      .catch((e) => console.log(e));

    const body = res.data;

    if (body && body.result == 'ok') {
      await getData();
    }
  }

  let addData = false;

  function showAddData() {
    addData = !addData;
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
        <th>Order</th>
        <th>User Name</th>
        <th>Count</th>

        <th>Model</th>
        <th>BrandId</th>
        <th>Status</th>
        <th>Action</th>
      </tr>
      {#each $equipmentStore.data as item (item.id)}
        <tr class="odd:bg-slate-100">
          <td>{item.id}</td>
          <td>{item.name}</td>
          <td>{item.count}</td>

          <td>{item.model}</td>
          <td>{item.brand.name}</td>
          <td>
            <!-- confirm button -->

            <div class="flex justify-center gap-5">
              <button class="rounded-full transition-all text-green-500 hover:text-indigo-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </button>
              <!-- delied button -->

              <button
                on:click={() => handleDelete(item.id)}
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

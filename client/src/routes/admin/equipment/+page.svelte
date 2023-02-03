<script>
  import axios from 'axios';
  import { equipmentStore } from '$lib/store';
  import { onMount } from 'svelte';
  import { fly } from 'svelte/transition';
  import Add from './Add.svelte';
  import Edit from './Edit.svelte';

  let editEquipment = false;
  let editData = null;

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

  function showEdit(item) {
    editEquipment = true;
    editData = { ...item};
  }

</script>

<Add bind:state={addData} />
<Edit bind:state={editEquipment} equipment={editData} />

<div class="p-5" in:fly={{ y: 32, duration: 500 }}>
  <div class="mb-5">
    <button 
      class="btn bg-slate-500 hover:bg-slate-600" 
      on:click={() => showAddData()}>Add
    </button>
  </div>
  <div class="rounded-lg overflow-hidden border border-slate-500">
    <table class="w-full">
      <tr class="border-b bg-slate-500 text-white">
        <th>ID</th>
        <th>Name</th>
        <th>Count</th>
        <th>Remain</th>
        <th>Model</th>
        <th>Brand</th>
        <th>Action</th>
      </tr>
      {#each $equipmentStore.data as item (item.id)}
        <tr class="odd:bg-slate-100">
          <td>{item.id}</td>
          <td>{item.name}</td>
          <td>{item.count}</td>
          <td>{item.remain}</td>
          <td>{item.model}</td>
          <td>{item.brand.name}</td>
        <td>
            <div class="flex justify-center gap-5">
                 <!-- editbutton -->
                 <button on:click={() => showEdit(item)}
                      class="rounded-full transition-all text-indigo-500 hover:text-indigo-700">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      class="w-6 h-6"
                    >
                      <path
                        d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z"
                      />
                      <path
                        d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z"
                      />
                    </svg>
                  </button>
                  <!-- editbutton -->
                  <button
                    on:click={() => handleDelete(item.id)}
                    class="rounded-full transition-all text-red-500 hover:text-red-700">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      class="w-6 h-6"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                        clip-rule="evenodd"
                      />
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

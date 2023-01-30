<script>
  import axios from 'axios';
  import { equipmentStore } from '$lib/store';
  import Modal from '$lib/components/Modal.svelte';

  export let state = false;

  let form = {
    name: null,
    count: 1,
    broken: 0
  };

  async function handleSubmit() {
    try {
      const res = await axios.post('http://localhost:5000/api/equipment', {
        ...form
      });

      const { data } = res.data;

      if ($equipmentStore.data.length < $equipmentStore.limit) {
        $equipmentStore.data = [...$equipmentStore.data, data];
      }

      $equipmentStore.total = $equipmentStore.total + 1;

      form = {
        name: null,
        count: null,
        broken: 0
      };
    } catch (err) {
      console.log(err.response.data);
    }
  }
</script>

<Modal bind:show={state}>
  <div slot="content">
    <form on:submit|preventDefault|stopPropagation={handleSubmit}>
      <div class="text-xl font-bold">Add equipment</div>
      <hr class="mb-3" />
      <div class="grid grid-cols-1 lg:grid-cols-7 gap-5">
        <div class="lg:col-span-2">
          <label class="block mb-2" for="equipment-code">Equipment Name: </label>
          <input
            id="equipment-name"
            type="text"
            class="input bg-slate-100 shadow w-full"
            placeholder="Enter Name"
            bind:value={form.name}
          />
        </div>
        <div class="lg:col-span-2">
          <label class="block mb-2" for="equipment-count">Equipment Count: </label>
          <input
            id="equipment-count"
            type="number"
            class="input bg-slate-100 shadow w-full"
            placeholder="Enter Count"
            bind:value={form.count}
          />
        </div>
        <div class="lg:col-span-2">
          <label class="block mb-2" for="equipment-broken">Broken: </label>
          <input
            id="equipment-broken"
            type="number"
            class="input bg-slate-100 shadow w-full"
            placeholder="Enter Count"
            bind:value={form.broken}
          />
        </div>
        <div class="lg:col-span-1 flex items-end">
          <input
            type="submit"
            class="btn bg-slate-500 hover:bg-slate-600 w-full"
            value="Submit"
          />
        </div>
      </div>
    </form>
  </div>
</Modal>

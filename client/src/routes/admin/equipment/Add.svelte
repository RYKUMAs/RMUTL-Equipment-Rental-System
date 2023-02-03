<script>
  import axios from 'axios';
  import { equipmentStore } from '$lib/store';
  import Modal from '$lib/components/Modal.svelte';
  import { onMount } from 'svelte';

  export let state = false;

  let form = {
    name: null,
    count: 1,
    broken: 0,
    model: null
  };

  let listBrand = [];

  onMount(async () => {
    try {
      const res = await axios
        .get('http://localhost:5000/api/brand?limit=999')
        .then((res) => res.data);
      listBrand = res.data;
    } catch (e) {
      console.log(e.response.data);
    }
  });

  async function handleSubmit() {
    try {
      const res = await axios.post(
        'http://localhost:5000/api/equipment', 
        {
        ...form,
        }
      );

      const { data } = res.data;

      if ($equipmentStore.data.length < $equipmentStore.limit) {
        $equipmentStore.data = [...$equipmentStore.data, data];
      }

      $equipmentStore.total = $equipmentStore.total + 1;

      form = {
        name: null,
        count: null,
        model: null,
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
      <div class="grid grid-cols-1 lg:grid-cols-6 gap-5">
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
        <div class="md:col-span-2 lg:col-span-2">
          <label class="block mb-2" for="brand_name">Brand: </label>
          <select
            bind:value={form.brandId}
            class="input bg-slate-100 shadow w-full"
            id="brand_name"
          >
            <option value={null} disabled>Select Brand</option>
            {#each listBrand as item}
              <option value={item.id}>{item.name}</option>
            {/each}
          </select>
        </div>

        <div class="lg:col-span-2">
          <label class="block mb-2" for="equipment-count">Equipment Model: </label>
          <input
            id="equipment-count"
            type="text"
            class="input bg-slate-100 shadow w-full"
            placeholder="Enter Model"
            bind:value={form.model}
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
        <div class="lg:col-span-2 flex items-end">
          <input 
            type="submit" 
            class="btn bg-slate-500 hover:bg-slate-600 w-full" 
            value="Submit" />
        </div>
      </div>
    </form>
  </div>
</Modal>

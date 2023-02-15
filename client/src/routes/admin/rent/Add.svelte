<script>
  import axios from 'axios';
  import { onMount } from 'svelte';
  import { rentStore } from '$lib/store';
  import Modal from '$lib/components/Modal.svelte';

  export let state = false;

  let form = {
    userId: null,
    equipmentId: null,
    count: 1
  };

  let listEquipment = [];

  onMount(async () => {
    try {
      const res = await axios
        .get('http://localhost:5000/api/equipment?limit=999')
        .then((res) => res.data);
      listEquipment = res.data;
    } catch (e) {
      console.log(e.response.data);
    }
  });

  async function handleSubmit() {
    try {
      const res = await axios.post('http://localhost:5000/api/rent', form);

      const { data } = res.data;

      if ($rentStore.data.length < $rentStore.limit) {
        $rentStore.data = [data, ...$rentStore.data];
      } else {
        $rentStore.data.pop();

        $rentStore.data = [data, ...$rentStore.data];
      }

      $rentStore.total = $rentStore.total + 1;

      form = {
        name: null
      };
    } catch (err) {
      console.log(err.response.data);
    }
  }
</script>

<Modal bind:show={state}>
  <div slot="content">
    <form on:submit|preventDefault|stopPropagation={handleSubmit}>
      <div class="text-xl font-bold">Add Rent</div>
      <hr class="mb-3" />
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div class="md:col-span-2 lg:col-span-2">
          <div class="lg:col-span-2">
            <label class="block mb-2" for="user-id">Student ID: </label>
            <input
              id="user-id"
              type="text"
              class="input bg-slate-100 shadow w-full"
              placeholder="Enter ID"
              bind:value={form.userId}
            />
          </div>
          <div class="md:col-span-2 lg:col-span-2">
            <label class="block mb-2" for="equipment">Equipment: </label>
            <select
              bind:value={form.equipmentId}
              class="input bg-slate-100 shadow w-full"
              id="equipment"
            >
              <option value={null} disabled>Select Equipment</option>
              {#each listEquipment as item}
                <option value={item.id}>{item.name} / {item.model} / {item.brand.name}</option>
              {/each}
            </select>
          </div>
          <div class="lg:col-span-2">
            <label class="block mb-2" for="rent-count"> Count: </label>
            <input
              id="rent-count"
              type="number"
              class="input bg-slate-100 shadow w-full"
              placeholder="Enter Count"
              bind:value={form.count}
            />
          </div>

          <div class="lg:col-span-1 flex items-end">
            <input
              type="submit"
              class="btn-admin bg-slate-500 hover:bg-slate-600 w-full"
              value="Submit"
            />
          </div>
        </div>
      </div>
    </form>
  </div>
</Modal>

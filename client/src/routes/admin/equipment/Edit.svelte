<script>
  import axios from 'axios';
  import { equipmentStore } from '$lib/store';
  import Modal from '$lib/components/Modal.svelte';

  export let state = false;
  export let equipment = null;

  let reset = { ...equipment };

  async function handleSubmit() {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/equipment/${equipment.id}`, 
        {
        ...equipment,
        }
      );

      const { data } = res.data;

      const idx = $equipmentStore.data.findIndex((item) => item.id == data.id);

      $equipmentStore.data[idx] = data;

      state = false;
    } catch (err) {
      console.log(err.response.data);
    }
  }
</script>

<Modal bind:show={state}>
  <div slot="content">
    <form on:submit|preventDefault|stopPropagation={handleSubmit}>
      <div class="text-xl font-bold">Edit Instructor</div>
      <hr class="mb-3" />
      <div class="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-3">
        <div class="md:col-span-2 lg:col-span-2">
          <label 
            class="block mb-2" 
            for="equipment-code">Equipment Name: 
          </label>

          <input
            id="equipment-name"
            type="text"
            class="input bg-slate-100 shadow w-full"
            placeholder="Enter Name"
            bind:value={equipment.name}
          />
        </div>
        <div>
          <label 
            class="block mb-2" 
            for="equipment-count">Equipment Count: 
          </label>

          <input
            id="equipment-count"
            type="number"
            class="input bg-slate-100 shadow w-full"
            placeholder="Enter Count"
            bind:value={equipment.count}
          />
        </div>

        <div class="mb-3">
          <label 
            class="block mb-2" 
            for="equipment-broken">Equipment Broken: </label>
          <input
            id="equipment-broken"
            type="number"
            class="input bg-slate-100 shadow w-full"
            placeholder="Enter broken"
            bind:value={equipment.broken}
          />
        </div>
        <div>
          <input 
            type="submit" 
            class="btn bg-slate-500 hover:bg-slate-600 w-full" 
            value="Save" 
            />
        </div>
        <div>
          <input
            type="reset"
            class="btn bg-red-500 hover:bg-slate-600 w-full"
            value="Reset"
            on:click|preventDefault={() => (equipment = { ...reset })}
          />
        </div>
      </div>
      
    </form>
  </div>
</Modal>
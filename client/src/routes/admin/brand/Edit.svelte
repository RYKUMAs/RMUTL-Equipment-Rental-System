<script>
  import axios from 'axios';
  import { brandStore } from '$lib/store';
  import Modal from '$lib/components/Modal.svelte';

  export let state = false;
  export let brand = null;

  let reset = { ...brand };

  async function handleSubmit() {
    try {
      const res = await axios.put(`http://localhost:5000/api/brand/${brand.id}`, {
        ...brand
      });

      const { data } = res.data;

      const idx = $brandStore.data.findIndex((item) => item.id == data.id);

      $brandStore.data[idx] = data;

      state = false;
    } catch (err) {
      console.log(err.response.data);
    }
  }
</script>

<Modal bind:show={state}>
  <div slot="content">
    <form on:submit|preventDefault|stopPropagation={handleSubmit}>
      <div class="text-xl font-bold">Edit brand</div>
      <hr class="mb-3" />
      <div class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
        <div class="my-2 md:my-2 lg:my-0 md:col-span-2 lg:col-span-3">
          <label class="block mb-2" for="brand-code">brand Name: </label>
          <input
            id="brand-name"
            type="text"
            class="input bg-slate-100 shadow w-full"
            placeholder="Enter Name"
            bind:value={brand.name}
          />
        </div>
        <div class="flex items-end">
          <input type="submit" class="btn bg-slate-500 hover:bg-slate-600 w-full" value="Save" />
        </div>
        <div class="flex items-end">
          <input
            type="reset"
            class="btn bg-red-500 hover:bg-slate-600 w-full"
            value="Reset"
            on:click|preventDefault={() => (brand = { ...reset })}
          />
        </div>
      </div>
    </form>
  </div>
</Modal>

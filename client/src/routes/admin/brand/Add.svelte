<script>
  import axios from 'axios';
  import { brandStore } from '$lib/store';
  import Modal from '$lib/components/Modal.svelte';

  export let state = false;

  let form = {
    name: null
  };

  async function handleSubmit() {
    try {
      const res = await axios.post('http://localhost:5000/api/brand', {
        ...form
      });

      const { data } = res.data;

      if ($brandStore.data.length < $brandStore.limit) {
        $brandStore.data = [...$brandStore.data, data];
      }

      $brandStore.total = $brandStore.total + 1;

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
      <div class="text-xl font-bold">Add Brand</div>
      <hr class="mb-3" />
      <div class="grid grid-cols-1 lg:grid-cols-6 gap-5">
        <div class="lg:col-span-4">
          <label class="block mb-2" for="brand-code">Brand</label>
          <input
            id="brand-name"
            type="text"
            class="input bg-slate-100 shadow w-full"
            placeholder="Enter Name"
            bind:value={form.name}
          />
        </div>
        <div class="lg:col-span-2 flex items-end">
          <input
            type="submit"
            class="btn-admin bg-slate-500 hover:bg-slate-600 w-full"
            value="Submit"
          />
        </div>
      </div>
    </form>
  </div>
</Modal>

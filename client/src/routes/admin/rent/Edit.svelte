<script>
    import axios from 'axios';
    import { rentStore } from '$lib/store';
    import Modal from '$lib/components/Modal.svelte';
  
    export let state = false;
    export let rent = null;
  
    let reset = { ...rent };
  
    async function handleSubmit() {
      try {
        const res = await axios.put(`http://localhost:5000/api/rent/${rent.id}`, {
          ...rent
        });
  
        const { data } = res.data;
  
        const idx = $rentStore.data.findIndex((item) => item.id == data.id);
  
        $rentStore.data[idx] = data;
  
        state = false;
      } catch (err) {
        console.log(err.response.data);
      }
    }
  </script>
  
  <Modal bind:show={state}>
    <div slot="content">
      <form on:submit|preventDefault|stopPropagation={handleSubmit}>
        <div class="text-xl font-bold">Edit rent</div>
        <hr class="mb-3" />
        <div class="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-7 gap-5">
          <div class="md:col-span-2 lg:col-span-2">
            <label class="block mb-2" for="rent-code">rent Name: </label>
            <input
              id="rent-name"
              type="text"
              class="input bg-slate-100 shadow w-full"
              placeholder="Enter Name"
              bind:value={rent.name}
            />
          </div>
         <div>
            <input type="submit" class="btn bg-slate-500 hover:bg-slate-600 w-full" value="Save" />
            <input
              type="reset"
              class="btn-admin bg-slate-500 hover:bg-slate-600 w-full"
              value="Reset"
              on:click|preventDefault={() => (rent = { ...reset })}
            />
          </div>
        </div>
    </form>
</div>
</Modal>
  
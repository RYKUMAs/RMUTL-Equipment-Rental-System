<script>
  import axios from 'axios';
  import Table from '$lib/Table.svelte';
  import Datetime from '$lib/Datetime.svelte';
  import { onMount } from 'svelte';
  import { fly } from 'svelte/transition';

  let equipment = [];

  onMount(async () => {
    let res = await axios.get('http://127.0.0.1:5000/api/equipment');

    let { data } = res.data;

    equipment = data;
  });
</script>

<div class="container" in:fly={{ y: 32, duration: 500 }}>
  <Datetime />
  <hr class="my-3" />
  <Table data={equipment} />
</div>

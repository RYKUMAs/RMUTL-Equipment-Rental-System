<script>
  import Table from '../lib/Table.svelte';
  import Datetime from '../lib/Datetime.svelte';

  export let data;
</script>

<div class="container">
  <Datetime />
  <hr class="my-3">
  <Table data={data.equipment} />
</div>

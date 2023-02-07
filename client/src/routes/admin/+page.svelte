<script>
  import { fly } from 'svelte/transition';
  import Chart from '$lib/components/Chart.svelte';
  import ProfileBox from '$lib/components/ProfileBox.svelte';
</script>

<div in:fly={{ y: 32, duration: 500 }} class="p-5">
  <div class="rounded-lg overflow-hidden border border-slate-500">
    <div class="bg-slate-500 text-white p-3 font-bold text-center">
      <h1>Chart</h1>
    </div>
    <Chart />
  </div>
</div>

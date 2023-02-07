<script>
  import { fly } from 'svelte/transition';
  import Chart from '$lib/components/Chart.svelte';
</script>

<div in:fly={{ y: 32, duration: 500 }} class="flex items-center justify-center content-center h-screen">
  <div class="rounded-lg overflow-hidden border border-slate-500 w-3/4">
    <div class="bg-slate-500 text-white p-3 font-bold text-center ">
      <h1>Chart</h1>
    </div>
    <Chart />
  </div>
</div>

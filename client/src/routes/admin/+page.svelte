<script>
  import { fly } from 'svelte/transition';
  import Chart from '$lib/components/Chart.svelte';
  import ProfileBox from '$lib/components/ProfileBox.svelte';
</script>

<div in:fly={{ y: 32, duration: 500 }} />

<div class="ml-5 mt-5  rounded-lg overflow-hidden border border-slate-500 w-3/5 h-fit">
  <table class="w-full">
    <tr class="my-8 border-b bg-slate-500 text-white">
      <th>Profile</th>
    </tr>
    <ProfileBox />
  </table>
</div>

<!-- Chart.js -->
<div class="ml-5 mt-5  rounded-lg overflow-hidden border border-slate-500 w-3/5 h-fit">
  <table class="w-full">
    <tr class="my-8 border-b bg-slate-500 text-white">
      <th>Chart</th>
    </tr>
    <div class="ml-2 mt-2 pr-4 content-center  w-auto h-auto">
      <Chart />
    </div>
  </table>
</div>
<!-- Chart -->

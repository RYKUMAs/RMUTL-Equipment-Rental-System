<script>
  export let data = [];
</script>

<div class="rounded-lg overflow-hidden border">
  <table class="w-full border-collapse">
    <thead>
      <tr class="border-b">
        <th class="p-3 bg-amber-800 text-white uppercase">ID</th>
        <th class="p-3 bg-amber-800 text-white text-left uppercase">NAME</th>
        <th class="p-3 bg-amber-800 text-white uppercase">COUNT</th>
      </tr>
    </thead>
    <tbody>
      {#each Object.values(data) as row}
        <tr class="even:bg-slate-50 hover:bg-amber-50 transition border-t not:last:border-b">
          <td class="p-3 text-center">{row.id}</td>
          <td class="p-3 text-left">{row.name}</td>
          <td class="p-3 text-center">{row.count}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>

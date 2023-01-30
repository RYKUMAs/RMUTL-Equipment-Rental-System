<script>
  import Sidebar from '$lib/components/Sidebar.svelte';
</script>

<div class="admin-main">
  <div class="sidebar bg-slate-500">
    <Sidebar />
  </div>
  <div class="content">
    <slot />
  </div>
</div>=
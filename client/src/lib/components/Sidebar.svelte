<script>
  import { page } from '$app/stores';
  let list = [
    {
      path: '/admin',
      text: 'Dashboard',
    },
    {
      path: '/admin/equipment',
      text: 'Equipment',
    },
  ];
</script>

<div class="py-3 pl-3 pr-1 uppercase font-bold">
  {#each list as item (item.path)}
    <a
      href="{item.path}"
      class="menu-link {$page.route.id == item.path && 'active'}"
    >
      <span class="ml-2">{item.text}</span>
    </a>
  {/each}
</div>

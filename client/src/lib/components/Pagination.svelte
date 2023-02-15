<script>
  import { onMount } from 'svelte';

  export let total;
  export let limit;
  export let offset;
  export let callback;
  export let admin;

  let currentPage;
  let totalPages;
  let pages = [];
  let previousPage;
  let nextPage;

  function calculatePagination() {
    currentPage = Math.floor(offset / limit) + 1;
    totalPages = Math.ceil(total / limit);
    let hasPreviousPage = currentPage > 1;
    let hasNextPage = currentPage < totalPages;
    previousPage = hasPreviousPage ? currentPage - 1 : null;
    nextPage = hasNextPage ? currentPage + 1 : null;

    pages = [];
    for (let i = currentPage - 5; i <= currentPage + 5; i++) {
      if (i > 0 && i <= totalPages) {
        pages.push(i);
      }
    }
  }

  function updatePagination(offset) {
    let pagination = callback(offset);

    limit = pagination.limit;
    offset = pagination.offset;
    total = pagination.total;

    calculatePagination();
  }

  $: {
    console.log(limit);
    console.log(offset);
    console.log(total);
    calculatePagination();
  }

  onMount(() => {
    calculatePagination();
  });
</script>

<div>
  <div class="inline-flex gap-2">
    <button
      class="btn {admin && 'admin'}"
      on:click={() => updatePagination((previousPage - 1) * limit)}
      disabled={!previousPage}>Previous</button
    >
    {#each pages as page}
      <button
        class:admin={admin ?? false}
        class:btn={true}
        class:active={page === currentPage}
        on:click={() => {
          if (page !== currentPage) {
            updatePagination((page - 1) * limit);
          }
        }}
      >
        {page}
      </button>
    {/each}

    <button
      class="btn {admin && 'admin'}"
      on:click={() => updatePagination((nextPage - 1) * limit)}
      disabled={!nextPage}>Next</button
    >

    <button
      class="btn {admin && 'admin'}"
      on:click={() => updatePagination((totalPages - 1) * limit)}
      disabled={currentPage === totalPages}>Last</button
    >
  </div>
</div>

<style lang="postcss">
  .btn.active {
    @apply bg-amber-700;
  }

  .btn.admin {
    @apply bg-slate-600;
  }

  .btn.admin:hover {
    @apply bg-slate-700;
  }

  .btn.active.admin {
    @apply bg-slate-700;
  }

  .btn:disabled {
    @apply bg-amber-900 text-amber-700 cursor-not-allowed;
  }

  .btn.admin:disabled {
    @apply bg-slate-400 text-white;
  }
</style>

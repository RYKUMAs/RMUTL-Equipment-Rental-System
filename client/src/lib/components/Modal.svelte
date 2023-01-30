<script>
  import { fade, fly } from 'svelte/transition';
  export let show = false;

  function onKeyDown(e) {
    if (e.code == 'Escape') {
      show = false;
    }
  }

  function handleClose() {
    show = false;
  }
</script>

<svelte:window on:keydown={onKeyDown} />

{#if show}
  <div
    class="modal-wrapper fixed flex top-0 right-0 left-0 bottom-0 z-40 justify-center items-center"
    transition:fade={{ duration: 200 }}
    on:click={handleClose}
    on:keydown={handleClose}
  >
    <div
      class="modal bg-white relative rounded-lg p-5 w-5/6 md:w-1/2"
      in:fly={{ y: 32 }}
      on:click|stopPropagation
      on:keydown|stopPropagation
    >
      <button
        on:click={() => (show = false)}
        class="p-1 rounded-full transition hover:bg-slate-100 absolute right-3 top-3"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="w-6 h-6"
        >
          <path
            fill-rule="evenodd"
            d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
      <slot name="content" />
    </div>
  </div>
{/if}

<style lang="postcss">
  .modal-wrapper {
    background: rgba(0, 0, 0, 0.5);
  }
  .modal {
    max-height: 90vh;
    overflow-y: auto;
  }
</style>

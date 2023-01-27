<script>
  import rmutl from './img/rmutl.jpg';

  export let data = [];
</script>

<nav class="flex p-3 bg-amber-800 text-white">
  <img alt="gallery" class="object-contain h-10 w-10 mr-3 place-self-center" src={rmutl} />
  {#each data as { name, link }}
    <a href={link} class="inline-block p-2 rounded transition-all hover:bg-amber-700 uppercase"
      >{name}</a
    >
  {/each}
</nav>

<script>
  import { userStore } from '../store';
  import rmutl from '../assets/rmutl.jpg';

  let list = [
    {
      name: 'Home',
      link: '/'
    },
    {
      name: 'History',
      link: '/history'
    }
  ];
</script>

<nav class="flex p-3 bg-amber-800 text-white justify-between">
  <div class="flex">
    <img alt="gallery" class="object-contain h-10 w-10 mr-3 place-self-center" src={rmutl} />
    {#each list as { name, link }}
      <a href={link} class="inline-block p-2 rounded transition-all hover:bg-amber-700 uppercase"
        >{name}</a
      >
    {/each}
  </div>
  <div>
    {#if $userStore == null}
      <a
        href="/sign-in"
        class="inline-block p-2 rounded transition-all hover:bg-amber-700 uppercase">Sign In</a
      >
      <a
        href="/sign-up"
        class="inline-block p-2 rounded transition-all hover:bg-amber-700 uppercase">Sign Up</a
      >
    {:else}
      <span class="inline-block p-2 rounded transition-all hover:bg-amber-700 uppercase"
        >{$userStore.username}</span
      >
      <a
        class="inline-block p-2 rounded transition-all hover:bg-amber-700 uppercase"
        href="sign-out">Sign Out</a
      >
    {/if}
  </div>
</nav>

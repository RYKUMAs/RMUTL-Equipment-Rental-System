<script>
  import { onMount } from 'svelte';

  let time = new Date();

  onMount(() => {
    const interval = setInterval(() => {
      time = new Date();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });
</script>

<span>{time.toLocaleString()}</span>

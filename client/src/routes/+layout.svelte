<script>
  import '../app.css';
  import { fly } from 'svelte/transition';
  import Navbar from '../lib/Navbar.svelte';
  import Footer from '../lib/Footer.svelte';

  let menu = [
    {
      name: 'Home',
      link: '/'
    },
    {
      name: 'Sign In',
      link: '/sign-in'
    },
    {
      name: 'Sign Up',
      link: '/sign-up'
    }
  ];
</script>

<Navbar data={menu} />
<div class="p-5" in:fly={{ x: -50, duration: 100, delay: 300 }} out:fly={{ x: -50, duration: 100 }}>
  <slot />
</div>
<Footer />

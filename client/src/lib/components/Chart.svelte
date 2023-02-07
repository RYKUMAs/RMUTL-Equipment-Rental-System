<script>
  import axios from 'axios';
  import { onMount } from 'svelte';
  import Chart from 'chart.js/auto';

  let elem;

  async function getStat(equipment, last) {
    let res = await axios
      .get(`http://localhost:5000/api/rent/statistic?last=${last}&equipment=${equipment}`)
      .catch(e => console.log(e));

    const body = res.data;
    const data = body.data;

    const label = [];
    const dataCount = [];

    for (let i = data.length - 1; i >= 0; i--) {
      const { month, year, count } = data[i];

      label.push(`${month} ${year}`);
      dataCount.push(count);
    }

    return { label, data: dataCount };
  }

  onMount(async () => {
    const res = await axios
      .get('http://localhost:5000/api/equipment/list')
      .catch(e => console.log(e));

    const body = res.data;
    const data = body.data;

    let chartLabel = [];
    let datasets = [];

    for (let i = 0; i < data.length; i++) {
      const stat = await getStat(data[i].name, 12);
      chartLabel = stat.label;
      datasets.push({ label: data[i].name, data: stat.data });
    }

    new Chart(elem, {
      type: 'line',
      data: {
        labels: chartLabel,
        datasets,
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  });
</script>

<div class="relative aspect-video">
  <canvas bind:this={elem} class="w-full" />
</div>  
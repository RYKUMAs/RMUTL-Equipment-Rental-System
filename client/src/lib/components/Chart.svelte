<script>
  import { onMount } from 'svelte';

  function createChart() {
    const ctx = document.getElementById('myChart');

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December'
        ],
        datasets: [
          {
            label: '# Rent rate',
            data: [12, 58, 38, 5, 29, 33, 16, 33, 28, 22, 36, 5],
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  onMount(createChart);
</script>

<div>
  <canvas id="myChart" />
</div>

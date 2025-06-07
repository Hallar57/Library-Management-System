export default function piechart(finesData) {
  // Sum amounts for paid and unpaid fines
  const paidAmount = finesData
    .filter(fine => fine.paid_status)
    .reduce((sum, fine) => sum + parseFloat(fine.amount), 0);
  
  const unpaidAmount = finesData
    .filter(fine => !fine.paid_status)
    .reduce((sum, fine) => sum + parseFloat(fine.amount), 0);

  const ctx = document.getElementById('finesChart').getContext('2d');

  new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['Paid Amount', 'Unpaid Amount'],
      datasets: [{
        data: [paidAmount, unpaidAmount],
        backgroundColor: [
          'rgba(75, 192, 192, 0.7)',
          'rgba(255, 99, 132, 0.7)'
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Fines Payment Amount Distribution'
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return `${context.label}: $${context.raw.toFixed(2)}`;
            }
          }
        }
      }
    }
  });
}
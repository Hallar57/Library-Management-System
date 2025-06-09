const ctx = document.getElementById("myChart");

datalink = "http://127.0.0.1:5001/books_per_category";

async function load_chart() {
  fetch(datalink)
    .then((response) => {
      if (!response.ok) throw new Error("Failed to fetch data");
      return response.json();
    })
    .then((data) => {

      new Chart(ctx, {
        type: "bar",
        data: {
          labels: data.map(row => row.category_name),
          datasets: [
            {
              label: "Number of Books",
              data: data.map(row => row.count),
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    })
    .catch((err) => {
      console.log(err.message);
    });
}

load_chart();
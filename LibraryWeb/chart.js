const ctx = document.getElementById("myChart");

datalink = "http://127.0.0.1:5001/books_per_category";

const category_name = [];
const count = [];
function load_chart() {
  fetch(datalink)
    .then((response) => {
      if (!response.ok) throw new Error("Failed to fetch data");
      return response.json();
    })
    .then((data) => {
      data.forEach((books_per_category) => {
        category_name.push(books_per_category.category_name);
        count.push(books_per_category.count);
      });

      console.log(category_name);
      console.log(count);
    })
    .catch((err) => {
      console.log(err.message);
    });

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: category_name,
      datasets: [
        {
          label: "Number of Books",
          data: count,
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
}
load_chart();
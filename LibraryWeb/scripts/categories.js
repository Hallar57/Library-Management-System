const CATEGORIES_API_LINK =
  "https://curly-invention-r47rr5q756p7cp9x4-5001.app.github.dev/categories";

function load_categories() {
  fetch(CATEGORIES_API_LINK)
    .then((response) => {
      if (!response.ok) throw new Error("Failed to fetch data");
      return response.json();
    })
    .then((data) => {
      const tbody = document.querySelector("#categoriestable tbody");
      tbody.innerHTML = "";

      data.forEach((categories) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${categories.category_id}</td>
          <td>${categories.category_name}</td>
        `;
        tbody.appendChild(row);
      });
    })
    .catch((err) => {
      console.log(err.message);
    });
}

document.getElementById("categoryForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const category = Object.fromEntries(formData.entries());

  [
    "category_id",
    "category_name",
  ].forEach((key) => {
    category[key] = Number(category[key]);
  });

  try {
    const response = await fetch(CATEGORIES_API_LINK, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(category),
    });

    if (!response.ok) throw new Error("Failed to add category");

    e.target.reset();
    load_categories();
  } catch (err) {
    console.error(err.message);
  }
});

load_categories();

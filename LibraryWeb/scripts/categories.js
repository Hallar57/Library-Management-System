const CATEGORIES_API_LINK =
  "https://curly-invention-r47rr5q756p7cp9x4-5001.app.github.dev/categories";

fetch(CATEGORIES_API_LINK)
  .then((response) => {
    if (!response.ok) throw new Error("Failed to fetch data");
    return response.json();
  })
  .then((data) => {
    const tbody = document.querySelector("#categoriestable tbody");

    data.forEach((categories) => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${categories.category_id}</td>
        <td>${categories.category_name}</td>\
        `;
      tbody.appendChild(row);
    });
  })
  .catch((err) => {
    console.log(err.message);
  });

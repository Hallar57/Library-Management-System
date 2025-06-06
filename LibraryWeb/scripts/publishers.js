const PUBLISHERS_API_LINK =
  "https://curly-invention-r47rr5q756p7cp9x4-5001.app.github.dev/publishers";

fetch(PUBLISHERS_API_LINK)
  .then((response) => {
    if (!response.ok) throw new Error("Failed to fetch data");
    return response.json();
  })
  .then((data) => {
    const tbody = document.querySelector("#publisherstable tbody");

    data.forEach((publishers) => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${publishers.publisher_id}</td>
        <td>${publishers.publisher_name}</td>\
        `;
      tbody.appendChild(row);
    });
  })
  .catch((err) => {
    console.log(err.message);
  });

const AUTHORS_API_LINK =
  "https://curly-invention-r47rr5q756p7cp9x4-5001.app.github.dev/authors";

fetch(AUTHORS_API_LINK)
  .then((response) => {
    if (!response.ok) throw new Error("Failed to fetch data");
    return response.json();
  })
  .then((data) => {
    const tbody = document.querySelector("#authorstable tbody");

    data.forEach((authors) => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${authors.author_id}</td>
        <td>${authors.author_name}</td>
        <td>${authors.nationality}</td>
        <td>${authors.publisher_id}</td>
        <td>${authors.category_id}</td>
        <td>${authors.isbn}</td>
        <td>${authors.published_year}</td>
        <td>${authors.available_copies}</td>
        `;
      tbody.appendChild(row);
    });
  })
  .catch((err) => {
    console.log(err.message);
  });

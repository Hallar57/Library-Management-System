const FINES_API_LINK =
  "https://curly-invention-r47rr5q756p7cp9x4-5001.app.github.dev/fines";

fetch(FINES_API_LINK)
  .then((response) => {
    if (!response.ok) throw new Error("Failed to fetch data");
    return response.json();
  })
  .then((data) => {
    const tbody = document.querySelector("#finestable tbody");

    data.forEach((fines) => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${fines.author_id}</td>
        <td>${fines.author_name}</td>
        <td>${fines.nationality}</td>
        <td>${fines.date_of_birth}</td>
        `;
      tbody.appendChild(row);
    });
  })
  .catch((err) => {
    console.log(err.message);
  });

const MEMBERSHIP_TYPE_API_LINK =
  "https://curly-invention-r47rr5q756p7cp9x4-5001.app.github.dev/membership_type";

fetch(MEMBERSHIP_TYPE_API_LINK)
  .then((response) => {
    if (!response.ok) throw new Error("Failed to fetch data");
    return response.json();
  })
  .then((data) => {
    const tbody = document.querySelector("#membership_typetable tbody");

    data.forEach((membership_type) => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${membership_type.author_id}</td>
        <td>${membership_type.author_name}</td>
        <td>${membership_type.nationality}</td>
        <td>${membership_type.date_of_birth}</td>
        `;
      tbody.appendChild(row);
    });
  })
  .catch((err) => {
    console.log(err.message);
  });

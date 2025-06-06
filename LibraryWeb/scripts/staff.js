const STAFF_API_LINK =
  "https://curly-invention-r47rr5q756p7cp9x4-5001.app.github.dev/staff";

fetch(STAFF_API_LINK)
  .then((response) => {
    if (!response.ok) throw new Error("Failed to fetch data");
    return response.json();
  })
  .then((data) => {
    const tbody = document.querySelector("#stafftable tbody");

    data.forEach((staff) => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${staff.author_id}</td>
        <td>${staff.author_name}</td>
        <td>${staff.nationality}</td>
        <td>${staff.date_of_birth}</td>
        `;
      tbody.appendChild(row);
    });
  })
  .catch((err) => {
    console.log(err.message);
  });

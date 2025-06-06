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
        <td>${staff.staff_id}</td>
        <td>${staff.staff_name}</td>
        <td>${staff.role}</td>
        <td>${staff.email}</td>
        `;
      tbody.appendChild(row);
    });
  })
  .catch((err) => {
    console.log(err.message);
  });

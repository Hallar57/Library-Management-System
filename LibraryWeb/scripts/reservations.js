const RESERVATIONS_API_LINK =
  "https://curly-invention-r47rr5q756p7cp9x4-5001.app.github.dev/reservations";

fetch(RESERVATIONS_API_LINK)
  .then((response) => {
    if (!response.ok) throw new Error("Failed to fetch data");
    return response.json();
  })
  .then((data) => {
    const tbody = document.querySelector("#reservationstable tbody");

    data.forEach((reservations) => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${reservations.reservation_id}</td>
        <td>${reservations.book_id}</td>
        <td>${reservations.member_id}</td>
        <td>${reservations.status}</td>
        <td>${reservations.reservation_date}</td>
        `;
      tbody.appendChild(row);
    });
  })
  .catch((err) => {
    console.log(err.message);
  });

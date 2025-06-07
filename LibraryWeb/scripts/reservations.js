const RESERVATIONS_API_LINK =
  "https://curly-invention-r47rr5q756p7cp9x4-5001.app.github.dev/reservations";

function load_reservations() {
  fetch(RESERVATIONS_API_LINK)
    .then((response) => {
      if (!response.ok) throw new Error("Failed to fetch data");
      return response.json();
    })
    .then((data) => {
      const tbody = document.querySelector("#reservationstable tbody");
      tbody.innerHTML = "";

      data.forEach((reservations) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${reservations.reservation_id}</td>
          <td>${reservations.reservation_name}</td>
          <td>${reservations.nationality}</td>
          <td>${reservations.date_of_birth}</td>
        `;
        tbody.appendChild(row);
      });
    })
    .catch((err) => {
      console.log(err.message);
    });
}

document.getElementById("reservationForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const reservation = Object.fromEntries(formData.entries());

  ["reservation_id", "reservation_name", "nationality", "date_of_birth"].forEach(
    (key) => {
      reservation[key] = Number(reservation[key]);
    }
  );

  try {
    const response = await fetch(RESERVATIONS_API_LINK, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reservation),
    });

    if (!response.ok) throw new Error("Failed to add reservation");

    e.target.reset();
    load_reservations();
  } catch (err) {
    console.error(err.message);
  }
});

load_reservations();

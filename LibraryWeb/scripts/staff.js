//const STAFF_API_LINK = "https://curly-invention-r47rr5q756p7cp9x4-5001.app.github.dev/staff";
const STAFF_API_LINK = "http://127.0.0.1:5001/staff";

function load_staff() {
  fetch(STAFF_API_LINK)
    .then((response) => {
      if (!response.ok) throw new Error("Failed to fetch data");
      return response.json();
    })
    .then((data) => {
      const tbody = document.querySelector("#stafftable tbody");
      tbody.innerHTML = "";

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
}

document.getElementById("staffForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const staff = Object.fromEntries(formData.entries());

  try {
    const response = await fetch(STAFF_API_LINK, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(staff),
    });

    if (!response.ok) throw new Error("Failed to add staff");

    e.target.reset();
    load_staff();
  } catch (err) {
    console.error(err.message);
    alert("Invalid Input!");
  }
});

load_staff();

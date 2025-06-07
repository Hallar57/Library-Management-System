const MEMBERSHIP_TYPE_API_LINK =
  "https://curly-invention-r47rr5q756p7cp9x4-5001.app.github.dev/membership_type";

function load_membership_type() {
  fetch(MEMBERSHIP_TYPE_API_LINK)
    .then((response) => {
      if (!response.ok) throw new Error("Failed to fetch data");
      return response.json();
    })
    .then((data) => {
      const tbody = document.querySelector("#membership_typetable tbody");
      tbody.innerHTML = "";

      data.forEach((membership_type) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${membership_type.member_type_id}</td>
          <td>${membership_type.member_type_name}</td>
        `;
        tbody.appendChild(row);
      });
    })
    .catch((err) => {
      console.log(err.message);
    });
}

document.getElementById("membership_typeForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const membership_type = Object.fromEntries(formData.entries());

  try {
    const response = await fetch(MEMBERSHIP_TYPE_API_LINK, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(membership_type),
    });

    if (!response.ok) throw new Error("Failed to add membership_type");

    e.target.reset();
    load_membership_type();
  } catch (err) {
    console.error(err.message);
  }
});

load_membership_type();

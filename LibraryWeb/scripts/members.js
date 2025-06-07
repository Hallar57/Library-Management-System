const MEMBERS_API_LINK =
  "https://curly-invention-r47rr5q756p7cp9x4-5001.app.github.dev/members";

function load_members() {
  fetch(MEMBERS_API_LINK)
    .then((response) => {
      if (!response.ok) throw new Error("Failed to fetch data");
      return response.json();
    })
    .then((data) => {
      const tbody = document.querySelector("#memberstable tbody");
      tbody.innerHTML = "";

      data.forEach((members) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${members.member_id}</td>
          <td>${members.member_name}</td>
          <td>${members.nationality}</td>
          <td>${members.date_of_birth}</td>
        `;
        tbody.appendChild(row);
      });
    })
    .catch((err) => {
      console.log(err.message);
    });
}

document.getElementById("memberForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const member = Object.fromEntries(formData.entries());

  ["member_id", "member_name", "nationality", "date_of_birth"].forEach(
    (key) => {
      member[key] = Number(member[key]);
    }
  );

  try {
    const response = await fetch(MEMBERS_API_LINK, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(member),
    });

    if (!response.ok) throw new Error("Failed to add member");

    e.target.reset();
    load_members();
  } catch (err) {
    console.error(err.message);
  }
});

load_members();

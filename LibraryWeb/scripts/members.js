const MEMBERS_API_LINK =
  "https://curly-invention-r47rr5q756p7cp9x4-5001.app.github.dev/members";

fetch(MEMBERS_API_LINK)
  .then((response) => {
    if (!response.ok) throw new Error("Failed to fetch data");
    return response.json();
  })
  .then((data) => {
    const tbody = document.querySelector("#memberstable tbody");

    data.forEach((members) => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${members.member_id}</td>
        <td>${members.member_name}</td>
        <td>${members.email}</td>
        <td>${members.membership_date}</td>
        <td>${members.member_type_id}</td>
        `;
      tbody.appendChild(row);
    });
  })
  .catch((err) => {
    console.log(err.message);
  });

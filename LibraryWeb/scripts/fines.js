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
        <td>${fines.fine_id}</td>
        <td>${fines.loan_id}</td>
        <td>${fines.amount}</td>
        <td>${fines.paid_status}</td>
        `;
      tbody.appendChild(row);
    });
  })
  .catch((err) => {
    console.log(err.message);
  });

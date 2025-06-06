const LOANS_API_LINK =
  "https://curly-invention-r47rr5q756p7cp9x4-5001.app.github.dev/loans";

fetch(LOANS_API_LINK)
  .then((response) => {
    if (!response.ok) throw new Error("Failed to fetch data");
    return response.json();
  })
  .then((data) => {
    const tbody = document.querySelector("#loanstable tbody");

    data.forEach((loans) => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${loans.author_id}</td>
        <td>${loans.author_name}</td>
        <td>${loans.nationality}</td>
        <td>${loans.date_of_birth}</td>
        `;
      tbody.appendChild(row);
    });
  })
  .catch((err) => {
    console.log(err.message);
  });

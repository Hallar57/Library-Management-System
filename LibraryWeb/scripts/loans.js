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
        <td>${loans.loan_id}</td>
        <td>${loans.member_id}</td>
        <td>${loans.book_id}</td>
        <td>${loans.staff_id}</td>
        <td>${loans.loan_date}</td>
        <td>${loans.due_date}</td>
        <td>${loans.return_date}</td>
        `;
      tbody.appendChild(row);
    });
  })
  .catch((err) => {
    console.log(err.message);
  });

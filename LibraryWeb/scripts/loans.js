import formatDate from "./utils/formatDate.js";

const LOANS_API_LINK =
  "https://curly-invention-r47rr5q756p7cp9x4-5001.app.github.dev/loans";

function load_loans() {
  fetch(LOANS_API_LINK)
    .then((response) => {
      if (!response.ok) throw new Error("Failed to fetch data");
      return response.json();
    })
    .then((data) => {
      const tbody = document.querySelector("#loanstable tbody");
      tbody.innerHTML = "";

      data.forEach((loans) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${loans.loan_id}</td>
          <td>${loans.book_id}</td>
          <td>${loans.member_id}</td>
          <td>${loans.staff_id}</td>
          <td>${formatDate(loans.loan_date)}</td>
          <td>${formatDate(loans.due_date)}</td>
          <td>${formatDate(loans.return_date)}</td>
        `;
        tbody.appendChild(row);
      });
    })
    .catch((err) => {
      console.log(err.message);
    });
}

document.getElementById("loanForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const loan = Object.fromEntries(formData.entries());

  try {
    const response = await fetch(LOANS_API_LINK, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loan),
    });

    if (!response.ok) throw new Error("Failed to add loan");

    e.target.reset();
    load_loans();
  } catch (err) {
    console.error(err.message);
  }
});

load_loans();

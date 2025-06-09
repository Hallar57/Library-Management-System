import formatDate from "./utils/formatDate.js";

//const AUTHORS_API_LINK = "https://curly-invention-r47rr5q756p7cp9x4-5001.app.github.dev/authors";
const AUTHORS_API_LINK = "http://127.0.0.1:5001/authors";

function load_authors() {
  fetch(AUTHORS_API_LINK)
    .then((response) => {
      if (!response.ok) throw new Error("Failed to fetch data");
      return response.json();
    })
    .then((data) => {
      const tbody = document.querySelector("#authorstable tbody");
      tbody.innerHTML = "";

      data.forEach((authors) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${authors.author_id}</td>
          <td>${authors.author_name}</td>
          <td>${authors.nationality}</td>
          <td>${formatDate(authors.date_of_birth)}</td>
        `;
        tbody.appendChild(row);
      });
    })
    .catch((err) => {
      console.log(err.message);
    });
}

document.getElementById("authorForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const author = Object.fromEntries(formData.entries());



  try {
    const response = await fetch(AUTHORS_API_LINK, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(author),
    });

    if (!response.ok) throw new Error("Failed to add author");

    e.target.reset();
    load_authors();
  } catch (err) {
    console.error(err.message);
    alert("Invalid Input!");
  }
});

load_authors();

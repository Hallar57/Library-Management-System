const AUTHORS_API_LINK =
  "https://curly-invention-r47rr5q756p7cp9x4-5001.app.github.dev/authors";

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
          <td>${authors.date_of_birth}</td>
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

  ["author_id", "author_name", "nationality", "date_of_birth",].forEach(
    (key) => {
      author[key] = Number(author[key]);
    }
  );

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
  }
});

load_authors();

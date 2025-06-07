const PUBLISHERS_API_LINK =
  "https://curly-invention-r47rr5q756p7cp9x4-5001.app.github.dev/publishers";

function load_publishers() {
  fetch(PUBLISHERS_API_LINK)
    .then((response) => {
      if (!response.ok) throw new Error("Failed to fetch data");
      return response.json();
    })
    .then((data) => {
      const tbody = document.querySelector("#publisherstable tbody");
      tbody.innerHTML = "";

      data.forEach((publishers) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${publishers.publisher_id}</td>
          <td>${publishers.publisher_name}</td>
        `;
        tbody.appendChild(row);
      });
    })
    .catch((err) => {
      console.log(err.message);
    });
}

document.getElementById("publisherForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const publisher = Object.fromEntries(formData.entries());

  ["publisher_id", "publisher_name", "nationality", "date_of_birth"].forEach(
    (key) => {
      publisher[key] = Number(publisher[key]);
    }
  );

  try {
    const response = await fetch(PUBLISHERS_API_LINK, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(publisher),
    });

    if (!response.ok) throw new Error("Failed to add publisher");

    e.target.reset();
    load_publishers();
  } catch (err) {
    console.error(err.message);
  }
});

load_publishers();

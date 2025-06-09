//const PUBLISHERS_API_LINK = "https://curly-invention-r47rr5q756p7cp9x4-5001.app.github.dev/publishers";
const PUBLISHERS_API_LINK = "http://127.0.0.1:5001/publishers";

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

document.getElementById("publishersForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const publishers = Object.fromEntries(formData.entries());

  try {
    const response = await fetch(PUBLISHERS_API_LINK, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(publishers),
    });

    if (!response.ok) throw new Error("Failed to add publisher");

    e.target.reset();
    load_publishers();
  } catch (err) {
    console.error(err.message);
    alert("Invalid Input!");
  }
});

load_publishers();
const BOOKS_API_LINK =
  "https://curly-invention-r47rr5q756p7cp9x4-5001.app.github.dev/books";

// Wrap fetch logic in a function so we can call it again
function loadBooks() {
  fetch(BOOKS_API_LINK)
    .then((response) => {
      if (!response.ok) throw new Error("Failed to fetch data");
      return response.json();
    })
    .then((data) => {
      const tbody = document.querySelector("#bookstable tbody");
      tbody.innerHTML = ""; // clear existing rows

      data.forEach((books) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${books.book_id}</td>
          <td>${books.title}</td>
          <td>${books.author_id}</td>
          <td>${books.publisher_id}</td>
          <td>${books.category_id}</td>
          <td>${books.isbn}</td>
          <td>${books.published_year}</td>
          <td>${books.available_copies}</td>
        `;
        tbody.appendChild(row);
      });
    })
    .catch((err) => {
      console.log(err.message);
    });
}


document.getElementById("bookForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const book = Object.fromEntries(formData.entries());

  // Convert numeric fields
  ["book_id","author_id", "publisher_id", "category_id", "published_year", "available_copies"].forEach(key => {
    book[key] = Number(book[key]);
  });

  try {
    const response = await fetch(BOOKS_API_LINK, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(book),
    });

    if (!response.ok) throw new Error("Failed to add book");

    // Clear form and reload books
    e.target.reset();
    loadBooks(); // Re-fetch and display updated list
  } catch (err) {
    console.error(err.message);
  }
});


// Load books on initial page load
loadBooks();
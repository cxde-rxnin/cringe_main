

//        // Define the Jikan API endpoint for searching anime
//        const searchAnimeEndpoint = "https://api.jikan.moe/v4/anime";

//        // Function to handle search when Enter key is pressed
//        function searchOnEnter(event) {
//          if (event.key === "Enter") {
//            searchAnime();
//          }
//        }
       
//        // Function to handle search
//        async function searchAnime() {
//          try {
//            const searchInputValue = document
//              .getElementById("searchInput")
//              .value.trim();
//            if (searchInputValue !== "") {
//              const response = await fetch(
//                `${searchAnimeEndpoint}?q=${searchInputValue}`
//              );
       
//              // Check if the response is ok (status code 200-299)
//              if (!response.ok) {
//                throw new Error("Network response was not ok " + response.statusText);
//              }
       
//              // Parse the JSON data
//              const data = await response.json();
       
//              //dislay results
//              displayAnimeList(data.results);
//            }
//          } catch (error) {
//            console.error("There has been a problem with your fetch operation:", error);
//          }
//        }

//       // Function to display anime data in the list
// function displayAnimeList(animeList) {
//     const animeListElement = document.getElementById("animeList");
//     animeListElement.innerHTML = ""; // Clear any existing content
  
//     // Check if animeList is defined and not empty
//     if (animeList && animeList.length > 0) {
//       animeList.forEach((anime) => {
//         const listItem = document.createElement("li");
//         listItem.innerHTML = `
//           <a href="details_page.html?id=${anime.mal_id}">
//             <img src="${anime.images.jpg.image_url}" alt="${anime.title}">
//             <div class="anime-title">${anime.title}</div>
//           </a>
//         `;
//         animeListElement.appendChild(listItem);
//       });
//     } else {
//       // Display a message if no search results are found
//       animeListElement.innerHTML = `<p class="anime-error">No search results found.</p>`;
//     }
//   }
  

// Define the Jikan API endpoint for searching anime
const searchAnimeEndpoint = "https://api.jikan.moe/v4/anime";

// Function to handle search when Enter key is pressed
function searchOnEnter(event) {
  if (event.key === "Enter") {
    searchAnime();
  }
}

// Function to handle search
async function searchAnime() {
  try {
    const searchInputValue = document.getElementById("searchInput").value.trim();
    if (searchInputValue !== "") {
      const response = await fetch(`${searchAnimeEndpoint}?q=${searchInputValue}`);

      // Check if the response is ok (status code 200-299)
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }

      // Parse the JSON data
      const data = await response.json();

      // Display results
      displayAnimeList(data.data); // Adjusted to data.data to match the Jikan API response format
    }
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
  }
}

// Function to display anime data in the list
function displayAnimeList(animeList) {
  const animeListElement = document.getElementById("animelist");
  animeListElement.innerHTML = ""; // Clear any existing content

  // Check if animeList is defined and not empty
  if (animeList && animeList.length > 0) {
    animeList.forEach((anime) => {
      const listItem = document.createElement("li");
      listItem.innerHTML = `
        <a href="details_page.html?id=${anime.mal_id}">
          <img src="${anime.images.jpg.image_url}" alt="${anime.title}">
          <div class="anime-title">${anime.title}</div>
        </a>
      `;
      animeListElement.appendChild(listItem);
    });
  } else {
    // Display a message if no search results are found
    animeListElement.innerHTML = `<p class="anime-error">No search results found.</p>`;
  }
}

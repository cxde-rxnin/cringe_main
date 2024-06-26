// var loader = document.getElementById("load");

// window.addEventListener("load", function() {
//   setTimeout(function() {
//     loader.style.opacity = '0'; // Start fading out

//     // Enable scrolling after fade-out animation completes
//     loader.addEventListener('transitionend', function() {
//       loader.style.display = 'none';
//       document.body.style.overflowY = 'scroll'; // Enable scrolling
//     }, { once: true });
//   }, 5000);
// });

var loader = document.getElementById("load");

window.addEventListener("load", function () {
  setTimeout(function () {
    loader.style.opacity = "0"; // Start fading out
    loader.style.pointerEvents = "none"; // Disable pointer events to prevent interaction

    // Enable scrolling and re-enable pointer events after fade-out animation completes
    loader.addEventListener(
      "transitionend",
      function (event) {
        if (event.target === loader) {
          loader.style.display = "none";
          document.body.style.overflowY = "scroll"; // Enable scrolling
          loader.style.pointerEvents = "auto"; // Re-enable pointer events

          // Initialize SwiperJS (Slider) after loader fades out
          initializeSwiper();
        }
      },
      { once: true }
    );
  }, 5000);
});

// Define the Jikan API endpoint for top anime
const topAnimeEndpoint = "https://api.jikan.moe/v4/top/anime";

// Function to fetch top anime data
async function fetchTopAnime() {
  try {
    const response = await fetch(topAnimeEndpoint);

    // Check if the response is ok (status code 200-299)
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }

    // Parse the JSON data
    const data = await response.json();

    // Get the top 10 and top 100 anime
    const top10Anime = data.data.slice(0, 10);
    const top100Anime = data.data.slice(0, 24);

    // Display the top 10 most-watched anime in the slider
    displayAnimeSlider(top10Anime);

    // Display the top 100 anime in the list
    displayAnimeList(top100Anime);
  } catch (error) {
    // Handle any errors that occur during the fetch
    console.error("There has been a problem with your fetch operation:", error);
  }
}

// Function to display anime data in the slider
function displayAnimeSlider(animeList) {
  const sliderElement = document.querySelector(".swiper-wrapper");
  sliderElement.innerHTML = ""; // Clear any existing content
  animeList.forEach((anime) => {
    const slideItem = document.createElement("div");
    slideItem.className = "swiper-slide";
    slideItem.innerHTML = `
            <a href="details_page.html?id=${anime.mal_id}">
                <div class="anime-image" style="background-image: url('${anime.images.jpg.image_url}')"></div>
                <div class="anime-title"><p>${anime.title}</p></div>
            </a>
        `;
    sliderElement.appendChild(slideItem);
  });

  // Initialize SwiperJS
  new Swiper(".swiper-container", {
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
}

// Function to display anime data in the list
function displayAnimeList(animeList) {
  const animeListElement = document.getElementById("animeList");
  animeListElement.innerHTML = ""; // Clear any existing content
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
}

// Function to fetch anime details
async function fetchAnimeDetails() {
  try {
    // Get the anime ID from the query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const animeId = urlParams.get("id");

    // Make a request to fetch anime details using the ID
    const response = await fetch(`https://api.jikan.moe/v4/anime/${animeId}`);
    const animeDetails = await response.json();

    // Display anime details on the page
    const animeDetailsContainer = document.getElementById("animeDetails");
    animeDetailsContainer.innerHTML = `
            <div class="anime-image-container">
                <img src="${animeDetails.data.images.jpg.image_url}" alt="${animeDetails.data.title}" class="anime-image">
            </div>

            <div class="detail-text">
            <h2 id="title">${animeDetails.data.title}</h2> <br>
            <p id="episodes">Episodes: ${animeDetails.data.episodes}</p> <br> 
            <p id="synopsis">${animeDetails.data.synopsis}</p> 
            </div>
            <!-- Add more details as needed -->
        `;

    // Update the link to open in the same window/tab
    const animeLink = document.querySelector(".anime-link");
    animeLink.href = `details_page.html?id=${animeDetails.data.mal_id}`;
  } catch (error) {
    console.error("Error fetching anime details:", error);
  }
}

function back() {
  window.history.back();
}

// Call the function to fetch anime details when the page loads
if (window.location.pathname.includes("details_page.html")) {
  fetchAnimeDetails();
}

// Call the function to fetch anime data when the page loads
fetchTopAnime();

// function toggleSearch() {
//     var searchInputContainer = document.querySelector('.search-input-container');
//     searchInputContainer.classList.toggle('active');
// }

// // Function to handle search
// function searchAnime() {
//     var searchInputValue = document.getElementById('searchInput').value.trim();
//     if (searchInputValue !== '') {
//         window.location.href = `search.html?q=${searchInputValue}`;
//             }
//         }

//         // Event listener to trigger search function on Enter key press
//     document.getElementById('searchInput').addEventListener('keydown', function(event) {
//         if (event.key === 'Enter') {
//             searchAnime();
//         }
// });

// // Define the Jikan API endpoint for searching anime
// const searchAnimeEndpoint = 'https://api.jikan.moe/v4/search/anime';

// // search function
// async function searchAnime(query) {
//     try {
//         const response = await fetch(`${searchAnimeEndpoint}?q=${query}`);

//         // Check if the response is ok (status code 200-299)
//         if (!response.ok) {
//             throw new Error('Network response was not ok ' + response.statusText);
//         }

//         // Parse the JSON data
//         const data = await response.json();

//         // Display search results
//         displayAnimeList(data.results);

//     } catch (error) {
//         // Handle any errors that occur during the fetch
//         console.error('There has been a problem with your fetch operation:', error);
//     }
// }

// Function to display anime data in the list
function displayAnimeList(animeList) {
  const animeListElement = document.getElementById("animeList");
  animeListElement.innerHTML = ""; // Clear any existing content
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
}

//  // Define the Jikan API endpoint for searching anime
//  const searchAnimeEndpoint = 'https://api.jikan.moe/v4/anime';

//  // Function to handle search when Enter key is pressed
//  function searchOnEnter(event) {
//      if (event.key === 'Enter') {
//          searchAnime();
//      }
//  }

//  // Function to handle search
//  async function searchAnime() {
//      try {
//          const searchInputValue = document.getElementById('searchInput').value.trim();
//          if (searchInputValue !== '') {
//              const response = await fetch(`${searchAnimeEndpoint}?q=${searchInputValue}`);

//              // Check if the response is ok (status code 200-299)
//              if (!response.ok) {
//                  throw new Error('Network response was not ok ' + response.statusText);
//              }

//              // Parse the JSON data
//              const data = await response.json();

//              // Display search results
//              console.log(data.results);
//          }
//      } catch (error) {
//          console.error('There has been a problem with your fetch operation:', error);
//      }
//  }


// Function to display anime data in the list
function displayAnimeList(animeList) {
  const animeListElement = document.getElementById("animeList");
  animeListElement.innerHTML = ""; // Clear any existing content
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
}

//  // Function to display anime data in the list
//  function displayAnimeList(animeList) {
//      const animeListElement = document.getElementById('animeList');
//      animeListElement.innerHTML = ''; // Clear any existing content
//      animeList.forEach(anime => {
//          const listItem = document.createElement('li');
//          listItem.innerHTML = `
//              <a href="details_page.html?id=${anime.mal_id}">
//                  <img src="${anime.images.jpg.image_url}" alt="${anime.title}">
//                  <div class="anime-title">${anime.title}</div>
//              </a>
//          `;
//          animeListElement.appendChild(listItem);
//      });
//  }

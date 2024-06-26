  // Define the Jikan API endpoint for top anime
  const apiEndpoint = 'https://api.jikan.moe/v4/top/anime';

  // Function to fetch top anime data
  async function fetchAnime() {
      try {
          // Initialize an empty array to hold all anime
          let allAnime = [];
          
          // Fetch pages until we have at least 100 anime
          for (let page = 1; allAnime.length < 100; page++) {
              const response = await fetch(`${apiEndpoint}?page=${page}`);
              
              // Check if the response is ok (status code 200-299)
              if (!response.ok) {
                  throw new Error('Network response was not ok ' + response.statusText);
              }
              
              // Parse the JSON data
              const data = await response.json();
              
              // Append the current page's data to the allAnime array
              allAnime = allAnime.concat(data.data);
          }
          
          // Display the data on the web page
          displayAnime(allAnime.slice(0, 100));
          
      } catch (error) {
          // Handle any errors that occur during the fetch
          console.error('There has been a problem with your fetch operation:', error);
      }
  }

  // Function to display anime data on the web page
  function displayAnime(animeList) {
      const animeListElement = document.getElementById('animeList');
      animeListElement.innerHTML = ''; // Clear any existing content
      animeList.forEach(anime => {
          const listItem = document.createElement('li');
          listItem.className = 'li';
          listItem.innerHTML = `
              <a href="details_page.html?id=${anime.mal_id}" target="_blank">
                  <div class="anime-image" style="background-image: url('${anime.images.jpg.image_url}')"></div>
                  <div class="overlay">
                      <span class="anime-title">${anime.title}</span>
                  </div>
              </a>
          `;
          animeListElement.appendChild(listItem);
      });
  }

  // Call the function to fetch anime data when the page loads
  fetchAnime();
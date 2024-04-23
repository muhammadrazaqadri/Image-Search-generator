const accessKey = "or3iPJ9IyZ3ZyqX64eVn6yGpDuudN0CTjG37-VTPOd8";

const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const showMoreBtn = document.getElementById("show-more-btn");

let page = 1;
let allData = []; // Array to store all the data

async function searchImages() {
    const keyword = searchBox.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        // Store data in the allData array
        allData = allData.concat(data.results);

        // Clear previous search results if it's the first page
        if (page === 1) {
            searchResult.innerHTML = '';
        }

        const results = data.results;
        results.forEach(result => {
            const image = document.createElement("img");
            image.src = result.urls.small;
            image.style.width = "100%"; // Set image width to 100%
            image.style.height = "auto"; // Maintain aspect ratio
            image.style.margin = "2px"; // Add 2px margin

            const imageLink = document.createElement("a");
            imageLink.href = result.links.html;
            imageLink.target = "_blank";

            imageLink.appendChild(image);
            searchResult.appendChild(imageLink);
        });

        // Show more button if there are more pages
        if (data.total_pages > page) {
            page++;
            await searchImages(); // Fetch next page
        } else {
            // Reset page counter for future searches
            page = 1;
            // Clear allData array
            allData = [];
            // Hide the "show more" button
            showMoreBtn.style.display = "none";
        }

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

searchForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    // Reset page counter and allData array for new search
    page = 1;
    allData = [];
    await searchImages();
});

showMoreBtn.addEventListener("click", async () => {
    await searchImages();
});

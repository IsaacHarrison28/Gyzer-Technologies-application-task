let moviesCardContainer = document.getElementById("favorite-movies-container");

function getFavoriteMovies() {
  if (moviesCardContainer !== null) {
    moviesCardContainer.innerHTML = "";
  }
  //loading spinner
  const LoadingContainer = document.createElement("div");
  LoadingContainer.classList.add("loading");
  LoadingContainer.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
      <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
      <path d="M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z"/>
    </svg>
  `;
  if (moviesCardContainer !== null) {
    moviesCardContainer.append(LoadingContainer);
  }

  //pull data from database
  fetch("http://localhost:5000/favorite", {
    method: "GET",
  })
    .then((response) => response.json())
    .then((movies) => {
      for (let i = 0; i < movies.length; i++) {
        //card container
        const card = document.createElement("div");
        card.classList.add("card");
        //movie cover image
        const coverContainer = document.createElement("div");
        coverContainer.classList.add("image-container");
        const coverImage = document.createElement("img");
        coverImage.src = `https://www.themoviedb.org/t/p/w220_and_h330_face${movies[i].movieCoverPhoto}`;
        coverImage.alt = movies[i].movieTitle;
        coverContainer.append(coverImage);
        //movie title
        const titleContainer = document.createElement("div");
        titleContainer.classList.add("title");
        const title = document.createElement("p");
        title.id = "title";
        title.innerText = movies[i].movieTitle;
        titleContainer.append(title);
        //delete icon
        const deleteIcon = document.createElement("div");
        deleteIcon.classList.add("deleteIcon");
        deleteIcon.addEventListener("click", () => {
          deleteFavorite(movies[i]._id);
        });
        deleteIcon.innerHTML = `
            <svg id="delete" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                <path 
                    d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"
                />
            </svg>
        `;
        titleContainer.append(deleteIcon);
        //append everything to create complete card
        card.append(coverContainer);
        card.append(titleContainer);
        //add to page
        if (moviesCardContainer !== null) {
          moviesCardContainer.append(card);
        }
      }
      if (moviesCardContainer !== null) {
        moviesCardContainer.removeChild(LoadingContainer);
      }
    });
}
getFavoriteMovies();

//delete item from favorites
async function deleteFavorite(id) {
  const bodyData = {
    movieId: await id,
  };
  fetch("http://localhost:5000/favorite", {
    method: "DELETE",
    body: JSON.stringify(bodyData),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log("Successfully removed resource");
      location.reload();
      return true;
    })
    .catch((error) => {
      console.error("Error:", error);
      return false;
    });
}

export { deleteFavorite };

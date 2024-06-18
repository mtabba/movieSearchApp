const apiKey = "4aeff827ceeeb2ab2e0b87dbe7c509da";

let data = localStorage.getItem("movieClicked");
let castData;
// if(data==""){return}
if(data){
    data= JSON.parse(data)
    console.log(data.poster_path, data.title,data.vote_average,data.popularity, data.overview)
    // const castUrl = `https://api.themoviedb.org/3/movie/${data.id}/credits?api_key=${apiKey}`;
    // fetch(castUrl)
    // .then((response) => response.json())
    // .then((dataCast) => {
    //     console.log(dataCast.cast);
    //     castData = JSON.parse(dataCast.cast);
    // })
    // .catch((error)=>{
    //     console.log("error: ", error )
    // })

    appendHTML2( data.poster_path, data.title,data.vote_average,data.popularity,data.overview,castData)
}



//--------------- Clickable Movie card directed towards new html file-----------------

function appendHTML2(poster,title,rating,popularity,overview,cast){
    const appendHere = document.getElementById('pg1-newhtml-item1');
    const newDiv = document.createElement('div');
    newDiv.className="movieDetail"
    newDiv.innerHTML =  
    `
    <div class= "mainDivNewhtml">
        <div class="imgStyleNewhtml">
        <img src="https://image.tmdb.org/t/p/original${poster}" alt="">
        </div>
        <div class="movieplotNewhtml">
            <div class="titleMovie">
                <h1>${title}</h1>
            </div>
            <div class="ratingMovie">
                <h4>Rating: ${rating}</h4> 
                <h4>Popularity: ${popularity}</h4> 
            </div>
            <div class="overviewMovie">
                <h4>PLot:</h4>
                <p>${overview}</p>
            </div>
            <div id="castMovie">
                <h4>Cast:</h4>
            </div>
            <div class="backMain">
                <a href="index.html">Back to main</a>
            </div>
        </div>
    </div>
    <br>
    `;
    appendHere.append(newDiv);
  }

//   Call function of Cast_--------
getCast(data.id);

//   --------------------Cast Get Function----------------------
function getCast(movieId) {
     const castUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`;
    fetch(castUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const currentCard = document.getElementById('castMovie');
        const cast = data.cast;
        const castContainer = document.createElement("ul");

        cast.forEach((actor) => {
          const name = actor.name;
          const character = actor.character;
          const actorInfo = document.createElement("li");
          actorInfo.textContent = `${name} as=> ${character}`;
          castContainer.appendChild(actorInfo);
        });

        // Append the cast container to the card or any desired HTML element
        currentCard.appendChild(castContainer);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }

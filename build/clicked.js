const apiKey = "4aeff827ceeeb2ab2e0b87dbe7c509da";
let data = localStorage.getItem("movieClicked");
data= JSON.parse(data)
let movieId = data.id;
const castUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`;

let castData =[];

if(data){
  appendHTML2( data.poster_path, data.title,data.vote_average,data.popularity,data.overview)
  let images = document.querySelectorAll('img');
  for (let i=0; i<images.length; i++){
    replaceEmptySrc(images[i]);
  }
  fetch(castUrl)
  .then(response => response.json())
  .then(dataCast => {
      // console.log(dataCast);
      for (let i= 0; i<dataCast.cast.length; i++ ){
        appendcast(dataCast.cast[i].name,dataCast.cast[i].character );          
      }
  })
  .catch(error=>{
      console.log("error: ", error )
  })
}

// ---------------Show Hide Button----------
let x=false ;
document.getElementById("show").addEventListener("click", function() {
  const movieCastListItems = document.querySelectorAll('#movieCastName');
  for(let i=7;i<movieCastListItems.length;i++){
    x==false? movieCastListItems[i].style.display= "block" : movieCastListItems[i].style.display= "none"
  }
  x=!x;
})

//--------------- Clickable Movie card directed towards new html file-----------------

function appendHTML2(poster,title,rating,popularity,overview){
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
                <h4>Plot:</h4>
                <p>${overview}</p>
            </div>
            <div id="castMovie">
                <h4>Cast:</h4>
            </div>
            <div class="showMore">
            <button id="show">Show/Hide</button>
            </div>
            <br>
            <div class="backMain">
            <a href="index.html">Back to main</a>
            </div>
        </div>
    </div>
    <br>
    `;
    appendHere.append(newDiv);
  }


// ---------------------Movie Cast Append Html Function-----------------------

function appendcast(cast,character){
  const castdiv = document.getElementById('castMovie');
  const newDiv = document.createElement('p');
  newDiv.id="movieCastName"
  newDiv.innerHTML =  
  `
    ${cast}  as  ${character} 
  `;
  castdiv.appendChild(newDiv);
}


//--------------  Function to add null image -----------------------------
function replaceEmptySrc(image) {
  if (image.getAttribute('src') === 'https://image.tmdb.org/t/p/originalnull') {
     image.src = './assets/not-available.png';
     image.className= 'nullImage'
  }
}


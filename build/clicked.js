
let data = localStorage.getItem("movieClicked");
// if(data==""){return}
if(data){
    data= JSON.parse(data)
    console.log(data.poster_path, data.title,data.vote_average,data.popularity, data.overview)
    appendHTML2( data.poster_path, data.title,data.vote_average,data.popularity,data.overview)
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
                <p>${overview}</p>
            </div>
            <div class="castMovie">
                <h4>Cast: ${cast}</h4> 
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
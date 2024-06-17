
// ------------- Global Variables & Constants ------------------------------------
const apiKey = "4aeff827ceeeb2ab2e0b87dbe7c509da";


//------------ Search button event and fetch api function--------------------------
document.getElementById("searchBtn").addEventListener('click', function() {
  clear();
  let searchTerm = document.getElementById("mvname").value.toLowerCase();
  if(searchTerm==""){return}
  searchTerm=searchTerm.replaceAll(" ","+",)

  let data = localStorage.getItem(searchTerm);
//-------------- If available in local storage -----------------------------------
  if(data){
    console.log("Is in local storage")
    data= JSON.parse(data)
    data.length==0 ? document.getElementById("appendHere").innerHTML="No Movie Found" :document.getElementById("appendHere").innerHTML="";
    for(let i=0; i<data.length; i++){
      appendHTML1
    ( data[i].poster_path,data[i].title, data[i].release_date,i)

    }
  }
// -------------- Else Search from api ------------------------------------------------
  else{
    console.log("Not in Local Storage")
    fetch(`https://api.themoviedb.org/3/search/movie?query=${searchTerm}&api_key=${apiKey}`)
    .then(response => response.json())
    .then(data=> {
      localStorage.setItem(searchTerm, JSON.stringify(data.results))
      for(let i=0; i<data.results.length; i++){
        appendHTML1
        (data.results[i].poster_path,data.results[i].title,data.results[i].release_date,i)
      }
    })
    .catch(error => {
      console.log("error")
      document.getElementById("appendHere").innerHTML="No Movie Found"
    })
    console.log(searchTerm);
  }
});
  
// ------------------ Capturing Enter button on search ---------------------
document.getElementById("mvname").addEventListener('keydown', function(event) {
  if (event.key == "Enter") {
    clear();
      document.getElementById("searchBtn").click();
  }
});

//-------------- Function to clear the searched movie -------------------------

function clear() {
  document.getElementById("appendHere").innerHTML = "";
}

function clicked(id){
  let searchTerm = document.getElementById("mvname").value.toLowerCase();
  if(searchTerm==""){return}
  searchTerm=searchTerm.replaceAll(" ","+",)
  let data = localStorage.getItem(searchTerm);
  data= JSON.parse(data)
  localStorage.setItem('movieClicked', JSON.stringify(data[id]))
  
  window.location.href= "https://mtabba.github.io/movieSearchApp/movieCard.html"  
}

//------------- Function to pass append movie card divs ---------------------
function appendHTML1(poster,mvTitle,year,id){
  const appendHere = document.getElementById('appendHere');
  const newDiv = document.createElement('div');
  newDiv.className="movieCard"
  newDiv.innerHTML =  
  `
  <div class="imgStyle">
  <img src="https://image.tmdb.org/t/p/original${poster}" alt="" onclick="clicked(${id})">
  </div>
  <br>
  <div class="yearStyle">
  ${year}
  </div>
  <h3 class="titleStyle">
  ${mvTitle}
  </h3>
  `;
  appendHere.append(newDiv);
}


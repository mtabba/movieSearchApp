
const apiKey = "4aeff827ceeeb2ab2e0b87dbe7c509da";


document.getElementById("searchBtn").addEventListener('click', function() {
  clear();
  let searchTerm = document.getElementById("mvname").value.toLowerCase();
  if(searchTerm==""){return}
  searchTerm=searchTerm.replaceAll(" ","+",)

  let data = localStorage.getItem(searchTerm);
  if(data){
    console.log("Is in local storage")
    data= JSON.parse(data)
    data.length==0 ? document.getElementById("appendHere").innerHTML="No Movie Found" :document.getElementById("appendHere").innerHTML="";
    for(let i=0; i<data.length; i++){
      appendHTML( data[i].poster_path,data[i].title, data[i].release_date)
      // console.log(data.recordings[i].title)
    }
  }
  else{
    console.log("Not in Local Storage")
    fetch(`https://api.themoviedb.org/3/search/movie?query=${searchTerm}&api_key=${apiKey}`)
    .then(response => response.json())
    .then(data=> {
      // console.log(data.results)
      // localStorage.setItem("movieName", searchTerm)
      localStorage.setItem(searchTerm, JSON.stringify(data.results))
      for(let i=0; i<data.results.length; i++){
        appendHTML( data.results[i].poster_path,data.results[i].title,data.results[i].release_date)
        // console.log(data.recordings[i].title)
      }
    })
    .catch(error => {
      console.log("error")
      document.getElementById("appendHere").innerHTML="No Movie Found"
    })
    console.log(searchTerm);
  }
});
  
document.getElementById("mvname").addEventListener('keydown', function(event) {
  if (event.key == "Enter") {
    clear();
      document.getElementById("searchBtn").click();
  }
});

function clear() {
  document.getElementById("appendHere").innerHTML = "";
}



function appendHTML(poster,mvTitle,year){
  const appendHere = document.getElementById('appendHere');
  const newDiv = document.createElement('div');
  newDiv.className="movieCard"
  newDiv.className="movieCard"
  newDiv.innerHTML =  
  `
  <div class="imgStyle">
  <img src="https://image.tmdb.org/t/p/original${poster}" alt="">
  </div>
  <br>
  <div class="yearStyle">
  ${year}
  </div>
  <div class="titleStyle">
  ${mvTitle}
  </div>
  `;
  appendHere.append(newDiv);
}

// let movieName =""; 
// let movieQuantity = 9;


document.getElementById("searchBtn").addEventListener('click', function() {
  clear();
  let searchTerm = document.getElementById("mvname").value;
  searchTerm=searchTerm.replace(" ","+")
  console.log(searchTerm)
    fetch("https://api.themoviedb.org/3/search/movie?query="+`${searchTerm}`+ "&api_key=4aeff827ceeeb2ab2e0b87dbe7c509da")
  .then(response => response.json())
  .then(data=> {      
    // console.log(data.results) 
      for(let i=0; i<data.results.length; i++){
      appendHTML( data.results[i].poster_path,data.results[i].title)
      // console.log(data.recordings[i].title)
      }
    })
  .catch(error => console.log("error"))

  console.log(searchTerm);
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



function appendHTML(poster,mvTitle){
  const appendHere = document.getElementById('appendHere');
  const newDiv = document.createElement('div');
  newDiv.className="movieCard"
  newDiv.innerHTML =  
  `
  <div class="imgStyle">
  <img src="https://image.tmdb.org/t/p/original${poster}" alt="">
  </div>
  <br>
  <div class="titleStyle">
  Title:  ${mvTitle}
  </div>

  `;
  appendHere.append(newDiv);
}
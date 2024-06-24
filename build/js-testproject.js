
// ------------- Global Variables & Constants ------------------------------------
const apiKey = "4aeff827ceeeb2ab2e0b87dbe7c509da";
let searchTerm='';

//------------ Search button event and fetch api function--------------------------
document.getElementById("searchBtn").addEventListener('click', function() {
  clear(); // to clear input if previously searched. 
  searchTerm = document.getElementById("mvname").value.toLowerCase();
  if(searchTerm==""){return}
  searchTerm=searchTerm.replaceAll(" ","+",)
  let data = localStorage.getItem(searchTerm);
//-------------- If available in local storage -----------------------------------
  if(data){
    // console.log("Is in local storage")
    data= JSON.parse(data)
    if(data.length == 0 ){
      alert("No Movie Found");
      document.getElementById("appendHere").innerHTML="No Movie Found";
    }
    // data.length==0 ?  :document.getElementById("appendHere").innerHTML="";
    for(let i=0; i<data.length; i++){
      appendHTML1
    ( data[i].poster_path,data[i].title, data[i].release_date,i)
    }
    window.scrollTo({
    top: 580,
    behavior: "smooth",  
    })
//---------------- Replacing the Null image png if image not available -----------
    let images = document.querySelectorAll('img');
    for (let i=0; i<images.length; i++){
      replaceEmptySrc(images[i]);
    }

  }
// -------------- Else Search from api ------------------------------------------------
  else{
    // console.log("Not in Local Storage")
    fetch(`https://api.themoviedb.org/3/search/movie?query=${searchTerm}&api_key=${apiKey}`)
    .then(response => response.json())
    .then(data=> {
      localStorage.setItem(searchTerm, JSON.stringify(data.results))
      if(data.results.length != 0){
      for(let i=0; i<data.results.length; i++){
        appendHTML1
        (data.results[i].poster_path,data.results[i].title,data.results[i].release_date,i)
//------------ Replacing the Null image png if image not available ------------------------------- 
        let images = document.querySelectorAll('img');
        for (let i=0; i<images.length; i++){
          replaceEmptySrc(images[i]);
        }
      }
      // console.log(searchTerm);
      window.scrollTo({
        top: 580,
        behavior: "smooth",  
        })
      }
      else{
        alert("No Movie Found");
        document.getElementById("appendHere").innerHTML="No Movie Found"; 
      }

    })
    .catch(error => {
      console.log("error", error)
      document.getElementById("appendHere").innerHTML="No Movie Found"
    })

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
//--------------- Navigate to New Page-------------------------------- 
function clicked(id){
  let data = localStorage.getItem(searchTerm);
  data= JSON.parse(data)
  localStorage.setItem('movieClicked', JSON.stringify(data[id]))
  
  window.location.href= "movieCard.html"  
}

//------------- Function to pass append movie card divs ---------------------
function appendHTML1(poster,mvTitle,year,id){
  const appendHere = document.getElementById('appendHere');
  const newDiv = document.createElement('div');
  const formattedDate = new Date(year).toLocaleDateString()
  newDiv.className="movieCard"
  newDiv.innerHTML =  
  `
  <div class="imgStyle">
  <img src="https://image.tmdb.org/t/p/original${poster}" alt="Image Not Found"  onclick="clicked(${id})">
  </div>
  <br>
  <div class="yearStyle">
   <span>Release Date:</span> ${formattedDate}
  </div>
  <h3 class="titleStyle">
  ${mvTitle}
  </h3>
  `;
  appendHere.append(newDiv);
}

//--------------  Function to add null image -----------------------------
function replaceEmptySrc(image) {
  if (image.getAttribute('src') === 'https://image.tmdb.org/t/p/originalnull') {
     image.src = './assets/not-available.png';
     image.className= 'nullImage'
  }
}


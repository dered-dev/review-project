/**
 * JSON
 * GET, POST, PUT, PATCH, DELETE
 */

const SERVER_URL = 'https://ajaxkode.firebaseio.com'
const SERVER_URLKODERS = `${SERVER_URL}/koders.json`


// function request all methods
const request = (url, callback, method = 'GET', data = {}) => {
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      callback(JSON.parse(this.response))
      return true
    } else if (this.readyState === 4 && this.status === 404) {
      console.error(JSON.parse(this.response))
      return false
    }
  }
  xhttp.open(method, url)
  if (method !== 'GET' && method !== 'DELETE') {
    xhttp.send(JSON.stringify(data))
  } else {
    xhttp.send()
  }
}
const renderCards = () =>{
  request(SERVER_URLKODERS, buildPostCards);
  document.getElementById("closeForm").click();
}


// Function buildPostCards
const buildPostCards = (nodes, parent = 'listCards') => {
  const parentNode = document.getElementById(parent)
  var accNodes = ''
  for (item in nodes) {
    var {
      title,
      text,
      date
    } = nodes[item];
    accNodes += `
      <div class="col-12 col-md-4 p-2">
        <div class="card ">
          <img src="https://picsum.photos/600/300?random=1" class="d-block w-100" alt="...">
          <div class="card-body">
            <h5 class="card-title">${title}</h5>
            <p class="card-text">${text}</p>
            <p class="card-text">${date}</p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
          </div>
        </div>
      </div>
    `;
  }
  parentNode.innerHTML = accNodes
}

window.addEventListener("load", function(event) {
  request(SERVER_URLKODERS, buildPostCards)
});



// Add new koder
var sendFormTrigger = document.getElementById('btnAddCard')
sendFormTrigger.addEventListener('click', function(e){
  e.preventDefault()
  var title = document.getElementById('titleInput').value
  var text = document.getElementById('textInput').value
  var date = document.getElementById('dateInput').value
  var newKoder = {
    'title': title,
    'text': text,
    'date': date,
  }
  request( SERVER_URLKODERS, renderCards, "POST", newKoder)
  window.scrollTo(0,document.body.scrollHeight);
})






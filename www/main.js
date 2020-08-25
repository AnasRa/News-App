
var category = "general"
var image = "./images/noImage.png"
var author = "Unknown";
var description = "";

function changeCat(){
  category = document.getElementById('Select').value;
  console.log(category);
  var url = 'http://newsapi.org/v2/top-headlines?' +
            'country=us&category='+ category +
            '&apiKey=326dec677bb941e5a50d7ea7b995bedb';
  var req = new Request(url);

  fetch(req)
      .then(async function(response) {
        document.getElementById("articles-container").innerHTML = "";
          var articles = ((await response.json()).articles);
          for (var i = 0; i < articles.length; i++) {
              var articleElement = document.createElement('div');
              var d = new Date(articles[i].publishedAt);
              // this if checks if the image exist or not
              if(articles[i].urlToImage!=null){
                image = articles[i].urlToImage;
              }
              // this if check if the author exist or not
              if(articles[i].author!=null){
                author =articles[i].author;
              }
              // this if check if the news description exist or not
              if(articles[i].description!=null){
                description = articles[i].description;
              }
              articleElement.innerHTML = `
              <div class="card mb-3">
              <img src="${image}" class="card-img-top">
                <div class="card-body">
                  <p>
                  <a style="color:black "href="#" onclick="window.open('${articles[i].url}', '_system'); return false;">${articles[i].title}</a>
                  </p>
                    <p class="card-text">${description}</p>
                      <p> Author: ${author}</p>
                      <a  href="#" onclick="window.open('${articles[i].url}', '_system'); return false;">Read More <br> </a>
                      <p class="card-text"><small class="text-muted">Publeshed at: ${ d.getHours() + ":" + d.getMinutes()}</small></p>
                      </div>
                      </div>`;

              document.getElementById('articles-container')
                .appendChild(articleElement);
          }
          // console.log((await response.json()).articles);
          // console.log(response.json().articales);
        });
}

var ChooseCategory = document.createElement('div');
ChooseCategory.innerHTML = `
<h6>Choose Category:</h6>
 <div class="input-group">
  <select class="custom-select" id="Select" aria-label="Example select with button addon">
      <option selected value="general">General</option>
      <option value="business">Business</option>
      <option value="entertainment">Entertainment</option>
      <option value="health">Health</option>
      <option value="sports">Sports</option>
      <option value="technology">Technology</option>
    </select>
    <div class="input-group-append">
      <button class="btn btn-outline-secondary" type="Button" onmousedown="changeCat()">Submit</button>
    </div>
 </div>`;

document.getElementById('header').appendChild(ChooseCategory);

changeCat();

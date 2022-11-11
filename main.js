// Needs document key: document_key and sheet number: sheet_number

function redirect() {
  //get hash from URL
  let hash = window.location.hash.slice(1);
  console.log(hash);

  //proceed if hash is not empty, else stay on the loading page
  if (hash != "") {
    //generate Google Visualization API URL
    let url = generateDatasourceUrl(hash);
    //get the URL to redirect
    let destinationUrl = getDestinationUrl(url);
    //perform redirect
    if (destinationUrl != undefined) {
      window.location.href = destinationUrl;
    } else {
      displayError();
    }
  }
}

// generates Google Visualization API URL
function generateDatasourceUrl(hash) {
  let queryString = encodeURIComponent(`SELECT B WHERE A = '${hash}'`);
  let datasource = `https://docs.google.com/spreadsheets/d/${document_key}/gviz/tq?tqx=out:json&tq=${queryString}&gid=${sheet_number}`;
  return datasource;
}

//perform http GET on URL
function httpGetAsync(theUrl, callback) {
  let Httpreq = new XMLHttpRequest(); // a new request
  Httpreq.open("GET", theUrl, false);
  Httpreq.send(null);
  return Httpreq.responseText;
}

//get destination URL from the sheet
function getDestinationUrl(url) {
  let destinationUrl;
  try {
    let response = httpGetAsync(url);
    let response_clean = response
      .replace("/*O_o*/\ngoogle.visualization.Query.setResponse(", "")
      .replace(");", "");
    let json_object = JSON.parse(response_clean);
    console.log(json_object);
    destinationUrl = json_object["table"]["rows"]["0"]["c"]["0"]["v"];
  } catch (error) {
    displayError();
  }
  return destinationUrl;
}

// hide the loading page and display error message
// loading div id: loading
// error   div id: error
function displayError() {
  document.getElementById("loading").style.display = "none";
  document.getElementById("error").style.display = "block";
}

window.onload = redirect();

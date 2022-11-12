// Needs document key: document_key and sheet number: sheet_number

function redirect() {
  // get hash from URL, handle hash-style (#) and param-style (?)
  let hash = "";

  if (window.location.hash.length) {
    hash = window.location.hash.slice(1);
  }
  if (window.location.search) {
    hash = window.location.search.slice(1);
  }
  console.log(hash);

  // proceed if hash is not empty, else stay on the loading page
  if (!hash || !document_key) {
    displayError();
    return;
  }

  (async function fetchAndClean() {
    const destinationUrl = await fetch(generateDatasourceUrl(hash))
      .then((response) => response.text()) // the return value of a then() call is again a promise
      .then((data) => {
        let sheetsJsonClean = JSON.parse(
          data
            .replace("/*O_o*/\ngoogle.visualization.Query.setResponse(", "")
            .replace(");", "")
        );
        return sheetsJsonClean["table"]["rows"]["0"]["c"]["0"]["v"];
      })
      .catch((error) => console.log(error));

    if (!destinationUrl) {
      displayError();
      return;
    }

    console.log(destinationUrl);
    window.location.href = destinationUrl;
  })();
}

// generates Google Visualization API URL
function generateDatasourceUrl(hash) {
  let queryString = encodeURIComponent(`SELECT B WHERE A = '${hash}'`);
  // TODO: check get sheet_number, or set to 0
  let datasource = `https://docs.google.com/spreadsheets/d/${document_key}/gviz/tq?tqx=out:json&tq=${queryString}&gid=${sheet_number}`;
  return datasource;
}

// hide the loading page and display error message
// loading div id: loading
// error   div id: error
function displayError() {
  document.getElementById("loading").style.display = "none";
  document.getElementById("error").style.display = "block";
}

window.onload = redirect();

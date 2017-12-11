function test() {
  let firstName = document.getElementById('firstname').value;
  let lastName = document.getElementById('lastname').value;

  //Setting up to get the API request
  let xhr = new XMLHttpRequest();
  xhr.open("GET", "https://api.open.fec.gov/v1/candidates/search/?per_page=20&api_key=fDk8wXbxet3t4GuqnIa2I6TdlZBZnhy6GCEprEjj&sort=name&page=1&name=" + firstName + '%20' + lastName, false);
  xhr.send();
  //Setting up a variable to hold the response
  let response = xhr.response
  //parsing the response 
  let response_parsed = JSON.parse(response);

  let testOne = response_parsed.results["0"].active_through

  document.getElementById('testOne').innerHTML = testOne;

  // console.log(response_parsed);
  // console.log(response_parsed.results["0"].active_through)


};

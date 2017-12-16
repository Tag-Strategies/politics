//This file will handle the API request for the information that the user submits. 
'use strict';

//Global Variables
//This is the array that will hold the candidate info object
// let candidate_info_array = [];

/* The purpose of this function is to collect the politician data from the FEC API. 
The function will then return the data that is collected. */
function gettingPoliticianData() {

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

  // let testOne = response_parsed.results["0"].active_through
  // document.getElementById('testOne').innerHTML = testOne;

  return response_parsed
};

//This function will pull the specific data that I need from the FEC API.
function sortingPoliticianData(response_parsed){

  const candidate_info_array = [];

  //This for loop will go through the responses pulling the data that I want
  for (let i = 0; i < response_parsed.results.length; i++){
    //Creating a new object that will hold the data
    let candidateInfo = new Object();
    //Specific data that I want from the response
    let candidate_status = response_parsed.results[i].candidate_status;
    let cycles = response_parsed.results[i].cycles;
    let office_full = response_parsed.results[i].office_full;
    let party_full = response_parsed.results[i].party_full;
    let state = response_parsed.results[i].state;

    //Setting the data to the object
    candidateInfo.candidate_status = candidate_status;
    candidateInfo.cycles = cycles;
    candidateInfo.office_full = office_full;
    candidateInfo.party_full = party_full;
    candidateInfo.state = state; 

    //pushing the object into an array of objects
    candidate_info_array.push(candidateInfo);
  }

  //Returning the array
  return candidate_info_array;
}

// function buildPage (candidate_info_array) {
//   console.log(candidate_info_array);
// }

//This function is what luanches when the user his the submit button. 
function mainFunction() {

  //Calling the functions that will be used in the program
  let response_parsed = gettingPoliticianData();
  let candidate_info_array = sortingPoliticianData(response_parsed);
  console.log(candidate_info_array);
  // buildPage(candidate_info_array)


}

//This file will handle the API request for the information that the user submits. 
'use strict';

//This is a candidate object that will contain data on them 
// let candidate_info = {
//     candidate_status: '',
//     cycles: '',
//     office_full: '',
//     party_full: '',
//     state: ''
// }

let candidateInfo = new Object();

//This is the array that will hold the candidate info object
let candidate_info_array = [];


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

  return response_parsed
};

//This function will pull the specific data that I need from the FEC API.
function sortingPoliticianData(response_parsed){

  console.log(response_parsed);
  for (let i = 0; i < response_parsed.results.length; i++){

    let candidateInfo = new Object();

    candidate_status = response_parsed.results[i].candidate_status;
    cycles = response_parsed.results[i].cycles;
    office_full = response_parsed.results[i].office_full;
    party_full = response_parsed.results[i].party_full;
    state = response_parsed.results[i].state;

    candidateInfo.candidate_status = candidate_status;
    console.log('Test' + ' ' + candidateInfo.candidate_status);
    //put the data into an object
    //place that object into an array 
  }

}

//This function is what luanches when the user his the submit button. 
function mainFunction() {

  response_parsed = gettingPoliticianData();
  sortingPoliticianData(response_parsed);
  //console.log(response_parsed);

}


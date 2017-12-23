//This file will handle the API request for the information that the user submits. 
'use strict';

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

  //This displays the heading to show the user what information was found. 
  document.getElementById("info_area").style.display = 'block';

  //To do some error handling, I use this conditional statement. 
  if (response_parsed.results.length === 0){
    //Informing the user that no information was found. 
    document.getElementById('name_placement').innerHTML = "Sorry, No Results Found on " + firstName + ' ' + lastName;
  }else {
    //This long line of code uppercases and displays the name of the politician that the user entered. I wish 
    //That JS had a simpler way to uppercase the first letter like Python! 
    document.getElementById('name_placement').innerHTML = firstName.charAt(0).toUpperCase() + firstName.slice(1) + ' ' + lastName.charAt(0).toUpperCase() + lastName.slice(1);
    
    //Calling functions to sort and then display API data. 
    let candidate_info_array = sortingPoliticianData(response_parsed);
    buildPage(candidate_info_array);
  }  
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

    //The candidate status variable is in 'code' so I convert the code to an easier read format. 
    if (candidate_status == 'P') {
      candidate_status = 'Prior Candidate';
    }else if (candidate_status == 'C'){
      candidate_status = 'Present Candidate';
    }else if (candidate_status == 'F'){
      candidate_status = 'Future Candidate';
    }else if (candidate_status == 'N') {
      candidate_status = 'Not Yet a Candidate';
    }

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

function buildPage (candidate_info_array) {

  //Getting the length of the candidate_info_array
  let array_length = candidate_info_array.length;
  //This for loop will go through the candidate_info_array
  for (let i = 0; i < array_length; i++) {

    //Getting the variable to get the main container that all the data will be appended to
    let main_parent = document.getElementById('resultsArea');

    //Creating the elements where the data will go 
    let attached_div = document.createElement('div');
    let status = document.createElement('p');
    let cycle = document.createElement('p');
    let office = document.createElement('p');
    let party = document.createElement('p');
    let state = document.createElement('p');

    //Getting the content information
    let status_info = document.createTextNode("Candidate Status: " + candidate_info_array[i].candidate_status);
    let cycle_info = document.createTextNode("Cycles: " + candidate_info_array[i].cycles);
    let office_info = document.createTextNode("Office: " + candidate_info_array[i].office_full);
    let party_info = document.createTextNode("Party: " + candidate_info_array[i].party_full);
    let state_info = document.createTextNode('State: ' + candidate_info_array[i].state);

    //Attaching the information and then the node to the div container. 
    main_parent.appendChild(attached_div);

    status.appendChild(status_info);
    attached_div.appendChild(status);

    cycle.appendChild(cycle_info);
    attached_div.appendChild(cycle);

    office.appendChild(office_info);
    attached_div.appendChild(office);

    party.appendChild(party_info);
    attached_div.appendChild(party);

    state.appendChild(state_info);
    attached_div.appendChild(state);
  }
}

//This function is what luanches when the user his the submit button. 
function mainFunction() {
  //Calling the function that will be used in the program
  gettingPoliticianData();
}

//This function will clear and reset the page for the user
function clear() {
  location.reload();
}

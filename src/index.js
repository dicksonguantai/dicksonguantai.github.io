const apiKey = "GiUQ7xafsVDwD8xxf3nHSfyBhxISYsCAZbnYfxcd";
const url = "https://api.propublica.org/congress/v1/house/votes/recent.json";
const url2 = "https://api.propublica.org/congress/v1/115/senate/sessions/1/votes/17.json"
let index = 0
function fetchParliamentData(url){
fetch(url, {
  headers: {
    "X-API-Key": apiKey,
    'Accept': 'application/json'

  },
})
  .then(response => response.json())
  .then(data => {
    defaultPage(data.results.votes,index)
    dataHandler(data.results.votes)
    // console.log(data.results.votes)
    // console.log(data.results.votes[`${index}`].bill)
    // console.log(data)
})

function dataHandler(json){
const previousButton = document.getElementById("previous-button")
const nextButton = document.getElementById("next-button")
previousButton.addEventListener("click",(e)=>{
  e.preventDefault()
  if (index>=1){
    index--
    defaultPage(json,index)
  }
  else{
    index = 0
    defaultPage(json,index)
  }
  

})
nextButton.addEventListener("click",(e)=>{
  e.preventDefault()
  index++
  defaultPage(json,index)
  
  })
}

}
function fetchMemberVotes(url2){
  fetch(url2, {
    headers: {
      "X-API-Key": apiKey,
      'Accept': 'application/json'

    },
  })
    .then(response => response.json())
    .then(data => {
      populateListOfMembers(data.results.votes.vote.positions)
      console.log(data.results.votes)
      // console.log(data.results.votes[`${index}`].bill)
      // console.log(data)
  })
      
  }
  function populateListOfMembers(data){
    const votesList = document.getElementById('votes-list');
    data.forEach(vote => {
        const voteElement = document.createElement('p');
        voteElement.innerText = `${vote.name} - ${vote.party} -${vote.vote_position}`;
        votesList.appendChild(voteElement);
    });
  }

fetchMemberVotes(url2);

function defaultPage(bills,index){

   
    console.log(bills[`${index}`])
    console.log(bills[`${index}`].democratic.yes)


    billNumberField = document.getElementById("bill-number")
    billNumberField.textContent = `Bill Number : ${bills[`${index}`].bill.number}`

    billSponsorField = document.getElementById("bill-sponsor")
    billSponsorField.textContent =`Sponsor ID :${bills[`${index}`].bill.sponsor_id}`

    billTitleField = document.getElementById("bill-title")
    billTitleField.textContent = `Title : ${bills[`${index}`].bill.title} `

    billLatestAction = document.getElementById("latest-action")
    billLatestAction.textContent = `Status : ${bills[`${index}`].bill.latest_action} ${bills[`${index}`].date}`
   if ((bills[`${index}`].result) === "Passed"){
      imageOfStatus = document.getElementById("image-decision")
      imageOfStatus.src = "src/passed.jpg"
 }
   else{
  imageOfStatus.src = "src/rejected.jpg"
   }
  // var data = { "Democrats": `${bills[`${index}`].democratic.yes}`, "Democrats":`${bills[`${index}`].democratic.no}`,"Democrats":`${bills[`${index}`].democratic.not_voting}`}
  var data = {
    "Democrats": [
      `${bills[`${index}`].democratic.yes}`,
      `${bills[`${index}`].democratic.no}`,
      `${bills[`${index}`].democratic.not_voting}`
    ],
    "Republican": [
      `${bills[`${index}`].republican.yes}`,
      `${bills[`${index}`].republican.no}`,
      `${bills[`${index}`].republican.not_voting}`
    ]
  };
  
  
  var table = document.getElementById("votes-table");

  // if the table already exists, remove it
  if (table) {
    table.remove();
  }

  var table = document.createElement("table");
  table.id = "votes-table";
  table.style.border = "1px solid black";
  
  document.getElementById("votes").appendChild(table);

  
  // create table header row
  var headerRow = table.insertRow();
  headerRow.style.fontWeight = "bold";
  headerRow.style.color = "black";
  var cellParty = headerRow.insertCell();
  cellParty.innerHTML = "Party";
  cellParty.style.border = "1px solid black";
  var cellYes = headerRow.insertCell();
  cellYes.innerHTML = "Yes";
  cellYes.style.border = "1px solid black";
  var cellNo = headerRow.insertCell();
  cellNo.innerHTML = "No";
  cellNo.style.border = "1px solid black";
  var cellNotVoting = headerRow.insertCell();
  cellNotVoting.innerHTML = "Not Voting";
  cellNotVoting.style.border = "1px solid black";
  
  // create data rows
  for (let key in data) {
    index = 0
    var dataRow = table.insertRow();
    var cellPartyName = dataRow.insertCell();
    cellPartyName.innerHTML = key;
    cellPartyName.style.border = "1px solid black";
    var cellYesVotes = dataRow.insertCell();
    cellYesVotes.innerHTML = data[key][`${index}`];
    cellYesVotes.style.border = "1px solid black";
    cellYesVotes.style.color = "green";
    var cellNoVotes = dataRow.insertCell();
    cellNoVotes.innerHTML = data[key][1];
    cellNoVotes.style.border = "1px solid black";
    cellNoVotes.style.color = "green";
    var cellNotVotingVotes = dataRow.insertCell();
    cellNotVotingVotes.innerHTML = data[key][2];
    cellNotVotingVotes.style.border = "1px solid black";
    cellNotVotingVotes.style.color = "green";
  }
  
  
    
  
 }



function init(){

    fetchParliamentData(url);

}
init()








const apiKey = "GiUQ7xafsVDwD8xxf3nHSfyBhxISYsCAZbnYfxcd";
const url = "https://api.propublica.org/congress/v1/house/votes/recent.json";
const url2 = "https://api.propublica.org/congress/v1/115/senate/sessions/1/votes/17.json"

function fetchParliamentData(url){
fetch(url, {
  headers: {
    "X-API-Key": apiKey,
    'Accept': 'application/json'

  },
})
  .then(response => response.json())
  .then(data => {
    defaltPage(data.results.votes)
    // console.log(data.results.votes)
    // console.log(data.results.votes[0].bill)
    // console.log(data)
})
    


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
      
      // console.log(data.results.votes.vote.positions[0])
      // console.log(data.results.votes[0].bill)
      // console.log(data)
  })
      
  }

fetchMemberVotes(url2);

function defaltPage(bills){

   
    console.log(bills[0].democratic.yes)

    billNumberField = document.getElementById("bill-number")
    billNumberField.textContent = `Bill Number : ${bills[0].bill.number}`

    billSponsorField = document.getElementById("bill-sponsor")
    billSponsorField.textContent =`Sponsor ID :${bills[0].bill.sponsor_id}`

    billTitleField = document.getElementById("bill-title")
    billTitleField.textContent = `Title : ${bills[0].bill.title} `

    billLatestAction = document.getElementById("latest-action")
    billLatestAction.textContent = `Status : ${bills[0].bill.latest_action} ${bills[0].date}`
   if ((bills[0].result) === "Passed"){
      imageOfStatus = document.getElementById("image-decision")
      imageOfStatus.src = "src/passed.jpg"
 }
   else{
  imageOfStatus.src = "src/rejected.jpg"

  var data = { Democrats: `${bills[0].democratic.yes}`, Democrats:`${bills[0].democratic.no}`,Democrats:`${bills[0].democratic.not_voting}`}
 }
}


function init(){

    fetchParliamentData(url);
}
init()
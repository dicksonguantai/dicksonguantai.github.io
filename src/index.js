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
    defaltPage(data.results.votes[0])
    console.log(data.results.votes[0])
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
      
      console.log(data.results.votes.vote.positions[0])
      // console.log(data.results.votes[0].bill)
      // console.log(data)
  })
      
  }

fetchMemberVotes(url2);

function defaltPage(bills){

    const billtitle = document.getElementById("bill-title");
    console.log(bills)
    // billtitle.textContent = bills.bill.title
}


function init(){

    fetchParliamentData(url);
}
init()
let fetch = require('node-fetch');

let promise = fetch(
  'https://api.github.com/users/' + process.argv[2],
  {
    method: 'GET',
    headers: {
      Authorization: 'token ' + process.argv[3]
    }
  }
);

promise.then(function handleResponse(responseObj) {
  if (responseObj.status > 199 && responseObj.status < 300) {
    responseObj.json().then(function printData(data) {
      console.log('Name: ' + data.name + ', Location: ' + data.location);
    });
  } else {
    console.log ('There was a problem', responseObj.status);
  }
});




let promise2 = fetch(
  'https://api.github.com/users/' + process.argv[2] + '/repos',
  {
    method: 'GET',
    headers: {
      Authorization: 'token ' + process.argv[3]
    }
  }
);

let maxRepo = 0;
let repoWithMostStars;

promise2.then(function handleResponse(responseObj) {
  if (responseObj.status > 199 && responseObj.status < 300) {
    responseObj.json().then(function printData(repoData) {
      repoData.forEach(function findTheMostStars(repo){
        if (repo.stargazers_count > maxRepo) {
          maxRepo = repo.stargazers_count;
          repoWithMostStars = repo.name;
        }
      });
        console.log('The repo with the most stars is the', repoWithMostStars);
    });
  } else {
    console.log('There was a problem', responseObj.status);
  }
});

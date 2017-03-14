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
        let username = process.argv[2];
        let token = process.argv[3];

        let promise3 = fetch(
          'https://api.github.com/repos/' + username + '/' + repoWithMostStars + '/contributors',
          {
            method: 'GET',
            headers: {
              Authorization: 'token ' + token
            }
          }
        );

        promise3.then(function handleRepo(repoObj) {
          if (repoObj.status > 199 && repoObj.status < 300) {
            repoObj.json().then(function printData(repos) {
              repos.forEach(function printOutNames(repoContributor) {
                console.log('There are', repoContributor.contributions, 'contributors to the repo');
              });
            });
        } else {
            console.log ('There was a problem', repoObj.status);
          }
        });
    });
  } else {
    console.log('There was a problem', responseObj.status);
  }
});

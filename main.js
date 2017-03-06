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

promise2.then(function handleResponse(responseObj) {
  // console.log (responseObj.status);
  if (responseObj.status > 199 && responseObj.status < 300) {
    responseObj.json().then(function printData(repoData) {
      console.log(repoData.length);
      repoData.forEach(function printOut(repo) {
        console.log(repo.stargazers_count);
      });
    });
  } else {
    console.log('There was a problem', responseObj.status);
  }
});

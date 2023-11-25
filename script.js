var axios = require("axios");
var inquirer = require("inquirer");

function Issue(key, description) {
  this.key = key;
  this.fields = {
    description: description,
  };
}

function fetchJiraTickets(projectKey, accessToken, callback) {
  var url =
    "https://jira.deliveryhero.com/rest/api/3/search=jql=project=" + projectKey;

  axios
    .get(url, {
      headers: {
        Authorization: "Bearer " + accessToken,
        "Content-Type": "application/json",
      },
    })
    .then(function (response) {
      var issues = response.data.issues;

      if (issues && issues.length > 0) {
        issues.forEach(function (issue) {
          console.log(
            "Ticket: " +
              issue.key +
              ", Description: " +
              issue.fields.description,
          );
        });
      } else {
        console.error("no issues found.");
      }
      callback();
    })
    .catch(function (error) {
      console.error("Error: " + error);
      callback();
    });
}

function main() {
  inquirer
    .prompt([
      {
        name: "accessToken",
        message: "Please enter your access token: ",
        type: "input",
      },
      {
        name: "projectKey",
        message: "PLease enter your project key: ",
        type: "input",
      },
    ])
    .then(function (answers) {
      fetchJiraTickets(answers.projectKey, answers.access, function () {});
    });
}

main();

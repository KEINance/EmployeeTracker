const inquirer = require("inquirer");
const connection = require('./config/connection.js');

function startApp() {
    inquirer.prompt([
      {
        name: "action",
        type: "list",
        message: "What action do you want?",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a new department",
          "Add a new role",
          "Add a new employee",
          "Update employee roles",
          "Exit"
        ]
      }])
      .then(function (response) {
        switch (response.action) {
          case "View all departments":
            viewDepartments();
            break;
          case "View all roles":
            viewRoles();
            break;
          case "View all employees":
            viewEmployees();
            break;
          case "Add a new department":
            addDepartment();
            break;
          case "Add a new role":
            addRole();
            break;
          case "Add a new employee":
            addEmployee();
            break;
          case "Update employee roles":
            employeeUpdate();
            break;
          case "Exit":
            connection.end();
            break;
        }
      });
  };

function viewDepartments() {
    connection.query('SELECT * FROM department', (err, res) => {
        if (err) throw err 
        console.table(res)
        startApp()
    })
};

function viewRoles() {
    connection.query('SELECT * FROM role', (err, res) => {
        if (err) throw err 
        console.table(res)
        startApp()
    })
};

function viewEmployees() {
    connection.query('SELECT * FROM employees', (err, res) => {
        if (err) throw err 
        console.table(res)
        startApp()
    })
};

function addDepartment() {
    connection.query('SELECT * FROM department', (err, res) => {
        if (err) throw err 
        console.table(res)
        startApp()
    })
};
function addRole() {
    connection.query('SELECT * FROM role', (err, res) => {
        if (err) throw err 
        console.table(res)
        startApp()
    })
};
function addEmployee() {
    connection.query('SELECT * FROM employee', (err, res) => {
        if (err) throw err 
        console.table(res)
        startApp()
    })
};

//add upadte ability and plug into sequal query
// make prompt
function employeeUpdate() {
    //add update prompt in here
    inquirer.prompt([
        {
          name: "action",
          type: "list",
          message: "What would you like to update?",
          choices: [
            "Update employee managers",
            "Exit"
          ]
}]);
    connection.query('SELECT * FROM updated', (err, res) => {
        if (err) throw err 
        console.table(res)
        startApp()
    })
};

startApp();

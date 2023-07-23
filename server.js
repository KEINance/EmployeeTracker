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
            updateEmployee();
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
  connection.query('SELECT * FROM department') 
  inquirer.prompt([
  {
    name: "title",
    type: "input",
    message: "Please, enter department title."
  }
]
.then(function(data) {
  connection.query('INSERT INTO department SET ?', {
      department_title: answers.title
      }, function(err) {
          if (err) {
            console.log(err);
            console.log('Department not able to be added to database.')
          } else {
            addAlert("Department sucessfully added to database!");
          }
          addDepartment();
        });
    })
    .catch((err) => {
      console.log(err);
    })
  )
};

function addRole() {
  connection.query('SELECT * FROM roles') 
  inquirer.prompt([
  {
    name: "title",
    type: "input",
    message: "Please, enter new role title."
  },
  {
    name: "salary",
    type: "input",
    message: "Please, enter salary for this role."
  },
  {
    name: "department",
    type: "input",
    message: "Please, enter what department id."
  }
])
.then(function(data) {
  connection.query('INSERT INTO roles SET ?', {
      title: data.title,
      salary: data.salary,
      department_id: data.department
      }, function(err) {
          if (err) {
            console.log(err);
            console.log('Role not able to be added to database.');
          } else {
            addAlert("Role sucessfully added to database!");
          }
          addRole();
        });
    })
    .catch((err) => {
      console.log(err);
    })
};

function addEmployee() {
  connection.query('SELECT * FROM roles') 
  inquirer.prompt([
  {
    name: "firstname",
    type: "input",
    message: "Please, enter employees first name."
  },
  {
    name: "lastname",
    type: "input",
    message: "Please, enter employees last name."
  },
  {
    name: "managerTitle",
    type: "input",
    message: "Please, enter employees superior."
  },
  {
    name: "role",
    type: "choice",
    message: "Please, enter employees role.",
    choices: ['engineer', 'management', 'legal']
  },
]
.then(function(data) {
  connection.query('INSERT INTO employee SET ?', {
      first_name: data.firstname,
      last_name: data.lastname,
      manager_id: data.managerTitle,
      roles: data.role
      }, function(err) {
          if (err) {
            console.log(err);
            console.log('Employee not able to be added to database.')
          } else {
            addAlert("Employee sucessfully added to database!");
          }
          addEmployee();
        });
    })
    .catch((err) => {
      console.log(err);
    })
  )
};

function updateEmployee() {
//select employee from list
  connection.query('SELECT * FROM employees', (err, res) => {
    if (err) {
      console.log(err);
      return;
    }
// //check things show up properly
//     console.log('Employee List:');
//     for (const employee of res) {
//       console.log(`${employee.first_name} ${employee.last_name}`)

//array for choices
const employeeChoices = [];
for(const data of res) {
  employeeChoices.push(`${data.first_name} ${data.last_name}`);
}
//prompt to choose which employee to update
    inquirer.prompt ([
      {
        type: 'list',
        name: 'chooseEmployee',
        message: 'Please, choose employee for role change.',
        choices: employeeChoices
      }
    ])
    .then((answers) => {
      const employeeChoosen = res.find(employee => `${employee.first_name} ${employee.last_name}` === answers.chooseEmployee);
      const roleChoices = [];
      for(const data of res) {
        roleChoices.push(data.title);
      }
        inquirer.prompt([
          {
            type: 'list',
            name: 'chooseRole',
            message: "Please, select new role.",
            choices: roleChoices
          }
        ])
        .then((answers) => {
          const roleSelected = answers.chooseRole;
// check for proper render
// console.log(`Role Updated ${employeeChoosen.first_name} ${employeeChoosen.last_name}'s role has been effectively changed to ${roleSelected}`)
connection.query('UPDATE employees SET role_id = ? WHERE id = ?', [roleSelected.id, employeeChoosen.id], (err, res) => {
    if (err) {
      console.log(err);
    } else {      
  console.log(`${employeeChoosen.first_name} ${employeeChoosen.last_name}'s role has been effectively changed to ${roleSelected}`);
    }
  });
})
  .catch((err) => {
        console.log(err);
      })
    })
  })
}

startApp();

const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "./output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

var output = [];
var input = [];
var id = 0;
var manQues = [
  {
    type: 'input',
    name: 'name',
    message: "What's your name?",
  },
  {
    type: 'list',
    name: 'role',
    message: "What's your role?",
    choices: ['Manager'],
  },
  {
    type: 'input',
    name: 'email',
    message: "What's your email?",
  },
  {
    type: 'number',
    name: 'officeNumber',
    message: "What's your office Number?",
  },
];

var enQues = [
  {
    type: 'input',
    name: 'name',
    message: "What's your name?",
  },
  {
    type: 'list',
    name: 'role',
    message: "What's your role?",
    choices: ['engineers', 'interns'],
  },
  {
    type: 'input',
    name: 'email',
    message: "What's your email?",
  },
  {
    type: 'input',
    name: 'github',
    message: "What's your github URL?",
    when: (answers) => answers.role === 'engineers'
  },
  {
    type: 'input',
    name: 'school',
    message: "What's your schools name?",
    when: (answers) => answers.role === 'interns'
  },
  {
    type: 'confirm',
    name: 'askAgain',
    message: 'Want to enter another Worker (just hit enter for NO)?',
    default: false,
  },
];
inquirer
  .prompt(manQues)
  .then(answers => {
    // increment id
    //id = id++;  
    answers.id = id++;
    // create object here
    output.push(answers);
    //put recursion here
    //console.info('Answer1:', answers);
    
    ask();
  });

function ask() {
  
  inquirer.prompt(enQues).then((answers) => {
    // increment id  
    //id = id++;  
    answers.id = id++;
    output.push(answers);
    if (answers.askAgain) {
       
      delete answers.askAgain
      //console.log('Answer again', answers); 
      ask();
    } else {
      delete answers.askAgain  
      // create object here
      // HOW DO I CONVERT THIS OUTPUT USUNG THE CLASSES??
      ren();
    }
  });
}


// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// BELOW IS MOCK DATA, HOW DO I PASS THESE NEW INSTANCES INTO THE RENDER function
/*
var intern = new Intern("Foo", 1, "test@test.com", "school");
var engineer = new Engineer("Foo", 2, "tt@test.com", "engine");
render([intern,engineer]);
*/

function ren() {
    var renArray = [];
    var manager, intern, engineers;
    output.map((ob,i) => {
        [name,role,email, place,id] = Object.values(ob);
        if(role === "Manager"){
            
            //[name,email,id,officeNumber,role] = Object.values(ob);
            manager = new Manager(name, id, email, place);
            //console.log('managr',manager);
            renArray.push(manager);
        }
        else if(role === "interns"){
            //console.log(name);
            //[name,email,id,github] = Object.values(ob);
            intern = new Intern(name, id, email, place);
            renArray.push(intern);
        }
        else if(role === "engineers"){
            //console.log(name);
            //[name,email,id,school] = Object.values(ob);
            engineer = new Engineer(name, id, email, place);
            renArray.push(engineer);
        }
        return renArray;
    });
    
    //console.log('Answer2:', renArray);
    console.log('Answer3:', output);
    //console.log('Answer4:', x);
    //var z = new Intern(name, id, email, place);
    //console.log('Answer5:',typeof z);
    var z = render(renArray);
    console.log(z);
    if(z){
        console.log('Try', typeof z);
        renHTML(z);
    }
    
    
    
}


// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

function renHTML(z){
    console.log('Trying');
    if (!fs.existsSync(OUTPUT_DIR)){
        fs.mkdirSync(OUTPUT_DIR);
        fs.appendFile(outputPath, z, function (err) {
            if (err) throw err;
            console.log('Saved!');
        });
    }else{
        fs.appendFile(outputPath, z, function (err) {
            if (err) throw err;
            console.log('Saved!');
        });
    }
    
}

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

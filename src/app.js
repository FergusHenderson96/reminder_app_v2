require("./db/connection");
const {Order} = require ("./db/models/Order");


const figlet = require("figlet");
const inquirer = require("inquirer");
const chalk = require("chalk");

//imports functions from notes.js file
//const { addNote, listNotes, removeNote } = require("../utils/notes.js");

//first question logged when program run
const topLevelQuestion = [
  { type: "list", name: "options", message: "What would you like on your pizza?", choices: ["Add topping", "List toppings", "Remove topping", "Place Order"] }
];

//next question gives an option to add toppings on pizza (freetype)
const addQuestion = [{ type: "input", name: "add", message: "What topping would you like to add?" }];

//give an option to remove an item from the list
const removeQuestion = [
  { type: "input", name: "remove", message: "What topping would you like to remove? Please type a number" }
];

//displays text "Notes app" in blue, with isometrc font, then runs the app
const main = () => {
  console.log(chalk.blue(figlet.textSync("Notes App", { font: "isometric3" })));
  app();
};

//runs app function 
const app = async () => {
  //constant answers waits on the answer to the top level question 
  const answers = await inquirer.prompt(topLevelQuestion);
  //if the answer is add topping then question addQuestion is asked
  if (answers.options == "Add topping") {
    //now awaits answer to what topping you would like to add
    const answer = await inquirer.prompt(addQuestion);
    //once typed and entered, the answer is entered into log(answer)
    //addNote(answer.add);
    //creates new object within Order called toppings with the answer from the text
    const order = new Order({
      toppings: answer.add,
    });
    await order.save();
    //runs app function again
    app();
    //if the answer to the main question is list topping
  } else if (answers.options == "List toppings") {
    //lists items added to log (answer)
    // listNotes(); 
    //creates constant that finds all entries in the Order object
    const showOrders = await Order.find({});
    //logs the order
    console.log(showOrders);
    //runs the app function again
    app();
    //if the answer to the main question is remove topping
  } else if (answers.options == "Remove topping") {
    //lists items in log (answer) to remove
    //listNotes();
    //creates the showOrders constant again to list the Order object
    const showOrders = await Order.find({});
    console.log(showOrders);
    //waiting for answer to remove item from list
    const answer = await inquirer.prompt(removeQuestion);
    console.log(answer.remove);
    //removes answer from list
    await Order.deleteOne({toppings:`${answer.remove}`});
    // removeNote(answer.remove); <--- FROM BEFORE MONGO
    //runs app function again 
    app();
    //if answer is place order 
  } else if (answers.options == "Place Order") {
    //list order details, (listed items in log(answer))
    // listNotes();
    const showOrders = await Order.find({});
    console.log(showOrders);
    //logs message to let you know order has been placed 
    console.log("Your order has been placed");
  }
};

main();
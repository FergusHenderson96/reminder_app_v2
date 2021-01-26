const figlet = require("figlet");
const inquirer = require("inquirer");
const chalk = require("chalk");

const { addNote, listNotes, removeNote } = require("../utils/notes.js");

const topLevelQuestion = [
  { type: "list", name: "options", message: "What would you like on your pizza?", choices: ["Add topping", "List toppings", "Remove topping", "Place Order"] },
];

const addQuestion = [{ type: "input", name: "add", message: "What topping would you like to add?" }];

const removeQuestion = [
  { type: "input", name: "remove", message: "What topping would you like to remove? Please type a number" },
];

const main = () => {
  console.log(chalk.blue(figlet.textSync("Notes App", { font: "isometric3" })));
  app();
};

const app = async () => {
  const answers = await inquirer.prompt(topLevelQuestion);
  if (answers.options == "Add topping") {
    const answer = await inquirer.prompt(addQuestion);
    addNote(answer.add);

    app();
  } else if (answers.options == "List toppings") {
    listNotes();
    app();
  } else if (answers.options == "Remove topping") {
    listNotes();
    const answer = await inquirer.prompt(removeQuestion);
    removeNote(answer.remove);
    app();
  } else if (answers.options == "Place Order") {
    console.log("Your order has been placed");
  }
};

main();
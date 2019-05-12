const inquirer = require("inquirer");
const mysql = require("mysql");
const Table = require("cli-table");

let count = 0;
const columns = [
    "item_ID",
    "product_Name",
    "department_Name",
    "price",
    "stock_Quantity"
];

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "9102QycuL",
    port: "3306",
    database: "bamazon_DB"
});

connection.connect((err) => {
    if (err) throw err;
    
    console.log("Connected as id: " + connection.threadId);
})
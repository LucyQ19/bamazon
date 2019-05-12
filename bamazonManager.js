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
    if(err) throw err;
    
    console.log("Connected as id: " + connection.threadId);

    displayTable();
});

const displayTable = () => {
    let query = "SELECT * FROM products";

    connection.query(query, (err, res, fields) => {
        if(err) throw err;

        let table = new Table({
            head: [
                "item_ID",
                "product_Name",
                "department_Name",
                "price",
                "stock_Quantity"
            ],

            colWidths: [10, 65, 20, 10, 20]
        });
        
        for (let i = 0; i < res.length; i++) {
            let newArr = new Array();

             table.push(newArr);

            for (let j = 0; j < columns.length; j++) {
                newArr.push(res[i][columns[j]]);
            }
        }

        console.log(table.toString());

        managerRequest();

    });
}

const managerRequest = () => {
    inquirer.prompt ([{
        type: "rawlist",
        name: "choice",
        message: "What would you like to do?",
        choices: [ 
            "View Products for Sale",
            "View Low Inventory",
            "Add a New Product",
            "Add Quantity to Existing Item"
        ]
    }]).then((answer) => {
        switch(answer.choice) {
            case "View Products for Sale":
            displayTable();
            break;

            case "View Low Inventory":
            displayLowInvTable();
            break;

            case "Add a New Product":
            addNewProduct();
            break;

            case "Add Quantity to Existing Item":
            updateQuantity();
            break;
        }
    });
}
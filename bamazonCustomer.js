const inquirer = require("inquirer");
const mySql = require("mysql");
const Table = require("cli-table");

let resString = "";
let resJSON = "";

const columns = [
    "item_ID",
    "product_Name",
    "department_Name",
    "price",
    "stock_Quantity"
];

const connection = mySql.createConnection({
    host: "localhost",
    user: "root",
    password: "9102QycuL",
    port: "3306",
    database: "bamazon_DB"
});

connection.connect((err) => {
    if(err) throw err;

    console.log(`Connected as id: ${connection.threadId}`);

    displayTable();
});

const displayTable = () => {
    let query = "SELECT * FROM products";

    connection.query(query, (err, res, fields) => {
        if (err) throw err;

        resString = JSON.stringify(res, null, 2);

        resJSON = JSON.parse(resString);

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

        for (let i = 0; i < resJSON.length; i++) {

            let newArr = new Array();

            table.push(newArr);

            for (let j = 0; j < columns.length; j++) {
                newArr.push(resJSON[i][columns[j]]);
            }
        }

        console.log(table.toString());
        customerRequest();

    });
};

const customerRequest = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "id",
            message: "What is the ID of the product you would like to purchase?",
            validate: (value) => {
                let valid = !isNaN(parseFloat(value));
                return valid || "Please enter the item_ID!"
            }
        },
        {
            type: "input",
            name: "quantity",
            message: "How many would you like to buy?",
            validate: (value) => {
                let valid = !isNaN(parseFloat(value));
                return valid || "Please enter the quantity amount"
            }
        }
    ]).then((answer) => {
        checkQuantity(answer.id, answer.quantity);
    });
};

const checkQuantity = (id, quantity) => {

    let query = "SELECT stock_Quantity FROM products WHERE ?"
    connection.query(query, {
       
        item_ID: id,
    
    }, 
        (err, res, fields) => {
            if (err) throw err;

            let stockedJSON = JSON.stringify(res, null, 2);
            let stockedParsed = JSON.parse(stockedJSON);
            let stockedQuantity = stockedParsed[0].stock_Quantity;

            if(stockedQuantity >= quantity) {
                let query = "UPDATE products SET ? WHERE ?";

                connection.query(query, [
                    {
                        stock_Quantity: stockedQuantity - quantity
                    },
                    {
                        item_ID: id 
                    }
                ], (err, res, fields) => {

                    if(err) throw err;

                    promptBool = false;

                    displayTable();
                });
            } else {
                console.log("Insufficient quanity!!!");
            }
        }
            
    )
}
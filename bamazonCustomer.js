const inquirer = require("inquirer");
const mySql = require("mysql");
const cliTable = require("cli-table");

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

    console.log(`Connected as ID ${connection.threadID}`)

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

            colWidths: [25, 25, 25, 25, 25]
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

const customerRequest = 
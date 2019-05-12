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
    
    console.log(`Connected as id: ${connection.threadId}`);

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

const displayLowInvTable = () => {
    let lowCount = 5;
    let query = `SELECT * FROM products WHERE stock_Quantity < ${lowCount}`;

    connection.query(query, (err, res, fields) => {
        let table = new Table ({
            head: [
                "item_ID",
                "product_Name",
                "department_Name",
                "price",
                "stock_Quantity"
            ],

            colWidths: [10, 65, 20, 10, 20]
        });

        for (let i = 0; i < res.length; i ++) {
            let newArr = new Array();

            table.push(newArr);

            for (let j = 0; j < columns.length; j++) {
                newArr.push(res[i][columns[j]]);
            }
        }

        console.log(table.toString());
        managerRequest();
    })
}

const updateQuantity = () => {
    inquirer.prompt([{
        type: "input",
        name: "product",
        message: "What is the name of the product?"
    }]).then((answer) => {
        let query = "SELECT product_Name FROM products";

        let product = answer.product;

        connection.query(query, (err, res, fields) => {
            if(err) throw err;

            for (let i = 0; i < res.length; i++) {
                if (res[i].product_Name === answer.product) {

                    count++
                }
            }

            if (count > 0) {

                count = 0; 

                inquirer.prompt ([{
                    type: "input",
                    name: "quantity",
                    message: "How many would you like to add?"
                }]).then((answer) => {
                    let query = "SELECT * FROM products WHERE ?";

                    let stockQty = 0;

                    let quantity = parseInt(answer.quantity);

                    connection.query(query, [{product_Name: product}], (err, res, fields) => {
                        console.log(`
                       --------------------------------                   
                        Stock Quantity: ${stockQty}
                        Quantity: ${quantity}
                        Stock Quantity: ${product}
                        --------------------------------
                        `);

                        let query = "UPDATE products SET ? WHERE ?";
                        connection.query(query, [{stock_Quantity: stockQty + quantity}, {product_Name: product}], (err, res, fields) => {
                            if(err) throw err;

                            console.log("Quantity Added!!!");

                            displayTable();
                        });
                    });
                });
            } else {
                console.log("That items does not exist");

                updateQuantity();
            }
        });
    });
}

const addNewProduct = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "product",
            message: "What is the product name?"
        },
        {
            type: "input",
            name: "department",
            message: "What is the department name?"
        },
        {
            type: "input",
            name: "price",
            message: "How much does it cost?",
        },
        {
            type: "input",
            name: "price",
            message: "How many do you want to add?"
        }
    ]).then((answer) => {
        let product = answer.product;
        let department = answer.department;
        let price = answer.price;
        let stockQty = answer.stockQty;
        let post = {
            product_Name: product,
            department_Name: department,
            price: price,
            stock_Quantity: stockQty
        }
        let query = "INSERT INTO products SET ?";
        connection.query(query, post, (err, res, fields) => {
            if(err) throw err;

            displayTable();
        })
    })
}
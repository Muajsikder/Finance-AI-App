// =============================
// Transactions Page
// =============================


// Get token from login
const token = localStorage.getItem("token");


// Get elements
const transactionForm =
document.getElementById("transactionForm");


const transactionList =
document.getElementById("transactionList");





// =============================
// Load Transactions
// =============================

async function loadTransactions(){


    const response = await fetch(
        "/api/transactions",
        {

            headers:{

                Authorization:
                "Bearer " + token

            }

        }
    );


    const transactions =
    await response.json();



    transactionList.innerHTML = "";



    transactions.forEach(function(transaction){


        const row =
        document.createElement("tr");



        row.innerHTML = `

            <td>
                ${new Date(transaction.date)
                .toLocaleDateString()}
            </td>


            <td>
                ${transaction.category}
            </td>


            <td>
                ${transaction.description}
            </td>


            <td>
                $${transaction.amount}
            </td>


            <td>

                <button onclick="deleteTransaction('${transaction._id}')">

                    Delete

                </button>

            </td>

        `;



        transactionList.appendChild(row);


    });


}





// =============================
// Add Transaction
// =============================

transactionForm.addEventListener(
"submit",
async function(event){


    event.preventDefault();



    const category =
    document.getElementById("category").value;



    const description =
    document.getElementById("description").value;



    const amount =
    document.getElementById("amount").value;




    await fetch(
        "/api/transactions",
        {

            method:"POST",

            headers:{

                "Content-Type":"application/json",

                Authorization:
                "Bearer " + token

            },


            body:JSON.stringify({

                category,

                description,

                amount

            })

        }

    );



    // Clear form

    transactionForm.reset();



    // Reload table

    loadTransactions();


});






// =============================
// Delete Transaction
// =============================

async function deleteTransaction(id){


    await fetch(

        "/api/transactions/" + id,

        {

            method:"DELETE",

            headers:{

                Authorization:
                "Bearer " + token

            }

        }

    );


    loadTransactions();


}





// Load data when page opens

loadTransactions();






// =============================
// Logout
// =============================

const logout =
document.getElementById("logout");


logout.addEventListener(
"click",
function(event){


    event.preventDefault();


    localStorage.removeItem("token");


    window.location.href =
    "index.html";


});
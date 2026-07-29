const token =
localStorage.getItem("token");


const form =
document.getElementById("portfolioForm");


const list =
document.getElementById("portfolioList");




// Load investments

async function loadPortfolio(){


const response =
await fetch(
"/api/portfolio",
{

headers:{

Authorization:
"Bearer " + token

}

});


const data =
await response.json();



list.innerHTML="";



data.forEach(item=>{


const row =
document.createElement("tr");


row.innerHTML=`

<td>${item.asset}</td>

<td>${item.shares}</td>

<td>$${item.price}</td>

<td>
$${item.shares * item.price}
</td>


<td>

<button onclick="deleteInvestment('${item._id}')">

Delete

</button>

</td>

`;



list.appendChild(row);


});


}




// Add investment

form.addEventListener(
"submit",
async function(e){


e.preventDefault();



await fetch(
"/api/portfolio",
{

method:"POST",

headers:{

"Content-Type":"application/json",

Authorization:
"Bearer " + token

},

body:JSON.stringify({

asset:
document.getElementById("asset").value,


shares:
document.getElementById("shares").value,


price:
document.getElementById("price").value,


purchasePrice:
document.getElementById("purchasePrice").value


})

});


form.reset();


loadPortfolio();


});





// Delete

async function deleteInvestment(id){


await fetch(

"/api/portfolio/" + id,

{

method:"DELETE",

headers:{

Authorization:
"Bearer " + token

}

});


loadPortfolio();


}




loadPortfolio();
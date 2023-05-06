document.getElementById('waitersForm').addEventListener('submit', addBill);


window.addEventListener("DOMContentLoaded",()=>{
    axios.get("https://crudcrud.com/api/4e3e810d304748b9b1cc88aa388b0f2f/OrderSummary")
         .then((response)=>{
            for(let i=0;i<response.data.length;i++){
                showOrders(response.data[i])
            }
          })
         .catch((err)=>{
            console.log(err)
          })
       
})

function showOrders(ord){


    if(ord.type == "Table 1"){
        const parentNode = document.getElementById('table1');
        const childHTML = `<li id=${ord._id}> ${ord.type} ${ord.name} - ${ord.amount}
                            <button onclick="deleteOrder('${ord._id}')"> Delete </button>
                            
                        </li>`
        parentNode.innerHTML = parentNode.innerHTML + childHTML;
    }
    
    if(ord.type == "Table 2"){
        const parentNode = document.getElementById('table2');
        const childHTML = `<li id=${ord._id}> ${ord.type} ${ord.name} - ${ord.amount}
                            <button onclick="deleteOrder('${ord._id}')"> Delete </button>
                            
                        </li>`
        parentNode.innerHTML = parentNode.innerHTML + childHTML;
    }

    if(ord.type == "Table 3"){
        const parentNode = document.getElementById('table3');
        const childHTML = `<li id=${ord._id}> ${ord.type} ${ord.name} - ${ord.amount}
                            <button onclick="deleteOrder('${ord._id}', '${ord.type}')"> Delete </button>
                            
                        </li>`
        parentNode.innerHTML = parentNode.innerHTML + childHTML;
    }

    
}
function addBill(e){
    e.preventDefault();

    // get type, name, date, and amount
    let type = document.getElementById('type').value;
    let name = document.getElementById('name').value;
    let amount = document.getElementById('amount').value;

    if(type != 'chooseOne' 
        && name.length > 0 
        && amount > 0){
        const order = {
            type, 
            name, 
            amount
            
        }

        axios.post("https://crudcrud.com/api/4e3e810d304748b9b1cc88aa388b0f2f/OrderSummary",order)
             .then((response)=>{
                showOrders(order)
                console.log(response)
                })
             .catch((err)=>{
                 document.body.innerHTML=document.body.innerHTML+"<h4>Something went wrong</h4>"
                 console.log(err)
                });
        console.log(order);
        
        
    }

    
    
}



function deleteOrder(orderId, table){

    axios.delete(`https://crudcrud.com/api/4e3e810d304748b9b1cc88aa388b0f2f/OrderSummary/${orderId}`)
         .then((response)=>{
             console.log("order deleted");
             removeOrder(orderId, table)
             })
         .catch((err)=>{
             console.log(err)
             })
           
}

function removeOrder(orderId, table){
    // const parentNode = document.getElementById('Orders');

    if(table == "Table 1"){
        const parentNode = document.getElementById('table1');  
        const childNodeToBeDeleted = document.getElementById(orderId);
        parentNode.removeChild(childNodeToBeDeleted)
    }

    if(table == "Table 2"){
        const parentNode = document.getElementById('table2');  
        const childNodeToBeDeleted = document.getElementById(orderId);
        parentNode.removeChild(childNodeToBeDeleted)
    }

    if(table == "Table 3"){
        const parentNode = document.getElementById('table3');  
        const childNodeToBeDeleted = document.getElementById(orderId);
        parentNode.removeChild(childNodeToBeDeleted)
    }
    
   
}
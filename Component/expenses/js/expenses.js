// variable
const {ipcRenderer}=   require('electron')

let create = document.querySelector('#create');
let expensesDetails = document.querySelector("#expensesDetails");
let price = document.querySelector("#price");
let expensesType = document.querySelector("#expensesType");
let expensesDate = document.querySelector("#expensesDate");

let date = new Date();
let dateNow;
if(date.getMonth()+1 < 10 && date.getDate() < 10) {
    dateNow = `${date.getFullYear()}-0${date.getMonth()+1}-0${date.getDate()}`;
}else if(date.getMonth()+1 < 10 && date.getDate() > 10){
    dateNow = `${date.getFullYear()}-0${date.getMonth()+1}-${date.getDate()}`;
}else if(date.getMonth()+1 > 10 && date.getDate() < 10){
    dateNow = `${date.getFullYear()}-${date.getMonth()+1}-0${date.getDate()}`;
}else{
    dateNow = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
}

expensesDate.value =  dateNow;
let userName = document.querySelector('.userName');
let dateAndTime = document.querySelector('.dateAndTime');
userName.innerHTML = localStorage.getItem('userNameView');
dateAndTime.innerHTML =  dateNow;

let mood = 'create';
let tmp;

function showInputs1(){
    document.querySelector(".inputsSalary").style.display = "block";
    document.querySelector(".inputsexpenses").style.display = "none";
    document.querySelector(".inputsOther").style.display = "none";
}






let expenses = [];
// if(localStorage.myExpenses != null){
//     expenses = JSON.parse(localStorage.myExpenses)
// }else{
//     expenses = []
// }

function createExpenses() {
    if(expensesDate.value != '' && expensesType.value != '' && price.value != ''){
        let  newExpenses = {
            expensesDate:expensesDate.value,
            user: userName.innerHTML,
            expensesType:expensesType.value,
            price:price.value,
            expensesDetails: expensesDetails.value
        }
        if(mood == 'create'){
            expenses.push(newExpenses)
            ipcRenderer.send('newExpenses', newExpenses)
        }else{
            expenses[tmp] = newExpenses;
            let data = expenses[tmp];
            ipcRenderer.send('update-expenses', {...data,tmp})

        }
        localStorage.setItem('myExpenses',JSON.stringify(expenses))
        ipcRenderer.send('myExpenses',newExpenses)

    }
    showExpenses();
}


setTimeout(() => {
    let tableExpenses = '';
    ipcRenderer.send('get-expenses', 'bing')
    ipcRenderer.on('get-expenses',(e,args)=>{
        const myExpenses = JSON.parse(args)
        expenses.push(myExpenses)
        tableExpenses = '';
        // console.log(expenses[expenses.length-1])
        for(let i = 0; i < expenses[expenses.length-1].length; i++){
            tableExpenses += `
                <tr>
                    <td>${i+1}</td>
                    <td>${expenses[expenses.length-1][i].expensesDate}</td>
                    <td>${expenses[expenses.length-1][i].expensesType}</td>
                    <td>${expenses[expenses.length-1][i].price}</td>
                    <td>${expenses[expenses.length-1][i].expensesDetails}</td>
                    <td><button onclick="updateData('${expenses[expenses.length-1][i]._id}');">تعديل</button></td>
                    <td><button onclick="deleteData('${expenses[expenses.length-1][i]._id}');">حذف</button></td>
                </tr>
            `
        }
        document.querySelector('.tbodyExpenses').innerHTML = tableExpenses;
    })
}, 1);

function showExpenses() {
    let tableExpenses = '';
    ipcRenderer.send('get-expenses', 'bing')
    ipcRenderer.on('get-expenses',(e,args)=>{
        const myExpenses = JSON.parse(args)
        expenses.push(myExpenses)
        tableExpenses = '';
        // console.log(expenses[expenses.length-1])
        for(let i = 0; i < expenses[expenses.length-1].length; i++){
            tableExpenses += `
                <tr>
                    <td>${i+1}</td>
                    <td>${expenses[expenses.length-1][i].expensesDate}</td>
                    <td>${expenses[expenses.length-1][i].expensesType}</td>
                    <td>${expenses[expenses.length-1][i].price}</td>
                    <td>${expenses[expenses.length-1][i].expensesDetails}</td>
                    <td><button onclick="updateData('${expenses[expenses.length-1][i]._id}');">تعديل</button></td>
                    <td><button onclick="deleteData('${expenses[expenses.length-1][i]._id}');">حذف</button></td>
                </tr>
            `
        }
        document.querySelector('.tbodyExpenses').innerHTML = tableExpenses;
    })
    
    
}
showExpenses();

function searchDate(value){
    tableExpenses = '';
    for(let i = 0; i < expenses[expenses.length-1].length; i++){
        if(value == expenses[expenses.length-1][i].expensesDate){
        // console.log(expenses[expenses.length-1])
            tableExpenses += `
                <tr>
                    <td>${i+1}</td>
                    <td>${expenses[expenses.length-1][i].expensesDate}</td>
                    <td>${expenses[expenses.length-1][i].expensesType}</td>
                    <td>${expenses[expenses.length-1][i].price}</td>
                    <td>${expenses[expenses.length-1][i].expensesDetails}</td>
                    <td><button onclick="updateData('${expenses[expenses.length-1][i]._id}');">تعديل</button></td>
                    <td><button onclick="deleteData('${expenses[expenses.length-1][i]._id}');">حذف</button></td>
                </tr>
            `
        }
        document.querySelector('.tbodyExpenses').innerHTML = tableExpenses;
    }

}




function updateData(id) {
    for(let i=0;i<expenses[expenses.length-1].length;i++){
        if(id == expenses[expenses.length-1][i]._id){
            document.querySelector(".inputs").style.display = "block";
            expensesType.value = expenses[expenses.length-1][i].expensesType;
            expensesDate.value = expenses[expenses.length-1][i].expensesDate;
            price.value = expenses[expenses.length-1][i].price;
            expensesDetails.value = expenses[expenses.length-1][i].expensesDetails;
            
        
            expensesType.focus();
            scroll({
                top:0,
                behavior: "smooth",
            })
            create.innerHTML = 'تحديث';
            mood = 'update';
            tmp = id;
        
            
        }
    }
   
  
   
    
}





function deleteData(id) {
    console.log(id)
    ipcRenderer.send('delete-expenses',id)

    // expenses.splice(i,1);
    // localStorage.setItem('myExpenses',JSON.stringify(expenses));

    
    window.location.reload();
}

function refresh(){
    window.location.reload();
}

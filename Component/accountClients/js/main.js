// variable
const {ipcRenderer}=   require('electron')
let tmpEmpl;
let date = new Date();
let dateNow;

// let tmpMakeUp;
// let moodMakeUp = 'create';




if(date.getMonth()+1 < 10 && date.getDate() < 10) {
    dateNow = `${date.getFullYear()}-0${date.getMonth()+1}-0${date.getDate()}`;
}else if(date.getMonth()+1 < 10 && date.getDate() > 10){
    dateNow = `${date.getFullYear()}-0${date.getMonth()+1}-${date.getDate()}`;
}else if(date.getMonth()+1 > 10 && date.getDate() < 10){
    dateNow = `${date.getFullYear()}-${date.getMonth()+1}-0${date.getDate()}`;
}else{
    dateNow = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
}

// expensesDate.value = dateOtherExp.value = dateNow;
let userName = document.querySelector('.userName');
let dateAndTime = document.querySelector('.dateAndTime');
userName.innerHTML = localStorage.getItem('userNameView');
dateAndTime.innerHTML =  dateNow;

let mood = 'create';
let tmp;

let users;
if(localStorage.allUsers != null){
    users = JSON.parse(localStorage.allUsers);
}else{
    users = []
}

// function showInputsSalary(){
//     document.querySelector(".inputsSalary").style.display = "block";
//     document.querySelector(".inputsSuppliers").style.display = "none";

// }



function showInputsclients(){
    // document.querySelector(".inputsSalary").style.display = "none";
    document.querySelector(".inputsSuppliers").style.display = "block";

}

// suppliers

let nameSuppliers = document.querySelector('#nameSuppliers');
let idPersonalSuppliers = document.querySelector('#idPersonalSuppliers');
let phoneSuppliers = document.querySelector('#phoneSuppliers');
let typeItems = document.querySelector('#typeItems');
let numItems = document.querySelector('#numItems');
let priceItems = document.querySelector('#priceItems');
let Totalprice = document.querySelector('#Totalprice');
let paidSuppliers = document.querySelector('#paidSuppliers');
let remainSuppliers = document.querySelector('#remainSuppliers');
let moodSuppliers = 'create';
let tmpSuppliers;

let suppliers;
if(localStorage.mySuppliers != null){
    suppliers = JSON.parse(localStorage.mySuppliers)
}else{
    suppliers =[];
}
function getTotalSupp(){
    Totalprice.value = +numItems.value * +priceItems.value
}
function getPriceSuppliers(){
    remainSuppliers.value = Totalprice.value;
}
function calcRemainSuppliers(){
    remainSuppliers.value = +Totalprice.value - +paidSuppliers.value
}
let createSuppliers = document.querySelector('.createSuppliers');

createSuppliers.addEventListener('click',e =>{
    let newSuppliers = '';
    if(nameSuppliers.value != '') {
        newSuppliers = {
            user: userName.innerHTML,
            date: dateNow,
            nameSuppliers: nameSuppliers.value,
            idPersonalSuppliers: idPersonalSuppliers.value,
            phoneSuppliers: phoneSuppliers.value,
            typeItems: typeItems.value,
            Totalprice:Totalprice.value,
            paidSuppliers: paidSuppliers.value,
            remainSuppliers:remainSuppliers.value
        }
        if(moodSuppliers == 'create'){
            suppliers.push(newSuppliers);
        }else if(moodSuppliers == 'update'){
            suppliers[tmpSuppliers] = newSuppliers;
        }
        
    }
    
    
    localStorage.setItem('mySuppliers',JSON.stringify(suppliers));
    ipcRenderer.send('mySuppliers',newSuppliers)

    clearInputsSupp();
    showDetailsSuppliers();
    showTotalSuppliers();
    colorRemainSuppliers();
})

function clearInputsSupp(){
    nameSuppliers.value =
    idPersonalSuppliers.value =
    phoneSuppliers.value =
    typeItems.value =
    Totalprice.value =
    paidSuppliers.value =
    remainSuppliers.value = '';
}

function updateSuppliers(i){
    
    nameSuppliers.value = suppliers[i].nameSuppliers;
    idPersonalSuppliers.value = suppliers[i].idPersonalSuppliers;
    phoneSuppliers.value = suppliers[i].phoneSuppliers;
    typeItems.value = suppliers[i].typeItems;
    Totalprice.value = suppliers[i].Totalprice;
    paidSuppliers.value = suppliers[i].paidSuppliers;
    remainSuppliers.value =  suppliers[i].remainSuppliers;
    moodSuppliers = 'update';
    nameSuppliers.focus();
    scroll({
        top:0,
        behavior: "smooth",
    })
    document.querySelector('.createSuppliers').innerHTML = 'تحديث';
    tmpSuppliers = i;
    
    

}

function deletSuppliers(i){
    
    for(let x=0; x<users.length;x++){
        if(userName.innerHTML == users[x].user && (users[x].job == 'it' || users[x].job == 'مدير')){
        suppliers.splice(i,1);
        localStorage.setItem('mySuppliers',JSON.stringify(suppliers));
        showDetailsSuppliers();
        showTotalSuppliers();
        colorRemainSuppliers();
        }
    }
    
    
}

let tableSuppliers;

function showDetailsSuppliers(){
    tableSuppliers = '';
    for(let i=0; i<suppliers.length; i++){
        tableSuppliers += `
                <tr>
                    <td>${i+1}</td>
                    <td>${suppliers[i].date}</td>
                    <td>${suppliers[i].user}</td>
                    <td>${suppliers[i].nameSuppliers}</td>
                    <td>${suppliers[i].typeItems}</td>
                    <td>${suppliers[i].Totalprice}</td>
                    <td>${suppliers[i].paidSuppliers}</td>
                    <td class='remainSuppliers'>${suppliers[i].remainSuppliers}</td>
                    <td><button onclick="updateSuppliers(${i});">تعديل</button></td>
                    <td><button onclick="deletSuppliers(${i});">حذف</button></td>

                </tr>
                `
    }
    document.querySelector('.tbodySuppliers').innerHTML = tableSuppliers;
}
showDetailsSuppliers();
let totalPriceSuppliers = 0;
let totalPaidSuppliers = 0;
let totalRemainSuppliers = 0;

function showTotalSuppliers(){
    for(let i=0; i<suppliers.length; i++){
        totalPriceSuppliers += +suppliers[i].Totalprice;
        totalPaidSuppliers += +suppliers[i].paidSuppliers;
        totalRemainSuppliers += +suppliers[i].remainSuppliers;

        
    }
    tableSuppliers += `
    <tr>
        <td colspan='5'>الاجمالي</td>
        <td>${totalPriceSuppliers}</td>
        <td>${totalPaidSuppliers}</td>
        <td class='remainMakeUp'>${totalRemainSuppliers}</td>
        <td colspan='2'></td>
    </tr>
        `
    document.querySelector('.tbodySuppliers').innerHTML = tableSuppliers;
    totalPriceSuppliers = 0;
    totalPaidSuppliers = 0;
    totalRemainSuppliers = 0;
}
showTotalSuppliers();
function colorRemainSuppliers(){
    let textRemainSuppliers = document.querySelectorAll('.remainSuppliers');
    for(let i=0;i<textRemainSuppliers.length; i++){
        if(textRemainSuppliers[i].innerHTML < 0 ){
            textRemainSuppliers[i].style.color = 'red';
        }else if(textRemainSuppliers[i].innerHTML > 0 ){
            textRemainSuppliers[i].style.color = 'green';

        }
    }
    
}
colorRemainSuppliers();



document.querySelector('.viewSearchSuppliers').onclick = function(){
    document.querySelector('.addSuppliers').style.display = 'none';
    
    document.querySelector('.searchSuppliers').style.display = 'block';

}
document.querySelector('.viewAddSuppliers').onclick = function(){
    document.querySelector('.addSuppliers').style.display = 'block';
    document.querySelector('.searchSuppliers').style.display = 'none';

}

function printPage(){
    document.querySelector('.addSuppliers').style.display = 'none';
    document.querySelector('.searchSuppliers').style.display = 'none';
    document.querySelector('aside').style.display = 'none';
    document.querySelector('header').style.display = 'none';
    document.querySelector('.content').style.width = '100%';
    window.print();
}
let wordSearchSuppliers = document.querySelector('#wordSearchSuppliers');
function searchSuppliers(value){
    tableSuppliers = '';

    for(let i=0; i<suppliers.length; i++){
        if(value.includes(suppliers[i].nameSuppliers) || value.includes(suppliers[i].date)){
            totalPriceSuppliers += +suppliers[i].Totalprice;
            totalPaidSuppliers += +suppliers[i].paidSuppliers;
            totalRemainSuppliers += +suppliers[i].remainSuppliers;
            tableSuppliers += `
                    <tr>
                        <td>${i+1}</td>
                        <td>${suppliers[i].date}</td>
                        <td>${suppliers[i].user}</td>
                        <td>${suppliers[i].nameSuppliers}</td>
                        <td>${suppliers[i].typeItems}</td>
                        <td>${suppliers[i].Totalprice}</td>
                        <td>${suppliers[i].paidSuppliers}</td>
                        <td class='remainSuppliers'>${suppliers[i].remainSuppliers}</td>
                        <td><button onclick="updateSuppliers(${i});">تعديل</button></td>
                        <td><button onclick="deletSuppliers(${i});">حذف</button></td>

                    </tr>
                    `
                   
                    // document.querySelector('.tbodySuppliers').innerHTML = tableSuppliers;
                   
            
        }else{
            

        }
   
        
    }
    tableSuppliers += `
    <tr>
        <td colspan='5'>الاجمالي</td>
        <td>${totalPriceSuppliers}</td>
        <td>${totalPaidSuppliers}</td>
        <td class='remainMakeUp'>${totalRemainSuppliers}</td>
        <td colspan='2'></td>
    </tr>
        `
    document.querySelector('.tbodySuppliers').innerHTML = tableSuppliers;
    totalPriceSuppliers = 0;
    totalPaidSuppliers = 0;
    totalRemainSuppliers = 0;
    
}



function refresh() {
    window.location.reload();
}

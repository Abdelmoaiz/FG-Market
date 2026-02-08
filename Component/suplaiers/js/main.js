// variable
const {ipcRenderer}=   require('electron')


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

function openInputsAdd(){
    document.querySelector('.addEmployee').style.display = "block";
    document.querySelector('.inputs').style.display = "none";
}













let nameSuppliers = document.querySelector('#nameSuppliers');
let idPersonalSuppliers = document.querySelector('#idPersonalSuppliers');
let phoneSuppliers = document.querySelector('#phoneSuppliers');
let adress = document.querySelector('#adress');

let moodSuppliers = 'create';
let tmpSuppliers;

let suppliers =[];

function addSuplaierNew(){
    document.querySelector('.addSuppliers').style.display = 'block';
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
            adress : adress.value,
            barcode: '',
            title : '',
            count: '',
            paidPrice:'',
            remainPrice: '',
            priceBuy: '',
            priceSaleAll: '',
            priceSale: '',
        }
        if(mood == 'create'){
            
            ipcRenderer.send('mySuppliers',newSuppliers)
            window.location.reload();


        }else if(mood == 'update'){
            ipcRenderer.send('update-suppliers',{...newSuppliers, tmp})
            window.location.reload();

        }
        
    }
    
    
    showDetailsSuppliers();
})

function updateSuppliers(id){
    document.querySelector('.addSuppliers').style.display = 'block';

    for(let i=0; i<suppliers[suppliers.length-1].length;i++){
        if(suppliers[suppliers.length-1][i]._id == id){
            let data = suppliers[suppliers.length-1][i].mySuppliers;
            nameSuppliers.value = data.nameSuppliers;
            idPersonalSuppliers.value = data.idPersonalSuppliers;
            phoneSuppliers.value = data.phoneSuppliers;
            adress.value = data.adress;
            
            mood = 'update';
            nameSuppliers.focus();
            scroll({
                top:0,
                behavior: "smooth",
            })
            document.querySelector('.createSuppliers').innerHTML = 'تحديث البيانات';
            tmp = id;
        }
    }
   

}
let tmpIdDelete;
function deletSuppliers(id){
    if(userName.innerHTML == 'عبدالمعز'){
        document.querySelector('.alarm').style.display = 'block';
        tmpIdDelete = id;
    }else{
        for(let x=0; x<users.length;x++){
            if(userName.innerHTML == users[x].user && (users[x].job == 'it' || users[x].job == 'مدير')){
                document.querySelector('.alarm').style.display = 'block';
                tmpIdDelete = id;
            }
        }
    }
    
}
function checkPass(){
    ipcRenderer.send('delete-suppliers',tmpIdDelete)
    window.location.reload();
    showDetailsSuppliers();
}

function exitePass(){
    window.location.reload();
}


let tableSuppliers;
let totalPriceSuppliers = 0;
let totalPaidSuppliers = 0;
let totalRemainSuppliers = 0;

function showDetailsSuppliers(){
    tableSuppliers = '';
    ipcRenderer.send('get-suppliers', 'bing')
    ipcRenderer.on('get-suppliers',(e,args)=>{
        const mySuppliers = JSON.parse(args)
        suppliers.push(mySuppliers)
        tableSuppliers = '';
        mySuppliers.map(mS=>{
            
            tableSuppliers += `
            <tr>
                <td>${mS.mySuppliers.date}</td>
                <td>${mS.mySuppliers.user}</td>
                <td>${mS.mySuppliers.nameSuppliers}</td>
                <td>${mS.mySuppliers.idPersonalSuppliers}</td>
                <td>${mS.mySuppliers.phoneSuppliers}</td>
                <td>${mS.mySuppliers.adress}</td>
                <td><button onclick="updateSuppliers('${mS._id}');">تعديل</button></td>
                <td><button onclick="deletSuppliers('${mS._id}');">حذف</button></td>

            </tr>
            `
            
        })
        
        document.querySelector('.tbodySuppliers').innerHTML = tableSuppliers;

        ipcRenderer.send('get-invoiceSup', 'bing')
        ipcRenderer.on('get-invoiceSup',(e,args)=>{
        const mySuppliers = JSON.parse(args)
        supplaierInvoice.push(mySuppliers)
        })
        
    })
   
}
showDetailsSuppliers();
let mydataPro = [];
function getPurchases(){
    ipcRenderer.send('get-Data', 'bing')
    ipcRenderer.on('get-Data',(e,args)=>{
        const myData = JSON.parse(args)
        mydataPro.push(myData)
    })
}
getPurchases();
let supplaierInvoice = [];
function getSuplaierInoice(){
    ipcRenderer.send('get-invoiceSup', 'bing')
    ipcRenderer.on('get-invoiceSup',(e,args)=>{
        const mySuppliers = JSON.parse(args)
        supplaierInvoice.push(mySuppliers)
    })
}
getSuplaierInoice();
let tableDetailsSuppliers;


function detailsSuppliers(id){
    document.querySelector('.tableAllSuppliers').style.display = 'none';
    document.querySelector('.detailsSuppliers').style.display = 'block';
    showDetailsSuppliers();
    getPurchases();
    tableDetailsSuppliers = '';
    for(let i=0; i<suppliers[suppliers.length-1].length; i++){

        if(id == suppliers[suppliers.length-1][i]._id){
           
            for(let x=0; x<mydataPro[mydataPro.length-1].length; x++){
                let data = mydataPro[mydataPro.length-1];

                if(data[x].myItems.nameSuplaier == suppliers[suppliers.length-1][i].mySuppliers.nameSuppliers){
                    totalPriceSuppliers += (+data[x].myItems.count * +data[x].myItems.priceBuy);
                    totalPaidSuppliers += +data[x].myItems.paidPrice;
                    totalRemainSuppliers = +totalPriceSuppliers - +totalPaidSuppliers;
                    tableDetailsSuppliers += `
                    <tr>
                        <td>${data[x].myItems.date}</td>
                        <td>${data[x].myItems.nameSuplaier}</td>
                        <td>${data[x].myItems.title}</td>
                        <td>${+data[x].myItems.count * +data[x].myItems.priceBuy}</td>
                        <td>${data[x].myItems.paidPrice}</td>
                        <td>${data[x].myItems.remainPrice}</td>
                        
                    </tr>
                    `
        
                }
            }
        }
    }
    tableDetailsSuppliers += `
        <tr>
            <td colspan='3'>الاجمالي</td>
            <td>${totalPriceSuppliers}</td>
            <td>${totalPaidSuppliers}</td>
            <td class='remainMakeUp'>${totalRemainSuppliers}</td>
            <td colspan='3'></td>
        </tr>
            `
    document.querySelector('.tbodyDetailsSuppliers').innerHTML = tableDetailsSuppliers;
    totalPriceSuppliers = 0;
    totalPaidSuppliers = 0;
    totalRemainSuppliers = 0;

    
}

function returnBack(){
    document.querySelector('.tableAllSuppliers').style.display = 'block';
    document.querySelector('.detailsSuppliers').style.display = 'none';
}

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
    window.location.reload();
}


let wordSearchSuppliers = document.querySelector('#wordSearchSuppliers');

function searchSuppliers(value){
    document.querySelector('.tableAllSuppliers').style.display = 'none';
    document.querySelector('.detailsSuppliers').style.display = 'block';
    showDetailsSuppliers();
    getPurchases();
    if(value != ''){
        for(let i=0; i<suppliers[suppliers.length-1].length; i++){

            if(suppliers[suppliers.length-1][i].mySuppliers.nameSuppliers.includes(value)){
                tableDetailsSuppliers = '';

                for(let x=0; x<mydataPro[mydataPro.length-1].length; x++){
                    let data = mydataPro[mydataPro.length-1];
    
                    if(data[x].myItems.nameSuplaier == suppliers[suppliers.length-1][i].mySuppliers.nameSuppliers){
                        totalPriceSuppliers += (+data[x].myItems.count * +data[x].myItems.priceBuy);
                        totalPaidSuppliers += +data[x].myItems.paidPrice;
                        totalRemainSuppliers = +totalPriceSuppliers - +totalPaidSuppliers;
                        tableDetailsSuppliers += `
                        <tr>
                            <td>${data[x].myItems.date}</td>
                            <td>${data[x].myItems.nameSuplaier}</td>
                            <td>${data[x].myItems.title}</td>
                            <td>${+data[x].myItems.count * +data[x].myItems.priceBuy}</td>
                            <td>${data[x].myItems.paidPrice}</td>
                            <td>${data[x].myItems.remainPrice}</td>
                            
                        </tr>
                        `
            
                    }
                }
            }
        }
        tableDetailsSuppliers += `
            <tr>
                <td colspan='3'>الاجمالي</td>
                <td>${totalPriceSuppliers}</td>
                <td>${totalPaidSuppliers}</td>
                <td class='remainMakeUp'>${totalRemainSuppliers}</td>
                <td colspan='3'></td>
            </tr>
                `
        document.querySelector('.tbodyDetailsSuppliers').innerHTML = tableDetailsSuppliers;
        totalPriceSuppliers = 0;
        totalPaidSuppliers = 0;
        totalRemainSuppliers = 0;
    }else{
        tableDetailsSuppliers = '';
    }
    
    
        
        
        
    
    
}


function refresh(){
    window.location.reload();
}

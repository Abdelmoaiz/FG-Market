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






setTimeout(() => {
    tableSuppliers = '';
    ipcRenderer.send('get-suppliers', 'bing')
    ipcRenderer.on('get-suppliers',(e,args)=>{
        const mySuppliers = JSON.parse(args)
        suppliers.push(mySuppliers)
        tableSuppliers = '';
        for(let i=0; i<suppliers[suppliers.length-1].length; i++){
            let data = suppliers[suppliers.length-1];
            tableSuppliers += `
            <tr>
                <td>${data[i].mySuppliers[0].date}</td>
                <td>${data[i].mySuppliers[0].user}</td>
                <td>${data[i].mySuppliers[0].nameSuppliers}</td>
                <td>${data[i].mySuppliers[0].idPersonalSuppliers}</td>
                <td>${data[i].mySuppliers[0].phoneSuppliers}</td>
                <td>${data[i].mySuppliers[0].adress}</td>
                <td><button onclick="detailsSuppliers('${data[i]._id}');">عرض</button></td>
                <td><button onclick="addPrice('${data[i]._id}');">اضافة</button></td>
                <td><button onclick="updateSuppliers('${data[i]._id}');">تعديل</button></td>
                <td><button onclick="deletSuppliers('${data[i]._id}');">حذف</button></td>

            </tr>
            ` 
        }
        
        document.querySelector('.tbodySuppliers').innerHTML = tableSuppliers;
        
    })
}, 1);






let nameSuppliers = document.querySelector('#nameSuppliers');
let idPersonalSuppliers = document.querySelector('#idPersonalSuppliers');
let phoneSuppliers = document.querySelector('#phoneSuppliers');
let adress = document.querySelector('#adress');
let title = document.querySelector('#title');
let price = document.querySelector('#price');
let paidPrice = document.querySelector('#paidPrice');
let remainPrice = document.querySelector('#remainPrice');

let moodSuppliers = 'create';
let tmpSuppliers;

let suppliers =[];
let idCustomer;
function getId(){
    if(suppliers[suppliers.length-1].length != 0){
        for(let i=0; i<suppliers[suppliers.length-1].length;i++){
            for(let x=0; x<suppliers[suppliers.length-1][i].mySuppliers.length;x++){
                idCustomer = 100 + +suppliers[suppliers.length-1].length+1;
                console.log(idCustomer)
            }
        }
    }else{
        idCustomer = 101;
        console.log(idCustomer)
    }
}
function addSuplaierNew(){
    document.querySelector('.addSuppliers').style.display = 'block';
    getId();
    console.log(idCustomer)
}
let createSuppliers = document.querySelector('.createSuppliers');
let mySuppliers = [];
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
            title : title.value,
            price: price.value,
            paidPrice: paidPrice.value,
            remainPrice: remainPrice.value,
            
        }
        if(mood == 'create'){
            mySuppliers.push(newSuppliers)
            ipcRenderer.send('mySuppliers',mySuppliers,`${idCustomer}`)
            window.location.reload();


        }else if(mood == 'update'){
            mySuppliers[tmp] = newSuppliers;
            ipcRenderer.send('update-suppliers',{mySuppliers, tmpId})
            
            window.location.reload();

        }else if(mood == 'add'){
            suppliers[suppliers.length-1][tmp].mySuppliers.push(newSuppliers);
            mySuppliers = suppliers[suppliers.length-1][tmp].mySuppliers;
            
            ipcRenderer.send('update-suppliers',{mySuppliers, tmpId})
            window.location.reload();
            // console.log(tmp)
            // console.log(tmpId)

        }
        
    }
    
    
    showDetailsSuppliers();
})

let tmpId;
function addPrice(id){
    document.querySelector('.addSuppliers').style.display = 'block';
    document.querySelector('.priceOnly').style.display = 'none';
    document.querySelector('.addPriceCustomer').style.display = 'flex';

    for(let i=0; i<suppliers[suppliers.length-1].length;i++){
        for(let x=0; x<suppliers[suppliers.length-1][i].mySuppliers.length;x++){

            if(suppliers[suppliers.length-1][i]._id == id){
                let data = suppliers[suppliers.length-1][i].mySuppliers;
                
                nameSuppliers.value = data[x].nameSuppliers;
                idPersonalSuppliers.value = data[x].idPersonalSuppliers;
                phoneSuppliers.value = data[x].phoneSuppliers;
                adress.value = data[x].adress;
                
                mood = 'add';

                nameSuppliers.focus();
                scroll({
                    top:0,
                    behavior: "smooth",
                })
                document.querySelector('.createSuppliers').innerHTML = 'اضافة';
                tmpId = id;
                tmp = i;
                
            }
        }
    }

}
function updateSuppliers(id){
    document.querySelector('.addSuppliers').style.display = 'block';

    for(let i=0; i<suppliers[suppliers.length-1].length;i++){
        for(let x=0; x<suppliers[suppliers.length-1][i].mySuppliers.length;x++){

            if(suppliers[suppliers.length-1][i]._id == id){
                let data = suppliers[suppliers.length-1][i].mySuppliers;
                console.log(data)

                nameSuppliers.value = data[x].nameSuppliers;
                idPersonalSuppliers.value = data[x].idPersonalSuppliers;
                phoneSuppliers.value = data[x].phoneSuppliers;
                adress.value = data[x].adress;
                
                mood = 'update';
                console.log(mood)

                nameSuppliers.focus();
                scroll({
                    top:0,
                    behavior: "smooth",
                })
                document.querySelector('.createSuppliers').innerHTML = 'تحديث';
                tmpId = id;
                tmp = i;
            }
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
    showDetailsSuppliers()
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
        for(let i=0; i<suppliers[suppliers.length-1].length; i++){
            let data = suppliers[suppliers.length-1];
            tableSuppliers += `
            <tr>
                <td>${data[i].mySuppliers[0].date}</td>
                <td>${data[i].mySuppliers[0].user}</td>
                <td>${data[i].mySuppliers[0].nameSuppliers}</td>
                <td>${data[i].mySuppliers[0].idPersonalSuppliers}</td>
                <td>${data[i].mySuppliers[0].phoneSuppliers}</td>
                <td>${data[i].mySuppliers[0].adress}</td>
                <td><button onclick="detailsSuppliers('${data[i]._id}');">عرض</button></td>
                <td><button onclick="addPrice('${data[i]._id}');">اضافة</button></td>
                <td><button onclick="updateSuppliers('${data[i]._id}');">تعديل</button></td>
                <td><button onclick="deletSuppliers('${data[i]._id}');">حذف</button></td>

            </tr>
            ` 
        }
        
        document.querySelector('.tbodySuppliers').innerHTML = tableSuppliers;
        
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
let tableDetailsSuppliers;



function detailsSuppliers(id){
    document.querySelector('.tableAllSuppliers').style.display = 'none';
    document.querySelector('.detailsSuppliers').style.display = 'block';
    
    showDetailsSuppliers();
    getPurchases();
    tableDetailsSuppliers = '';
    for(let i=0; i<suppliers[suppliers.length-1].length;i++){
        for(let x=0; x<suppliers[suppliers.length-1][i].mySuppliers.length;x++){

            
            if(id == suppliers[suppliers.length-1][i]._id){
                let data = suppliers[suppliers.length-1];
                totalPriceSuppliers += +data[i].mySuppliers[x].price;
                totalPaidSuppliers += +data[i].mySuppliers[x].paidPrice;
                totalRemainSuppliers = +totalPriceSuppliers - +totalPaidSuppliers;
                document.querySelector('.headTable').innerHTML = `${data[i].mySuppliers[0].nameSuppliers}`

                tableDetailsSuppliers += `
                <tr>
                    <td>${data[i].mySuppliers[x].date}</td>
                    <td>${data[i].mySuppliers[0].nameSuppliers}</td>
                    <td>${data[i].mySuppliers[x].title}</td>
                    <td>${+data[i].mySuppliers[x].price}</td>
                    <td>${data[i].mySuppliers[x].paidPrice}</td>
                    <td>${+data[i].mySuppliers[x].price - +data[i].mySuppliers[x].paidPrice}</td>
                    
                </tr>
                `
        
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
    document.querySelector('.tableAllSuppliers').style.display = 'block';
    tableSuppliers = '';
    if(value != ''){
        tableSuppliers = '';
        for(let i=0; i<suppliers[suppliers.length-1].length; i++){
            let data = suppliers[suppliers.length-1];
            if(data[i].mySuppliers[0].nameSuppliers.includes(value)){
                tableSuppliers += `
                <tr>
                    <td>${data[i].mySuppliers[0].date}</td>
                    <td>${data[i].mySuppliers[0].user}</td>
                    <td>${data[i].mySuppliers[0].nameSuppliers}</td>
                    <td>${data[i].mySuppliers[0].idPersonalSuppliers}</td>
                    <td>${data[i].mySuppliers[0].phoneSuppliers}</td>
                    <td>${data[i].mySuppliers[0].adress}</td>
                    <td><button onclick="detailsSuppliers('${data[i]._id}');">عرض</button></td>
                    <td><button onclick="addPrice('${data[i]._id}');">اضافة</button></td>
                    <td><button onclick="updateSuppliers('${data[i]._id}');">تعديل</button></td>
                    <td><button onclick="deletSuppliers('${data[i]._id}');">حذف</button></td>
    
                </tr>
                `
                
            }
           
        }
        
        document.querySelector('.tbodySuppliers').innerHTML = tableSuppliers;
        
    }else{
        tableDetailsSuppliers = '';
    }
    
    
        
        
        
    
    
}


function refresh(){
    window.location.reload();
}

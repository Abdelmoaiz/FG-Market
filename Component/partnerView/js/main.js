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

let totalGainSup = 0;
let totalPrice = 0;
let total = 0;
let totalCommission = 0;
let totalNowlon = 0;
let totalFarkPrice = 0;
let totalPaid = 0;
 
let suppliers = [];
let suppliersInvoice = [];
let tablePartner;
let totalPricePartner = 0;
let totalPaidPartner = 0;
let totalRemainPartner = 0;

let totalCapital = 0;
let totalGain = 0;

let partner =[];
let invoices =[];

let optionPro;
setTimeout(() => {
    ipcRenderer.send('get-Invoice', 'bing')
    ipcRenderer.on('get-Invoice',(e,args)=>{
        const myInvoice = JSON.parse(args)
        invoices.push(myInvoice)
        totalGain = 0;
        table = '';
        optionPro = '';
        for(let i = 0; i < invoices[invoices.length-1].length; i++) {
            
            for(let x = 0; x < invoices[invoices.length-1][i].myInvoice.length; x++) {
                if(invoices[invoices.length-1][i].myInvoice[x] != ''){
                    if(invoices[invoices.length-1][i].myInvoice[x].state != 'مرتجع'){
                        totalPrice += +invoices[invoices.length-1][i].myInvoice[x].price * +invoices[invoices.length-1][i].myInvoice[x].quantityPro;
                        totalGain += (+invoices[invoices.length-1][i].myInvoice[x].price * +invoices[invoices.length-1][i].myInvoice[x].quantityPro)-(+invoices[invoices.length-1][i].myInvoice[x].priceBuy * +invoices[invoices.length-1][i].myInvoice[x].quantityPro)
                    }
                    optionPro += `
                <option>${invoices[invoices.length-1][i].myInvoice[x].state}</option>

                `;
                tmp = i;
                }
               
   
            }
            
        }
        document.querySelector('#selectSupplaier').innerHTML = optionPro;  

        

        
    })
}, 10);


let totalPaidPar = 0
function showDetailsPartner(){
    ipcRenderer.send('get-Invoice', 'bing')
    ipcRenderer.on('get-Invoice',(e,args)=>{
        const myInvoice = JSON.parse(args)
        invoices.push(myInvoice)
        totalGain = 0;
        table = '';
        optionPro = '';
        for(let i = 0; i < invoices[invoices.length-1].length; i++) {
            
            for(let x = 0; x < invoices[invoices.length-1][i].myInvoice.length; x++) {
                if(invoices[invoices.length-1][i].myInvoice[x] != ''){
                    if(invoices[invoices.length-1][i].myInvoice[x].state != 'مرتجع'){
                        totalPrice += +invoices[invoices.length-1][i].myInvoice[x].price * +invoices[invoices.length-1][i].myInvoice[x].quantityPro;
                        totalGain += (+invoices[invoices.length-1][i].myInvoice[x].price * +invoices[invoices.length-1][i].myInvoice[x].quantityPro)-(+invoices[invoices.length-1][i].myInvoice[x].priceBuy * +invoices[invoices.length-1][i].myInvoice[x].quantityPro)
                    }
                   
                }
               
   
            }
        }
        })
    tablePartner = '';
   
    ipcRenderer.send('get-Partner', 'bing')
    ipcRenderer.on('get-Partner',(e,args)=>{
        
        const myPartner = JSON.parse(args)
        partner.push(myPartner)
        
        tablePartner = '';
        for(let i=0; i<partner[partner.length-1].length; i++){
           
            let data = partner[partner.length-1];
            for(let x=0; x<data[i].myPartner.length;x++){
                totalCapital += +data[i].myPartner[x].price;
                totalPaidPar += +data[i].myPartner[x].paidPrice;

            }
            tablePartner += `
                    <tr>
                        <td>${i+1}</td>
                        <td>${data[i].myPartner[0].date}</td>
                        <td>${data[i].myPartner[0].namePartner}</td>
                        <td>${totalCapital}</td>
                        <td>${totalGain / partner[partner.length-1].length}</td>
                        <td>${totalCapital + (totalGain / partner[partner.length-1].length)}</td>
                        <td>${totalPaidPar}</td>
                        <td>${(totalCapital + (totalGain / partner[partner.length-1].length)) - totalPaidPar}</td>
                        <td><button onclick="addPrice('${data[i]._id}');">سحب</button></td>
                        <td><button onclick="detailsPartner('${data[i]._id}');">عرض</button></td>
                        
                    </tr>
                    `
                    document.querySelector('.tbodyPartner').innerHTML = tablePartner;
                    totalCapital = 0;
                    totalPaidPar = 0;
        }

        
                    
    })

    
   
}
showDetailsPartner();


setTimeout(() => {
    ipcRenderer.send('get-invoiceSup', 'bing')
    ipcRenderer.on('get-invoiceSup',(e,args)=>{
        const mySuppliers = JSON.parse(args)
        suppliers.push(mySuppliers)
        
        
    })
    tablePartner = '';
    ipcRenderer.send('get-Partner', 'bing')
    ipcRenderer.on('get-Partner',(e,args)=>{
        const myPartner = JSON.parse(args)
        partner.push(myPartner)
        tablePartner = '';

       
    })

},1)









let namePartner = document.querySelector('#namePartner');
let idPersonalPartner = document.querySelector('#idPersonalPartner');
let phonePartner = document.querySelector('#phonePartner');
let adress = document.querySelector('#adress');
let title = document.querySelector('#title');
let price = document.querySelector('#price');
let paidPrice = document.querySelector('#paidPrice');
let remainPrice = document.querySelector('#remainPrice');

let moodPartner = 'create';
let tmpPartner;

let idPartner;
function getId(){
    if(partner[partner.length-1].length != 0){
        for(let i=0; i<partner[partner.length-1].length;i++){
            for(let x=0; x<partner[partner.length-1][i].myPartner.length;x++){
                idPartner= i+1;   
            }
        }
    }else{
        idPartner = 1;
    }
}
function addPartnerNew(){
    document.querySelector('.addPartner').style.display = 'block';
    getId();
    console.log(idPartner)
}
let createPartner = document.querySelector('.createPartner');
let customer = [];
createPartner.addEventListener('click',e =>{
    let newPartner = '';
    if(namePartner.value != '') {
        newPartner = {
            idPartner: idPartner,
            user: userName.innerHTML,
            date: dateNow,
            namePartner: namePartner.value,
            idPersonalPartner: idPersonalPartner.value,
            phonePartner: phonePartner.value,
            adress : adress.value,
            title : title.value,
            price: price.value,
            paidPrice: paidPrice.value,
            remainPrice: remainPrice.value,
            
        }
        if(mood == 'create'){
            customer.push(newPartner)
            ipcRenderer.send('myPartner',customer)
            window.location.reload();


        }else if(mood == 'update'){
            ipcRenderer.send('update-Partner',{...newPartner, tmpId})
            window.location.reload();

        }else if(mood == 'add'){
            partner[partner.length-1][tmp].myPartner.push(newPartner);
            let data = partner[partner.length-1][tmp];
            ipcRenderer.send('update-Partner',{...data, tmpId})
            window.location.reload();
            console.log(tmp)
            console.log(tmpId)

        }
        
    }
    
    
    showDetailsPartner();
})

let tmpId;
function addPrice(id){
    document.querySelector('.addPartner').style.display = 'block';
    document.querySelector('.priceOnly').style.display = 'none';
    document.querySelector('.addPricePartner').style.display = 'flex';

    for(let i=0; i<partner[partner.length-1].length;i++){
        for(let x=0; x<partner[partner.length-1][i].myPartner.length;x++){

            if(partner[partner.length-1][i]._id == id){
                let data = partner[partner.length-1][i].myPartner;
                
                namePartner.value = data[x].namePartner;
                idPersonalPartner.value = data[x].idPersonalPartner;
                phonePartner.value = data[x].phonePartner;
                adress.value = data[x].adress;
                title.value = 'سحب';
                
                mood = 'add';

                paidPrice.focus();
                scroll({
                    top:0,
                    behavior: "smooth",
                })
                document.querySelector('.createPartner').innerHTML = 'اضافة';
                tmpId = id;
                tmp = i;
                
            }
        }
    }

}
function updatePartner(id){
    document.querySelector('.addPartner').style.display = 'block';

    for(let i=0; i<partner[partner.length-1].length;i++){
        for(let x=0; x<partner[partner.length-1][i].myPartner.length;x++){

            if(partner[partner.length-1][i]._id == id){
                let data = partner[partner.length-1][i].myPartner;
                console.log(data)

                namePartner.value = data[x].namePartner;
                idPersonalPartner.value = data[x].idPersonalPartner;
                phonePartner.value = data[x].phonePartner;
                adress.value = data[x].adress;
                
                mood = 'update';
                console.log(mood)

                namePartner.focus();
                scroll({
                    top:0,
                    behavior: "smooth",
                })
                document.querySelector('.createPartner').innerHTML = 'تحديث';
                tmpId = id;
                tmp = i;
            }
        }
    }
   

}
let tmpIdDelete;
function deletPartner(id){
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
    ipcRenderer.send('delete-Partner',tmpIdDelete)
    window.location.reload();
    // showDetailsPartner()
}

function exitePass(){
    window.location.reload();
}



let z;

let mydataPro = [];
function getPurchases(){
    ipcRenderer.send('get-Data', 'bing')
    ipcRenderer.on('get-Data',(e,args)=>{
        const myData = JSON.parse(args)
        mydataPro.push(myData)
    })
}
getPurchases();
let tableDetailsPartner;



function detailsPartner(id){
    document.querySelector('.tableAllPartner').style.display = 'none';
    document.querySelector('.detailsPartner').style.display = 'block';
    
    showDetailsPartner();
    getPurchases();
    tableDetailsPartner = '';
    for(let i=0; i<partner[partner.length-1].length;i++){
        for(let x=0; x<partner[partner.length-1][i].myPartner.length;x++){

            
            if(id == partner[partner.length-1][i]._id){
                let data = partner[partner.length-1];
                totalPricePartner += +data[i].myPartner[x].price;
                totalPaidPartner += +data[i].myPartner[x].paidPrice;
                totalRemainPartner = +totalPricePartner - +totalPaidPartner;
                document.querySelector('.headTable').innerHTML = `${data[i].myPartner[0].namePartner}`

                tableDetailsPartner += `
                <tr>
                    <td>${data[i].myPartner[x].date}</td>
                    <td>${data[i].myPartner[0].namePartner}</td>
                    <td>${data[i].myPartner[x].title}</td>
                    <td>${+data[i].myPartner[x].price}</td>
                    <td>${data[i].myPartner[x].paidPrice}</td>
                    <td>${+data[i].myPartner[x].price - +data[i].myPartner[x].paidPrice}</td>
                    
                </tr>
                `
        
                }
            }
            
        
    }
    tableDetailsPartner += `
        <tr>
            <td colspan='3'>الاجمالي</td>
            <td>${totalPricePartner}</td>
            <td>${totalPaidPartner}</td>
            <td class='remainMakeUp'>${totalRemainPartner}</td>
            <td colspan='3'></td>
        </tr>
            `
    document.querySelector('.tbodyDetailsPartner').innerHTML = tableDetailsPartner;
    totalPricePartner = 0;
    totalPaidPartner = 0;
    totalRemainPartner = 0;

    
}

function returnBack(){
    document.querySelector('.tableAllPartner').style.display = 'block';
    document.querySelector('.detailsPartner').style.display = 'none';
}

function colorRemainPartner(){
    let textRemainPartner = document.querySelectorAll('.remainPartner');
    for(let i=0;i<textRemainPartner.length; i++){
        if(textRemainPartner[i].innerHTML < 0 ){
            textRemainPartner[i].style.color = 'red';
        }else if(textRemainPartner[i].innerHTML > 0 ){
            textRemainPartner[i].style.color = 'green';

        }
    }
    
}
colorRemainPartner();



document.querySelector('.viewSearchPartner').onclick = function(){
    document.querySelector('.addSuppliers').style.display = 'none';
    
    document.querySelector('.searchSuppliers').style.display = 'block';

}
document.querySelector('.viewAddPartner').onclick = function(){
    document.querySelector('.addPartner').style.display = 'block';
    document.querySelector('.searchPartner').style.display = 'none';

}

function printPage(){
    document.querySelector('.addPartner').style.display = 'none';
    document.querySelector('.searchPartner').style.display = 'none';
    document.querySelector('aside').style.display = 'none';
    document.querySelector('header').style.display = 'none';
    document.querySelector('.content').style.width = '100%';
    window.print();
    window.location.reload();
}


let wordSearchSuppliers = document.querySelector('#wordSearchPartner');

// function searchSuppliers(value){
//     document.querySelector('.tableAllPartner').style.display = 'none';
//     document.querySelector('.tableAllPartner').style.display = 'block';
//     tablePartner = '';
//     if(value != ''){
//         tablePartner = '';
//         for(let i=0; i<partner[partner.length-1].length; i++){
//             let data = partner[partner.length-1];
//             if(data[i].myPartner[0].namePartner.includes(value)){
//                 tablePartner += `
//                 <tr>
//                     <td>${data[i].myPartner[0].date}</td>
//                     <td>${data[i].myPartner[0].user}</td>
//                     <td>${data[i].myPartner[0].namePartner}</td>
//                     <td>${data[i].myPartner[0].idPersonalPartner}</td>
//                     <td>${data[i].myPartner[0].phonePartner}</td>
//                     <td>${data[i].myPartner[0].adress}</td>
//                     <td><button onclick="detailsPartner('${data[i]._id}');">عرض</button></td>
//                     <td><button onclick="addPrice('${data[i]._id}');">اضافة</button></td>
//                     <td><button onclick="updatePartner('${data[i]._id}');">تعديل</button></td>
//                     <td><button onclick="deletPartner('${data[i]._id}');">حذف</button></td>
    
//                 </tr>
//                 `
                
//             }
           
//         }
        
//         document.querySelector('.tbodyPartner').innerHTML = tablePartner;
        
//     }else{
//         tableDetailsPartner = '';
//     }
    
    
        
        
        
    
    
// }


function refresh(){
    window.location.reload();
}

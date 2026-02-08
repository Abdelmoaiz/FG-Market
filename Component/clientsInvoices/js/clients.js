const {ipcRenderer}=   require('electron')


let nameClient,dateInvoicePrint,adressInvoice,phoneInvoice,numInvoicePri,totalInvoicePrint;
nameClient = document.querySelector('.nameClient');
dateInvoicePrint = document.querySelector('.dateInvoicePrint');
adressInvoice = document.querySelector('.adress');
phoneInvoice = document.querySelector('.phone');
numInvoicePri = document.querySelector('.numInvoicePri');
totalInvoicePrint = document.querySelector('.totalInvoicePrint');

let tmpI,tmpX,tmpZ,tmpId;


let date = new Date();
let dateNow;

let invoices = [];
let searchStart,searchEnd;

let sales;
if(localStorage.mySales != null) {
    sales = JSON.parse(localStorage.mySales)
}else{
    sales = [];
}



if(date.getMonth()+1 < 10 && date.getDate() < 10) {
    dateNow = `${date.getFullYear()}-0${date.getMonth()+1}-0${date.getDate()}`;
}else if(date.getMonth()+1 < 10 && date.getDate() > 10){
    dateNow = `${date.getFullYear()}-0${date.getMonth()+1}-${date.getDate()}`;
}else if(date.getMonth()+1 > 10 && date.getDate() < 10){
    dateNow = `${date.getFullYear()}-${date.getMonth()+1}-0${date.getDate()}`;
}else{
    dateNow = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
}


setTimeout(() => {
    getAllInvoice();
}, 1);
// created

let totAll = 0;
let totPa = 0;
let totRem = 0;
let namInvoice = document.querySelector('#namInvoice');
let tmpPayX;
function payMoney(i,x,z){
    if(totalAll > 0){
        

        document.querySelector(".inputs").style.display = "block";
        document.querySelector('#namInvoice').value = invoices[invoices.length-1][i].mySuppliers.nameSuppliers;
        document.querySelector('#barcodePersonal').value = invoices[invoices.length-1][i].mySuppliers.idPersonalSuppliers;
        document.querySelector('#numInvoice').value = invoices[invoices.length-1][i].mySuppliers.adress;
        tmpI = i;
        moodSales = '';
        tmpId = invoices[invoices.length-1][i]._id;
        paid.focus();
        tmpPayX = x;
    }
     
}
function calcRemain(value){

    
        // tmpX = x;
    
    // let total = +invoices[invoices.length-1][tmpI].myClientInvoice[tmpX].remain
    remain.value = +totalAll - +value
}


let addNewInvoice = document.querySelector('#addNewInvoice');
let namePay = document.querySelector('#namePay');
let newClient;
let moodSales;
addNewInvoice.addEventListener("click", (e) =>{
    e.preventDefault();

    
            if(namInvoice.value != ''){
                newClient = {
                    namInvoice: invoices[invoices.length-1][tmpI].mySuppliers.nameSuppliers,
                    numInvoice: '',
                    date: dateNow,
                    titlePro: '',
                    price: 0,
                    quantityPro:  0,
                    paid: +paid.value,
                    remain: +remain.value,
                    state:'دفع نقدي',
                    typeSales: "اجل",
                    idItems : invoices[invoices.length-1][tmpI]._id,
                    moodSales : moodSales,

            
                }
            }
        
    if(remain.value >= 0){
        console.log(invoices[invoices.length-1][tmpI].mySuppliers.invoice)
        invoices[invoices.length-1][tmpI].mySuppliers.invoice[tmpPayX].push(newClient)
        let data = invoices[invoices.length-1][tmpI]
        ipcRenderer.send('update-invoice', {...data,tmpId})
        getAllInvoice();
    }else{
        
        

    }
    
    
    
    refresh();
})

let search = document.querySelector('#search');
search.value = dateNow; 
let table;

let totalPrice = 0;
let totalPaid = 0;
let totalMonthlyPrice = 0;
let totalRemain = 0;
let option;


function viewSearch(){
    document.querySelector('.inputSearch').style.display = 'block';
}



//show clients
let total = 0;
function getAllInvoice(){
    ipcRenderer.send('get-Customer', 'bing')
    ipcRenderer.on('get-Customer',(e,args)=>{
        const myInvoice = JSON.parse(args)
        invoices.push(myInvoice)
        table = '';
        option = '';
        option += `
                <option>اختر العميل</option>
            `
        for(let i = 0; i < invoices[invoices.length-1].length; i++) {
            if(invoices[invoices.length-1][i].mySuppliers != ''){
                option += `
                <option>${invoices[invoices.length-1][i].mySuppliers.nameSuppliers}</option>
            `           
            if(invoices[invoices.length-1][i].mySuppliers.state != 'مرتجع'){

                    table += `
                    <tr>
                        <td>${i+1}</td>
                        <td>${invoices[invoices.length-1][i].mySuppliers.nameSuppliers}</td>
                        <td><button onclick="showDetails(${i});">عرض</button></td>
                        
                    </tr>
                    `;
                }
            }
            
            
                
            }
            
       
            document.querySelector('.tbodyClients').innerHTML = table;
            document.querySelector('#selectClient').innerHTML = option;
            
                
               
            
            
        
        
    })
}
getAllInvoice();
let tmpx;
let tmpz;
// show details
let totalAll;
let totalPriceMonthely = 0;
let tableDetails;
function showDetails(i){
    tableDetails = '';

    // tmpZ = i;
    document.querySelector('#viewClient').style.display = 'none';
    document.querySelector('#details').style.display = 'block';
    for(let x=0; x < invoices[invoices.length-1][i].mySuppliers.invoice.length; x++){
        for(let z=0; z < invoices[invoices.length-1][i].mySuppliers.invoice[x].length; z++){
            if(invoices[invoices.length-1][i].mySuppliers.invoice != ''){

                if(invoices[invoices.length-1][i].mySuppliers.invoice[x][z].state != 'مرتجع'){
    
                    totalPrice += +invoices[invoices.length-1][i].mySuppliers.invoice[x][z].price * invoices[invoices.length-1][i].mySuppliers.invoice[x][z].quantityPro;
                    totalPaid += +invoices[invoices.length-1][i].mySuppliers.invoice[x][z].paid;
                    totalRemain = +totalPrice - +totalPaid;
                    totalAll = totalRemain;
                }
                
            }
            if(invoices[invoices.length-1][i].mySuppliers[x] != ''){
                tableDetails += `
                <tr>
                    <td>${x+1}</td>
                    <td>${invoices[invoices.length-1][i].mySuppliers.invoice[x][z].date}</td>
                    <td>${invoices[invoices.length-1][i].mySuppliers.invoice[x][z].numInvoice}</td>
                    <td>${invoices[invoices.length-1][i].mySuppliers.invoice[x][z].namInvoice}</td>
                    <td>${invoices[invoices.length-1][i].mySuppliers.invoice[x][z].titlePro}</td>
                    <td>${invoices[invoices.length-1][i].mySuppliers.invoice[x][z].state}</td>
                    <td>${invoices[invoices.length-1][i].mySuppliers.invoice[x][z].moodSales}</td>
                    <td>${invoices[invoices.length-1][i].mySuppliers.invoice[x][z].quantityPro}</td>
                    <td>${invoices[invoices.length-1][i].mySuppliers.invoice[x][z].price}</td>
                    <td>${invoices[invoices.length-1][i].mySuppliers.invoice[x][z].price * invoices[invoices.length-1][i].mySuppliers.invoice[x][z].quantityPro}</td>
                    <td>${invoices[invoices.length-1][i].mySuppliers.invoice[x][z].paid}</td>
                    <td>${invoices[invoices.length-1][i].mySuppliers.invoice[x][z].remain}</td>
                </tr>
                `;
                tmpx = x;
                tmpz = z;
            }
        }
           
       
            
        
    }
    
    tableDetails += `
        <tr>
            <td colspan='9'>الاجمالي</td>
            <td>${totalPrice}</td>
            <td>${totalPaid}</td>
            <td>${totalRemain}</td>
            <td><button onclick="payMoney(${i},${tmpx},${tmpz});">ادفع</button></td>

            
        </tr>
        `;     
        document.querySelector('.tbodyDetails').innerHTML = tableDetails;
        totalPrice = 0
        totalPaid = 0;
        totalMonthlyPrice = 0;
        totalRemain = 0; 
        totalPriceMonthely = 0;
}
let totalNotCash = 0;
function detailsClient() {
    tableDetails = '';
    // tmpZ = i;
    let tmX;
    document.querySelector('.stateDate').innerHTML = 'تاريخ اخر قسط';
    document.querySelector('.datePaid').innerHTML = 'ميعاد القسط';
    document.querySelector('.pricePaid').innerHTML = 'مبلغ اخر قسط';
    document.querySelector('#viewClient').style.display = 'none';
    document.querySelector('#details').style.display = 'block';

    for(let i=0; i < invoices[invoices.length-1].length; i++){
        tmpDet = i;
        for(let x=0; x < invoices[invoices.length-1][i].mySuppliers.invoice.length; x++){
            tmX = x
            if(invoices[invoices.length-1][i] != ''){
                
                if(invoices[invoices.length-1][i].mySuppliers.invoice.state != 'مرتجع'){
                    totalPrice += +invoices[invoices.length-1][i].mySuppliers.invoice[x].price * invoices[invoices.length-1][i].mySuppliers.invoice[x].quantityPro;
                    totalPaid += +invoices[invoices.length-1][i].mySuppliers.invoice[x].paid;
                    totalRemain = +totalPrice - +totalPaid;
                    totalAll = totalRemain;
                
            
                
                } 
                  
            }
            
           
       
        }
        if(totalRemain > 0){
            tableDetails += `
            <tr>
                <td>${i+1}</td>
                <td>${invoices[invoices.length-1][i].mySuppliers.invoice[0].date}</td>
                <td>${invoices[invoices.length-1][i].mySuppliers.invoice[0].numInvoice}</td>
                <td>${invoices[invoices.length-1][i].mySuppliers.invoice[0].namInvoice}</td>
                <td>${invoices[invoices.length-1][i].myClientInvoice[tmX].date}</td>
                <td>${invoices[invoices.length-1][i].myClientInvoice[tmX].paid}</td>
                <td>${totalPrice}</td>
                <td>${totalPaid}</td>
                <td>${totalRemain}</td>
    
                
            </tr>
            `; 
            console.log(invoices[invoices.length-1][i].mySuppliers.invoice[0].date)
            document.querySelector('.tbodyDetails').innerHTML = tableDetails;
            totalPrice = 0
            totalPaid = 0;
            totalMonthlyPrice = 0;
            totalNotCash = 0;
        }
       
        
    }
    
    
     
        document.querySelector('.tbodyDetails').innerHTML = tableDetails;
        totalPrice = 0
        totalPaid = 0;
        totalMonthlyPrice = 0;
        totalNotCash = 0;
}

// search
let tmp;
function searchDate(value){
    
    document.querySelector('#viewClient').style.display = 'none';
    document.querySelector('#details').style.display = 'block';
    totalPrice = 0
    totalPaid = 0;
    totalMonthlyPrice = 0;
    totalRemain = 0; 
    tableDetails = '';
    for(let i = 0; i < invoices[invoices.length-1].length; i++) {
        for(let x=0; x < invoices[invoices.length-1][i].mySuppliers.invoice.length; x++){            
  
            
            for(let z=0; z < invoices[invoices.length-1][i].mySuppliers.invoice[x].length; z++){
                if(value == invoices[invoices.length-1][i].mySuppliers.invoice[x][z].date){
                    if(invoices[invoices.length-1][i].mySuppliers.invoice != ''){
        
                        if(invoices[invoices.length-1][i].mySuppliers.invoice[x][z].state != 'مرتجع'){
            
                            totalPrice += +invoices[invoices.length-1][i].mySuppliers.invoice[x][z].price * invoices[invoices.length-1][i].mySuppliers.invoice[x][z].quantityPro;
                            totalPaid += +invoices[invoices.length-1][i].mySuppliers.invoice[x][z].paid;
                            totalRemain = +totalPrice - +totalPaid;
                            totalAll = totalRemain;
                        }
                        
                    }
                    if(invoices[invoices.length-1][i].mySuppliers[x] != ''){
                        tableDetails += `
                        <tr>
                            <td>${x+1}</td>
                            <td>${invoices[invoices.length-1][i].mySuppliers.invoice[x][z].date}</td>
                            <td>${invoices[invoices.length-1][i].mySuppliers.invoice[x][z].numInvoice}</td>
                            <td>${invoices[invoices.length-1][i].mySuppliers.invoice[x][z].namInvoice}</td>
                            <td>${invoices[invoices.length-1][i].mySuppliers.invoice[x][z].titlePro}</td>
                            <td>${invoices[invoices.length-1][i].mySuppliers.invoice[x][z].state}</td>
                            <td>${invoices[invoices.length-1][i].mySuppliers.invoice[x][z].moodSales}</td>
                            <td>${invoices[invoices.length-1][i].mySuppliers.invoice[x][z].quantityPro}</td>
                            <td>${invoices[invoices.length-1][i].mySuppliers.invoice[x][z].price}</td>
                            <td>${invoices[invoices.length-1][i].mySuppliers.invoice[x][z].price * invoices[invoices.length-1][i].mySuppliers.invoice[x][z].quantityPro}</td>
                            <td>${invoices[invoices.length-1][i].mySuppliers.invoice[x][z].paid}</td>
                            <td>${invoices[invoices.length-1][i].mySuppliers.invoice[x][z].remain}</td>
                        </tr>
                        `;
                        tmpx = x;
                        tmpz = z;
                    }
                }
            }
               
            
            
        }
        
   
        document.querySelector('.tbodyDetails').innerHTML = tableDetails;
        document.querySelector('#selectClient').innerHTML = option;
        
            
           
        
        
    }
    tableDetails += `
    <tr>
        <td colspan='9'>الاجمالي</td>
        <td>${totalPrice}</td>
        <td>${totalPaid}</td>
        <td>${totalRemain}</td>

        
    </tr>
    `;        
    document.querySelector('.tbodyDetails').innerHTML = tableDetails;
    totalPrice = 0
    totalPaid = 0;
    totalMonthlyPrice = 0;
    totalRemain = 0; 
}


function getNameClient(value){
    let y;
    document.querySelector('#viewClient').style.display = 'none';
    document.querySelector('#details').style.display = 'block';
    totalPrice = 0
    totalPaid = 0;
    totalMonthlyPrice = 0;
    totalRemain = 0; 
    tableDetails = '';
    for(let i = 0; i < invoices[invoices.length-1].length; i++) {

        for(let x=0; x < invoices[invoices.length-1][i].mySuppliers.invoice.length; x++){
           
                
               
                for(let z=0; z < invoices[invoices.length-1][i].mySuppliers.invoice[x].length; z++){
                    if(value == invoices[invoices.length-1][i].mySuppliers.invoice[x][z].namInvoice){
                        if(invoices[invoices.length-1][i].mySuppliers.invoice != ''){
            
                            if(invoices[invoices.length-1][i].mySuppliers.invoice[x][z].state != 'مرتجع'){
                
                                totalPrice += +invoices[invoices.length-1][i].mySuppliers.invoice[x][z].price * invoices[invoices.length-1][i].mySuppliers.invoice[x][z].quantityPro;
                                totalPaid += +invoices[invoices.length-1][i].mySuppliers.invoice[x][z].paid;
                                totalRemain = +totalPrice - +totalPaid;
                                totalAll = totalRemain;
                            }
                            
                        }
                        if(invoices[invoices.length-1][i].mySuppliers[x] != ''){
                            tableDetails += `
                            <tr>
                                <td>${x+1}</td>
                                <td>${invoices[invoices.length-1][i].mySuppliers.invoice[x][z].date}</td>
                                <td>${invoices[invoices.length-1][i].mySuppliers.invoice[x][z].numInvoice}</td>
                                <td>${invoices[invoices.length-1][i].mySuppliers.invoice[x][z].namInvoice}</td>
                                <td>${invoices[invoices.length-1][i].mySuppliers.invoice[x][z].titlePro}</td>
                                <td>${invoices[invoices.length-1][i].mySuppliers.invoice[x][z].state}</td>
                                <td>${invoices[invoices.length-1][i].mySuppliers.invoice[x][z].moodSales}</td>
                                <td>${invoices[invoices.length-1][i].mySuppliers.invoice[x][z].quantityPro}</td>
                                <td>${invoices[invoices.length-1][i].mySuppliers.invoice[x][z].price}</td>
                                <td>${invoices[invoices.length-1][i].mySuppliers.invoice[x][z].price * invoices[invoices.length-1][i].mySuppliers.invoice[x][z].quantityPro}</td>
                                <td>${invoices[invoices.length-1][i].mySuppliers.invoice[x][z].paid}</td>
                                <td>${invoices[invoices.length-1][i].mySuppliers.invoice[x][z].remain}</td>
                            </tr>
                            `;
                            tmpx = x;
                            tmpz = z;
                            tmpI = i;
                            y = i;
                        }
                    }
                }

               
               
            }
            
        
        
   
        document.querySelector('.tbodyDetails').innerHTML = tableDetails;
        document.querySelector('#selectClient').innerHTML = option;
        
            
           
        
        
    }
    tableDetails += `
    <tr>
        <td colspan='9'>الاجمالي</td>
        <td>${totalPrice}</td>
        <td>${totalPaid}</td>
        <td>${totalRemain}</td>
        <td><button onclick="payMoney(${tmpI},${tmpx},${tmpz});">ادفع</button></td>

        
    </tr>
    `;        
    document.querySelector('.tbodyDetails').innerHTML = tableDetails;
    totalPrice = 0
    totalPaid = 0;
    totalMonthlyPrice = 0;
    totalRemain = 0; 
}

function closeTable(){
    document.querySelector('#tbDetails').style.display = 'none';
    document.querySelector('#tbInvoice').style.display = 'block';
}





let tablePrint;
let myAllInvoices = [];



function PrintPage(){
    document.querySelector('header').style.display = 'none';
    document.querySelector('.btns').style.display = 'none';
    document.querySelector('.inputSearch').style.display = 'none';
    document.querySelector('.inputs').style.display = 'none';
    window.print();
    refresh();
}



function refresh() {
    window.location.reload();
}

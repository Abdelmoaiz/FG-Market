const {ipcRenderer}=   require('electron')


let insertProdu = document.querySelector('#insertProdu');
let date = new Date();
let tmp;
let mood = 'create';
let addItems2 = document.querySelector('#addItems2');

let namInvoice = document.querySelector('#namInvoice');
let barcodePersonal = document.querySelector('#barcodePersonal');
let phone = document.querySelector('#phone');
let adress = document.querySelector('#adress');
let numInvoice = document.querySelector('#numInvoice');
let titlePro = document.querySelector('#title');
let quantityPro = document.querySelector('#quantity');
let price = document.querySelector('#price');
let totalPrice = document.querySelector('#totalPrice');
// let pricePlus = document.querySelector('#pricePlus');
// let paid = document.querySelector('#paid');
// let numMonth = document.querySelector('#numMonth');
// let monthlyPrice = document.querySelector('#monthlyPrice');
let remain = document.querySelector('#remain');

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
let mydataPro;
if(localStorage.myData != null){
    mydataPro = JSON.parse(localStorage.myData)
}else{
    mydataPro = []
}

function showNewInvoice(){

    document.querySelector('.viewNewInvoice').style.display = 'block';
    document.querySelector('.viewPostpaidPill').style.display = 'none';
    document.querySelector('.viewOldInvoice').style.display = 'none';

}

function showPayFuInvoice(){
    document.querySelector('.viewNewInvoice').style.display = 'none';
    document.querySelector('.viewPostpaidPill').style.display = 'block';
    document.querySelector('.viewOldInvoice').style.display = 'none';
}

function showOldInvoice(){
    document.querySelector('.viewNewInvoice').style.display = 'none';
    document.querySelector('.viewPostpaidPill').style.display = 'none';
    document.querySelector('.viewOldInvoice').style.display = 'block';
    
}



function getAllInvoice(i){
    ipcRenderer.send('get-clientInvoice', 'bing')
    ipcRenderer.on('get-clientInvoice',(e,args)=>{
        const myInvoice = JSON.parse(args)
        invoices.push(myInvoice)
        barcodePersonal.value = 1;

            // barcodePersonal.value = invoices[invoices.length-1][i].myClientInvoice[0][0]
            
                
    })
}
getAllInvoice();

setTimeout(() => {
    ipcRenderer.send('get-Invoice', 'bing')
    ipcRenderer.on('get-Invoice',(e,args)=>{
        const myInvoice = JSON.parse(args)
        invoices.push(myInvoice)
    })
    let tableProduct = '';
    ipcRenderer.send('get-Data', 'bing')
    ipcRenderer.on('get-Data',(e,args)=>{
        const myData = JSON.parse(args)
        mydataPro.push(myData)
            optionPro = `
            <option>اختر الصنف</option>
            `;;
        for(let i=0; i<mydataPro[mydataPro.length-1].length; i++){
            let data = mydataPro[mydataPro.length-1];
            if(data[i].myItems.countTotal > 0 || data[i].myItems.countOne > 0){
                optionPro += `
                <option>${data[i].myItems.title}</option>

                `;


            }
        }
                
        document.querySelector('#selectePro').innerHTML = optionPro;            


    })
    // readProduct();
    
}, 10);


function readProduct() {
    ipcRenderer.send('get-Invoice', 'bing')
    ipcRenderer.on('get-Invoice',(e,args)=>{
        const myInvoice = JSON.parse(args)
        invoices.push(myInvoice)
    })
    let tableProduct = '';
    ipcRenderer.send('get-Data', 'bing')
    ipcRenderer.on('get-Data',(e,args)=>{
        const myData = JSON.parse(args)
        mydataPro.push(myData)
            optionPro = `
            <option>اختر الصنف</option>
            `;;
        for(let i=0; i<mydataPro[mydataPro.length-1].length; i++){
            let data = mydataPro[mydataPro.length-1];
            if(data[i].myItems.countTotal > 0 || data[i].myItems.countOne > 0){
                optionPro += `
                <option>${data[i].myItems.title}</option>

                `;


            }
        }
                
        document.querySelector('#selectePro').innerHTML = optionPro;            


    })
       
}


readProduct();


// read product in input invoice



let moodSales = 'one';
function selectTypeSales(value){
    console.log(value)
    moodSales = value;
    // moodSales = 'one';
    
    
}
function insertItem(value){
    for(let i=0; i<mydataPro[mydataPro.length-1].length; i++){
        if(value ==  mydataPro[mydataPro.length-1][i].myItems.barcodeTotal){
            tmpSelected = i;
            idSelect = mydataPro[mydataPro.length-1][i]._id;
            moodSales = 'total';
            if(mydataPro[mydataPro.length-1][i].myItems.countTotal > 0){
                let data = mydataPro[mydataPro.length-1];
                idItems = data[i]._id;
                titlePro.value = data[i].myItems.title;
                price.value = data[i].myItems.priceSaleTotal;
                priceBuy = data[i].myItems.priceBuy;
                quantityPro.value = 1;
                insertProdu.focus();
                insertProdu.value = '';

                getNumInvoice();

            }
        }else if(value ==  mydataPro[mydataPro.length-1][i].myItems.barcodeOne){
            tmpSelected = i;
            idSelect = mydataPro[mydataPro.length-1][i]._id;
            moodSales = 'one';
            if(mydataPro[mydataPro.length-1][i].myItems.countOne > 0){
                let data = mydataPro[mydataPro.length-1];
                idItems = data[i]._id;
                titlePro.value = data[i].myItems.title;
                price.value = data[i].myItems.priceSaleOne;
                priceBuy = data[i].myItems.priceBuy;
                quantityPro.value = 1;
                insertProdu.focus();
                insertProdu.value = '';

                getNumInvoice();
            }

        }
        
       
    }

    
}
let tmpItems;
function selectProduct(value){
    for(let i=0; i<mydataPro[mydataPro.length-1].length; i++){
        if(value == mydataPro[mydataPro.length-1][i].myItems.title){
            if(mydataPro[mydataPro.length-1][i].myItems.countTotal > 0){
                if(moodSales == 'total'){

                    tmpSelected = i;
                    idSelect = mydataPro[mydataPro.length-1][i]._id;
                    
                    console.log(idSelect)
                        let data = mydataPro[mydataPro.length-1];
                        idItems = data[i]._id;
                        titlePro.value = data[i].myItems.title;
                        price.value = data[i].myItems.priceSaleTotal;
                        priceBuy = data[i].myItems.priceBuy;
                        quantityPro.value = 1;
                        quantityPro.focus();
                        tmpItems = i;
                        
                }else if(moodSales == 'one'){
                    tmpSelected = i;
                    idSelect = mydataPro[mydataPro.length-1][i]._id;
                    
                    
                        let data = mydataPro[mydataPro.length-1];
                        idItems = data[i]._id;
                        titlePro.value = data[i].myItems.title;
                        price.value = data[i].myItems.priceSaleOne;
                        priceBuy = data[i].myItems.priceBuy;
                        quantityPro.value = 1;
                        quantityPro.focus();
                        tmpItems = i;
        
                        
                    console.log(idSelect)

                
        
            
        
                }
            }
            
        }
       
    }
    
    getNumInvoice();


}



// read data

let optionPro = '';
let optionClient = '';
let allClients = [];
let idClient;

let allProducts = document.querySelector('#allProducts');
let product,namePro,quaPro,divInputPro,btnPack,btnOne = '';
function readProduct() {
    // if(mydataPro != ''){
        let tableProduct = '';
        ipcRenderer.send('get-Data', 'bing')
        ipcRenderer.on('get-Data',(e,args)=>{
            const myData = JSON.parse(args)
            mydataPro.push(myData)
                optionPro = `
                <option>اختر الصنف</option>
                `;
                for(let i=0; i<mydataPro[mydataPro.length-1].length; i++){
                    let data = mydataPro[mydataPro.length-1];
                if(data[i].myItems.count > 0){
                    optionPro += `
                    <option>${data[i].myItems.title}</option>

                    `;


                }
            }
                    
            document.querySelector('#selectePro').innerHTML = optionPro;            


        })
        ipcRenderer.send('get-clientInvoice', 'bing')
        ipcRenderer.on('get-clientInvoice',(e,args)=>{
        const myInvoice = JSON.parse(args)
        allClients.push(myInvoice)
        
        })
       
}   
  

// calc Total


function calcTotal(value){
    totalPrice.value = +price.value * +quantityPro.value;
}

function calcTotalPlus(value){
    totalPrice.value = +price.value * +quantityPro.value + ((value * +price.value * +quantityPro.value) / 100)
}

// function calcRemain(){
//     remain.value = +totalPrice.value - +paid.value
// }

// function calcMonthlyPrice(value){
//     monthlyPrice.value = Math.ceil(+remain.value / value);
// }

// function show(value){
//     pricePlus.value = 30;
//     document.querySelector('.viewRange').innerHTML = value + '%'
// }
// read product in input invoice
let num;
let Count;
let idItems;
let priceBuy;

// readProduct();
// function insertItem(value){
//     for(let i=0; i<mydataPro[mydataPro.length-1].length; i++){
//         if(mydataPro[mydataPro.length-1][i].myItems.count > 0){
//             if(value == mydataPro[mydataPro.length-1][i].myItems.barcode){
//                 tmpSelected = i;
//                 idSelect = mydataPro[mydataPro.length-1][i]._id;
                
//                 let data = mydataPro[mydataPro.length-1];
//                 idItems = data[i]._id;
//                 titlePro.value = data[i].myItems.title
//                 quantityPro.value = 1;
//                 price.value = data[i].myItems.priceSale;
//                 priceBuy = data[i].myItems.priceBuy;

//                 totalPrice.value = +data[i].myItems.priceSale * 1;
//                 // paid.value = 0;
//                 // numMonth.value = .25;
//                 // remain.value = totalPrice.value;
//                 getNumInvoice();

                
//             }
//         }
       
//     }
    
// }

// let tmpSelected,idSelect;
// function selectProduct(value){
//     for(let i=0; i<mydataPro[mydataPro.length-1].length; i++){
//         if(mydataPro[mydataPro.length-1][i].myItems.count > 0){
//             if(value == mydataPro[mydataPro.length-1][i].myItems.title){
//                 tmpSelected = i;
//                 idSelect = mydataPro[mydataPro.length-1][i]._id;
                
//                     let data = mydataPro[mydataPro.length-1];
//                     idItems = data[i]._id;
//                     titlePro.value = data[i].myItems.title;
//                     quantityPro.value = 1;
//                     price.value = data[i].myItems.priceSale;
//                     priceBuy = data[i].myItems.priceBuy;

//                     totalPrice.value = +data[i].myItems.priceSale * 1;
//                     // paid.value = 0;
//                     getNumInvoice();
//                     getAllInvoice(i);
                
//             }
//         }
       
        
       
//     }
    


// }


// Add invoice

let invoice;
if(localStorage.myInvoice != null) {
    invoice = JSON.parse(localStorage.myInvoice)
}else{
    invoice = [];
}
let sales;
if(localStorage.mySales != null) {
    sales = JSON.parse(localStorage.mySales)
}else{
    sales = [];
}

let dateInvoice =`${date.getFullYear()}${date.getMonth()+1}${date.getDate()}`;

let invoices = [];
function getAllInvoice(){
    ipcRenderer.send('get-Invoice', 'bing')
    ipcRenderer.on('get-Invoice',(e,args)=>{
        const myInvoice = JSON.parse(args)
        invoices.push(myInvoice)
    })
}

getAllInvoice();

function getNumInvoice(){
    if(invoices[invoices.length-1].length != 0) {
        for(let i = 0; i < invoices[invoices.length-1].length; i++) {
            if(invoices[invoices.length-1][i].myInvoice != ''){
                numInvoice.value = 1000 + +invoices[invoices.length-1].length+1;
                idItems = 1000 + +invoices[invoices.length-1].length+1;
            }
            
        }
    }else{
        numInvoice.value = 1001;
        idItems = 1001;
    }
}

let numSales,newProduct;
let data;
let allInvoices = [];
let newInvoice = '';
let clients = [];
let newClient = '';

function clearInput() {
    titlePro.value = 
    price.value = 
    quantityPro.value = '';
}


let nameClient,dateInvoicePrint,adressInvoice,phoneInvoice,numInvoicePri,totalInvoicePrint;
nameClient = document.querySelectorAll('.nameClient');
dateInvoicePrint = document.querySelectorAll('.dateInvoicePrint');
adressInvoice = document.querySelectorAll('.adress');
phoneInvoice = document.querySelectorAll('.phone');
numInvoicePri = document.querySelectorAll('.numInvoicePri');
totalInvoicePrint = document.querySelectorAll('.totalInvoicePrint');


addItems2.addEventListener("click", (e) =>{
    e.preventDefault();
    if(namInvoice.value != '') {
        newInvoice = {
            namInvoice: `${namInvoice.value}`,
            barcodePersonal:barcodePersonal.value,
            phone: phone.value,
            adress: adress.value,
            numPersonal: numPersonal.value,
            numInvoice: numInvoice.value,
            date: dateNow,
            time: dateNow,
            titlePro: titlePro.value,
            price: +price.value,
            priceBuy: priceBuy,
            quantityPro:  +quantityPro.value,
            // pricePlus: +pricePlus.value,
            amount : +quantityPro.value * +totalPrice.value,
            total: +totalPrice.value,
            paid: '',
            remain: '',
            numMonth: '',
            state:'تم البيع',
            typeSales: "اجل",
            idItems : idItems,
            
        }
       
               
        if(mood == 'create'){
            if(document.querySelector('#selectePro').value != 'اختر الصنف'){
                numSales = +quantityPro.value;
    
                mydataPro[mydataPro.length-1][tmpSelected].myItems.count -= +newInvoice.quantityPro;
                
                data = mydataPro[mydataPro.length-1][tmpSelected].myItems;

            }
            invoice.push(newInvoice);


            ipcRenderer.send('update-items2', {...data,idSelect})
            
            // sales.push(newInvoice)
        }else{
            allInvoices[tmp] = newInvoice;
            addItems2.innerHTML = 'اضافة للفاتورة';
            mood = 'create'

        }
        // excretionsPro(tmp);
        
        addInvoiceItems();
        clearInput();
       
        totalPrice.value = ''
       
        
    }
})

// let allClients = [];
function save() {
        
        ipcRenderer.send('newClient',invoice)


        printInvo();
    
        

        // refresh();
    }
let table,tablePrint;
function addInvoiceItems() {
    table = '';
    tablePrint = '';
    let totalInvoice = 0;
    for(let i = 0; i < invoice.length; i++) {
        totalInvoice += +invoice[i].amount;
        table += `
            <tr>
                <td>${i+1}</td>
                <td>${invoice[i].namInvoice}</td>
                <td>${invoice[i].titlePro}</td>
                <td>${invoice[i].quantityPro}</td>
                <td>${invoice[i].total}</td>
                <td>${+invoice[i].amount}</td>
                <td><button onclick="deleteItems(${i});">حذف</button></td>
            </tr>
        `;
        
        tablePrint += `
        <tr>
            <td>${i+1}</td>
            <td>${invoice[i].titlePro}</td>
            <td>${invoice[i].quantityPro}</td>
            <td>${invoice[i].total}</td>
            <td>${invoice[i].amount}</td>
        </tr>
        `
       
    }
    table += `
            <tr>
                <td colspan='5'>الاجمالي</td>
                <td>${totalInvoice}</td>
            </tr>
        `;
        

    tablePrint += `
        <tr>
            <td colspan='4'>الاجمالي</td>
            <td>${totalInvoice}</td>
        </tr>
        `
    
    document.querySelector('.tbody').innerHTML = table;
    document.querySelectorAll('.tbodyPrint')[0].innerHTML = tablePrint;
    document.querySelectorAll('.tbodyPrint')[1].innerHTML = tablePrint;


    nameClient[0].innerHTML = invoice[0].namInvoice;
    phoneInvoice[0].innerHTML = invoice[0].phone;
    adressInvoice[0].innerHTML = invoice[0].adress;
    dateInvoicePrint[0].innerHTML = invoice[0].date;
    numInvoicePri[0].innerHTML = invoice[0].numInvoice;

    nameClient[1].innerHTML = invoice[0].namInvoice;
    phoneInvoice[1].innerHTML = invoice[0].phone;
    adressInvoice[1].innerHTML = invoice[0].adress;
    dateInvoicePrint[1].innerHTML = invoice[0].date;
    numInvoicePri[1].innerHTML = invoice[0].numInvoice;


}
// let tablePrint;
function printInvo(){
    document.querySelector('header').style.display = 'none';
    document.querySelector('.view').style.display = 'none';
    document.querySelector('.selectInvoice').style.display = 'none';

    document.querySelector('.invoicePrint').style.display = 'block';
    

    window.print();
    refresh();
}
    
function deleteItems(i){
    for(let x=0;x<mydataPro[mydataPro.length-1].length; x++){
        if(invoice[i].idItems == mydataPro[mydataPro.length-1][x]._id){
            let data = mydataPro[mydataPro.length-1][x].myItems;

            let idData = invoice[i].idItems;
            
            mydataPro[mydataPro.length-1][x].myItems.count += +invoice[i].quantityPro;
            ipcRenderer.send('return-items2', {...data,idData})


        }
    }
    

    invoice.splice(i,1)
    addInvoiceItems();
    totalInvoice();
}

table = '';
tablePrint = '';
function totalInvoice() {
    let result = 0;

    for(let i = 0; i < invoice.length; i++){
        result += invoice[i].amount
        
    }

    table += `
        <tr>
            <td colspan='5' class='invoiceTotal'>الاجمالي</td>
            <td>${result}</td>

        </tr>
    `;
    tablePrint += `
        <tr>
            <td colspan='4' class='invoiceTotal'>الاجمالي</td>
            <td>${result}</td>

        </tr>
    `;

    document.querySelector('.tbody').innerHTML = table;
    // document.querySelector('.tbodyPrint').innerHTML = tablePrint;

    
}
totalInvoice();


// search 
let search = document.querySelector('#search');



// clear input 

function refresh() {
    window.location.reload();
}


// invoice other 2



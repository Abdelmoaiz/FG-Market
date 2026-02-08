const {ipcRenderer}=   require('electron')


let insertProdu = document.querySelector('#insertProdu');
let date = new Date();
let tmp;
let mood = 'create';
let addItems2 = document.querySelector('#addItems2');

let namInvoice = document.querySelector('#namInvoice');
let barcodePersonal = document.querySelector('#barcodePersonal');

let numInvoice = document.querySelector('#numInvoice');
let titlePro = document.querySelector('#title');
let quantityPro = document.querySelector('#quantity');
let price = document.querySelector('#price');
let totalPrice = document.querySelector('#totalPrice');
// let pricePlus = document.querySelector('#pricePlus');
// let paid = document.querySelector('#paid');
// let numMonth = document.querySelector('#numMonth');
// let monthlyPrice = document.querySelector('#monthlyPrice');
// let remain = document.querySelector('#remain');

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

            // barcodePersonal.value = invoices[invoices.length-1][i].myClientInvoice[0][0]
            
                
    })
}
getAllInvoice();


// read data
let optionPro = '';
let optionClient = '';
let allClients = [];
let idClient;

let allProducts = document.querySelector('#allProducts');
let product,namePro,quaPro,divInputPro,btnPack,btnOne = '';

function calcTotal(value){
    totalPrice.value = +price.value * +quantityPro.value;
}

function calcTotalPlus(value){
    totalPrice.value = +price.value * +quantityPro.value + ((value * +price.value * +quantityPro.value) / 100)
}


let idClientMain;
function selectClient(value){
    for(let i = 0; i < allClients[allClients.length-1].length; i++) {
     
        if(value == allClients[allClients.length-1][i].mySuppliers.nameSuppliers){
            idClient = i;
            idClientMain = allClients[allClients.length-1][i]._id;
           
            namInvoice.value = value;
            namInvoice.value = allClients[allClients.length-1][i].mySuppliers.nameSuppliers

            getNumInvoice();  
        }

    }
    
   
    
}
let num;
let Count;
let idItems;
let priceBuy;



setTimeout(() => {
    ipcRenderer.send('get-Customer', 'bing')
    ipcRenderer.on('get-Customer',(e,args)=>{
        const myInvoice = JSON.parse(args);
        allClients.push(myInvoice)
        optionClient = '';
        optionClient += `
                <option>اختر العميل</option>
            `
        for(let i = 0; i < allClients[allClients.length-1].length; i++) {
            idClient = i;
            if(allClients[allClients.length-1][i].mySuppliers[0] != ''){
                optionClient += `
                <option>${allClients[allClients.length-1][i].mySuppliers.nameSuppliers}</option>
            `           
            }
        }
        document.querySelector('#selecteClients').innerHTML = optionClient;
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
    
    readProduct();
    
}, 1);


function readProduct() {
    
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



let moodSales = 'قطاعي';
function selectTypeSales(value){
    console.log(value)
    moodSales = value;
    // moodSales = 'one';
    
    
}
function insertItem(value){
    for(let i=0; i<mydataPro[mydataPro.length-1].length; i++){
        if(value ==  mydataPro[mydataPro.length-1][i].myItems.barcodeOne && moodSales == 'جملة'){
            console.log('1')
            tmpSelected = i;
            idSelect = mydataPro[mydataPro.length-1][i]._id;
            // moodSales = 'جملة';
            if(mydataPro[mydataPro.length-1][i].myItems.countTotal > 0){
                let data = mydataPro[mydataPro.length-1];
                idItems = data[i]._id;
                titlePro.value = data[i].myItems.title;
                price.value = data[i].myItems.priceSaleOne;
                priceBuy = data[i].myItems.priceBuy;
                quantityPro.value = 1;
                insertProdu.focus();
                insertProdu.value = '';


            }
        }else{
            console.log('2')

            tmpSelected = i;
            idSelect = mydataPro[mydataPro.length-1][i]._id;
            // moodSales = 'قطاعي';
            if(mydataPro[mydataPro.length-1][i].myItems.countOne > 0){
                let data = mydataPro[mydataPro.length-1];
                idItems = data[i]._id;
                titlePro.value = data[i].myItems.title;
                price.value = data[i].myItems.priceSaleOne;
                priceBuy = data[i].myItems.priceBuy;
                quantityPro.value = 1;
                insertProdu.focus();
                insertProdu.value = '';

            }

        }
        
       
    }

    
}
let tmpItems;
function selectProduct(value){
    for(let i=0; i<mydataPro[mydataPro.length-1].length; i++){
        if(value == mydataPro[mydataPro.length-1][i].myItems.title){
            if(mydataPro[mydataPro.length-1][i].myItems.countTotal > 0){
                if(moodSales == 'جملة'){

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
                        
                }else if(moodSales == 'قطاعي'){
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
    


}


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


getAllInvoice();

function getNumInvoice(){
    if(allClients[allClients.length-1].length != 0) {
        if(allClients[allClients.length-1][idClient].mySuppliers != ''){
            numInvoice.value = `${allClients[allClients.length-1][idClient]._id}` + (100 +allClients[allClients.length-1][idClient].mySuppliers.invoice.length+1);
            // console.log(idClient)
            console.log(allClients[allClients.length-1][idClient].mySuppliers.invoice.length)
        
            
        }

        
    }else{
        numInvoice.value = 101;
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

let tmpI;


addItems2.addEventListener("click", (e) =>{
    e.preventDefault();
    if(titlePro.value != '' && price.value != '' && quantityPro.value != '') {
        if(invoice.length != 0){

            for(let i = 0; i < invoice.length; i++) {
               
                
                if(titlePro.value == invoice[i].titlePro){
                    tmpI = i;
                    console.log('1 loop')

                    break;
                }else{
                    tmpI = 0;
                    console.log('2 loop')
                    // break;
                }
            }
           
            if(titlePro.value != invoice[tmpI].titlePro){
                console.log('1')
                newInvoice = {
                    
                    numInvoice: numInvoice.value,
                    date: dateNow,
                    time: `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
                    namInvoice: namInvoice.value,
                    titlePro: titlePro.value,
                    price: +price.value,
                    paid: '',
                    remain: '',
                    quantityPro:  +quantityPro.value,
                    priceBuy:priceBuy,
                    state:'تم البيع',
                    idItems : idItems,
                    moodSales:moodSales,
                                         
                }
                numSales = +quantityPro.value;
                
        
                if(moodSales == 'قطاعي'){
                    mydataPro[mydataPro.length-1][tmpSelected].myItems.totalCount -= +newInvoice.quantityPro;

                }else{
                    mydataPro[mydataPro.length-1][tmpSelected].myItems.totalCount -= (+newInvoice.quantityPro*mydataPro[mydataPro.length-1][tmpSelected].myItems.countOne);

                }
        
                
                if(mood == 'create'){
                    invoice.push(newInvoice);
                    data = mydataPro[mydataPro.length-1][tmpSelected].myItems;
                    ipcRenderer.send('update-items2', {...data,idSelect})

                    
                    // sales.push(newInvoice)
                }else{
                    allInvoices[tmp] = newInvoice;
                    mood = 'create'
        
                }

                  
                    

            }else{
                console.log('2')
                invoice[tmpI].quantityPro += +quantityPro.value;
                

                if(moodSales == 'قطاعي'){
                    mydataPro[mydataPro.length-1][tmpSelected].myItems.totalCount -= +quantityPro.value;

                }else{
                    mydataPro[mydataPro.length-1][tmpSelected].myItems.totalCount -= (+newInvoice.quantityPro*mydataPro[mydataPro.length-1][tmpSelected].myItems.countOne);

                }
                if(mood == 'create'){
                    data = mydataPro[mydataPro.length-1][tmpSelected].myItems;
        
                    ipcRenderer.send('update-items2', {...data,idSelect})

                    // sales.push(newInvoice)
                }else{
                    allInvoices[tmp] = newInvoice;
                    mood = 'create'
        
                }
                    
            }
            
        }
        else{
            console.log('3')

            newInvoice = {
                numInvoice: numInvoice.value,
                date: dateNow,
                time: `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
                namInvoice: namInvoice.value,
                titlePro: titlePro.value,
                price: +price.value,
                paid: '',
                remain: '',
                quantityPro:  +quantityPro.value,
                priceBuy:priceBuy,
                state:'تم البيع',
                idItems : idItems,
                moodSales:moodSales,
            }
            numSales = +quantityPro.value;
    
            if(moodSales == 'قطاعي'){
                mydataPro[mydataPro.length-1][tmpSelected].myItems.totalCount -= +newInvoice.quantityPro;

            }else{
                mydataPro[mydataPro.length-1][tmpSelected].myItems.totalCount -= (+newInvoice.quantityPro*mydataPro[mydataPro.length-1][tmpSelected].myItems.countOne);

            }
    
            
            if(mood == 'create'){
                invoice.push(newInvoice);
                data = mydataPro[mydataPro.length-1][tmpSelected].myItems;
    
                ipcRenderer.send('update-items2', {...data,idSelect})

                
                // sales.push(newInvoice)
            }else{
                allInvoices[tmp] = newInvoice;
                // addItems.innerHTML = 'اضافة للفاتورة';
                mood = 'create'
    
            }
            
        }
        addInvoiceItems();
        clearInput();
        console.log(invoice)
        console.log(allClients[allClients.length-1][idClient].mySuppliers.invoice)
      
        
    }
})

// let allClients = [];
function save() {
    allClients[allClients.length-1][idClient].mySuppliers.invoice.push(invoice)

    let data =  allClients[allClients.length-1][idClient]
    ipcRenderer.send('update-customer',{...data, idClientMain})

    
        // ipcRenderer.send('update-invoice2', {...data,idClientMain})


        printInvo();
    
        

    }
let table,tablePrint;
function addInvoiceItems() {
    table = '';
    tablePrint = '';
    let totalInvoice = 0;
    for(let i = 0; i < invoice.length; i++) {
        totalInvoice += +invoice[i].quantityPro * +invoice[i].price;
        table += `
            <tr>
                <td>${i+1}</td>
                <td>${invoice[i].namInvoice}</td>
                <td>${invoice[i].titlePro}</td>
                <td>${invoice[i].quantityPro}</td>
                <td>${invoice[i].price}</td>
                <td>${+invoice[i].quantityPro * +invoice[i].price}</td>
                <td><button onclick="deleteItems(${i});">حذف</button></td>
            </tr>
        `;
        
        tablePrint += `
        <tr>
            <td>${i+1}</td>
            <td>${invoice[i].namInvoice}</td>
            <td>${invoice[i].titlePro}</td>
            <td>${invoice[i].quantityPro}</td>
            <td>${invoice[i].price}</td>
            <td>${+invoice[i].quantityPro * +invoice[i].price}</td>
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
            <td colspan='5'>الاجمالي</td>
            <td>${totalInvoice}</td>
        </tr>
    `;
        

   
    
    document.querySelector('.tbody').innerHTML = table;
    document.querySelector('.tbodyPrint').innerHTML = tablePrint;
    

    


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
        if(invoice[i].titlePro == mydataPro[mydataPro.length-1][x].myItems.title){
            let data = mydataPro[mydataPro.length-1][x].myItems;
            
            let idData = mydataPro[mydataPro.length-1][x]._id;
           
            
            mydataPro[mydataPro.length-1][x].myItems.totalCount += +invoice[i].quantityPro;

            ipcRenderer.send('return-items2', {...data,idData})

        }
    }

    invoice.splice(i,1)
    addInvoiceItems();
}

table = '';
tablePrint = '';

// search 
let search = document.querySelector('#search');



// clear input 

function refresh() {
    window.location.reload();
}


// invoice other 2



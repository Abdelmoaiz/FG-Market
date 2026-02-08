const {ipcRenderer}=   require('electron')


let namInvoice = document.querySelector('#namInvoice');
let numInvoice = document.querySelector('#numInvoice');
let titlePro = document.querySelector('#title');
let quantityPro = document.querySelector('#quantity');
let price = document.querySelector('#price');
let total = document.querySelector('#total');
let insertProdu = document.querySelector('#insertProdu');
let myDate = new Date();
let tmp;
let mood = 'create';
let addItems = document.querySelector('#addItems');

let mydataPro;
if(localStorage.myData != null){
    mydataPro = JSON.parse(localStorage.myData)
}else{
    mydataPro = []
}


let dateNow;
if(myDate.getMonth()+1 < 10 && myDate.getDate() < 10) {
    dateNow = `${myDate.getFullYear()}-0${myDate.getMonth()+1}-0${myDate.getDate()}`;
}else if(myDate.getMonth()+1 < 10 && myDate.getDate() > 10){
    dateNow = `${myDate.getFullYear()}-0${myDate.getMonth()+1}-${myDate.getDate()}`;
}else if(myDate.getMonth()+1 > 10 && date.getDate() < 10){
    dateNow = `${myDate.getFullYear()}-${myDate.getMonth()+1}-0${myDate.getDate()}`;
}else{
    dateNow = `${myDate.getFullYear()}-${myDate.getMonth()+1}-${myDate.getDate()}`;
}

// read data
let optionPro = '';
let allClients=[];
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
   
}, 10);


let moodTypeCustomer = 'cash';
let selectClient = document.querySelector('#selecteClients');

function selectTypeCustomer(value){
    if(value == 'delayed'){
        moodTypeCustomer = 'delayed';
        document.querySelector('#selecteClients').removeAttribute('disabled');
        namInvoice.style.display = 'inline-block';     
    }else{
        moodTypeCustomer = 'cash';
        document.querySelector('#selecteClients').setAttribute('disabled','disabled')        


    }
}

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

let idClientMain;
function selectClientThis(value){
    console.log(value)
    for(let i = 0; i < allClients[allClients.length-1].length; i++) {
     
        if(value == allClients[allClients.length-1][i].mySuppliers.nameSuppliers){
            idClient = i;
            idClientMain = allClients[allClients.length-1][i]._id;
           
            namInvoice.value = value;
            namInvoice.value = allClients[allClients.length-1][i].mySuppliers.nameSuppliers
            
        }

    }
    
   
    
}
readProduct();


// read product in input invoice


let num;
let Count;
let idItems;

let priceBuy;
let moodSales = 'قطاعي';
function selectTypeSales(value){
    console.log(value)
    moodSales = value;
    // moodSales = 'one';
    
    
}

function calctotal(value){
    total.value = +quantityPro.value * +price.value;
    
}
function insertItem(value){
    for(let i=0; i<mydataPro[mydataPro.length-1].length; i++){
        if(value ==  mydataPro[mydataPro.length-1][i].myItems.barcodeTotal){
            moodSales = 'جملة';
            tmpSelected = i;
            idSelect = mydataPro[mydataPro.length-1][i]._id;
            if(mydataPro[mydataPro.length-1][i].myItems.countTotal > 0){
                let data = mydataPro[mydataPro.length-1];
                idItems = data[i]._id;
                titlePro.value = data[i].myItems.title;
                price.value = data[i].myItems.priceSaleTotal;
                priceBuy = data[i].myItems.priceBuy;

                quantityPro.value = 1;
                total.value = +quantityPro.value * +price.value;

                // addItems.click()
                insertProdu.value = '';


            }
        }else if(value ==  mydataPro[mydataPro.length-1][i].myItems.barcodeOne){
            tmpSelected = i;
            moodSales = 'قطاعي';

            idSelect = mydataPro[mydataPro.length-1][i]._id;
            if(mydataPro[mydataPro.length-1][i].myItems.countOne > 0){
                let data = mydataPro[mydataPro.length-1];
                idItems = data[i]._id;
                titlePro.value = data[i].myItems.title;
                price.value = data[i].myItems.priceSaleOne;
                priceBuy = data[i].myItems.priceBuy;
                quantityPro.value = 1;
                total.value = +quantityPro.value * +price.value;

                // addItems.click()
                insertProdu.value = '';
                
            }
        }

        
       
    }

    getNumInvoice();
    calctotal();

    // insertProdu.focus();


}
let tmpItems;
let tmpSelected,idSelect;
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
        
                   
        
                }
            }
            
        }
       
    }
    
    getNumInvoice();
    calctotal();



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

let dateInvoice =`${myDate.getFullYear()}${myDate.getMonth()+1}${myDate.getDate()}`;

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
    if(invoices.length != 0 ) {
        if(invoices[invoices.length-1].length != 0 ) {

            for(let i = 0; i < invoices[invoices.length-1].length; i++) {
                if(invoices[invoices.length-1][i].myInvoice != ''){
                    numInvoice.value = 1000 + +invoices[invoices.length-1].length+1;
                    idItems = 1000 + +invoices[invoices.length-1].length+1;
                }
                
            }
        }
    }else{
        numInvoice.value = 1001;
        idItems = 1001;
    }
}
// getNumInvoice();
function calcCount(value){
    if(moodSales == 'قطاعي'){
        quantityPro.value = +value / +mydataPro[mydataPro.length-1][tmpItems].myItems.priceSaleOne;

    }else{
        quantityPro.value = +value / +mydataPro[mydataPro.length-1][tmpItems].myItems.priceSaleTotal;

    }
    // calctotal();
}


let numSales,newProduct;
let data;
let allInvoices = [];
let newInvoice = '';
let tmpI;
addItems.addEventListener("click", (e) =>{
    e.preventDefault();
    if(titlePro.value != '' && price.value != '') {
        if(mood == 'create'){
            if(invoice.length != 0){

                for(let i = 0; i < invoice.length; i++) {
                   
                    
                    if(titlePro.value == invoice[i].titlePro ){
                        tmpI = i;
                        break;
                    }else{
                        tmpI = 0;
                    }
                }
               
                if(titlePro.value != invoice[tmpI].titlePro){
    
                    newInvoice = {
                        numInvoice: numInvoice.value,
                        date: dateNow,
                        time: `${myDate.getHours()}:${myDate.getMinutes()}:${myDate.getSeconds()}`,
                        namInvoice: namInvoice.value,
                        titlePro: titlePro.value,
                        price: +price.value,
                        quantityPro:  +quantityPro.value,
                        priceBuy:priceBuy,
                        total:total.value,
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
                    }
    
                      
                        
    
                }else{
                    console.log('2')
                    // if(invoice[tmpI].moodSales == moodSales){
    
                        invoice[tmpI].quantityPro += +quantityPro.value;
                        invoice[tmpI].total = +invoice[tmpI].total + +total.value;
                        
                   
                    
    
                    if(moodSales == 'قطاعي'){
                        mydataPro[mydataPro.length-1][tmpSelected].myItems.totalCount -= +quantityPro.value;
    
                    }else{
                        mydataPro[mydataPro.length-1][tmpSelected].myItems.totalCount -= (+newInvoice.quantityPro*mydataPro[mydataPro.length-1][tmpSelected].myItems.countOne);
    
                    }
                    if(mood == 'create'){
                        data = mydataPro[mydataPro.length-1][tmpSelected].myItems;
            
                        ipcRenderer.send('update-items2', {...data,idSelect})
                        
                        // sales.push(newInvoice)
                    }
                        
               }
                
            }
            else{
                newInvoice = {
                    numInvoice: numInvoice.value,
                    date: dateNow,
                    time: `${myDate.getHours()}:${myDate.getMinutes()}:${myDate.getSeconds()}`,
                    namInvoice: namInvoice.value,
                    titlePro: titlePro.value,
                    price: +price.value,
                    quantityPro:  +quantityPro.value,
                    priceBuy:priceBuy,
                    total:total.value,
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
                }
                
            }
        }else{
            
            newInvoice = {
                numInvoice: numInvoice.value,
                date: dateNow,
                time: `${myDate.getHours()}:${myDate.getMinutes()}:${myDate.getSeconds()}`,
                namInvoice: namInvoice.value,
                titlePro: titlePro.value,
                price: +price.value,
                quantityPro:  +quantityPro.value,
                priceBuy:priceBuy,
                total:total.value,
                state:'تم البيع',
                idItems : idItems,
                moodSales:moodSales,                        
            }
            if(newInvoice.titlePro == mydataPro[mydataPro.length-1][tmpSelected].myItems.title){
                
                mydataPro[mydataPro.length-1][tmpSelected].myItems.totalCount += +invoice[tmp].quantityPro;
                
    
                mydataPro[mydataPro.length-1][tmpSelected].myItems.totalCount -= +newInvoice.quantityPro;
    
            }
           
            
            data = mydataPro[mydataPro.length-1][tmpSelected].myItems;
        
            ipcRenderer.send('update-items2', {...data,idSelect})
            
            invoice[tmp] = newInvoice;
            
            addItems.innerHTML = 'اضافة للفاتورة';
            mood = 'create';

            addInvoiceItems();
   
        }
        
        addInvoiceItems();
        // totalInvoice();
        clearInput();
      
        
    }
})
    

function clearInput() {
    titlePro.value = 
    price.value = 
    quantityPro.value =
    total.value = '';
}


function save() {
    if(invoice.length !=0){

        if(moodTypeCustomer == 'cash'){
            invoice.push(allInvoices);
    
            ipcRenderer.send('newInvoice',`${idItems}`,invoice)
    
        }else if(moodTypeCustomer == 'delayed'){
            ipcRenderer.send('newClient',`${idItems}`,invoice)
    
        }
    }
       
}
function saveAndPrint() {
    if(invoice.length !=0){

        invoice.push(allInvoices);
        ipcRenderer.send('newInvoice',`${idItems}`,invoice)
        printInvo();
        refresh();
    }
}
function printInvo(){
    document.querySelector('.invoicePrint').style.display = 'block';
    document.querySelector('.inputs').style.display = 'none';
    document.querySelector('header').style.display = 'none';
    document.querySelector('.view').style.display = 'none';
    document.querySelector('#btnRefrsh').style.display = 'none';
    window.print();
}
    

let table,tablePrint;
let totalInvoice = 0;
let myAllInvoices = [];
 function addInvoiceItems() {
        table = '';
        tablePrint = '';
        for(let i = 0; i < invoice.length; i++) {
            totalInvoice += +invoice[i].total;
            table += `
                <tr>
                    <td>${i+1}</td>
                    <td>${invoice[i].titlePro}</td>
                    <td>${invoice[i].quantityPro}</td>
                    <td>${+invoice[i].total}</td>
                    <td><button onclick="deleteItems(${i});">حذف</button></td>
                </tr>
            `;
            tablePrint += `
                <tr>
                    <td>${i+1}</td>
                    <td>${invoice[i].titlePro}</td>
                    <td>${invoice[i].quantityPro}</td>
                    <td>${+invoice[i].total}</td>
                    <td></td>
                </tr>
            `;
        
            
        }
        table += `
                <tr>
                    <td colspan='3'>الاجمالي</td>
                    <td>${totalInvoice}</td>
                    
                </tr>
            `;
            tablePrint += `
                <tr>
                    <td colspan='4'>الاجمالي</td>
                    <td>${totalInvoice}</td>
                
                </tr>
            `;
        
        
        document.querySelector('.tbody').innerHTML = table;
        document.querySelector('.tbodyPrint').innerHTML = tablePrint;
        totalInvoice = 0;
        
    
    
}

function editItems(i){
    mood = 'update';
    titlePro.value = invoice[i].titlePro;
    price.value = invoice[i].price;
    quantityPro.value = invoice[i].quantityPro;
    total.value = invoice[i].total;
    titlePro.focus();
    tmp = i;
    
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
    // totalInvoice();
}



let search = document.querySelector('#search');

function searchPro(value) {
   
}

// excretions Product
function excretionsPro(i) {
    mydataPro[i].totalQu -= +quantityPro.value;
    mydataPro[i].count = +mydataPro[i].totalQu / +mydataPro[i].quantity
    console.log(+mydataPro[i].count)
}



// clear input 

function refresh() {
    window.location.reload();
}



let numInoice = document.querySelector('#numInoice');
let titlePro = document.querySelector('#title');
let quantityPro = document.querySelector('#quantity');
let price = document.querySelector('#price');
let onePrice = document.querySelector('#onePrice');
let detailsReturn = document.querySelector('#detailsReturn');
let myDate = new Date();
let tmp;
const {ipcRenderer}=   require('electron')


let dateNow;



if(myDate.getMonth()+1 < 10 && myDate.getDate() < 10) {
    dateNow = `${myDate.getFullYear()}-0${myDate.getMonth()+1}-0${myDate.getDate()}`;
}else if(myDate.getMonth()+1 < 10 && myDate.getDate() > 10){
    dateNow = `${myDate.getFullYear()}-0${myDate.getMonth()+1}-${myDate.getDate()}`;
}else if(myDate.getMonth()+1 > 10 && myDate.getDate() < 10){
    dateNow = `${myDate.getFullYear()}-${myDate.getMonth()+1}-0${myDate.getDate()}`;
}else{
    dateNow = `${myDate.getFullYear()}-${myDate.getMonth()+1}-${myDate.getDate()}`;
}
let mydataPro = [];


function showData() {
    ipcRenderer.send('get-Data', 'bing')
    ipcRenderer.on('get-Data',(e,args)=>{
        const myData = JSON.parse(args)
        mydataPro.push(myData)
    })
    ipcRenderer.send('get-Invoice', 'bing')
    ipcRenderer.on('get-Invoice',(e,args)=>{
        const myInvoice = JSON.parse(args)
        invoice.push(myInvoice)
        
         
    })
}
showData();

let invoice = [];

// read data
let allProducts = document.querySelector('#allProducts');
let product,namePro,packetPro,quaPro,divInputPro,btnPack,btnOne;
function readProduct() {
    if(mydataPro != ''){
        for(let i = 0; i < mydataPro.length; i++){
            if(mydataPro[i].count > 0){
                product = document.createElement('div');
                product.className = 'product';
                namePro = document.createElement('h3');
                quaPro = document.createElement('span');
                divInputPro = document.createElement('div');
                divInputPro.className = 'divInputPro';
                btnOne = document.createElement('button');
                product.setAttribute('onclick',`selectProduct(${i});`)
                namePro.innerHTML = `${mydataPro[i].title}`;
                quaPro.innerHTML = `${+mydataPro[i].count}`;
                product.append(namePro,quaPro,divInputPro) 
                allProducts.append(product);
            }
            
        }
        
    }
}
let tmpNew;

setTimeout(() => {
    ipcRenderer.send('get-Data', 'bing')
    ipcRenderer.on('get-Data',(e,args)=>{
        const myData = JSON.parse(args)
        mydataPro.push(myData)
    })
    ipcRenderer.send('get-Invoice', 'bing')
    ipcRenderer.on('get-Invoice',(e,args)=>{
        const myInvoice = JSON.parse(args)
        invoice.push(myInvoice)
        
         
    })
}, 1);
function getAllInvoice(){
    ipcRenderer.send('get-Invoice', 'bing')
    ipcRenderer.on('get-Invoice',(e,args)=>{
        const myInvoice = JSON.parse(args)
        invoice.push(myInvoice)
        
         
    })
}
getAllInvoice();

let table;
let idSel;
function addNumInvoice(value){
    table = '';
    for(let i=0; i<invoice[invoice.length-1].length; i++){
        for(let x=0; x<invoice[invoice.length-1][i].myInvoice.length; x++){
            if(numInoice.value.includes(invoice[invoice.length-1][i].myInvoice[x].numInvoice)){
                // titlePro.value = invoice[invoice.length-1][i].myInvoice[x].titlePro;
                tmpNew = i;
                idSel = invoice[invoice.length-1][i]._id
                if(invoice[invoice.length-1][i].myInvoice[x].state == 'مرتجع'){
                    
                    table += `
                        <tr>
                            <td>${x+1}</td>
                            <td>${invoice[invoice.length-1][i].myInvoice[x].titlePro}</td>
                            <td>${invoice[invoice.length-1][i].myInvoice[x].moodSales}</td>
                            <td>${invoice[invoice.length-1][i].myInvoice[x].quantityPro}</td>
                            <td>${invoice[invoice.length-1][i].myInvoice[x].price}</td>
                            <td>${+invoice[invoice.length-1][i].myInvoice[x].price * +invoice[invoice.length-1][i].myInvoice[x].quantityPro}</td>
                            <td>مرتجع</td>
                        </tr>
                    `;
                    tmpInvo2 = i;
                    tmpInvo1 = x;
                
        
                }else{
                    
                    table += `
                        <tr>
                            <td>${x+1}</td>
                            <td>${invoice[invoice.length-1][i].myInvoice[x].titlePro}</td>
                            <td>${invoice[invoice.length-1][i].myInvoice[x].moodSales}</td>
                            <td>${invoice[invoice.length-1][i].myInvoice[x].quantityPro}</td>
                            <td>${invoice[invoice.length-1][i].myInvoice[x].price}</td>
                            <td>${+invoice[invoice.length-1][i].myInvoice[x].price * +invoice[invoice.length-1][i].myInvoice[x].quantityPro}</td>
                            <td><button onclick='returnThis(${x});'>ارتجاع</button></td>
                        </tr>
                    `;
                    tmpInvo2 = i;
                    tmpInvo1 = x;

        
                }
                

                // break;
            }
        }
        document.querySelector('.tbody').innerHTML = table;


    }

}

let tmpInvo1;
let tmpInvo2;
let namInvoice,numInvoice;


let itemsReturn = [];
// console.log(invoice[invoice.length-1][tmpInvo2].myInvoice[0].titlePro)
function returnThis(x){
    namInvoice = invoice[invoice.length-1][tmpInvo2].myInvoice[x].namInvoice;
    numInvoice = invoice[invoice.length-1][tmpInvo2].myInvoice[x].numInvoice;
    titlePro.value = invoice[invoice.length-1][tmpInvo2].myInvoice[x].titlePro;
    quantityPro.value = invoice[invoice.length-1][tmpInvo2].myInvoice[x].quantityPro;
    price.value = invoice[invoice.length-1][tmpInvo2].myInvoice[x].price;
    moodSales = invoice[invoice.length-1][tmpInvo2].myInvoice[x].moodSales;
    console.log(moodSales)
    quantityPro.focus();
    tmpInvo1 = x;

    


}
let numItems,priceItems,tmpItems;
let datatInvoice = [];

function returnMe(){
    showData();
    let newItemsReturn;
    numItems = +quantityPro.value;
    priceItems = +price.value * +numItems;

    if(numInoice.value != '' && titlePro.value != '') {
        newItemsReturn = {
            namInvoice: namInvoice,
            numInvoice: numInvoice,
            date: dateNow,
            time: `${myDate.getHours()}:${myDate.getMinutes()}:${myDate.getSeconds()}`,
            invoiceNum : numInoice.value ,
            titlePro : titlePro.value,
            quantityPro : quantityPro.value,
            price : 0,
            state: 'مرتجع',
            detailsReturn: detailsReturn.value,
            moodSales:moodSales,
            


        }
        if(invoice[invoice.length-1][tmpInvo2].myInvoice[tmpInvo1].quantityPro > quantityPro.value){
            invoice[invoice.length-1][tmpInvo2].myInvoice[tmpInvo1].quantityPro -= +quantityPro.value;
            invoice[invoice.length-1][tmpInvo2].myInvoice.push(newItemsReturn);
            console.log('1')
            
            let myInvoice = invoice[invoice.length-1][tmpInvo2].myInvoice;
            ipcRenderer.send('return-invoice', {myInvoice, idSel})

            let data;
            for(let i=0;i<mydataPro[mydataPro.length-1].length; i++){
                if(invoice[invoice.length-1][tmpInvo2].myInvoice[tmpInvo1].moodSales == 'قطاعي'){
                    

                    tmpItems =  mydataPro[mydataPro.length-1][i]._id;
                    
                    data = mydataPro[mydataPro.length-1][i].myItems;
                    mydataPro[mydataPro.length-1][i].myItems.totalCount += +quantityPro.value;
                    ipcRenderer.send('return-items4', {...data, tmpItems})
                }else{

                    tmpItems =  mydataPro[mydataPro.length-1][i]._id;
                    data = mydataPro[mydataPro.length-1][i].myItems;
                    mydataPro[mydataPro.length-1][i].myItems.totalCount += (+quantityPro.value*mydataPro[mydataPro.length-1][i].myItems.countOne);
                    ipcRenderer.send('return-items4', {...data, tmpItems})
                }
                
                
            }
       
    
        }else if(invoice[invoice.length-1][tmpInvo2].myInvoice[tmpInvo1].quantityPro == quantityPro.value){
            console.log('2')
    
            invoice[invoice.length-1][tmpInvo2].myInvoice[tmpInvo1] = newItemsReturn;
        
            let myInvoice = invoice[invoice.length-1][tmpInvo2].myInvoice;
            ipcRenderer.send('return-invoice', {myInvoice, idSel})


            let data;
            for(let i=0;i<mydataPro[mydataPro.length-1].length; i++){

                if(newItemsReturn.titlePro == mydataPro[mydataPro.length-1][i].myItems.title){

                    if(invoice[invoice.length-1][tmpInvo2].myInvoice[tmpInvo1].moodSales == 'قطاعي'){


                        tmpItems =  mydataPro[mydataPro.length-1][i]._id;
                        console.log(tmpItems)
                        
                        data = mydataPro[mydataPro.length-1][i].myItems;
                        mydataPro[mydataPro.length-1][i].myItems.totalCount += +quantityPro.value;
                        ipcRenderer.send('return-items4', {...data, tmpItems})
                    }else{

                        tmpItems =  mydataPro[mydataPro.length-1][i]._id;
                        data = mydataPro[mydataPro.length-1][i].myItems;
                        mydataPro[mydataPro.length-1][i].myItems.totalCount += (+quantityPro.value*mydataPro[mydataPro.length-1][i].myItems.countOne);
                        ipcRenderer.send('return-items4', {...data, tmpItems})
                    }
                    
                    // itemsReturn.push(newItemsReturn);
    
                    // ipcRenderer.send('insert-return', itemsReturn)
            
                }
            }
       
        refresh();
        showData();


        }
        // console.log(invoice[invoice.length-1][tmpInvo2].myInvoice[tmpInvo1])

       

        

        
        
        refresh();
        getAllInvoice();


    }

    refresh();
    
}



function refresh() {
    window.location.reload();
}


let sales;
if(localStorage.mySales != null) {
    sales = JSON.parse(localStorage.mySales)
}else{
    sales = [];
}

let dateInvice =`${myDate.getFullYear()}${myDate.getMonth()+1}${myDate.getDate()}`;

function getNumInvoice(){
    if(localStorage.myInvoice != null) {
        for(let i = 0; i < invoice.length; i++) {
            numInoice.value = `${dateInvice}${invoice.length+1}`;
        }
    }else{
        numInoice.value = `${dateInvice}${1}`;
    }
}








const {ipcRenderer}=   require('electron')

let date = new Date();
let dateNow;

// let tmpMakeUp;
// let moodMakeUp = 'create';
// let search = document.querySelector('#search');



if(date.getMonth()+1 < 10 && date.getDate() < 10) {
    dateNow = `${date.getFullYear()}-0${date.getMonth()+1}-0${date.getDate()}`;
    
}else if(date.getMonth()+1 < 10 && date.getDate() > 10){
    dateNow = `${date.getFullYear()}-0${date.getMonth()+1}-${date.getDate()}`;
}else if(date.getMonth()+1 > 10 && date.getDate() < 10){
    dateNow = `${date.getFullYear()}-${date.getMonth()+1}-0${date.getDate()}`;
}else{
    dateNow = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
}

document.querySelector('#search').value = dateNow;

let invoices = [];
let searchStart,searchEnd;

let sales;
if(localStorage.mySales != null) {
    sales = JSON.parse(localStorage.mySales)
}else{
    sales = [];
}

let table;

let totalPrice = 0;
let totalGain = 0;

setTimeout(() => {
    ipcRenderer.send('get-Invoice', 'bing')
    ipcRenderer.on('get-Invoice',(e,args)=>{
        const myInvoice = JSON.parse(args)
        invoices.push(myInvoice)
        totalGain = 0;
        table = '';
        
        for(let i = 0; i < invoices[invoices.length-1].length; i++) {
            
            for(let x = 0; x < invoices[invoices.length-1][i].myInvoice.length; x++) {
                if(invoices[invoices.length-1][i].myInvoice[x] != ''){
                    if(invoices[invoices.length-1][i].myInvoice[x].state != 'مرتجع'){
                        totalPrice += +invoices[invoices.length-1][i].myInvoice[x].total;
                    }
                    table += `
                    <tr>
                        <td>${invoices[invoices.length-1][i].myInvoice[x].date}</td>
                        <td>${invoices[invoices.length-1][i].myInvoice[x].numInvoice}</td>
                        <td>${invoices[invoices.length-1][i].myInvoice[x].titlePro}</td>
                        <td>${invoices[invoices.length-1][i].myInvoice[x].moodSales}</td>
                        <td>${invoices[invoices.length-1][i].myInvoice[x].quantityPro}</td>
                        <td>${+invoices[invoices.length-1][i].myInvoice[x].total}</td>
                        <td>${invoices[invoices.length-1][i].myInvoice[x].state}</td>
                    </tr>
                `;
                }
               
   
            }
            
        }
        table += `
        <tr>
            <td colspan='5'>اجمالي المبيعات فقط</td>
            <td>${totalPrice}</td>
        </tr>
        `;        
        document.querySelector('.tbody').innerHTML = table;
        totalPrice = 0
        totalGain = 0;

        
    })
}, 10);

function getAllInvoice(){
    ipcRenderer.send('get-Invoice', 'bing')
    ipcRenderer.on('get-Invoice',(e,args)=>{
        const myInvoice = JSON.parse(args)
        invoices.push(myInvoice)
        table = '';
        
        for(let i = 0; i < invoices[invoices.length-1].length; i++) {
            
            for(let x = 0; x < invoices[invoices.length-1][i].myInvoice.length; x++) {
                if(invoices[invoices.length-1][i].myInvoice[x] != ''){
                    if(invoices[invoices.length-1][i].myInvoice[x].state != 'مرتجع'){
                        totalPrice += +invoices[invoices.length-1][i].myInvoice[x].total;

                    }
                    table += `
                    <tr>
                        <td>${invoices[invoices.length-1][i].myInvoice[x].date}</td>
                        <td>${invoices[invoices.length-1][i].myInvoice[x].numInvoice}</td>
                        <td>${invoices[invoices.length-1][i].myInvoice[x].titlePro}</td>
                        <td>${invoices[invoices.length-1][i].myInvoice[x].moodSales}</td>
                        <td>${invoices[invoices.length-1][i].myInvoice[x].quantityPro}</td>
                        <td>${+invoices[invoices.length-1][i].myInvoice[x].total}</td>
                        <td>${invoices[invoices.length-1][i].myInvoice[x].state}</td>
                    </tr>
                `;
                }
               
   
            }
            
        }
        table += `
        <tr>
            <td colspan='5'>اجمالي المبيعات فقط</td>

            <td>${totalPrice}</td>
        </tr>
        `;        
        document.querySelector('.tbody').innerHTML = table;
        totalPrice = 0
        totalGain = 0;
        
    })
}
getAllInvoice();

function addInvoice() {
    
}
addInvoice();

function closeTable(){
    document.querySelector('#tbDetails').style.display = 'none';
    document.querySelector('#tbInvoice').style.display = 'block';
}





function printInvoice(i){
    document.querySelector('header').style.display = 'none';
    window.print();
    refresh();
}

function closeDetails(){
    document.querySelector('header').style.display = 'flex';
    document.querySelector('#tbInvoice').style.display = 'block';
    document.querySelector('#tbDetails').style.display = 'none';



}

function searchInvoice(value){
    table = '';
    for(let i = 0; i < invoices[invoices.length-1].length; i++) {
            
        for(let x = 0; x < invoices[invoices.length-1][i].myInvoice.length; x++) {
           
            if(value == invoices[invoices.length-1][i].myInvoice[x].date ){
                

                if(invoices[invoices.length-1][i].myInvoice[x].state != 'مرتجع'){
                    totalPrice += +invoices[invoices.length-1][i].myInvoice[x].total;

                    }
                    table += `
                    <tr>
                        <td>${invoices[invoices.length-1][i].myInvoice[x].date}</td>
                        <td>${invoices[invoices.length-1][i].myInvoice[x].numInvoice}</td>
                        <td>${invoices[invoices.length-1][i].myInvoice[x].titlePro}</td>
                        <td>${invoices[invoices.length-1][i].myInvoice[x].moodSales}</td>
                        <td>${invoices[invoices.length-1][i].myInvoice[x].quantityPro}</td>
                        <td>${invoices[invoices.length-1][i].myInvoice[x].total}</td>
                        <td>${invoices[invoices.length-1][i].myInvoice[x].state}</td>
                    </tr>
                `;
                }
               
           

        }
        
    }
    table += `
    <tr>
        <td colspan='5'>اجمالي المبيعات فقط</td>

        <td>${totalPrice}</td>
    </tr>
    `;        
    document.querySelector('.tbody').innerHTML = table;
    totalPrice = 0;
    totalGain = 0;


}

function showInvoice(value){
    table = '';
    for(let i = 0; i < invoices[invoices.length-1].length; i++) {
            
        for(let x = 0; x < invoices[invoices.length-1][i].myInvoice.length; x++) {
           
            if(value == invoices[invoices.length-1][i].myInvoice[x].numInvoice){
                

                if(invoices[invoices.length-1][i].myInvoice[x].state != 'مرتجع'){
                    totalPrice += +invoices[invoices.length-1][i].myInvoice[x].total;

                    }
                    table += `
                    <tr>
                        <td>${invoices[invoices.length-1][i].myInvoice[x].date}</td>
                        <td>${invoices[invoices.length-1][i].myInvoice[x].numInvoice}</td>
                        <td>${invoices[invoices.length-1][i].myInvoice[x].titlePro}</td>
                        <td>${invoices[invoices.length-1][i].myInvoice[x].moodSales}</td>
                        <td>${invoices[invoices.length-1][i].myInvoice[x].quantityPro}</td>
                        <td>${invoices[invoices.length-1][i].myInvoice[x].total}</td>
                        <td>${invoices[invoices.length-1][i].myInvoice[x].state}</td>
                    </tr>
                `;
                }
               
           

        }
        
    }
    table += `
    <tr>
        <td colspan='5'>اجمالي المبيعات فقط</td>

        <td>${totalPrice}</td>
    </tr>
    `;        
    document.querySelector('.tbody').innerHTML = table;
    totalPrice = 0;
            totalGain = 0;
}

function refresh() {
    window.location.reload();
}

const {ipcRenderer}=   require('electron')
const QRCod = require('qrcode')
const JsBarcode = require('jsbarcode');
const barcode = require('barcode');

let myData = {
    name:'abdelmoaiz',
    email:'romyoooe2@gmail.com',
    phone:'01100865650',
}
let strMyData = JSON.stringify(myData);
let num = '099990090';
const data = {};
// JsBarcode("#barcode", "1234", {
//   format: "pharmacode",
//   lineColor: "#000",
//   width:4,
//   height:40,
//   displayValue: false
// });
// console.log(JsBarcode(`${document.querySelector('#barcode')}`, "rrrrrrrrrr!"))
// JsBarcode("#barcode", "rrrrrrrrrr!")
// QRCod.toString(num,function (err,code){
//     if(err) return console.log('error')
//     console.log(code)
// })
// QRCod.toString(strMyData,function (err,code){
//     if(err) return console.log('error')
//     console.log(code)
// })


// variable
let title = document.querySelector('#title');
let barcodeTotal = document.querySelector('#barcodeTotal');
let barcodeOne = document.querySelector('#barcodeOne');
let countTotal = document.querySelector('#countTotal');
let countOne = document.querySelector('#countOne');
let totalCount = document.querySelector('#totalCount');
let priceBuy = document.querySelector('#price-buy');
let priceSaleTotal = document.querySelector('#price-saleTotal');
let priceSaleOne = document.querySelector('#price-saleOne');
let dateExp = document.querySelector('#date-Exp');
let dateMfg = document.querySelector('#date-Mfg');
let create = document.querySelector('#create');
let mood = 'create';
let tmp;
// get total
let date = new Date();
let dateBarcode =`${date.getFullYear()}${date.getMonth()+1}${date.getDate()}`;
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
dateExp.value = dateMfg.value =dateNow;
function openInputs(){
    document.querySelector('.inputs').style.display = 'block';
    document.querySelector('.buttons').style.display = 'none';
    title.focus()
}

// QRCode.
let mydataPro;
if(localStorage.myData != null){
    mydataPro = JSON.parse(localStorage.myData)
}else{
    mydataPro = []
}
let idItems;

function getNumInvoice(){
    if(mydataPro[mydataPro.length-1].length != 0) {
        for(let i=0; i<mydataPro[mydataPro.length-1].length; i++){
                // console.log(mydataPro[mydataPro.length-1].length)
               
                idItems = 100 + +mydataPro[mydataPro.length-1].length+1;
                console.log(idItems)
                
            
            
        }
    }else{
        idItems = 101;
        console.log(idItems)

    }
    console.log(idItems)

}

function searchBarcodeTotal(value){
    for(let i=0; i<mydataPro[mydataPro.length-1].length; i++){
        let data = mydataPro[mydataPro.length-1];
        if(barcodeTotal.value == data[i].myItems.barcodeTotal){
            
           document.querySelector('.alarmBarcode').style.display = 'block';
        }else if(barcodeTotal.value == data[i].myItems.barcodeOne){
            document.querySelector('.alarmBarcode').style.display = 'block';

        }
    }
    // QRCod.toDataURL(value,function (err,code){
    //     if(err) return console.log('error')
    //     // console.log(code)
    //     document.querySelector('#imgQRTotal').setAttribute('src',`${code}`)
    // })
    document.querySelector('#allInputBarcode').style.display = 'flex';

    JsBarcode('#imgQRTotal', `${value}`)

    
}
function searchBarcodeOne(value){
    for(let i=0; i<mydataPro[mydataPro.length-1].length; i++){
        let data = mydataPro[mydataPro.length-1];
        if(barcodeOne.value == data[i].myItems.barcodeTotal){
            
           document.querySelector('.alarmBarcode').style.display = 'block';
        }else if(barcodeOne.value == data[i].myItems.barcodeOne){
            document.querySelector('.alarmBarcode').style.display = 'block';

        }
    }
    // QRCod.toDataURL(value,function (err,code){
    //     if(err) return console.log('error')
    //     // console.log(code)
    //     document.querySelector('#imgQROne').setAttribute('src',`${code}`)
    // })
    document.querySelector('#allInputBarcode').style.display = 'flex';
    JsBarcode('#imgQROne', `${value}`)

    
    
}
function containeOk(){
    // barcodeTotal.focus();
    document.querySelector('.alarmBarcode').style.display = 'none';

}

// create data 6224008179481  أفيروثيازيد 5 / 12.5 /40 مجم   ِaverothiazide 5 /12.5 / 40 mg

create.addEventListener('click',(e) => {
    // e.preventDefault();
    let newProduct;
    if(title.value != '' && countTotal.value != '' && countOne.value != '' && barcodeTotal.value != '' && barcodeOne.value != ''){
        newProduct = {
            barcodeTotal: barcodeTotal.value,
            barcodeOne: barcodeOne.value,
            title : title.value,
            countTotal: +countTotal.value ,
            countOne: +countOne.value,
            totalCount:+countOne.value* +countTotal.value,
            priceBuy: +priceBuy.value,
            priceSaleTotal: +priceSaleTotal.value,
            priceSaleOne: +priceSaleOne.value,
            dateMfg: dateMfg.value,
            dateExp: dateExp.value,
        }
        if(mood === 'create') {
            ipcRenderer.send('newItems',newProduct)
            // window.location.reload();

        }else if (mood === 'update'){
            ipcRenderer.send('update-items', {...newProduct, tmp})
            // window.location.reload();
            create.innerHTML = 'create';
            mood = 'create';

        }else if (mood === 'add'){
            newProduct = {
               
                barcodeTotal: barcodeTotal.value,
                barcodeOne: barcodeOne.value,
                title : title.value,
                countTotal: +addCountTotal + +countTotal.value,
                countOne: +countOne.value,
                totalCount: +addTotalCount + (+countOne.value * +countTotal.value),
                priceBuy: +priceBuy.value,
                priceSaleTotal: +priceSaleTotal.value,
                priceSaleOne: +priceSaleOne.value,
                dateMfg: dateMfg.value,
                dateExp: dateExp.value,
            }
            console.log(newProduct.count)
            ipcRenderer.send('update-items', {...newProduct, tmp})
            window.location.reload();
            mood = 'create';
            create.innerHTML = 'create';
        }
        

    }
    showData();

    // document.querySelector('.inputs').style.display = 'none';
    // document.querySelector('.buttons').style.display = 'flex';
    refresh();
    
})


function clearInput() {
    barcodeTotal.value = 
    barcodeOne.value = 
    title.value = 
    countTotal.value =
    countOne.value =
    priceBuy.value =
    priceSaleTotal.value = 
    priceSaleOne.value = 
    dateMfg.value = 
    dateExp.value = '';
    
    
}

// read data

setTimeout(() => {
    let tableItems= '';
    ipcRenderer.send('get-Data', 'bing')
    ipcRenderer.on('get-Data',(e,args)=>{
        const myData = JSON.parse(args)
        mydataPro.push(myData)
        let barcodeOne = '';
        tableItems= '';
        for(let i=0; i<mydataPro[mydataPro.length-1].length; i++){
            let data = mydataPro[mydataPro.length-1];
            barcodeOne = data[i].myItems.barcodeOne;
            // <td>${data[i].myItems.barcodeOne}</td>

            tableItems +=
            `
            <tr>
                <td>${i+1}</td>
                <td><button onclick="showBarcode('${data[i].myItems.barcodeTotal}');">عرض</button></td>
                <td><button onclick="showBarcode('${data[i].myItems.barcodeOne}');">عرض</button></td>
                <td>${data[i].myItems.title}</td>
                <td>${data[i].myItems.totalCount}</td>
                <td>${data[i].myItems.priceBuy}</td>
                <td>${data[i].myItems.priceSaleTotal}</td>
                <td>${data[i].myItems.priceSaleOne}</td>
                <td>${data[i].myItems.dateExp}</td>
                <td><button onclick="updateData('${data[i]._id}');">تعديل</button></td>
                <td><button onclick="addPro('${data[i]._id}');">اضافة</button></td>
                <td><button onclick="deleteData('${data[i]._id}');">حذف</button></td>
            </tr>
                
        `
        }
        
        document.querySelector('.tbody').innerHTML = tableItems;
        barcodeOne = '';

    })
    
}, 10);

function showBarcode(value){
    JsBarcode("#barcode1", `${value}`)
    JsBarcode("#barcode2", `${value}`)
    document.querySelector('.viewBarcode').style.display = 'flex';
    // document.querySelector('.viewBarcode').style.width = '100%';
    
}
function printBarcode(){
    document.querySelector('.btnBarcode').style.display = 'none';
    document.querySelector('header').style.display = 'none';
    document.querySelector('.cruds').style.display = 'none';

    window.print();
    refresh();
}

function hideDive(){
    document.querySelector('.viewBarcode').style.display = 'none';

}

function showData() {
    let tableItems= '';
    ipcRenderer.send('get-Data', 'bing')
    ipcRenderer.on('get-Data',(e,args)=>{
        const myData = JSON.parse(args)
        mydataPro.push(myData)
        tableItems= '';
        for(let i=0; i<mydataPro[mydataPro.length-1].length; i++){
            let data = mydataPro[mydataPro.length-1];
            tableItems += `
            <tr>
                <td>${i+1}</td>
                <td><button onclick="showBarcode('${data[i].myItems.barcodeTotal}');">عرض</button></td>
                <td><button onclick="showBarcode('${data[i].myItems.barcodeOne}');">عرض</button></td>
                <td>${data[i].myItems.title}</td>
                <td>${data[i].myItems.totalCount}</td>
                <td>${data[i].myItems.priceBuy}</td>
                <td>${data[i].myItems.priceSaleTotal}</td>
                <td>${data[i].myItems.priceSaleOne}</td>
                <td>${data[i].myItems.dateExp}</td>
                <td><button onclick="updateData('${data[i]._id}');">تعديل</button></td>
                <td><button onclick="addPro('${data[i]._id}');">اضافة</button></td>
                <td><button onclick="deleteData('${data[i]._id}');">حذف</button></td>
            </tr>
                
        `
        }
        
        document.querySelector('.tbody').innerHTML = tableItems;

    })
    
}
showData();
// 


// update data

function updateData(id) {
    for(let i=0; i<mydataPro[mydataPro.length-1].length; i++){
        if(mydataPro[mydataPro.length-1][i]._id == id){
            let data = mydataPro[mydataPro.length-1];
            barcodeTotal.value = data[i].myItems.barcodeTotal;
            barcodeOne.value = data[i].myItems.barcodeOne;
            title.value = data[i].myItems.title;
            countTotal.value = data[i].myItems.countTotal;
            countOne.value = data[i].myItems.countOne;
            totalCount.value = data[i].myItems.totalCount;
            priceBuy.value = data[i].myItems.priceBuy;
            priceSaleTotal.value = data[i].myItems.priceSaleTotal;
            priceSaleOne.value = data[i].myItems.priceSaleOne;
            dateMfg.value = data[i].myItems.dateMfg;
            dateExp.value = data[i].myItems.dateExp;
           
            create.innerHTML = 'تحديث بيانات الصنف';
            mood = 'update';
            tmp = id;
            openInputs();
            title.focus();
            scroll({
                top:0,
                behavior: "smooth",
            })
        }
    }
    
    
   
    
    
}
let addCountTotal;
let addTotalCount;

function addPro(id) {
    for(let i=0; i<mydataPro[mydataPro.length-1].length; i++){
        if(mydataPro[mydataPro.length-1][i]._id == id){
            let data = mydataPro[mydataPro.length-1];
            barcodeTotal.value = data[i].myItems.barcodeTotal;
            barcodeOne.value = data[i].myItems.barcodeOne;
            title.value = data[i].myItems.title;
            title.setAttribute('readonly','readonly');
            countTotal.value = '';
            countOne.value = data[i].myItems.countOne;
            countOne.setAttribute('readonly','readonly');
            addCountTotal = data[i].myItems.countTotal;
            addTotalCount = data[i].myItems.totalCount;
            priceBuy.value = data[i].myItems.priceBuy;
            priceBuy.setAttribute('readonly','readonly');
            priceSaleTotal.value = data[i].myItems.priceSaleTotal;
            priceSaleOne.value = data[i].myItems.priceSaleOne;
            priceSaleTotal.setAttribute('readonly','readonly');
            priceSaleOne.setAttribute('readonly','readonly');
            dateMfg.value = data[i].myItems.dateMfg;
            dateExp.value = data[i].myItems.dateExp;
            
            create.innerHTML = 'اضافة طلبية جديدة';
            mood = 'add';
            tmp = id;
            openInputs()
            countTotal.focus();

        }
    }
        
        

    
}

let IdDelete;
function deleteData(id) {
    document.querySelector('.alarm').style.display = 'block';
    IdDelete = id;
}

function searchItems(value){
    tableItems= '';
        for(let i=0; i<mydataPro[mydataPro.length-1].length; i++){
            let data = mydataPro[mydataPro.length-1];
            if(data[i].myItems.title.includes(value)  || data[i].myItems.barcodeOne.includes(value) || data[i].myItems.barcodeTotal.includes(value)){
                tableItems += `
                <tr>
                    <td>${i+1}</td>
                    <td><button onclick="showBarcode('${data[i].myItems.barcodeTotal}');">عرض</button></td>
                    <td><button onclick="showBarcode('${data[i].myItems.barcodeOne}');">عرض</button></td>
                    <td>${data[i].myItems.title}</td>
                    <td>${data[i].myItems.totalCount}</td>
                    <td>${data[i].myItems.priceBuy}</td>
                    <td>${data[i].myItems.priceSaleTotal}</td>
                    <td>${data[i].myItems.priceSaleOne}</td>
                    <td>${data[i].myItems.dateExp}</td>
                    <td><button onclick="updateData('${data[i]._id}');">تعديل</button></td>
                    <td><button onclick="addPro('${data[i]._id}');">اضافة</button></td>
                    <td><button onclick="deleteData('${data[i]._id}');">حذف</button></td>
                </tr>
                        
            `
            }
            
        }
        
        document.querySelector('.tbody').innerHTML = tableItems;
}

function checkPass(){
    ipcRenderer.send('delete-items',IdDelete)
    window.location.reload();
    showData();

}




function refresh() {
    window.location.reload();
}
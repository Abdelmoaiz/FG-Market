const {ipcRenderer}=   require('electron')
// variable
let typeItems = document.querySelector('#typeItems');

let title = document.querySelector('#title');
let barcode = document.querySelector('#barcode');

let create = document.querySelector('#create');
let mood = 'create';
let tmp;
// get total
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

let dateBarcode =`${date.getFullYear()}${date.getMonth()+1}${date.getDate()}`;

function openInputs1(){
    document.querySelector('.inputs1').style.display = 'block';
    document.querySelector('.buttons').style.display = 'none';
    title.focus()
}



let items = [];

function searchBarcode(){
    for(let i=0; i<items[items.length-1].length; i++){
        let data = items[items.length-1];
        if(barcode.value == data[i].myItems.barcode){
            document.querySelector('.alarm2').style.display = 'block';
        }
    }
   
    
}

let idItems;
function getIdItems(){
    ipcRenderer.send('get-Data', 'bing')
    ipcRenderer.on('get-Data',(e,args)=>{
        const myData = JSON.parse(args)
        items.push(myData)
        if(items.length != 0 && items[items.length-1].length !=0){
            idItems = items[items.length-1].length;
        }else{
            idItems = 0;

        }
    })

    
}


function checkBarcode(){
    document.querySelector('.alarm2').style.display = 'none';
    title.focus();

}

function cancel(){
    document.querySelector('.alarm2').style.display = 'none';
    barcode.value = '';
    barcode.focus();
}
// create data
let startId = 0;
let endId = 1000;

create.addEventListener('click',(e) => {
    // e.preventDefault();
    let newItems;
    if(title.value != '' ){
        newItems = {
            date:dateNow,
            idItems: items[items.length-1].length,
            title : title.value,
            typeItems : typeItems.value,
        }
        if(mood === 'create') {
            ipcRenderer.send('newItems',newItems)

        }else if (mood === 'update'){
            ipcRenderer.send('update-items', {...newItems, tmp})
            create.innerHTML = 'create';
            mood = 'create';

        }
        

    }
    window.location.reload();

    showData();




}) 

// read data
let totalBuy = 0;
let totalSales = 0;
let totalSalesAll = 0;

function showData() {
    let tableItems= '';
    ipcRenderer.send('get-Data', 'bing')
    ipcRenderer.on('get-Data',(e,args)=>{
        const myData = JSON.parse(args)
        items.push(myData)
        tableItems= '';
        for(let i=startId; i<endId; i++){
            for(let x=0; x<items[items.length-1].length; x++){
                if(i == items[items.length-1][x].myItems.idItems){
                    let data = items[items.length-1];
                    tableItems += `
                        <tr>
                                <td>${i+1}</td>
                                <td>${data[x].myItems.date}</td>
                                <td>${data[x].myItems.title}</td>                       
                                <td>${data[x].myItems.typeItems}</td>                       
                                <td><button onclick="updateData('${data[x]._id}');">تعديل</button></td>
                                <td><button onclick="deleteData('${data[x]._id}');">حذف</button></td>
                        </tr>
                                
                    `
                }
            }
           
        }
        
        document.querySelector('.tbody').innerHTML = tableItems;
        

    })
    
}
showData();
// 


// update data

function updateData(id) {
    document.querySelector('.inputs1').style.display = 'block';

    for(let i=0; i<items[items.length-1].length; i++){
        if(items[items.length-1][i]._id == id){
            let data = items[items.length-1];
            title.value = data[i].myItems.title;
            
            create.innerHTML = 'تحديث بيانات الصنف';
            mood = 'update';
            tmp = id;
            title.focus();
            scroll({
                top:0,
                behavior: "smooth",
            })
        }
    }
    
    
   
    
    
}
let totalCount;



let IdDelete;
function deleteData(id) {
    document.querySelector('.alarm1').style.display = 'block';
    IdDelete = id;
}

function checkPass(){
    ipcRenderer.send('delete-items',IdDelete)
    window.location.reload();
    showData();

}

function searchItems(value){
    tableItems= '';
        for(let i=0; i<items[items.length-1].length; i++){
            let data = items[items.length-1];
            if(data[i].myItems.title.includes(value)  || data[i].myItems.barcode.includes(value)){
                tableItems += `
                    <tr>
                        <td>${i+1}</td>
                        <td>${data[i].myItems.date}</td>
                        <td>${data[i].myItems.barcode}</td>
                        <td>${data[i].myItems.title}</td>
                        
                        <td><button onclick="updateData('${data[i]._id}');">تعديل</button></td>
                        <td><button onclick="deleteData('${data[i]._id}');">حذف</button></td>
                    </tr>
                        
                `
            }
            
        }
        
        document.querySelector('.tbody').innerHTML = tableItems;
}


function refresh() {
    window.location.reload();
}
let date = new Date();
let userName = document.querySelector('.userName');
let dateAndTime = document.querySelector('.dateAndTime');
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
userName.innerHTML = localStorage.getItem('userNameView');

let fromDate = document.querySelector('#fromDate');
let toDate = document.querySelector('#toDate');
let searchReports = document.querySelector('#searchReports');
dateAndTime.innerHTML = fromDate.value = toDate.value = dateNow;


let tableExp = document.querySelector('.tableExpenses');
let tableSalary = document.querySelector('.tableSalary');
let tableImports = document.querySelector('.tableImports');
let tableSupp = document.querySelector('.tableSuppliers');
let tableMake = document.querySelector('.tableMakeUp');

function showAllReports(){
    tableExp.style.display = 'block';
    tableSalary.style.display = 'block';
    tableImports.style.display = 'block';
    tableSupp.style.display = 'block';
    tableMake.style.display = 'block';
}

function showReportsExpenses(){
    tableExp.style.display = 'block';
    tableSalary.style.display = 'none';
    tableImports.style.display = 'none';
    tableSupp.style.display = 'none';
    tableMake.style.display = 'none';
}
function showReportsSalary(){
    tableExp.style.display = 'none';
    tableSalary.style.display = 'block';
    tableImports.style.display = 'none';
    tableSupp.style.display = 'none';
}

function showReportsImports(){
    tableExp.style.display = 'none';
    tableSalary.style.display = 'none';
    tableImports.style.display = 'block';
    tableSupp.style.display = 'none';
}
function showReportsSuppliers(){
    tableExp.style.display = 'none';
    tableSalary.style.display = 'none';
    tableImports.style.display = 'none';
    tableSupp.style.display = 'block';
}


let expenses;
if(localStorage.myExpenses != null){
    expenses = JSON.parse(localStorage.myExpenses)
}else{
    expenses = []
}


let tableExpen;

function showExpenses() {
    tableExpen ='';
    for(let i=0; i< expenses.length; i++){
        tableExpen += `
        <tr>
            <td>${i+1}</td>
            <td>${expenses[i].expensesDate}</td>
            <td>${expenses[i].user}</td>
            <td>${expenses[i].expensesType}</td>
            <td>${expenses[i].price}</td>
        </tr>
    `
            
        
    }

    document.querySelector('.tbodyReportsExpen').innerHTML = tableExpen;

    
}
showExpenses();

let result = 0;

function getTotalExpenses() {
    for(let i = 0; i < expenses.length; i++){
        result += +expenses[i].price;
    }
    tableExpen += `
        <tr style='border:2px solid'>
            <th colspan='4' >الاجمالي</th>
            <th >${result}</th>
            
        </tr>
        `
    document.querySelector('.tbodyReportsExpen').innerHTML = tableExpen;
    result = 0;
}
getTotalExpenses();








let allSalary;
if(localStorage.mySalary != null){
    allSalary = JSON.parse(localStorage.mySalary)
}else{
    allSalary = [];
}

let tableSala;
function showEmployees() {
    tableSala ='';
    for(let i=0; i< allSalary.length; i++){
        tableSala += `
        <tr>
            <td>${i+1}</td>
            <td>${allSalary[i].date}</td>
            <td>${allSalary[i].name}</td>
            <td>${allSalary[i].month}</td>
            <td>${allSalary[i].salary}</td>
            <td>${allSalary[i].paidPay}</td>
            <td>${allSalary[i].salary - allSalary[i].paidPay}</td>
        </tr>
    `
            
        
    }

    document.querySelector('.tbodySalarys').innerHTML = tableSala;

}
showEmployees();

let resultSalary = 0;
let resultSalaryPaid = 0;
let resultSalaryRemain = 0;

function getSalary(){
    for(let i=0; i< allSalary.length; i++){
        resultSalary += +allSalary[i].salary;
        resultSalaryPaid += +allSalary[i].paidPay;
        resultSalaryRemain += (+allSalary[i].salary - +allSalary[i].paidPay)

    }
    tableSala += `
        <tr>
            <th colspan='4'>الاجمالي</th>
            <th>${resultSalary}</th>
            <th>${resultSalaryPaid}</th>
            <th>${resultSalaryRemain}</th>
        </tr>
    `
            
    document.querySelector('.tbodySalarys').innerHTML = tableSala;
    resultSalary = 0;
    resultSalaryPaid = 0;
    resultSalaryRemain = 0;
}

getSalary();












let reserve ;
if(localStorage.myReserve != null){
    reserve = JSON.parse(localStorage.myReserve);
}else{
    reserve = []
}
function getDateNow(){
    toDate.value = fromDate.value;
    // showAllReports2();

}
getDateNow();

function searchDateNow() {
    // showAllReports2();
}



let trTableRports =  document.querySelectorAll('.trTableRports');






let suppliers;
if(localStorage.mySuppliers != null){
    suppliers = JSON.parse(localStorage.mySuppliers)
}else{
    suppliers =[];
}


let tableSuppliers;

function showDetailsSuppliers(){
    tableSuppliers = '';
    for(let i=0; i<suppliers.length; i++){
        tableSuppliers += `
                <tr>
                    <td>${i+1}</td>
                    <td>${suppliers[i].date}</td>
                    <td>${suppliers[i].user}</td>
                    <td>${suppliers[i].nameSuppliers}</td>
                    <td>${suppliers[i].typeItems}</td>
                    <td>${suppliers[i].Totalprice}</td>
                    <td>${suppliers[i].paidSuppliers}</td>
                    <td class='remainSuppliers'>${suppliers[i].remainSuppliers}</td>
                    

                </tr>
                `
    }
    document.querySelector('.tbodySuppliers').innerHTML = tableSuppliers;
}
showDetailsSuppliers();
let totalPriceSuppliers = 0;
let totalPaidSuppliers = 0;
let totalRemainSuppliers = 0;

function showTotalSuppliers(){
    for(let i=0; i<suppliers.length; i++){
        totalPriceSuppliers += +suppliers[i].Totalprice;
        totalPaidSuppliers += +suppliers[i].paidSuppliers;
        totalRemainSuppliers += +suppliers[i].remainSuppliers;

        
    }
    tableSuppliers += `
    <tr>
        <th colspan='5'>الاجمالي</th>
        <th>${totalPriceSuppliers}</th>
        <th>${totalPaidSuppliers}</th>
        <th class='remainMakeUp'>${totalRemainSuppliers}</th>
    </tr>
        `
    document.querySelector('.tbodySuppliers').innerHTML = tableSuppliers;
    totalPriceSuppliers = 0;
    totalPaidSuppliers = 0;
    totalRemainSuppliers = 0;
}
showTotalSuppliers();

// let newTableTotal;

// function showTotalReports(){
//     newTableTotal = '';
//     let totalReserRep = 0;
//     let dateReserve = 0;

//     for(let i = 0; i < reserve.length; i++){
//         if(fromDate.value <= reserve[i].date && toDate.value >= reserve[i].date){
//             totalReserRep += +reserve[i].paid
//             dateReserve = reserve[i].date
            
//         }else{
//             newTableTotal = '';

//         }
//     }
//     newTableTotal += `
//                 <tr>
//                     <td>${dateReserve}</td>
//                     <td>ايرادات حجز</td>
//                     <td></td>
//                     <td>${totalReserRep}</td>

//                 </tr>
//             `
//     document.querySelector('.tbodyTotalReports').innerHTML = newTableTotal;

//     let totalSalaRep = 0;
//     let dateSalar = 0;

//     for(let i=0; i< allSalary.length; i++){
//         if(fromDate.value <= allSalary[i].date && toDate.value >= allSalary[i].date){
//             totalSalaRep += +allSalary[i].paidPay
//             dateSalar = allSalary[i].date
            
//         }else{
//             newTableTotal = '';
//         }
//     }
//     newTableTotal += `
//                 <tr>
//                     <td>${dateSalar}</td>
//                     <td>مرتبات</td>
//                     <td>${totalSalaRep}</td>
//                     <td></td>

//                 </tr>
//             `
//     document.querySelector('.tbodyTotalReports').innerHTML = newTableTotal;
//     newTableTotal = '';
// }
// showTotalReports();



let tableRports22 ='';

function searchReport() {
    // showTotalReports();
    
    for(let i=0; i<suppliers.length; i++){
        if(fromDate.value <= suppliers[i].date && toDate.value >= suppliers[i].date){
            showDetailsSuppliers();
            showTotalSuppliers()
        }else{
            tableSuppliers = '';
            document.querySelector('.tbodySuppliers').innerHTML = tableSuppliers;
        }

    }
    
    for(let i=0; i< allSalary.length; i++){
        if(fromDate.value <= allSalary[i].date && toDate.value >= allSalary[i].date){
            showEmployees();
        }else{
            tableSala ='';
            document.querySelector('.tbodySalarys').innerHTML = tableSala;
        }
    }
    for(let i = 0; i < expenses.length; i++){
        if(fromDate.value <= expenses[i].expensesDate && toDate.value >= expenses[i].expensesDate){
            showExpenses();
            getTotalExpenses()

        }else{

            tableExpen = '';
            document.querySelector('.tbodyReportsExpen').innerHTML = tableExpen;

        }

    }
           
        
    
}


let fromD = '2023-07-10';
let toD = '2023-07-30';



function printReport(){
    document.querySelector('.inputs').style.display = 'none';
    document.querySelector('header').style.display = 'none';
    document.querySelector('aside').style.display = 'none';
    document.querySelector('.content').style.width = '100%';
    document.querySelector('.cancel').style.display = 'block';
    window.print();
}

function refresh(){
    window.location.reload();
}
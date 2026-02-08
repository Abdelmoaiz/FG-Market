const Datastore = require('nedb')
const users = new Datastore({filename:'db/allUsers.db', autoload:true})
const reserve = new Datastore({filename:'db/myReserve.db', autoload:true})
const expenses = new Datastore({filename:'db/myExpenses.db', autoload:true})
const employeesMakeUp = new Datastore({filename:'db/myEmployeesMakeUp.db', autoload:true})
const userNameView = new Datastore({filename:'db/userNameView.db', autoload:true})
const items = new Datastore({filename:'db/myItems.db', autoload:true})
const suppliers = new Datastore({filename:'db/mySuppliers.db', autoload:true})
const salary = new Datastore({filename:'db/mySalary.db', autoload:true})
const employees = new Datastore({filename:'db/myEmployees.db', autoload:true})


const {ipcMain, ipcRenderer} = require('electron')

users.loadDatabase();
reserve.loadDatabase();
expenses.loadDatabase();
employeesMakeUp.loadDatabase();
userNameView.loadDatabase();
items.loadDatabase();
suppliers.loadDatabase();
salary.loadDatabase();
employees.loadDatabase();


console.log('server is runing and database');

ipcMain.on('userNameView',(e, userLogin)=>{
  userNameView.insert({userLogin})
      console.log(userLogin);
      e.sender.send('dataUser', userLogin)
   
});
ipcMain.on('allUsers',(e, allUsers)=>{
  users.insert({allUsers})
      console.log(allUsers);
   
});
ipcMain.on('myReserve',(e, myReserve)=>{
  reserve.insert({myReserve})
});
// const allReserve =[];
reserve.find({},(e,dataReserve)=>{
  // allReserve = dataReserve;
  console.log(dataReserve)
  ipcMain.on('dataR', (e,args)=>{
    console.log(args)

    e.sender.send('allReserve', dataReserve)
  })
})
ipcMain.on('myExpenses',(e, myExpenses)=>{
  expenses.insert({myExpenses})
  console.log(myExpenses);

  
});
ipcMain.on('myItems',(e, myItems)=>{
  items.insert({myItems})
  console.log(myItems);

  
});

ipcMain.on('myEmployees',(e, myEmployees)=>{
  employees.insert({myEmployees})
  console.log(myEmployees);

  
});
ipcMain.on('mySalary',(e, mySalary)=>{
  salary.insert({mySalary})
  console.log(mySalary);

  
});
ipcMain.on('myEmployeesMakeUp',(e, myEmployeesMakeUp)=>{
  employeesMakeUp.insert(myEmployeesMakeUp)
  console.log(myEmployeesMakeUp);

  
});

ipcMain.on('mySuppliers',(e, mySuppliers)=>{
  suppliers.insert(mySuppliers)
  console.log(mySuppliers);


  
});
// userNameView.find({},(e, data)=> {
//   ipcMain.on('data' , (e, daNe) =>{
//     const NewData = data;
//         e.sender.send('data2' , NewData)

// })

//   })

//   userNameView.
  
// // ipcMain.on('ch1',(e,args) =>{
// //   console.log(args)
// //   e.sender.send('ch2', "pong")
// // })

// console.log('this page is main')

// // ipcMain.on('data', (e,args) =>{
// //   console.log(args)
// // })
// const daNe2 = 'my Love Yassin';
// const daNe3 = ['yassin','jana','mohammed'];
// const myChildren = {
//   name:'yassin',
//   age:7,

// }


// ipcMain.on('data' , (e, daNe) =>{
//     console.log(daNe)

    
//     e.sender.send('data2' , myChildren)

// })
// ipcMain.on('new-task',(e, args)=>{
//     const newTask = new Task(args);
//     const TaskSave = newTask.save();
//     console.log(args);
//     console.log(TaskSave)
//     e.reply('new-task-create', TaskSave)
//   });

// module.exports = {database, database2}
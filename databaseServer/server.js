const DataStore = require('nedb');

const items = new DataStore({filename:"db/myItems.db",autoload:true})
const invoice = new DataStore({filename:"db/myInvoice.db",autoload:true})
const invoicebuy = new DataStore({filename:"db/myInvoiceBuy.db",autoload:true})
const purchases = new DataStore({filename:"db/myPurchases.db",autoload:true})
const clients = new DataStore({filename:"db/myClients.db",autoload:true})
const retuenInvoice = new DataStore({filename:"db/myetuenInvoice.db",autoload:true})
const expenses = new DataStore({filename:"db/myExpenses.db",autoload:true})
const user = new DataStore({filename:"db/myUser.db",autoload:true})
const suppliers = new DataStore({filename:'db/mySuppliers.db', autoload:true})
const partner = new DataStore({filename:'db/myPartner.db', autoload:true})
const customer = new DataStore({filename:'db/myCustomer.db', autoload:true})
const test = new DataStore({filename:'db/myTest.db', autoload:true})
const creditorCustomer = new DataStore({filename:'db/myCreditorCustomer.db', autoload:true})



const { ipcMain } = require("electron")

items.loadDatabase();
invoice.loadDatabase();
invoicebuy.loadDatabase();
purchases.loadDatabase();
clients.loadDatabase();
retuenInvoice.loadDatabase();
expenses.loadDatabase();
suppliers.loadDatabase();
customer.loadDatabase();
partner.loadDatabase();
creditorCustomer.loadDatabase();

user.loadDatabase();
test.loadDatabase();


// test.update({_id:'cIHZw3BlTNVUzFOx'},'123')



console.log('server is running with database');



ipcMain.on('allUsers',(e, args)=>{
    user.insert(args)
    e.sender.send('data-created',JSON.stringify(args))
    // console.log(newData)
})


// ipcMain.on('newInvoiceBuy',(e, args)=>{
//   invoicebuy.insert({"newInvoiceBuy":args})
//     e.sender.send('newInvoiceBuy',JSON.stringify(args))
// })

// ipcMain.on('get-invoiceSup',(e,arg)=>{

//   invoicebuy.find({},(e,args)=>{
//     ipcMain.on('get-invoiceSup', (e,da)=>{
//       e.sender.send('get-invoiceSup', JSON.stringify(args))
//     })
//   })
// })

// ipcMain.on('update-invoiceSup',(e,args)=>{
//   invoicebuy.update({_id:args.tmpId},args)
// })
// ipcMain.on('update-invoiceSup',(e,args)=>{
//   invoicebuy.update({_id:args.idSelect},args)
// })
// ipcMain.on('update-InvoiceSup',(e,args)=>{
//   invoicebuy.update({_id:args.tmpIdUpdate},args)
// })

// ipcMain.on('return-items',(e,args)=>{
//   invoicebuy.update({_id:args.tmpItems},args)
// })
// ipcMain.on('delete-InvoiceSup',(e,args)=>{
//   invoicebuy.remove({_id:args},{},(e,dataRemove)=>{
//   })
// })

ipcMain.on('newItems',(e, args)=>{
    items.insert({"myItems":args})
    e.sender.send('newItems',JSON.stringify(args))
})

ipcMain.on('get-Data',(e,arg)=>{

    items.find({},(e,args)=>{
      ipcMain.on('get-Data', (e,da)=>{
        e.sender.send('get-Data', JSON.stringify(args))
      })
    })
  })


  
ipcMain.on('update-items',(e,args)=>{
    items.update({_id:args.tmp},{myItems:args})
})
  
ipcMain.on('return-items4',(e,args)=>{
    items.update({_id:args.tmpItems},{myItems:args})
})
  

  
ipcMain.on('delete-items',(e,args)=>{
  items.remove({_id:args},{},(e,dataRemove)=>{
  })
})
  

ipcMain.on('insert-return',(e, args)=>{
    retuenInvoice.insert(args)
    e.sender.send('returnInvoice',JSON.stringify(args))
    // console.log(newData)
})



ipcMain.on('newInvoice',(e,id, args)=>{
    invoice.insert({'myInvoice':args,_id:id})
    e.sender.send('newInvoice',JSON.stringify(args))
})

 
ipcMain.on('update-items2',(e,args)=>{
  items.update({_id:args.idSelect},{myItems:args})
})


ipcMain.on('update-items3',(e,args)=>{
  items.update({_id:args.tmpId},{myItems:args})
})


ipcMain.on('return-items2',(e,args)=>{
  items.update({_id:args.idData},{myItems:args})
})




ipcMain.on('return-invoice',(e,args)=>{
  invoice.update({_id:args.idSel},args)
})
ipcMain.on('return-invoice',(e,args)=>{
  customer.update({_id:args.idSel},args)
})


ipcMain.on('get-Invoice',(e,arg)=>{

  invoice.find({},(e,args)=>{
    ipcMain.on('get-Invoice', (e,da)=>{
      e.sender.send('get-Invoice', JSON.stringify(args))
    })
  })
})


ipcMain.on('get-expenses',(e,arg)=>{

  expenses.find({},(e,args)=>{
    ipcMain.on('get-expenses', (e,da)=>{
      e.sender.send('get-expenses', JSON.stringify(args))
    })
  })
})


ipcMain.on('newExpenses',(e, args)=>{
    expenses.insert(args)
    e.sender.send('newExpenses',JSON.stringify(args))
    // console.log(newData)
})

ipcMain.on('update-expenses',(e,args)=>{
  expenses.update({_id:args.tmp},args)
})

ipcMain.on('delete-expenses',(e,args)=>{
  expenses.remove({_id:args},{},(e,dataRemove)=>{
  })
})

ipcMain.on('newClient',(e, args)=>{
  clients.insert({"myClientInvoice":args})
  e.sender.send('newClient',JSON.stringify(args))
  // console.log(newData)
})


ipcMain.on('get-clientInvoice',(e,arg)=>{

  clients.find({},(e,args)=>{
    ipcMain.on('get-clientInvoice', (e,da)=>{
      e.sender.send('get-clientInvoice', JSON.stringify(args))
    })
  })
})


ipcMain.on('update-invoice',(e,args)=>{
  clients.update({_id:args.tmpId},args)
})

ipcMain.on('update-invoice2',(e,args)=>{
  clients.update({_id:args.idClientMain},args)
})




ipcMain.on('mySuppliers',(e, mySuppliers,id)=>{
  suppliers.insert({'mySuppliers':mySuppliers,_id:id})  
});


ipcMain.on('get-suppliers',(e,arg)=>{
  suppliers.find({},(e,mySuppliers)=>{
    ipcMain.on('get-suppliers', (e,da)=>{
      e.sender.send('get-suppliers', JSON.stringify(mySuppliers))

    })
  })
})


ipcMain.on('update-suppliers',(e,args)=>{
  suppliers.update({_id:args.tmpId},args)
})


ipcMain.on('delete-suppliers',(e,args)=>{
  suppliers.remove({_id:args},{},(e,dataRemove)=>{
  })
})
ipcMain.on('myCustomer',(e, mySuppliers,id)=>{
  customer.insert({"mySuppliers":mySuppliers,_id:id})  
});


ipcMain.on('get-Customer',(e,arg)=>{
  customer.find({},(e,mySuppliers)=>{
    ipcMain.on('get-Customer', (e,da)=>{
      e.sender.send('get-Customer', JSON.stringify(mySuppliers))

    })
  })
})


ipcMain.on('update-customer',(e,args)=>{
  customer.update({_id:args.tmp},{"mySuppliers":args})
})
ipcMain.on('update-customer',(e,args)=>{
  customer.update({_id:args.idClientMain},args)
})
ipcMain.on('update-invoice',(e,args)=>{
  customer.update({_id:args.tmpId},args)
})


ipcMain.on('delete-Customer',(e,args)=>{
  customer.remove({_id:args},{},(e,dataRemove)=>{
  })
})



ipcMain.on('myPartner',(e, args)=>{
  partner.insert({"myPartner":args})  
});

ipcMain.on('get-Partner',(e,arg)=>{
  partner.find({},(e,myPartner)=>{
    ipcMain.on('get-Partner', (e,da)=>{
      e.sender.send('get-Partner', JSON.stringify(myPartner))

    })
  })
})


ipcMain.on('update-Partner',(e,args)=>{
  partner.update({_id:args.tmpId},args)
})


ipcMain.on('delete-Partner',(e,args)=>{
  partner.remove({_id:args},{},(e,dataRemove)=>{
  })
})


ipcMain.on('myCreditorCustomer',(e, mySuppliers)=>{
  creditorCustomer.insert({"myCreditorCustomer":mySuppliers})  
});


ipcMain.on('get-creditorCustomer',(e,arg)=>{
  creditorCustomer.find({},(e,mySuppliers)=>{
    ipcMain.on('get-creditorCustomer', (e,da)=>{
      e.sender.send('get-creditorCustomer', JSON.stringify(mySuppliers))

    })
  })
})


ipcMain.on('update-creditorCustomer',(e,args)=>{
  creditorCustomer.update({_id:args.tmpId},args)
})
ipcMain.on('update-creditorCustomer',(e,args)=>{
  creditorCustomer.update({_id:args.id},{"myCreditorCustomer":args})
})


ipcMain.on('delete-creditorCustomer',(e,args)=>{
  creditorCustomer.remove({_id:args},{},(e,dataRemove)=>{
  })
})


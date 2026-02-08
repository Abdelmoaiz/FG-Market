let username = document.querySelector("#username");
let password = document.querySelector("#password");
let btnSignIn = document.querySelector(".btn-signIn");
const {ipcRenderer}=   require('electron')

let date = new Date();
let timeNow = `${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`;
let dateNow = `${date.getFullYear()}-0${date.getMonth()+1}-0${date.getDate()}`;

let users;
if(localStorage.allUsers != null){
    users = JSON.parse(localStorage.allUsers);
}else{
    users = []
}
let userNameView ;
let job;
// if(localStorage.userNameView != null){
//     userNameView = JSON.parse(localStorage.userNameView);
// }else{
//     userNameView = []
// }
btnSignIn.onclick = (e) =>{
    // e.preventDefault();
    btnSignIn.href = "./Component/home/home.html";
    // if(username.value == 'عبدالمعز' && password.value == '0164342246'){
    //     btnSignIn.href = "./Component/home/home.html";
    //     userNameView = username.value;
    //     job = 'it';

    // }else if(username.value == 'احمد' && password.value == '2'){
    //     btnSignIn.href = "./Component/home/home.html";
    //     userNameView = username.value;
    //     job = 'it';

    // }else{
    //     for(let i=0; i<users.length;i++){
    //         if(username.value === users[i].user && password.value === users[i].password ){
            
    //             btnSignIn.href = "./Component/home/home.html";
    //             userNameView = username.value;
                
        
    //         }
    //     }
    // }
    localStorage.setItem('userNameView',userNameView);
    ipcRenderer.send('userNameView',{user:userNameView,date:dateNow,time:timeNow})
    // btnSignIn.reset();


    // e.preventDefault();
    
    
}
userNameView = localStorage.getItem('userNameView');



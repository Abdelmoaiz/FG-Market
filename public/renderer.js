let username = document.querySelector("#username");
let password = document.querySelector("#password");
let btnSignIn = document.querySelector(".btn-signIn");

let users;
if(localStorage.allUsers != null){
    users = JSON.parse(localStorage.allUsers);
}else{
    users = []
}
// console.log(users[0].password)
btnSignIn.onclick = (e) =>{
    for(let i=0; i<users.length;i++){
        if(username.value === users[i].user && password.value === users[i].password){
        
            btnSignIn.href = "./Component/home/home.html"
    
        }
    }
    
}

// /Component/home/home.html
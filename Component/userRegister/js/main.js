let newUser = document.querySelector("#newUser");
let newpassword = document.querySelector("#newpassword");
let job = document.querySelector("#job");
let register = document.querySelector(".register");
let tmp;
let mood = 'create';
let users;
const {ipcRenderer}=   require('electron')

if(localStorage.allUsers != null){
    users = JSON.parse(localStorage.allUsers);
}else{
    users = []
}

register.onclick = function(){
    let objUsers = {
        user: newUser.value,
        password: newpassword.value,
        job: job.value
    }
    if(mood == 'create'){
        users.push(objUsers);
        ipcRenderer.send('allUsers',objUsers)


    }else{
        users[tmp] = objUsers;
        // ipcRenderer.send('update-allUsers',objUsers)

        ipcRenderer.send('update-allUsers',{...objUsers, tmp})
        mood= 'create';

    }
    localStorage.setItem("allUsers", JSON.stringify(users));
    window.location.reload();
}




function showUsers(){
    let tableUsers = '';
    for(let i = 0; i<users.length; i++){
        tableUsers += `
            <tr>
                <td>${i+1}</td>
                <td>${users[i].user}</td>
                <td>${users[i].job}</td>
                <td onclick="updateUser(${i});"><button>تعديل الحساب</button></td>
                <td onclick="deleteUser(${i});"><button>حذف الحساب</button></td>
            </tr>
        
        `
    }
    document.querySelector('.tbodyUsers').innerHTML = tableUsers;
}
showUsers();

function clearInputs() {
    newUser.value =
    newpassword.value = "";
}
function updateUser(i){
    document.querySelector('.user').style.display = 'block';
    document.querySelector('#btnOpenInputs').style.display = 'none';
            newUser.value = users[i].user;
            newpassword.value = users[i].password;
            job.value = users[i].job;
            mood = 'update';
            register.innerHTML = "تحديث بيانات"
            tmp = i;
            newUser.focus();
            scroll({
                top:0,
                behavior: "smooth",
            })
            document.querySelector('.alarm').style.display = 'none';

        
            
    

}

let tmpIdDelete;
function deleteUser(i){
    for(let x=0; x<users.length;x++){
        if((users[x].job == 'it' || users[x].job == 'مدير')) {
            document.querySelector('.alarm').style.display = 'flex';
            tmpIdDelete = i;
        }
    }
    
}


let inpuCheckPass = document.querySelector('#passCheck');

function checkPass(){
        users.splice(tmpIdDelete,1);        
        ipcRenderer.send('deleteUser',tmpIdDelete)
        localStorage.setItem('allUsers',JSON.stringify(users));
        window.location.reload();
}

function exitePass(i) {
    inpuCheckPass.value = '';
    document.querySelector('.alarm').style.display = 'none';

}

function showInputs() {
    document.querySelector('.user').style.display = 'block';
    document.querySelector('#btnOpenInputs').style.display = 'none';
}


let users;
if(localStorage.allUsers != null){
    users = JSON.parse(localStorage.allUsers);
}else{
    users = []
}



let spcUser;
if(localStorage.mySpcUser != null){
    spcUser = JSON.parse(localStorage.mySpcUser);
}else{
    spcUser = []
}
let userName = localStorage.getItem('userNameView');
let userDeveloper = {user: "عبدالمعز",password:'0164342246',job:'it'};
let inpuCheckPass = document.querySelector('#passCheck');

let linkPage;
function goToPage(link) {
    document.querySelector('.divAlarm').style.display = 'flex';
    linkPage = link;
    inpuCheckPass.focus();


}

function goToPage2(link) {
    document.querySelector('.divAlarm').style.display = 'flex';
    linkPage = link;
    inpuCheckPass.focus();


}




function checkPass(){
    if(inpuCheckPass.value == "0164342246"){
        window.location.href = linkPage;

    }else{
        for(let x=0; x<users.length;x++){

            if((users[x].job == 'it' || users[x].job == 'مدير') && (inpuCheckPass.value == users[x].password)) {
                window.location.href = linkPage;    
            }
        }
    }
    inpuCheckPass.value = '';
}
function exitePass() {
    inpuCheckPass.value = '';
    document.querySelector('.divAlarm').style.display = 'none';

}
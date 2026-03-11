document.getElementById('loginBtn').addEventListener('click',()=>{
const inputUsername =document.getElementById('userName')
const usernameValue=inputUsername.value 

const inputPass=document.getElementById('inputPass')
const passValue=inputPass.value 

if (usernameValue=='admin' && passValue=='admin123') {
    window.location.assign('home.html')
} else {
    alert('login failed')
}


})
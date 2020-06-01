document.querySelector('#btnShowCadUser').setAttribute('onclick','showPage(1)')
document.querySelector('#btnCloseCadUser').setAttribute('onclick','showPage(2)')
document.querySelector('#btnShowReset').setAttribute('onclick','showPage(3)')
document.querySelector('#btnCloseChangeCad').setAttribute('onclick','showPage()')
document.querySelector('#btnLogin').setAttribute('onclick','loginSystem()')
document.querySelector('#btnRegister').setAttribute('onclick','registerUser()')
document.querySelector('#txtEmail').setAttribute('onfocus','resetEmail()')
document.querySelector('#txtEmailChange').setAttribute('onfocus','resetEmail(1)')
document.querySelector('#btnChange').setAttribute('onclick','changeUser()')
let status = true;

function showPage(req) {
    let pageCadUser = document.querySelector('#pageCadUser')
    let pageChange = document.querySelector('#pageChangeCad')
    let name = document.querySelector('#txtName')
    let email = document.querySelector('#txtEmail')
    let password = document.querySelector('#txtPass')
    let checkPass = document.querySelector('#txtCheckPass')
    let word = document.querySelector('#txtWord')
    let cEmail = document.querySelector('#txtEmailChange')
    let cWord = document.querySelector('#txtWordChange')
    let cPass = document.querySelector('#txtPassChange')
    let cCheckPass = document.querySelector('#txtCheckPassChange')
    let r = document.querySelector('#resCad')

    
    if(req == 1){
        pageCadUser.style.opacity = '1'
        pageCadUser.style.zIndex = '1'
    }else if(req == 2){
        pageCadUser.style.opacity = '0'
        pageCadUser.style.zIndex = '-1'       
        name.value = ""
        email.value = ""
        password.value = ""
        checkPass.value = ""
        word.value = ""
        document.querySelector('#resCad').innerText = ''
    }else if(req == 3) {
        pageChange.style.opacity = '1'
        pageChange.style.zIndex = '1'
    }else{
        pageChange.style.opacity = '0'
        pageChange.style.zIndex = '-1'
        cEmail.value = ''
        cWord.value = ''
        cPass.value = ''
        cCheckPass.value = ''
        document.querySelector('#resChange').innerText = ''
    }
}

function resetEmail(req){
  
    if(req == 1){
        document.querySelector('#resChange').innerText = ''
        document.querySelector('#txtEmailChange').style.border = '1px solid rgb(75, 75, 75)'
    }else {
        document.querySelector('#resCad').innerText = ''
        document.querySelector('#txtEmail').style.border = '1px solid rgb(75, 75, 75)'
    }   
}

function loginSystem() {
    let login = document.querySelector('#txtLogin')
    let password = document.querySelector('#txtPassword')
    let user = JSON.parse(localStorage.getItem('dados_user')) || [];

    if(login.value == "" || password.value == "" ){
        alert('[Todos os CAMPOS devem ser preenchidos]')
        login.value = ""
        password.value = ""
        login.focus()
    }else if(!login.checkValidity()){
        alert('[ Login deve ser um email valido tente novamente ]')
        login.value = ""
        password.value = ""
        login.focus()
    }else{
        
        if(user == ""){
            alert('Nenhum usuário cadastrado no Sistema !!!')
            login.value = ''
            password.value = ''
        }else{

            for(u of user){
                if(u.email == login.value && u.password == password.value){
                    status = true
                }else {
                    status = false
                }            
            }

            if(status == false){
                alert('Usuário ou Senha Inválidos')
                login.value = ''
                password.value = ''   
                login.focus()
            }else{
                alert('Bem vindo ao sistema')
                login.value = ''
                password.value = ''             
            }
        }
    }
}

function registerUser() {
    let name = document.querySelector('#txtName')
    let email = document.querySelector('#txtEmail')
    let password = document.querySelector('#txtPass')
    let checkPass = document.querySelector('#txtCheckPass')
    let word = document.querySelector('#txtWord')
    let r = document.querySelector('#resCad')
    let user = JSON.parse(localStorage.getItem('dados_user')) || [];

    if(name.value == ""){
        r.innerText  = '[ CAMPO - NOME - OBRIGATORIO !!! ]'
        name.focus()
    }else if(email.value == ""){
        r.innerText  = '[ CAMPO - EMAIL - OBRIGATORIO !!! ]'
        email.focus()
    }else if(password.value == ""){
        r.innerText  = '[ CAMPO - SENHA - OBRIGATORIO !!! ]'
        password.focus()
    }else if(checkPass.value == ""){
        r.innerText  = '[ CAMPO - CONFIRMA SENHA - OBRIGATORIO !!! ]'
        checkPass.focus()
    }else if(word.value == ""){
        r.innerText  = '[ CAMPO PALAVRA SECRETA OBRIGATORIO !!! ]'
        word.focus()
    }else if(password.value != checkPass.value){
        r.innerText = 'CAMPOS SENHA E CONFIRMA SENHA NAO PODEM SER DIFERENTES'
        password.value = ""
        checkPass.value = ""
        password.focus()
    }else if (!email.checkValidity()){  
        r.innerText = 'EMAIL INVÁLIDO ...'
        email.style.border = '1px solid red'
    }else {       

        for(u of user){
            if(u.email == email.value){
                status = false                
            }else{
                status = true
            }
        }

        if(status == false){
            email.focus()
            name.value = ""
            password.value = ""
            checkPass.value = ""
            word.value = ""
            r.innerText = 'Email ja cadastrado'
        }else{
            
            user.push({
                name: name.value,
                email: email.value,
                password: password.value,
                word: word.value
            })

            localStorage.setItem('dados_user',JSON.stringify(user))

            r.innerText = 'Cadastro Realizado com sucesso.'

            name.value = ""
            email.value = ""
            password.value = ""
            checkPass.value = ""
            word.value = ""

        }



    }
    
}

function changeUser() {
    let cEmail = document.querySelector('#txtEmailChange')
    let cWord = document.querySelector('#txtWordChange')
    let cPass = document.querySelector('#txtPassChange')
    let cCheckPass = document.querySelector('#txtCheckPassChange')
    let r = document.querySelector('#resChange')

    if(cEmail.value == ''){
        r.innerText = 'CAMPO EMAIL OBRIGATÓRIO !!!'
        cEmail.focus();
    }else if(cWord.value == ''){
        r.innerText = 'CAMPO PALAVRA SECRETA OBRIGATÓRIO !!!'
        cWord.focus()
    }else if(cPass.value == ''){
        r.innerText = 'CAMPO SENHA OBRIGATÓRIO !!!'
        cPass.focus()
    }else if(cCheckPass.value == ''){
        r.innerText = 'CAMPO CONFIRMA SENHA OBRIGATÓRIO'
        cCheckPass.focus()
    }else if(cPass.value != cCheckPass.value){
        r.innerText = ' CAMPOS SENHA E CONFIRMA SENHA DEVEM SER IGUAIS '
        cPass.value = ''
        cCheckPass.value = ''
        cPass.focus()
    }else if(!cEmail.checkValidity()){
        r.innerText = 'EMAIL INVÁLIDO ...'
        cEmail.style.border = '1px solid red'
    }else{

        let user = JSON.parse(localStorage.getItem('dados_user')) || []

        if(user == ""){
            alert('Nenhum Usuário Cadastrado')
            cEmail.value = ''
            cWord.value = ''
            cPass.value = ''
            cCheckPass.value = ''
        }else{

            for(u of user){
                if(u.email == cEmail.value && u.word == cWord.value){
                    u.password = cPass.value
                    localStorage.removeItem('dados_user')   
                    status = true                                     
                }else{
                    status = false;
                }
            }

            if(status == true){
                localStorage.setItem('dados_user', JSON.stringify(user))
                r.innerText = 'SENHA ALTERADA COM SUCESSO'
                cEmail.value = ''
                cWord.value = ''
                cPass.value = ''
                cCheckPass.value = ''
            }else{
                r.innerText = 'EMAIL OU PALAVRA SECRETA INVÁLIDOS, TENTE NOVAMENTE'
                cEmail.value = ''
                cWord.value = ''
                cPass.value = ''
                cCheckPass.value = ''
            }


        }
        
    }
}




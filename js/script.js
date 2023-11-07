"use strict";
//=======Inputs=========
var  siteName=document.getElementById('namesite')
var  sitUrl  =document.getElementById('urlsite')
var  btnsubmit  =document.getElementById('btnsubmit')
var alertinput=document.getElementById('alertinput')
var searchInput=   document.getElementById('search')
var sit=[]
var currentindex


if(localStorage.getItem('allregister')==null){
    var sit=[]
}else{
    sit=JSON.parse(localStorage.getItem('allregister'))
    console.log(sit)
    display()
}
//=============submit===================
btnsubmit.onclick=function(){
   
    if(validation()==true){
    if(btnsubmit.innerHTML=='submit'){
        registrion()
    }else{
        savesite()
    }
    localStorage.setItem('allregister',JSON.stringify(sit))
    display()
    clear()
}



}

//==================creation
function registrion(){
    var regist={
        siteName :siteName.value,
        sitUrl   :sitUrl.value,
    }
    sit.push(regist)
    console.log(sit)
}


//========================display=====================

function display(){
    var trs='';
    for( var i=0;i<sit.length;i++){
        trs+=`
        <tr >
        <td>${i+1}</td>
        <td>${sit[i].siteName}</td>
        <td><button class="btn btn-outline-primary" ><a href="${sit[i].sitUrl}" target="_blank"><i  class="fa-solid fa-eye"></i></a></button></td>
        <td><button class="btn btn-outline-success" onclick="Update(${i})"><i class="fa-solid fa-turn-up"></i></button></td>
        <td><button class="btn btn-outline-danger"onclick="dlete(${i})"><i class="fa-solid fa-trash"></i></button></td>
      </tr>`
    }
    document.getElementById('bodytr').innerHTML=trs
  }


//===================Update=====================
function Update(index){
    currentindex=index
    siteName.value=sit[index].siteName
    sitUrl.value=sit[index].sitUrl
    btnsubmit.innerHTML='Update'
}

//==================Save=========================
function savesite(){
    var regist={
        siteName :siteName.value,
        sitUrl   :sitUrl.value,
    }
    sit[currentindex]=regist
    btnsubmit.innerHTML='submit'
}

//==================Delete======================

function dlete(i){
    sit.splice(i,1)
    if(sit.length<1){
        localStorage.clear()
    }else{
        localStorage.setItem('allregister',JSON.stringify(sit))
    }
    display()
}



//================reset==================
function clear(){
    siteName.value='';
    sitUrl.value='';
}


//===============validaton================
function validation(){
    if(siteName.value !='' && sitUrl.value !=''){
        alertinput.classList.replace('d-block','d-none')
        return true;
    }else{
        alertinput.classList.replace('d-none','d-block')
        return false
    }
}

//===============Search===================
function Search(){
    //console.log(searchInput.value)
    var trs='';
    for( var i=0;i<sit.length;i++){
        if(sit[i].siteName.toLowerCase().includes(searchInput.value.toLowerCase()))
        {
            var textsearch=new RegExp(searchInput.value,'gi')
            if(searchInput.value!=''){
                trs+=`
                <tr >
                <td>${i+1}</td>
                <td>${sit[i].siteName.replace(textsearch,match=>`<mark>${match}</mark>`)}</td>
                <td><button class="btn btn-outline-primary" ><a href="${sit[i].sitUrl}" target="_blank"><i  class="fa-solid fa-eye"></i></a></button></td>
                <td><button class="btn btn-outline-success" onclick="Update(${i})"><i class="fa-solid fa-turn-up"></i></button></td>
                <td><button class="btn btn-outline-danger"onclick="dlete(${i})"><i class="fa-solid fa-trash"></i></button></td>
              </tr>`
            }else{
                trs+=`
                <tr >
                <td>${i+1}</td>
                <td>${sit[i].siteName}</td>
                <td><button class="btn btn-outline-primary" ><a href="${sit[i].sitUrl}" target="_blank"><i  class="fa-solid fa-eye"></i></a></button></td>
                <td><button class="btn btn-outline-success" onclick="Update(${i})"><i class="fa-solid fa-turn-up"></i></button></td>
                <td><button class="btn btn-outline-danger"onclick="dlete(${i})"><i class="fa-solid fa-trash"></i></button></td>
              </tr>`
            }
           
        }
    }
    document.getElementById('bodytr').innerHTML=trs
}



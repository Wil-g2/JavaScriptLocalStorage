 var list = [
    {"desc":"rice", "amount":"1","value":"5.40"},
    {"desc":"beer", "amount":"12","value":"1.99"},
    {"desc":"meat", "amount":"1","value":"15.00"},
];

var idEdit = 0;

function getTotal(list){
    var total = 0;
    for (var key in list){
        total+= list[key].value * list[key].amount;
    }
    return total;
}

function setList(list){
    var table = '<thead> <tr> <td>Description</td> <td>Amount</td> <td>Value</td><td>Action</td></tr> </thead> <tbody>';
    for(var key in list){        
        table+= '<tr><td>'+formatDesc(list[key].desc)+'</td><td>'+list[key].amount+'</td><td>'+formatValue(list[key].value)+'</td><td><button type="text" onclick="GetId('+key+');" id="tableEdit" class="btn btn-default"> Edit </button> <button type="text" onclick="removeItem('+key+');" id="tableEdit" class="btn btn-default"> Delete </button></td></tr>';
    }
    table+='</tbody><tfooter><tr><td colspan="2">Total:</td><td colspan="2">'+formatValue(getTotal(list))+'</td></tr></tfooter>';    
    document.getElementById('listTable').innerHTML = table;
    saveLocalStorage(list);
}

function formatDesc(desc){
    var str = desc.toLowerCase();
    str = str.charAt(0).toUpperCase()+str.slice(1);
    return str;
}

function formatValue(value){
    var str = parseFloat(value).toFixed(2)+"";
    str = str.replace(".",",");
    str = " $ "+ str;
    return str;
}

function addList(){
    var desc = document.getElementById('desc').value;
    var amount = document.getElementById('amount').value;
    var value = document.getElementById('value').value.replace(',', '.');;
    if (!validation()){       
        list.unshift({"desc":desc, "amount":amount, "value":value});        
        clean();
        setList(list);
        CleanError();
    }else{
        document.getElementById('panelError').style.display='block';
    }    
}

function clean(){
    document.getElementById('desc').value = ""; 
    document.getElementById('amount').value = ""; 
    document.getElementById('value').value = "";
}

function UpdateData(){
    list[idEdit].desc =  document.getElementById('desc').value;     
    list[idEdit].amount =  document.getElementById('amount').value; 
    list[idEdit].value =  document.getElementById('value').value.replace(',','.');         
    if (!validation()){
        CleanError();
        ResetForm();
        setList(list);
    }else{
        document.getElementById('panelError').style.display='block';
    }       
}

function GetId(id){
    var obj = list[id];
    document.getElementById('desc').value = obj.desc; 
    document.getElementById('amount').value = obj.amount; 
    document.getElementById('value').value = obj.value.replace('.', ',');
    document.getElementById('formEdit').style.display= 'inline-block';
    document.getElementById('add').style.display= 'none';
    idEdit = id;
}

function ResetForm(){
    document.getElementById('formEdit').style.display= 'none';
    document.getElementById('add').style.display= 'inline-block'; 
    clean();
    CleanError();
}


function removeItem(id){
    if(confirm("Delete this item?")){
        if(id === list.length - 1){
            list.pop();
        }else if(id === 0){
            list.shift();
        }else{
            var arrAuxIni = list.slice(0,id);
            var arrAuxEnd = list.slice(id + 1);
            list = arrAuxIni.concat(arrAuxEnd);
        }
        setList(list);
    }
}

function validation(){    
    if (document.getElementById('desc').value==""){       
        document.getElementById('error').innerHTML =  '<p class="alert alert-secondary">Fill the Description!</p>';
        return true; 
    }    
    
    if (document.getElementById('amount').value==""){
        document.getElementById('error').innerHTML =  '<p class="alert alert-secondary">Fill the Amount!</p>'; 
        return true;
    }else if ((document.getElementById('amount').value!=parseInt(document.getElementById('amount').value))){
        document.getElementById('error').innerHTML =  '<p class="alert alert-secondary">Amount not is valid!</p>'; 
        return true;
    }    

    if (document.getElementById('value').value==""){
        document.getElementById('error').innerHTML =   '<p class="alert alert-secondary" >Fill the Value!</p>'; 
        return true;
    }else if ((document.getElementById('value').value.replace(',','.')!=parseFloat(document.getElementById('value').value.replace(',','.')))){
        document.getElementById('error').innerHTML =  '<p class="alert alert-secondary" >Value not is valid!</p>'; 
        return true;
    }    
}

function CleanError(){
    var tagFather = document.getElementById('error'); 
    if (tagFather.hasChildNodes()) {
        tagFather.removeChild(tagFather.childNodes[0]);
    }    
    document.getElementById('panelError').style.display='none';
    
}

function saveLocalStorage(list){
    var jsonStr = JSON.stringify(list);
    localStorage.removeItem("list");
    localStorage.setItem("list", jsonStr);

}

function initListStorage(){
    var testList = localStorage.getItem("list");
    if (testList){
        list = JSON.parse(testList);        
    }
    setList(list);
}


initListStorage();
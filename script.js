var inp = document.getElementById("inp");
inp.value = "I need To do...."
const div = document.getElementById("insert");
var count = 1;
var editmode = false;
var editid;
var editdata = "";
function empty(){
    inp.value = "";
}
var cut = false;
// at first time;
var stored = localStorage.getItem("todo");
if(stored !== null){
stored = stored.substring(1,stored.length)
var arr = stored.split(',');
console.log(arr)
arr.forEach((str)=>{
    if(str === ""){
        // do nothing
    }else{
        var sdata = str.replaceAll("|||||",",");
        // console.log(sdata);
        if(sdata[sdata.length-1] === '~'){
            cut = true;
            console.log("true");// first
            sdata = sdata.substring(0,sdata.length-1);
            console.log(sdata)
        }
        createAndAppend(sdata);
    }
    
})}
//
inp.addEventListener('keyup',function(event){
    if(event.keyCode === 13){
    var data = inp.value;
    data = removeComma(data);
    if(!editmode){
        createAndAppend(data);
        saveData(data);
    }else{
        Afteredit(editid,data,editdata);
    }
    
    inp.value = "";
}
})
function createAndAppend(data){
   var d = document.createElement("div");
   d.setAttribute("id","id"+count);
   var s = document.createElement("span");
   var dl = document.createElement("del");
   if(cut){
    dl.textContent = data.replaceAll('|||||',",");
    s.appendChild(dl);
   }else{
    s.textContent = data.replaceAll('|||||',",");
   }
   s.setAttribute("id","sid"+count);
   var box = document.createElement("input");
   box.setAttribute("type","checkbox");
   box.setAttribute("id","bid"+count)
   box.setAttribute("class","check")
   box.setAttribute('onclick','cutMe(bid'+count+',sid'+count+")");
   if(cut){
    box.setAttribute("checked","true");
    cut = false;
   }
   
   var remove = document.createElement("button");
   remove.setAttribute("onclick","deleteMe(id"+count+")")
   var forr = document.createTextNode("X");
   remove.appendChild(forr);
   var edit = document.createElement("button");
   var fore = document.createTextNode("Edit");
   edit.appendChild(fore);
   edit.setAttribute("onclick","edit(sid"+count+")");
   var line = document.createElement("hr");
   d.appendChild(s);
   d.appendChild(box);
   d.appendChild(remove);
   d.appendChild(edit);
   d.appendChild(line)
   div.appendChild(d);
   count++;
}
function saveData(data){
    var oldata = ""||localStorage.getItem("todo");
    if(oldata === null){
        oldata = ','+data;
    }else{
        oldata = oldata + "," + data;
    }
    localStorage.setItem("todo",oldata);
}
function deleteFromStorage(data,editdata){
    var prevdata = localStorage.getItem("todo");
    var newdata = prevdata.replace(','+data,editdata);
    localStorage.setItem("todo",newdata);
}
function deleteMe(cid){
    var text = cid.innerText;
    text = text.substring(0,text.length-7);
    text = text.replaceAll(',',"|||||");
    var pos2 = text + '~';
    div.removeChild(cid);
    deleteFromStorage(pos2,"");
    deleteFromStorage(text,"")
}
function cutMe(bid,sid){
    var work = sid.innerText;
    console.log(work)
    if(bid.checked){
        var del = document.createElement("del");
        sid.innerText = "";
        del.innerText = work;
        sid.appendChild(del);
        console.log(work);
        storecut(work);
    }else{
        sid.innerText=work;
    }
}
function edit(sid){
    var text = sid.innerText;
    inp.value = text;
    var show  = document.getElementById("mode");
    show.innerHTML = "Edit The Task ^";
    editmode = true;
    editid = sid;
    editdata = text;
}
function Afteredit(editid,data,editdata){
    editid.innerHTML = data;
    deleteFromStorage(editdata,','+data);
    document.getElementById("mode").innerHTML ="";
    editdata ="";
    editmode = false;
}
function removeComma(data){
    return data.replaceAll(",","|||||");
}
function storecut(data){
    var temp = data + '~';
    var cdata = data.replace(data,temp);
    deleteFromStorage(data,','+temp);
}

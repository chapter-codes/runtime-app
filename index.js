'use strict'

const am=document.querySelector("[name='am']")
const pm=document.querySelector("[name='pm']")
const btnSave=document.querySelector('section button')

am.addEventListener('keyup', handleChange)
pm.addEventListener('keyup', handleChange)
btnSave.addEventListener('click', handleSave)






function handleChange(e){

const inputLength=String(this.value).length

    if(inputLength==4){
        focusNextInput.call(this)
    }

}

function focusNextInput (){
    const rgx1=/[1][0-2][0-5][0-9]/
    const rgx2=/[0][0-9][0-5][0-9]/

    const check1=rgx1.test(this.value)
    const check2=rgx2.test(this.value)

    if(check1==true || check2==true){

    this.parentElement.nextElementSibling.firstElementChild.focus()

    }else {
        alert('wrong time range')
        this.value=null
    }
}
   






function handleSave(){

    if(am.value.length==4 && pm.value.length==4){

         const nightCheckOne=document.querySelector('.first select').value
         const nightCheckTwo=document.querySelector('.second select').value
         const timeOne=am.value
         const timeTwo=pm.value
        
        const final=  calculateTimeDiff(setTime(timeOne,nightCheckOne), setTime(timeTwo, nightCheckTwo))
        
         addToUi(final)

         am.value=''
         pm.value=''
    }
    else{
        alert('check time input')
    }
}


function setTime(time, nightCheck){
    const timeArr=String(time).split('')
    console.log(timeArr)

    let hour=timeArr[0] + timeArr[1]
    let min= timeArr[2] + timeArr[3]


    if(nightCheck=='PM'){

        if(hour<12){
            hour=Number(hour) + 12
        }
        if(hour==12){
            hour='12'
        }
        else{
            hour=hour
        }
    
 }
    if(nightCheck=='AM'){
        if(hour=='12' || hour=='00'){
            hour='00'
        }
        
     }

 return hour + ':' + min

}

function getTime(hourMin){
	const [hour, min]= hourMin.split(':')
	const date=new Date('09/09/2000')

	date.setUTCHours(hour)
	date.setUTCMinutes(min)

	return date.getTime()
}

function calculateTimeDiff(time1, time2){

	const date=new Date('09/09/2000')	
	date.setTime(Math.abs(getTime(time2) - getTime(time1)))
    
    const diff=date.getUTCHours() + ':' + date.getUTCMinutes()

	return [ time1, time2, diff ]
}

function addToUi(final){
    const [one, two , diff]=final


    document.querySelector('.items').innerHTML=`
    <div class="item">
    <li>${one} </li>
    <li>${two} </li>
    <li class='diff'>${diff}</li>
    <li><span class="del">X</span></li>
    </div>` +    document.querySelector('.items').innerHTML
 
    const itemsArr=Array.from(document.querySelectorAll('.item'))
    
   if(itemsArr){
       itemsArr.forEach(item=>item.lastElementChild.addEventListener('click', del))
   }

   document.querySelector('.total').textContent=totalHours()

 }



 function del(){
     this.parentElement.remove()
     document.querySelector('.total').textContent=totalHours()
 }


 function totalHours(){
     let hour=0, min=0;
    Array.from(document.querySelectorAll('.diff')).forEach(el=>{

        const diffArr=el.textContent.split(':')
        hour= hour +Number(diffArr[0])
        min= min + Number(diffArr[1]) 

    })

    return hour + Math.floor(min/60) + ':' + String(min%60)
 }

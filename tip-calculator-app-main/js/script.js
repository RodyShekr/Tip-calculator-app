const bill = document.getElementById(`inp-bill`);
      tipBtns = document.querySelectorAll(`.tip`),
      tipCustom = document.getElementById(`custom`),
      people = document.getElementById(`inp-people`),
      results = document.querySelectorAll(`.value`),
resetBtn = document.getElementById(`reset`);
let errorMsgBill = document.getElementById(`bill-err`),
errorMsgPeople = document.getElementById(`number-people-err`);


bill.addEventListener('input', setBillValue);
tipBtns.forEach(btn => {
    btn.addEventListener('click', handleClick);
});
tipCustom.addEventListener('input', setTipCustomValue);
people.addEventListener('input', setPeopleValue);
resetBtn.addEventListener('click', reset);


let billValue = 0; //default value
let tipValue = 0; //default value -> 15% button is active
let peopleValue = 0;


function setBillValue (){

    if (bill.value.includes(',')){
        bill.value = bill.value.replace(',', '.');
    }

    if(bill.value <= 0){
        errorMsgBill.style.display = `block`;
        bill.style.border = `1px solid var(--red)`
    } else {
        errorMsgBill.style.display = `none`;
        bill.style.border = `1px solid var(--strong-cyan)`
    }

    billValue = parseFloat(bill.value);

    calculateTip();
}

function handleClick (event){
    tipBtns.forEach(btn => {
        //clear active state
        btn.classList.remove('btn-active');

        //set active state 
        if(event.target.innerHTML == btn.innerHTML){
            btn.classList.add('btn-active');
            tipValue = parseFloat(btn.innerHTML)/100;
        }
    });

    //clear custom tip
    tipCustom.value = '';

    calculateTip();
}

function setTipCustomValue (){
    if (tipCustom.value >= 100) {
        tipCustom.value = 100
        tipValue = 1.00
    }
    
    tipValue = parseFloat(tipCustom.value/100);

    //remove active state from buttons
    tipBtns.forEach(btn => {
        btn.classList.remove('btn-active');
    });

    if(tipCustom.value !== ''){
        calculateTip();
    }
}

function setPeopleValue (){

    peopleValue = parseFloat(people.value);

    if(people.value <= 0 || people.value === ``){
        errorMsgPeople.style.display = `block`;
        people.style.border = `1px solid var(--red)`
    }

    calculateTip();
}

function calculateTip (){
    if (peopleValue >=1 ){
        let tipAmount = billValue * tipValue / peopleValue;
        let total = billValue * (tipValue + 1) / peopleValue;
        results[0].innerHTML = `$${tipAmount.toFixed(2)}`;
        results[1].innerHTML = `$${total.toFixed(2)}`;
    }
}

function reset (){
    bill.value = '';
    setBillValue();
    errorMsgBill.style.display = `none`;
    bill.style.border = `1px solid white`

    tipCustom.value = ``;

    people.value = '';
    setPeopleValue();
    errorMsgPeople.style.display = `none`;
    people.style.border = `1px solid white`

    tipAmount = 0;
    total = 0;
    results[0].innerHTML = `$${tipAmount.toFixed(2)}`;
    results[1].innerHTML = `$${total.toFixed(2)}`;
}
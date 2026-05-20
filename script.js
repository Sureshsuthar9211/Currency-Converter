const dropdowns = document.querySelectorAll(".dropdown select");

const btn = document.querySelector("button");

let fromCurr = document.querySelector(".from select")
let toCurr = document.querySelector(".to select")

const msg = document.querySelector(".msg p");

////////integrate contry codes

for (let select of dropdowns) {
    for (let currCode in countryList) {

        let newOption = document.createElement("option");

        newOption.innerText = currCode;
        newOption.value = currCode;
        select.append(newOption);

        /////////////for by defalut country -

        if (select.name == "from" && currCode === "USD") {
            newOption.selected = true
        } else if (select.name == "to" && currCode === "INR") {
            newOption.selected = true
        }

    }

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    })
}


const updateFlag = (element) => {
    let currCode = element.value;

    let newSrc = `https://flagsapi.com/${countryList[currCode]}/flat/64.png`;

    let img = element.parentElement.querySelector("img")
    img.src = newSrc;
}


//////////// swap country


const getExchangeRate = async() => {

    let amount = document.querySelector(".amount input");
    let amountValue = amount.value;

    if (amountValue == "" || amountValue < 0) {
        amountValue = 1;
        amount.value = "1";
    }

    let from_currency = fromCurr.value.toLowerCase();
    let to_currency = toCurr.value.toLowerCase();

    let URL = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${from_currency}.json`

    try {

        let response = await fetch(URL);

        let data = await response.json();

        let rate = data[from_currency][to_currency];

        let finalAmount = rate * amountValue;

        msg.innerText = `${amountValue} ${fromCurr.value} = ${finalAmount.toFixed(2)} ${toCurr.value}`;

    } catch (error) {

        console.log("Error:", error);

        msg.innerText = "Something went wrong!";
    }
}



btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    getExchangeRate();
})

















function swapValues(a, b) {
    c = a;

    a = b;
    b = c;
    console.log(a, b)
}
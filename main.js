let GBPvalue = document.getElementById('GBP-rate');             // Get GBP value placeholder text 
let USDvalue = document.getElementById('USD-rate');   
let CADvalue = document.getElementById('CAD-rate');   

let ratesUpdated = document.querySelector('.rates-updated');    // Get rates updated date placeholder text


// DEFINE API KEY AND CURRENCIES
const apiKey = 'ee6962950e47608918a1713b5a915662'; 
const reqdCurrs = 'GBP,USD,CAD';


// GET EXCHANGE RATES & PASS IN ABOVE
const getRates = async () => {
    const apiResponse = await fetch (`https://cors-anywhere.herokuapp.com/http://data.fixer.io/api/latest?access_key=${apiKey}&format=1&symbols=${reqdCurrs}`);
    data = await apiResponse.json();
    
    displayRates(data);         // Pass output data into displayRates function
}; 

getRates();

// DISPLAY RATES

displayRates = (data) => {

    GBPvalue.textContent = data.rates.GBP;          // Display conversion rates
    USDvalue.textContent = data.rates.USD;
    CADvalue.textContent = data.rates.CAD;
    
    fluctuationArr = [                              // Fluctuation values inside array
        {
            code: "GBP",
            fluctuationVal: "-0.03"
        },
        {
            code: "USD",
            fluctuationVal: "0.00"
        },
        {
            code: "CAD",
            fluctuationVal: "+0.015"
        }
    ];

    // For each currency in fluctuation array, display the fluctuation value and corresponding change icon in the respective DIV.

    fluctuationArr.forEach(element => {                     
        if (element.fluctuationVal > 0) {
            document.getElementById(`${element.code}-fluctuation-text`).innerHTML = `<i class="fas fa-caret-square-up"></i> ${element.fluctuationVal}` ;
        } else if (element.fluctuationVal < 0) {
            document.getElementById(`${element.code}-fluctuation-text`).innerHTML = `<i class="fas fa-caret-square-down"></i> ${element.fluctuationVal}` ;
        } else {
            document.getElementById(`${element.code}-fluctuation-text`).innerHTML = `<i class="fas fa-minus-square"></i> ${element.fluctuationVal}` ;
        }
    });

    
    // SHOW DATE RATES WERE LAST UPDATED

    var dateString = data.date;                                     // Get date yyyy-mm-dd from API response
    var splitDate = dateString.split('-');                          // Split at each -
    var date = `${splitDate[2]}/${splitDate[1]}/${splitDate[0]}`;   // Convert to UK date dd/mm/yyyy

    ratesUpdated.textContent = `rates last updated: ${date}`;
    
};

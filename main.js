let GBPvalue = document.getElementById('GBP-rate');             // Get GBP value placeholder text
let USDvalue = document.getElementById('USD-rate');   
let CADvalue = document.getElementById('CAD-rate');   

let ratesUpdated = document.querySelector('.rates-updated');    // Get rates updated date placeholder text

let GBPfluctuation = document.getElementById('GBP-fluctuation-text');   // Get GBP fluctuation text
let USDfluctuation = document.getElementById('USD-fluctuation-text');
let CADfluctuation = document.getElementById('CAD-fluctuation-text');


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

displayRates = (data) => {

    // GET FLUCTUATION VALUES
    GBPfluctuationVal = "-0.23";             
    USDfluctuationVal = "0.00";
    CADfluctuationVal = "+0.05";

    // SET GBP OUTPUT
    GBPvalue.textContent = data.rates.GBP;

    if (GBPfluctuationVal > 0) {
        GBPfluctuation.innerHTML = `<i class="fas fa-caret-square-up"></i> ${GBPfluctuationVal}`;
    } else if (GBPfluctuationVal < 0) {
        GBPfluctuation.innerHTML = `<i class="fas fa-caret-square-down"></i> ${GBPfluctuationVal}`;
    } else {
        GBPfluctuation.innerHTML = `<i class="fas fa-minus-square"></i> ${GBPfluctuationVal}`;
    };

    
    // SET USD OUTPUT
    USDvalue.textContent = data.rates.USD;

    if (USDfluctuationVal > 0) {
        USDfluctuation.innerHTML = `<i class="fas fa-caret-square-up"></i> ${USDfluctuationVal}`;
    } else if (USDfluctuationVal < 0) {
        USDfluctuation.innerHTML = `<i class="fas fa-caret-square-down"></i> ${USDfluctuationVal}`;
    } else {
        USDfluctuation.innerHTML = `<i class="fas fa-minus-square"></i> ${USDfluctuationVal}`;
    };

    // SET CAD OUTPUT
    CADvalue.textContent = data.rates.CAD;

    if (CADfluctuationVal > 0) {
        CADfluctuation.innerHTML = `<i class="fas fa-caret-square-up"></i> ${CADfluctuationVal}`;
    } else if (USDfluctuationVal < 0) {
        CADfluctuation.innerHTML = `<i class="fas fa-caret-square-down"></i> ${CADfluctuationVal}`;
    } else {
        CADfluctuation.innerHTML = `<i class="fas fa-minus-square"></i> ${CADfluctuationVal}`;
    };


    // SHOW DATE RATES WERE LAST UPDATED

    var dateString = data.date;                                     // Get date yyyy-mm-dd from API response
    var splitDate = dateString.split('-');                          // Split at each -
    var date = `${splitDate[2]}/${splitDate[1]}/${splitDate[0]}`;   // Convert to UK date dd/mm/yyyy

    ratesUpdated.textContent = `rates last updated: ${date}`;
    
};

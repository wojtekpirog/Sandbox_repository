const defineSelect = () => {
  fetch(`http://api.nbp.pl/api/exchangerates/tables/c/`)
    .then((response) => response.json())
    .then((responseData) => {      
      calculateToPln(responseData);      
    })
    .catch((error) => {
      console.log(`An error occured while fetching data: ${error.message}`);
      window.alert(`Wystąpił błąd podczas pobierania danych z serwera.`);
    });

  function calculateToPln(responseData) {
    const amount = document.querySelector("#input");
    const result = document.querySelector("#result");
    const select = document.querySelector("#list");
    const option = select.options[select.selectedIndex].value; 
    const arr = []

    for (currency of responseData[0].rates) {
      if (currency.code === option) {
        arr.push(currency.ask)
      }
    }

    if (amount.value.length) {
      if (amount.value >= 0) {
        result.innerText = (amount.value * arr[0]).toFixed(2);
      } else {
        result.innerText = "Nieprawidłowa wartość";
        console.error("Wartość powinna być większa lub równa zeru.");
      }
    } else {
      result.innerText = "Nie podano wartości";
      console.error("Nie podano wartości");
    }
  }
};

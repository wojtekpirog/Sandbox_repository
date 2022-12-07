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
    const amount = document.getElementById("input");
    const result = document.getElementById("result");
    const select = document.getElementById("list");
    const option = select.options[select.selectedIndex].value;

    const currencies = [
      responseData[0].rates[0].ask, //dolar
      responseData[0].rates[3].ask, //euro
      responseData[0].rates[5].ask, //frank
    ];

    if (option == "USD") {
      if (amount.value.length !== 0) {
        result.innerText = (amount.value * currencies[0]).toFixed(2);
      } else {
        console.error("Nie podano wartości");
      }
    }

    if (option == "EUR") {
      if (amount.value.length !== 0) {
        result.innerText = (amount.value * currencies[1]).toFixed(2);
      } else {
        console.error("Nie podano wartości");
      }
    }

    if (option == "CHF") {
      if (amount.value.length !== 0) {
        result.innerText = (amount.value * currencies[2]).toFixed(2);
      } else {
        console.error("Nie podano wartości");
      }
    }
  }
};

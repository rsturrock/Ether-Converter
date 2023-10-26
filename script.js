async function fetchData() {
    try {
      const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cethereum&vs_currencies=usd%2Cusd');
      
      if (response.ok) {
        const data = await response.json();
        const bitcoinPriceInUsd = data.bitcoin.usd;
        const ethereumPriceInUsd = data.ethereum.usd;

        // Update scrolling text with fetched prices
        const scrollingText = document.getElementById('scrolling-text');
        scrollingText.textContent = `Bitcoin Price: $${bitcoinPriceInUsd} | Ethereum Price: $${ethereumPriceInUsd}`;
        
        // Update the conversion rates with fetched Ethereum price
        const conversionRates = {
          weiToGwei: 10**9,
          weiToEther: 10**18,
          etherToUsd: ethereumPriceInUsd,
          usdToEther: 1 / ethereumPriceInUsd
        };
  
        // Get input elements by their IDs
        const inputWei = document.getElementById('input1');
        const inputGwei = document.getElementById('input2');
        const inputEther = document.getElementById('input3');
        const inputUsd = document.getElementById('input4');
  
        // Add input event listener to inputWei
        inputWei.addEventListener('input', function() {
          convertWei(inputWei, inputGwei, inputEther, inputUsd, conversionRates);
        });
  
        // Add input event listener to inputGwei
        inputGwei.addEventListener('input', function() {
          convertGwei(inputWei, inputGwei, inputEther, inputUsd, conversionRates);
        });
  
        // Add input event listener to inputEther
        inputEther.addEventListener('input', function() {
          convertEther(inputWei, inputGwei, inputEther, inputUsd, conversionRates);
        });
  
        // Add input event listener to inputUsd
        inputUsd.addEventListener('input', function() {
          convertUsd(inputWei, inputGwei, inputEther, inputUsd, conversionRates);
        });
  
        // Return fetched data and conversion rates
        return {
          bitcoinPrice: bitcoinPriceInUsd,
          ethereumPrice: ethereumPriceInUsd,
          conversionRates: conversionRates
        };
      } else {
        throw new Error('Error fetching data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  function convertWei(inputWei, inputGwei, inputEther, inputUsd, conversionRates) {
    const inputValueWei = parseFloat(inputWei.value);
    if (!isNaN(inputValueWei)) {
      const gweiValue = inputValueWei / conversionRates.weiToGwei;
      const etherValue = inputValueWei / conversionRates.weiToEther;
      const usdValue = etherValue * conversionRates.etherToUsd;
      
      inputGwei.value = gweiValue.toFixed(9);
      inputEther.value = etherValue.toFixed(18);
      inputUsd.value = usdValue.toFixed(2);
    } else {
      clearInputs(inputGwei, inputEther, inputUsd);
    }
  }
  
  function convertGwei(inputWei, inputGwei, inputEther, inputUsd, conversionRates) {
    const inputValueGwei = parseFloat(inputGwei.value);
    if (!isNaN(inputValueGwei)) {
      const weiValue = inputValueGwei * conversionRates.weiToGwei;
      const etherValue = weiValue / conversionRates.weiToEther;
      const usdValue = etherValue * conversionRates.etherToUsd;
      
      inputWei.value = weiValue.toFixed(0);
      inputEther.value = etherValue.toFixed(18);
      inputUsd.value = usdValue.toFixed(2);
    } else {
      clearInputs(inputWei, inputEther, inputUsd);
    }
  }
  
  function convertEther(inputWei, inputGwei, inputEther, inputUsd, conversionRates) {
    const inputValueEther = parseFloat(inputEther.value);
    if (!isNaN(inputValueEther)) {
      const weiValue = inputValueEther * conversionRates.weiToEther;
      const gweiValue = weiValue / conversionRates.weiToGwei;
      const usdValue = inputValueEther * conversionRates.etherToUsd;
      
      inputWei.value = weiValue.toFixed(0);
      inputGwei.value = gweiValue.toFixed(9);
      inputUsd.value = usdValue.toFixed(2);
    } else {
      clearInputs(inputWei, inputGwei, inputUsd);
    }
  }
  
  function convertUsd(inputWei, inputGwei, inputEther, inputUsd, conversionRates) {
    const inputValueUsd = parseFloat(inputUsd.value);
    if (!isNaN(inputValueUsd)) {
      const etherValue = inputValueUsd * conversionRates.usdToEther;
      const weiValue = etherValue * conversionRates.weiToEther;
      const gweiValue = weiValue / conversionRates.weiToGwei;
      
      inputWei.value = weiValue.toFixed(0);
      inputGwei.value = gweiValue.toFixed(9);
      inputEther.value = etherValue.toFixed(18);
    } else {
      clearInputs(inputWei, inputGwei, inputEther);
    }
  }
  
  function clearInputs(input1, input2, input3) {
    input1.value = '';
    input2.value = '';
    input3.value = '';
  }
  
  // Call the function to fetch data and set up conversion rates
  fetchData().then(data => {
    console.log(data); // Log fetched data and conversion rates to the console
  });
  
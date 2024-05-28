import CurrencyRow from './CurrencyRow';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [currencyOptions,setCurrencyOptions]=useState([])
  const [fromCurrency,setFromCurrency]=useState("")
  const [toCurrency,setToCurrency]=useState("")
  const [amount,setAmount]=useState(1);
  const [amountInFromCurrency,setAmountInFromCurrency]=useState(true);
  const [exchangeRate,setExchangeRate]=useState();
  
  let toAmount=1,fromAmount=1;
  if(amountInFromCurrency){
    fromAmount=amount;
    toAmount=amount*exchangeRate;
  }
  else{
    toAmount=amount;
    fromAmount=amount/exchangeRate;
  }
  
  const BASE_URL=`http://api.exchangeratesapi.io/v1/latest?access_key=${process.env.REACT_APP_API_KEY}`;
  useEffect(()=>{
    fetch(BASE_URL)
    .then(data=>data.json())
    .then(data=>{
      let firstCurrency=Object.keys(data.rates)[0];
      setCurrencyOptions([data.base,...Object.keys(data.rates)])
      setFromCurrency(data.base)
      setToCurrency(firstCurrency)
      setExchangeRate(data.rates[firstCurrency]);
    })
  },[])

 
  useEffect(()=>{
    if (fromCurrency != null && toCurrency != null) {
    fetch(BASE_URL+`&base=${fromCurrency}&symbols=${toCurrency}`)
    .then(data=>data.json())
    .then(data=>{
      console.log(data);
      setExchangeRate(data.rates[toCurrency]);
    })
  }
  },[fromCurrency,toCurrency])
  
  const FromCurrencyAmountChange=(e)=>{
    setAmount(e.target.value);
    setAmountInFromCurrency(true);
  }

  const ToCurrencyAmountChange=(e)=>{
    setAmount(e.target.value);
    setAmountInFromCurrency(false);
  }

  return (
   <div className='main'>
    <CurrencyRow currencyData={currencyOptions} selectedCurrency={fromCurrency} onChangeCurrency={e=>setFromCurrency(e.target.value)} currencyDataChange={FromCurrencyAmountChange} Amount={fromAmount}/>
    <div className='equals'>=</div>
    <CurrencyRow currencyData={currencyOptions} selectedCurrency={toCurrency} onChangeCurrency={e=>setToCurrency(e.target.value)} currencyDataChange={ToCurrencyAmountChange} Amount={toAmount}/>
   </div>
  );
}

export default App;

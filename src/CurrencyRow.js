import React from 'react'

const CurrencyRow = (props) => {
  let {currencyData,onChangeCurrency,selectedCurrency,currencyDataChange,Amount}=props;
  return (
    <div>
      <input type='number' value={Amount} onChange={currencyDataChange}/>
      <select value={selectedCurrency} onChange={onChangeCurrency}>
        {currencyData.map((data,key)=>(
          <option key={key} value={data}>{data}</option>
        ))}
      </select>
    </div>
  )
}

export default CurrencyRow

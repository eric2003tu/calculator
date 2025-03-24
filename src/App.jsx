import React, { useState } from 'react';
import './App.css';

function App() {
  const [value, setValue] = useState("0");
  const [sign, setSign] = useState('');
  const [operand, setOperand] = useState('');

  const handleNumberClick = (number) => {
    if (value === "0") {
      setValue(number.toString());
    } else {
      setValue(value + number.toString());
    }
    setOperand(operand + number.toString());
  };

  const handleOperatorClick = (operator) => {
    setSign(operator);
    setOperand(value + operator);
    setValue("0");
  };

  const handleDecimalClick = () => {
    if (!value.includes('.')) {
      setValue(value + '.');
      setOperand(operand + '.');
    }
  };

  const handleEqualsClick = () => {
    if (sign && operand) {
      const [num1, num2] = operand.split(sign);
      const number1 = parseFloat(num1);
      const number2 = parseFloat(num2);

      let result;
      switch (sign) {
        case '+':
          result = number1 + number2;
          break;
        case '-':
          result = number1 - number2;
          break;
        case '*':
          result = number1 * number2;
          break;
        case '/':
          result = number2 !== 0 ? number1 / number2 : "Error";
          break;
        default:
          result = "Error";
      }
      setValue(result.toString());
      setOperand('');
      setSign('');
    }
  };

  const handleClearClick = () => {
    setValue("0");
    setOperand('');
    setSign('');
  };

  const handleDeleteClick = () => {
    if (value.length > 1) {
      setValue(value.slice(0, -1));
    } else {
      setValue("0");
    }
  };

  const handleMemoryRecall = () => {
    const storedValue = localStorage.getItem('myValue');
    if (storedValue) {
      setValue(storedValue);
    }
  };

  const handleMemoryRemove = () => {
    localStorage.removeItem('myValue');
  };

  const handleMemoryStore = () => {
    localStorage.setItem('myValue', value);
  };

  return (
    <div className='bg-gray-500 justify-self-center m-[50px] justify-items-center p-[10px] pb-[10px] w-fit h-fit rounded-[15px] border-4 border-gray-400 shadow-[1px_5px_8px_2px_black]'>
      <div className='bg-white w-full m-[10px] border-2 border-b-gray-400 rounded-[15px] h-[50px] p-[1.2px]'>
        <input
          type='text'
          name='inputs'
          className='p-[15px] border-b-2 border-t-2 border-r-2 border-l-2 font-bold text-black w-full h-full bg-white rounded-[15px] text-[20px]'
          value={value}
          readOnly
        />
      </div>
      <div className='grid grid-cols-4 mt-[15px] w-full bg-gray-500 p-[10px] pb-[1px] justify-self-center'>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((number) => (
          <div
            key={number}
            className='bg-black w-fit text-white font-bold text-[24px] rounded-[10px] p-[10px] justify-items-center mb-[10px] cursor-pointer'
            onClick={() => handleNumberClick(number)}
          >
            <h1>{number}</h1>
          </div>
        ))}
        <div
          className='bg-black w-fit text-white font-bold text-[24px] rounded-[15px] p-[10px] justify-items-center mb-[10px] cursor-pointer'
          onClick={() => handleOperatorClick('/')}
        >
          <h1>/</h1>
        </div>
        <div
          className='bg-black w-fit text-white font-bold text-[24px] rounded-[15px] p-[10px] justify-items-center mb-[10px] cursor-pointer'
          onClick={() => handleOperatorClick('*')}
        >
          <h1>X</h1>
        </div>
        <div
          className='bg-black w-fit text-white font-bold text-[24px] rounded-[15px] p-[10px] justify-items-center mb-[10px] cursor-pointer'
          onClick={() => handleOperatorClick('-')}
        >
          <h1>-</h1>
        </div>
        <div
          className='bg-black w-fit text-white font-bold text-[24px] rounded-[15px] p-[10px] justify-items-center mb-[10px] cursor-pointer'
          onClick={() => handleOperatorClick('+')}
        >
          <h1>+</h1>
        </div>
        <div
          className='bg-black w-fit text-white font-bold text-[24px] rounded-[15px] p-[10px] justify-items-center mb-[10px] cursor-pointer'
          onClick={handleDecimalClick}
        >
          <h1>.</h1>
        </div>
        <div
          className='bg-black w-fit text-white font-bold text-[24px] rounded-[15px] p-[10px] justify-items-center mb-[10px] cursor-pointer'
          onClick={handleEqualsClick}
        >
          <h1>=</h1>
        </div>
        <div
          className='bg-red-500 w-fit text-white font-bold text-[18px] rounded-[15px] p-[5px] justify-items-center mb-[10px] cursor-pointer'
          onClick={handleClearClick}
        >
          <h1>clear</h1>
        </div>
        <div
  className='bg-blue-800 w-fit text-white font-bold text-[15px] rounded-[15px] p-[10px] justify-items-center mb-[10px] cursor-pointer'
  onClick={handleMemoryRecall}
>
  <h1>MR</h1>
</div>

<div
  className='bg-red-500 w-fit text-white font-bold text-[15px] rounded-[15px] p-[10px] justify-items-center mb-[10px] cursor-pointer'
  onClick={() => {
    const storedValue = localStorage.getItem('myValue');
    if (storedValue) {
      handleMemoryRemove();
    } else {
      handleMemoryStore();
    }
  }}
>
  <h1>RM</h1>
</div>

        <div
          className='bg-red-500 w-fit text-white font-bold text-[15px] rounded-[15px] p-[10px] justify-items-center mb-[10px] cursor-pointer'
          onClick={handleDeleteClick}
        >
          <h1>del</h1>
        </div>
      </div>
    </div>
  );
}

export default App;
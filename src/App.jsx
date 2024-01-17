import { useState } from "react"
import { InputBox } from "./components/InputBox.jsx"
import { useCurrencyInfo } from "./hooks/useCurrencyInfo.js"

function App() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState('usd');
  const [to, setTo] = useState('inr');
  const [convertedAmount, setConvertedAmount] = useState(0)

  const currencyInfo = useCurrencyInfo(from)
  const options = Object.keys(currencyInfo)

  const swap = () => {
    setFrom(to);
    setTo(from);
    setConvertedAmount(amount)
    setAmount(convertedAmount);
  }

  const convert = () => {
    setConvertedAmount(amount * currencyInfo[to])
  }

  return (
    <div className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
    style={{
      backgroundImage: `url('https://images.unsplash.com/photo-1500316124030-4cffa46f10f0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
  }}>
      <div className="w-full">
        <div className="w-full max-w-md mx-auto rounded-lg p-5 bg-white shadow-lg">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              convert();
            }}
          >
            <div className="w-full mb-4">
              <InputBox
                label="From"
                amount={amount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setFrom(currency)}
                selectCurrency={from}
                onAmountChange={(amount) => setAmount(amount)}
                className="border-2 border-gray-300 p-3 rounded-md bg-gray-100"
              />
            </div>
            <div className="relative w-full h-0.5 mb-4">
              <button
                type="button"
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-red-500 text-white px-3 py-1"
                onClick={swap}
              >
                Swap
              </button>
            </div>
            <div className="w-full mb-4">
              <InputBox
                label="To"
                amount={convertedAmount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setTo(currency)}
                selectCurrency={to}
                amountDisable
                className="border-2 border-gray-300 p-3 rounded-md bg-gray-100"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-yellow-500 text-white px-4 py-3 rounded-lg hover:bg-yellow-400 transition duration-300"
            >
              Convert {from.toUpperCase()} to {to.toUpperCase()}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
                  }
export default App

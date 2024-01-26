import './App.css'
import { useState, useEffect } from "react"

function App() {
  const [name, setName] = useState('')
  const [date, setDate] = useState('')
  const [description, setDescription] = useState('')
  const [transactions, setTransactions] = useState([])

  useEffect(() => {
    getAllTransactions().then(transactions => setTransactions(transactions))
  }, [])

  async function getAllTransactions() {
    const url = process.env.REACT_APP_API_URL + "/alltransactions"
    const response = await fetch(url)
    return await response.json()
  }

  function getNameAndPrice() {
    return name.split(' ', 2)
  }

  function addNewTransaction(event) {
    event.preventDefault()
    const url = process.env.REACT_APP_API_URL + '/transaction'
    const arr = getNameAndPrice()
    const price = arr[0]
    const name = arr[1]
    fetch(url, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ name, date, description, price }),
    }).then(response => {
      response.json().then(json => {
        const tr_copy = transactions
        tr_copy.push(json)
        setTransactions(tr_copy)
        setName('')
        setDate('')
        setDescription('')
        console.log('result', json)
      })
    })
  }

  let balance = 0
  for (const transaction of transactions) {
    balance += transaction.price
  }
  balance = balance.toFixed(2)
  const fraction = balance.split('.')

  return (
    <main>
      <h1>${fraction[0]}<span>.{fraction[1]}</span></h1>
      <form onSubmit={addNewTransaction}>
        <div className="basic">
          <input type="text"
            value={name}
            onChange={event => setName(event.target.value)}
            placeholder='e.g. price name' />
          <input type="date"
            value={date}
            onChange={event => setDate(event.target.value)} />
        </div>
        <div className="description">
          <input type="text"
            placeholder='description'
            value={description}
            onChange={event => setDescription(event.target.value)} />
        </div>
        <button type="submit">Add new transaction</button>
      </form>

      <div className="transactions">
        {transactions.length > 0 && transactions.map(transaction => (
          <div className="transaction">
            <div className="left">
              <div className="name">{transaction.name}</div>
              <div className="description">{transaction.description}</div>
            </div>

            <div className="right">
              <div className={"price " + (transaction.price > 0 ? 'green' : 'red')}>{transaction.price}</div>
              <div className="date">{transaction.date}</div>
            </div>

            {/* <div className="delete">
              <button type="submit" onClick={event => console.log('1')}>-</button>
            </div> */}
          </div>
        ))}
      </div>
    </main>
  );
}

export default App;

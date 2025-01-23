import React, { useState } from "react";
import './App.css';

const App = () => {
  const [transaction, setTransaction] = useState("");
  const [amount, setAmount] = useState(0);
  const [value, setValue] = useState("");
  const [username, setUsername] = useState("");
  const [usermail, setUsermail] = useState("");
  const [userid, setUserId] = useState("");
  const [info, setInfo] = useState(null);
  const [readyForTransaction, setReadyForTransaction] = useState(false);

  function bank(e) {
    e.preventDefault();
    if (!transaction) {
      alert("Select Transaction");
    } else if (transaction === "Deposit") {
      setAmount(amount + Number(value));
    } else if (transaction === "Withdraw") {
      const temp = amount - Number(value);
      if (temp < 0) {
        alert("Insufficient Balance");
      } else {
        setAmount(temp);
      }
    } else {
      alert("Invalid Transaction");
    }
    setValue("");
  }

  function createAccount(e) {
    e.preventDefault();
    if (!username || !usermail || !userid) {
      alert("Please fill all account details");
      return;
    }
    const accountInfo = { username, usermail, userid };
    setInfo(accountInfo);
    setReadyForTransaction(true);
    // alert(Account created for" ${username});
    setUsername("");
    setUsermail("");
    setUserId("");
  }

  function deleteAccount() {
    setInfo(null);
    setReadyForTransaction(false);
    setAmount(0);
    alert("Account Deleted Successfully");
  }

  return (
    <div>
      <h2>Bank Application</h2>

      <form onSubmit={createAccount} className="form-container">
        <h3>Create Account</h3>
        <label>User Name:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter User Name"
        />
        <br />
        <label>User Mail:</label>
        <input
          type="email"
          value={usermail}
          onChange={(e) => setUsermail(e.target.value)}
          placeholder="Enter User Mail"
        />
        <br />
        <label>User ID:</label>
        <input
          type="text"
          value={userid}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="Enter User ID"
        />
        <br />
        <button type="submit">Create Account</button>
      </form>

      {info && (
        <div className="form-container">
          <h3>Account Details</h3>
          <ul>
            <li>
              <strong>Name:</strong> {info.username}
            </li>
            <li>
              <strong>Email:</strong> {info.usermail}
            </li>
            <li>
              <strong>ID:</strong> {info.userid}
            </li>
          </ul>
          <button onClick={deleteAccount}>Delete Account</button>
        </div>
      )}

      {readyForTransaction && (
        <div className="transaction-form">
          <h3>Need To Make a Transaction?</h3>
          <form onSubmit={bank}>
            <label>Choose Your Transaction</label>
            <select
              value={transaction}
              onChange={(e) => setTransaction(e.target.value)}
            >
              <option value="">-- Select --</option>
              <option value="Deposit">Deposit</option>
              <option value="Withdraw">Withdraw</option>
            </select>
            <h2>Your Bank Balance is Rs.{amount}</h2>
            <h3>Enter The Amount</h3>
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Enter amount"
            />
            <br />
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default App;
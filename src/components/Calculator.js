import React, { useState } from "react";
import "../index.css";

function Calculator() {
  const [userInput, setUserInput] = useState("");
  const [emptyInputMsg, setEmptyInputMsg] = useState("");
  const [validInput, setValidInput] = useState("");
  const [disabled, setDisabled] = useState(0);
  const [operands, setOperands] = useState("");
  const [operators, setOperators] = useState("");
  const [valid, setValid] = useState("");

  const handlerValueChange = e => {
    if (e.target.value.match(/[^0-9-+/*,.]+$/)) {
      setValidInput("Only numbers and arithemtic operators are valid!");
      setTimeout(() => {
        setValidInput(false);
      }, 3000);
    } else {
      setUserInput(e.target.value);
    }
  };

  const submitHandler = input => {
    let expressions = input.split(",");
    let stack = [];
    let operand = 0;
    let operator = 0;

    for (let i = 0; i < expressions.length; i++) {
      if (!isNaN(expressions[i]) && isFinite(expressions[i])) {
        stack.push(expressions[i]);
        operand++;
      } else {
        operator++;
        if (expressions[i] === "+") {
          stack.push(parseFloat(stack.pop()) + parseFloat(stack.pop()));
        } else if (expressions[i] === "-") {
          stack.push(parseFloat(stack.pop()) - parseFloat(stack.pop()));
        } else if (expressions[i] === "*") {
          stack.push(parseFloat(stack.pop()) * parseFloat(stack.pop()));
        } else if (expressions[i] === "/") {
          stack.push(parseFloat(stack.pop()) / parseFloat(stack.pop()));
        }
      }
    }
    if (userInput === "") {
      setEmptyInputMsg("You did not enter anything!");
    } else if (operand === operator + 1) {
      setValid("=" + stack[0]);
      setDisabled(1);
    } else if (operand <= operator) {
      setOperands('Something went wrong! Check the number of OPERANDS"');
      setDisabled(0);
    } else {
      setOperators("Something went wrong! Check the number of OPERATORS");
      setDisabled(0);
    }
    setTimeout(() => {
      setEmptyInputMsg(false);
      setOperands(false);
      setOperators(false);
    }, 3000);
  };

  const clearHandler = () => {
    setUserInput("");
    setValidInput("");
    setDisabled(0);
    setValid("");
  };
  return (
    <div className="container">
      <h1>Reverse Polish Notation Calculator</h1>
      <input
        onChange={handlerValueChange}
        placeholder="Enter the operand and operator: 2,6,5,5,4,*,-,+,/"
        value={userInput + valid}
        type="text"
        pattern="[0-9]*"
        name="input"
      />
      <div className="messages">
        <p> {emptyInputMsg}</p>
        <p>{operands}</p>
        <p>{operators}</p>
        <p>{validInput}</p>
      </div>
      <button onClick={clearHandler} type="submit">
        Clear
      </button>
      <button
        disabled={disabled}
        onClick={() => submitHandler(userInput)}
        type="submit"
      >
        Compute
      </button>
    </div>
  );
}

export default Calculator;

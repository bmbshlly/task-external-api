import React, { useRef, useState } from "react";
import axios from "./axios";
function App() {
  const testStr = useRef();
  const [loading, setloading] = useState("");
  const [roll, setroll] = useState([]);
  const [results, setresults] = useState([]);
  const [column, setcolumn] = useState([]);
  function handleSubmission(e) {
    const arr = testStr.current.value.split(",");
    let flag = 1;
    for (let i = 0; i < arr.length; i++) {
      if (!Number(arr[i])) {
        flag = 0;
        break;
      } else {
        arr[i] = Number(arr[i]);
      }
    }
    if (flag) {
      setloading("wait while we fetch data :)");

      //backend send data
      axios.get(`/rollnumber?str=${testStr.current.value}`).then((res) => {
        setloading("Here you go!");
        setroll(arr);
        setresults(res.data);
        setcolumn(["roll no.", "result"]);
      });
    } else {
      setloading("Please rectify input.");
    }
  }
  return (
    <div align="middle">
      <p>Enter roll number (starts from 1) in comma separated format: </p>
      <input ref={testStr} type="text" />
      <br />
      <br />
      <button onClick={handleSubmission}>submit</button>
      <p>{loading}</p>
      <table>
        <thead>
          <tr>
            <th>{column[0]}</th>
            <th>{column[1]}</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result, index) => {
            if (result) {
              result = "Pass";
            } else {
              result = "Fail";
            }
            return (
              <tr key={index}>
                <td>{roll[index]}</td>
                <td>{result}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;

import { useState } from "react";
import HeirInput from "./components/HeirInput";
import ResultTable from "./components/ResultTable";
import { calculateHanafi } from "./logic/hanafiEngine";

export default function App() {
  const [estate, setEstate] = useState(1000000);
  const [heirs, setHeirs] = useState({
    wife: 1,
    son: 0,
    daughter: 1,
    father: 0,
    mother: 0
  });

  const result = calculateHanafi(estate, heirs);

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h1>Islamic Inheritance Calculator (Hanafi)</h1>

      <label>Estate Amount</label><br />
      <input
        type="number"
        value={estate}
        onChange={(e) => setEstate(+e.target.value)}
      />

      <h3>Heirs</h3>
      <HeirInput heirs={heirs} setHeirs={setHeirs} />

      <h3>Result</h3>
      <ResultTable result={result} />
    </div>
  );
}

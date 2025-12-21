
import { useState } from "react";
import HeirInput from "./components/HeirInput";
import ResultTable from "./components/ResultTable";
import FiqhSelector from "./components/FiqhSelector";
import { calculateInheritance } from "./logic/inheritanceEngine";

export default function App() {
  const [estate, setEstate] = useState(1000);
  const [fiqh, setFiqh] = useState("hanafi");

  const [heirs, setHeirs] = useState({
    husband: 0,
    wife: ,
    son: 0,
    daughter: 0,
    father: 0,
    mother: 0,
    brother: 0,
    sister: 0
  });

  const result = calculateInheritance(estate, heirs, fiqh);

  return (
    <div style={{ padding: 20 }}>
      <h1>Islamic Inheritance Calculator</h1>

      <FiqhSelector value={fiqh} onChange={setFiqh} />

      <br />
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

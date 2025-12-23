import { exportToPDF } from "../utils/pdfExport";
import { getExplanation } from "../fiqh/explanations";

export default function ResultTable({ result, estate }: any) {
  return (
    <div>
      <button
        onClick={() => exportToPDF(result, estate)}
        style={{ marginBottom: "10px" }}
      >
        Export PDF
      </button>

      <table border={1} cellPadding={8}>
        <thead>
          <tr>
            <th>Heir</th>
            <th>Fraction</th>
            <th>Amount</th>
            <th>Reason</th>
          </tr>
        </thead>
        <tbody>
          {result.map((r: any, i: number) => (
            <tr key={i}>
              <td>{r.heir}</td>
              <td>{r.fraction}</td>
              <td>{r.amount.toFixed(2)}</td>
              <td>{r.reason}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


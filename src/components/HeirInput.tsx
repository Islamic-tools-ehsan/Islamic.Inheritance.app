export default function HeirInput({ heirs, setHeirs }: any) {
  return (
    <>
      {Object.keys(heirs).map((h) => (
        <div key={h}>
          <label>{h}</label>
          <input
            type="number"
            min={0}
            value={heirs[h]}
            onChange={(e) =>
              setHeirs({ ...heirs, [h]: +e.target.value })
            }
          />
        </div>
      ))}
    </>
  );
}

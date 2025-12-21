export function calculateHanafi(estate: number, heirs: any) {
  const results: any[] = [];
  let remaining = estate;

  // Wife
  if (heirs.wife > 0) {
    const share = heirs.son > 0 || heirs.daughter > 0
      ? estate * (1 / 8)
      : estate * (1 / 4);

    results.push({
      heir: "Wife",
      fraction: heirs.son > 0 || heirs.daughter > 0 ? "1/8" : "1/4",
      amount: share,
      reason: "Spouse share (Qur'an 4:12)"
    });
    remaining -= share;
  }

  // Mother
  if (heirs.mother > 0) {
    const share = heirs.son > 0 || heirs.daughter > 0
      ? estate * (1 / 6)
      : estate * (1 / 3);

    results.push({
      heir: "Mother",
      fraction: heirs.son > 0 || heirs.daughter > 0 ? "1/6" : "1/3",
      amount: share,
      reason: "Mother's share (Qur'an 4:11)"
    });
    remaining -= share;
  }

  // Daughters (no sons)
  if (heirs.daughter > 0 && heirs.son === 0) {
    const share = heirs.daughter === 1
      ? estate * (1 / 2)
      : estate * (2 / 3);

    results.push({
      heir: "Daughter(s)",
      fraction: heirs.daughter === 1 ? "1/2" : "2/3",
      amount: share,
      reason: "Daughters' share (Qur'an 4:11)"
    });
    remaining -= share;
  }

  // Sons or residue
  if (remaining > 0 && (heirs.son > 0)) {
    results.push({
      heir: "Son(s)",
      fraction: "Residue",
      amount: remaining,
      reason: "Residuary (Asabah)"
    });
    remaining = 0;
  }

  return results;
}

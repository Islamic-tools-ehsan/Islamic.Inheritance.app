export function hanafiEngine(estate: number, heirs: any) {
  const res: any[] = [];
  let remaining = estate;

  // Spouse
  if (heirs.wife > 0) {
    const share = heirs.son || heirs.daughter ? estate / 8 : estate / 4;
    res.push({
      heir: "Wife",
      fraction: heirs.son || heirs.daughter ? "1/8" : "1/4",
      amount: share,
      reason: "Qur'an 4:12"
    });
    remaining -= share;
  }

  // Mother
  if (heirs.mother > 0) {
    const share = heirs.son || heirs.daughter ? estate / 6 : estate / 3;
    res.push({
      heir: "Mother",
      fraction: heirs.son || heirs.daughter ? "1/6" : "1/3",
      amount: share,
      reason: "Qur'an 4:11"
    });
    remaining -= share;
  }

  // Daughters (no sons)
  if (heirs.daughter > 0 && heirs.son === 0) {
    const share = heirs.daughter === 1 ? estate / 2 : estate * 2 / 3;
    res.push({
      heir: "Daughter(s)",
      fraction: heirs.daughter === 1 ? "1/2" : "2/3",
      amount: share,
      reason: "Qur'an 4:11"
    });
    remaining -= share;
  }

  // Sons (asabah)
  if (remaining > 0 && heirs.son > 0) {
    res.push({
      heir: "Son(s)",
      fraction: "Residue",
      amount: remaining,
      reason: "Asabah"
    });
  }

  return res;
      }
      


export function hanafiEngine(estate: number, heirs: any) {
  const res: any[] = [];
  let remaining = estate;

  const hasChildren = heirs.son > 0 || heirs.daughter > 0;
  const hasSiblings = heirs.brother > 0 || heirs.sister > 0;

  // WIFE
  if (heirs.wife > 0) {
    const share = hasChildren ? estate / 8 : estate / 4;
    res.push({
      heir: "Wife",
      fraction: hasChildren ? "1/8" : "1/4",
      amount: share,
      reason: "Spouse share (Qur'an 4:12)"
    });
    remaining -= share;
  }

  // HUSBAND
  if (heirs.husband > 0) {
    const share = hasChildren ? estate / 4 : estate / 2;
    res.push({
      heir: "Husband",
      fraction: hasChildren ? "1/4" : "1/2",
      amount: share,
      reason: "Spouse share (Qur'an 4:12)"
    });
    remaining -= share;
  }

  // MOTHER
  if (heirs.mother > 0) {
    const share =
      hasChildren || hasSiblings
        ? estate / 6
        : estate / 3;

    res.push({
      heir: "Mother",
      fraction: hasChildren || hasSiblings ? "1/6" : "1/3",
      amount: share,
      reason: "Mother's share (Qur'an 4:11)"
    });
    remaining -= share;
  }

  // FATHER
  if (heirs.father > 0) {
    const share = hasChildren ? estate / 6 : 0;

    if (share > 0) {
      res.push({
        heir: "Father",
        fraction: "1/6",
        amount: share,
        reason: "Father fixed share (Qur'an 4:11)"
      });
      remaining -= share;
    }

    // Father takes residue
    if (remaining > 0) {
      res.push({
        heir: "Father",
        fraction: "Residue",
        amount: remaining,
        reason: "Father as Asabah"
      });
      remaining = 0;
    }

    return res; // Father blocks siblings completely
  }

  // DAUGHTERS (no sons)
  if (heirs.daughter > 0 && heirs.son === 0) {
    const share =
      heirs.daughter === 1
        ? estate / 2
        : estate * 2 / 3;

    res.push({
      heir: "Daughter(s)",
      fraction: heirs.daughter === 1 ? "1/2" : "2/3",
      amount: share,
      reason: "Daughters' share (Qur'an 4:11)"
    });
    remaining -= share;
  }

  // SONS (asabah)
  if (heirs.son > 0) {
    res.push({
      heir: "Son(s)",
      fraction: "Residue",
      amount: remaining,
      reason: "Asabah (sons block siblings)"
    });
    remaining = 0;
    return res;
  }

  // SIBLINGS (only if no father & no sons)
  if (!hasChildren && heirs.father === 0) {
    if (heirs.brother > 0 || heirs.sister > 0) {
      res.push({
        heir: "Sibling(s)",
        fraction: "Residue",
        amount: remaining,
        reason: "Asabah (Qur'an 4:176)"
      });
      remaining = 0;
    }
  }

  return res;
}

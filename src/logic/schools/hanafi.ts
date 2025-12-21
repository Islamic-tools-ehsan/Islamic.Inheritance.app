
type Share = {
  heir: string;
  fraction: string;
  amount: number;
  reason: string;
  fixed?: boolean;
};

export function hanafiEngine(estate: number, heirs: any) {
  const res: Share[] = [];
  let fixedTotal = 0;

  const hasChildren = heirs.son > 0 || heirs.daughter > 0;
  const hasSiblings = heirs.brother > 0 || heirs.sister > 0;
  const hasGrandfather = heirs.grandfather > 0;

  /* ================= SPOUSE ================= */

  if (heirs.wife > 0) {
    const frac = hasChildren ? 1 / 8 : 1 / 4;
    const amt = estate * frac;
    res.push({
      heir: "Wife",
      fraction: hasChildren ? "1/8" : "1/4",
      amount: amt,
      fixed: true,
      reason: "Spouse share (Qur'an 4:12)"
    });
    fixedTotal += amt;
  }

  if (heirs.husband > 0) {
    const frac = hasChildren ? 1 / 4 : 1 / 2;
    const amt = estate * frac;
    res.push({
      heir: "Husband",
      fraction: hasChildren ? "1/4" : "1/2",
      amount: amt,
      fixed: true,
      reason: "Spouse share (Qur'an 4:12)"
    });
    fixedTotal += amt;
  }

  /* ================= MOTHER ================= */

  if (heirs.mother > 0) {
    const frac = hasChildren || hasSiblings ? 1 / 6 : 1 / 3;
    const amt = estate * frac;
    res.push({
      heir: "Mother",
      fraction: frac === 1 / 6 ? "1/6" : "1/3",
      amount: amt,
      fixed: true,
      reason: "Mother's share (Qur'an 4:11)"
    });
    fixedTotal += amt;
  }

  /* ================= FATHER ================= */

  if (heirs.father > 0) {
    if (hasChildren) {
      const amt = estate / 6;
      res.push({
        heir: "Father",
        fraction: "1/6",
        amount: amt,
        fixed: true,
        reason: "Father fixed share (Qur'an 4:11)"
      });
      fixedTotal += amt;
    }
  }

  /* ================= DAUGHTERS (NO SONS) ================= */

  if (heirs.daughter > 0 && heirs.son === 0) {
    const frac = heirs.daughter === 1 ? 1 / 2 : 2 / 3;
    const amt = estate * frac;
    res.push({
      heir: "Daughter(s)",
      fraction: heirs.daughter === 1 ? "1/2" : "2/3",
      amount: amt,
      fixed: true,
      reason: "Daughters' share (Qur'an 4:11)"
    });
    fixedTotal += amt;
  }

  /* ================= AWL ================= */

  if (fixedTotal > estate) {
    const ratio = estate / fixedTotal;
    res.forEach(r => {
      if (r.fixed) r.amount *= ratio;
    });
    return res.map(r => ({
      ...r,
      reason: r.reason + " (Adjusted by Awl)"
    }));
  }

  let remaining = estate - fixedTotal;

  /* ================= ASABAH ================= */

  if (heirs.father > 0 && remaining > 0) {
    res.push({
      heir: "Father",
      fraction: "Residue",
      amount: remaining,
      reason: "Father as Asabah (blocks siblings)"
    });
    return res;
  }

  if (hasGrandfather && remaining > 0) {
    res.push({
      heir: "Grandfather",
      fraction: "Residue",
      amount: remaining,
      reason: "Grandfather as Asabah (Hanafi)"
    });
    return res;
  }

  if (heirs.son > 0 && remaining > 0) {
    res.push({
      heir: "Son(s)",
      fraction: "Residue",
      amount: remaining,
      reason: "Asabah (sons)"
    });
    return res;
  }

  if (!hasChildren && !heirs.father && (heirs.brother > 0 || heirs.sister > 0)) {
    res.push({
      heir: "Sibling(s)",
      fraction: "Residue",
      amount: remaining,
      reason: "Asabah (Qur'an 4:176)"
    });
    return res;
  }

  /* ================= RADD ================= */

  if (remaining > 0) {
    const eligible = res.filter(r => r.fixed && r.heir !== "Husband" && r.heir !== "Wife");
    const totalEligible = eligible.reduce((s, r) => s + r.amount, 0);

    eligible.forEach(r => {
      r.amount += (r.amount / totalEligible) * remaining;
      r.reason += " (Radd applied)";
    });
  }

  return res;
}

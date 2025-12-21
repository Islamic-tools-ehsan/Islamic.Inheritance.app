
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

  const hasChildren =
    heirs.son > 0 ||
    heirs.daughter > 0 ||
    heirs.sonsSon > 0 ||
    heirs.sonsDaughter > 0;

  const hasFather = heirs.father > 0;
  const hasGrandfather = heirs.grandfather > 0;

  /* ===== SPOUSE ===== */

  if (heirs.wife > 0) {
    const f = hasChildren ? 1 / 8 : 1 / 4;
    res.push({
      heir: "Wife",
      fraction: f === 1 / 8 ? "1/8" : "1/4",
      amount: estate * f,
      fixed: true,
      reason: "Qur’an 4:12"
    });
    fixedTotal += estate * f;
  }

  if (heirs.husband > 0) {
    const f = hasChildren ? 1 / 4 : 1 / 2;
    res.push({
      heir: "Husband",
      fraction: f === 1 / 4 ? "1/4" : "1/2",
      amount: estate * f,
      fixed: true,
      reason: "Qur’an 4:12"
    });
    fixedTotal += estate * f;
  }

  /* ===== MOTHER ===== */

  if (heirs.mother > 0) {
    const hasManySiblings =
      heirs.brother + heirs.sister + heirs.maternalBrother + heirs.maternalSister >= 2;
    const f = hasChildren || hasManySiblings ? 1 / 6 : 1 / 3;
    res.push({
      heir: "Mother",
      fraction: f === 1 / 6 ? "1/6" : "1/3",
      amount: estate * f,
      fixed: true,
      reason: "Qur’an 4:11"
    });
    fixedTotal += estate * f;
  }

  /* ===== DAUGHTERS ===== */

  if (heirs.daughter > 0 && heirs.son === 0) {
    const f = heirs.daughter === 1 ? 1 / 2 : 2 / 3;
    res.push({
      heir: "Daughter(s)",
      fraction: f === 1 / 2 ? "1/2" : "2/3",
      amount: estate * f,
      fixed: true,
      reason: "Qur’an 4:11"
    });
    fixedTotal += estate * f;
  }

  /* ===== SON’S DAUGHTER ===== */

  if (
    heirs.sonsDaughter > 0 &&
    heirs.son === 0 &&
    heirs.daughter === 0
  ) {
    const f = heirs.sonsDaughter === 1 ? 1 / 2 : 2 / 3;
    res.push({
      heir: "Son’s Daughter",
      fraction: f === 1 / 2 ? "1/2" : "2/3",
      amount: estate * f,
      fixed: true,
      reason: "Analogy to daughters (Hanafi)"
    });
    fixedTotal += estate * f;
  }

  /* ===== MATERNAL SIBLINGS (KALALAH) ===== */

  if (
    !hasChildren &&
    !hasFather &&
    !hasGrandfather &&
    (heirs.maternalBrother > 0 || heirs.maternalSister > 0)
  ) {
    const count = heirs.maternalBrother + heirs.maternalSister;
    const f = count === 1 ? 1 / 6 : 1 / 3;
    res.push({
      heir: "Maternal Sibling(s)",
      fraction: f === 1 / 6 ? "1/6" : "1/3",
      amount: estate * f,
      fixed: true,
      reason: "Qur’an 4:12 (Kalālah)"
    });
    fixedTotal += estate * f;
  }

  /* ===== AWL ===== */

  if (fixedTotal > estate) {
    const ratio = estate / fixedTotal;
    res.forEach(r => (r.amount *= ratio));
    return res;
  }

  let remaining = estate - fixedTotal;

  /* ===== ASABAH ===== */

  if (heirs.son > 0 || heirs.sonsSon > 0) {
    res.push({
      heir: heirs.son > 0 ? "Son(s)" : "Son’s Son(s)",
      fraction: "Residue",
      amount: remaining,
      reason: "Asabah"
    });
    return res;
  }

  if (heirs.father > 0) {
    res.push({
      heir: "Father",
      fraction: "Residue",
      amount: remaining,
      reason: "Asabah"
    });
    return res;
  }

  /* ===== RADD ===== */

  if (remaining > 0) {
    const eligible = res.filter(
      r => r.fixed && r.heir !== "Husband" && r.heir !== "Wife"
    );
    const sum = eligible.reduce((s, r) => s + r.amount, 0);
    eligible.forEach(r => {
      r.amount += (r.amount / sum) * remaining;
      r.reason += " (Radd)";
    });
  }

  return res;
}

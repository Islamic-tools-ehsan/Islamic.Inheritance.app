import { hanafiEngine } from "./hanafi";

export function shafiiEngine(estate: number, heirs: any) {
  // If no grandfather → use Hanafi logic
  if (heirs.grandfather === 0) {
    return hanafiEngine(estate, heirs);
  }

  const res: any[] = [];
  let remaining = estate;

  // Grandfather fixed share
  const share = estate / 6;
  res.push({
    heir: "Grandfather",
    fraction: "1/6",
    amount: share,
    reason: "Grandfather fixed share (Shafi‘i)"
  });
  remaining -= share;

  // Siblings share residue
  if (heirs.brother > 0 || heirs.sister > 0) {
    res.push({
      heir: "Sibling(s)",
      fraction: "Residue",
      amount: remaining,
      reason: "Siblings inherit with grandfather (Shafi‘i)"
    });
    remaining = 0;
  }

  return res;
}

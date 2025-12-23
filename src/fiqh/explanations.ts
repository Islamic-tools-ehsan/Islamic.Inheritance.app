export function getExplanation(heir: string, school: string) {
  const base: any = {
    Wife: "Qur’an 4:12 – Wife receives 1/4 or 1/8 depending on children.",
    Husband: "Qur’an 4:12 – Husband receives 1/2 or 1/4 depending on children.",
    Mother: "Qur’an 4:11 – Mother receives 1/3 or 1/6 due to children or siblings.",
    Father: "Qur’an 4:11 – Father receives fixed share and may take residue.",
    "Maternal Sibling(s)":
      "Qur’an 4:12 – Maternal siblings inherit only in Kalālah."
  };

  if (school === "hanafi" && heir === "Grandfather") {
    return "Hanafi: Grandfather is treated like father and blocks siblings.";
  }

  return base[heir] || "Inheritance based on classical Sunni fiqh.";
}

import { hanafiEngine } from "./schools/hanafi";
import { shafiiEngine } from "./schools/shafii";
import { malikiEngine } from "./schools/maliki";
import { hanbaliEngine } from "./schools/hanbali";
import { ijmaEngine } from "./schools/ijma";

export function calculateInheritance(
  estate: number,
  heirs: any,
  fiqh: string
) {
  switch (fiqh) {
    case "shafii":
      return shafiiEngine(estate, heirs);
    case "maliki":
      return malikiEngine(estate, heirs);
    case "hanbali":
      return hanbaliEngine(estate, heirs);
    case "ijma":
      return ijmaEngine(estate, heirs);
    default:
      return hanafiEngine(estate, heirs);
  }
}

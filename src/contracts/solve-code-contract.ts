import { NS } from "@ns";
import { solveTotalWaysToSumII } from "lib/codeContract";

export async function main(ns: NS): Promise<void> {
  const contractType = ns.args[0] as string;
  let solution: unknown;

  if (contractType === "twts2") {
    const servers: number[] = JSON.parse(ns.args[1] as string);
    solution = solveTotalWaysToSumII(servers);
  }

  ns.tprint(solution);
}

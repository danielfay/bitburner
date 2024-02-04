import { FactionWorkType, NS } from "@ns";

export async function main(ns: NS): Promise<void> {
  ns.tail();

  const factionName = "CyberSec";
  ns.print(`Joining ${factionName}...`);

  ns.singularity.joinFaction(factionName);
  const factionWorkType = "hacking" as FactionWorkType;
  ns.singularity.workForFaction(factionName, factionWorkType, true);
}

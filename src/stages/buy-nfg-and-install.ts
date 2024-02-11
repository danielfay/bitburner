import { NS } from "@ns";
import { getCurrentFactionRep } from "lib/stats";

export async function main(ns: NS): Promise<void> {
  ns.disableLog("sleep");
  ns.tail();

  const joinedFactions = ns.getPlayer().factions;
  let highestFactionRep = -1;
  let highestFactionRepName = "";

  for (const factionName of joinedFactions) {
    const factionRep = getCurrentFactionRep(ns, factionName);
    if (factionRep > highestFactionRep) {
      highestFactionRep = factionRep;
      highestFactionRepName = factionName;
    }
  }

  if (!highestFactionRepName) ns.exit();

  let boughtNFG = true;
  while (boughtNFG) {
    boughtNFG = ns.singularity.purchaseAugmentation(
      highestFactionRepName,
      "NeuroFlux Governor"
    );
  }

  ns.singularity.installAugmentations("init.js");
}

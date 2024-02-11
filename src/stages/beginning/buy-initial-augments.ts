import { NS } from "@ns";
import { getAugmentDetails } from "lib/augment";

export async function main(ns: NS): Promise<void> {
  const factionName = "CyberSec";
  const augmentNames = ns.singularity.getAugmentationsFromFaction(factionName);
  const augments = getAugmentDetails(ns, augmentNames);
}

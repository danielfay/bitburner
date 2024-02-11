import { NS } from "@ns";
import { getAugmentDetails } from "lib/augment";

export async function main(ns: NS): Promise<void> {
  ns.disableLog("sleep");
  ns.tail();

  const factionName = "CyberSec";
  const augmentNames = ns.singularity.getAugmentationsFromFaction(factionName);
  const augments = getAugmentDetails(ns, augmentNames);

  for (const augment of augments) {
    let currentMoney = ns.getServerMoneyAvailable("home");
    let currentFactionRep = ns.singularity.getFactionRep(factionName);

    ns.print(
      `Waiting to have $${augment.price} and ${augment.repReq} rep for ${augment.name}...`
    );
    while (currentMoney < augment.price || currentFactionRep < augment.repReq) {
      await ns.sleep(10000);
    }

    ns.print(`Purchasing ${augment.name} from ${factionName}.`);
    ns.singularity.purchaseAugmentation(factionName, augment.name);
  }
}

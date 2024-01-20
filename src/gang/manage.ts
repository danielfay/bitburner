import { NS } from "@ns";
import {
  ascendMembers,
  assignMembers,
  equipMembers,
  mobTerritoryClash,
  recruitNewMembers,
} from "lib/gang";

export async function main(ns: NS): Promise<void> {
  const priority = ns.args[0] as string;
  const forProfit = ns.args[1] as string;

  ns.disableLog("sleep");
  ns.disableLog("getServerMoneyAvailable");
  ns.disableLog("gang.setMemberTask");
  ns.disableLog("gang.purchaseEquipment");
  ns.tail();

  while (true) {
    if (ns.gang.inGang()) {
      const lastTerritoryClash = await mobTerritoryClash(ns);

      recruitNewMembers(ns);
      ascendMembers(ns);
      if (!forProfit) {
        equipMembers(ns);
      }
      await assignMembers(ns, priority);

      const currentTime = performance.now();
      await ns.sleep(19000 - (currentTime - lastTerritoryClash));
    } else {
      ns.gang.createGang("Slum Snakes");
      await ns.sleep(10000);
    }
  }
}

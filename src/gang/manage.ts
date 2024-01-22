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
  const forProfit = Boolean(ns.args[1]);
  const ignoreBonusTime = Boolean(ns.args[2]);

  ns.print("--- Called with args");
  ns.print(`Priority: ${priority}`);
  ns.print(`Save profits? ${forProfit}`);
  ns.print(`Ignore Bonus Time? ${ignoreBonusTime}`);
  ns.print("---");

  ns.disableLog("sleep");
  ns.disableLog("getServerMoneyAvailable");
  ns.disableLog("gang.setMemberTask");
  ns.disableLog("gang.purchaseEquipment");
  ns.tail();

  while (true) {
    if (ns.gang.inGang()) {
      const members = ns.gang.getMemberNames();
      if (members.length === 0) {
        recruitNewMembers(ns);
      }

      const lastTerritoryClash = await mobTerritoryClash(ns, ignoreBonusTime);

      recruitNewMembers(ns);
      ascendMembers(ns);
      if (!forProfit) {
        equipMembers(ns);
      }
      await assignMembers(ns, priority);

      const currentTime = performance.now();
      await ns.sleep(18000 - (currentTime - lastTerritoryClash));
    } else {
      ns.gang.createGang("Slum Snakes");
      await ns.sleep(10000);
    }
  }
}

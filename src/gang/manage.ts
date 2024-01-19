import { NS } from "@ns";
import {
  ascendMembers,
  assignMembers,
  equipMembers,
  recruitNewMembers,
} from "lib/gang";

export async function main(ns: NS): Promise<void> {
  const forProfit = ns.args[0];

  ns.disableLog("sleep");
  ns.disableLog("getServerMoneyAvailable");
  ns.tail();

  while (true) {
    if (ns.gang.inGang()) {
      recruitNewMembers(ns);
      ascendMembers(ns);
      if (!forProfit) {
        equipMembers(ns);
      }
      await assignMembers(ns);
    } else {
      ns.gang.createGang("Slum Snakes");
    }
    await ns.sleep(10000);
  }
}

import { NS } from "@ns";
import {
  ascendMembers,
  assignMembers,
  equipMembers,
  recruitNewMembers,
} from "lib/gang";

export async function main(ns: NS): Promise<void> {
  const priority = ns.args[0] as string;
  const forProfit = ns.args[1] as string;

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
      await assignMembers(ns, priority);
    } else {
      ns.gang.createGang("Slum Snakes");
    }
    await ns.sleep(10000);
  }
}

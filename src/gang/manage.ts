import { NS } from "@ns";
import {
  ascendMembers,
  assignMembers,
  equipMembers,
  recruitNewMembers,
} from "lib/gang";

export async function main(ns: NS): Promise<void> {
  ns.disableLog("sleep");

  while (true) {
    if (ns.gang.inGang()) {
      recruitNewMembers(ns);
      ascendMembers(ns);
      equipMembers(ns);
      assignMembers(ns);
    } else {
      ns.gang.createGang("Slum Snakes");
    }
    await ns.sleep(10000);
  }
}

import { NS } from "@ns";
import {
  deployHGWtoServer,
  growScriptName,
  loopAttackScriptName,
  weakenScriptName,
} from "lib/deploy";
import { findNukedHostnames } from "lib/networking";
import { findHackingTarget } from "lib/target";

export async function main(ns: NS): Promise<void> {
  let target = (ns.args[0] as string) ?? findHackingTarget(ns);
  let hostnames = findNukedHostnames(ns);

  let hackThreads = 0;
  let hackGroupRam = 0;
  let growThreads = 5;
  let growGroupRam = ns.getScriptRam(growScriptName) * growThreads;
  let weakenThreads = 1;
  let weakenGroupRam = ns.getScriptRam(weakenScriptName) * weakenThreads;
  let HGWGroupRam = hackGroupRam + growGroupRam + weakenGroupRam;

  for (const hostname of hostnames) {
    deployHGWtoServer(
      ns,
      hostname,
      target,
      hackThreads,
      growThreads,
      weakenThreads,
      HGWGroupRam
    );
  }

  while (ns.getServerMoneyAvailable(target) !== ns.getServerMaxMoney(target)) {
    await ns.sleep(1000);
  }

  ns.spawn(loopAttackScriptName, { threads: 1, spawnDelay: 1000 });
}

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
  const target = (ns.args[0] as string) ?? findHackingTarget(ns);
  const hostnames = findNukedHostnames(ns);

  const hackThreads = 0;
  const hackGroupRam = 0;
  const growThreads = 5;
  const growGroupRam = ns.getScriptRam(growScriptName) * growThreads;
  const weakenThreads = 1;
  const weakenGroupRam = ns.getScriptRam(weakenScriptName) * weakenThreads;
  const HGWGroupRam = hackGroupRam + growGroupRam + weakenGroupRam;

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

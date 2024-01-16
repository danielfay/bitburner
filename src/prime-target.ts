import { NS } from "@ns";
import { findBasicMoneyTarget } from "lib/target";
import { findNukedHostnames } from "lib/networking";
import { deployHGWtoServer } from "lib/deploy";

export async function main(ns: NS): Promise<void> {
  let target = (ns.args[0] as string) ?? findBasicMoneyTarget(ns);
  let hostnames = findNukedHostnames(ns);

  let hackThreads = 0;
  let hackGroupRam = 0;
  let growThreads = 5;
  let growGroupRam = ns.getScriptRam("grow.js") * growThreads;
  let weakenThreads = 1;
  let weakenGroupRam = ns.getScriptRam("weaken.js") * weakenThreads;
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

  ns.spawn("ratio-attack-target.js", { threads: 1, spawnDelay: 1000 });
}

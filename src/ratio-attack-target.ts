import { NS } from "@ns";
import { findBasicMoneyTarget } from "lib/target";
import { findNukedHostnames } from "lib/networking";
import { deployHGWtoServer } from "lib/deploy";

export async function main(ns: NS): Promise<void> {
  let target = (ns.args[0] as string) ?? findBasicMoneyTarget(ns);
  let hostnames = findNukedHostnames(ns);

  let hackThreads = 1;
  let hackGroupRam = ns.getScriptRam("hack.js") * hackThreads;
  let growThreads = 30;
  let growGroupRam = ns.getScriptRam("grow.js") * growThreads;
  let weakenThreads = 10;
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
    await ns.sleep(1000);
  }

  ns.spawn("setup-ratio-home.js", { threads: 1, spawnDelay: 1000 });
}

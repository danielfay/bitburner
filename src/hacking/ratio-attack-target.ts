import { NS } from "@ns";
import { findHackingTarget } from "lib/target";
import { findNukedHostnames } from "lib/networking";
import { deployHGWtoServer } from "lib/deploy";

export async function main(ns: NS): Promise<void> {
  let target = (ns.args[0] as string) ?? findHackingTarget(ns);
  let hostnames = findNukedHostnames(ns);

  let hackThreads = 1;
  let hackGroupRam = ns.getScriptRam("hacking/hack.js") * hackThreads;
  let growThreads = 50;
  let growGroupRam = ns.getScriptRam("hacking/grow.js") * growThreads;
  let weakenThreads = 10;
  let weakenGroupRam = ns.getScriptRam("hacking/weaken.js") * weakenThreads;
  let HGWGroupRam = hackGroupRam + growGroupRam + weakenGroupRam;

  let totalDeployedHackThreads = 0;
  for (const hostname of hostnames) {
    const deployedHackThreads = deployHGWtoServer(
      ns,
      hostname,
      target,
      hackThreads,
      growThreads,
      weakenThreads,
      HGWGroupRam
    );
    totalDeployedHackThreads = totalDeployedHackThreads + deployedHackThreads;
    await ns.sleep(1000);
  }

  ns.tprint(`Deplyed a total of ${totalDeployedHackThreads} hacking threads.`);
}

import { NS } from "@ns";
import { findHackingTarget } from "lib/target";
import { findNukedHostnames } from "lib/networking";
import {
  deployHGWtoServer,
  growScriptName,
  hackScriptName,
  weakenScriptName,
} from "lib/deploy";

export async function main(ns: NS): Promise<void> {
  let target = (ns.args[0] as string) ?? findHackingTarget(ns);
  let hostnames = findNukedHostnames(ns);

  let hackThreads = 1;
  let hackGroupRam = ns.getScriptRam(hackScriptName) * hackThreads;
  let growThreads = 50;
  let growGroupRam = ns.getScriptRam(growScriptName) * growThreads;
  let weakenThreads = 10;
  let weakenGroupRam = ns.getScriptRam(weakenScriptName) * weakenThreads;
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

  ns.spawn("setup-home.js", { threads: 1, spawnDelay: 1000 });
}

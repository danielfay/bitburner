import { NS } from "@ns";
import {
  deployHGWtoServer,
  growScriptName,
  hackScriptName,
  weakenScriptName,
} from "lib/deploy";
import { findNukedHostnames } from "lib/networking";
import { findHackingTarget } from "lib/target";

export async function main(ns: NS): Promise<void> {
  const target = (ns.args[0] as string) ?? findHackingTarget(ns);
  const hostnames = findNukedHostnames(ns);

  const hackThreads = 1;
  const hackGroupRam = ns.getScriptRam(hackScriptName) * hackThreads;
  const growThreads = 50;
  const growGroupRam = ns.getScriptRam(growScriptName) * growThreads;
  const weakenThreads = 10;
  const weakenGroupRam = ns.getScriptRam(weakenScriptName) * weakenThreads;
  const HGWGroupRam = hackGroupRam + growGroupRam + weakenGroupRam;

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

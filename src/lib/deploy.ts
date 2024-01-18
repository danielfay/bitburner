import { NS } from "@ns";
import { getThreadsForRemainingMemory, getThreadsForScript } from "lib/memory";

export const hackScriptName = "hacking/hack.js";
export const growScriptName = "hacking/grow.js";
export const weakenScriptName = "hacking/weaken.js";

export function copyHGWFilesToServer(ns: NS, hostname: string) {
  ns.scp(hackScriptName, hostname);
  ns.scp(growScriptName, hostname);
  ns.scp(weakenScriptName, hostname);
}

export function deployHGWtoServer(
  ns: NS,
  hostname: string,
  target: string,
  hackThreads: number,
  growThreads: number,
  weakenThreads: number,
  HGWGroupRam: number
) {
  const hostRam = ns.getServerMaxRam(hostname);
  const HGWGroups = Math.floor(hostRam / HGWGroupRam);
  const remainingHostRam = hostRam - HGWGroupRam * HGWGroups;
  const extraGrowThreads = getThreadsForRemainingMemory(
    ns,
    hostname,
    growScriptName,
    remainingHostRam
  );
  let deployedHackThreads = 0;

  ns.killall(hostname);
  copyHGWFilesToServer(ns, hostname);

  if (HGWGroups) {
    if (hackThreads) {
      ns.exec(hackScriptName, hostname, hackThreads * HGWGroups, target);
      deployedHackThreads = hackThreads * HGWGroups;
    }
    ns.exec(
      growScriptName,
      hostname,
      growThreads * HGWGroups + extraGrowThreads,
      target
    );
    ns.exec(weakenScriptName, hostname, weakenThreads * HGWGroups, target);
  } else {
    const threads = getThreadsForScript(ns, weakenScriptName, hostname);
    if (threads) {
      ns.exec(weakenScriptName, hostname, threads, target);
    }
  }

  return deployedHackThreads;
}

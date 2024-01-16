import { NS } from "@ns";
import { getThreadsForRemainingMemory, getThreadsForScript } from "lib/memory";

export function copyHGWFilesToServer(ns: NS, hostname: string) {
  ns.scp("hack.js", hostname);
  ns.scp("grow.js", hostname);
  ns.scp("weaken.js", hostname);
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
    "grow.js",
    remainingHostRam
  );

  ns.killall(hostname);
  copyHGWFilesToServer(ns, hostname);

  if (HGWGroups) {
    if (hackThreads) {
      ns.exec("hack.js", hostname, hackThreads * HGWGroups, target);
    }
    ns.exec(
      "grow.js",
      hostname,
      growThreads * HGWGroups + extraGrowThreads,
      target
    );
    ns.exec("weaken.js", hostname, weakenThreads * HGWGroups, target);
  } else {
    const threads = getThreadsForScript(ns, "weaken.js", hostname);
    if (threads) {
      ns.exec("weaken.js", hostname, threads, target);
    }
  }
}

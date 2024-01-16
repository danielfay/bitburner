import { NS } from "@ns";
import { findBasicMoneyTarget } from "lib/target";
import { findNukedHostnames } from "lib/networking";
import { getThreadsForScript } from "lib/memory";

export async function main(ns: NS): Promise<void> {
  let target = (ns.args[0] as string) ?? findBasicMoneyTarget(ns);
  let hostnames = findNukedHostnames(ns);

  let hackRatio = 1;
  let hackGroupRam = ns.getScriptRam("hack.js") * hackRatio;
  let growRatio = 14;
  let growGroupRam = ns.getScriptRam("grow.js") * growRatio;
  let weakenRatio = 5;
  let weakenGroupRam = ns.getScriptRam("weaken.js") * weakenRatio;
  let HGWGroupRam = hackGroupRam + growGroupRam + weakenGroupRam;

  let totalAvailableRam = 0;
  for (const hostname of hostnames) {
    totalAvailableRam = totalAvailableRam + ns.getServerMaxRam(hostname);
  }

  let numberOfGroups = Math.floor(totalAvailableRam / HGWGroupRam);

  let hackThreads = numberOfGroups * hackRatio;
  let growThreads = numberOfGroups * growRatio;
  let weakenThreads = numberOfGroups * weakenRatio;

  while (weakenThreads > 0 && hostnames.length > 0) {
    const hostname = hostnames.shift() || "";
    const threads = getThreadsForScript(ns, "weaken.js", hostname);
    if (threads > 0) {
      ns.killall(hostname);
      ns.scp("weaken.js", hostname, "home");
      ns.exec("weaken.js", hostname, threads, target);
    }
    weakenThreads = weakenThreads - threads;
    await ns.sleep(1000);
  }

  while (growThreads > 0 && hostnames.length > 0) {
    const hostname = hostnames.shift() || "";
    const threads = getThreadsForScript(ns, "grow.js", hostname);
    if (threads > 0) {
      ns.killall(hostname);
      ns.scp("grow.js", hostname, "home");
      ns.exec("grow.js", hostname, threads, target);
    }
    growThreads = growThreads - threads;
    await ns.sleep(1000);
  }

  while (hackThreads > 0 && hostnames.length > 0) {
    const hostname = hostnames.shift() || "";
    const threads = getThreadsForScript(ns, "hack.js", hostname);
    if (threads > 0) {
      ns.killall(hostname);
      ns.scp("hack.js", hostname, "home");
      ns.exec("hack.js", hostname, threads, target);
    }
    hackThreads = hackThreads - threads;
    await ns.sleep(3000);
  }

  ns.spawn("setup-ratio-home.js");
}

import { NS } from "@ns";
import { getThreadsForScript } from "lib/memory";
import { findHackingTarget } from "lib/target";
import { growScriptName, hackScriptName, weakenScriptName } from "lib/deploy";

export async function main(ns: NS): Promise<void> {
  const killAllProcesses = Boolean(ns.args[0]);
  const target = findHackingTarget(ns);
  const tenPercentRam = Math.floor(ns.getServerMaxRam("home") * 0.1);
  const homeReserveRam = tenPercentRam >= 20 ? tenPercentRam : 20;
  const hackThreads = 5;
  const totalThreads = getThreadsForScript(
    ns,
    growScriptName,
    "home",
    homeReserveRam + hackThreads
  );
  const weakenThreads = Math.floor(totalThreads * 0.2);
  const growThreads = Math.floor(totalThreads * 0.8);

  if (killAllProcesses) {
    ns.killall("home");
  }
  ns.run("pservs/buy-initial.js");
  if (weakenThreads) {
    ns.run(weakenScriptName, weakenThreads, target);
  }
  if (hackThreads) {
    ns.run(hackScriptName, hackThreads, target);
  }
  if (growThreads) {
    ns.spawn(
      growScriptName,
      { threads: growThreads, spawnDelay: 1000 },
      target
    );
  }
}

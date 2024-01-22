import { NS } from "@ns";
import { BitNodeState, getBitNodeInformation } from "lib/controller";
import {
  gangManagerScriptName,
  growScriptName,
  hackScriptName,
  pservsBuyInitialScriptName,
  selfContainedHGWScriptName,
  weakenScriptName,
} from "lib/deploy";
import { getThreadsForScript } from "lib/memory";
import { findHackingTarget } from "lib/target";

export async function main(ns: NS): Promise<void> {
  const killAllProcesses = Boolean(ns.args[0]);
  const target = findHackingTarget(ns);
  const bitNodeInformation = getBitNodeInformation(ns);
  const baseHomeReserveRam = 20;

  let gangManagerRam = 0;
  if (bitNodeInformation.hasGangAccess) {
    gangManagerRam = ns.getScriptRam(gangManagerScriptName);
  }

  if (killAllProcesses) {
    ns.killall("home");
  }

  ns.run(pservsBuyInitialScriptName);

  if (bitNodeInformation.state === BitNodeState.early) {
    const hgwThreads = getThreadsForScript(
      ns,
      selfContainedHGWScriptName,
      "home",
      baseHomeReserveRam + gangManagerRam
    );
    ns.spawn(
      selfContainedHGWScriptName,
      {
        threads: hgwThreads,
        spawnDelay: 500,
      },
      target
    );
  } else if (bitNodeInformation.state === BitNodeState.mid) {
    const hackThreads = 5;
    const totalThreads = getThreadsForScript(
      ns,
      growScriptName,
      "home",
      baseHomeReserveRam + gangManagerRam + hackThreads
    );
    const weakenThreads = Math.floor(totalThreads * 0.2);
    const growThreads = Math.floor(totalThreads * 0.8);

    if (weakenThreads) {
      ns.run(weakenScriptName, weakenThreads, target);
    }
    if (hackThreads) {
      ns.run(hackScriptName, hackThreads, target);
    }
    if (growThreads) {
      ns.spawn(
        growScriptName,
        { threads: growThreads, spawnDelay: 500 },
        target
      );
    }
  }
}

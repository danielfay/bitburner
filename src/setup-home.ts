import { NS } from "@ns";
import { getThreadsForScript } from "lib/memory";
import { findHackingTarget } from "lib/target";

export async function main(ns: NS): Promise<void> {
  const target = (ns.args[0] as string) ?? findHackingTarget(ns);
  const hackThreads = 5;
  const totalThreads = getThreadsForScript(
    ns,
    "hacking/grow.js",
    "home",
    20 + hackThreads
  );
  const weakenThreads = Math.floor(totalThreads * 0.2);
  const growThreads = Math.floor(totalThreads * 0.8);

  ns.killall("home");
  ns.run("pservs/buy-initial.js");
  ns.run("hacking/weaken.js", weakenThreads, target);
  ns.run("hacking/hack.js", hackThreads, target);
  ns.spawn(
    "hacking/grow.js",
    { threads: growThreads, spawnDelay: 1000 },
    target
  );
}

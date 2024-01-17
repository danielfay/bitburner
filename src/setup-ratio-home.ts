import { NS } from "@ns";
import { getThreadsForScript } from "lib/memory";
import { findBasicMoneyTarget } from "lib/target";

export async function main(ns: NS): Promise<void> {
  const target = (ns.args[0] as string) ?? findBasicMoneyTarget(ns);
  const hackThreads = 5;
  const totalThreads = getThreadsForScript(
    ns,
    "grow.js",
    "home",
    20 + hackThreads
  );
  const weakenThreads = Math.floor(totalThreads * 0.2);
  const growThreads = Math.floor(totalThreads * 0.8);

  ns.killall("home");
  ns.run("buy-initial-pservs.js");
  ns.run("weaken.js", weakenThreads, target);
  ns.run("hack.js", hackThreads, target);
  ns.spawn("grow.js", { threads: growThreads, spawnDelay: 1000 }, target);
}

import { NS } from "@ns";
import { getThreadsForScript } from "lib/memory";
import { findBasicMoneyTarget } from "lib/target";

export async function main(ns: NS): Promise<void> {
  const target = (ns.args[0] as string) ?? findBasicMoneyTarget(ns);
  const totalThreads = getThreadsForScript(ns, "grow.js", "home", 20);
  const weakenThreads = Math.floor(totalThreads * 0.2);
  const growThreads = Math.floor(totalThreads * 0.8);

  ns.killall("home");
  ns.run("weaken.js", weakenThreads, target);
  ns.spawn("grow.js", growThreads, target);
}

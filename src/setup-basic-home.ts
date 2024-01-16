import { NS } from "@ns";
import { getThreadsForScript } from "lib/memory";
import { findBasicMoneyTarget } from "lib/target";

export async function main(ns: NS): Promise<void> {
  const script = (ns.args[0] as string) ?? "basic-money.js";
  const target = (ns.args[1] as string) ?? findBasicMoneyTarget(ns);
  const threads = getThreadsForScript(ns, script, "home", 20);

  ns.killall("home");
  ns.spawn(script, threads, target);
}

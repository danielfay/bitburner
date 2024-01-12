import { NS } from "@ns";
import { getThreadsForScript } from "lib/memory";

export async function main(ns: NS): Promise<void> {
  const script = (ns.args[0] as string) ?? "basic-money.js";
  const target = (ns.args[1] as string) ?? "n00dles";
  const threads = getThreadsForScript(ns, script, "home", 20);

  ns.killall("home");
  ns.run(script, threads, target);
}

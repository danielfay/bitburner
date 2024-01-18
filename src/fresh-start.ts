import { NS } from "@ns";
import { getThreadsForScript } from "lib/memory";
import { nukeServer } from "lib/access";
import { findHackingTarget } from "lib/target";

export async function main(ns: NS): Promise<void> {
  const script = "basic-money.js";
  const target = findHackingTarget(ns);
  const threads = getThreadsForScript(ns, script, "home", 25);

  nukeServer(ns, target);
  ns.run("deploy-basic-script.js", 1, "hackable", script, target);
  ns.run("buy-initial-pservs.js", 1, script, target);
  ns.spawn(script, threads, target);
}

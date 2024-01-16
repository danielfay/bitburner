import { NS } from "@ns";
import { getThreadsForScript } from "lib/memory";
import { nukeServer } from "lib/access";
import { findBasicMoneyTarget } from "lib/target";

export async function main(ns: NS): Promise<void> {
  const script = "basic-money.js";
  const target = findBasicMoneyTarget(ns);
  const threads = getThreadsForScript(ns, script, "home", 25);

  nukeServer(ns, target);
  ns.run("deploy-basic-script.js", 1, "hackable", script, target);
  ns.run("buy-initial-pservs.js", 1, script, target);
  ns.spawn(script, threads, target);
}

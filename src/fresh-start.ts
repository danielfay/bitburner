import { NS } from "@ns";
import { getThreadsForScript } from "lib/memory";
import { nukeServer } from "lib/access";

export async function main(ns: NS): Promise<void> {
  const script = "basic-money.js";
  const target = "n00dles";
  const threads = getThreadsForScript(ns, script, "home", 25);

  nukeServer(ns, target);
  ns.run("deploy-basic-script.js", 1, script, target, "hackable");
  ns.run("buy-initial-pservs.js", 1, script, target);
  ns.spawn(script, threads, 1, target);
}

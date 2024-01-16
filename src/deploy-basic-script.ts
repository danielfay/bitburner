import { NS } from "@ns";
import { nukeServer } from "lib/access";
import { getThreadsForScript } from "lib/memory";
import {
  findAllHostnames,
  findHackableHostnames,
  findPurchasedHostnames,
} from "lib/networking";
import { findBasicMoneyTarget } from "lib/target";

export async function main(ns: NS): Promise<void> {
  const serverType = (ns.args[0] as string) ?? "all";
  const script = (ns.args[1] as string) ?? "basic-money.js";
  const target = (ns.args[2] as string) ?? findBasicMoneyTarget(ns);
  let updatedServers = 0;

  let hostnames: string[] = [];
  if (serverType === "all") {
    hostnames = findAllHostnames(ns);
  } else if (serverType === "hackable") {
    hostnames = findHackableHostnames(ns);
  } else if (serverType === "purchased") {
    hostnames = findPurchasedHostnames(ns);
  }

  for (const hostname of hostnames) {
    const exists = ns.serverExists(hostname);
    if (!exists) {
      continue;
    }

    const nuked = nukeServer(ns, hostname);
    const threads = getThreadsForScript(ns, script, hostname);
    if (!nuked || !threads) {
      continue;
    }

    await deployScript(ns, script, hostname, threads, target);
    updatedServers = updatedServers + 1;
  }

  ns.tprint(`Updated ${updatedServers} servers. ${script} deployment done.`);
}

async function deployScript(
  ns: NS,
  script: string,
  hostname: string,
  threads: number,
  target: string
) {
  ns.scp(script, hostname, "home");
  ns.killall(hostname);

  if (target) {
    ns.exec(script, hostname, threads, target);
    await ns.sleep(2000);
  } else {
    ns.exec(script, hostname, threads);
  }
}

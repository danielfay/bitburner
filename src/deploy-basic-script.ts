import { NS } from "@ns";
import {
  findAllServers,
  findHackableServers,
  findPurchasedServers,
} from "lib/networking";

export async function main(ns: NS): Promise<void> {
  const script = ns.args[0] as string;
  const target = ns.args[1] as string;
  const serverType = (ns.args[2] as string) || "all";
  let updatedServers = 0;

  let servers: string[] = [];
  if (serverType === "all") {
    servers = findAllServers(ns);
  } else if (serverType === "hackable") {
    servers = findHackableServers(ns);
  } else if (serverType === "purchased") {
    servers = findPurchasedServers(ns);
  }

  for (const server of servers) {
    const exists = ns.serverExists(server);
    if (!exists) {
      continue;
    }

    const nuked = nukeServer(ns, server);
    const threads = getThreadsForScript(ns, script, server);
    if (!nuked || !threads) {
      continue;
    }

    await deployScript(ns, script, server, threads, target);
    updatedServers = updatedServers + 1;
  }

  ns.tprint(`Updated ${updatedServers} servers. ${script} deployment done.`);
}

function nukeServer(ns: NS, server: string) {
  try {
    if (ns.fileExists("BruteSSH.exe", "home")) {
      ns.brutessh(server);
    }
    if (ns.fileExists("FTPCrack.exe", "home")) {
      ns.ftpcrack(server);
    }
    if (ns.fileExists("relaySMTP.exe", "home")) {
      ns.relaysmtp(server);
    }
    if (ns.fileExists("HTTPWorm.exe", "home")) {
      ns.httpworm(server);
    }
    if (ns.fileExists("SQLInject.exe", "home")) {
      ns.sqlinject(server);
    }
    ns.nuke(server);

    return true;
  } catch {
    return false;
  }
}

function getThreadsForScript(ns: NS, script: string, server: string) {
  const scriptRam = ns.getScriptRam(script, "home");
  const serverRam = ns.getServerMaxRam(server);

  let threads = 0;
  if (serverRam > 0) {
    threads = Math.floor(serverRam / scriptRam);
  }

  return threads;
}

async function deployScript(
  ns: NS,
  script: string,
  server: string,
  threads: number,
  target: string
) {
  ns.scp(script, server, "home");
  ns.killall(server);

  if (target) {
    ns.exec(script, server, threads, target);
    await ns.sleep(2000);
  } else {
    ns.exec(script, server, threads);
  }
}

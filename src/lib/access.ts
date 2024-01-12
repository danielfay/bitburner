import { NS } from "@ns";

export function nukeServer(ns: NS, hostname: string) {
  try {
    if (ns.fileExists("BruteSSH.exe", "home")) {
      ns.brutessh(hostname);
    }
    if (ns.fileExists("FTPCrack.exe", "home")) {
      ns.ftpcrack(hostname);
    }
    if (ns.fileExists("relaySMTP.exe", "home")) {
      ns.relaysmtp(hostname);
    }
    if (ns.fileExists("HTTPWorm.exe", "home")) {
      ns.httpworm(hostname);
    }
    if (ns.fileExists("SQLInject.exe", "home")) {
      ns.sqlinject(hostname);
    }
    ns.nuke(hostname);

    return true;
  } catch {
    return false;
  }
}

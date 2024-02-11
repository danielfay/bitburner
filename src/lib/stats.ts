import { NS } from "@ns";

export function getCurrentMoney(ns: NS) {
  return ns.getServerMoneyAvailable("home");
}

export function getCurrentFactionRep(ns: NS, factionName: string) {
  return ns.singularity.getFactionRep(factionName);
}

export function getCurrentHomeRam(ns: NS) {
  return ns.getServerMaxRam("home");
}

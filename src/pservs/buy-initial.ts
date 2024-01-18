import { NS } from "@ns";

export async function main(ns: NS): Promise<void> {
  const pservRam = 8;
  let totalPurchasedServers = ns.getPurchasedServers().length;

  while (totalPurchasedServers < ns.getPurchasedServerLimit()) {
    if (
      ns.getServerMoneyAvailable("home") > ns.getPurchasedServerCost(pservRam)
    ) {
      ns.purchaseServer("pserv-" + totalPurchasedServers, pservRam);
      totalPurchasedServers = totalPurchasedServers + 1;
    }
    await ns.sleep(1000);
  }
}

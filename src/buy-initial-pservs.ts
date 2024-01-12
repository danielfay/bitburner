import { NS } from "@ns";
import { getThreadsForScript } from "lib/memory";

export async function main(ns: NS): Promise<void> {
  const script = (ns.args[0] as string) ?? "basic-money.js";
  const target = (ns.args[1] as string) ?? "n00dles";
  const pservRam = 8;
  let totalPurchasedServers = ns.getPurchasedServers().length;

  while (totalPurchasedServers < ns.getPurchasedServerLimit()) {
    if (
      ns.getServerMoneyAvailable("home") > ns.getPurchasedServerCost(pservRam)
    ) {
      const hostname = ns.purchaseServer(
        "pserv-" + totalPurchasedServers,
        pservRam
      );
      const threads = getThreadsForScript(ns, script, hostname);

      ns.scp(script, hostname);
      ns.exec(script, hostname, threads, target);

      totalPurchasedServers = totalPurchasedServers + 1;
    }
    await ns.sleep(1000);
  }
}

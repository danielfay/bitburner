import { NS } from "@ns";

export async function main(ns: NS): Promise<void> {
  const method = ns.args[0] as string;
  const ramExponent = ns.args[1] as number;
  const script = (ns.args[2] as string) ?? "basic-money.js";
  const target = (ns.args[3] as string) ?? "joesguns";
  const newRam = 2 ** ramExponent;
  const baseServerName = "pserv-";
  let remainingMoney = ns.getServerMoneyAvailable("home");
  let serverNum = 0;
  let upgradedServers = 0;
  let totalUpgradeCost = 0;

  while (serverNum < ns.getPurchasedServerLimit()) {
    const serverName = baseServerName + serverNum;
    if (method === "check") {
      const upgradeCost = ns.getPurchasedServerUpgradeCost(serverName, newRam);
      remainingMoney = remainingMoney - upgradeCost;
      if (upgradeCost > 0 && remainingMoney > 0) {
        totalUpgradeCost = totalUpgradeCost + upgradeCost;
        upgradedServers = upgradedServers + 1;
      }
    } else if (method === "buy") {
      const upgradeStatus = ns.upgradePurchasedServer(serverName, newRam);
      if (upgradeStatus) {
        upgradedServers = upgradedServers + 1;
      }
    }
    serverNum = serverNum + 1;
  }
  if (method === "check") {
    ns.tprint(
      `Can upgrade ${upgradedServers} servers for a total cost of ${ns.formatNumber(
        totalUpgradeCost
      )}.`
    );
  } else if (method === "buy") {
    ns.tprint(`Upgraded ${upgradedServers} servers.`);
    if (upgradedServers) {
      ns.run("deploy-basic-script.js", 1, script, target, "purchased");
    }
  }
}

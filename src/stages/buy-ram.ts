import { NS } from "@ns";

export async function main(ns: NS): Promise<void> {
  ns.disableLog("getServerMaxRam");
  ns.disableLog("sleep");
  ns.tail();

  const requestedRam = ns.args[0] as number;

  ns.print(`Upgrading RAM on home computer to ${requestedRam}GB...`);

  let currentHomeRam = ns.getServerMaxRam("home");
  while (currentHomeRam < requestedRam) {
    const ramUpgradeCost = ns.singularity.getUpgradeHomeRamCost();
    let currentMoney = ns.getServerMoneyAvailable("home");

    ns.print(
      `Waiting to have $${ns.formatNumber(
        ramUpgradeCost
      )} to buy upgrade from ${currentHomeRam}GB RAM...`
    );
    while (currentMoney < ramUpgradeCost) {
      await ns.sleep(1000);

      currentMoney = ns.getServerMoneyAvailable("home");
    }

    ns.singularity.upgradeHomeRam();
    currentHomeRam = ns.getServerMaxRam("home");
  }
}

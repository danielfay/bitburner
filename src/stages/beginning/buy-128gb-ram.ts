import { FactionWorkType, NS } from "@ns";

export async function main(ns: NS): Promise<void> {
  ns.disableLog("getServerMaxRam");
  ns.disableLog("sleep");
  ns.tail();

  ns.print("Upgrading RAM on home computer to 128GB...");

  let currentHomeRam = ns.getServerMaxRam("home");
  while (currentHomeRam < 128) {
    const ramUpgradeCost = ns.singularity.getUpgradeHomeRamCost();
    let currentMoney = ns.getPlayer().money;

    ns.print(
      `Waiting to have $${ns.formatNumber(ramUpgradeCost)} to buy RAM...`
    );
    while (currentMoney < ramUpgradeCost) {
      await ns.sleep(1000);

      currentMoney = ns.getPlayer().money;
    }

    ns.singularity.upgradeHomeRam();
    currentHomeRam = ns.getServerMaxRam("home");
  }
}

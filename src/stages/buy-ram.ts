import { NS } from "@ns";
import { getCurrentHomeRam, getCurrentMoney } from "lib/stats";

export async function main(ns: NS): Promise<void> {
  ns.disableLog("getServerMaxRam");
  ns.disableLog("sleep");
  ns.tail();

  const requestedRam = ns.args[0] as number;

  ns.print(`Upgrading RAM on home computer to ${requestedRam}GB...`);

  while (getCurrentHomeRam(ns) < requestedRam) {
    const ramUpgradeCost = ns.singularity.getUpgradeHomeRamCost();

    ns.print(
      `Waiting to have $${ns.formatNumber(ramUpgradeCost)} to buy RAM...`
    );
    while (getCurrentMoney(ns) < ramUpgradeCost) {
      await ns.sleep(1000);
    }

    ns.singularity.upgradeHomeRam();
  }
}

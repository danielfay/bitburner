import { NS } from "@ns";

export async function main(ns: NS): Promise<void> {
  let target = ns.args[0] as string;

  ns.tail();

  while (true) {
    let percentMoney =
      ns.getServerMoneyAvailable(target) / ns.getServerMaxMoney(target);
    let amountAboveMinSecurity =
      ns.getServerSecurityLevel(target) - ns.getServerMinSecurityLevel(target);

    ns.print(`Server Money: ${ns.formatPercent(percentMoney)}`);
    ns.print(
      `Amount above min security: ${ns.formatNumber(amountAboveMinSecurity)}`
    );
    await ns.sleep(1000);
  }
}

import { NS } from "@ns";

export async function main(ns: NS): Promise<void> {
    const target = ns.args[0] as string;
    const percentBeforeHack = 0.8;
    const moneyBeforeHack = ns.getServerMaxMoney(target) * percentBeforeHack;
    const securityBeforeWeaken = ns.getServerMinSecurityLevel(target) + 5;

    while (true) {
        if (ns.getServerSecurityLevel(target) > securityBeforeWeaken) {
            await ns.weaken(target);
        } else if (ns.getServerMoneyAvailable(target) < moneyBeforeHack) {
            await ns.grow(target);
        } else {
            await ns.hack(target);
        }
    }
}
import { NS } from "@ns";

export async function main(ns: NS): Promise<void> {
    const method = ns.args[0] as string;
    const ramExponent = ns.args[1] as number;
    const newRam = 2 ** ramExponent;
    const baseServerName = 'pserv-';
    let serverNum = 0;
    let upgradedServers = 0;
    let totalUpgradeCost = 0;

    while (serverNum < ns.getPurchasedServerLimit()) {
        const serverName = baseServerName + serverNum;
        if (method === 'check') {
            const upgradeCost = ns.getPurchasedServerUpgradeCost(serverName, newRam);
            if (upgradeCost > 0) {
                totalUpgradeCost = totalUpgradeCost + upgradeCost;
            }
        } else if (method === 'buy') {
            const upgradeStatus = ns.upgradePurchasedServer(serverName, newRam);
            if (upgradeStatus) {
                upgradedServers = upgradedServers + 1;
            }
        }
        serverNum = serverNum + 1;
    }
    if (method === 'check') {
        ns.tprint("Total cost: " + ns.formatNumber(totalUpgradeCost));
    } else if (method === 'buy') {
        ns.tprint("Upgraded servers: " + upgradedServers);
        if (upgradedServers) {
            ns.spawn('deploy-basic-script.js', 1, 'basic-money.js', 'joesguns');
        }
    }
}

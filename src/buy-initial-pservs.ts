import { NS } from "@ns";

export async function main(ns: NS): Promise<void> {
    const script = ns.args[0] as string ?? 'basic-money.js';
    const target = ns.args[1] as string ?? 'joesguns';
    const serverRam = 8;
    const scriptRam = ns.getScriptRam(script, 'home');
    const threads = Math.floor(serverRam / scriptRam);
    let totalPurchasedServers = ns.getPurchasedServers().length;

    while (totalPurchasedServers < ns.getPurchasedServerLimit()) {
        if (ns.getServerMoneyAvailable('home') > ns.getPurchasedServerCost(serverRam)) {
            const hostname = ns.purchaseServer('pserv-' + totalPurchasedServers, serverRam);
            ns.scp(script, hostname);
            ns.exec(script, hostname, threads, target);
            totalPurchasedServers = totalPurchasedServers + 1;
        }
        await ns.sleep(1000);
    }
}

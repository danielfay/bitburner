import { NS } from "@ns";

export async function main(ns: NS): Promise<void> {
    const script = ns.args[0] as string ?? 'basic-money.js';
    const target = ns.args[1] as string ?? 'joesguns';
    const homeRam = ns.getServerMaxRam('home');
    const scriptRam = ns.getScriptRam(script);
    const threads = (homeRam - 20) / scriptRam;

    ns.killall('home');
    ns.run(script, threads, target);
}

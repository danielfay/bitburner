import { NS } from "@ns";

export async function main(ns: NS): Promise<void> {
    const script = ns.args[0] as string;
    const target = ns.args[1] as string;
    const servers = [
        'avmnite-02h',
        'catalyst',
        'CSEC',
        'foodnstuff',
        'harakiri-sushi',
        'hong-fang-tea',
        'I.I.I.I',
        'iron-gym',
        'joesguns',
        'max-hardware',
        'n00dles',
        'nectar-net',
        'neo-net',
        'netlink',
        'omega-net',
        'phantasy',
        'pserv-0',
        'pserv-1',
        'pserv-2',
        'pserv-3',
        'pserv-4',
        'pserv-5',
        'pserv-6',
        'pserv-7',
        'pserv-8',
        'pserv-9',
        'pserv-10',
        'pserv-11',
        'pserv-12',
        'pserv-13',
        'pserv-14',
        'pserv-15',
        'pserv-16',
        'pserv-17',
        'pserv-18',
        'pserv-19',
        'pserv-20',
        'pserv-21',
        'pserv-22',
        'pserv-23',
        'pserv-24',
        'rothman-uni',
        'sigma-cosmetics',
        'silver-helix',
        'summit-uni',
        'the-hub',
        'zer0',
    ];
    let updatedServers = 0;

    for (const server of servers) {
        const exists = ns.serverExists(server);
        if (!exists) {
            continue;
        }

        const nuked = nukeServer(ns, server);
        const threads = getThreadsForScript(ns, script, server);
        if (!nuked || !threads) {
            continue;
        }

        await deployScript(ns, script, server, threads, target);
        updatedServers = updatedServers + 1;
    }

    ns.tprint("Updated " + updatedServers + " servers. " + script + " deployment done.");
}


function nukeServer(ns: NS, server: string) {
    try {
        if (ns.fileExists('BruteSSH.exe', 'home')) {
            ns.brutessh(server);
        }
        if (ns.fileExists('FTPCrack.exe', 'home')) {
            ns.ftpcrack(server);
        }
        if (ns.fileExists('relaySMTP.exe', 'home')) {
            ns.relaysmtp(server);
        }
        if (ns.fileExists('HTTPWorm.exe', 'home')) {
            ns.httpworm(server);
        }
        if (ns.fileExists('SQLInject.exe', 'home')) {
            ns.sqlinject(server);
        }
        ns.nuke(server);

        return true;
    } catch {
        return false;
    }
}


function getThreadsForScript(ns: NS, script: string, server: string) {
    const scriptRam = ns.getScriptRam(script, 'home');
    const serverRam = ns.getServerMaxRam(server);

    let threads = 0;
    if (serverRam > 0) {
        threads = Math.floor(serverRam / scriptRam);
    }

    return threads;
}


async function deployScript(ns: NS, script: string, server: string, threads: number, target: string) {
    ns.scp(script, server, 'home');
    ns.killall(server);

    if (target) {
        ns.exec(script, server, threads, target);
        await ns.sleep(2000);
    } else {
        ns.exec(script, server, threads);
    }
}

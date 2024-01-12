import { NS, Server } from "@ns";

export function findPurchasedServers(ns: NS) {
  let networkMap: Server[] = JSON.parse(ns.read("network_map.txt"));
  let purchasedServers = networkMap.filter((server) =>
    server.hostname.startsWith("pserv-")
  );
  return purchasedServers.map((server) => server.hostname);
}

export function findHackableServers(ns: NS) {
  let networkMap: Server[] = JSON.parse(ns.read("network_map.txt"));
  let hackableServers = networkMap.filter(
    (server) => !server.hostname.startsWith("pserv-")
  );
  return hackableServers.map((server) => server.hostname);
}

export function findAllServers(ns: NS) {
  let networkMap: Server[] = JSON.parse(ns.read("network_map.txt"));
  return networkMap.map((server) => server.hostname);
}

export function createNetworkMapJSON(ns: NS) {
  const fileName = "network_map.txt";
  let networdMap: Server[] = [];
  let hostnamesToVisit = ["home"];

  while (hostnamesToVisit.length > 0) {
    let hostname = hostnamesToVisit.shift();

    let seenHostname =
      networdMap.filter((server) => server.hostname === hostname).length > 0;
    if (!seenHostname) {
      networdMap.push(ns.getServer(hostname));
      hostnamesToVisit = hostnamesToVisit.concat(ns.scan(hostname));
    }
  }

  networdMap.shift();
  ns.write(fileName, JSON.stringify(networdMap), "w");
}

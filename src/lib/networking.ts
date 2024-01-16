import { NS, Server } from "@ns";
import { nukeServer } from "lib/access";

export function findRouteToServer(ns: NS, hostname: string) {
  let routeToServer: string[] = [];

  while (hostname !== "home") {
    const connectedServers = ns.scan(hostname);
    routeToServer.push(hostname);
    hostname = connectedServers[0];
  }
  routeToServer.push("home");

  return routeToServer.reverse();
}

export function findPurchasedHostnames(ns: NS) {
  let hostnames = findAllHostnames(ns);
  let purchasedHostnames = hostnames.filter((hostname) =>
    hostname.startsWith("pserv-")
  );

  return purchasedHostnames;
}

export function findHackableHostnames(ns: NS) {
  let hostnames = findAllHostnames(ns);
  let hackableHostnames = hostnames.filter(
    (hostname) => !hostname.startsWith("pserv-")
  );

  return hackableHostnames;
}

export function findAllHostnames(ns: NS) {
  let hostnames: string[] = [];
  let hostnamesToVisit = ["home"];

  while (hostnamesToVisit.length > 0) {
    let hostname = hostnamesToVisit.shift() || "";

    let seenHostname = hostnames.includes(hostname);
    if (hostname && !seenHostname) {
      hostnames.push(hostname);
      hostnamesToVisit = hostnamesToVisit.concat(ns.scan(hostname));
    }
  }

  hostnames.shift();
  return hostnames;
}

export function findNukedHostnames(ns: NS) {
  let hostnames = findAllHostnames(ns);
  let nukedHostnames: string[] = [];

  for (const hostname of hostnames) {
    const nuked = nukeServer(ns, hostname);
    if (nuked) {
      nukedHostnames.push(hostname);
    }
  }

  return nukedHostnames;
}

export function createNetworkMapJSON(ns: NS) {
  const fileName = "network_map.txt";
  let networdMap: Server[] = [];
  let hostnames = findAllHostnames(ns);

  for (const hostname of hostnames) {
    const server = ns.getServer(hostname);
    networdMap.push(server);
  }

  ns.write(fileName, JSON.stringify(networdMap), "w");
}

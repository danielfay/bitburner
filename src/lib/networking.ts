import { NS } from "@ns";

export function findPurchasedServers(ns: NS) {
  return [
    "pserv-0",
    "pserv-1",
    "pserv-2",
    "pserv-3",
    "pserv-4",
    "pserv-5",
    "pserv-6",
    "pserv-7",
    "pserv-8",
    "pserv-9",
    "pserv-10",
    "pserv-11",
    "pserv-12",
    "pserv-13",
    "pserv-14",
    "pserv-15",
    "pserv-16",
    "pserv-17",
    "pserv-18",
    "pserv-19",
    "pserv-20",
    "pserv-21",
    "pserv-22",
    "pserv-23",
    "pserv-24",
  ];
}

export function findHackableServers(ns: NS) {
  return [
    "avmnite-02h",
    "catalyst",
    "CSEC",
    "foodnstuff",
    "harakiri-sushi",
    "hong-fang-tea",
    "I.I.I.I",
    "iron-gym",
    "joesguns",
    "max-hardware",
    "n00dles",
    "nectar-net",
    "neo-net",
    "netlink",
    "omega-net",
    "phantasy",
    "rothman-uni",
    "sigma-cosmetics",
    "silver-helix",
    "summit-uni",
    "the-hub",
    "zer0",
  ];
}

export function findAllServers(ns: NS) {
  return findHackableServers(ns).concat(findPurchasedServers(ns));
}

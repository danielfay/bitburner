import { NS } from "@ns";

export async function main(ns: NS): Promise<void> {
  ns.spawn("hacking/prime-for-loop-attack.js", {
    threads: 1,
    spawnDelay: 1000,
  });
}

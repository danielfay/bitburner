import { NS } from "@ns";

export async function main(ns: NS): Promise<void> {
  ns.run("hacking/prime-for-loop-attack.js");
  ns.spawn("setup-home.js");
}

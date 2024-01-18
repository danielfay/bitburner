import { NS } from "@ns";
import { nukeServer } from "lib/access";

export async function main(ns: NS): Promise<void> {
  let hostname = ns.args[0] as string;
  let isNuked = nukeServer(ns, hostname);

  ns.tprint(`${hostname} nuked: ${isNuked}`);
}

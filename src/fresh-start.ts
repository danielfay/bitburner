import { NS } from "@ns";
import { createNetworkMapJSON } from "lib/networking";

export async function main(ns: NS): Promise<void> {
  const script = "basic-money.js";
  const target = "n00dles";
  const homeRam = ns.getServerMaxRam("home");
  const scriptRam = ns.getScriptRam(script);
  const threads = Math.floor((homeRam - 20) / scriptRam);

  ns.nuke(target);
  ns.run(script, threads, target);
  ns.run("deploy-basic-script.js", 1, script, target, "hackable");
  ns.run("buy-initial-pservs.js", 1, script, target);
}

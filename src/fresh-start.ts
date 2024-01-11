import { NS } from "@ns";

export async function main(ns: NS): Promise<void> {
  const script = "basic-money.js";
  const target = "n00dles";
  const homeRam = ns.getServerMaxRam("home");
  const scriptRam = ns.getScriptRam(script);
  const threads = (homeRam - 20) / scriptRam;

  ns.nuke(target);
  ns.run(script, threads, target);
  ns.run("deploy-basic-script.js", 1, script, target);
  ns.run("buy-initial-pservs.js", 1, script, target);
}

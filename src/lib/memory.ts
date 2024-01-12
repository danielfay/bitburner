import { NS } from "@ns";

export function getThreadsForScript(
  ns: NS,
  script: string,
  hostname: string,
  reserveRam = 0
) {
  const scriptRam = ns.getScriptRam(script, "home");
  const ramAvailableForScript = ns.getServerMaxRam(hostname) - reserveRam;

  let threads = 0;
  if (ramAvailableForScript > 0) {
    threads = Math.floor(ramAvailableForScript / scriptRam);
  }

  return threads;
}

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
  if (ramAvailableForScript) {
    threads = Math.floor(ramAvailableForScript / scriptRam);
  }

  return threads;
}

export function getThreadsForRemainingMemory(
  ns: NS,
  hostname: string,
  script: string,
  remainingHostRam: number
) {
  const scriptRam = ns.getScriptRam(script, "home");
  remainingHostRam =
    remainingHostRam ??
    ns.getServerMaxRam(hostname) - ns.getServerUsedRam(hostname);

  let threads = 0;
  if (remainingHostRam) {
    threads = Math.floor(remainingHostRam / scriptRam);
  }

  return threads;
}

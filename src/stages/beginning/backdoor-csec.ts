import { NS } from "@ns";
import { nukeServer } from "lib/access";
import { findRouteToServer } from "lib/networking";

export async function main(ns: NS): Promise<void> {
  ns.disableLog("sleep");
  ns.tail();

  const factionHostname = "CSEC";
  ns.print(`Installing backdoor on ${factionHostname}...`);

  nukeServer(ns, factionHostname);

  const routeToServer = findRouteToServer(ns, factionHostname);
  for (const hostname of routeToServer) {
    ns.singularity.connect(hostname);
  }

  const hackingNeededForBackdoor =
    ns.getServerRequiredHackingLevel(factionHostname);
  if (ns.getHackingLevel() < hackingNeededForBackdoor) {
    ns.print(
      `${ns.getHackingLevel()}/${hackingNeededForBackdoor} hacking needed to backdoor ${factionHostname}...`
    );
    await ns.sleep(1000);
  }
  await ns.singularity.installBackdoor();
  ns.singularity.connect("home");
}

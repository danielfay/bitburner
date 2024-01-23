import { CrimeType, FactionWorkType, NS } from "@ns";
import { nukeServer } from "lib/access";
import { hackingStartScriptName, homeSetupScriptName } from "lib/controller";
import { findRouteToServer } from "lib/networking";

export async function main(ns: NS): Promise<void> {
  ns.disableLog("sleep");
  ns.tail();

  const currentWork = ns.singularity.getCurrentWork();
  const crimeType = "Rob Store" as CrimeType;
  if (!currentWork) {
    ns.singularity.commitCrime(crimeType, true);
  }

  ns.run(hackingStartScriptName);
  ns.run(homeSetupScriptName);

  let newProgram = "BruteSSH.exe";
  let newProgramHackingSkill = 50;
  ns.print(
    `Waiting for ${newProgramHackingSkill} hacking skill to make ${newProgram}...`
  );
  if (!ns.fileExists(newProgram)) {
    while (ns.getHackingLevel() < newProgramHackingSkill) {
      await ns.sleep(1000);
    }
    ns.singularity.createProgram(newProgram, true);

    ns.print(`Waiting for ${newProgram} to be completed...`);
    while (!ns.fileExists(newProgram)) {
      await ns.sleep(1000);
    }
  }

  const factionHostname = "CSEC";
  const factionName = "CyberSec";
  ns.print(`Joining ${factionName}...`);

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

  ns.singularity.joinFaction(factionName);
  const factionWorkType = "hacking" as FactionWorkType;
  ns.singularity.workForFaction(factionName, factionWorkType, true);
}

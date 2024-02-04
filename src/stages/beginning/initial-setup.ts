import { CrimeType, NS } from "@ns";
import { hackingStartScriptName, homeSetupScriptName } from "lib/controller";

export async function main(ns: NS): Promise<void> {
  const currentWork = ns.singularity.getCurrentWork();
  const crimeType = "Rob Store" as CrimeType;
  if (!currentWork) {
    ns.singularity.commitCrime(crimeType, true);
  }

  ns.run(hackingStartScriptName);
  ns.run(homeSetupScriptName);
}

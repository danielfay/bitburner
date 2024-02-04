import { NS } from "@ns";

export async function main(ns: NS): Promise<void> {
  ns.disableLog("sleep");
  ns.tail();

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
}

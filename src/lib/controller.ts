import { NS } from "@ns";

export const homeSetupScriptName = "home/setup.js";
export const hackingStartScriptName = "hacking/start.js";

type BitNodeInformation = {
  stage: BitNodeStage;
  hasGangAccess: Boolean;
};

export enum BitNodeStage {
  beginning = "beginning",
  early = "early",
}

export async function completeStep(ns: NS, step: string) {
  const bitNodeInformation = getBitNodeInformation(ns);
  const stage = bitNodeInformation.stage;
  const scriptName = `stages/${stage}/${step}`;

  ns.run(scriptName);

  while (ns.scriptRunning(scriptName, "home")) {
    await ns.sleep(1000);
  }
}

export function getBitNodeInformation(ns: NS) {
  const bitNodeInformation = updateBitNodeInformation(ns);

  return bitNodeInformation;
}

function updateBitNodeInformation(ns: NS) {
  const bitNodeInformation: BitNodeInformation = {
    stage: getBitNodeStage(ns),
    hasGangAccess: hasGangAccess(ns),
  };

  return bitNodeInformation;
}

function getBitNodeStage(ns: NS) {
  let bitNodeStage: BitNodeStage;
  const totalHomeRAM = ns.getServerMaxRam("home");

  if (totalHomeRAM < 256) {
    bitNodeStage = BitNodeStage.beginning;
  } else {
    bitNodeStage = BitNodeStage.early;
  }

  return bitNodeStage;
}

function hasGangAccess(ns: NS) {
  let gangAccess: Boolean;
  try {
    ns.gang.inGang();
    gangAccess = true;
  } catch {
    gangAccess = false;
  }

  return gangAccess;
}

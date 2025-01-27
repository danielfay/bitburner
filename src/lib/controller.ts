import { NS } from "@ns";
import { getCurrentHomeRam } from "lib/stats";

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

export async function completeStep(
  ns: NS,
  step: string,
  ...stepArgs: (string | number | boolean)[]
) {
  const scriptName = `stages/${step}`;

  ns.run(scriptName, { threads: 1 }, ...stepArgs);

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
  const currentHomeRam = getCurrentHomeRam(ns);

  if (currentHomeRam < 256) {
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

import { NS } from "@ns";

export const stateEarlyScriptName = "state/early.js";
export const homeSetupScriptName = "home/setup.js";
export const hackingStartScriptName = "hacking/start.js";

type BitNodeInformation = {
  state: BitNodeState;
  hasGangAccess: Boolean;
};

export enum BitNodeState {
  early = "early",
  mid = "mid",
  late = "late",
}

export function getBitNodeInformation(ns: NS) {
  const bitNodeInformation = updateBitNodeInformation(ns);

  return bitNodeInformation;
}

function updateBitNodeInformation(ns: NS) {
  const bitNodeInformation: BitNodeInformation = {
    state: getBitNodeState(ns),
    hasGangAccess: hasGangAccess(ns),
  };

  return bitNodeInformation;
}

function getBitNodeState(ns: NS) {
  let bitNodeState: BitNodeState;
  const totalHomeRAM = ns.getServerMaxRam("home");

  if (totalHomeRAM < 200) {
    bitNodeState = BitNodeState.early;
  } else {
    bitNodeState = BitNodeState.mid;
  }

  return bitNodeState;
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

import { NS } from "@ns";

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

  if (totalHomeRAM < 1000) {
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

import { NS } from "@ns";
import {
  BitNodeState,
  stateEarlyScriptName,
  getBitNodeInformation,
} from "lib/controller";

export async function main(ns: NS): Promise<void> {
  ns.killall("home");

  const bitNodeInformation = getBitNodeInformation(ns);

  if ((bitNodeInformation.state = BitNodeState.early)) {
    ns.spawn(stateEarlyScriptName, { threads: 1, spawnDelay: 500 });
  }
}

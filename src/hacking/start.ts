import { NS } from "@ns";
import { BitNodeState, getBitNodeInformation } from "lib/controller";
import { deployScriptName, primeForLoopAttackScriptName } from "lib/deploy";

export async function main(ns: NS): Promise<void> {
  const bitNodeInformation = getBitNodeInformation(ns);

  if (bitNodeInformation.state === BitNodeState.early) {
    ns.spawn(deployScriptName, {
      threads: 1,
      spawnDelay: 500,
    });
  } else if (bitNodeInformation.state === BitNodeState.mid) {
    ns.spawn(primeForLoopAttackScriptName, {
      threads: 1,
      spawnDelay: 500,
    });
  }
}

import { NS } from "@ns";
import { BitNodeStage, getBitNodeInformation } from "lib/controller";
import { deployScriptName, primeForLoopAttackScriptName } from "lib/deploy";

export async function main(ns: NS): Promise<void> {
  const bitNodeInformation = getBitNodeInformation(ns);

  if (bitNodeInformation.stage === BitNodeStage.beginning) {
    ns.spawn(deployScriptName, {
      threads: 1,
      spawnDelay: 500,
    });
  } else if (bitNodeInformation.stage === BitNodeStage.early) {
    ns.spawn(primeForLoopAttackScriptName, {
      threads: 1,
      spawnDelay: 500,
    });
  }
}

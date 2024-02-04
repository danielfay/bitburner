import { NS } from "@ns";
import {
  BitNodeStage,
  completeStep,
  getBitNodeInformation,
} from "lib/controller";

export async function main(ns: NS): Promise<void> {
  ns.disableLog("sleep");

  ns.killall("home");

  const bitNodeInformation = getBitNodeInformation(ns);

  if ((bitNodeInformation.stage = BitNodeStage.beginning)) {
    await completeStep(ns, "initial-setup.js");
    await completeStep(ns, "get-brutessh.js");
    await completeStep(ns, "backdoor-csec.js");
    await completeStep(ns, "join-cybersec.js");
  }
}

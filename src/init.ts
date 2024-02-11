import { NS } from "@ns";
import {
  BitNodeStage,
  completeStep,
  getBitNodeInformation,
  homeSetupScriptName,
} from "lib/controller";

export async function main(ns: NS): Promise<void> {
  ns.disableLog("sleep");

  ns.killall("home");

  const bitNodeInformation = getBitNodeInformation(ns);

  if (bitNodeInformation.stage === BitNodeStage.beginning) {
    await completeStep(ns, `${BitNodeStage.beginning}/initial-setup.js`);
    await completeStep(ns, `${BitNodeStage.beginning}/get-brutessh.js`);
    await completeStep(ns, `${BitNodeStage.beginning}/backdoor-csec.js`);
    await completeStep(ns, `${BitNodeStage.beginning}/join-cybersec.js`);
    await completeStep(ns, "buy-ram.js", 128);
    ns.run(homeSetupScriptName);
    await completeStep(ns, `${BitNodeStage.beginning}/buy-initial-augments.js`);
    await completeStep(ns, "buy-ram.js", 256);
    ns.run(homeSetupScriptName);
    await completeStep(ns, "buy-nfg-and-install.js");
  }
}

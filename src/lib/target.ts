import { NS } from "@ns";

export function findHackingTarget(ns: NS) {
  const hackingSkill = ns.getHackingLevel();
  let target = "n00dles";

  if (hackingSkill > 1000) {
    target = "phantasy";
  } else if (hackingSkill > 200) {
    target = "joesguns";
  }

  return target;
}

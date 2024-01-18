import { NS } from "@ns";

export function findHackingTarget(ns: NS) {
  let basicMoneyTarget = "n00dles";
  let hackingSkill = ns.getPlayer().skills.hacking;

  if (hackingSkill > 200) {
    basicMoneyTarget = "joesguns";
  }

  return basicMoneyTarget;
}

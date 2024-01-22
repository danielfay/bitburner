import { NS } from "@ns";

export function findHackingTarget(ns: NS) {
  let target = "n00dles";
  let hackingSkill = ns.getPlayer().skills.hacking;

  if (hackingSkill > 200) {
    target = "joesguns";
  } else if (hackingSkill > 1000) {
    target = "phantasy";
  }

  return target;
}

import { NS } from "@ns";

export function findHackingTarget(ns: NS) {
  let target = "n00dles";
  let hackingSkill = ns.getPlayer().skills.hacking;

  if (hackingSkill > 1000) {
    target = "phantasy";
  } else if (hackingSkill > 200) {
    target = "joesguns";
  }

  return target;
}

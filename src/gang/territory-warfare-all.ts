import { NS } from "@ns";

export async function main(ns: NS): Promise<void> {
  const members = ns.gang.getMemberNames();

  for (const member of members) {
    ns.gang.setMemberTask(member, "Territory Warfare");
  }
}

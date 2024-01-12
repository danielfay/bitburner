import { NS } from "@ns";
import { createNetworkMapJSON } from "lib/networking";

export async function main(ns: NS): Promise<void> {
  createNetworkMapJSON(ns);
}

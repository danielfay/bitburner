import { NS } from "@ns";
import { findRouteToServer } from "lib/networking";

export async function main(ns: NS): Promise<void> {
  let hostname = ns.args[0] as string;
  let routeToServer = findRouteToServer(ns, hostname);

  ns.tprint(routeToServer.join(" -> "));
}

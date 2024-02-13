import { NS } from "@ns";

type AugmentDetail = {
  name: string;
  price: number;
  repReq: number;
};

export function getAugmentDetails(ns: NS, augmentNames: string[]) {
  let augmentDetails: AugmentDetail[] = [];

  for (const augmentName of augmentNames) {
    augmentDetails.push(createAugmentDetailFromName(ns, augmentName));
  }

  return augmentDetails.sort((a, b) => b.price - a.price);
}

export function getPurchasableAugmentDetails(ns: NS, augmentNames: string[]) {
  let augmentDetails: AugmentDetail[] = [];

  for (const augmentName of augmentNames) {
    if (isBuyableAugment(ns, augmentName)) {
      augmentDetails.push(createAugmentDetailFromName(ns, augmentName));
    }
  }

  return augmentDetails.sort((a, b) => b.price - a.price);
}

function createAugmentDetailFromName(ns: NS, augmentName: string) {
  return {
    name: augmentName,
    price: ns.singularity.getAugmentationPrice(augmentName),
    repReq: ns.singularity.getAugmentationRepReq(augmentName),
  };
}

function isBuyableAugment(ns: NS, augmentName: string) {
  const ownedAugments = ns.singularity.getOwnedAugmentations();
  const ownedAndPurchasedAugments = ns.singularity.getOwnedAugmentations(true);
  const augmentPrereq = ns.singularity.getAugmentationPrereq(augmentName);

  if (augmentName === "NeuroFlux Governor") return false;

  if (ownedAndPurchasedAugments.includes(augmentName)) return false;

  for (const prereq of augmentPrereq) {
    if (!ownedAugments.includes(prereq)) return false;
  }

  return true;
}

import { NS } from "@ns";

type AugmentDetails = {
  name: string;
  price: number;
  repReq: number;
};

export function getAugmentDetails(ns: NS, augmentNames: string[]) {
  let augmentDetails: AugmentDetails[] = [];

  for (const augmentName of augmentNames) {
    if (isBuyableAugment(ns, augmentName)) {
      const augment = {
        name: augmentName,
        price: ns.singularity.getAugmentationPrice(augmentName),
        repReq: ns.singularity.getAugmentationRepReq(augmentName),
      };
      augmentDetails.push(augment);
    }
  }

  return augmentDetails.sort((a, b) => a.price - b.price);
}

function isBuyableAugment(ns: NS, augmentName: string) {
  const ownedAugments = ns.singularity.getOwnedAugmentations(true);

  if (ownedAugments.includes(augmentName)) return false;

  return true;
}

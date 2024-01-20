import { GangMemberAscension, GangMemberInfo, NS } from "@ns";

type Equipment = {
  name: string;
  type: string;
  cost: number;
};

enum GangMemberInfoGainKey {
  moneyGain = "moneyGain",
  respectGain = "respectGain",
}

export async function mobTerritoryClash(ns: NS) {
  const members = ns.gang.getMemberNames();
  const territoryTask = "Territory Warfare";
  const currentPower = ns.gang.getGangInformation().power;
  let newPower = currentPower;

  while (newPower === currentPower) {
    for (const member of members) {
      quietMemberTaskAssign(ns, member, territoryTask);
    }

    await ns.sleep(1000);

    newPower = ns.gang.getGangInformation().power;
  }

  return performance.now();
}

export function recruitNewMembers(ns: NS) {
  while (ns.gang.canRecruitMember()) {
    const memberName = generateMemberName();
    ns.gang.recruitMember(memberName);
  }
}

export async function assignMembers(ns: NS, priority: string) {
  const members = ns.gang.getMemberNames();
  const trainingTask = "Train Combat";

  for (const member of members) {
    let memberInfo = ns.gang.getMemberInformation(member);

    const memberCombatStatAverage =
      (memberInfo.str + memberInfo.def + memberInfo.dex + memberInfo.agi) / 4;
    if (memberCombatStatAverage < 100) {
      quietMemberTaskAssign(ns, member, trainingTask);
      continue;
    }

    const tasks = ns.gang
      .getTaskNames()
      .filter((task) => !task.includes("Unassigned"))
      .filter((task) => !task.includes("Train"))
      .filter((task) => !task.includes("Vigilante"))
      .filter((task) => !task.includes("Territory"));
    let bestTask = "";
    let bestGain = 0;

    for (const task of tasks) {
      ns.gang.setMemberTask(member, task);
      memberInfo = ns.gang.getMemberInformation(member);

      const memberInfoGainKey: keyof GangMemberInfo =
        `${priority}Gain` as GangMemberInfoGainKey;
      const newBest = memberInfo[memberInfoGainKey] > bestGain;
      let newBestGain = 0;
      if (newBest) {
        newBestGain = memberInfo[memberInfoGainKey];
      }

      const surplusRespect =
        memberInfo.respectGain - memberInfo.wantedLevelGain > 0;
      if (newBest && surplusRespect) {
        bestTask = task;
        bestGain = newBestGain;
      }
    }

    if (bestTask) {
      quietMemberTaskAssign(ns, member, bestTask);
    } else {
      quietMemberTaskAssign(ns, member, trainingTask);
    }
  }
}

export function quietMemberTaskAssign(ns: NS, member: string, task: string) {
  const memberInfo = ns.gang.getMemberInformation(member);

  if (memberInfo.task !== task) {
    ns.gang.setMemberTask(member, task);
  }
}

export function equipMembers(ns: NS) {
  const members = ns.gang.getMemberNames();
  const equipment = getPurchasableEquipment(ns);
  const availableMoney = ns.getServerMoneyAvailable("home");

  for (const equip of equipment) {
    if (availableMoney < equip.cost) {
      break;
    }
    for (const member of members) {
      const memberInfo = ns.gang.getMemberInformation(member);
      if (!memberInfo.upgrades.includes(equip.name)) {
        const bought = ns.gang.purchaseEquipment(member, equip.name);
        if (bought) {
          ns.print(`Bought ${equip.name} for ${member}.`);
        }
      }
    }
  }
}

function getPurchasableEquipment(ns: NS) {
  let equipment: Equipment[] = [];
  const ignoredEquipmentTypes = ["Augmentation"];
  const availableMoney = ns.getServerMoneyAvailable("home");
  const equipmentNames = ns.gang.getEquipmentNames();

  for (const equipmentName of equipmentNames) {
    const cost = ns.gang.getEquipmentCost(equipmentName);
    if (cost < availableMoney) {
      const type = ns.gang.getEquipmentType(equipmentName);
      if (!ignoredEquipmentTypes.includes(type)) {
        equipment.push({ name: equipmentName, type, cost });
      }
    }
  }

  return equipment.sort((a, b) => a.cost - b.cost);
}

export function ascendMembers(ns: NS) {
  const members = ns.gang.getMemberNames();

  for (const member of members) {
    const ascensionResult = ns.gang.getAscensionResult(member);
    if (ascensionResult) {
      ns.print(`Assessing if ${member} should ascend...`);
      if (shouldAscend(ns, ascensionResult)) {
        ns.gang.ascendMember(member);
      }
    }
  }
}

function shouldAscend(ns: NS, ascensionResult: GangMemberAscension) {
  const multImprovementThreshhold = 1.5;

  ns.print(`Ascension improvement threshhold: ${multImprovementThreshhold}`);
  ns.print(`str: ${ns.formatNumber(ascensionResult.str, 3)}`);
  ns.print(`def: ${ns.formatNumber(ascensionResult.def, 3)}`);
  ns.print(`dex: ${ns.formatNumber(ascensionResult.dex, 3)}`);
  ns.print(`agi: ${ns.formatNumber(ascensionResult.agi, 3)}`);
  const strPassThreshhold = ascensionResult.str > multImprovementThreshhold;
  const defPassThreshhold = ascensionResult.def > multImprovementThreshhold;
  const dexPassThreshhold = ascensionResult.dex > multImprovementThreshhold;
  const agiPassThreshhold = ascensionResult.agi > multImprovementThreshhold;

  return (
    strPassThreshhold ||
    defPassThreshhold ||
    dexPassThreshhold ||
    agiPassThreshhold
  );
}

function generateMemberName() {
  let randomIndex = Math.floor(Math.random() * firstNames.length);
  const firstName = firstNames[randomIndex];

  randomIndex = Math.floor(Math.random() * lastNames.length);
  const lastName = lastNames[randomIndex];

  return `${firstName} ${lastName}`;
}

const firstNames = [
  "Abraham",
  "Adaline",
  "Adalynn",
  "Ahmed",
  "Ainsley",
  "Alaric",
  "Amara",
  "Amos",
  "Anais",
  "Angelo",
  "Ari",
  "Ariya",
  "Aspen",
  "Aubrielle",
  "Austin",
  "Averi",
  "Axton",
  "Baylor",
  "Beckett",
  "Braden",
  "Braelynn",
  "Briar",
  "Bridget",
  "Cade",
  "Cameron",
  "Carter",
  "Chance",
  "Charles",
  "Charli",
  "Conor",
  "Dash",
  "Dominick",
  "Eddie",
  "Elisabeth",
  "Elizabeth",
  "Ella",
  "Emanuel",
  "Emmeline",
  "Emmy",
  "Estella",
  "Finley",
  "Giavanna",
  "Gracelyn",
  "Gregory",
  "Haley",
  "Halle",
  "Helena",
  "Henley",
  "Jabari",
  "Jameson",
  "Janiyah",
  "Jayceon",
  "Jazlyn",
  "Jazmin",
  "Jerry",
  "Jessie",
  "Khalid",
  "Khari",
  "Kinslee",
  "Kody",
  "Kylen",
  "Kyree",
  "Lacey",
  "Layne",
  "Liam",
  "Lily",
  "Lilyana",
  "Lorelai",
  "Macy",
  "Madelyn",
  "Manuel",
  "Mark",
  "Melissa",
  "Melody",
  "Melvin",
  "Miller",
  "Natalie",
  "Oakleigh",
  "Octavia",
  "Odin",
  "Oliver",
  "Princess",
  "Raelynn",
  "Renata",
  "Riley",
  "Ronan",
  "Rosalie",
  "Rowen",
  "Royal",
  "Shepherd",
  "Sierra",
  "Simone",
  "Steven",
  "Tatum",
  "Terry",
  "Travis",
  "Yahir",
  "Zyair",
];

const lastNames = [
  "Anderson",
  "Andrade",
  "Anthony",
  "Arnold",
  "Ashley",
  "Atkinson",
  "Ayers",
  "Barrett",
  "Bartlett",
  "Bauer",
  "Bell",
  "Bender",
  "Benton",
  "Bernal",
  "Browning",
  "Cabrera",
  "Camacho",
  "Cano",
  "Chandler",
  "Chang",
  "Choi",
  "Christensen",
  "Coffey",
  "Copeland",
  "Craig",
  "Dean",
  "Dennis",
  "Espinosa",
  "Faulkner",
  "Fernandez",
  "Frank",
  "Frazier",
  "French",
  "George",
  "Gibbs",
  "Gomez",
  "Gregory",
  "Hardy",
  "Hendricks",
  "Hensley",
  "Henson",
  "Hobbs",
  "Hoffman",
  "Howe",
  "Jarvis",
  "Jordan",
  "Kelley",
  "Kemp",
  "Knight",
  "Leblanc",
  "Lester",
  "Lim",
  "Lin",
  "Lucas",
  "Marks",
  "Mayer",
  "McClure",
  "McCullough",
  "McMillan",
  "Medrano",
  "Morrow",
  "Newton",
  "Orozco",
  "O'brien",
  "O'Connor",
  "O'Neal",
  "Parks",
  "Pratt",
  "Rich",
  "Richard",
  "Rivera",
  "Roberson",
  "Rogers",
  "Rojas",
  "Ruiz",
  "Russell",
  "Schroeder",
  "Smith",
  "Stafford",
  "Stanley",
  "Stanton",
  "Thomas",
  "Todd",
  "Tyler",
  "Valenzuela",
  "Villarreal",
  "Villegas",
  "Walton",
  "Ward",
  "Watts",
  "Wilcox",
  "Wilkerson",
  "Williams",
  "Wright",
  "Zamora",
];

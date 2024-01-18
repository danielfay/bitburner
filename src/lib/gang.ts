import { NS } from "@ns";

type Equipment = {
  name: string;
  type: string;
  cost: number;
};

export function recruitNewMembers(ns: NS) {
  while (ns.gang.canRecruitMember()) {
    ns.gang.recruitMember(generateMemberName());
  }
}

export function assignMembers(ns: NS) {
  const tasks = ns.gang.getTaskNames();
  tasks.shift();
  const vigilanteJusticeTask = tasks[9];
  const trainCombat = tasks[10];
  const gangInfo = ns.gang.getGangInformation();
  const wantedLevel = gangInfo.wantedLevel;

  const members = ns.gang.getMemberNames();
  for (const member of members) {
    if (wantedLevel > 1) {
      ns.gang.setMemberTask(member, vigilanteJusticeTask);
      continue;
    }

    const mostProfitableTask = findMostProfitableTask(ns, tasks, member);
    if (mostProfitableTask) {
      ns.gang.setMemberTask(member, mostProfitableTask);
    } else {
      ns.gang.setMemberTask(member, trainCombat);
    }
  }
}

function findMostProfitableTask(ns: NS, tasks: string[], member: string) {
  let mostProfitableTask = "";

  for (const task of tasks) {
    ns.gang.setMemberTask(member, task);
    const memberInfo = ns.gang.getMemberInformation(member);

    if (memberInfo.moneyGain > 0) {
      mostProfitableTask = task;
    } else {
      break;
    }
  }

  return mostProfitableTask;
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
      ns.gang.purchaseEquipment(member, equip.name);
    }
  }
}

function getPurchasableEquipment(ns: NS) {
  let equipment: Equipment[] = [];
  const availableMoney = ns.getServerMoneyAvailable("home");
  const equipmentNames = ns.gang.getEquipmentNames();

  for (const equipmentName of equipmentNames) {
    const cost = ns.gang.getEquipmentCost(equipmentName);
    if (cost < availableMoney) {
      const type = ns.gang.getEquipmentType(equipmentName);
      equipment.push({ name: equipmentName, type, cost });
    }
  }

  return equipment.sort((a, b) => a.cost - b.cost);
}

export function ascendMembers(ns: NS) {
  const members = ns.gang.getMemberNames();

  for (const member of members) {
    ns.gang.ascendMember(member);
  }
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
  "O’brien",
  "O’Connor",
  "O’Neal",
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

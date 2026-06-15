/**
 * One-off: prints JSON fragments for pudu robots (hero keys, product keys, specs keys, catalogCards).
 * Run: node scripts/generate-pudu-locale-fragment.mjs
 */

const models = [
  ["bellabot", "Bellabot"],
  ["bellabot-pro", "Bellabot Pro"],
  ["cc1", "CC1"],
  ["cc1-pro", "CC1 Pro"],
  ["cc1-self-cleaning", "CC1 Self-cleaning"],
  ["d5", "D5"],
  ["d9", "D9"],
  ["executive-statement", "Executive Statement"],
  ["flashbot", "Flashbot"],
  ["kettybot-pro", "Kettybot Pro"],
  ["mt1", "MT1"],
  ["mt1-max", "MT1 MAX"],
  ["mt1-vac", "MT1 Vac"],
  ["multi-robot-scheduling", "Multi-Robot Scheduling"],
  ["pudubot2", "Pudubot2"],
  ["sh1", "SH1"],
  ["t300", "T300"],
  ["t600", "T600"],
]

const video = "/robot/g1/hero.mp4"

const hero = {}
const product = {}
const specs = {}

for (const [slug, label] of models) {
  hero[slug] = {
    videoSrc: video,
    title: `Pudu ${label}`,
    subtitle: `Industrial service robot by Pudu Robotics — ${label}. Contact us for specifications and availability.`,
    buttonText: "View Product",
    textPlacement: "center",
  }
  const img = `/robot/pudu/${slug}.png`
  product[slug] = {
    name: `Pudu ${label}`,
    manufacturerName: "Pudu Robotics",
    sku: `PD-${slug.toUpperCase().replace(/-/g, "-")}`,
    manufacturerPartNumber: label.replace(/\s+/g, "-"),
    price: "Contact Sales",
    images: [img],
    versions: [{ id: "default", name: label }],
    bulletPoints: [
      "Contact Savvy for pricing, delivery, and integration support in Saudi Arabia.",
    ],
  }
  specs[slug] = {
    specLabel: "Specification",
    valueLabel: "Value",
    columnHeaders: [label],
    sections: [
      {
        label: "Overview",
        rows: [
          {
            name: "Model",
            values: [label],
          },
          {
            name: "Manufacturer",
            values: ["Pudu Robotics"],
          },
          {
            name: "Details",
            values: [
              "Full technical documentation available on request. Contact our team for datasheets and deployment options.",
            ],
          },
        ],
      },
    ],
  }
}

const catalogCardsIndustrial = models.map(([slug, label]) => ({
  id: slug,
  name: `Pudu ${label}`,
  description: `Industrial robot by Pudu Robotics — ${label}.`,
  image: `/robot/pudu/${slug}.png`,
  link: `/robots/${slug}`,
  buttonText: "View details",
  category: "service",
}))

const catalogCardsEdu = [
  {
    id: "g1-edu",
    name: "Unitree Humanoid G1 EDU",
    description: "Education and research humanoid — G1 EDU variant.",
    image: "/robot/g1/g1.png",
    link: "/robots/g1?variant=g1-edu",
    buttonText: "Explore G1 EDU",
    category: "educational",
  },
  {
    id: "go2-edu",
    name: "Unitree Robo-Dog Go2 EDU",
    description: "Quadruped platform for education and development — Go2 EDU.",
    image: "/robot/go2/DZDA.654.png",
    link: "/robots/go2?variant=go2-edu",
    buttonText: "Explore Go2 EDU",
    category: "educational",
  },
  {
    id: "r1-edu",
    name: "Unitree Humanoid R1 EDU",
    description: "Lightweight humanoid for learning and labs — R1 EDU.",
    image: "/robot/R1/R!.png",
    link: "/robots/r1?variant=r1-edu",
    buttonText: "Explore R1 EDU",
    category: "educational",
  },
]

const catalogCardsEnt = [
  {
    id: "go2-air",
    name: "Unitree Go2 Air",
    description: "Go2 Air — entertainment and everyday use.",
    image: "/robot/go2/DZDA.654.png",
    link: "/robots/go2?variant=go2-air",
    buttonText: "Explore Go2 Air",
    category: "entertainment",
  },
  {
    id: "go2-pro",
    name: "Unitree Go2 Pro",
    description: "Go2 Pro — advanced features for enthusiasts and pros.",
    image: "/robot/go2/DZDA.654.png",
    link: "/robots/go2?variant=go2-pro",
    buttonText: "Explore Go2 Pro",
    category: "entertainment",
  },
  {
    id: "r1-air",
    name: "Unitree R1 Air",
    description: "R1 Air — streamlined humanoid experience.",
    image: "/robot/R1/R!.png",
    link: "/robots/r1?variant=r1-air",
    buttonText: "Explore R1 Air",
    category: "entertainment",
  },
  {
    id: "r1-basic",
    name: "Unitree R1 Basic",
    description: "R1 Basic — essential humanoid platform.",
    image: "/robot/R1/R!.png",
    link: "/robots/r1?variant=r1-basic",
    buttonText: "Explore R1 Basic",
    category: "entertainment",
  },
  {
    id: "g1-standard",
    name: "Unitree G1 Standard",
    description: "G1 Standard — balanced humanoid for broader use.",
    image: "/robot/g1/g1.png",
    link: "/robots/g1?variant=g1-standard",
    buttonText: "Explore G1 Standard",
    category: "entertainment",
  },
]

const catalogCards = [
  ...catalogCardsIndustrial,
  ...catalogCardsEdu,
  ...catalogCardsEnt,
]

console.log(JSON.stringify({ hero, product, specs, catalogCards }, null, 2))

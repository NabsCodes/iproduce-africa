import type { AboutPerson, AboutPersonGroup } from "@/types/about";

const aboutPeople = [
  {
    id: "aisha-waziri-umar",
    group: "team",
    name: "Dr. Aisha Waziri Umar, PhD",
    role: "Founder / CEO",
    photo: "/images/about/aisha-waziri-umar.webp",
    credentials:
      "Barrister, Solicitor & Notary Public · Doctorate in Economics & Trade Law (PhD) · CAS (WTI) University of Bern · PGDip (Oxford) · LLM (London) · LLB Bucks",
    bioSummary:
      "A seasoned legal practitioner, trade policy expert, and agri-entrepreneur with over three decades of leadership experience driving economic diversification and women's economic empowerment across Africa.",
    bioParagraphs: [
      "A seasoned legal practitioner, trade policy expert, and agri-entrepreneur with over three decades of leadership experience. Specializes in leveraging global business, trade law, and agricultural value chain development to drive economic diversification and women's economic empowerment.",
      "Holds a Doctorate in Economics & Trade Law, with research focused on utilizing WTO dispute settlement mechanisms to dismantle trade barriers for African agricultural exports.",
    ],
    order: 1,
    socials: [
      {
        platform: "linkedin",
        value: "https://www.linkedin.com/in/aisha-waziri-umar-53438468",
      },
    ],
  },
  {
    id: "mustapha-yakubu",
    group: "team",
    name: "Mustapha Yakubu",
    role: "Director of IT & Business Development",
    photo: "/images/about/mustapha-yakubu.webp",
    bioSummary:
      "Technology, operations, and commercial strategy professional with experience across digital education, customer success, and executive advisory at global and high-growth organizations.",
    bioParagraphs: [
      "Mustapha Yakubu is a technology, operations and commercial strategy professional with experience across digital education, customer success, sales, product operations and executive advisory. He holds a Master's in Management with a specialization in Digital Business from IE Business School in Madrid, Spain, and a B.Sc. in Computer Science from Bayero University Kano.",
      "Mustapha has worked with global and high-growth organizations including SIRVA, Turing, Microverse and Jumia. As a Resource Consultant with SIRVA, he supports both executives and non-executives from Fortune 500 companies through intercultural business trainings covering leadership, management, strategy, communication and cross-cultural effectiveness.",
      "Earlier in his career, he served as a Regional Sales Manager at Jumia, where he gained hands-on experience in sales execution, team support, customer engagement and commercial growth. He later worked with two Y Combinator-backed companies, supporting operations, learner success, admissions, customer journeys and cross-functional team coordination across global markets.",
      "He brings to iProduce Africa a practical blend of strategic thinking, technology fluency, commercial awareness and operational discipline, with a strong interest in using digital platforms to expand access to learning, opportunity and business growth across Africa.",
    ],
    order: 3,
  },
  {
    id: "wilson-agaba",
    group: "team",
    name: "Dr. Wilson Agaba",
    role: "Director of Programs",
    photo: "/images/about/wilson-agaba.webp",
    bioSummary:
      "Business consultant, financial analyst, and educationist with broad experience across business strategy, finance, agribusiness, education, and institutional management.",
    bioParagraphs: [
      "Dr. Wilson Agaba is a business consultant, financial analyst, researcher, educationist, and public affairs analyst with broad experience across business strategy, finance, agribusiness, education, project development, and institutional management. He has held senior leadership roles at Dreamheight Global Consult Ltd, Dreamheight Global Farm Ltd, and Maslaha Seeds Ltd, where he has supported strategy formulation, financial planning, business development, research coordination, and organisational growth.",
      "His professional background also includes banking, education administration, training, and enterprise support. At iProduce, Wilson brings strong expertise in agribusiness advisory, capacity building, market linkage facilitation, and entrepreneurial development, supporting the platform's mission to connect African agripreneurs with resources, opportunities, and growth pathways.",
    ],
    order: 2,
  },
  {
    id: "umma-umar",
    group: "team",
    name: "Umma Umar",
    role: "Director of Partnerships",
    photo: "/images/about/umma-umar.webp",
    credentials:
      "LL.B. (University of Sussex, United Kingdom) · Project management · Law · NGO operations",
    bioSummary:
      "Project manager at the intersection of law, project management, and non-governmental operations in Nigeria, leading iProduce Africa's engagement with donors, institutions, and ecosystem partners.",
    bioParagraphs: [
      "Umma Umar holds a Bachelor of Laws (LL.B.) from the University of Sussex, United Kingdom. She is an experienced project manager working at the intersection of law, project management, and non-governmental operations in Nigeria.",
      "As Director of Partnerships at iProduce Africa, Umma leads the organization's engagement with donors, government agencies, corporate sponsors, and civil society organizations.",
    ],
    order: 4,
  },
  {
    id: "usman-dagona",
    group: "team",
    name: "Usman Umar Dagona",
    role: "Project Coordinator (North)",
    photo: "/images/about/usman-dagona.webp",
    credentials:
      "NCE, Chemistry Education (Umar Suleiman College of Education, Gashua) · B.Sc. (Hons.) Chemistry (Federal University Gashua) · International Chemistry ambassador",
    bioSummary:
      "Nigerian scientist, researcher, innovator, and farmer — an International Chemistry ambassador with a passion for using science and technology to improve agriculture and empower communities across Africa.",
    bioParagraphs: [
      "Usman Umar Dagona is a Nigerian scientist, researcher, innovator, farmer, and International Chemistry ambassador awarded by the Molecular and International Chemistry Organization, with a passion for using science and technology to improve agriculture and empower communities across Africa.",
      "He holds a Nigeria Certificate in Education (NCE) in Chemistry Education from Umar Suleiman College of Education, Gashua, and a Bachelor of Science (B.Sc. Hons.) degree in Chemistry from Federal University Gashua.",
      "Usman has gained national recognition for applied science and innovation, including winning the Imagine National Chemistry Competition, and continues to combine teaching, research, and community-facing technical work through his science foundation.",
    ],
    order: 5,
    socials: [
      {
        platform: "linkedin",
        value: "https://www.linkedin.com/in/usman-umar-dagona-a079391bb",
      },
    ],
  },
  {
    id: "inonge-margaret-imasiku",
    group: "advisor",
    name: "Inonge Margaret Imasiku",
    role: "Trade & Market Access Advisor",
    photo: "/images/about/inonge-margaret.webp",
    bioSummary:
      "Pan-African business executive and digital transformation leader with over a decade of experience advancing financial inclusion, digital innovation, and sustainable economic growth across Africa.",
    bioParagraphs: [
      "Inonge Margaret Imasiku is a Pan-African business executive, strategist, and digital transformation leader with over a decade of experience advancing financial inclusion, digital innovation, and sustainable economic growth across Africa. Her work spans financial services, technology, entrepreneurship, trade, and agriculture, where she has built strategic partnerships and led initiatives that strengthen ecosystems and accelerate inclusive development across the continent.",
      "Throughout her career, Inonge has spearheaded cross-border market expansion, strategic partnerships, regulatory engagement, and ecosystem development across multiple African markets. She has collaborated with financial institutions, governments, regulators, development partners, chambers of commerce, private sector leaders, and innovation ecosystems to deliver transformative digital solutions, expand financial inclusion, and unlock new opportunities for businesses and communities.",
    ],
    order: 1,
  },
  {
    id: "aisha-yakubu-bako",
    group: "advisor",
    name: "Aisha Yakubu Bako",
    role: "Senior Technical Advisor",
    photo: "/images/about/aisha-yakubu-bako.webp",
    bioSummary:
      "Leading investment promotion and private sector development expert with over 20 years of experience driving economic growth and women's participation in agricultural mechanisation across Nigeria.",
    bioParagraphs: [
      "Aisha is an alumnus of Maastricht School of Management, Netherlands, Ahmadu Bello University and Nigerian Defence Academy with a degree in Agricultural Engineering, a Master's in Financial Economics and a Diploma in Business Dynamics. She is a member of the Chartered Institute of Banking and a recipient of the Ambassador for Peace Award.",
      "She is a leading investment promotion and private sector development expert with over 20 years of experience driving economic growth across Nigeria. She has facilitated over $300 million in investments, working with governments, development partners, and private sector actors to unlock opportunities and improve business environments.",
      "She is the Founder and President of the Women in Mechanised Agriculture Association (WIMA), where she is spearheading a national movement to increase women's participation in agricultural mechanisation, expand access to productive assets, and position women as key drivers in Nigeria's food systems transformation. Through WIMA, she champions mechanisation-as-a-service models, women-led agribusiness hubs, and inclusive value chains that create income, jobs, and resilience for rural women.",
      "As MD/CEO of Onyx Investment Advisory Limited, Aisha leads strategic engagements with state governments and development institutions on investment mobilisation, policy reform, and economic transformation. Her career spans senior roles and advisory work with organisations including FCDO, World Bank, IFC, Technoserve, Palladium, and Adam Smith International, with a strong focus on investment facilitation, market systems development, and gender-inclusive growth.",
    ],
    order: 2,
  },
  {
    id: "sidi-aliyu",
    group: "advisor",
    name: "Abdullahi Sidi-Aliyu",
    role: "Director Strategy",
    photo: "/images/about/sidi-aliyu.webp",
    bioSummary:
      "Retired Nigerian Export Promotion Council director with over 30 years of public-sector experience in export promotion, trade policy, and AfCFTA-related capacity building.",
    bioParagraphs: [
      "Abdullahi Sidi-Aliyu is a retired civil servant who served for 35 years in various capacities. Apart from five years spent as an Economic Planning Officer and Senior Research Officer with the Federal Capital Development Authority (FCDA) and National Directorate of Employment respectively, he spent 30 years of his career with the Nigerian Export Promotion Council (NEPC), where he retired in 2020 having served for 10 years as a Director.",
      "He obtained a BSc Degree in Economics in 1983 from Ahmadu Bello University Zaria and later in 2014 a master's degree in development studies from Bayero University, Kano. He was exposed to a wide range of local and international trainings in the course of his career.",
      "Over these years of service, Mr. Sidi-Aliyu has acquired in-depth understanding of export business including export trends, challenges, opportunities, multilateral and bilateral trade challenges, the African Growth & Opportunity Act (AGOA), export competency development, capacity building, and the Africa Continental Free Trade Agreement (AfCFTA).",
      "Mr. Sidi-Aliyu is currently a director responsible for export trade development with the International Trade Facilitation Association (ITFA), a team of professionals engaging in providing support to SMEs aspiring to become visible in the export business and to be globally competitive. He is also the CEO of A S Dynamic Ventures Limited.",
    ],
    order: 3,
    socials: [
      { platform: "email", value: "s.aliyu@icloud.com" },
      { platform: "phone", value: "+2348139167775" },
    ],
  },
] as const satisfies readonly AboutPerson[];

export function getAboutPeopleByGroup(
  group: AboutPersonGroup,
): readonly AboutPerson[] {
  return aboutPeople
    .filter((person) => person.group === group)
    .slice()
    .sort((a, b) => a.order - b.order);
}

export { aboutPeople };

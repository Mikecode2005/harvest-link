import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Bell,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronRight,
  Box,
  CloudSun,
  Clock,
  Droplets,
  Languages,
  Leaf,
  MapPin,
  Menu,
  MessageCircle,
  PackageCheck,
  Play,
  Plus,
  ShieldCheck,
  Sprout,
  Sun,
  Trash2,
  TrendingUp,
  Wheat,
  BarChart3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

type Language = "en" | "yo";

interface Produce {
  id: string;
  crop: string;
  quantity: string;
  harvest: string;
  quality: string;
}

interface Opportunity {
  id: string;
  crop: string;
  quantity: string;
  quality: string;
  delivery: string;
  location: string;
  buyer: string;
  match: "High" | "Medium" | "Low";
}

interface FarmItem {
  id: string;
  name: string;
  category: "Inputs" | "Stored produce" | "Equipment" | "Tools";
  quantity: string;
  unit: string;
  expiry?: string;
  location?: string;
  status: "fresh" | "expiring-soon" | "expired" | "n/a";
}

const t = {
  en: {
    overview: "Overview",
    myFarm: "My farm",
    market: "Market opportunities",
    produce: "My produce",
    inventory: "Farm inventory",
    simulate: "Simulate results",
    guidance: "Crop guidance",
    storage: "Post-harvest care",
    sample: "PROTOTYPE · SAMPLE DATA",
    sampleNote: "Illustrative farmer, crop and buyer figures only — not live pilot results.",
    hello: "Good morning, Adebayo",
    sub: "Here’s what’s happening around your farm.",
    location: "Idanre, Ondo State",
    farmArea: "Farm area",
    crop: "Main crop",
    season: "Season",
    nextStep: "Next field step",
    hectares: "hectares",
    maize: "Maize",
    planting: "Growing season",
    week: "Week 6 · Growing",
    weatherTitle: "Today around Idanre",
    weather: "Partly cloudy",
    weatherNote: "Check soil moisture before watering. Rain may return later this week.",
    temp: "28°",
    local: "Local forecast · sample",
    opportunity: "A buyer is looking for maize",
    opportunitySub: "PROPOSED GROUP OPPORTUNITY · SAMPLE",
    target: "Buyer request",
    needed: "50 tonnes",
    collection: "Suggested collection",
    date: "Within 3 weeks",
    proposed: "Proposed farm allocation",
    quantity: "0.8 tonnes",
    buyerTerms: "Dry, clean maize · quality check at collection",
    join: "I’m interested",
    joined: "Interest noted",
    joinedNote: "Sample only. No buyer, farm or delivery commitment has been made.",
    buyerNotice: "All quantities are suggestions. Confirm with the farmer before any commitment.",
    guideTitle: "This week on your farm",
    guide: "Growing maize · Week 6",
    guideBody: "Walk the field and look for yellowing leaves or standing water. Remove weeds early to reduce competition for nutrients.",
    guideTag: "General crop guidance · confirm locally",
    read: "View full guidance",
    careTitle: "Protect your harvest",
    careLabel: "POST-HARVEST TIP",
    careBody: "Dry maize thoroughly before storage. Keep bags off the floor, away from walls, and in a clean, dry, well-ventilated place.",
    careLink: "See storage checklist",
    careFoot: "Practical guidance · not a substitute for local expert advice",
    marketTitle: "Nearby market signal",
    marketLabel: "ILLUSTRATIVE",
    marketBody: "Maize demand is showing in the Idanre area. Buyer interest and prices must be confirmed directly before making plans.",
    marketLink: "Explore opportunities",
    navHome: "Back to HarvestLink",
    profile: "Adebayo O.",
    coop: "Idanre Farmers Cooperative",
    langLabel: "Yorùbá",
    assist: "Need help? Talk to your cooperative.",
    navToggle: "Open navigation",
    opportunitiesTitle: "Market opportunities",
    opportunitiesSub: "Buyer requests open in your area — join the ones that fit your farm.",
    oppTarget: "Buyer request",
    oppQuantity: "Quantity needed",
    oppDelivery: "Delivery window",
    oppQuality: "Quality spec",
    oppLocation: "Location",
    oppMatch: "Fit",
    oppJoin: "I’m interested",
    oppJoined: "Interest noted",
    oppNone: "No open opportunities right now.",
    oppNotice: "Sample opportunities only. Confirm with the buyer before any commitment.",
    oppHaveMatch: "You have matching stock",
    oppNoMatch: "No matching stock on farm",
    addProduceTitle: "Add produce",
    addProduceSub: "Register what you’re growing so buyers and cooperatives can find you.",
    formCrop: "Crop",
    formQuantity: "Quantity (tonnes)",
    formHarvest: "Expected harvest",
    formQuality: "Quality grade",
    addBtn: "Add produce",
    added: "Added to your produce list",
    produceList: "Your produce",
    noProduce: "You haven’t registered any produce yet.",
    remove: "Remove",
    simulateTitle: "Simulate results",
    simulateSub: "Estimate what your farm could harvest and earn from a buyer order.",
    simFarmSize: "Farm size (hectares)",
    simYield: "Expected yield (tonnes per hectare)",
    simLoss: "Expected post-harvest loss (%)",
    simPrice: "Farmgate price (₦ per tonne)",
    simulateBtn: "Simulate",
    resultHarvest: "Projected harvest",
    resultSellable: "Sellable after loss",
    resultEarnings: "Estimated earnings",
    simNote: "Illustrative estimates only — actual results depend on farm conditions and buyer terms.",
    cropMaize: "Maize",
    cropCassava: "Cassava",
    cropCocoa: "Cocoa",
    cropPlantain: "Plantain",
    cropYam: "Yam",
    cropTomatoes: "Tomatoes",
    cropPeppers: "Peppers",
    invTitle: "Farm inventory",
    invSub: "Track inputs, stored produce, equipment and tools on your farm — including storage expiry dates.",
    invAdd: "Add item",
    invItem: "Item / input",
    invCategory: "Category",
    invQty: "Quantity",
    invUnit: "Unit",
    invExpiry: "Expiry / use-by date",
    invLoc: "Storage location",
    invSave: "Save item",
    invSaved: "Item added to inventory",
    invList: "Items on farm",
    invNone: "No inventory items recorded yet.",
    invRemove: "Remove",
    invFresh: "Fresh",
    invExpiring: "Expiring soon",
    invExpired: "Expired",
    invNA: "N/A",
    invCatInputs: "Inputs",
    invCatStored: "Stored produce",
    invCatEquip: "Equipment",
    invCatTools: "Tools",
    invFilterAll: "All items",
    invFilterExpiring: "Expiring soon",
    invMatchTitle: "Your stock vs market demand",
    invMatchSub: "Buyer requests that match what you currently have in inventory or produce.",
    invMatchNone: "No current matches — add produce or inventory items to see matches.",
    invMatchQty: "Qty you have",
    invMatchNeed: "Qty buyer needs",
    invMatchGap: "Shortfall",
    invCovered: "Covered",
  },
  yo: {
    overview: "Àkótán",
    myFarm: "Oko mi",
    market: "Àǹfààní ọjà",
    produce: "Àwọn irúgbìn",
    inventory: "Ìtọ̀kasi ilẹ̀ oko",
    simulate: "Sànṣerín àkójọ",
    guidance: "Ìtọ́sọ́nà irúgbìn",
    storage: "Ìtọ́jú lẹ́yìn ìkórè",
    sample: "ÀPẸ̀RẸ · DÁTÀ ÀPẸ̀ẸRẸ",
    sampleNote: "Àpẹẹrẹ àgbẹ̀, irúgbìn àti oníbàárà ni wọ̀nyí—kì í ṣe àbájáde ìdánwò gidi.",
    hello: "Ẹ káàárọ̀, Adebayo",
    sub: "Èyí ni ohun tó ń ṣẹlẹ̀ ní àyíká oko rẹ.",
    location: "Idanre, Ìpínlẹ̀ Ondo",
    farmArea: "Iye ilẹ̀ oko",
    crop: "Irúgbìn pàtàkì",
    season: "Àkókò",
    nextStep: "Ìgbésẹ̀ tó kàn",
    hectares: "hektà",
    maize: "Àgbàdo",
    planting: "Àkókò ìdàgbàsókè",
    week: "Ọ̀sẹ̀ 6 · Ìdàgbàsókè",
    weatherTitle: "Ojú-ọjọ́ lónìí ní Idanre",
    weather: "Ìkùùkuu díẹ̀",
    weatherNote: "Ṣàyẹ̀wò ọrinrin ilẹ̀ kí o tó fún irúgbìn ní omi. Òjò lè tún rọ̀ lọ́sẹ̀ yìí.",
    temp: "28°",
    local: "Àsọtẹ́lẹ̀ agbègbè · àpẹẹrẹ",
    opportunity: "Oníbàárà ń wá àgbàdo",
    opportunitySub: "ÀǸFÀÀNÍ ÀPẸ̀ẸRẸ FÚN ẸGBẸ́",
    target: "Àse oníbàárà",
    needed: "50 ọ̀pọ̀lọ ọ̀pọ̀",
    collection: "Àkúntàn tí ó fẹ́ràn",
    date: "Láàrà 3 ọ̀sẹ̀",
    proposed: "Àkúntàn àgbẹ̀ tí ó fi wọ̀lẹ̀",
    quantity: "0.8 ọ̀pọ̀lọ ọ̀pọ̀",
    buyerTerms: "Àgbàdo róó dídí · sàké àtúnṣe ní àkúntàn",
    join: "Mó fẹ́ pàtàkì",
    joined: "Ìfọ́wọ̀ ní wá",
    joinedNote: "Àpẹẹrẹ wọ̀nyí jẹ́. Kó sí àgbegbè oníbàárà, àgbẹ̀ àti òkùn ààbò tí ó tọ́jú.",
    buyerNotice: "Àwọn ẹ̀rọ ni iṣerúwà. Bà àgbẹ̀ sọ̀rọ̀ kí o tó gbèrò kí o fi ọ́pọ̀lọ̀pọ̀.",
    guideTitle: "Ohun tó ń ṣe ní àyíká oko rẹ",
    guide: "Àgbàdo · Ọ̀sẹ̀ 6",
    guideBody: "Kọ ilẹ̀ bíì, fẹ́ kí a rí àwọn èwe tó yọọ láti mọ́ pé a ń súbú pééròò, láti wọ̀lé omi tó jó. Fá àwòn ewe àdúrà fún àkókò, kí ó ṣe àlápọ̀ àgboyè fún ìmọlé.",
    guideTag: "Ìmọ̀ àgbégbè àdáni · bà olú àgbo sọ̀rọ̀",
    read: "Wo ìmọ̀ àgbégbè dídàà",
    careTitle: "Tọ́jú ìkórè rẹ",
    careLabel: "ÌMỌ̀RÀN LẸ́YÌN ÌKÓRÈ",
    careBody: "Gbẹ àgbàdo dáadáa kí o tó tọ́jú rẹ. Gbé àpò sákèsàkèsẹ kúrò lórí ilẹ̀, sì ibi mímọ́, gbígbẹ́ tí afẹ́fẹ́ ti ń wọ̀.",
    careLink: "Wo àtòjọ ìtọ́jú",
    careFoot: "Ìmọ̀ràn tó wúlò · kì í ṣe àfidípò fún ìmọ̀ràn amòye agbègbè",
    marketTitle: "Àmì ọjà nítòsí",
    marketLabel: "ÀPẸ̀ẸRẸ",
    marketBody: "A nílò àgbàdo ní agbègbè Idanre. Jẹ́rìí ìfẹ́ oníbàárà àti owó pẹ̀lú wọn kí o tó gbèrò.",
    marketLink: "Wo àǹfààní ọjà",
    navHome: "Padà sí HarvestLink",
    profile: "Adebayo O.",
    coop: "Ẹgbẹ́ Àgbẹ̀ Idanre",
    langLabel: "English",
    assist: "Ṣé o nílò ìrànlọ́wọ́? Bá ẹgbẹ́ àgbẹ̀ rẹ sọ̀rọ̀.",
    navToggle: "Ṣí àkójọ ìrìnàjò",
    opportunitiesTitle: "Àǹfààní ọjà",
    opportunitiesSub: "Àwọn àǹfààní oníbàárà ti wọ̀nyí ní agbègbè rẹ.",
    oppTarget: "Àse oníbàárà",
    oppQuantity: "Ẹ̀rọ tí ń wá",
    oppDelivery: "Àkókò òkùn ààbò",
    oppQuality: "Ìtẹ̀lẹ̀ oṣù",
    oppLocation: "Ìbílẹ̀",
    oppMatch: "Pàtàkì",
    oppJoin: "Mó fẹ́ pàtàkì",
    oppJoined: "Ìfọ́wọ̀ ní wá",
    oppNone: "Kó sì àǹfààní ti ó ń jẹ́ lọ́pọ̀lọ̀pọ̀ ní orílẹ̀ èèdè.",
    oppNotice: "Àwọn àǹfààní àpẹẹrẹ wọ̀nyí — bà oníbàárà sọ̀rọ̀ kí o tó gbèrò.",
    oppHaveMatch: "O tún náà ohun tí ń pàtàkì síẹ̀",
    oppNoMatch: "Kó sí ohun tí ń pàtàkì síẹ̀ ní ilẹ̀ oko",
    addProduceTitle: "Sọ́ irúgbìn",
    addProduceSub: "Gbọ́hùn ohun tí o ń ńgba ní oko rẹ kí àwọn oníbàárà àti àwọn ẹgbẹ̀ àgbẹ̀ lè o wú rẹ.",
    formCrop: "Irúgbìn",
    formQuantity: "Ẹ̀rọ (tọ́nù)",
    formHarvest: "Ìdílé àkúntàn",
    formQuality: "Ìtẹ̀lẹ̀ oṣù",
    addBtn: "Sọ́ irúgbìn",
    added: "Ti wú ní àwọn irúgbìn rẹ",
    produceList: "Àwọn irúgbìn rẹ",
    noProduce: "Kó sí irúgbìn tí ó fí wú lórí.",
    remove: "Pà",
    simulateTitle: "Sànṣerín àkójọ",
    simulateSub: "Kànsìlé ohun tó ilẹ̀ oko rẹ yẹ àti ó yẹ péélú àse oníbàárà.",
    simFarmSize: "Iye ilẹ̀ oko (hẹ̀ktà)",
    simYield: "Ẹ̀rọ tí ó fẹ́ (tọ́nù ní hẹ̀ktà)",
    simLoss: "Ìtàn ìkórè lẹ́yìn ìkórè (%)",
    simPrice: "Ẹ̀sìn sísẹ̀ (₦ ní ọpọlọ ọ̀pọ̀)",
    simulateBtn: "Sànṣerín",
    resultHarvest: "Àkúntàn tí ó fẹ́",
    resultSellable: "Tí ó lè wọ̀lẹ̀",
    resultEarnings: "Ẹ̀sìntà tí ó fẹ́",
    simNote: "Àmọ̀kàn àpẹẹrẹ wọ̀nyí — àkójọ ààyèkúrà yóò jé pé àkójọ àgbàyé àti àse oníbàárà a ń ṣàlàyé.",
    cropMaize: "Àgbàdo",
    cropCassava: "Èsè",
    cropCocoa: "Kọkọ́",
    cropPlantain: "Ògẹ̀dè",
    cropYam: "Isu",
    cropTomatoes: "Tomatẹ́tẹ̀",
    cropPeppers: "Ata",
    invTitle: "Ìtọ̀kasi ilẹ̀ oko",
    invSub: "Tọ́jú àwọn àmọ̀tẹ̀run, irúgbìn tí ó tọ́jú, àwọn òfìn àti àwọn ọ̀pọlọ ní ilẹ̀ oko rẹ, pẹ̀lú àkókò àkúntàn àlákọ́yìn.",
    invAdd: "Sọ́ àwò",
    invItem: "Àwò / àmọ̀tẹ̀run",
    invCategory: "Àkọ́báyè",
    invQty: "Ẹ̀rọ",
    invUnit: "Ọ̀pọ̀lọ",
    invExpiry: "Òjù àkúntàn / àkókò tí o le fi ṣe",
    invLoc: "Ìbílẹ̀ àkúntàn",
    invSave: "Kọ àwò",
    invSaved: "Àwò ti wú ní itọ̀kasi",
    invList: "Àwọn àwò ní ilẹ̀ oko",
    invNone: "Kó sì àwò tí wọ́n sí rọ̀nú ní itọ̀kasi.",
    invRemove: "Pà",
    invFresh: "Dídí",
    invExpiring: "A yoo ku",
    invExpired: "Ti ku",
    invNA: "N/A",
    invCatInputs: "Àmọ̀tẹ̀run",
    invCatStored: "Irúgbìn tí ó tọ́jú",
    invCatEquip: "Àwọn òfìn",
    invCatTools: "Àwọn àmọ̀ṣọ̀mọ̀ràn",
    invFilterAll: "Àwọn àwò àlàaye",
    invFilterExpiring: "A yoo ku",
    invMatchTitle: "Ìtọ̀kasi rẹ péélú àse ọjà",
    invMatchSub: "Àwọn àse oníbàárà tí ó pàtàkì síẹ̀ péélú ohun tí o tí ní ní itọ̀kasi rẹ àti irúgbìn rẹ.",
    invMatchNone: "Kó sí àmọ̀kàn pàtàkì ní orílẹ̀ èèdè — sọ́ irúgbìn àtàwọn àwò itọ̀kasi kí o lè rí àwọn àmọ̀kàn pàtàkì.",
    invMatchQty: "Ẹ̀rọ tí o ní",
    invMatchNeed: "Ẹ̀rọ tí oníbàárà wá",
    invMatchGap: "Àkókò tó pò",
    invCovered: "Tí tọ́jú",
  },
} as const;

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Farmer dashboard | HarvestLink" },
      {
        name: "description",
        content: "Explore a sample HarvestLink farmer dashboard with market opportunities, produce registration, farm inventory with expiry tracking and a harvest simulator for Idanre, Ondo.",
      },
      { property: "og:title", content: "Farmer dashboard | HarvestLink" },
      {
        property: "og:description",
        content: "An illustrative farmer dashboard with sample market opportunities, produce tracking, farm inventory and harvest simulation.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FarmerDashboard,
});

function FarmerDashboard() {
  const [language, setLanguage] = useState<Language>("en");
  const [interested, setInterested] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const copy = t[language];

  const navItems = [
    { label: copy.overview, href: "#overview", icon: Sprout, active: true },
    { label: copy.myFarm, href: "#my-farm", icon: Wheat, active: false },
    { label: copy.market, href: "#market", icon: PackageCheck, active: false },
    { label: copy.produce, href: "#produce", icon: Plus, active: false },
    { label: copy.inventory, href: "#inventory", icon: Box, active: false },
    { label: copy.simulate, href: "#simulate", icon: BarChart3, active: false },
    { label: copy.guidance, href: "#guidance", icon: CalendarDays, active: false },
    { label: copy.storage, href: "#storage", icon: ShieldCheck, active: false },
  ];

  const opportunities: Opportunity[] = [
    {
      id: "1",
      crop: copy.cropMaize,
      quantity: "50 tonnes",
      quality: copy.buyerTerms,
      delivery: copy.date,
      location: copy.location,
      buyer: "Maize processing company",
      match: "High",
    },
    {
      id: "2",
      crop: copy.cropCassava,
      quantity: "30 tonnes",
      quality: "Fresh tubers · minimum size spec",
      delivery: "Within 6 weeks",
      location: "Akure, Ondo State",
      buyer: "Cassava food processor",
      match: "Medium",
    },
    {
      id: "3",
      crop: copy.cropCocoa,
      quantity: "15 tonnes",
      quality: "Fermented, dried beans · grade 1",
      delivery: "Within 8 weeks",
      location: copy.location,
      buyer: "Cocoa export agent",
      match: "High",
    },
    {
      id: "4",
      crop: copy.cropPlantain,
      quantity: "20 tonnes",
      quality: "Green, firm bunches",
      delivery: "Within 4 weeks",
      location: "Owo, Ondo State",
      buyer: "Wholesale produce market",
      match: "Medium",
    },
    {
      id: "5",
      crop: copy.cropYam,
      quantity: "25 tonnes",
      quality: "Ware yam · no rot",
      delivery: "Within 5 weeks",
      location: copy.location,
      buyer: "Produce aggregator",
      match: "Low",
    },
  ];

  const [joinedOpps, setJoinedOpps] = useState<Record<string, boolean>>({});
  const [produce, setProduce] = useState<Produce[]>([
    { id: "p1", crop: copy.cropMaize, quantity: "0.8", harvest: "Nov 2025", quality: "Grade A · dry, clean" },
  ]);
  const [newProduce, setNewProduce] = useState<{ crop: string; quantity: string; harvest: string; quality: string }>({
    crop: copy.cropMaize,
    quantity: "",
    harvest: "",
    quality: "",
  });

  const [sim, setSim] = useState({
    farmSize: "2.4",
    yieldPerHa: "1.8",
    lossPct: "15",
    price: "450000",
  });
  const [simResult, setSimResult] = useState<{ harvest: number; sellable: number; earnings: number } | null>(
    null,
  );

  const [farmItems, setFarmItems] = useState<FarmItem[]>([
    { id: "f1", name: "Maize seeds", category: "Inputs", quantity: "25", unit: "kg", expiry: "2026-03-15", location: "Seed shed A", status: "fresh" },
    { id: "f2", name: "NPK fertilizer", category: "Inputs", quantity: "50", unit: "kg", expiry: "2025-12-01", location: "Input store B", status: "expiring-soon" },
    { id: "f3", name: "Stored maize", category: "Stored produce", quantity: "0.8", unit: "tonnes", expiry: "2026-02-20", location: "Store room 1", status: "fresh" },
    { id: "f4", name: "Herbicide", category: "Inputs", quantity: "5", unit: "L", expiry: "2026-06-10", location: "Input store B", status: "fresh" },
    { id: "f5", name: "Knapsack sprayer", category: "Equipment", quantity: "1", unit: "unit", location: "Equipment shed", status: "n/a" },
    { id: "f6", name: "Drip irrigation kit", category: "Equipment", quantity: "1", unit: "set", location: "North field", status: "n/a" },
  ]);
  const [newFarmItem, setNewFarmItem] = useState<{ name: string; category: FarmItem["category"]; quantity: string; unit: string; expiry: string; location: string }>({
    name: "", category: "Inputs", quantity: "", unit: "", expiry: "", location: "",
  });
  const [invFilter, setInvFilter] = useState<"all" | "expiring">("all");

  const categoryOptions = ["Inputs", "Stored produce", "Equipment", "Tools"] as const;

  const handleJoinOpp = (id: string) =>
    setJoinedOpps((prev) => ({ ...prev, [id]: true }));

  const runSimulation = () => {
    const size = Number(sim.farmSize) || 0;
    const yieldPerHa = Number(sim.yieldPerHa) || 0;
    const lossPct = Number(sim.lossPct) || 0;
    const price = Number(sim.price) || 0;
    const harvest = size * yieldPerHa;
    const sellable = harvest * (1 - lossPct / 100);
    const earnings = sellable * price;
    setSimResult({ harvest, sellable, earnings });
  };

  const now = new Date();
  const thirtyDaysFromNow = new Date(now);
  thirtyDaysFromNow.setDate(now.getDate() + 30);

  function computeItemStatus(expiry?: string): "fresh" | "expiring-soon" | "expired" | "n/a" {
    if (!expiry) return "n/a";
    const exp = new Date(expiry);
    if (exp < now) return "expired";
    if (exp <= thirtyDaysFromNow) return "expiring-soon";
    return "fresh";
  }

  function statusTint(status: FarmItem["status"]) {
    switch (status) {
      case "fresh": return "bg-leaf-soft text-leaf";
      case "expiring-soon": return "bg-harvest/20 text-harvest";
      case "expired": return "bg-destructive/15 text-destructive";
      default: return "bg-secondary text-secondary-foreground";
    }
  }

  function statusLabel(status: FarmItem["status"]) {
    switch (status) {
      case "fresh": return copy.invFresh;
      case "expiring-soon": return copy.invExpiring;
      case "expired": return copy.invExpired;
      default: return copy.invNA;
    }
  }

  const filteredItems = farmItems.filter((item) =>
    invFilter === "all" ? true : item.status === "expiring-soon",
  );

  // Match inventory/produce to market opportunities
  function itemName(item: Produce | FarmItem): string {
    return "crop" in item ? item.crop : item.name;
  }
  function itemUnitLabel(item: Produce | FarmItem): string {
    return "unit" in item ? item.unit : "tonnes";
  }

  function oppHaveMatch(opp: Opportunity): boolean {
    const cropLower = opp.crop.toLowerCase();
    return [...produce, ...farmItems].some((item) => {
      const name = itemName(item).toLowerCase();
      return name.includes(cropLower) || cropLower.includes(name);
    });
  }

  function oppHaveQty(opp: Opportunity): string {
    const cropLower = opp.crop.toLowerCase();
    const item = [...produce, ...farmItems].find((item) => {
      const name = itemName(item).toLowerCase();
      return name.includes(cropLower) || cropLower.includes(name);
    });
    return item ? `${item.quantity} ${itemUnitLabel(item)}` : "0";
  }

  return (
    <main className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <button
              aria-label={copy.navToggle}
              className="grid size-9 place-items-center rounded-md border border-border lg:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <Menu size={18} />
            </button>
            <Link to="/" className="flex items-center gap-2">
              <span className="grid size-9 place-items-center rounded-full bg-primary text-primary-foreground">
                <Sprout size={19} />
              </span>
              <span className="font-display text-xl font-semibold">HarvestLink</span>
            </Link>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <span className="hidden items-center gap-1.5 text-xs text-muted-foreground sm:inline-flex">
              <MapPin size={14} /> {copy.location}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLanguage(language === "en" ? "yo" : "en")}
              aria-label={`Switch language to ${copy.langLabel}`}
            >
              <Languages size={16} />
              <span className="hidden sm:inline">{copy.langLabel}</span>
            </Button>
            <button aria-label="Notifications" className="relative grid size-9 place-items-center rounded-full border border-border">
              <Bell size={17} />
              <span className="absolute right-2 top-2 size-1.5 rounded-full bg-harvest" />
            </button>
            <span className="grid size-9 place-items-center rounded-full bg-leaf-soft text-sm font-semibold text-leaf">
              AO
            </span>
          </div>
        </div>
      </header>

      {menuOpen && (
        <nav className="fixed inset-x-0 top-16 z-20 grid gap-1 border-b border-border bg-background p-3 shadow-md lg:hidden" aria-label="Farmer navigation">
          {navItems.map((item) => (
            <a
              key={item.href}
              className="flex items-center gap-3 px-3 py-2.5 text-sm"
              href={item.href}
              onClick={() => setMenuOpen(false)}
            >
              <item.icon size={17} /> {item.label}
            </a>
          ))}
        </nav>
      )}

      <div className="mx-auto grid max-w-[1440px] lg:grid-cols-[240px_minmax(0,1fr)]">
        <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] flex-col border-r border-border px-4 py-7 lg:flex">
          <p className="px-3 text-[10px] font-bold tracking-[0.12em] text-muted-foreground">
            {copy.coop.toUpperCase()}
          </p>
          <nav className="mt-6 grid gap-1" aria-label="Farmer navigation">
            {navItems.map(({ label, href, icon: Icon, active }) => (
              <a
                key={href}
                href={href}
                className={`flex items-center gap-3 px-3 py-2.5 text-sm font-medium transition-colors ${active ? "bg-leaf-soft text-leaf" : "text-muted-foreground hover:bg-secondary hover:text-foreground"}`}
              >
                <Icon size={17} /> {label}
              </a>
            ))}
          </nav>
          <div className="mt-auto border-t border-border pt-5">
            <p className="text-sm font-medium">{copy.profile}</p>
            <p className="mt-1 text-xs text-muted-foreground">{copy.location}</p>
            <a
              href="mailto:cooperative@example.invalid"
              className="mt-4 flex items-center gap-2 text-xs font-medium text-leaf"
            >
              <MessageCircle size={15} /> {copy.assist}
            </a>
          </div>
        </aside>

        <div className="min-w-0 px-4 py-6 sm:px-7 sm:py-8 lg:px-10 lg:py-9">
          <div className="mb-6 border border-harvest/45 bg-accent/45 px-4 py-3 sm:flex sm:items-center sm:justify-between sm:gap-5">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-harvest/30 text-accent-foreground">
                <ShieldCheck size={15} />
              </span>
              <div>
                <p className="text-[10px] font-bold tracking-[0.1em] text-accent-foreground">{copy.sample}</p>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">{copy.sampleNote}</p>
              </div>
            </div>
            <span className="mt-2 inline-flex items-center gap-1 text-[10px] font-semibold text-earth sm:mt-0">
              <CheckCircle2 size={13} /> Prototype view
            </span>
          </div>

          <section id="overview" className="rise-in">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
              <div>
                <p className="text-sm text-muted-foreground">{copy.location}</p>
                <h1 className="mt-1 font-display text-4xl font-medium sm:text-5xl">{copy.hello}</h1>
                <p className="mt-2 text-sm text-muted-foreground">{copy.sub}</p>
              </div>
              <span className="inline-flex items-center gap-2 text-xs text-muted-foreground">
                <CalendarDays size={15} /> {copy.week}
              </span>
            </div>

            <div id="my-farm" className="mt-7 grid gap-px border border-border bg-border sm:grid-cols-2 xl:grid-cols-4">
              {[
                { label: copy.farmArea, value: "2.4", unit: copy.hectares, icon: MapPin, tint: "text-earth" },
                { label: copy.crop, value: copy.maize, unit: "", icon: Wheat, tint: "text-harvest" },
                { label: copy.season, value: copy.planting, unit: "", icon: Sun, tint: "text-earth" },
                { label: copy.nextStep, value: copy.week, unit: "", icon: Sprout, tint: "text-leaf" },
              ].map(({ label, value, unit, icon: Icon, tint }) => (
                <article key={label} className="bg-card p-4 sm:p-5">
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground">{label}</p>
                    <Icon size={17} className={tint} />
                  </div>
                  <p className="mt-4 text-xl font-semibold">{value}</p>
                  {unit && <p className="mt-1 text-xs text-muted-foreground">{unit}</p>}
                </article>
              ))}
            </div>
          </section>

          <section id="market" className="mt-6">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
              <div>
                <p className="text-[10px] font-bold tracking-[0.11em] text-harvest">{copy.opportunitiesTitle}</p>
                <h2 className="mt-1 font-display text-2xl font-medium">{copy.opportunitiesSub}</h2>
              </div>
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground sm:mt-1">
                <PackageCheck size={14} /> {copy.oppNotice.split(".")[0]}
              </span>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {opportunities.map((opp) => {
                const joined = joinedOpps[opp.id];
                const hasMatch = oppHaveMatch(opp);
                const matchTint = opp.match === "High" ? "bg-leaf-soft text-leaf" : opp.match === "Medium" ? "bg-harvest/20 text-harvest" : "bg-secondary text-secondary-foreground";
                return (
                  <article key={opp.id} className="border border-border bg-card p-5 sm:p-6 soft-grid">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="grid size-9 place-items-center rounded-full bg-leaf-soft text-leaf">
                          <PackageCheck size={15} />
                        </span>
                        <p className="mt-3 text-xs font-semibold text-leaf">{opp.crop}</p>
                        <p className="mt-1 text-sm leading-5">{opp.buyer}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-bold tracking-[0.1em] uppercase ${matchTint}`}>{opp.match}</span>
                        <span className={`grid size-9 place-items-center rounded-full ${hasMatch ? "bg-leaf-soft text-leaf" : "bg-secondary text-secondary-foreground"}`}>
                          <Check size={12} />
                        </span>
                      </div>
                    </div>
                    <div className="mt-4 grid gap-3 border-t border-border/40 pt-4 sm:grid-cols-2">
                      <div>
                        <p className="text-[10px] font-bold tracking-[0.1em] text-muted-foreground">{copy.oppQuantity}</p>
                        <p className="mt-1 text-base font-semibold">{opp.quantity}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold tracking-[0.1em] text-muted-foreground">{copy.oppDelivery}</p>
                        <p className="mt-1 text-base font-semibold">{opp.delivery}</p>
                      </div>
                      <div className="col-span-2 sm:col-span-1">
                        <p className="text-[10px] font-bold tracking-[0.1em] text-muted-foreground">{copy.oppQuality}</p>
                        <p className="mt-1 text-xs leading-5 text-muted-foreground">{opp.quality}</p>
                      </div>
                      <div className="col-span-2 sm:col-span-1">
                        <p className="text-[10px] font-bold tracking-[0.1em] text-muted-foreground">{copy.oppLocation}</p>
                        <p className="mt-1 text-xs leading-5 text-muted-foreground">{opp.location}</p>
                      </div>
                    </div>
                    <div className="mt-3 px-2 py-2 border border-border/30 rounded-lg bg-secondary/30 flex items-center gap-2">
                      <span className="text-[10px] font-bold text-muted-foreground">{hasMatch ? copy.oppHaveMatch : copy.oppNoMatch}</span>
                      <span className="ml-auto text-[10px] font-semibold">{copy.invMatchQty}: {oppHaveQty(opp)}</span>
                    </div>
                    <div className="mt-4 flex items-center gap-2">
                      <Button
                        variant="secondary"
                        onClick={() => handleJoinOpp(opp.id)}
                        disabled={joined}
                        className="w-full"
                        size="sm"
                      >
                        {joined ? <><Check size={15} /> {copy.oppJoined}</> : <>{copy.oppJoin}<ArrowRight size={15} /></>}
                      </Button>
                    </div>
                    {joined && <p role="status" className="mt-2 border-l border-harvest pl-3 text-[11px] leading-5 text-primary-foreground/80">{copy.joinedNote}</p>}
                  </article>
                );
              })}
            </div>
            {opportunities.length === 0 && (
              <p className="mt-6 text-xs text-muted-foreground">{copy.oppNone}</p>
            )}
            <p className="mt-6 flex items-start gap-2 border-t border-border/40 pt-4 text-[11px] leading-5 text-muted-foreground">
              <ShieldCheck size={14} className="mt-0.5 shrink-0" /> {copy.buyerNotice}
            </p>
          </section>

          <section id="inventory" className="mt-8 grid gap-4 xl:grid-cols-[1.5fr_0.7fr]">
            <article className="border border-border bg-card p-5 sm:p-6 soft-grid">
              <div className="flex items-center justify-between gap-3 mb-5">
                <div>
                  <span className="grid size-10 place-items-center rounded-full bg-sky text-secondary-foreground">
                    <Box size={19} />
                  </span>
                  <p className="mt-2 text-xs font-bold tracking-[0.1em] text-leaf">{copy.invTitle}</p>
                  <h2 className="mt-1 font-display text-2xl font-medium">{copy.invSub}</h2>
                </div>
              </div>

              <form onSubmit={(e) => {
                e.preventDefault();
                if (!newFarmItem.name || !newFarmItem.quantity || !newFarmItem.unit || !newFarmItem.location) return;
                const status = computeItemStatus(newFarmItem.expiry);
                const item: FarmItem = {
                  id: `f${Date.now()}`,
                  name: newFarmItem.name,
                  category: newFarmItem.category,
                  quantity: newFarmItem.quantity,
                  unit: newFarmItem.unit,
                  location: newFarmItem.location,
                  status,
                  ...(newFarmItem.expiry ? { expiry: newFarmItem.expiry } : {}),
                };
                setFarmItems((prev) => [item, ...prev]);
                setNewFarmItem({ name: "", category: "Inputs", quantity: "", unit: "", expiry: "", location: "" });
              }} className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 items-end">
                <div className="col-span-2 sm:col-span-1">
                  <Label className="text-[10px] font-bold tracking-[0.1em] text-muted-foreground block mb-1">{copy.invItem}</Label>
                  <Input value={newFarmItem.name} onChange={(e) => setNewFarmItem({ ...newFarmItem, name: e.target.value })} placeholder={copy.invItem} />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <Label className="text-[10px] font-bold tracking-[0.1em] text-muted-foreground block mb-1">{copy.invCategory}</Label>
                  <select
                    value={newFarmItem.category}
                    onChange={(e) => setNewFarmItem({ ...newFarmItem, category: e.target.value as FarmItem["category"] })}
                    className="border border-input bg-background px-3 py-2 text-sm rounded-md focus-2 focus:border-ring focus-2:focus-visible focus-2:outline-none"
                  >
                    {categoryOptions.map((cat) => (
                      <option key={cat} value={cat}>
                        {(copy as Record<string, string>)[`invCat${cat.charAt(0).toUpperCase()}${cat.slice(1)}`]}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <Label className="text-[10px] font-bold tracking-[0.1em] text-muted-foreground block mb-1">{copy.invQty}</Label>
                  <Input type="number" value={newFarmItem.quantity} onChange={(e) => setNewFarmItem({ ...newFarmItem, quantity: e.target.value })} placeholder="0" />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <Label className="text-[10px] font-bold tracking-[0.1em] text-muted-foreground block mb-1">{copy.invUnit}</Label>
                  <Input value={newFarmItem.unit} onChange={(e) => setNewFarmItem({ ...newFarmItem, unit: e.target.value })} placeholder="kg / L / unit" />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <Label className="text-[10px] font-bold tracking-[0.1em] text-muted-foreground block mb-1">{copy.invExpiry}</Label>
                  <Input type="date" value={newFarmItem.expiry} onChange={(e) => setNewFarmItem({ ...newFarmItem, expiry: e.target.value })} />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <Label className="text-[10px] font-bold tracking-[0.1em] text-muted-foreground block mb-1">{copy.invLoc}</Label>
                  <Input value={newFarmItem.location} onChange={(e) => setNewFarmItem({ ...newFarmItem, location: e.target.value })} placeholder="e.g. Store room 1" />
                </div>
                <div className="col-span-3 sm:col-span-2 flex items-end gap-2">
                  <Button type="submit" className="w-full">{copy.invSave}</Button>
                  <span className="mt-1 inline-flex items-center gap-1 text-[10px] font-bold text-leaf"><Check size={13} />{copy.invSaved}</span>
                </div>
              </form>
              <Separator className="my-5" />

              <div className="flex items-center gap-2 mb-3">
                <span className="text-[10px] font-bold tracking-[0.1em] text-muted-foreground">{copy.invFilterAll}</span>
                <div className="flex gap-1">
                  <button
                    onClick={() => setInvFilter("all")}
                    className={`px-2 py-1 text-[10px] rounded-md border ${invFilter === "all" ? "bg-leaf-soft border-leaf text-leaf" : "border-border text-muted-foreground hover:bg-secondary"}`}
                  >{copy.invFilterAll}</button>
                  <button
                    onClick={() => setInvFilter("expiring")}
                    className={`px-2 py-1 text-[10px] rounded-md border ${invFilter === "expiring" ? "bg-harvest/20 border-harvest text-harvest" : "border-border text-muted-foreground hover:bg-secondary"}`}
                  >{copy.invFilterExpiring}</button>
                </div>
              </div>

              <p className="text-[10px] font-bold tracking-[0.1em] text-muted-foreground">{copy.invList}</p>
              <div className="mt-3 space-y-3">
                {filteredItems.length === 0 ? (
                  <p className="py-4 text-xs text-muted-foreground text-center">{copy.invNone}</p>
                ) : (
                  filteredItems.map((item) => (
                    <article key={item.id} className="flex items-center justify-between gap-3 border-b border-border/40 py-3 last:border-0">
                      <div className="flex items-center gap-3">
                        <div className={`grid size-8 shrink-0 place-items-center rounded-md ${statusTint(item.status)}`}>
                          {item.category === "Stored produce" ? <Wheat size={11} /> : item.category === "Inputs" ? <Droplets size={11} /> : item.category === "Equipment" ? <PackageCheck size={11} /> : <Sun size={11} />}
                        </div>
                        <div>
                          <p className="text-sm font-semibold">{item.name}</p>
                          <p className="text-xs text-muted-foreground">{item.quantity} {item.unit} · {item.location}</p>
                          {item.expiry && <p className="text-xs text-muted-foreground">{copy.invExpiry}: {new Date(item.expiry).toLocaleDateString()}</p>}
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`text-[10px] font-bold tracking-[0.08em] px-2 py-0.5 rounded ${statusTint(item.status)}`}>{statusLabel(item.status)}</span>
                        <button
                          onClick={() => setFarmItems((prev) => prev.filter((p) => p.id !== item.id))}
                          className="text-xs text-destructive/80 hover:text-destructive underline underline-offset-4"
                          aria-label={`Remove ${item.name}`}
                        >
                          {copy.invRemove}
                        </button>
                      </div>
                    </article>
                  ))
                )}
              </div>
            </article>
          </section>

          <section id="inventory-match" className="mt-8">
            <article className="border border-border bg-card p-5 sm:p-6 soft-grid">
              <div className="flex items-center justify-between gap-3 mb-5">
                <div>
                  <span className="grid size-10 place-items-center rounded-full bg-leaf-soft text-leaf">
                    <TrendingUp size={19} />
                  </span>
                  <p className="mt-2 text-xs font-bold tracking-[0.1em] text-leaf">{copy.invMatchTitle}</p>
                  <h2 className="mt-1 font-display text-2xl font-medium">{copy.invMatchSub}</h2>
                </div>
              </div>
              <div className="overflow-x-auto border border-border rounded-xl">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-border/40">
                      <th className="pb-3 text-[10px] font-bold tracking-[0.1em] text-muted-foreground">{copy.invMatchQty}</th>
                      <th className="pb-3 text-[10px] font-bold tracking-[0.1em] text-muted-foreground">{copy.invMatchNeed}</th>
                      <th className="pb-3 text-[10px] font-bold tracking-[0.1em] text-muted-foreground">{copy.invMatchGap}</th>
                      <th className="pb-3 text-[10px] font-bold tracking-[0.1em] text-muted-foreground">{copy.invCovered}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {opportunities.map((opp) => {
                      const hasMatch = oppHaveMatch(opp);
                      const haveQty = oppHaveQty(opp);
                      const needQty = opp.quantity.replace(/\D/g, "");
                      const gap = hasMatch ? Math.max(0, Number(needQty) - Number(haveQty || 0)) : Number(needQty) || 0;
                      return (
                        <tr key={opp.id} className="border-b border-border/40 last:border-0">
                          <td className="py-3">{opp.crop}</td>
                          <td className="py-3">{haveQty} tonnes</td>
                          <td className="py-3">{opp.quantity}</td>
                          <td className="py-3 text-right">
                            {gap > 0 ? (
                              <span className="text-[10px] font-bold text-destructive">{gap} tonnes short</span>
                            ) : (
                              <span className={`text-[10px] font-bold ${hasMatch ? "text-leaf" : "text-muted-foreground"}`}>{hasMatch ? copy.invCovered : copy.invNone}</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                    {opportunities.length === 0 && (
                      <tr><td colSpan={4} className="py-4 text-xs text-muted-foreground text-center">{copy.invMatchNone}</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
              {opportunities.length > 0 && opportunities.some(oppHaveMatch) === false && (
                <p className="mt-4 text-[11px] leading-5 text-muted-foreground">{copy.invMatchNone}</p>
              )}
              <p className="mt-5 border-t border-border pt-4 text-[11px] leading-5 text-muted-foreground">{copy.buyerNotice}</p>
            </article>
          </section>

          <section className="mt-8 grid gap-4 xl:grid-cols-[1fr_1fr_0.92fr]">
            <article id="weather" className="border border-border bg-card p-5 sm:p-6">
              <div className="relative flex items-start justify-between gap-3">
                <div>
                  <p className="text-[10px] font-bold tracking-[0.11em] text-leaf">{copy.local}</p>
                  <h2 className="mt-2 font-display text-2xl font-medium">{copy.weatherTitle}</h2>
                </div>
                <CloudSun className="text-earth" size={24} />
              </div>
              <div className="relative mt-5 flex items-center gap-4">
                <span className="font-display text-5xl">{copy.temp}</span>
                <div>
                  <p className="font-medium">{copy.weather}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{copy.location}</p>
                </div>
              </div>
              <p className="relative mt-5 border-t border-border pt-4 text-sm leading-6 text-muted-foreground">
                <Droplets size={16} className="mr-2 inline text-sky-foreground" /> {copy.weatherNote}
              </p>
            </article>

            <article id="guidance" className="border border-border bg-card p-5 sm:p-6">
              <div className="flex items-center justify-between">
                <span className="grid size-10 place-items-center rounded-full bg-leaf-soft text-leaf">
                  <Sprout size={19} />
                </span>
                <span className="text-[10px] font-bold tracking-[0.1em] text-muted-foreground">{copy.guideTag}</span>
              </div>
              <p className="mt-5 text-xs font-semibold text-leaf">{copy.guideTitle}</p>
              <h2 className="mt-1 font-display text-2xl font-medium">{copy.guide}</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{copy.guideBody}</p>
              <a href="#guidance" className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-primary">
                {copy.read}<ChevronRight size={15} />
              </a>
            </article>

            <article id="storage" className="border border-border bg-accent/35 p-5 sm:p-6">
              <span className="grid size-10 place-items-center rounded-full bg-accent text-earth">
                <Wheat size={19} />
              </span>
              <p className="mt-5 text-xs font-bold tracking-[0.1em] text-earth">{copy.careLabel}</p>
              <h2 className="mt-1 font-display text-2xl font-medium">{copy.careTitle}</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{copy.careBody}</p>
              <a href="#storage" className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-primary">
                {copy.careLink}<ChevronRight size={15} />
              </a>
              <p className="mt-4 border-t border-border/70 pt-3 text-[10px] leading-4 text-muted-foreground">{copy.careFoot}</p>
            </article>

            <article className="flex flex-col border border-border bg-card p-5 sm:p-6">
              <div className="flex items-center justify-between">
                <span className="grid size-10 place-items-center rounded-full bg-sky text-secondary-foreground">
                  <PackageCheck size={19} />
                </span>
                <span className="text-[10px] font-bold tracking-[0.1em] text-muted-foreground">{copy.marketLabel}</span>
              </div>
              <h2 className="mt-5 font-display text-2xl font-medium">{copy.marketTitle}</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{copy.marketBody}</p>
              <a href="#market" className="mt-auto inline-flex items-center gap-2 pt-5 text-xs font-semibold text-primary">
                {copy.marketLink}<ChevronRight size={15} />
              </a>
            </article>
          </section>

          <footer className="mt-9 flex flex-col gap-3 border-t border-border pt-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <Link to="/" className="inline-flex items-center gap-2 font-medium text-foreground">
              <ArrowLeft size={14} /> {copy.navHome}
            </Link>
            <span className="inline-flex items-center gap-2">
              <ShieldCheck size={14} /> {copy.sampleNote}
            </span>
          </footer>
        </div>
      </div>
    </main>
  );
}

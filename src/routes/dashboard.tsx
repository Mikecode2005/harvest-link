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
  CloudSun,
  Droplets,
  Languages,
  Leaf,
  MapPin,
  Menu,
  MessageCircle,
  PackageCheck,
  ShieldCheck,
  Sprout,
  Sun,
  Wheat,
} from "lucide-react";
import { Button } from "@/components/ui/button";

type Language = "en" | "yo";

const t = {
  en: {
    overview: "Overview", myFarm: "My farm", market: "Market opportunities", guidance: "Crop guidance", storage: "Post-harvest care",
    sample: "PROTOTYPE · SAMPLE DATA", sampleNote: "Illustrative farmer, crop and buyer figures only — not live pilot results.",
    hello: "Good morning, Adebayo", sub: "Here’s what’s happening around your farm.", location: "Idanre, Ondo State",
    farmArea: "Farm area", crop: "Main crop", season: "Season", nextStep: "Next field step", hectares: "hectares", maize: "Maize", planting: "Growing season", week: "Week 6 · Growing", 
    weatherTitle: "Today around Idanre", weather: "Partly cloudy", weatherNote: "Check soil moisture before watering. Rain may return later this week.", temp: "28°", local: "Local forecast · sample",
    opportunity: "A buyer is looking for maize", opportunitySub: "PROPOSED GROUP OPPORTUNITY · SAMPLE", target: "Buyer request", needed: "50 tonnes", collection: "Suggested collection", date: "Within 3 weeks", proposed: "Proposed farm allocation", quantity: "0.8 tonnes", buyerTerms: "Dry, clean maize · quality check at collection", join: "I’m interested", joined: "Interest noted", joinedNote: "Sample only. No buyer, farm or delivery commitment has been made.", buyerNotice: "All quantities are suggestions. Confirm with the farmer before any commitment.",
    guideTitle: "This week on your farm", guide: "Growing maize · Week 6", guideBody: "Walk the field and look for yellowing leaves or standing water. Remove weeds early to reduce competition for nutrients.", guideTag: "General crop guidance · confirm locally", read: "View full guidance",
    careTitle: "Protect your harvest", careLabel: "POST-HARVEST TIP", careBody: "Dry maize thoroughly before storage. Keep bags off the floor, away from walls, and in a clean, dry, well-ventilated place.", careLink: "See storage checklist", careFoot: "Practical guidance · not a substitute for local expert advice",
    marketTitle: "Nearby market signal", marketLabel: "ILLUSTRATIVE", marketBody: "Maize demand is showing in the Idanre area. Buyer interest and prices must be confirmed directly before making plans.", marketLink: "Explore opportunities",
    navHome: "Back to HarvestLink", profile: "Adebayo O.", coop: "Idanre Farmers Cooperative", langLabel: "Yorùbá", assist: "Need help? Talk to your cooperative.", navToggle: "Open navigation",
  },
  yo: {
    overview: "Àkótán", myFarm: "Oko mi", market: "Àǹfààní ọjà", guidance: "Ìtọ́sọ́nà irúgbìn", storage: "Ìtọ́jú lẹ́yìn ìkórè",
    sample: "ÀPẸ̀RẸ · DÁTÀ ÀPẸ̀ẸRẸ", sampleNote: "Àpẹẹrẹ àgbẹ̀, irúgbìn àti oníbàárà ni wọ̀nyí—kì í ṣe àbájáde ìdánwò gidi.",
    hello: "Ẹ káàárọ̀, Adebayo", sub: "Èyí ni ohun tó ń ṣẹlẹ̀ ní àyíká oko rẹ.", location: "Idanre, Ìpínlẹ̀ Ondo",
    farmArea: "Iye ilẹ̀ oko", crop: "Irúgbìn pàtàkì", season: "Àkókò", nextStep: "Ìgbésẹ̀ tó kàn", hectares: "hektà", maize: "Àgbàdo", planting: "Àkókò ìdàgbàsókè", week: "Ọ̀sẹ̀ 6 · Ìdàgbàsókè",
    weatherTitle: "Ojú-ọjọ́ lónìí ní Idanre", weather: "Ìkùùkuu díẹ̀", weatherNote: "Ṣàyẹ̀wò ọrinrin ilẹ̀ kí o tó fún irúgbìn ní omi. Òjò lè tún rọ̀ lọ́sẹ̀ yìí.", temp: "28°", local: "Àsọtẹ́lẹ̀ agbègbè · àpẹẹrẹ",
    opportunity: "Oníbàárà ń wá àgbàdo", opportunitySub: "ÀǸFÀÀNÍ ÀPẸ̀ẸRẸ FÚN ẸGBẸ́", target: "Ohun tí oníbàárà nílò", needed: "Tọ́ọ̀nù 50", collection: "Gbígbà tí a dábàá", date: "Láàárín ọ̀sẹ̀ mẹ́ta", proposed: "Iye oko tí a dábàá", quantity: "Tọ́ọ̀nù 0.8", buyerTerms: "Àgbàdo gbígbẹ́, mímọ́ · àyẹ̀wò nígbà gbígbà", join: "Mo nífẹ̀ẹ́ sí i", joined: "A gba ìfẹ́ rẹ sí àkọsílẹ̀", joinedNote: "Àpẹẹrẹ nìkan. Kò sí oníbàárà, oko tàbí ètò ìfijiṣẹ́ tí a fọwọ́ sí.", buyerNotice: "Ìwọ̀n gbogbo rẹ̀ jẹ́ àbá. Jẹ́rìí pẹ̀lú àgbẹ̀ kí ohun kan tó di àdéhùn.",
    guideTitle: "Iṣẹ́ oko lọ́sẹ̀ yìí", guide: "Àgbàdo ń dàgbàsókè · Ọ̀sẹ̀ 6", guideBody: "Rìn ká oko, kí o sì wá ewé tó ń di àwọ̀ ofeefee tàbí omi tó dúró. Yọ èpò ní kùtùkùtù kí wọ́n má bàa díje fún oúnjẹ ilẹ̀.", guideTag: "Ìmọ̀ràn irúgbìn gbogbogbò · jẹ́rìí ní agbègbè", read: "Wo gbogbo ìtọ́sọ́nà",
    careTitle: "Dáàbò bo ìkórè rẹ", careLabel: "ÌMỌ̀RÀN LẸ́YÌN ÌKÓRÈ", careBody: "Gbẹ àgbàdo dáadáa kí o tó tọ́jú rẹ. Gbé àpò sókè kúrò lórí ilẹ̀, sí ibi mímọ́, gbígbẹ́ tí afẹ́fẹ́ ti ń wọ̀.", careLink: "Wo àtòjọ ìtọ́jú", careFoot: "Ìmọ̀ràn tó wúlò · kì í ṣe àfidípò fún ìmọ̀ràn amòye agbègbè",
    marketTitle: "Àmì ọjà nítòsí", marketLabel: "ÀPẸ̀ẸRẸ", marketBody: "A nílò àgbàdo ní agbègbè Idanre. Jẹ́rìí ìfẹ́ oníbàárà àti owó pẹ̀lú wọn kí o tó gbèrò.", marketLink: "Wo àǹfààní ọjà",
    navHome: "Padà sí HarvestLink", profile: "Adebayo O.", coop: "Ẹgbẹ́ Àgbẹ̀ Idanre", langLabel: "English", assist: "Ṣé o nílò ìrànlọ́wọ́? Bá ẹgbẹ́ àgbẹ̀ rẹ sọ̀rọ̀.", navToggle: "Ṣí àkójọ ìrìnàjò",
  },
} as const;

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Farmer dashboard | HarvestLink" },
      { name: "description", content: "Explore a sample HarvestLink farmer dashboard for seasonal crop guidance, a coordinated maize opportunity and post-harvest care in Idanre, Ondo." },
      { property: "og:title", content: "Farmer dashboard | HarvestLink" },
      { property: "og:description", content: "An illustrative farmer dashboard with sample crop guidance, market coordination and post-harvest tips." },
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
    { label: copy.guidance, href: "#guidance", icon: CalendarDays, active: false },
    { label: copy.storage, href: "#storage", icon: ShieldCheck, active: false },
  ];

  return (
    <main className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <button aria-label={copy.navToggle} className="grid size-9 place-items-center rounded-md border border-border lg:hidden" onClick={() => setMenuOpen(!menuOpen)}><Menu size={18} /></button>
            <Link to="/" className="flex items-center gap-2"><span className="grid size-9 place-items-center rounded-full bg-primary text-primary-foreground"><Sprout size={19} /></span><span className="font-display text-xl font-semibold">HarvestLink</span></Link>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <span className="hidden items-center gap-1.5 text-xs text-muted-foreground sm:inline-flex"><MapPin size={14} />{copy.location}</span>
            <Button variant="ghost" size="sm" onClick={() => setLanguage(language === "en" ? "yo" : "en")} aria-label={`Switch language to ${copy.langLabel}`}><Languages size={16} /><span className="hidden sm:inline">{copy.langLabel}</span></Button>
            <button aria-label="Notifications" className="relative grid size-9 place-items-center rounded-full border border-border"><Bell size={17} /><span className="absolute right-2 top-2 size-1.5 rounded-full bg-harvest" /></button>
            <span className="grid size-9 place-items-center rounded-full bg-leaf-soft text-sm font-semibold text-leaf">AO</span>
          </div>
        </div>
      </header>

      {menuOpen && <nav className="fixed inset-x-0 top-16 z-20 grid gap-1 border-b border-border bg-background p-3 shadow-md lg:hidden" aria-label="Farmer navigation">{navItems.map((item) => <a key={item.href} className="flex items-center gap-3 px-3 py-2.5 text-sm" href={item.href} onClick={() => setMenuOpen(false)}><item.icon size={17} />{item.label}</a>)}</nav>}

      <div className="mx-auto grid max-w-[1440px] lg:grid-cols-[240px_minmax(0,1fr)]">
        <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] flex-col border-r border-border px-4 py-7 lg:flex">
          <p className="px-3 text-[10px] font-bold tracking-[0.12em] text-muted-foreground">{copy.coop.toUpperCase()}</p>
          <nav className="mt-6 grid gap-1" aria-label="Farmer navigation">
            {navItems.map(({ label, href, icon: Icon, active }) => <a key={href} href={href} className={`flex items-center gap-3 px-3 py-2.5 text-sm font-medium transition-colors ${active ? "bg-leaf-soft text-leaf" : "text-muted-foreground hover:bg-secondary hover:text-foreground"}`}><Icon size={17} />{label}</a>)}
          </nav>
          <div className="mt-auto border-t border-border pt-5">
            <p className="text-sm font-medium">{copy.profile}</p><p className="mt-1 text-xs text-muted-foreground">{copy.location}</p>
            <a href="mailto:cooperative@example.invalid" className="mt-4 flex items-center gap-2 text-xs font-medium text-leaf"><MessageCircle size={15} />{copy.assist}</a>
          </div>
        </aside>

        <div className="min-w-0 px-4 py-6 sm:px-7 sm:py-8 lg:px-10 lg:py-9">
          <div className="mb-6 border border-harvest/45 bg-accent/45 px-4 py-3 sm:flex sm:items-center sm:justify-between sm:gap-5">
            <div className="flex items-start gap-3"><span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-harvest/30 text-accent-foreground"><ShieldCheck size={15} /></span><div><p className="text-[10px] font-bold tracking-[0.1em] text-accent-foreground">{copy.sample}</p><p className="mt-1 text-xs leading-5 text-muted-foreground">{copy.sampleNote}</p></div></div>
            <span className="mt-2 inline-flex items-center gap-1 text-[10px] font-semibold text-earth sm:mt-0"><CheckCircle2 size={13} />Prototype view</span>
          </div>

          <section id="overview" className="rise-in">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
              <div><p className="text-sm text-muted-foreground">{copy.location}</p><h1 className="mt-1 font-display text-4xl font-medium sm:text-5xl">{copy.hello}</h1><p className="mt-2 text-sm text-muted-foreground">{copy.sub}</p></div>
              <span className="inline-flex items-center gap-2 text-xs text-muted-foreground"><CalendarDays size={15} />{copy.week}</span>
            </div>

            <div id="my-farm" className="mt-7 grid gap-px border border-border bg-border sm:grid-cols-2 xl:grid-cols-4">
              {[
                { label: copy.farmArea, value: "2.4", unit: copy.hectares, icon: MapPin, tint: "text-earth" },
                { label: copy.crop, value: copy.maize, unit: "", icon: Wheat, tint: "text-harvest" },
                { label: copy.season, value: copy.planting, unit: "", icon: Sun, tint: "text-earth" },
                { label: copy.nextStep, value: copy.week, unit: "", icon: Sprout, tint: "text-leaf" },
              ].map(({ label, value, unit, icon: Icon, tint }) => <article key={label} className="bg-card p-4 sm:p-5"><div className="flex items-center justify-between"><p className="text-xs text-muted-foreground">{label}</p><Icon size={17} className={tint} /></div><p className="mt-4 text-xl font-semibold">{value}</p>{unit && <p className="mt-1 text-xs text-muted-foreground">{unit}</p>}</article>)}
            </div>
          </section>

          <section className="mt-6 grid gap-4 xl:grid-cols-[1.35fr_0.65fr]">
            <article id="market" className="border border-primary/25 bg-primary p-5 text-primary-foreground sm:p-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div><p className="text-[10px] font-bold tracking-[0.11em] text-harvest">{copy.opportunitySub}</p><h2 className="mt-2 font-display text-3xl font-medium leading-tight sm:text-4xl">{copy.opportunity}</h2></div>
                <span className="grid size-11 place-items-center rounded-full bg-primary-foreground/10"><PackageCheck size={21} className="text-harvest" /></span>
              </div>
              <div className="mt-6 grid gap-4 border-y border-primary-foreground/20 py-4 sm:grid-cols-2">
                <div><p className="text-xs text-primary-foreground/70">{copy.target}</p><p className="mt-1 text-2xl font-semibold">{copy.needed}</p></div>
                <div><p className="text-xs text-primary-foreground/70">{copy.collection}</p><p className="mt-1 text-base font-semibold">{copy.date}</p></div>
              </div>
              <div className="mt-4 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                <div><p className="text-xs text-primary-foreground/70">{copy.proposed}</p><p className="mt-1 text-lg font-semibold">{copy.quantity}</p><p className="mt-1 text-xs text-primary-foreground/70">{copy.buyerTerms}</p></div>
                <Button variant="secondary" onClick={() => setInterested(true)} disabled={interested} className="w-full sm:w-auto">{interested ? <><Check size={16} />{copy.joined}</> : <>{copy.join}<ArrowRight size={16} /></>}</Button>
              </div>
              {interested && <p role="status" className="mt-3 border-l border-harvest pl-3 text-xs text-primary-foreground/80">{copy.joinedNote}</p>}
              <p className="mt-5 flex items-start gap-2 border-t border-primary-foreground/20 pt-4 text-[11px] leading-5 text-primary-foreground/75"><ShieldCheck size={14} className="mt-0.5 shrink-0" />{copy.buyerNotice}</p>
            </article>

            <article className="soft-grid relative overflow-hidden border border-border bg-card p-5 sm:p-6">
              <div className="relative flex items-start justify-between gap-3"><div><p className="text-[10px] font-bold tracking-[0.11em] text-leaf">{copy.local}</p><h2 className="mt-2 font-display text-2xl font-medium">{copy.weatherTitle}</h2></div><CloudSun className="text-earth" size={24} /></div>
              <div className="relative mt-5 flex items-center gap-4"><span className="font-display text-5xl">{copy.temp}</span><div><p className="font-medium">{copy.weather}</p><p className="mt-1 text-xs text-muted-foreground">{copy.location}</p></div></div>
              <p className="relative mt-5 border-t border-border pt-4 text-sm leading-6 text-muted-foreground"><Droplets size={16} className="mr-2 inline text-sky-foreground" />{copy.weatherNote}</p>
            </article>
          </section>

          <section className="mt-8 grid gap-4 xl:grid-cols-[1fr_1fr_0.92fr]">
            <article id="guidance" className="border border-border bg-card p-5 sm:p-6">
              <div className="flex items-center justify-between"><span className="grid size-10 place-items-center rounded-full bg-leaf-soft text-leaf"><Sprout size={19} /></span><span className="text-[10px] font-bold tracking-[0.1em] text-muted-foreground">{copy.guideTag}</span></div>
              <p className="mt-5 text-xs font-semibold text-leaf">{copy.guideTitle}</p><h2 className="mt-1 font-display text-2xl font-medium">{copy.guide}</h2><p className="mt-3 text-sm leading-6 text-muted-foreground">{copy.guideBody}</p>
              <a href="#guidance" className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-primary">{copy.read}<ChevronRight size={15} /></a>
            </article>

            <article id="storage" className="border border-border bg-accent/35 p-5 sm:p-6">
              <span className="grid size-10 place-items-center rounded-full bg-accent text-earth"><Wheat size={19} /></span>
              <p className="mt-5 text-xs font-bold tracking-[0.1em] text-earth">{copy.careLabel}</p><h2 className="mt-1 font-display text-2xl font-medium">{copy.careTitle}</h2><p className="mt-3 text-sm leading-6 text-muted-foreground">{copy.careBody}</p>
              <a href="#storage" className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-primary">{copy.careLink}<ChevronRight size={15} /></a><p className="mt-4 border-t border-border/70 pt-3 text-[10px] leading-4 text-muted-foreground">{copy.careFoot}</p>
            </article>

            <article className="flex flex-col border border-border bg-card p-5 sm:p-6">
              <div className="flex items-center justify-between"><span className="grid size-10 place-items-center rounded-full bg-sky text-secondary-foreground"><PackageCheck size={19} /></span><span className="text-[10px] font-bold tracking-[0.1em] text-muted-foreground">{copy.marketLabel}</span></div>
              <h2 className="mt-5 font-display text-2xl font-medium">{copy.marketTitle}</h2><p className="mt-3 text-sm leading-6 text-muted-foreground">{copy.marketBody}</p>
              <a href="#market" className="mt-auto inline-flex items-center gap-2 pt-5 text-xs font-semibold text-primary">{copy.marketLink}<ChevronRight size={15} /></a>
            </article>
          </section>

          <footer className="mt-9 flex flex-col gap-3 border-t border-border pt-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <Link to="/" className="inline-flex items-center gap-2 font-medium text-foreground"><ArrowLeft size={14} />{copy.navHome}</Link>
            <span className="inline-flex items-center gap-2"><ShieldCheck size={14} />{copy.sampleNote}</span>
          </footer>
        </div>
      </div>
    </main>
  );
}
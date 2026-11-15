import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  CircleHelp,
  CloudSun,
  Languages,
  Leaf,
  Menu,
  MessageCircle,
  ShieldCheck,
  Sprout,
  Tractor,
  Wheat,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import farmerImage from "@/assets/harvestlink-farmer.jpg";

type Language = "en" | "yo";

const copy = {
  en: {
    nav: ["How it works", "For farmers", "Our pilot"],
    signIn: "Farmer dashboard",
    eyebrow: "MADE FOR SMALLHOLDERS · ONDO STATE",
    title: "Good harvests deserve a bigger market.",
    intro:
      "Plan your season with confidence, care for what you grow, and find your place in bigger buyer opportunities.",
    start: "Explore the farmer dashboard",
    how: "See how it works",
    location: "PILOTING IN IDANRE, ONDO",
    stats: ["One clear place", "One shared opportunity", "Built around your farm"],
    sectionLabel: "A more connected harvest",
    sectionTitle: "Good farming takes more than a good season.",
    sectionIntro:
      "HarvestLink brings practical guidance and shared market opportunities together, with local support at every step.",
    cards: [
      {
        title: "Know what comes next",
        body: "Seasonal crop tips, local market signals and soil-informed notes, made easier to act on.",
        icon: Sprout,
        tint: "bg-leaf-soft text-leaf",
      },
      {
        title: "Keep more of your harvest",
        body: "Practical handling and storage advice, connected to when and how produce gets collected.",
        icon: Wheat,
        tint: "bg-accent text-accent-foreground",
      },
      {
        title: "Grow into a bigger order",
        body: "Join with other farms to meet the volume a larger buyer needs. You confirm before anything is committed.",
        icon: Tractor,
        tint: "bg-sky text-secondary-foreground",
      },
    ],
    opportunity: "A buyer needs 50 tonnes of maize.",
    opportunityBody:
      "HarvestLink helps a group of farmers work toward one larger order—with clear quantities, farmer confirmation and a coordinated collection plan.",
    stepLabel: "HOW IT WORKS",
    steps: ["A buyer shares a need", "Farms see a suggested share", "Farmers confirm, then plan together"],
    assisted: "No smartphone or steady signal?",
    assistedBody: "A cooperative or local agent can help you take part. Core information is designed for low-connectivity use.",
    ctaTitle: "Your farm has a place in the bigger picture.",
    ctaBody: "Take a look at a sample farmer dashboard for our Idanre pilot.",
    footer: "A prototype for the Idanre pilot · Sample information, not live farm or buyer data.",
    language: "Yorùbá",
  },
  yo: {
    nav: ["Bí ó ṣe ń ṣiṣẹ́", "Fún àgbẹ̀", "Ìdánwò wa"],
    signIn: "Pánẹ́lì àgbẹ̀",
    eyebrow: "FÚN ÀWỌN ÀGBẸ̀ KÉKÈKÉ · ÌPÍNLẸ̀ ONDO",
    title: "Ìkórè rere yẹ fún ọjà tó tóbi sí i.",
    intro: "Gbèrò àsìkò iṣẹ́ àgbẹ̀ rẹ dáadáa, tọ́jú ohun tí o gbìn, kí o sì darapọ̀ mọ́ àwọn àǹfààní ọjà tó tóbi.",
    start: "Wo pánẹ́lì àgbẹ̀",
    how: "Wo bí ó ṣe ń ṣiṣẹ́",
    location: "ÌDÁNWÒ NÍ IDANRE, ONDO",
    stats: ["Ohun gbogbo ní ibìkan", "Àǹfààní àjọṣepọ̀", "A ṣe é fún oko rẹ"],
    sectionLabel: "Ìkórè tó so wa pọ̀",
    sectionTitle: "Iṣẹ́ àgbẹ̀ rere ju àsìkò rere lọ.",
    sectionIntro: "HarvestLink so ìmọ̀ tó wúlò pọ̀ mọ́ àǹfààní ọjà, pẹ̀lú ìrànlọ́wọ́ agbègbè ní gbogbo ìgbésẹ̀.",
    cards: [
      { title: "Mọ ohun tó kàn", body: "Ìmọ̀ràn àkókò gbíngbin, àmì ọjà agbègbè àti ìtọ́sọ́nà tó dá lórí ilẹ̀ oko.", icon: Sprout, tint: "bg-leaf-soft text-leaf" },
      { title: "Pa èso ìkórè rẹ mọ́", body: "Ìmọ̀ràn tó rọrùn lórí ìtọ́jú àti ìpamọ́ èso, tó bá àkókò gbígbà èso mu.", icon: Wheat, tint: "bg-accent text-accent-foreground" },
      { title: "Kópa nínú àṣẹ ńlá", body: "Darapọ̀ mọ́ àwọn oko míì láti pèsè iye èso tó pọ̀. Iwọ yóò fọwọ́ sí i kí ohunkóhun tó tó di àdéhùn.", icon: Tractor, tint: "bg-sky text-secondary-foreground" },
    ],
    opportunity: "Oníbàárà nílò tọ́ọ̀nù àgbàdo 50.",
    opportunityBody: "HarvestLink ràn ẹgbẹ́ àwọn àgbẹ̀ lọ́wọ́ láti pèsè àṣẹ ńlá kan—pẹ̀lú iye tó ṣe kedere, ìfọwọ́sí àgbẹ̀ àti ètò gbígbà èso.",
    stepLabel: "BÍ Ó ṢE Ń ṢIṢẸ́",
    steps: ["Oníbàárà sọ ohun tó nílò", "Àwọn oko rí iye tí a dábàá", "Àwọn àgbẹ̀ fọwọ́ sí i, wọ́n sì jọ gbèrò"],
    assisted: "O kò ní fóònù tàbí ìkànnì tó dúró ṣinṣin?",
    assistedBody: "Ẹgbẹ́ àgbẹ̀ tàbí aṣojú agbègbè lè ràn ọ́ lọ́wọ́. A ṣe ìsọfúnni pàtàkì fún ibi tí ìkànnì kò ti lágbára.",
    ctaTitle: "Oko rẹ ní àyè nínú ètò ńlá yìí.",
    ctaBody: "Wo àpẹẹrẹ pánẹ́lì àgbẹ̀ fún ìdánwò wa ní Idanre.",
    footer: "Àpẹẹrẹ ìdánwò fún Idanre · Ìsọfúnni àpẹẹrẹ ni, kì í ṣe dátà gidi oko tàbí oníbàárà.",
    language: "English",
  },
} as const;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "HarvestLink | Better harvests, bigger markets" },
      { name: "description", content: "A farmer-first prototype connecting smallholder guidance, post-harvest care and shared market opportunities in Idanre, Ondo State." },
      { property: "og:title", content: "HarvestLink | Better harvests, bigger markets" },
      { property: "og:description", content: "Farmer-first guidance and coordinated market access for smallholders in Idanre, Ondo State." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const [language, setLanguage] = useState<Language>("en");
  const t = copy[language];

  return (
    <main className="overflow-hidden">
      <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8 lg:px-12">
        <a href="#top" className="flex items-center gap-2.5" aria-label="HarvestLink home">
          <span className="grid size-10 place-items-center rounded-full bg-primary text-primary-foreground"><Sprout size={21} /></span>
          <span className="font-display text-2xl font-semibold">HarvestLink</span>
        </a>
        <nav className="hidden items-center gap-8 text-sm font-medium text-muted-foreground md:flex" aria-label="Main navigation">
          <a className="transition-colors hover:text-foreground" href="#how-it-works">{t.nav[0]}</a>
          <a className="transition-colors hover:text-foreground" href="#for-farmers">{t.nav[1]}</a>
          <a className="transition-colors hover:text-foreground" href="#pilot">{t.nav[2]}</a>
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="hidden gap-2 sm:inline-flex" onClick={() => setLanguage(language === "en" ? "yo" : "en")} aria-label={`Switch language to ${t.language}`}>
            <Languages size={16} /> {t.language}
          </Button>
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link to="/dashboard">{t.signIn}<ArrowRight size={16} /></Link>
          </Button>
          <details className="relative sm:hidden">
            <summary className="grid size-10 list-none cursor-pointer place-items-center rounded-md border border-border" aria-label="Open menu"><Menu size={19} /></summary>
            <div className="absolute right-0 top-12 z-20 grid min-w-48 gap-1 border border-border bg-background p-2 shadow-lg">
              <a className="p-2 text-sm" href="#how-it-works">{t.nav[0]}</a>
              <a className="p-2 text-sm" href="#for-farmers">{t.nav[1]}</a>
              <a className="p-2 text-sm" href="#pilot">{t.nav[2]}</a>
              <button className="flex items-center gap-2 p-2 text-left text-sm" onClick={() => setLanguage(language === "en" ? "yo" : "en")}><Languages size={16} /> {t.language}</button>
              <Link className="flex items-center gap-2 p-2 text-sm" to="/dashboard">{t.signIn}<ArrowRight size={16} /></Link>
            </div>
          </details>
        </div>
      </header>

      <section id="top" className="relative isolate mx-auto min-h-[590px] max-w-[1440px] overflow-hidden bg-primary sm:min-h-[650px] lg:min-h-[680px]">
        <img src={farmerImage} alt="Farmer inspecting maize in a green field in Ondo State" width={1536} height={1024} className="absolute inset-0 -z-20 size-full object-cover object-[62%_center]" />
        <div className="hero-field absolute inset-0 -z-10" />
        <div className="mx-auto flex min-h-[590px] max-w-7xl flex-col justify-center px-5 py-16 text-hero-foreground sm:min-h-[650px] sm:px-8 lg:min-h-[680px] lg:px-12">
          <div className="rise-in max-w-2xl">
            <p className="mb-6 flex items-center gap-2 text-xs font-bold tracking-[0.12em]"><span className="size-2 rounded-full bg-harvest" />{t.eyebrow}</p>
            <h1 className="font-display text-5xl font-semibold leading-[1.04] sm:text-6xl lg:text-7xl">{t.title}</h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-hero-foreground/85 sm:text-lg sm:leading-8">{t.intro}</p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button asChild size="lg" className="h-12 bg-harvest px-5 text-foreground shadow-none hover:bg-harvest/90">
                <Link to="/dashboard">{t.start}<ArrowRight size={17} /></Link>
              </Button>
              <a href="#how-it-works" className="inline-flex h-12 items-center gap-2 px-3 text-sm font-semibold text-hero-foreground transition-colors hover:text-harvest">{t.how}<ArrowDownRight size={17} /></a>
            </div>
          </div>
          <div className="mt-14 flex items-end justify-between gap-6 border-t border-hero-foreground/25 pt-5 sm:mt-20">
            <p className="flex items-center gap-2 text-[11px] font-bold tracking-[0.12em]"><span className="size-2 rounded-full bg-harvest" />{t.location}</p>
            <p className="hidden max-w-56 text-right text-xs leading-5 text-hero-foreground/80 sm:block">HarvestLink<br />Connecting farms, people and markets.</p>
          </div>
        </div>
      </section>

      <section id="for-farmers" className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <p className="text-xs font-bold tracking-[0.12em] text-leaf">{t.sectionLabel}</p>
            <h2 className="mt-4 max-w-md font-display text-4xl font-medium leading-tight sm:text-5xl">{t.sectionTitle}</h2>
            <p className="mt-5 max-w-md text-base leading-7 text-muted-foreground">{t.sectionIntro}</p>
            <Link className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline" to="/dashboard">{t.start}<ArrowUpRight size={16} /></Link>
          </div>
          <div className="grid gap-0 sm:grid-cols-3">
            {t.cards.map(({ title, body, icon: Icon, tint }, index) => (
              <article key={title} className="border-t border-border py-6 sm:border-l sm:border-t-0 sm:px-5 sm:first:border-l-0 sm:first:pl-0 sm:last:pr-0">
                <span className={`grid size-11 place-items-center rounded-full ${tint}`}><Icon size={20} /></span>
                <p className="mt-5 text-xs font-semibold text-muted-foreground">0{index + 1}</p>
                <h3 className="mt-2 font-display text-2xl font-medium leading-snug">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="bg-secondary/65">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-12">
          <div className="relative overflow-hidden bg-primary p-7 text-primary-foreground sm:p-10">
            <div className="absolute -right-4 -top-7 rotate-12 text-primary-foreground/10"><Wheat size={170} strokeWidth={0.8} /></div>
            <p className="relative text-xs font-bold tracking-[0.12em] text-harvest">{t.stepLabel}</p>
            <h2 className="relative mt-5 max-w-lg font-display text-4xl font-medium leading-tight">{t.opportunity}</h2>
            <p className="relative mt-4 max-w-lg text-sm leading-7 text-primary-foreground/80">{t.opportunityBody}</p>
            <Link to="/dashboard" className="relative mt-7 inline-flex items-center gap-2 text-sm font-semibold text-harvest">{t.start}<ArrowRight size={16} /></Link>
          </div>
          <div>
            <div className="mb-8 flex items-center gap-3"><span className="grid size-10 place-items-center rounded-full bg-accent text-accent-foreground"><CircleHelp size={19} /></span><p className="text-xs font-bold tracking-[0.12em] text-muted-foreground">{t.stepLabel}</p></div>
            <ol className="grid gap-0">
              {t.steps.map((step, index) => (
                <li key={step} className="flex gap-4 border-t border-border py-5">
                  <span className="font-display text-2xl text-leaf">0{index + 1}</span>
                  <span className="pt-1 text-base font-medium">{step}</span>
                  {index < 2 && <ChevronDown className="ml-auto mt-1 text-muted-foreground" size={18} />}
                  {index === 2 && <Check className="ml-auto mt-1 text-leaf" size={18} />}
                </li>
              ))}
            </ol>
            <div className="mt-5 flex gap-3 border-l-2 border-harvest pl-4">
              <MessageCircle className="mt-1 shrink-0 text-earth" size={18} />
              <div><h3 className="font-semibold">{t.assisted}</h3><p className="mt-1 text-sm leading-6 text-muted-foreground">{t.assistedBody}</p></div>
            </div>
          </div>
        </div>
      </section>

      <section id="pilot" className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
        <div className="flex flex-col justify-between gap-6 border-b border-border pb-9 sm:flex-row sm:items-end">
          <div><p className="text-xs font-bold tracking-[0.12em] text-leaf">{t.location}</p><h2 className="mt-3 font-display text-4xl font-medium">{t.ctaTitle}</h2><p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">{t.ctaBody}</p></div>
          <Button asChild size="lg"><Link to="/dashboard">{t.start}<ArrowRight size={17} /></Link></Button>
        </div>
        <div className="mt-5 flex flex-col gap-3 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span className="inline-flex items-center gap-2"><ShieldCheck size={15} />{t.footer}</span>
          <span className="inline-flex items-center gap-2"><CloudSun size={15} />{t.stats[2]}</span>
        </div>
      </section>
      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
          <span className="font-display text-base font-semibold text-foreground">HarvestLink</span><span>PRI-Solutions · Ondo State, Nigeria</span>
        </div>
      </footer>
    </main>
  );
}
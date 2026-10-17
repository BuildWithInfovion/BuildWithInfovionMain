import React from "react";
import { Helmet } from "react-helmet-async";
import { Check, FileLock2, GitBranch, KeyRound, LifeBuoy, MessageCircle, ShieldCheck, TestTube2 } from "lucide-react";
import { Reveal } from "../../components/fx/Fx";
import { CtaBand, FaqList, PageHero, Section } from "../../components/site/Ui";
import { ENGAGEMENT, PROCESS } from "../../Data/services";
import { SITE, TECH } from "../../Data/company";

const PROMISES = [
  [FileLock2, "NDA first", "A mutual non-disclosure agreement before you share business details."],
  [KeyRound, "You own everything", "Source code, database, domain, cloud and app-store accounts in your name."],
  [MessageCircle, "One named contact", "On WhatsApp, phone and email, with a weekly written update."],
  [GitBranch, "Your code in your repository", "Every change in Git, reviewed before it is merged, with a staging link you can open any time."],
  [TestTube2, "Tested before you see it", "Automated and manual testing each sprint; you approve each release in acceptance testing."],
  [ShieldCheck, "Secure by default", "HTTPS, role-based access, encrypted passwords, audit logs, backups and dependency updates."],
  [LifeBuoy, "30 days of free support", "Bug fixes and small adjustments for 30 days after launch, then an optional maintenance plan."],
];

const FAQ = [
  ["How do payments work?", "For fixed-price projects we usually take an advance and the rest against agreed milestones, with the final payment on acceptance. Dedicated-team and time-and-material work is billed monthly. Every invoice is a proper tax invoice."],
  ["What if requirements change during the project?", "They usually do, and that's fine. Small changes are absorbed within a sprint; larger ones are written up with their cost and time impact, and we only proceed when you approve."],
  ["How will we know the project is on track?", "You get a staging link that always shows the latest working version, a demo every two weeks and a short written update every week, including any risks."],
  ["Do you work with in-house teams?", "Yes. We can work alongside your developers, follow your code standards and tools, and hand over cleanly with documentation."],
  ["What do you need from us to start?", "A person who can make decisions, 30–45 minutes for the discovery call, and access to the process owners we need to talk to. Sample documents, reports or spreadsheets help a lot."],
];

export default function HowWeWork() {
  return (
    <div className="bg-ink">
      <Helmet>
        <title>How We Work — Process, Engagement Models & Guarantees | Infovion Technologies</title>
        <meta name="description" content="Infovion's software delivery process: free discovery, fixed written quote, prototype, two-week sprints, testing, launch and support. Fixed-price, dedicated-team and time-and-material models. You own the code." />
        <link rel="canonical" href={`${SITE}/how-we-work`} />
        <meta property="og:url" content={`${SITE}/how-we-work`} />
      </Helmet>
      <PageHero trail={[["How we work", "/how-we-work"]]} kicker="How we work" title="Predictable projects," accent="from first call to years of support."
        sub="A clear scope, a fixed quote, working software every two weeks and nothing hidden. Here's exactly what working with Infovion looks like." />

      <Section kicker="Process" title="Six steps," accent="every project.">
        <ol className="mt-10 space-y-4">
          {PROCESS.map(([t, b, when], i) => (
            <Reveal as="li" key={t} className="grid gap-4 rounded-3xl border border-white/[0.07] bg-white/[0.02] p-6 sm:grid-cols-[80px_1fr_auto] sm:items-center">
              <span className="font-display text-4xl font-extrabold text-white/15">0{i + 1}</span>
              <div><h3 className="font-display text-lg font-bold text-white">{t}</h3><p className="mt-1 text-[15px] leading-relaxed text-slate-300">{b}</p></div>
              <span className="w-fit rounded-full bg-teal-400/10 px-3 py-1 text-xs font-semibold text-teal-200">{when}</span>
            </Reveal>
          ))}
        </ol>
      </Section>

      <Section kicker="Engagement models" title="Pick the model" accent="that fits your project.">
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {ENGAGEMENT.map(([t, b, pts]) => (
            <div key={t} className="glass h-full rounded-3xl p-7">
              <h3 className="font-display text-xl font-bold text-white">{t}</h3>
              <p className="mt-2 text-sm text-slate-300">{b}</p>
              <ul className="mt-5 space-y-2">{pts.map((p) => <li key={p} className="flex gap-2 text-sm text-slate-200"><Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-teal-300" />{p}</li>)}</ul>
            </div>
          ))}
        </div>
      </Section>

      <Section kicker="Our commitments" title="What every client gets," accent="in writing.">
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PROMISES.map(([I, t, b], i) => (
            <Reveal key={t} delay={(i % 4) * 0.04}>
              <div className="h-full rounded-3xl border border-white/[0.07] bg-white/[0.02] p-6">
                <I className="h-5 w-5 text-teal-300" />
                <h3 className="mt-4 font-display font-bold text-white">{t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{b}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section kicker="Technology" title="Our everyday stack">
        <div className="mt-10 grid gap-3 md:grid-cols-2">
          {TECH.map(([group, items]) => (
            <div key={group} className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">{group}</p>
              <div className="mt-3 flex flex-wrap gap-2">{items.map((t) => <span key={t} className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-200">{t}</span>)}</div>
            </div>
          ))}
        </div>
      </Section>

      <FaqList faqs={FAQ} title="Questions about" accent="working together" />
      <CtaBand />
    </div>
  );
}

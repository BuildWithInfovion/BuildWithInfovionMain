import React from "react";
import { Helmet } from "react-helmet-async";
import { Check } from "lucide-react";
import { Reveal } from "../../components/fx/Fx";
import { CtaBand, FaqList, PageHero, Section } from "../../components/site/Ui";
import { ENGAGEMENT, PROCESS } from "../../Data/services";
import { SITE, TECH } from "../../Data/company";

const COMMITMENTS = [
  ["Confidentiality", "A mutual non-disclosure agreement is signed before any business information is shared."],
  ["Ownership", "Source code, database, domain, cloud and app store accounts are held in the client's name."],
  ["Communication", "A named project lead, reachable by phone, email and WhatsApp, with a written progress update every week."],
  ["Version control", "All work is kept in a Git repository, every change is reviewed before it is merged, and a staging environment is available throughout."],
  ["Quality assurance", "Automated and manual testing in each sprint. Each release is approved by the client through acceptance testing."],
  ["Security", "HTTPS, role-based access, hashed passwords, audit logs, automated backups and regular dependency updates."],
  ["Post-launch support", "Thirty days of fixes and minor adjustments after go-live, followed by an optional maintenance contract."],
];

const FAQ = [
  ["How are payments structured?", "For fixed-price projects we usually invoice an advance, followed by payments against agreed milestones, with the final payment on acceptance. Dedicated team and time and materials engagements are invoiced monthly. All invoices are issued as tax invoices."],
  ["What happens if requirements change during the project?", "Minor changes are accommodated within a sprint. Larger changes are documented with their effect on cost and timeline, and work proceeds only after written approval."],
  ["How do we monitor progress?", "Through a staging environment that always shows the latest working version, a review at the end of every two-week sprint, and a written update each week that includes any risks."],
  ["Do you work alongside in-house teams?", "Yes. We can work with your developers, follow your coding standards and tools, and hand over with complete documentation."],
  ["What do you need from us to begin?", "A decision-maker for the project, thirty to forty-five minutes for the initial consultation, and access to the people who own the processes concerned. Sample documents, reports and spreadsheets are very useful."],
];

export default function HowWeWork() {
  return (
    <>
      <Helmet>
        <title>How We Work | Delivery Process and Engagement Models | Infovion Technologies</title>
        <meta name="description" content="How Infovion Technologies delivers software: discovery, a fixed-price proposal, design, two-week sprints, testing, launch and support after go-live." />
        <link rel="canonical" href={`${SITE}/how-we-work`} />
        <meta property="og:url" content={`${SITE}/how-we-work`} />
      </Helmet>
      <PageHero trail={[["How we work", "/how-we-work"]]} kicker="How we work" title="Our delivery process"
        sub="Every engagement follows the same structure: an agreed scope and price, a reviewed design, working software every two weeks, and support after launch." />

      <Section kicker="Process" title="Six stages of delivery" className="pt-0">
        <ol className="mt-10 border-t border-white/10">
          {PROCESS.map(([t, b, when], i) => (
            <li key={t} className="grid gap-3 border-b border-white/10 py-7 sm:grid-cols-[4rem_1fr_10rem] sm:items-baseline">
              <span className="font-display text-sm font-semibold text-sky-300">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="font-display text-lg font-semibold text-white">{t}</h3>
                <p className="mt-1.5 max-w-2xl text-[15px] leading-relaxed text-slate-300">{b}</p>
              </div>
              <span className="text-sm text-slate-400 sm:text-right">{when}</span>
            </li>
          ))}
        </ol>
      </Section>

      <Section kicker="Engagement models" title="Choosing an engagement model">
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {ENGAGEMENT.map(([t, b, pts], i) => (
            <Reveal key={t} delay={i * 0.05}>
              <div className="panel h-full rounded-xl p-7">
                <h3 className="font-display text-xl font-semibold text-white">{t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">{b}</p>
                <ul className="mt-5 space-y-2">{pts.map((p) => <li key={p} className="flex gap-2.5 text-sm text-slate-200"><Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-sky-300" aria-hidden="true" />{p}</li>)}</ul>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section kicker="Commitments" title="Terms that apply to every engagement">
        <dl className="mt-10 border-t border-white/10">
          {COMMITMENTS.map(([t, b]) => (
            <div key={t} className="grid gap-2 border-b border-white/10 py-5 sm:grid-cols-[14rem_1fr]">
              <dt className="font-display font-semibold text-white">{t}</dt>
              <dd className="text-[15px] leading-relaxed text-slate-300">{b}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section kicker="Technology" title="Technologies we use">
        <dl className="mt-10 border-t border-white/10">
          {TECH.map(([group, items]) => (
            <div key={group} className="grid gap-2 border-b border-white/10 py-4 sm:grid-cols-[14rem_1fr] sm:items-baseline">
              <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">{group}</dt>
              <dd className="text-[15px] text-slate-200">{items.join(", ")}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <FaqList faqs={FAQ} />
      <CtaBand />
    </>
  );
}

// Building blocks shared by the company, service, product and government pages.
import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import {
  Accessibility, ArrowRight, BarChart3, Bot, Boxes, Building2, ChevronRight, Cloud, Code2, Factory, Gem, Globe, GraduationCap, HeartPulse,
  Landmark, Layers, LifeBuoy, MessageCircle, PenTool, Plug, Rocket, ShoppingCart, Smartphone, Store,
} from "lucide-react";
import { Aurora, GhostButton, GlowButton, Kicker, Reveal } from "../fx/Fx";
import { breadcrumbSchema, faqSchema } from "../../lib/seo";
import { wa } from "../../Data/company";

const ICONS = { Code2, Globe, Smartphone, Boxes, Layers, PenTool, ShoppingCart, Bot, Cloud, Plug, BarChart3, LifeBuoy, Landmark, Gem, GraduationCap, Building2, Factory, HeartPulse, Rocket, Store, Accessibility };

export function Icon({ name, className = "h-5 w-5" }) {
  const C = ICONS[name] ?? Code2;
  return <C className={className} aria-hidden="true" />;
}

/** Visible breadcrumb trail + BreadcrumbList structured data. trail = [["Services", "/services"], ["Web development"]] */
export function Breadcrumbs({ trail, className = "" }) {
  const withPaths = trail.map(([name, path]) => [name, path ?? ""]);
  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema(withPaths.filter(([, p]) => p)))}</script>
      </Helmet>
      <nav aria-label="Breadcrumb" className={className}>
        <ol className="flex flex-wrap items-center gap-1 text-xs text-slate-400">
          <li><Link to="/" className="hover:text-teal-300">Home</Link></li>
          {trail.map(([name, path], i) => (
            <li key={name} className="flex items-center gap-1">
              <ChevronRight className="h-3 w-3 text-slate-600" aria-hidden="true" />
              {path && i < trail.length - 1 ? <Link to={path} className="hover:text-teal-300">{name}</Link> : <span aria-current="page" className="text-slate-300">{name}</span>}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}

/** The standard top of an inner page. */
export function PageHero({ trail, kicker, title, accent, sub, children, center = false, aside }) {
  return (
    <section className="noise relative overflow-hidden pb-16 pt-32 sm:pt-40">
      <Aurora strong />
      <div className={`relative mx-auto max-w-6xl px-5 sm:px-6 ${aside ? "grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]" : ""}`}>
        <div className={center ? "mx-auto max-w-4xl text-center" : "max-w-3xl"}>
          {trail && <Breadcrumbs trail={trail} className={`mb-6 ${center ? "flex justify-center" : ""}`} />}
          {kicker && <div className="rise"><Kicker>{kicker}</Kicker></div>}
          <h1 className="rise mt-6 font-display text-[2.4rem] font-extrabold leading-[1.04] tracking-tight text-white sm:text-6xl">
            {title} {accent && <span className="text-gradient-aurora">{accent}</span>}
          </h1>
          {sub && <p className={`rise mt-6 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg ${center ? "mx-auto" : ""}`}>{sub}</p>}
          {children && <div className={`rise mt-9 flex flex-col gap-3 sm:flex-row ${center ? "items-center justify-center" : ""}`}>{children}</div>}
        </div>
        {aside && <div className="rise relative">{aside}</div>}
      </div>
    </section>
  );
}

/** Question-and-answer list (native <details>, readable without JavaScript) + FAQPage structured data. */
export function FaqList({ faqs, title = "Questions we're asked", accent = "", schema = true }) {
  return (
    <section className="relative py-20" aria-labelledby="faq-heading">
      {schema && (
        <Helmet>
          <script type="application/ld+json">{JSON.stringify(faqSchema(faqs))}</script>
        </Helmet>
      )}
      <div className="mx-auto max-w-3xl px-5 sm:px-6">
        <Reveal className="text-center">
          <Kicker>FAQ</Kicker>
          <h2 id="faq-heading" className="mt-5 font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            {title} {accent && <span className="text-gradient-aurora">{accent}</span>}
          </h2>
        </Reveal>
        <div className="mt-10 space-y-3">
          {faqs.map(([q, a], i) => (
            <details key={q} open={i === 0} className="group rounded-2xl border border-white/[0.08] bg-white/[0.02] px-6 py-1 transition-colors open:border-teal-400/30 open:bg-white/[0.04] [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 font-display text-[16px] font-bold text-white">
                <h3 className="text-left">{q}</h3>
                <span className="text-xl leading-none text-teal-300 transition-transform group-open:rotate-45" aria-hidden="true">+</span>
              </summary>
              <p className="pb-5 text-[15px] leading-relaxed text-slate-300">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Closing call to action. */
export function CtaBand({ title = "Have a project in mind?", accent = "Let's talk.", sub = "Tell us what you want to build. You'll get a clear plan and a fixed quote — usually within 48 hours of the first call.", primary = ["Get a free quote", "/contact"], whatsappText = "Hi Infovion! I'd like to discuss a software project." }) {
  return (
    <section className="px-5 pb-24 pt-8 sm:px-6">
      <div className="noise relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] border border-white/10 px-6 py-16 text-center sm:px-16 sm:py-20">
        <Aurora strong />
        <div className="relative">
          <h2 className="mx-auto max-w-3xl font-display text-3xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl">
            {title} <span className="text-gradient-aurora">{accent}</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-slate-300">{sub}</p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <GlowButton to={primary[1]} className="w-full sm:w-auto">{primary[0]} <ArrowRight className="h-4 w-4" /></GlowButton>
            <GhostButton href={wa(whatsappText)} className="w-full sm:w-auto"><MessageCircle className="h-4 w-4" /> Chat on WhatsApp</GhostButton>
          </div>
        </div>
      </div>
    </section>
  );
}

/** A section with the usual heading. */
export function Section({ id, kicker, title, accent, sub, children, className = "", center = false }) {
  return (
    <section id={id} className={`relative scroll-mt-24 py-20 ${className}`}>
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        {(kicker || title) && (
          <Reveal className={`max-w-3xl ${center ? "mx-auto text-center" : ""}`}>
            {kicker && <Kicker>{kicker}</Kicker>}
            {title && (
              <h2 className="mt-5 font-display text-3xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-[2.75rem]">
                {title} {accent && <span className="text-gradient-aurora">{accent}</span>}
              </h2>
            )}
            {sub && <p className={`mt-5 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg ${center ? "mx-auto" : ""}`}>{sub}</p>}
          </Reveal>
        )}
        {children}
      </div>
    </section>
  );
}

/** Card linking somewhere, with an icon. */
export function LinkCard({ to, icon, title, body, cta = "Learn more", className = "" }) {
  return (
    <Link to={to} className={`group relative flex h-full flex-col rounded-3xl border border-white/[0.07] bg-gradient-to-b from-white/[0.05] to-white/[0.01] p-5 sm:p-6 transition-colors hover:border-teal-400/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-300 ${className}`}>
      {icon && <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-teal-400/10 text-teal-300 ring-1 ring-teal-400/20"><Icon name={icon} /></span>}
      <h3 className="mt-4 font-display text-lg font-bold text-white sm:mt-5">{title}</h3>
      <p className="mt-1.5 flex-1 text-sm leading-relaxed text-slate-400 sm:mt-2">{body}</p>
      <span className="mt-3 inline-flex sm:mt-5 items-center gap-1.5 text-sm font-semibold text-teal-300">{cta} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
    </Link>
  );
}

/** A short, quotable answer box — written so search engines and AI assistants can lift it as-is. */
export function AnswerBox({ q, children }) {
  return (
    <div className="rounded-3xl border border-teal-400/20 bg-teal-400/[0.04] p-6 sm:p-8">
      <h2 className="font-display text-lg font-bold text-white sm:text-xl">{q}</h2>
      <p className="mt-3 text-[15px] leading-relaxed text-slate-300 sm:text-base">{children}</p>
    </div>
  );
}

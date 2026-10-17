// Building blocks shared by the company, service, product and government pages.
import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import {
  Accessibility, ArrowRight, ArrowUpRight, BarChart3, Bot, Boxes, Building2, ChevronRight, Cloud, Code2, Factory, Gem, Globe, GraduationCap,
  HeartPulse, Landmark, Layers, LifeBuoy, MessageCircle, PenTool, Plug, Rocket, ShoppingCart, Smartphone, Store,
} from "lucide-react";
import { GhostButton, GlowButton, Kicker, Reveal } from "../fx/Fx";
import { breadcrumbSchema, faqSchema } from "../../lib/seo";
import { wa } from "../../Data/company";

const ICONS = { Code2, Globe, Smartphone, Boxes, Layers, PenTool, ShoppingCart, Bot, Cloud, Plug, BarChart3, LifeBuoy, Landmark, Gem, GraduationCap, Building2, Factory, HeartPulse, Rocket, Store, Accessibility };

export function Icon({ name, className = "h-5 w-5" }) {
  const C = ICONS[name] ?? Code2;
  return <C className={className} aria-hidden="true" strokeWidth={1.6} />;
}

/** Visible breadcrumb trail + BreadcrumbList structured data. trail = [["Services", "/services"], ["Web development", "/services/web-development"]] */
export function Breadcrumbs({ trail, className = "" }) {
  const withPaths = trail.map(([name, path]) => [name, path ?? ""]);
  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema(withPaths.filter(([, p]) => p)))}</script>
      </Helmet>
      <nav aria-label="Breadcrumb" className={className}>
        <ol className="flex flex-wrap items-center gap-1 text-xs text-slate-400">
          <li><Link to="/" className="hover:text-white">Home</Link></li>
          {trail.map(([name, path], i) => (
            <li key={name} className="flex items-center gap-1">
              <ChevronRight className="h-3 w-3 text-slate-600" aria-hidden="true" />
              {path && i < trail.length - 1 ? <Link to={path} className="hover:text-white">{name}</Link> : <span aria-current="page" className="text-slate-300">{name}</span>}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}

/** The top of an inner page: label, title, introduction, actions. */
export function PageHero({ trail, kicker, title, accent, sub, children, center = false, aside }) {
  return (
    <section className="relative pb-16 pt-32 sm:pb-20 sm:pt-40">
      <div className={`relative mx-auto max-w-6xl px-5 sm:px-6 ${aside ? "grid items-center gap-12 lg:grid-cols-[1.05fr_1fr]" : ""}`}>
        <div className={center ? "mx-auto max-w-4xl text-center" : "max-w-3xl"}>
          {trail && <Breadcrumbs trail={trail} className={`mb-8 ${center ? "flex justify-center" : ""}`} />}
          {kicker && <div className="rise"><Kicker>{kicker}</Kicker></div>}
          <h1 className="rise mt-5 font-display text-[2.2rem] font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-[3.4rem]">
            {title}{accent ? <> <span className="text-gradient-aurora">{accent}</span></> : null}
          </h1>
          {sub && <p className={`rise mt-6 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg ${center ? "mx-auto" : ""}`}>{sub}</p>}
          {children && <div className={`rise mt-9 flex flex-col gap-3 sm:flex-row ${center ? "items-center justify-center" : ""}`}>{children}</div>}
        </div>
        {aside && <div className="rise relative">{aside}</div>}
      </div>
    </section>
  );
}

/** A section with an optional label, title and introduction. */
export function Section({ id, kicker, title, accent, sub, children, className = "", center = false }) {
  return (
    <section id={id} className={`relative scroll-mt-24 py-16 sm:py-20 ${className}`}>
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        {(kicker || title) && (
          <Reveal className={`max-w-3xl ${center ? "mx-auto text-center" : ""}`}>
            {kicker && <Kicker>{kicker}</Kicker>}
            {title && (
              <h2 className="mt-4 font-display text-[1.9rem] font-bold leading-[1.15] tracking-tight text-white sm:text-[2.4rem]">
                {title}{accent ? <> <span className="text-gradient-aurora">{accent}</span></> : null}
              </h2>
            )}
            {sub && <p className={`mt-4 max-w-2xl text-base leading-relaxed text-slate-300 ${center ? "mx-auto" : ""}`}>{sub}</p>}
          </Reveal>
        )}
        {children}
      </div>
    </section>
  );
}

/** Card linking somewhere. */
export function LinkCard({ to, icon, title, body, cta = "Learn more", className = "" }) {
  return (
    <Link to={to} className={`panel group relative flex h-full flex-col rounded-xl p-6 transition-colors hover:border-sky-300/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-300 ${className}`}>
      {icon && <Icon name={icon} className="h-6 w-6 text-sky-300" />}
      <h3 className="mt-4 font-display text-lg font-semibold text-white">{title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">{body}</p>
      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-sky-300">{cta} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
    </Link>
  );
}

/** A list row linking somewhere: title, one line, arrow. Used for service and page directories. */
export function LinkRow({ to, icon, title, body }) {
  return (
    <Link to={to} className="group flex items-start gap-5 border-b border-white/10 py-6 transition-colors hover:bg-white/[0.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-300">
      {icon && <Icon name={icon} className="mt-1 h-6 w-6 flex-shrink-0 text-sky-300" />}
      <span className="flex-1">
        <span className="block font-display text-lg font-semibold text-white group-hover:text-sky-200">{title}</span>
        <span className="mt-1 block text-sm leading-relaxed text-slate-400">{body}</span>
      </span>
      <ArrowUpRight className="mt-1 h-5 w-5 flex-shrink-0 text-slate-500 transition-colors group-hover:text-sky-300" aria-hidden="true" />
    </Link>
  );
}

/** Question-and-answer list (native <details>, readable without JavaScript) + FAQPage structured data. */
export function FaqList({ faqs, title = "Frequently asked questions", accent = "", schema = true }) {
  return (
    <section className="relative py-16 sm:py-20" aria-labelledby="faq-heading">
      {schema && (
        <Helmet>
          <script type="application/ld+json">{JSON.stringify(faqSchema(faqs))}</script>
        </Helmet>
      )}
      <div className="mx-auto grid max-w-6xl gap-10 px-5 sm:px-6 lg:grid-cols-[0.8fr_1.6fr]">
        <Reveal>
          <Kicker>FAQ</Kicker>
          <h2 id="faq-heading" className="mt-4 font-display text-[1.9rem] font-bold leading-[1.15] tracking-tight text-white sm:text-[2.2rem]">
            {title}{accent ? <> <span className="text-gradient-aurora">{accent}</span></> : null}
          </h2>
        </Reveal>
        <div className="border-t border-white/10">
          {faqs.map(([q, a], i) => (
            <details key={q} open={i === 0} className="group border-b border-white/10 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-white">
                <h3 className="text-left font-display text-base font-semibold sm:text-[17px]">{q}</h3>
                <span className="mt-0.5 text-lg leading-none text-sky-300 transition-transform group-open:rotate-45" aria-hidden="true">+</span>
              </summary>
              <p className="pb-6 pr-8 text-[15px] leading-relaxed text-slate-300">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Closing call to action. */
export function CtaBand({
  title = "Discuss your requirements with us",
  accent = "",
  sub = "Share a brief description of your project. We respond within one business day with questions, an approach and a fixed-price proposal where the scope allows.",
  primary = ["Contact us", "/contact"],
  whatsappText = "Hello Infovion, I would like to discuss a software project.",
}) {
  return (
    <section className="px-5 pb-24 pt-10 sm:px-6">
      <div className="panel mx-auto flex max-w-6xl flex-col gap-8 rounded-2xl px-6 py-12 sm:px-12 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <h2 className="font-display text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl">
            {title}{accent ? <> <span className="text-gradient-aurora">{accent}</span></> : null}
          </h2>
          <p className="mt-3 text-slate-300">{sub}</p>
        </div>
        <div className="flex flex-shrink-0 flex-col gap-3 sm:flex-row">
          <GlowButton to={primary[1]}>{primary[0]} <ArrowRight className="h-4 w-4" /></GlowButton>
          <GhostButton href={wa(whatsappText)}><MessageCircle className="h-4 w-4" /> WhatsApp</GhostButton>
        </div>
      </div>
    </section>
  );
}

/** A short summary written to be quoted as-is by search engines and AI assistants. */
export function AnswerBox({ q, children }) {
  return (
    <div className="border-l-2 border-sky-300/60 pl-6">
      <h2 className="font-display text-lg font-semibold text-white sm:text-xl">{q}</h2>
      <p className="mt-3 max-w-4xl text-[15px] leading-relaxed text-slate-300 sm:text-base">{children}</p>
    </div>
  );
}

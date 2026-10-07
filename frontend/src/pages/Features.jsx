import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import {
  ArrowRight, Bus, CalendarCheck, CalendarDays, ClipboardList, FileBadge2, FileBarChart, GraduationCap, History, IndianRupee,
  Megaphone, ShieldCheck, Smartphone, UserCog, Users, Wallet,
} from "lucide-react";
import { Aurora, GhostButton, GlowButton, Kicker, Marquee, Reveal, SectionHead, SpotlightCard } from "../components/fx/Fx";
import FeatureFilms from "../components/product/FeatureFilms";

const MODULES = [
  { icon: ClipboardList, title: "Admissions & inquiries", points: ["Inquiry pipeline from first call to admission", "Admission form with all demographic fields", "Automatic admission and roll numbers", "Students, parents and staff imported from Excel"] },
  { icon: IndianRupee, title: "Fees & receipts", points: ["Fee plans by class with instalments", "Concessions: sibling, scholarship, staff ward", "Cash, UPI, cheque, DD, NEFT — receipt in seconds", "Defaulters, daily collection and opening balances"], link: ["/fee-management-software-for-schools", "Fee management"] },
  { icon: Wallet, title: "Online fee payments", points: ["Parents pay by UPI, card or net banking", "Money goes to the school's own Razorpay account", "Receipt created automatically", "Switch on or off any time"] },
  { icon: CalendarCheck, title: "Attendance", points: ["Teachers mark on any phone in a few taps", "Live progress for the office and principal", "Monthly registers and below-75% lists", "Staff attendance and leave"], link: ["/school-attendance-app", "Attendance app"] },
  { icon: FileBarChart, title: "Exams & report cards", points: ["Exams with subjects and maximum marks", "Marks entry by subject and class", "Report cards on the school letterhead", "Results visible to parents"] },
  { icon: FileBadge2, title: "Certificates", points: ["TC / Leaving Certificate in English, Marathi or Hindi formats", "Parent requests → principal approves → office issues", "Bonafide and character certificates", "ID cards, a whole class at a time"], link: ["/free-tools", "Free certificate tools"] },
  { icon: Bus, title: "School transport", points: ["Routes, stops, timings and per-stop fares", "Transport fees billed monthly in the ledger", "Bus attendance and live bus location", "Vehicle and driver documents with reminders"], link: ["/school-transport-management-software", "School transport"] },
  { icon: CalendarDays, title: "Timetable & calendar", points: ["Weekly timetable by class", "Substitute covers when a teacher is absent", "School calendar: holidays, exams, events", "Announcements to every portal"] },
  { icon: UserCog, title: "Staff & salary", points: ["Staff records and roles", "Staff attendance and leave requests", "Salary structures", "Monthly salary slips"] },
  { icon: Users, title: "Parent portal", points: ["Attendance, fees, receipts and results", "School bus and announcements", "Apply for a TC online", "Message the class teacher"] },
  { icon: GraduationCap, title: "Principal & director", points: ["Today's attendance and collections at a glance", "Who hasn't marked attendance", "TC and leave requests to approve", "Year-end promotion of whole classes"] },
  { icon: ShieldCheck, title: "Security & privacy", points: ["8 role-based portals", "Each school's data kept separate", "Every change in the audit log", "Optional two-step sign-in"] },
];

const CHIPS = ["CBSE", "ICSE", "State Board", "Marathi medium", "Hindi medium", "English medium", "Nursery to Class 12", "Works on any phone", "No installation", "DPDP-ready", "MSME registered"];

export default function Features() {
  return (
    <div className="bg-ink">
      <Helmet>
        <title>School Management Software Features — Fees, Attendance, Exams, Transport, Certificates | Infovion</title>
        <meta name="description" content="Every Infovion module: admissions, fees and receipts, online payments, attendance, exams and report cards, TC/LC certificates, transport, timetable, staff and salary, parent portal and 8 role-based portals." />
        <link rel="canonical" href="https://infovion.in/features" />
      </Helmet>

      <section className="noise relative overflow-hidden pb-16 pt-32 sm:pt-40">
        <Aurora strong />
        <div className="relative mx-auto max-w-6xl px-5 text-center sm:px-6">
          <Kicker>Everything your school runs on</Kicker>
          <h1 className="mx-auto mt-6 max-w-4xl font-display text-4xl font-extrabold leading-[1.03] tracking-tight text-white sm:text-6xl">
            Every school operation, <span className="text-gradient-aurora">in one platform.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400">
            From the first inquiry to the final report card — admissions, fees, attendance, exams, certificates, transport and staff, with a portal for every role. Every module is included.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <GlowButton to="/free-trial" className="w-full sm:w-auto">Start your free trial <ArrowRight className="h-4 w-4" /></GlowButton>
            <GhostButton href="#films" className="w-full sm:w-auto">Watch the features</GhostButton>
          </div>
          <div className="mt-14"><Marquee items={CHIPS} /></div>
        </div>
      </section>

      <section className="relative py-16">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <SectionHead kicker="All modules" title="Twelve modules." accent="One price, all included." />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {MODULES.map((m, i) => {
              const Icon = m.icon;
              return (
                <Reveal key={m.title} delay={(i % 3) * 0.05}>
                  <SpotlightCard className="h-full rounded-3xl border border-white/[0.07] bg-gradient-to-b from-white/[0.05] to-white/[0.01] p-7 transition-colors hover:border-teal-400/30">
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-teal-400/10 text-teal-300 ring-1 ring-teal-400/20"><Icon className="h-5 w-5" /></span>
                    <h2 className="mt-5 font-display text-lg font-bold text-white">{m.title}</h2>
                    <ul className="mt-3 space-y-2">
                      {m.points.map((pt) => (
                        <li key={pt} className="flex gap-2 text-sm leading-relaxed text-slate-400"><span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-teal-300" />{pt}</li>
                      ))}
                    </ul>
                    {m.link && <Link to={m.link[0]} className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-teal-300 hover:text-teal-200">{m.link[1]} <ArrowRight className="h-3.5 w-3.5" /></Link>}
                  </SpotlightCard>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section id="films" className="relative scroll-mt-20 overflow-hidden py-24">
        <Aurora />
        <div className="relative mx-auto max-w-6xl px-5 sm:px-6">
          <SectionHead kicker="See them work" title="Every feature," accent="its own short film." sub="Real screens with voice-over and captions. Turn the sound on." />
          <Reveal className="mt-12"><FeatureFilms /></Reveal>
        </div>
      </section>

      <section className="relative py-20">
        <div className="mx-auto grid max-w-6xl gap-4 px-5 sm:px-6 md:grid-cols-3">
          {[
            [Smartphone, "Works on any phone", "No app to install for staff or parents — it runs in the browser and can be added to the home screen."],
            [History, "Bring your history", "Students and parents from Excel, and fees already paid carried over as opening balances."],
            [ShieldCheck, "Your data stays yours", "Each school's data is separate, every change is logged, and we sign a DPDP Data Processing Agreement."],
          ].map((row, i) => {
            const [Icon, t, b] = row;
            return (
              <Reveal key={t} delay={i * 0.06}>
                <div className="glass h-full rounded-3xl p-7">
                  <Icon className="h-5 w-5 text-teal-300" />
                  <h3 className="mt-4 font-display text-lg font-bold text-white">{t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{b}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="px-5 pb-28 sm:px-6">
        <div className="noise relative mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] border border-white/10 px-6 py-16 text-center">
          <Aurora strong />
          <div className="relative">
            <Megaphone className="mx-auto h-7 w-7 text-teal-300" />
            <h2 className="mx-auto mt-5 max-w-2xl font-display text-3xl font-extrabold tracking-tight text-white sm:text-5xl">Try every module <span className="text-gradient-aurora">free for 30 days.</span></h2>
            <p className="mx-auto mt-4 max-w-xl text-slate-400">Your own trial school opens with sample data in two minutes. ₹150 per student per year after — everything included.</p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <GlowButton to="/free-trial">Start your free trial <ArrowRight className="h-4 w-4" /></GlowButton>
              <GhostButton to="/pricing">See pricing</GhostButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

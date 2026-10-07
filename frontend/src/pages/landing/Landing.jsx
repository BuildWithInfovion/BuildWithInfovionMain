import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight, Check, ChevronDown } from "lucide-react";
import { Aurora, GhostButton, GlowButton, Kicker, Reveal, SectionHead, SpotlightCard } from "../../components/fx/Fx";
import { PhoneFrame, LoopVideo } from "../../components/product/Frames";

/** Search-intent landing page: one problem, how Infovion solves it, proof, FAQ, trial. */
function Landing({ c }) {
  const [open, setOpen] = useState(0);
  const url = `https://infovion.in/${c.slug}`;
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: c.faq.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
  };
  return (
    <div className="bg-ink">
      <Helmet>
        <title>{c.title}</title>
        <meta name="description" content={c.description} />
        <link rel="canonical" href={url} />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <section className="noise relative overflow-hidden pb-20 pt-32 sm:pt-40">
        <Aurora strong />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 sm:px-6 lg:grid-cols-[1.05fr_1fr]">
          <div>
            <Kicker>{c.kicker}</Kicker>
            <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.04] tracking-tight text-white sm:text-[3.4rem]">
              {c.h1} <span className="text-gradient-aurora">{c.h1Accent}</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-400">{c.intro}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <GlowButton to="/free-trial" className="w-full sm:w-auto">Start your free trial <ArrowRight className="h-4 w-4" /></GlowButton>
              <GhostButton to="/contact" className="w-full sm:w-auto">Book a live demo</GhostButton>
            </div>
            <p className="mt-4 text-xs text-slate-500">30 days free · no card · ₹150 per student per year after</p>
          </div>
          <Reveal>
            {c.phone ? (
              <div className="mx-auto w-[62%] max-w-[300px]">
                <PhoneFrame><LoopVideo src="/product/parent-app.mp4" poster="/product/parent-app-poster.webp" label="The parent portal on a phone" /></PhoneFrame>
              </div>
            ) : (
              <div className="overflow-hidden rounded-3xl ring-1 ring-white/10 shadow-[0_50px_140px_-50px_rgba(45,212,191,0.55)]">
                <LoopVideo src={`/film/${c.clip}.mp4`} poster={`/film/${c.clip}.webp`} label={c.clipLabel} className="aspect-video" />
              </div>
            )}
          </Reveal>
        </div>
      </section>

      <section className="relative py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <SectionHead kicker="The problem" title={c.problemTitle} />
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {c.problems.map(([t, b], i) => (
              <Reveal key={t} delay={i * 0.05}>
                <div className="h-full rounded-3xl border border-rose-400/15 bg-rose-400/[0.03] p-6">
                  <h3 className="font-display font-bold text-white">{t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{b}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <SectionHead kicker="With Infovion" title={c.solutionTitle} accent={c.solutionAccent} />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {c.features.map(([t, b], i) => (
              <Reveal key={t} delay={i * 0.04}>
                <SpotlightCard className="h-full rounded-3xl border border-white/[0.07] bg-white/[0.02] p-6">
                  <Check className="h-5 w-5 text-teal-300" />
                  <h3 className="mt-4 font-display font-bold text-white">{t}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{b}</p>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {c.extra}

      <section className="relative py-20">
        <div className="mx-auto max-w-3xl px-5 sm:px-6">
          <SectionHead center kicker="Questions" title="Frequently asked" />
          <div className="mt-10 space-y-3">
            {c.faq.map(([q, a], i) => (
              <div key={q} className={`rounded-2xl border ${open === i ? "border-teal-400/30 bg-white/[0.04]" : "border-white/[0.07]"}`}>
                <button type="button" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i} className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left">
                  <span className="font-semibold text-white">{q}</span>
                  <ChevronDown className={`h-5 w-5 flex-shrink-0 text-teal-300 transition-transform ${open === i ? "rotate-180" : ""}`} />
                </button>
                {open === i && <p className="px-5 pb-5 text-[15px] leading-relaxed text-slate-400">{a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-28 sm:px-6">
        <div className="noise relative mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] border border-white/10 px-6 py-16 text-center">
          <Aurora strong />
          <div className="relative">
            <h2 className="mx-auto max-w-2xl font-display text-3xl font-extrabold tracking-tight text-white sm:text-5xl">{c.ctaTitle}</h2>
            <p className="mx-auto mt-4 max-w-xl text-slate-400">Your own trial school opens with sample data in two minutes. No card, no contract.</p>
            <div className="mt-8 flex justify-center"><GlowButton to="/free-trial">Start your free trial <ArrowRight className="h-4 w-4" /></GlowButton></div>
            <p className="mt-6 text-sm text-slate-500">
              Related: {c.related.map(([to, t], i) => (<span key={to}>{i > 0 && " · "}<Link to={to} className="text-teal-300 hover:underline">{t}</Link></span>))}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

const MarathiBlock = (
  <section className="relative py-20">
    <div className="mx-auto max-w-4xl px-5 sm:px-6">
      <div className="glass rounded-3xl p-8" lang="mr">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-300">मराठीत</p>
        <h2 className="mt-3 font-display text-2xl font-extrabold text-white sm:text-3xl">महाराष्ट्रातील शाळांसाठी शाळा व्यवस्थापन सॉफ्टवेअर</h2>
        <p className="mt-4 leading-relaxed text-slate-300">
          इन्फोव्हियनमध्ये प्रवेश, फी वसुली व पावती, हजेरी, परीक्षा व निकालपत्रक, शाळा सोडल्याचा दाखला, बोनाफाईड, ओळखपत्र, स्कूल बस
          आणि पालकांसाठी पोर्टल — सगळं एकाच ठिकाणी. शाळा सोडल्याचा दाखला मराठी किंवा मराठी + इंग्रजीमध्ये, जनरल रजिस्टर क्रमांकासह,
          जन्मतारीख अक्षरी आपोआप लिहिली जाते. जुन्या रजिस्टर किंवा Excel मधील माहिती सहज आणता येते, आणि आधी भरलेली फी ओपनिंग बॅलन्स म्हणून नोंदवता येते.
        </p>
        <p className="mt-4 leading-relaxed text-slate-300">
          किंमत: प्रति विद्यार्थी वर्षाला ₹150 (+ GST), सर्व मॉड्यूल्ससह. 30 दिवसांची मोफत ट्रायल — कार्डची गरज नाही.
        </p>
        <div className="mt-6"><GlowButton to="/free-trial">मोफत ट्रायल सुरू करा <ArrowRight className="h-4 w-4" /></GlowButton></div>
      </div>
    </div>
  </section>
);

const PAGES = {
  maharashtra: {
    slug: "school-management-software-maharashtra",
    title: "School Management Software for Maharashtra Schools (Marathi LC, State Board) | Infovion",
    description: "School ERP built for Maharashtra: Marathi school leaving certificate with G.R. No., State Board & Marathi-medium ready, fees and receipts, attendance, parent portal. ₹150/student/year. Free 30-day trial.",
    kicker: "Made in Pune, for Maharashtra",
    h1: "School management software for",
    h1Accent: "Maharashtra schools.",
    intro: "State Board and CBSE, Marathi and English medium — Infovion speaks the way Maharashtra school offices work: General Register numbers, शाळा सोडल्याचा दाखला in Marathi, fee instalments, and parents kept in the loop through their own portal.",
    clip: "documents",
    clipLabel: "Certificates in Infovion",
    problemTitle: "What slows a Maharashtra school office down",
    problems: [
      ["Handwritten LCs", "Every leaving certificate copied by hand from the General Register — date of birth in words, caste, mother tongue, all of it."],
      ["Fee registers & receipt books", "Instalments, concessions and dues tracked across books; reconciling the day's collection takes hours."],
      ["Parents in the dark", "Attendance, results and dues reach parents late, through calls and notes."],
    ],
    solutionTitle: "Everything a school office needs,",
    solutionAccent: "in one place.",
    features: [
      ["Marathi Leaving Certificate", "शाळा सोडल्याचा दाखला with G.R. No., mother tongue, sub-caste, place of birth and progress — in Marathi or Marathi + English, one page."],
      ["State Board & Marathi medium", "Classes from nursery to Class 12, State Board or CBSE, any medium. Hindi TC format too."],
      ["Fees & receipts", "Fee plans with instalments, concessions, receipts by cash, UPI or cheque, defaulter lists and daily collection reports."],
      ["Old records come along", "Students and parents from Excel; fees already paid in the old ledger become opening balances."],
      ["Attendance on phones", "Class teachers mark attendance in seconds; the office and principal see it live."],
      ["Parent portal", "Parents see attendance, fees, receipts, results and the school bus — on any phone, no app to install."],
    ],
    extra: MarathiBlock,
    faq: [
      ["Does Infovion support the Maharashtra school leaving certificate?", "Yes. The LC (शाळा सोडल्याचा दाखला) follows the Maharashtra format with the General Register number and is printed in Marathi or Marathi + English, on one page. You can also try our free LC generator."],
      ["Is it suitable for State Board and Marathi-medium schools?", "Yes. Infovion works for State Board, CBSE and ICSE schools, in Marathi, English or semi-English medium."],
      ["How much does it cost?", "₹150 per student per year plus GST, with every module included. There is a 30-day free trial."],
      ["Can we bring our existing data?", "Yes — students, parents and staff from Excel, and fees already paid as opening balances, so nobody is asked to pay twice."],
    ],
    ctaTitle: "Run your Maharashtra school on Infovion.",
    related: [["/free-tools/school-leaving-certificate-marathi", "Free Marathi LC generator"], ["/fee-management-software-for-schools", "Fee management"], ["/pricing", "Pricing"]],
  },
  fees: {
    slug: "fee-management-software-for-schools",
    title: "School Fee Management Software — Instalments, Receipts, Defaulters, UPI | Infovion",
    description: "Fee management software for Indian schools: fee plans with instalments, concessions, instant receipts, defaulter lists, daily collection reports and UPI payments to the school's own account. Free 30-day trial.",
    kicker: "Fee management",
    h1: "School fee management,",
    h1Accent: "without the ledger.",
    intro: "Fee plans by class, instalments, concessions, receipts in seconds, and a defaulter list that's always up to date — plus online payments straight into the school's own account.",
    clip: "fees",
    clipLabel: "Fee collection in Infovion",
    problemTitle: "Why fees take so much of the office's time",
    problems: [
      ["Reconciling every evening", "Receipt books, cash and bank entries checked line by line at the end of the day."],
      ["Who still owes what?", "Dues by student, instalment and class are spread across registers — the defaulter list is always out of date."],
      ["Concessions & mistakes", "Sibling discounts, scholarships and part payments make manual totals error-prone."],
    ],
    solutionTitle: "Collect fees in seconds,",
    solutionAccent: "know your dues instantly.",
    features: [
      ["Fee plans & instalments", "Term-wise or monthly instalments per class, with due dates."],
      ["Concessions", "Sibling discounts, scholarships and staff-ward concessions applied per student."],
      ["Instant receipts", "Tick what the parent pays — cash, UPI, cheque, DD or NEFT — and the receipt prints."],
      ["Defaulters & reports", "Live defaulter list, daily collection report and class-wise dues."],
      ["Online payments", "Parents pay by UPI, card or net banking into the school's own Razorpay account; the receipt appears automatically."],
      ["Opening balances", "Fees paid before you switched are carried over, so no parent is asked to pay twice."],
    ],
    faq: [
      ["Can parents pay school fees online?", "Yes. Payments go straight to the school's own Razorpay account — Infovion never holds the money — and the receipt is created automatically. The school can switch online payments on or off any time."],
      ["Does it handle transport and other fees?", "Yes — tuition, development, exam and transport fees, each with its own instalments and receipts, including transport run by a separate operator."],
      ["Can we see who hasn't paid?", "The defaulter list is always live, by class and by instalment, with the outstanding amount for each student."],
      ["How much does it cost?", "₹150 per student per year plus GST, everything included. 30-day free trial."],
    ],
    ctaTitle: "Collect fees the easy way.",
    related: [["/school-attendance-app", "Attendance app"], ["/school-management-software-maharashtra", "For Maharashtra schools"], ["/pricing", "Pricing"]],
  },
  attendance: {
    slug: "school-attendance-app",
    title: "School Attendance App for Teachers & Parents — Mark in Seconds | Infovion",
    description: "School attendance app: teachers mark class attendance on their phone in seconds, the office sees progress live, parents see their child's attendance, monthly registers and below-75% lists in one click.",
    kicker: "Attendance",
    h1: "The school attendance app",
    h1Accent: "teachers actually use.",
    intro: "Teachers mark their class on any phone in a few taps. The office sees which classes are done, the principal sees today's numbers, and parents see their own child's attendance — the same day.",
    clip: "attendance",
    clipLabel: "Attendance in Infovion",
    problemTitle: "The trouble with paper registers",
    problems: [
      ["Monthly totals by hand", "Counting presents and absents for every student at the end of the month."],
      ["No live picture", "The office can't tell which classes have marked attendance until someone walks around."],
      ["Parents find out late", "Absences reach parents days later, if at all."],
    ],
    solutionTitle: "Attendance done in a minute,",
    solutionAccent: "visible to everyone who needs it.",
    features: [
      ["One tap per student", "Present, absent, late or leave — on any phone, no app to install."],
      ["Only their classes", "Each teacher sees only the classes they teach, so data stays clean and private."],
      ["Live progress", "The office and principal see which classes have marked attendance today."],
      ["Monthly registers", "Monthly and day-by-day reports, generated automatically."],
      ["Below 75% lists", "Students with low attendance flagged for the class teacher."],
      ["Parents informed", "Parents see their child's attendance day by day in the parent portal."],
    ],
    faq: [
      ["Do teachers need to install an app?", "No. Infovion works in any phone browser; it can be added to the home screen like an app."],
      ["Can parents see attendance?", "Yes, day by day and as a monthly percentage, in the parent portal."],
      ["Is staff attendance included?", "Yes — staff attendance and leave requests are part of Infovion too."],
      ["How much does it cost?", "₹150 per student per year plus GST, all modules included. 30-day free trial."],
    ],
    ctaTitle: "Try attendance on your own classes.",
    related: [["/fee-management-software-for-schools", "Fee management"], ["/school-transport-management-software", "School transport"], ["/pricing", "Pricing"]],
  },
  transport: {
    slug: "school-transport-management-software",
    title: "School Transport Management Software — Routes, Fees, Bus Tracking | Infovion",
    description: "School bus and transport management: routes and stops, per-stop fares billed monthly, bus attendance, live bus location for parents, vehicle and driver documents with expiry reminders.",
    kicker: "School transport",
    h1: "School transport,",
    h1Accent: "run properly.",
    intro: "Routes, stops and per-stop fares billed with the rest of the fees; boarding attendance; live bus location for parents; and reminders before a vehicle's insurance or fitness certificate expires.",
    phone: true,
    problemTitle: "Where school transport goes wrong",
    problems: [
      ["Fares in a separate book", "Transport fees tracked apart from school fees, often by a separate operator."],
      ["Where is the bus?", "Parents call the office every morning to ask."],
      ["Expired documents", "Insurance, fitness and permits lapse without anyone noticing."],
    ],
    solutionTitle: "Every route, fare and bus,",
    solutionAccent: "in one system.",
    features: [
      ["Routes & stops", "Stops with pickup and drop times, and a fare for each stop."],
      ["Fees billed monthly", "Transport fees appear in each student's ledger automatically — with the operator's own receipts if they run the buses."],
      ["Bus attendance", "Boarding and drop marked on the bus; parents alerted."],
      ["Live bus location", "Parents see where the bus is during the trip."],
      ["Vehicles & drivers", "Vehicle and driver documents stored with expiry reminders."],
      ["Months off", "Skip vacation months so nobody is billed for them."],
    ],
    faq: [
      ["Can transport be billed by a separate operator?", "Yes. A route can be billed under a separate operator, with its own receipt series, while the school still sees everything."],
      ["Do parents see the bus location?", "Yes, during the trip, in the parent portal. The child's own location is never tracked — only the bus."],
      ["Is it included in the price?", "Yes — transport is part of the ₹150 per student per year, no add-on."],
      ["Is there a free trial?", "Yes, 30 days with every module, no card."],
    ],
    ctaTitle: "Put your buses on Infovion.",
    related: [["/fee-management-software-for-schools", "Fee management"], ["/school-attendance-app", "Attendance app"], ["/pricing", "Pricing"]],
  },
};

export const MaharashtraPage = () => <Landing c={PAGES.maharashtra} />;
export const FeesPage = () => <Landing c={PAGES.fees} />;
export const AttendancePage = () => <Landing c={PAGES.attendance} />;
export const TransportPage = () => <Landing c={PAGES.transport} />;

import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight, FileBadge2, FileText, ScrollText, ReceiptText } from "lucide-react";
import CertificateTool from "./CertificateTool";
import { Aurora, Kicker, Reveal, SpotlightCard } from "../../components/fx/Fx";

export function LeavingCertificateTool() {
  return (
    <CertificateTool
      toolKey="lc"
      seo={{
        title: "School Leaving Certificate in Marathi (शाळा सोडल्याचा दाखला) — Free Format & Generator | Infovion",
        description: "Free Maharashtra school leaving certificate (शाळा सोडल्याचा दाखला) generator in Marathi, Marathi + English or English. Fill the form, date of birth in words is automatic, print or save as PDF.",
        h1: "शाळा सोडल्याचा दाखला — free Marathi Leaving Certificate generator",
        intro: "Fill in the student's details from the General Register and get a one-page Maharashtra School Leaving Certificate in Marathi, Marathi + English, or English — with the date of birth written in words for you. Print it or save it as a PDF. Free, no sign-up.",
        howTitle: "How to fill a school leaving certificate (LC)",
        how: [
          "Copy the student's details exactly as written in the school's General Register (जनरल रजिस्टर) — the LC must match it.",
          "Enter the date of birth in figures; the date in words (अक्षरी) is written automatically.",
          "Fill the date of admission with the class, the class the student was studying in, and the date of leaving.",
          "Write progress (प्रगती) and conduct (वर्तणूक) — commonly चांगली / समाधानकारक.",
          "Give the reason for leaving, e.g. पालकांच्या विनंतीवरून or स्थलांतर.",
          "Print on the school letterhead, sign by the class teacher, clerk and headmaster, and put the school seal.",
        ],
        faq: [
          ["What is a school leaving certificate (शाळा सोडल्याचा दाखला)?", "It is the certificate a Maharashtra school issues when a student leaves. The next school needs it for admission, and it is also used later as proof of date of birth, caste and education. Its details must match the school's General Register."],
          ["Is this format valid for Maharashtra State Board schools?", "It follows the entries commonly used on Maharashtra leaving certificates: G.R. number, Aadhaar, mother's name, nationality, mother tongue, religion, caste and sub-caste, place and date of birth (in figures and words), previous school, admission date, progress, conduct, date and reason of leaving, and remarks. Check it against your school's own register before issuing."],
          ["Can I make the LC in Marathi and English together?", "Yes. Choose “मराठी + English” and every entry shows both labels."],
          ["Is the student data stored anywhere?", "No. Everything stays in your browser. Only your school's name and address are remembered on this device, to save typing next time."],
          ["Can the leaving certificate be generated automatically?", "Yes — in Infovion the LC is filled from the student's record, parents can apply online, the principal approves it, and every LC issued is kept in a register."],
        ],
      }}
    />
  );
}

export function TransferCertificateTool() {
  return (
    <CertificateTool
      toolKey="tc"
      seo={{
        title: "Transfer Certificate (TC) Format for Schools — Free TC Generator | Infovion",
        description: "Free school transfer certificate (TC) generator in the format CBSE and English-medium schools use. Fill the form, get a one-page TC with date of birth in words, print or save as PDF.",
        h1: "Free Transfer Certificate (TC) generator for schools",
        intro: "Make a one-page school Transfer Certificate in the standard format — date of birth in words is written for you, then print it on your letterhead or save it as a PDF. Free, no sign-up, nothing uploaded.",
        howTitle: "How to fill a school transfer certificate",
        how: [
          "Take the details from the admission register — the TC must match the school's records.",
          "Enter the date of birth in figures; it's written in words automatically.",
          "Fill the class last studied, the last examination with its result, and whether the student is promoted.",
          "Add the month up to which fees are paid and the working days / days present.",
          "Write general conduct and the reason for leaving.",
          "Print, get it signed by the class teacher, office and principal, and stamp it.",
        ],
        faq: [
          ["What does a school TC contain?", "Student and parents' names, nationality and category, date of birth in figures and words, first admission date and class, class last studied, last examination and result, subjects, promotion, fees paid up to, working days and attendance, conduct, dates of application and issue, and reason for leaving."],
          ["Is this the CBSE TC format?", "It follows the entries CBSE-affiliated and other English-medium schools commonly use. Your board may require extra entries — add them under remarks, or check your board's latest circular."],
          ["Can I save the TC as a PDF?", "Yes. Click “Print / Save as PDF” and choose “Save as PDF” as the printer."],
          ["Do you keep the student's data?", "No. The certificate is made in your browser and nothing is sent to us."],
          ["How do schools issue TCs without typing?", "In Infovion, the TC is filled from the student's record, the request goes from parent to principal to office for approval, and the student moves to former students automatically."],
        ],
      }}
    />
  );
}

export function BonafideCertificateTool() {
  return (
    <CertificateTool
      toolKey="bonafide"
      seo={{
        title: "Bonafide Certificate Format for School Students — Free Generator | Infovion",
        description: "Free bonafide certificate generator for school students: fill the student's name, class and purpose, print a one-page bonafide on your letterhead or save it as PDF.",
        h1: "Free bonafide certificate generator for school students",
        intro: "Parents ask for bonafide certificates for bank accounts, scholarships, passports and bus passes. Fill in a few details and print a clean one-page bonafide certificate — free, no sign-up.",
        howTitle: "How to write a bonafide certificate",
        how: [
          "Enter the student's full name and the parent's name as in school records.",
          "Add the class & division and the academic year.",
          "Optionally add the date of birth — it's written in words automatically.",
          "Mention the purpose (bank account, scholarship, passport, travel concession…).",
          "Print on the letterhead, sign and stamp.",
        ],
        faq: [
          ["What is a bonafide certificate?", "A letter from the school confirming that the student is currently enrolled, in which class and year — used for bank accounts, scholarships, passports and concessions."],
          ["Who signs a bonafide certificate?", "Usually the principal or headmaster, with the school seal."],
          ["Is the data stored?", "No. Everything stays in your browser."],
          ["Can bonafides be printed in bulk?", "In Infovion, bonafide and character certificates and ID cards print straight from student records — one or a whole class at a time."],
        ],
      }}
    />
  );
}

const TOOL_LIST = [
  { to: "/free-tools/school-leaving-certificate-marathi", icon: ScrollText, title: "शाळा सोडल्याचा दाखला (Leaving Certificate)", body: "Maharashtra LC in Marathi, Marathi + English or English — date of birth in words automatically." },
  { to: "/free-tools/transfer-certificate", icon: FileText, title: "Transfer Certificate (TC)", body: "The standard one-page school TC, ready to print on your letterhead." },
  { to: "/free-tools/bonafide-certificate", icon: FileBadge2, title: "Bonafide certificate", body: "For bank accounts, scholarships, passports and concessions." },
];

export function ToolsIndex() {
  return (
    <div className="bg-ink">
      <Helmet>
        <title>Free Tools for Schools — LC, TC & Bonafide Certificate Generators | Infovion</title>
        <meta name="description" content="Free certificate generators for Indian schools: Marathi school leaving certificate (शाळा सोडल्याचा दाखला), transfer certificate (TC) and bonafide certificate. Print or save as PDF — no sign-up." />
        <link rel="canonical" href="https://www.infovion.in/free-tools" />
      </Helmet>
      <section className="noise relative overflow-hidden pb-24 pt-32 sm:pt-40">
        <Aurora strong />
        <div className="relative mx-auto max-w-6xl px-5 sm:px-6">
          <Kicker>Free tools</Kicker>
          <h1 className="mt-6 max-w-3xl font-display text-4xl font-extrabold leading-[1.03] tracking-tight text-white sm:text-6xl">
            Free tools for <span className="text-gradient-aurora">school offices.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-slate-400">Make the certificates parents ask for every day — in the right format, in seconds. No sign-up, nothing uploaded.</p>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {TOOL_LIST.map((t, i) => {
              const Icon = t.icon;
              return (
                <Reveal key={t.to} delay={i * 0.06}>
                  <Link to={t.to} className="block h-full">
                    <SpotlightCard className="h-full rounded-3xl border border-white/[0.08] bg-white/[0.03] p-7 transition-colors hover:border-teal-400/40">
                      <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-teal-400/10 text-teal-300 ring-1 ring-teal-400/20"><Icon className="h-5 w-5" /></span>
                      <h2 className="mt-5 font-display text-lg font-bold text-white">{t.title}</h2>
                      <p className="mt-2 text-sm leading-relaxed text-slate-400">{t.body}</p>
                      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-teal-300">Open the tool <ArrowRight className="h-4 w-4" /></span>
                    </SpotlightCard>
                  </Link>
                </Reveal>
              );
            })}
          </div>
          <div className="glass mt-10 flex flex-wrap items-center justify-between gap-4 rounded-3xl p-6">
            <p className="flex items-center gap-3 text-slate-300"><ReceiptText className="h-5 w-5 text-teal-300" /> Issuing certificates, receipts and report cards for the whole school? Infovion makes them from your records.</p>
            <Link to="/free-trial" className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-300">Try it free <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>
    </div>
  );
}

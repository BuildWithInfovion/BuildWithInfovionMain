// Free certificate tools: field definitions + a printable one-page A4 layout.
// Formats follow the ones schools use in Infovion (Maharashtra LC, CBSE-style TC, bonafide).
import { dateFigures, dateInWords } from "./words";

const esc = (s) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** School details shared by every tool (remembered in the browser). */
export const SCHOOL_FIELDS = [
  { key: "schoolName", label: "School name", mr: "शाळेचे नाव", placeholder: "e.g. Gyan Ganga Vidyalaya" },
  { key: "schoolAddress", label: "Address", mr: "पत्ता", placeholder: "Street, city, district – PIN" },
  { key: "schoolContact", label: "Phone / email", mr: "दूरध्वनी / ई-मेल", placeholder: "020 1234 5678 · office@school.in" },
  { key: "udise", label: "UDISE / affiliation no.", mr: "यू-डायस / मान्यता क्र.", placeholder: "27250100123" },
  { key: "board", label: "Board / medium", mr: "मंडळ / माध्यम", placeholder: "Maharashtra State Board · Marathi medium" },
];

export const TOOLS = {
  lc: {
    slug: "school-leaving-certificate-marathi",
    lang: "mr",
    bilingualOption: true,
    title: "शाळा सोडल्याचा दाखला",
    titleEn: "School Leaving Certificate",
    subtitle: "(Leaving Certificate)",
    numberLabel: { mr: "दाखला क्र.", en: "LC No." },
    grLabel: { mr: "जनरल रजिस्टर क्र.", en: "G.R. No." },
    fields: [
      { key: "aadhaar", label: "Aadhaar (UID) No.", mr: "आधार (UID) क्रमांक" },
      { key: "studentName", label: "Name of the pupil (in full)", mr: "विद्यार्थ्याचे संपूर्ण नाव", required: true, placeholder: "Surname, name, father's name" },
      { key: "motherName", label: "Mother's name", mr: "आईचे नाव" },
      { key: "nationality", label: "Nationality", mr: "राष्ट्रीयत्व", default: "भारतीय" },
      { key: "motherTongue", label: "Mother tongue", mr: "मातृभाषा", default: "मराठी" },
      { key: "religion", label: "Religion", mr: "धर्म" },
      { key: "caste", label: "Caste / category", mr: "जात / प्रवर्ग" },
      { key: "subCaste", label: "Sub-caste", mr: "पोटजात" },
      { key: "placeOfBirth", label: "Place of birth (village / taluka / district / state)", mr: "जन्मस्थळ (गाव / तालुका / जिल्हा / राज्य)" },
      { key: "dob", label: "Date of birth (in figures)", mr: "जन्म दिनांक (अंकी)", type: "date", required: true },
      { key: "dobWords", label: "Date of birth (in words)", mr: "जन्म दिनांक (अक्षरी)", computed: (v, lang) => dateInWords(v.dob, lang === "en" ? "en" : "mr") },
      { key: "previousSchool", label: "Previous school and class", mr: "या शाळेत येण्यापूर्वीची शाळा व इयत्ता" },
      { key: "admission", label: "Date of admission in this school and class", mr: "या शाळेत प्रवेश घेतल्याचा दिनांक व इयत्ता", placeholder: "15/06/2019 — इयत्ता पहिली" },
      { key: "progress", label: "Progress in studies", mr: "अभ्यासातील प्रगती", default: "चांगली" },
      { key: "conduct", label: "Conduct", mr: "वर्तणूक", default: "चांगली" },
      { key: "leavingDate", label: "Date of leaving the school", mr: "शाळा सोडल्याचा दिनांक", type: "date" },
      { key: "classStudying", label: "Class in which studying and since when", mr: "कोणत्या इयत्तेत शिकत होता / होती व केव्हापासून" },
      { key: "reason", label: "Reason for leaving the school", mr: "शाळा सोडण्याचे कारण", default: "पालकांच्या विनंतीवरून" },
      { key: "remarks", label: "Remarks", mr: "शेरा" },
    ],
    declaration: { mr: "दाखला देण्यात येतो की, वरील माहिती शाळेतील जनरल रजिस्टरप्रमाणे आहे.", en: "Certified that the above information is in accordance with the school General Register." },
    signatures: { mr: ["वर्गशिक्षक", "लिपिक", "मुख्याध्यापक"], en: ["Class Teacher", "Clerk", "Headmaster"] },
    footer: { mr: "टीप : शाळा सोडल्याच्या दाखल्यात अनधिकृतरीत्या बदल केल्यास संबंधितांवर कायदेशीर कारवाई करण्यात येईल.", en: "Note: any unauthorised change in this certificate will invite legal action." },
  },
  tc: {
    slug: "transfer-certificate",
    lang: "en",
    title: "Transfer Certificate",
    subtitle: "",
    numberLabel: { en: "TC No." },
    grLabel: { en: "Admission No." },
    fields: [
      { key: "studentName", label: "Name of the pupil", required: true },
      { key: "motherName", label: "Mother's name" },
      { key: "fatherName", label: "Father's / Guardian's name" },
      { key: "nationality", label: "Nationality", default: "Indian" },
      { key: "category", label: "Whether the candidate belongs to SC / ST / OBC", default: "No" },
      { key: "dob", label: "Date of birth (in figures)", type: "date", required: true },
      { key: "dobWords", label: "Date of birth (in words)", computed: (v) => dateInWords(v.dob, "en") },
      { key: "admission", label: "Date of first admission in the school with class" },
      { key: "classLast", label: "Class in which the pupil last studied" },
      { key: "lastExam", label: "School / Board annual examination last taken, with result" },
      { key: "failed", label: "Whether failed, if so once / twice in the same class", default: "No" },
      { key: "subjects", label: "Subjects studied" },
      { key: "promotion", label: "Whether qualified for promotion to the higher class", default: "Yes" },
      { key: "duesPaid", label: "Month up to which school dues are paid" },
      { key: "workingDays", label: "Total working days / days present" },
      { key: "conduct", label: "General conduct", default: "Good" },
      { key: "applied", label: "Date of application for certificate", type: "date" },
      { key: "reason", label: "Reason for leaving the school", default: "Parent's request" },
      { key: "remarks", label: "Any other remarks" },
    ],
    declaration: { en: "Certified that the above information is in accordance with the school records." },
    signatures: { en: ["Class Teacher", "Checked by (Office)", "Principal"] },
    footer: { en: "" },
  },
  bonafide: {
    slug: "bonafide-certificate",
    lang: "en",
    letter: true,
    title: "Bonafide Certificate",
    numberLabel: { en: "Ref. No." },
    grLabel: { en: "Admission No." },
    fields: [
      { key: "studentName", label: "Student's name", required: true },
      { key: "parentName", label: "Son / daughter of (parent's name)" },
      { key: "className", label: "Class & division", placeholder: "Class 7 – A" },
      { key: "year", label: "Academic year", placeholder: "2026-27" },
      { key: "dob", label: "Date of birth", type: "date" },
      { key: "purpose", label: "Purpose", placeholder: "Bank account / scholarship / passport" },
    ],
    body: (v) => {
      const he = /daughter/i.test(v.parentName || "") ? "She" : "He / She";
      return `This is to certify that <b>${esc(v.studentName || "__________")}</b>${v.parentName ? `, son / daughter of <b>${esc(v.parentName)}</b>,` : ""} is a bonafide student of this school, studying in <b>${esc(v.className || "______")}</b> during the academic year <b>${esc(v.year || "______")}</b>.${v.dob ? ` ${he} was born on <b>${esc(dateFigures(v.dob))}</b> (${esc(dateInWords(v.dob, "en"))}) as per the school records.` : ""}${v.purpose ? `<br><br>This certificate is issued on request for the purpose of <b>${esc(v.purpose)}</b>.` : ""}`;
    },
    signatures: { en: ["Principal"] },
    footer: { en: "" },
  },
};

const label = (f, lang) => (lang === "en" ? f.label : lang === "mr-en" ? `${f.mr} / ${f.label}` : f.mr || f.label);
const pick = (o, lang) => (lang === "en" ? o.en ?? o.mr : o.mr ?? o.en);

/** One-page A4 certificate as a standalone HTML document (for print / Save as PDF). */
export function certificateHtml(tool, values, school, lang = tool.lang) {
  const L = lang === "mr-en" ? "mr" : lang;
  const val = (f) => {
    if (f.computed) return f.computed(values, lang);
    const v = values[f.key];
    if (f.type === "date") return dateFigures(v);
    return v ?? "";
  };
  const rows = tool.letter
    ? ""
    : tool.fields
        .map((f, i) => `<tr><td class="n">${i + 1}.</td><td class="l">${esc(label(f, lang))}</td><td class="c">:</td><td class="v">${esc(val(f)) || "&nbsp;"}</td></tr>`)
        .join("");
  const sigs = (pick(tool.signatures, L) || []).map((s) => `<div class="sig"><div class="line"></div>${esc(s)}</div>`).join("");
  const title = lang === "mr-en" && tool.titleEn ? `${tool.title} <span class="ten">/ ${tool.titleEn}</span>` : esc(lang === "en" && tool.titleEn ? tool.titleEn : tool.title);
  const today = dateFigures(new Date());
  return `<!doctype html><html><head><meta charset="utf-8"><title>${esc(tool.titleEn || tool.title)} — ${esc(values.studentName || "")}</title>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;600;700&family=Noto+Serif:wght@400;700&display=swap" rel="stylesheet">
<style>
@page{size:A4;margin:12mm}
*{box-sizing:border-box}
body{margin:0;font-family:'Noto Serif','Noto Sans Devanagari',serif;color:#111;font-size:12.5px}
.page{border:${tool.letter ? "none" : "2px double #333"};padding:${tool.letter ? "6mm 4mm" : "8mm 9mm"};min-height:${tool.letter ? "auto" : "270mm"};position:relative}
.head{text-align:center;border-bottom:1.5px solid #333;padding-bottom:6px}
.head h2{margin:0;font-size:21px;letter-spacing:.3px}
.head .meta{font-size:11px;color:#333;margin-top:3px}
.title{text-align:center;margin:12px 0 6px}
.title h1{display:inline-block;margin:0;font-size:19px;border:1.5px solid #333;padding:4px 18px;border-radius:4px}
.title .ten{font-size:13px;font-weight:400}
.sub{text-align:center;font-size:11px;margin-bottom:6px}
.nos{display:flex;justify-content:space-between;font-size:12px;margin:8px 0}
table{width:100%;border-collapse:collapse}
td{vertical-align:top;padding:4.5px 2px;line-height:1.35}
td.n{width:24px}
td.l{width:44%}
td.c{width:12px}
td.v{border-bottom:1px dotted #777;font-weight:600}
.decl{margin-top:12px;font-size:12px}
.letter{font-size:14px;line-height:1.9;margin:26px 4px;text-align:justify}
.place{display:flex;justify-content:space-between;margin-top:14px;font-size:12px}
.sigs{display:flex;justify-content:${(pick(tool.signatures, L) || []).length > 1 ? "space-between" : "flex-end"};margin-top:46px;font-size:12px;text-align:center}
.sig{min-width:140px}.sig .line{border-top:1px solid #333;margin-bottom:4px}
.foot{margin-top:18px;font-size:10px;color:#333;text-align:center}
.brand{position:absolute;bottom:3mm;left:0;right:0;text-align:center;font-size:8.5px;color:#999;font-family:Arial,sans-serif}
</style></head><body><div class="page">
<div class="head"><h2>${esc(school.schoolName || "School name")}</h2>
<div class="meta">${[school.schoolAddress, school.schoolContact].filter(Boolean).map(esc).join(" · ")}</div>
<div class="meta">${[school.board, school.udise ? `UDISE / Affiliation: ${school.udise}` : ""].filter(Boolean).map(esc).join(" · ")}</div></div>
<div class="title"><h1>${title}</h1></div>${tool.subtitle && lang === "mr" ? `<div class="sub">${esc(tool.subtitle)}</div>` : ""}
<div class="nos"><span>${esc(pick(tool.numberLabel, L))} : <b>${esc(values.certNo || "______")}</b></span><span>${esc(pick(tool.grLabel, L))} : <b>${esc(values.grNo || "______")}</b></span></div>
${tool.letter ? `<div class="letter">${tool.body(values)}</div>` : `<table>${rows}</table>`}
${tool.declaration ? `<div class="decl">${esc(pick(tool.declaration, L))}</div>` : ""}
<div class="place"><span>${L === "mr" ? "ठिकाण" : "Place"} : ${esc(values.place || "")}</span><span>${L === "mr" ? "दिनांक" : "Date"} : ${esc(values.issueDate ? dateFigures(values.issueDate) : today)}</span></div>
<div class="sigs">${sigs}</div>
${pick(tool.footer || {}, L) ? `<div class="foot">${esc(pick(tool.footer, L))}</div>` : ""}
<div class="brand">Made with the free tool at buildwithinfovion.com — Infovion issues these for every student automatically.</div>
</div></body></html>`;
}

export function printHtml(html) {
  const w = window.open("", "_blank");
  if (!w) return false;
  w.document.open();
  w.document.write(html + "<script>window.onload=()=>setTimeout(()=>window.print(),300)</scr" + "ipt>");
  w.document.close();
  return true;
}

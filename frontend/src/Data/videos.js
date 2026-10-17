// Watch pages (/videos/<slug>): one page per product video, so Google can show
// them in video results (a video only qualifies when it is the main content of
// its page). Transcripts are the exact voice-over of each clip (cut from the
// product film — see public/film/infovion-film-v2.vtt). Used by the pages, the
// VideoObject schema and the video sitemap (scripts/prerender.mjs).
import { FILM_TRANSCRIPT } from "./filmTranscript.js";

export const VIDEOS = [
  {
    slug: "infovion-product-film",
    file: "infovion-film-v2",
    poster: "infovion-film-poster",
    title: "Infovion school management software — the 4-minute product film",
    description: "A tour of a whole school run on Infovion: admissions, attendance, timetable, exams and report cards, fees with UPI and receipts, the parent portal, certificates, staff salaries and the principal's dashboard. Every screen is the real product.",
    seconds: 269,
    uploadDate: "2026-09-29",
    transcript: FILM_TRANSCRIPT,
    related: ["/school-management-software/features", "Every module in detail"],
  },
  {
    slug: "school-attendance-app-demo",
    file: "attendance",
    title: "School attendance app: mark a class in a few taps",
    description: "How teachers mark attendance class by class on a phone or computer in Infovion. Each teacher sees only their own classes, and parents see the day's attendance the same day.",
    seconds: 11,
    uploadDate: "2026-10-03",
    transcript: "Teachers mark attendance class by class, in just a few taps. Each teacher sees only their own classes, so your data stays clean and private.",
    related: ["/school-attendance-app", "The school attendance app"],
  },
  {
    slug: "school-fee-management-demo",
    file: "fees",
    title: "School fee management: instalments, concessions, UPI and receipts",
    description: "Set fee plans with instalments, apply sibling or scholarship concessions, collect by cash, UPI, cheque, bank transfer or online through Razorpay with a receipt every time — and see the defaulters list in one click.",
    seconds: 24,
    uploadDate: "2026-10-03",
    transcript: "Fees are where a school office loses the most time. Infovion fixes that. Set fee plans with installments, and apply concessions like sibling discounts or scholarships. Collect by cash, UPI, cheque, bank transfer, or online through Razorpay, with a receipt every time. And the defaulters list is always one click away.",
    related: ["/fee-management-software-for-schools", "Fee management software for schools"],
  },
  {
    slug: "school-admission-management-demo",
    file: "admission",
    title: "School admission management: from first enquiry to enrolled student",
    description: "Track every admission enquiry as a lead from the first call to an enrolled student, admit students in minutes, or bring a whole school in at once from Excel or CSV.",
    seconds: 15,
    uploadDate: "2026-10-03",
    transcript: "It starts at admission. Track every inquiry as a lead, from the first call to an enrolled student. Admit students in minutes, or bring your whole school in at once with a CSV import.",
    related: ["/school-management-software/features", "Admissions and every other module"],
  },
  {
    slug: "parent-portal-for-schools-demo",
    file: "parent",
    title: "Parent portal for schools: attendance, marks and fees the same day",
    description: "What parents see in Infovion's parent portal: attendance, marks, fee status and announcements on the same day, and messages to the class teacher without sharing personal phone numbers.",
    seconds: 13,
    uploadDate: "2026-10-03",
    transcript: "Parents get their own portal, with attendance, marks, fee status and announcements, the same day. They can message the class teacher directly, without sharing personal phone numbers.",
    related: ["/school-management-software/portals", "All eight portals"],
  },
  {
    slug: "exam-marks-and-report-cards-demo",
    file: "exams",
    title: "Exam marks entry and automatic report cards for schools",
    description: "Create exams, enter marks subject by subject, and get report cards generated automatically on the school's own letterhead.",
    seconds: 10,
    uploadDate: "2026-10-03",
    transcript: "Create exams and enter marks subject by subject. Report cards are generated automatically, on your school's own letterhead.",
    related: ["/school-management-software/features", "Exams, report cards and more"],
  },
  {
    slug: "transfer-certificate-and-id-cards-demo",
    file: "documents",
    title: "Print transfer certificates, bonafide certificates and student ID cards",
    description: "Transfer certificates, bonafide and character certificates ready to print in seconds, and student ID cards with the school's branding — straight from the student's record.",
    seconds: 12,
    uploadDate: "2026-10-03",
    transcript: "Transfer certificates, bonafide and character certificates are ready to print in seconds. Student ID cards print four to a page, all with your school's branding.",
    related: ["/free-tools", "Free certificate makers"],
  },
  {
    slug: "school-timetable-and-substitution-demo",
    file: "timetable",
    title: "School timetable and substitute teacher covers in seconds",
    description: "Build the weekly school timetable once, and when a teacher is absent, assign a substitute cover in seconds.",
    seconds: 8,
    uploadDate: "2026-10-03",
    transcript: "Build the weekly timetable once. When a teacher is absent, assign a substitute cover in seconds.",
    related: ["/school-management-software/features", "Timetable and every other module"],
  },
  {
    slug: "school-announcements-and-calendar-demo",
    file: "calendar",
    title: "School announcements and one shared calendar for every portal",
    description: "Send one announcement to every portal at once, and keep holidays, exams and events on one shared school calendar.",
    seconds: 9,
    uploadDate: "2026-10-03",
    transcript: "Send an announcement to every portal at once. And keep holidays, exams and events on one shared school calendar.",
    related: ["/school-management-software/portals", "Parent, teacher and staff portals"],
  },
  {
    slug: "staff-attendance-and-salary-slips-demo",
    file: "staff",
    title: "Staff attendance and monthly salary slips for schools",
    description: "Track staff attendance, set salary structures for every employee, and get monthly salary slips generated without spreadsheets.",
    seconds: 11,
    uploadDate: "2026-10-03",
    transcript: "Track staff attendance and set salary structures for every employee. Monthly salary slips are generated for you. No spreadsheets needed.",
    related: ["/school-management-software/features", "Staff, salary and every other module"],
  },
  {
    slug: "principal-dashboard-demo",
    file: "leaders",
    title: "Principal and director dashboard: the whole school at a glance",
    description: "What a principal or director sees in Infovion: today's attendance, pending requests, class-wise exam averages, and which teachers haven't marked attendance yet.",
    seconds: 12,
    uploadDate: "2026-10-03",
    transcript: "Principals and directors see the whole school at a glance. Today's attendance, pending requests, class-wise exam averages, and which teachers haven't marked attendance yet.",
    related: ["/school-management-software", "Infovion School ERP for school leaders"],
  },
  {
    slug: "school-erp-roles-and-security-demo",
    file: "security",
    title: "School ERP security: a portal per role, audit log and two-step sign-in",
    description: "Eight dedicated portals, one for every role in the school, every change recorded in the audit log, and two-factor login to keep accounts secure.",
    seconds: 12,
    uploadDate: "2026-10-03",
    transcript: "There are eight dedicated portals, one for every role in your school. Every change is recorded in the audit log, and two-factor login keeps accounts secure.",
    related: ["/school-management-software/portals", "The eight portals"],
  },
];

export const SITE = "https://www.infovion.in";
export const videoFile = (v) => `/film/${v.file}.mp4`;
export const videoPoster = (v) => `/film/${v.poster ?? v.file}.webp`;
export const isoDuration = (s) => `PT${Math.floor(s / 60) ? `${Math.floor(s / 60)}M` : ""}${s % 60}S`;
export const clock = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

export function videoSchema(v) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "@id": `${SITE}/videos/${v.slug}#video`,
    name: v.title,
    description: v.description,
    thumbnailUrl: [`${SITE}${videoPoster(v)}`],
    uploadDate: `${v.uploadDate}T00:00:00+05:30`,
    duration: isoDuration(v.seconds),
    contentUrl: `${SITE}${videoFile(v)}`,
    inLanguage: "en-IN",
    transcript: v.transcript,
    publisher: { "@id": `${SITE}/#organization` },
  };
}

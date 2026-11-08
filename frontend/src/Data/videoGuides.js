// What each product video shows, step by step, and the questions schools ask about it.
// Shown under each watch page (/videos/<slug>) so the page explains the job in words as well as
// on screen. Only facts already stated on the School ERP pages and in llms.txt; keep them in step.

export const VIDEO_GUIDES = {
  "infovion-product-film": {
    steps: [
      "Admissions: enquiries tracked as leads until the student is enrolled, or the whole school imported from Excel or CSV.",
      "Daily work: teachers mark attendance on their phones; the office collects fees by cash, UPI, cheque, bank transfer or online, with a receipt every time.",
      "Academics: exams, marks entry and report cards on the school's letterhead; timetable and substitute covers.",
      "Documents: transfer, leaving, bonafide and character certificates and ID cards printed from the student's record.",
      "Leadership: the principal and director see attendance, fees and exam averages for the whole school on one dashboard.",
    ],
    faqs: [
      ["What is Infovion School ERP?", "Cloud school management software for Indian K-12 schools (CBSE, ICSE and State Boards) with eight role portals: director, principal, school office, accountant, reception, teachers, non-teaching staff and parents."],
      ["How much does Infovion School ERP cost?", "₹150 per enrolled student per academic year plus GST, with every module and portal included and no setup fee. A school of 600 students pays ₹90,000 plus GST a year."],
      ["Can we try it before buying?", "Yes. The 30-day free trial is self-serve, includes every module and sample data, covers up to 50 students and 10 staff logins, and needs no card."],
    ],
  },
  "school-attendance-app-demo": {
    steps: [
      "The teacher signs in on any phone browser; there is no app to install.",
      "Only that teacher's own classes appear, so nobody marks the wrong class.",
      "Students are marked present or absent in a few taps, class by class.",
      "Parents see the attendance in the parent portal the same day.",
      "The principal sees today's attendance across the school, and which teachers have not marked it yet.",
    ],
    faqs: [
      ["Do teachers need to install an app?", "No. Infovion works in any phone browser as a progressive web app, so teachers can add it to their home screen without an app store."],
      ["Can a teacher see other classes' attendance?", "No. Each teacher sees only their own classes, which keeps the data clean and private."],
      ["Does the school see who has not marked attendance?", "Yes. The principal's dashboard lists the teachers who have not marked attendance yet today."],
    ],
  },
  "school-fee-management-demo": {
    steps: [
      "Set fee plans for each class, with instalments and due dates.",
      "Apply concessions such as sibling discounts or scholarships to individual students.",
      "Collect by cash, UPI, cheque, bank transfer, or online by UPI, card and net banking into the school's own Razorpay account.",
      "A receipt is issued for every payment.",
      "See defaulters in one click, and carry forward opening balances from the old ledger.",
    ],
    faqs: [
      ["Where does the online fee money go?", "Into the school's own Razorpay account. Infovion does not hold the school's money."],
      ["Can we give sibling discounts and scholarships?", "Yes. Concessions are applied per student and the fee plan and receipts reflect them."],
      ["Can we bring in balances from our old fee register?", "Yes. Opening balances are entered when the school starts, so dues continue without a break."],
    ],
  },
  "school-admission-management-demo": {
    steps: [
      "Every admission enquiry is recorded as a lead, from the first call or visit.",
      "Follow each enquiry until the student is admitted or the enquiry is closed.",
      "Admit a student in minutes, with the class, section and fee plan.",
      "Or bring the whole school in at once with an Excel or CSV import.",
    ],
    faqs: [
      ["Can we import our existing students?", "Yes. Students can be imported from Excel or CSV, and Infovion includes the data import at no extra cost."],
      ["Does it track admission enquiries?", "Yes. Each enquiry is tracked as a lead from the first contact until the student is enrolled."],
    ],
  },
  "parent-portal-for-schools-demo": {
    steps: [
      "Each parent signs in to their own portal; parent logins are free.",
      "They see their child's attendance, marks and fee status the same day.",
      "School announcements reach them in the same place.",
      "They can message the class teacher directly, without anyone sharing a personal phone number.",
    ],
    faqs: [
      ["Do parents pay for the parent portal?", "No. Parent, teacher and staff logins are free; the school pays ₹150 per enrolled student per year."],
      ["Do teachers have to share their phone numbers with parents?", "No. Parents message the class teacher inside the portal, so personal numbers stay private."],
    ],
  },
  "exam-marks-and-report-cards-demo": {
    steps: [
      "Create the exams for the term.",
      "Teachers enter marks subject by subject.",
      "Report cards are generated automatically on the school's own letterhead.",
      "Parents see the marks in the parent portal, and the principal sees class-wise averages.",
    ],
    faqs: [
      ["Are report cards made automatically?", "Yes. Once marks are entered, report cards are generated on the school's letterhead, ready to print."],
      ["Which boards does it support?", "Infovion School ERP is used by Indian K-12 schools following CBSE, ICSE and State Boards."],
    ],
  },
  "transfer-certificate-and-id-cards-demo": {
    steps: [
      "Open the student's record.",
      "Choose the document: transfer, leaving, bonafide or character certificate.",
      "The certificate fills in from the record and is ready to print in seconds.",
      "Student ID cards print four to a page, with the school's branding.",
    ],
    faqs: [
      ["Can we make a School Leaving Certificate in Marathi?", "Yes. There is also a free School Leaving Certificate maker in Marathi on our free tools page, no sign-up needed."],
      ["Do certificates carry our school's details?", "Yes. Certificates and ID cards use the school's own name, logo and branding."],
    ],
  },
  "school-timetable-and-substitution-demo": {
    steps: [
      "Build the weekly timetable for every class once.",
      "When a teacher is absent, see which periods need cover.",
      "Assign a substitute teacher to each period in seconds.",
      "Holidays and exams sit on the shared school calendar.",
    ],
    faqs: [
      ["Do we have to make the timetable every week?", "No. The weekly timetable is built once and reused; only substitutions change day to day."],
      ["How are substitute teachers assigned?", "When a teacher is absent, the periods to cover are listed and a substitute is assigned to each in seconds."],
    ],
  },
  "school-announcements-and-calendar-demo": {
    steps: [
      "Write one announcement and send it to every portal at once.",
      "Parents, teachers and staff see it in their own portal.",
      "Holidays, exams and events go on one shared school calendar.",
    ],
    faqs: [
      ["Do parents and staff see announcements in the app?", "Yes. An announcement reaches every portal at once, so parents, teachers and staff see it in their own portal."],
      ["Is there one calendar for the whole school?", "Yes. Holidays, exams and events are kept on one shared calendar that every portal shows."],
    ],
  },
  "staff-attendance-and-salary-slips-demo": {
    steps: [
      "Record staff attendance and leave.",
      "Set a salary structure for every employee once.",
      "Monthly salary slips are generated automatically, without spreadsheets.",
      "Non-teaching staff have their own portal too.",
    ],
    faqs: [
      ["Does it make salary slips?", "Yes. Once each employee's salary structure is set, monthly salary slips are generated for you, with no spreadsheets."],
      ["Do non-teaching staff get a login?", "Yes. Non-teaching staff have their own portal, and staff logins are free."],
    ],
  },
  "principal-dashboard-demo": {
    steps: [
      "Today's attendance across the school, at a glance.",
      "Pending requests that need the principal's approval.",
      "Class-wise exam averages after each exam.",
      "Which teachers have not marked attendance yet today.",
      "The school's director has a portal of their own.",
    ],
    faqs: [
      ["What does the principal see?", "Today's attendance, pending requests, class-wise exam averages and which teachers have not marked attendance yet, on one dashboard."],
      ["Is there a separate view for the school's director?", "Yes. The director has a separate portal from the principal, among the eight role portals."],
    ],
  },
  "school-erp-roles-and-security-demo": {
    steps: [
      "Eight portals, one for each role: director, principal, school office, accountant, reception, teachers, non-teaching staff and parents.",
      "Each person sees only what their role needs.",
      "Every change is recorded in the audit log.",
      "Two-step sign-in protects accounts.",
      "Each school's data is kept separate, with a DPDP Act data processing agreement.",
    ],
    faqs: [
      ["Is our school's data safe?", "Each school's data is kept separate, access is set by role, every change is in the audit log, and two-step sign-in protects accounts. Schools sign a data processing agreement under the DPDP Act."],
      ["Does every staff member see everything?", "No. Each role has its own portal and sees only what that role needs; teachers see their own classes and parents see their own children."],
    ],
  },
};

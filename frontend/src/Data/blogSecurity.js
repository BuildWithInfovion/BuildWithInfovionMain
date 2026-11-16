// Guides for security teams, written alongside Vigil. Legal points quote the regulator's own text
// and link to it; nothing here is legal advice, and each article says so.

const CERTIN = "https://www.cert-in.org.in/PDF/CERT-In_Directions_70B_28.04.2022.pdf";

export const securityPosts = [
  {
    id: 301,
    slug: "cert-in-6-hour-incident-reporting-rule",
    seoTitle: "CERT-In 6-Hour Incident Reporting Rule: What to Report | Infovion",
    title: "The CERT-In 6-Hour Rule: What Must Be Reported, How, and How to Be Ready",
    excerpt: "CERT-In's 2022 Directions give Indian organisations six hours to report 20 kinds of cyber incident and require 180 days of logs kept in India. A plain guide.",
    category: "security",
    author: "Infovion Team",
    date: "2026-11-16",
    readTime: "8 min read",
    tags: ["CERT-In", "Incident reporting", "SOC", "Compliance"],
    image: "/product/vigil/case.webp",
    content: `
      <p><strong>Short answer:</strong> under CERT-In's Directions of 28 April 2022, every service provider, intermediary, data centre, body corporate and government organisation in India must report the cyber incidents listed in the Directions to CERT-In <strong>within six hours of noticing them or being told about them</strong>, and must keep the logs of all its ICT systems for a <strong>rolling 180 days, within Indian jurisdiction</strong>. Reports go to incident@cert-in.org.in, by phone to 1800-11-4949 or by fax to 1800-11-6969.</p>
      <p><small>This guide summarises the Directions for planning. It is not legal advice. Read <a href="${CERTIN}" target="_blank" rel="noopener noreferrer">the Directions themselves</a> and CERT-In's FAQs, and take advice on how they apply to you.</small></p>

      <h2>Who has to comply</h2>
      <p>The Directions name five groups: service providers, intermediaries, data centres, body corporates and government organisations. "Body corporate" is wide enough to cover most companies that run computer systems in India. Banks, NBFCs, brokers and insurers have their own regulators' reporting rules as well, and those clocks run separately: telling RBI or SEBI does not count as telling CERT-In.</p>

      <h2>What the six hours are counted from</h2>
      <p>The wording is "within 6 hours of noticing such incidents or being brought to notice about such incidents". The clock starts when your organisation becomes aware, including when a customer, vendor or researcher tells you. It does not wait for you to finish investigating. Report what you know, then add to it.</p>

      <h2>The 20 kinds of incident that must be reported</h2>
      <p>Annexure I of the Directions lists them:</p>
      <ol>
        <li>Targeted scanning or probing of critical networks or systems</li>
        <li>Compromise of critical systems or information</li>
        <li>Unauthorised access of IT systems or data</li>
        <li>Defacement of a website, or intrusion into a website with unauthorised changes such as malicious code or links</li>
        <li>Malicious code attacks: virus, worm, Trojan, bots, spyware, ransomware, cryptominers</li>
        <li>Attacks on servers such as database, mail and DNS, and on network devices such as routers</li>
        <li>Identity theft, spoofing and phishing attacks</li>
        <li>Denial of service and distributed denial of service attacks</li>
        <li>Attacks on critical infrastructure, SCADA and operational technology systems and wireless networks</li>
        <li>Attacks on applications such as e-governance and e-commerce</li>
        <li>Data breach</li>
        <li>Data leak</li>
        <li>Attacks on Internet of Things devices and their systems, networks, software and servers</li>
        <li>Attacks or incidents affecting digital payment systems</li>
        <li>Attacks through malicious mobile apps</li>
        <li>Fake mobile apps</li>
        <li>Unauthorised access to social media accounts</li>
        <li>Attacks or suspicious activity affecting cloud computing systems, servers, software or applications</li>
        <li>Attacks or suspicious activity affecting systems related to big data, blockchain, virtual assets, robotics, 3D and 4D printing, additive manufacturing and drones</li>
        <li>Attacks or suspicious activity affecting systems related to artificial intelligence and machine learning</li>
      </ol>
      <p>The list is broad on purpose. A successful phishing sign-in, ransomware on one laptop and a defaced website are all on it.</p>

      <h2>The other duties in the same Directions</h2>
      <table>
        <thead><tr><th>Duty</th><th>What the Directions say</th></tr></thead>
        <tbody>
          <tr><td>Logs</td><td>Enable logs of all ICT systems and keep them securely for a rolling 180 days, within Indian jurisdiction. Provide them to CERT-In with an incident report or when ordered</td></tr>
          <tr><td>Clocks</td><td>Synchronise all ICT system clocks with the NTP servers of NIC or NPL, or with servers traceable to them</td></tr>
          <tr><td>Point of contact</td><td>Designate a point of contact for CERT-In and send the details in the format in Annexure II; keep it up to date</td></tr>
          <tr><td>Information on request</td><td>Take action or provide information when CERT-In orders it, in the format and time it specifies</td></tr>
          <tr><td>Data centres, VPS, cloud and VPN providers</td><td>Keep validated subscriber records for five years or longer</td></tr>
        </tbody>
      </table>

      <h2>Why six hours is hard</h2>
      <p>Most of the six hours is usually lost before anyone decides there is an incident. An alert sits in a queue overnight; when it is opened, someone has to work out who the user is, what else happened on that machine, and whether the address has been seen before. Only then does the reporting start, and the report needs a timeline that nobody has written down.</p>
      <p>Three things shorten it:</p>
      <ul>
        <li><strong>Triage every alert when it is raised</strong>, at night and on holidays too, so "noticing" and "understanding" happen within minutes of each other.</li>
        <li><strong>Keep the evidence with the case</strong>: the events, the user's history, the enrichment and the verdict in one place, with times in a single time zone.</li>
        <li><strong>Draft the report from the case</strong>, not from memory, and have a named person approve and send it.</li>
      </ul>

      <h2>A readiness checklist</h2>
      <ul>
        <li>A point of contact is registered with CERT-In, and a deputy knows the process</li>
        <li>Logging is switched on for servers, endpoints, identity, email, cloud and network devices</li>
        <li>Logs are kept for 180 days, in India, and someone has tested retrieving a specific day</li>
        <li>System clocks follow NIC or NPL time</li>
        <li>Alerts are reviewed around the clock, by people or by automated triage with people approving</li>
        <li>There is a one-page runbook: who decides it is reportable, who writes, who sends, to which address</li>
        <li>The reporting format from CERT-In's website is saved where the duty analyst can find it</li>
        <li>Sector reports (RBI, SEBI, IRDAI) and personal data breach duties are in the same runbook, with their own deadlines</li>
        <li>The runbook has been rehearsed once with a made-up incident</li>
      </ul>

      <h2>Where Vigil fits</h2>
      <p><a href="/vigil">Vigil</a>, our security operations platform, investigates each alert as it arrives, keeps the evidence and timeline in the case, and drafts a CERT-In incident report from it for a person to check and send. It is in early access; <a href="/vigil#status">the status table</a> lists what is built and what is not. It does not replace your log archive or your decision about what is reportable.</p>
    `,
    faqs: [
      ["What is the CERT-In 6-hour rule?", "CERT-In's Directions of 28 April 2022 require service providers, intermediaries, data centres, body corporates and government organisations to report the cyber incidents listed in Annexure I to CERT-In within 6 hours of noticing them or being brought to notice about them."],
      ["How do I report an incident to CERT-In?", "By email to incident@cert-in.org.in, by phone on 1800-11-4949 or by fax on 1800-11-6969. CERT-In publishes the reporting methods and formats on www.cert-in.org.in."],
      ["How long must logs be kept under the CERT-In Directions?", "Logs of all ICT systems must be enabled and maintained securely for a rolling period of 180 days, within Indian jurisdiction, and provided to CERT-In with an incident report or when ordered."],
      ["Which incidents must be reported to CERT-In?", "Twenty types listed in Annexure I, including unauthorised access, website defacement, malware and ransomware, phishing and identity theft, denial of service, data breaches and leaks, and attacks on cloud, payment, IoT and AI systems."],
      ["Does reporting to RBI or SEBI satisfy the CERT-In requirement?", "No. Sector regulators' reporting rules are separate. A regulated entity generally has to report to its regulator and to CERT-In, each within its own deadline."],
      ["When does the six-hour clock start?", "When the organisation notices the incident or is told about it by someone else. It does not wait for the investigation to finish."],
    ],
  },
  {
    id: 302,
    slug: "what-is-an-ai-soc-analyst",
    seoTitle: "What Is an AI SOC Analyst? How Alert Triage Is Automated | Infovion",
    title: "What Is an AI SOC Analyst? How Automated Alert Triage Works and How to Judge One",
    excerpt: "An AI SOC analyst does the first-line work of a security operations centre: it investigates each alert, gives a verdict with evidence and proposes a response.",
    category: "security",
    author: "Infovion Team",
    date: "2026-11-16",
    readTime: "7 min read",
    tags: ["AI SOC analyst", "Alert triage", "SIEM", "Security operations"],
    image: "/product/vigil/overview.webp",
    content: `
      <p><strong>Short answer:</strong> an AI SOC analyst is software that does the first-line work of a security operations centre. It takes each alert raised by a SIEM, EDR or identity system, gathers the context a person would look up, decides whether the activity is malicious, suspicious or benign, and writes up the case with a recommended response. People review the cases that need judgement and approve any action.</p>

      <h2>The problem it exists to solve</h2>
      <p>Detection tools have become very good at raising alerts. Staffing has not kept up. A security team can see far more alerts in a day than its first-line analysts can open, most of them harmless, and working one properly takes a person many minutes. Teams cope by sampling, by raising thresholds, or by leaving the night queue for the morning. Each of those is a way for a real incident to wait.</p>

      <h2>What it does with one alert</h2>
      <ol>
        <li><strong>Collect.</strong> The alert arrives from the SIEM or EDR, or from the tool's own detection rules.</li>
        <li><strong>Enrich.</strong> Addresses, domains and file hashes are checked against threat intelligence.</li>
        <li><strong>Compare with history.</strong> Has this user signed in from this country before? Does this server normally run PowerShell?</li>
        <li><strong>Correlate.</strong> What else did the same user, host or address do in the surrounding hours?</li>
        <li><strong>Map.</strong> The behaviour is matched to MITRE ATT&amp;CK techniques.</li>
        <li><strong>Decide.</strong> A verdict with a confidence level, and the evidence for it.</li>
        <li><strong>Recommend.</strong> A response, such as revoking sessions or isolating a host, held for a person's approval.</li>
      </ol>
      <p>A system that does only steps 1 and 2 is an enrichment tool. One that answers questions in a chat window is a copilot. An AI SOC analyst carries the alert through to a written verdict without being asked.</p>

      <h2>Rules, playbooks and language models</h2>
      <p>There are three ways to do the reasoning, and good systems use all of them:</p>
      <ul>
        <li><strong>Rules</strong> are fast, cheap and predictable. They are right for suppressing known-safe patterns and for grouping related alerts.</li>
        <li><strong>Playbooks</strong> are the steps an experienced analyst follows for a kind of alert. Encoded, they give the same investigation every time, and you can read and edit them.</li>
        <li><strong>Language models</strong> handle what rules and playbooks cannot: unfamiliar combinations, free-text evidence, and writing an explanation a person can follow. They cost money per case and can be wrong with confidence, so they should see only the cases that need them and should show their evidence.</li>
      </ul>

      <h2>Seven questions to ask a vendor</h2>
      <table>
        <thead><tr><th>Question</th><th>Why it matters</th></tr></thead>
        <tbody>
          <tr><td>Does it produce a verdict for every alert, or assist at one stage?</td><td>Partial help still leaves the queue with your people</td></tr>
          <tr><td>Can I see the evidence behind each verdict?</td><td>A score without evidence cannot be audited or trusted</td></tr>
          <tr><td>How do I measure its accuracy on my own alerts?</td><td>Run it beside your analysts on past alerts before relying on it</td></tr>
          <tr><td>Does it work with the SIEM and EDR we have?</td><td>Replacing your stack to adopt a triage tool is the wrong way round</td></tr>
          <tr><td>What happens when it is unsure?</td><td>Low-confidence and critical cases should go to a person</td></tr>
          <tr><td>Can it act without approval?</td><td>Automated containment needs a policy and an approval step</td></tr>
          <tr><td>What data is sent to the model, and where?</td><td>Raw logs should stay with you; know which provider sees case content</td></tr>
        </tbody>
      </table>

      <h2>What it does not replace</h2>
      <p>It does not replace the SIEM that collects and stores logs, the EDR on endpoints, or the people who decide. It changes what those people do: fewer hours opening alerts that turn out to be nothing, more on confirmed incidents, tuning, hunting and reporting. For a team that cannot staff nights, it is the difference between an alert being read at 2 am and at 9 am.</p>

      <h2>Where Vigil fits</h2>
      <p><a href="/vigil/ai-soc-analyst">Vigil</a> is our platform for this. It takes alerts from your existing tools, investigates each with an editable playbook and, where enabled, Claude models, shows the evidence, and waits for approval before any response. It is in early access; the playbook engine is tested and the model analyst is still being validated, as <a href="/vigil#status">the status table</a> sets out.</p>
    `,
    faqs: [
      ["What is an AI SOC analyst?", "Software that automates first-line security operations work: it investigates each alert from a SIEM, EDR or identity system, classifies it as malicious, suspicious or benign with evidence, and recommends a response for a person to approve."],
      ["How is an AI SOC analyst different from SOAR?", "SOAR tools run fixed workflows that someone has to build and maintain for each case type. An AI SOC analyst investigates each alert, including unfamiliar ones, and writes its reasoning. Many products combine both: playbooks for the known, a language model for the rest."],
      ["Does an AI SOC analyst replace a SIEM?", "No. The SIEM collects and stores logs and raises alerts. The AI SOC analyst works on those alerts. Most are designed to sit on top of the SIEM and EDR you already run."],
      ["Can an AI SOC analyst be trusted to respond by itself?", "Responses should be proposed and approved by a person, at least for anything that changes access or isolates a system. Look for a policy check, an approval step and an audit record of who approved what."],
      ["How do you measure an AI SOC analyst's accuracy?", "Run it on a set of past alerts your own analysts have already judged, compare verdicts, and keep counting agreements and corrections once it is live."],
    ],
  },
];

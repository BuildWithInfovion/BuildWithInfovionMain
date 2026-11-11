import React from "react";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { ArrowRight, ChevronRight, Clock3, PlayCircle } from "lucide-react";
import { Aurora, GhostButton, GlowButton, Kicker } from "../components/fx/Fx";
import { SITE, VIDEOS, clock, videoFile, videoPoster, videoSchema } from "../Data/videos";
import { VIDEO_GUIDES } from "../Data/videoGuides";
import { faqSchema } from "../lib/seo";

function VideoCard({ v }) {
  return (
    <Link to={`/videos/${v.slug}`} className="group block overflow-hidden rounded-2xl bg-white/[0.03] ring-1 ring-white/10 transition hover:ring-teal-300/40">
      <div className="relative aspect-video overflow-hidden">
        <img src={videoPoster(v)} alt={v.title} width="1280" height="720" loading="lazy" decoding="async" className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]" />
        <span className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-90 transition group-hover:bg-black/10">
          <PlayCircle className="h-12 w-12 text-white drop-shadow-lg" />
        </span>
        <span className="absolute bottom-2 right-2 rounded-md bg-black/70 px-1.5 py-0.5 text-xs font-semibold text-white">{clock(v.seconds)}</span>
      </div>
      <p className="px-4 py-3 text-sm font-semibold leading-snug text-white">{v.title}</p>
    </Link>
  );
}

/** /videos — every product video, each linking to its own watch page. */
export function VideosIndex() {
  const listSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: VIDEOS.map((v, i) => ({ "@type": "ListItem", position: i + 1, url: `${SITE}/videos/${v.slug}` })),
  };
  return (
    <div className="bg-ink">
      <Helmet>
        <title>Videos — see Infovion school management software at work</title>
        <meta name="description" content="Short demos of Infovion School ERP: attendance on a phone, fees with UPI and receipts, admissions, parent portal, report cards, certificates and payroll." />
        <link rel="canonical" href={`${SITE}/videos`} />
        <meta property="og:url" content={`${SITE}/videos`} />
        <script type="application/ld+json">{JSON.stringify(listSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema(INDEX_FAQS))}</script>
      </Helmet>
      <section className="noise relative overflow-hidden pb-20 pt-32 sm:pt-40">
        <Aurora />
        <div className="relative mx-auto max-w-6xl px-5 sm:px-6">
          <Kicker>Videos</Kicker>
          <h1 className="mt-6 max-w-3xl font-display text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl">See school management software at work</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-400">Each video shows one job in a real school, on the real product — from marking attendance to printing a transfer certificate.</p>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {VIDEOS.map((v) => <VideoCard key={v.slug} v={v} />)}
          </div>

          <div className="mt-16 grid gap-10 lg:grid-cols-2">
            <div className="text-[15px] leading-relaxed text-slate-300">
              <h2 className="text-xl font-bold text-white">What the videos cover</h2>
              <p className="mt-4">The videos follow a school's year in Infovion School ERP: admissions and enquiries, attendance on a teacher's phone, fee collection with instalments, concessions and UPI, exams and report cards on the school's letterhead, transfer and bonafide certificates, ID cards, the timetable with substitute covers, announcements and the school calendar, staff attendance and salary slips, the principal's dashboard, and the eight role portals with the audit log and two-step sign-in.</p>
              <p className="mt-4">Every clip is recorded on the real product with sample school data, with a voice-over, captions and a written transcript on its page. Start with the four-minute product film for the whole tour.</p>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Questions schools ask</h2>
              <div className="mt-4 space-y-5">
                {INDEX_FAQS.map(([q, a]) => (
                  <div key={q}>
                    <h3 className="font-semibold text-white">{q}</h3>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-slate-300">{a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

const INDEX_FAQS = [
  ["Is this the real software?", "Yes. Every video is recorded on Infovion School ERP itself, with sample data, not on mock-ups."],
  ["How much does Infovion School ERP cost?", "₹150 per enrolled student per academic year plus GST, with every module and portal included and no setup fee."],
  ["Can we try it ourselves?", "Yes. The 30-day free trial includes every module and sample data, up to 50 students and 10 staff logins, with no card needed."],
];

/** /videos/:slug — a watch page: the video is the main content of the page. */
export function VideoWatch() {
  const { slug } = useParams();
  const v = VIDEOS.find((x) => x.slug === slug);
  if (!v) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-ink px-6 pt-32 text-center">
        <Helmet><title>Video not found — Infovion</title><meta name="robots" content="noindex" /></Helmet>
        <div>
          <h1 className="text-3xl font-bold text-white">That video isn't here</h1>
          <Link to="/videos" className="mt-4 inline-block font-semibold text-teal-300">See all videos →</Link>
        </div>
      </div>
    );
  }
  const url = `${SITE}/videos/${v.slug}`;
  const crumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Videos", item: `${SITE}/videos` },
      { "@type": "ListItem", position: 2, name: v.title, item: url },
    ],
  };
  const more = VIDEOS.filter((x) => x.slug !== v.slug).slice(0, 6);
  const guide = VIDEO_GUIDES[v.slug];
  return (
    <div className="bg-ink">
      <Helmet>
        <title>{v.seoTitle || `${v.title} | Infovion video`}</title>
        <meta name="description" content={v.description} />
        <link rel="canonical" href={url} />
        <meta property="og:type" content="video.other" />
        <meta property="og:url" content={url} />
        <meta property="og:title" content={v.title} />
        <meta property="og:description" content={v.description} />
        <meta property="og:image" content={`${SITE}${videoPoster(v)}`} />
        <meta property="og:video" content={`${SITE}${videoFile(v)}`} />
        <meta property="og:video:type" content="video/mp4" />
        <meta property="og:video:width" content="1280" />
        <meta property="og:video:height" content="720" />
        <script type="application/ld+json">{JSON.stringify(videoSchema(v))}</script>
        <script type="application/ld+json">{JSON.stringify(crumbs)}</script>
        {guide && <script type="application/ld+json">{JSON.stringify(faqSchema(guide.faqs))}</script>}
      </Helmet>

      <section className="relative overflow-hidden pb-16 pt-36 sm:pt-40">
        <Aurora />
        <div className="relative mx-auto max-w-5xl px-5 sm:px-6">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-xs text-slate-400">
            <Link to="/videos" className="hover:text-white">Videos</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="truncate text-slate-300">{v.title}</span>
          </nav>
          <h1 className="mt-4 font-display text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl">{v.title}</h1>

          {/* The video first: Google only lists videos that are the main content of their page */}
          <div className="mt-6 overflow-hidden rounded-2xl bg-black ring-1 ring-white/10 shadow-[0_40px_120px_-50px_rgba(45,212,191,0.5)]">
            <video
              className="aspect-video w-full"
              src={videoFile(v)}
              poster={videoPoster(v)}
              width="1280"
              height="720"
              controls
              playsInline
              preload="metadata"
              aria-label={v.title}
            />
          </div>
          <p className="mt-3 flex items-center gap-2 text-xs text-slate-400"><Clock3 className="h-3.5 w-3.5" /> {clock(v.seconds)} · with voice-over and captions · real screens from Infovion</p>

          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-300">{v.description}</p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <GlowButton to="/free-trial" className="w-full sm:w-auto">Try it in your school, free <ArrowRight className="h-4 w-4" /></GlowButton>
            <GhostButton to={v.related[0]} className="w-full sm:w-auto">{v.related[1]}</GhostButton>
          </div>
          <p className="mt-3 text-xs text-slate-400">30 days free · no card · ₹150 per student per year after</p>

          <section className="mt-12 rounded-2xl bg-white/[0.03] p-6 ring-1 ring-white/10">
            <h2 className="text-lg font-bold text-white">Transcript</h2>
            <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-slate-300">{v.transcript}</p>
          </section>

          {guide && (
            <section className="mt-8 grid gap-8 lg:grid-cols-2">
              <div>
                <h2 className="text-lg font-bold text-white">How it works in Infovion</h2>
                <ol className="mt-4 space-y-2.5">
                  {guide.steps.map((step, i) => (
                    <li key={step} className="flex gap-3 text-[15px] leading-relaxed text-slate-300">
                      <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-teal-300/15 text-xs font-bold text-teal-200">{i + 1}</span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">Questions schools ask</h2>
                <div className="mt-4 space-y-5">
                  {guide.faqs.map(([q, a]) => (
                    <div key={q}>
                      <h3 className="font-semibold text-white">{q}</h3>
                      <p className="mt-1.5 text-[15px] leading-relaxed text-slate-300">{a}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto max-w-5xl px-5 sm:px-6">
          <div className="flex items-end justify-between">
            <h2 className="text-xl font-bold text-white">More videos</h2>
            <Link to="/videos" className="text-sm font-semibold text-teal-300">All videos →</Link>
          </div>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {more.map((x) => <VideoCard key={x.slug} v={x} />)}
          </div>
        </div>
      </section>
    </div>
  );
}

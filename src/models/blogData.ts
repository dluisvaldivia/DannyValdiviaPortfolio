export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string; // HTML
  tags: string[];
  readTime: number; // minutes
  coverImage?: string;
  published?: boolean; // defaults to true for static seed posts
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'why-accessibility-matters',
    title: 'Why Accessibility Matters More Than You Think',
    date: '2026-05-20',
    readTime: 5,
    tags: ['Accessibility', 'WCAG', 'UX'],
    excerpt:
      'Most developers treat accessibility as a checkbox. Here\'s why that mindset costs businesses money — and real users.',
    content: `
<p>When I mention accessibility to a new client, the reaction is almost always the same: a polite nod followed by "sure, we'll add alt text." Accessibility has a perception problem. It's treated like a garnish — something you sprinkle on at the end if there's budget left.</p>

<p>That framing misses the point entirely. Here's what it actually means when a site isn't accessible:</p>

<h3>It's a legal liability</h3>
<p>The <strong>European Accessibility Act (EAA)</strong> came into full force in June 2025. It mandates that digital products and services sold in the EU meet WCAG 2.1 AA standards. Non-compliance carries fines and the right for users to lodge formal complaints. This isn't hypothetical — it's already generating enforcement actions across the continent.</p>
<p>In the US, the ADA has been applied to websites since 2018. Every year, thousands of lawsuits are filed against businesses whose sites screen-reader users couldn't operate.</p>

<h3>It excludes more people than you think</h3>
<p>About 1 in 6 people worldwide lives with some form of disability. But "accessible" benefits far more than that — captions help people in noisy environments, high contrast helps people in bright sunlight, keyboard navigation helps power users. Accessibility is <em>good UX for everyone</em>, not a niche accommodation.</p>

<h3>The ROI is real</h3>
<p>Accessible sites tend to rank better on search engines (semantic HTML, proper heading structure, descriptive links — search engines love the same things screen readers do). They also tend to have lower bounce rates, because they're simpler and clearer.</p>

<h3>Where to start</h3>
<p>If your codebase is a complete accessibility unknown, run it through a WAVE audit or Lighthouse. Fix the critical issues first: missing alt text, insufficient colour contrast, forms with no labels, and keyboard traps. Those four categories cover the vast majority of real-world barriers.</p>

<p>Accessibility isn't a feature. It's a quality bar. Build to it from the start and it costs almost nothing. Retrofit it later and it costs a lot.</p>
    `.trim(),
  },
  {
    slug: 'building-with-ai-how-i-ship-faster',
    title: 'Building with AI: How I Ship Faster Without Cutting Corners',
    date: '2026-06-03',
    readTime: 6,
    tags: ['AI', 'Productivity', 'Development'],
    excerpt:
      'AI tools have changed how I work. Not by replacing judgement — by removing the grunt work that used to slow it down.',
    content: `
<p>There's a version of the "AI in development" conversation that I find useless: the one where someone argues whether AI will replace developers. That debate assumes AI is a substitute for engineering skill. It isn't. It's a multiplier of it.</p>

<p>Here's how I actually use AI day-to-day, and what I've learned about where it helps versus where it creates false confidence.</p>

<h3>Where AI genuinely accelerates work</h3>
<p><strong>Boilerplate and scaffolding.</strong> The first 30 minutes of any feature used to be the most tedious: setting up the file structure, writing the same component skeleton for the fifth time, wiring up the router entry. AI handles all of that in seconds. I describe the component, it gives me the structure, I shape it to fit the actual requirements.</p>

<p><strong>First drafts of tricky logic.</strong> Date manipulation, string parsing, complex array transforms — these are the kinds of problems where I know exactly what the output should look like but the implementation is fiddly to get right. AI gives me something 80% correct that I can verify and fix in a fraction of the time it would take to write from scratch.</p>

<p><strong>Translation and copy.</strong> My portfolio is bilingual (EN/ES). AI drafts the Spanish copy, I review it with native-level fluency, and I fix the handful of things that are technically correct but sound awkward.</p>

<h3>Where I still own the decision</h3>
<p>Architecture, trade-offs, and anything touching user trust. AI doesn't know that the client's backend team uses a specific pattern, or that a particular approach will conflict with the accessibility requirement we're already committed to, or that the "cleaner" solution will be impossible for a junior to maintain six months from now. Those calls require context that lives in my head, not in a prompt.</p>

<p>I also never ship AI-generated code without reading it. Not because I distrust it — because <em>I</em> am responsible for it. If there's a bug or a security hole, "the AI wrote it" is not a defence.</p>

<h3>The actual shift</h3>
<p>The biggest change isn't speed, it's energy. The tedious parts of development used to drain cognitive resources I needed for the hard parts. Offloading the grunt work means I arrive at the genuinely difficult problems fresher. That's the real productivity gain.</p>
    `.trim(),
  },
];

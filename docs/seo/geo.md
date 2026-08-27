# GEO - Generative Engine Optimization

## What is GEO?

Generative Engine Optimization (GEO) is the practice of optimizing content and structure for modern AI search engines like:

- ChatGPT / OpenAI
- Google AI Overviews
- Gemini
- Claude
- Perplexity
- Other future AI answer engines

Unlike traditional SEO (which optimizes for keyword ranking), GEO optimizes for:
- **Accuracy:** AI engines reward factual, well-sourced content
- **Clarity:** Explicit structure AI can parse without ambiguity
- **Authority:** Clear authorship, publication context
- **Relationships:** Entity connections and semantic links
- **Verifiability:** Sources and citations for claims

---

## Architecture Principles

### 1. Semantic HTML First

Important information must exist as actual HTML text, not hidden in:
- Images or canvas
- JavaScript-only interactions
- CSS-hidden content
- Non-semantic markup

**Bad:**
```html
<div class="headline" style="display: none;">Important fact</div>
<img src="fact.png" alt="image" /> <!-- Fact only in image -->
```

**Good:**
```html
<h1>Important Fact</h1>
<p>Explicit, readable text.</p>
<img src="fact.png" alt="Visualization of the important fact" />
```

### 2. Entity Clarity

Entities must be explicit and findable:

```html
<article>
  <h1>Company Profile: TechLogistics Inc</h1>
  <p>TechLogistics Inc provides advanced logistics solutions.</p>
  
  <section>
    <h2>Services</h2>
    <ul>
      <li>Supply chain optimization</li>
      <li>Route planning</li>
      <li>Real-time tracking</li>
    </ul>
  </section>

  <section>
    <h2>Location</h2>
    <p>Headquarters: New York, USA</p>
  </section>
</article>
```

Reinforced with structured data:

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "TechLogistics Inc",
  "description": "Provides advanced logistics solutions",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "New York",
    "addressCountry": "USA"
  }
}
```

### 3. Factual Accuracy

Never fabricate:
- Reviews or ratings
- Authors or credentials
- Dates or timelines
- Statistics or data
- Company information
- Product specifications

AI engines are penalizing content farms and hallucinated information.

### 4. Source Transparency

Make provenance explicit:

```html
<article>
  <h1>Logistics Industry Report 2024</h1>
  
  <div class="metadata">
    <p><strong>Author:</strong> <a href="/authors/jane-smith">Jane Smith</a></p>
    <p><strong>Published:</strong> <time datetime="2024-08-27">August 27, 2024</time></p>
    <p><strong>Updated:</strong> <time datetime="2024-09-01">September 1, 2024</time></p>
    <p><strong>Source:</strong> <a href="https://example.com/original">Original Report</a></p>
  </div>
  
  <section>
    <h2>Key Findings</h2>
    <p>...</p>
    <p><small>Source: <a href="https://industry-org.com">Industry Organization</a></small></p>
  </section>
</article>
```

### 5. Relationship Mapping

Use internal links to show entity relationships:

```html
<p>
  <a href="/companies/techlogistics">TechLogistics Inc</a>
  is headquartered in
  <a href="/locations/new-york">New York</a>
  and specializes in
  <a href="/industries/supply-chain">supply chain optimization</a>.
</p>
```

Reinforced with structured data relationships.

### 6. Answer-Ready Structure

Structure content for direct AI answers:

```html
<article>
  <h1>What Does TechLogistics Do?</h1>
  
  <p>
    <strong>Summary:</strong> TechLogistics Inc provides software and consulting
    services for supply chain optimization and logistics management.
  </p>

  <section>
    <h2>Key Services</h2>
    <ul>
      <li>Route optimization algorithms</li>
      <li>Real-time tracking systems</li>
      <li>Demand forecasting</li>
    </ul>
  </section>

  <section>
    <h2>Founded</h2>
    <p>2015</p>
  </section>

  <section>
    <h2>Headquarters</h2>
    <p>New York, USA</p>
  </section>
</article>
```

AI engines can extract direct answers from this structure.

---

## Content Optimization for AI

### For News/Articles

```html
<article>
  <time datetime="2024-08-27">August 27, 2024</time>
  <h1>Headline</h1>
  
  <!-- Explicit summary for AI extraction -->
  <p class="lead">
    <strong>Summary:</strong> Key fact in 1-2 sentences.
  </p>

  <!-- Body content with clear sections -->
  <h2>Main Development</h2>
  <p>Details...</p>

  <!-- Key facts highlighted -->
  <section>
    <h2>Key Facts</h2>
    <ul>
      <li>Fact 1</li>
      <li>Fact 2</li>
      <li>Fact 3</li>
    </ul>
  </section>

  <!-- Clear attribution -->
  <footer>
    <p>By <a href="/authors/name">Author Name</a></p>
    <p>Source: <a href="source-url">Original Source</a></p>
  </footer>
</article>
```

### For Company Profiles

```html
<article>
  <h1>Company Name</h1>
  
  <div class="company-basics">
    <p><strong>Founded:</strong> Year</p>
    <p><strong>Headquarters:</strong> City, Country</p>
    <p><strong>Industry:</strong> Industry Name</p>
    <p><strong>Employees:</strong> Number (if public)</p>
  </div>

  <p>
    <strong>Overview:</strong> Clear description of what the company does.
  </p>

  <section>
    <h2>Services</h2>
    <ul>
      <!-- Explicit service list -->
    </ul>
  </section>

  <section>
    <h2>Locations</h2>
    <ul>
      <li><a href="/locations/city1">City 1, Country</a></li>
      <li><a href="/locations/city2">City 2, Country</a></li>
    </ul>
  </section>
</article>
```

---

## Technical Implementation

### Structured Data

Always include JSON-LD for entity types:

```typescript
export function generateEntitySchema(entity: Entity): StructuredData {
  switch (entity.type) {
    case "company":
      return {
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": entity.canonicalUrl,
        "name": entity.title,
        "description": entity.description,
        "url": entity.canonicalUrl,
        // ... more properties
      };
    // ... other types
  }
}
```

### Semantic Markup

Use HTML5 semantic tags:

```html
<article>
  <header>
    <h1>Title</h1>
    <time datetime="...">Date</time>
  </header>
  
  <section>
    <h2>Section Title</h2>
    <p>Content</p>
  </section>

  <aside>
    <h3>Related</h3>
    <ul>
      <li><a href="/related">Related Article</a></li>
    </ul>
  </aside>

  <footer>
    <p>By <a href="/author">Author</a></p>
  </footer>
</article>
```

### Canonical URLs

Every entity has a stable canonical URL:

```typescript
const canonicalUrl = `${siteUrl}/companies/${company.slug}`;
```

No query parameters or tracking params in canonical URLs.

---

## Content Guidelines for AI

### ✅ AI-Friendly Content

- Clear, factual writing
- Explicit structure (headings, sections)
- Direct answers to questions
- Source attribution
- Accurate dates and facts
- Meaningful relationships to other entities
- Semantic HTML markup
- Structured data
- Unique content (no duplicates across sites)

### ❌ AI-Hostile Content

- Keyword stuffing
- Thin, low-value content
- Misleading or false claims
- Hidden text or cloaked content
- Auto-generated gibberish
- Duplicate content
- Outdated, stale information
- Undisclosed affiliate content
- AI-generated content without human review
- Hallucinated citations or sources

---

## Monitoring & Iteration

### Metrics to Track

1. **AI Search Appearances:** How often content appears in AI overviews
2. **Accuracy:** Are AI extractions accurate?
3. **Attribution:** Is proper credit given?
4. **Click-through:** Do AI references drive traffic?

### Tools

- Google Search Console (AI Overview appearances)
- Custom AI search testing (search.openai.com, perplexity.ai, etc.)
- Structured Data Testing
- Accessibility audits

### Iteration

As AI search engines evolve, we'll:
- Test new schema types
- Refine content structure
- Monitor what AI prioritizes
- Update guidelines based on learnings

---

## Future: Agentic Content

As AI becomes more agentic (taking actions based on search results):

- **Accuracy is critical:** Misguided agents could act on false information
- **Context matters:** Provide enough context for AI to make correct decisions
- **Responsibility increases:** We're not just informing humans; we're informing AI decision-makers
- **Verification becomes essential:** Sources, citations, and verification become more important

Plan for this evolution now by:
- Making sources explicit
- Structuring content clearly
- Avoiding ambiguity
- Building trust through accuracy

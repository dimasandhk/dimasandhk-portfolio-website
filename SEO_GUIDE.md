# SEO Implementation Guide

This document provides guidance on maintaining and improving the SEO of your portfolio website.

## 📋 What's Been Implemented

### ✅ Core SEO Infrastructure
- **Meta Tags Component** (`src/lib/components/MetaTags.svelte`) - Reusable component for all SEO tags
- **SEO Configuration** (`src/lib/config/seo.ts`) - Centralized SEO settings and defaults
- **Base HTML Tags** (`src/app.html`) - Essential meta tags in the HTML template

### ✅ Page-Specific SEO
All pages now have:
- Unique, descriptive titles
- Compelling meta descriptions (150-160 characters)
- Relevant keywords
- Open Graph tags for social media sharing
- Twitter Card tags
- Canonical URLs
- JSON-LD structured data

### ✅ Advanced Features
- **Person Schema** - Structured data about you as a software engineer
- **WebSite Schema** - Structured data about your portfolio site
- **Sitemap.xml** - XML sitemap for search engines (`/sitemap.xml`)
- **Robots.txt** - Crawler instructions (`/robots.txt`)

## 🔧 Configuration Updates

### Update Your Site URL
In `src/lib/config/seo.ts`, update the `siteUrl` to your production domain:

```typescript
siteUrl: "https://yourdomain.com", // Change this!
```

Also update the URLs in:
- `static/sitemap.xml` - Replace all instances of `https://dimasandhika.vercel.app/`
- `static/robots.txt` - Update the Sitemap URL

### Add a Profile Image
For optimal social media sharing:
1. Create a professional headshot or banner image (1200x630px recommended)
2. Save it to `/static/` (e.g., `/static/og-image.png`)
3. Update `src/lib/config/seo.ts`:

```typescript
image: "/og-image.png",
imageAlt: "Dimas Andhika - Software Engineer",
```

### Update Twitter Handle (Optional)
If you have a Twitter/X account, update in `src/lib/config/seo.ts`:

```typescript
twitterHandle: "@yourusername",
```

## 📝 Adding Alt Text to Images

For better SEO and accessibility, add `alt` attributes to all images:

**Banner Images** - Already have alt text via the `imageAlt` property in MetaTags

**Project Images** - Add alt text in `src/lib/data/projects.ts`:
```typescript
{
  title: "Project Name",
  image: "/projects/project.png",
  imageAlt: "Screenshot of Project Name showing main dashboard", // Add this
  // ...
}
```

**Component Images** - Add alt attributes:
```svelte
<img src="/image.png" alt="Descriptive text about the image" />
```

## 🎯 SEO Best Practices

### Title Tags
- Keep under 60 characters
- Include your name and key skill
- Make each page title unique
- Format: "Page Name - Dimas Andhika"

### Meta Descriptions
- Keep between 150-160 characters
- Include a call-to-action
- Mention key skills or achievements
- Make compelling for click-through

### Keywords
- Focus on 5-10 relevant keywords per page
- Include variations (e.g., "Software Engineer", "Full Stack Developer")
- Don't keyword stuff - use naturally

### Heading Hierarchy
- One `<h1>` per page (usually the page title)
- Use `<h2>` for main sections
- Use `<h3>` for subsections
- Don't skip levels (h1 → h3)

## 🔍 Testing Your SEO

### 1. Meta Tags
- View page source (Ctrl+U / Cmd+U)
- Look for `<meta>` tags in the `<head>`
- Verify title, description, and Open Graph tags

### 2. Structured Data
- Visit [Google Rich Results Test](https://search.google.com/test/rich-results)
- Enter your page URL
- Verify Person and WebSite schemas are valid

### 3. Social Media Previews
- **Facebook/LinkedIn**: [OpenGraph.xyz](https://www.opengraph.xyz/)
- **Twitter**: [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- Enter your URL and check the preview

### 4. Sitemap & Robots.txt
- Visit `http://localhost:5173/sitemap.xml` (dev) or `https://yourdomain.com/sitemap.xml` (production)
- Visit `http://localhost:5173/robots.txt`
- Verify both files are accessible

### 5. Lighthouse SEO Audit
1. Open Chrome DevTools (F12)
2. Go to "Lighthouse" tab
3. Check "SEO" category
4. Click "Analyze page load"
5. Aim for a score of 90+

## 📊 Monitoring SEO Performance

### Google Search Console
1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add your website
3. Submit your sitemap: `https://yourdomain.com/sitemap.xml`
4. Monitor:
   - Search queries
   - Click-through rates
   - Page indexing status
   - Mobile usability

### Analytics
Consider adding:
- Google Analytics 4 for traffic monitoring
- Plausible or Fathom for privacy-friendly analytics

## 🚀 Next Steps for Better SEO

1. **Create a Blog** - Regular content improves SEO
2. **Add More Pages** - About, Contact, Resume pages
3. **Internal Linking** - Link between your pages
4. **External Links** - Link to your GitHub, LinkedIn, etc.
5. **Performance** - Optimize images, use lazy loading
6. **HTTPS** - Ensure your site uses HTTPS (Vercel does this automatically)
7. **Mobile-First** - Your site is already responsive, keep it that way!

## 📚 Resources

- [Google SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
- [Schema.org Documentation](https://schema.org/)
- [Open Graph Protocol](https://ogp.me/)
- [Twitter Cards Documentation](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards)

## 🆘 Troubleshooting

**Meta tags not showing?**
- Clear your browser cache
- Check the page source (Ctrl+U)
- Verify the MetaTags component is imported and used

**Social media preview not updating?**
- Social platforms cache previews for 24-48 hours
- Use the Facebook Debugger to force a refresh
- Ensure your image URLs are absolute (include domain)

**Sitemap not accessible?**
- Check that `sitemap.xml` is in the `/static` folder
- Verify the file has no syntax errors
- Restart your dev server

---

**Need help?** Review the implementation plan or check the component documentation in the codebase.

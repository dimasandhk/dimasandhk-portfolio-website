export interface SEOConfig {
	title: string;
	description: string;
	keywords: string[];
	author: string;
	siteUrl: string;
	siteName: string;
	locale: string;
	type: string;
	image?: string;
	imageAlt?: string;
	twitterHandle?: string;
	twitterCard: 'summary' | 'summary_large_image' | 'app' | 'player';
}

export interface PageSEO {
	title?: string;
	description?: string;
	keywords?: string[];
	image?: string;
	imageAlt?: string;
	url?: string;
	type?: string;
	publishedTime?: string;
	modifiedTime?: string;
}

// Default SEO configuration
export const defaultSEO: SEOConfig = {
	title: "Dimas Andhika Diputra - Software Engineer",
	description: "Passionate Software Engineer specializing in full-stack development with React, Node.js, Python, and modern web technologies. Award-winning developer from Institut Teknologi Sepuluh Nopember Surabaya.",
	keywords: [
		"Dimas Andhika Diputra",
    "Dimas Andhika",
    "Dimas Andhika Diputra - Software Engineer",
    "Dimas Andhika - Software Engineer",
		"Software Engineer",
		"Full Stack Developer",
		"Web Developer",
		"React Developer",
		"Node.js Developer",
		"TypeScript",
		"JavaScript",
		"Python",
		"NextJS",
		"Svelte",
		"Portfolio",
		"ITS Surabaya",
		"Jakarta Indonesia",
		"GEMASTIK",
		"KRTI"
	],
	author: "Dimas Andhika",
	siteUrl: "https://dimasandhika.vercel.app", // Update this with your actual domain
	siteName: "Dimas Andhika's Portfolio",
	locale: "en_US",
	type: "website",
	image: "Banner_Linked_baru.png", // Default OG image
	imageAlt: "Dimas Andhika - Software Engineer Portfolio Banner",
	twitterHandle: "@dimasandhk", // Update with your Twitter handle if you have one
	twitterCard: "summary_large_image"
};

// Social media profiles
export const socialProfiles = {
	linkedin: "https://www.linkedin.com/in/dimasandhk/",
	github: "https://github.com/dimasandhk",
	email: "mailto:dimasandhikadiputra@gmail.com",
	instagram: "https://instagram.com/dimas.andhk"
};

// Page-specific SEO configurations
export const pageSEO = {
	home: {
		title: "Dimas Andhika Diputra - Software Engineer",
		description: "Passionate Software Engineer specializing in full-stack development. Award-winning developer with achievements in GEMASTIK XVIII and KRTI. Open for internship and freelance opportunities.",
		keywords: [
			"Software Engineer Portfolio",
			"Full Stack Developer",
			"React Developer",
			"Node.js Developer",
			"Web Development",
			"Jakarta Developer",
			"ITS Surabaya"
		],
		type: "profile"
	},
	projects: {
		title: "Projects - Dimas Andhika",
		description: "Explore my portfolio of web applications, bots, and innovative solutions. From award-winning smart city projects to full-stack web applications built with modern technologies.",
		keywords: [
			"Web Development Projects",
			"Full Stack Projects",
			"React Projects",
			"Node.js Applications",
			"Smart City Solutions",
			"Portfolio Projects"
		],
		type: "website"
	},
	linktree: {
		title: "Links - Dimas Andhika",
		description: "Connect with me on LinkedIn, GitHub, Instagram, or send me an email. Find all my social media profiles and contact information in one place.",
		keywords: [
			"Contact",
			"Social Media",
			"LinkedIn",
			"GitHub",
			"Developer Links"
		],
		type: "website"
	}
};

// Structured Data - Person Schema
export const personSchema = {
	"@context": "https://schema.org",
	"@type": "Person",
	name: "Dimas Andhika",
	alternateName: "Dimas Andhika Diputra",
	jobTitle: "Software Engineer",
	description: "Passionate Software Engineer specializing in full-stack development with expertise in React, Node.js, Python, and modern web technologies.",
	url: defaultSEO.siteUrl,
	image: `${defaultSEO.siteUrl}${defaultSEO.image}`,
	email: "dimasandhikadiputra@gmail.com",
	address: {
		"@type": "PostalAddress",
		addressLocality: "Jakarta",
		addressCountry: "Indonesia"
	},
	alumniOf: {
		"@type": "Organization",
		name: "Institut Teknologi Sepuluh Nopember",
		sameAs: "https://www.its.ac.id/"
	},
	sameAs: [
		socialProfiles.linkedin,
		socialProfiles.github,
		socialProfiles.instagram
	],
	knowsAbout: [
		"Software Engineering",
		"Full Stack Development",
		"Web Development",
		"JavaScript",
		"TypeScript",
		"React",
		"Node.js",
		"Python",
		"NextJS",
		"Svelte",
		"Docker",
		"Kubernetes"
	]
};

// Structured Data - Website Schema
export const websiteSchema = {
	"@context": "https://schema.org",
	"@type": "WebSite",
	name: defaultSEO.siteName,
	description: defaultSEO.description,
	url: defaultSEO.siteUrl,
	author: {
		"@type": "Person",
		name: defaultSEO.author
	},
	inLanguage: "en-US",
	potentialAction: {
		"@type": "SearchAction",
		target: {
			"@type": "EntryPoint",
			urlTemplate: `${defaultSEO.siteUrl}/projects?q={search_term_string}`
		},
		"query-input": "required name=search_term_string"
	}
};

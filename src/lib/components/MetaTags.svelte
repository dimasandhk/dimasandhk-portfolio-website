<script lang="ts">
	import { defaultSEO, type PageSEO } from '$lib/config/seo';
	import { page } from '$app/stores';

	interface Props {
		title?: string;
		description?: string;
		keywords?: string[];
		image?: string;
		imageAlt?: string;
		type?: string;
		publishedTime?: string;
		modifiedTime?: string;
		noindex?: boolean;
		nofollow?: boolean;
		jsonLd?: object;
	}

	let {
		title = defaultSEO.title,
		description = defaultSEO.description,
		keywords = defaultSEO.keywords,
		image = defaultSEO.image,
		imageAlt = defaultSEO.imageAlt,
		type = defaultSEO.type,
		publishedTime,
		modifiedTime,
		noindex = false,
		nofollow = false,
		jsonLd
	}: Props = $props();

	// Construct full URL for current page
	const currentUrl = $derived(`${defaultSEO.siteUrl}${$page.url.pathname}`);
	
	// Construct full image URL
	const fullImageUrl = $derived(
		image?.startsWith('http') ? image : `${defaultSEO.siteUrl}${image}`
	);

	// Construct robots meta content
	const robotsContent = $derived(() => {
		const directives = [];
		if (noindex) directives.push('noindex');
		if (nofollow) directives.push('nofollow');
		if (directives.length === 0) return 'index, follow';
		return directives.join(', ');
	});
</script>

<svelte:head>
	<!-- Primary Meta Tags -->
	<title>{title}</title>
	<meta name="title" content={title} />
	<meta name="description" content={description} />
	<meta name="keywords" content={keywords.join(', ')} />
	<meta name="author" content={defaultSEO.author} />
	<meta name="robots" content={robotsContent()} />
	<link rel="canonical" href={currentUrl} />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content={type} />
	<meta property="og:url" content={currentUrl} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={fullImageUrl} />
	<meta property="og:image:alt" content={imageAlt} />
	<meta property="og:site_name" content={defaultSEO.siteName} />
	<meta property="og:locale" content={defaultSEO.locale} />
	{#if publishedTime}
		<meta property="article:published_time" content={publishedTime} />
	{/if}
	{#if modifiedTime}
		<meta property="article:modified_time" content={modifiedTime} />
	{/if}

	<!-- Twitter -->
	<meta name="twitter:card" content={defaultSEO.twitterCard} />
	<meta name="twitter:url" content={currentUrl} />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={fullImageUrl} />
	<meta name="twitter:image:alt" content={imageAlt} />
	{#if defaultSEO.twitterHandle}
		<meta name="twitter:creator" content={defaultSEO.twitterHandle} />
		<meta name="twitter:site" content={defaultSEO.twitterHandle} />
	{/if}

	<!-- Additional SEO -->
	<meta name="theme-color" content="#191919" />
	<meta name="color-scheme" content="dark light" />

	<!-- JSON-LD Structured Data -->
	{#if jsonLd}
		{@html `<script type="application/ld+json">${JSON.stringify(jsonLd)}<\/script>`}
	{/if}
</svelte:head>

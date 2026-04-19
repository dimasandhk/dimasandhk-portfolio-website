<script lang="ts">
	import NotionPage from '$lib/components/NotionPage.svelte';
	import NotionBlock from '$lib/components/NotionBlock.svelte';
	import NotionGallery from '$lib/components/NotionGallery.svelte';
	import GithubContributions from '$lib/components/GithubContributions.svelte';
	import MetaTags from '$lib/components/MetaTags.svelte';
	import AppWindow from 'lucide-svelte/icons/app-window';
	import Server from 'lucide-svelte/icons/server';
	import Terminal from 'lucide-svelte/icons/terminal';
	import LayoutGrid from 'lucide-svelte/icons/layout-grid';
	import List from 'lucide-svelte/icons/list';
	import { pageSEO, personSchema } from '$lib/config/seo';
	import ArrowUp from 'lucide-svelte/icons/arrow-up';
	import FileCode from 'lucide-svelte/icons/file-code';
	import FileCode2 from 'lucide-svelte/icons/file-code-2';
	import Atom from 'lucide-svelte/icons/atom';
	import Triangle from 'lucide-svelte/icons/triangle';
	import Component from 'lucide-svelte/icons/component';
	import Flame from 'lucide-svelte/icons/flame';
	import Palette from 'lucide-svelte/icons/palette';
	import TestTube from 'lucide-svelte/icons/test-tube';
	import Smartphone from 'lucide-svelte/icons/smartphone';
	import Hexagon from 'lucide-svelte/icons/hexagon';
	import ServerCog from 'lucide-svelte/icons/server-cog';
	import Box from 'lucide-svelte/icons/box';
	import FlaskConical from 'lucide-svelte/icons/flask-conical';
	import Code from 'lucide-svelte/icons/code';
	import Zap from 'lucide-svelte/icons/zap';
	import Database from 'lucide-svelte/icons/database';
	import Leaf from 'lucide-svelte/icons/leaf';
	import CloudRain from 'lucide-svelte/icons/cloud-rain';
	import CircleDot from 'lucide-svelte/icons/circle-dot';
	import Cloud from 'lucide-svelte/icons/cloud';
	import Container from 'lucide-svelte/icons/container';
	import Network from 'lucide-svelte/icons/network';
	import GitBranch from 'lucide-svelte/icons/git-branch';
	import Github from 'lucide-svelte/icons/github';
	import Wrench from 'lucide-svelte/icons/wrench';
	import experienceData from '$lib/data/experience.json';

	let viewMode = $state<'gallery' | 'list'>('gallery');

	import { projects } from '$lib/data/projects.js';

	const featuredProjects = projects.filter((p) => p.featured);

	let scrollY = $state(0);

	function scrollToTop() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}
</script>

<MetaTags
	title={pageSEO.home.title}
	description={pageSEO.home.description}
	keywords={pageSEO.home.keywords}
	type={pageSEO.home.type}
	jsonLd={personSchema}
/>

<NotionPage
	title="Dimas Andhika's Portfolio"
	icon="👋"
	coverImage="/Banner_Linked_baru.png"
	mobileCoverImage="/Banner_Linked_mobile.png"
	domicile="Jakarta, Indonesia | GMT+7"
>
	<!-- <NotionBlock> -->
	<!-- <div class="h-4"></div> Spacer -->
	<!-- </NotionBlock> -->

	<NotionBlock>
		<h2 class="text-2xl font-semibold mb-2 mt-4 text-[var(--notion-text)]">About Me</h2>
	</NotionBlock>
	<NotionBlock>
		<p class="text-[16px] leading-[1.5]">
			Hi there! I'm <span class="font-bold text-[var(--notion-text)]">Dimas</span> Andhika a
			passionate <span class="font-bold text-[var(--notion-text)]">Software Engineer</span> who loves
			building something that is useful and innovative as well as considering best practice for a clean,
			secure, and maintainable codebase. A third-year undergraduate at Institute Technology of Sepuluh
			Nopember Surabaya, studying Information Technology. Experienced in software engineering, and collaborative
			work, supported by a strong academic and non-academic track, as well as intra- and interpersonal
			skills.
		</p>
	</NotionBlock>

	<NotionBlock>
		<div
			class="bg-[var(--notion-gray)] p-4 rounded mt-4 mb-4 border border-[var(--notion-border)] flex items-start"
		>
			<span class="mr-2 flex-shrink-0">💡</span>
			<span class="font-medium text-[var(--notion-text)]"
				>Currently open for Internship or Freelance opportunities! Hit me up on <a
					href="https://www.linkedin.com/in/dimasandhk/"
					target="_blank"
					rel="noopener noreferrer"
					class="underline hover:text-gray-600">LinkedIn</a
				>
				or
				<a href="mailto:dimasandhikadiputra@gmail.com" class="underline hover:text-gray-600"
					>Email</a
				>!</span
			>
		</div>
	</NotionBlock>

	<!-- Skills Section -->
	<NotionBlock>
		<div class="flex items-center gap-2 border-b border-[var(--notion-border)] pb-2 mb-4 mt-8">
			<span class="text-xl">🛠️</span>
			<h2 class="text-xl font-semibold text-[var(--notion-text)]">Skills</h2>
		</div>
	</NotionBlock>

	<div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 items-start">
		<div class="flex flex-col gap-2">
			<div class="flex items-center gap-2 font-medium text-[var(--notion-text)] mb-1 pl-1">
				<AppWindow size={18} />
				Frontend
			</div>
			<div class="flex flex-wrap gap-2">
				<div
					class="flex items-center gap-1.5 bg-[var(--notion-gray)] px-2.5 py-1.5 rounded text-sm text-[var(--notion-text)] border border-[var(--notion-border)]"
				>
					<FileCode size={14} /> Javascript
				</div>
				<div
					class="flex items-center gap-1.5 bg-[var(--notion-gray)] px-2.5 py-1.5 rounded text-sm text-[var(--notion-text)] border border-[var(--notion-border)]"
				>
					<FileCode2 size={14} /> Typescript
				</div>
				<div
					class="flex items-center gap-1.5 bg-[var(--notion-gray)] px-2.5 py-1.5 rounded text-sm text-[var(--notion-text)] border border-[var(--notion-border)]"
				>
					<Atom size={14} /> ReactJS
				</div>
				<div
					class="flex items-center gap-1.5 bg-[var(--notion-gray)] px-2.5 py-1.5 rounded text-sm text-[var(--notion-text)] border border-[var(--notion-border)]"
				>
					<Triangle size={14} /> NextJS
				</div>
				<div
					class="flex items-center gap-1.5 bg-[var(--notion-gray)] px-2.5 py-1.5 rounded text-sm text-[var(--notion-text)] border border-[var(--notion-border)]"
				>
					<Component size={14} /> VueJS
				</div>
				<div
					class="flex items-center gap-1.5 bg-[var(--notion-gray)] px-2.5 py-1.5 rounded text-sm text-[var(--notion-text)] border border-[var(--notion-border)]"
				>
					<Flame size={14} /> Svelte
				</div>
				<div
					class="flex items-center gap-1.5 bg-[var(--notion-gray)] px-2.5 py-1.5 rounded text-sm text-[var(--notion-text)] border border-[var(--notion-border)]"
				>
					<Palette size={14} /> Tailwind CSS
				</div>
				<div
					class="flex items-center gap-1.5 bg-[var(--notion-gray)] px-2.5 py-1.5 rounded text-sm text-[var(--notion-text)] border border-[var(--notion-border)]"
				>
					<TestTube size={14} /> Vitest
				</div>
				<div
					class="flex items-center gap-1.5 bg-[var(--notion-gray)] px-2.5 py-1.5 rounded text-sm text-[var(--notion-text)] border border-[var(--notion-border)]"
				>
					<Smartphone size={14} /> React Native
				</div>
			</div>
		</div>
		<div class="flex flex-col gap-2">
			<div class="flex items-center gap-2 font-medium text-[var(--notion-text)] mb-1 pl-1">
				<Server size={18} />
				Backend
			</div>
			<div class="flex flex-wrap gap-2">
				<div
					class="flex items-center gap-1.5 bg-[var(--notion-gray)] px-2.5 py-1.5 rounded text-sm text-[var(--notion-text)] border border-[var(--notion-border)]"
				>
					<Hexagon size={14} /> NodeJS
				</div>
				<div
					class="flex items-center gap-1.5 bg-[var(--notion-gray)] px-2.5 py-1.5 rounded text-sm text-[var(--notion-text)] border border-[var(--notion-border)]"
				>
					<ServerCog size={14} /> ExpressJS
				</div>
				<div
					class="flex items-center gap-1.5 bg-[var(--notion-gray)] px-2.5 py-1.5 rounded text-sm text-[var(--notion-text)] border border-[var(--notion-border)]"
				>
					<Box size={14} /> NestJS
				</div>
				<div
					class="flex items-center gap-1.5 bg-[var(--notion-gray)] px-2.5 py-1.5 rounded text-sm text-[var(--notion-text)] border border-[var(--notion-border)]"
				>
					<FlaskConical size={14} /> Flask
				</div>
				<div
					class="flex items-center gap-1.5 bg-[var(--notion-gray)] px-2.5 py-1.5 rounded text-sm text-[var(--notion-text)] border border-[var(--notion-border)]"
				>
					<Code size={14} /> Django
				</div>
				<div
					class="flex items-center gap-1.5 bg-[var(--notion-gray)] px-2.5 py-1.5 rounded text-sm text-[var(--notion-text)] border border-[var(--notion-border)]"
				>
					<Zap size={14} /> Fiber (Go)
				</div>
				<div
					class="flex items-center gap-1.5 bg-[var(--notion-gray)] px-2.5 py-1.5 rounded text-sm text-[var(--notion-text)] border border-[var(--notion-border)]"
				>
					<Database size={14} /> MySQL
				</div>
				<div
					class="flex items-center gap-1.5 bg-[var(--notion-gray)] px-2.5 py-1.5 rounded text-sm text-[var(--notion-text)] border border-[var(--notion-border)]"
				>
					<Leaf size={14} /> MongoDB
				</div>
				<div
					class="flex items-center gap-1.5 bg-[var(--notion-gray)] px-2.5 py-1.5 rounded text-sm text-[var(--notion-text)] border border-[var(--notion-border)]"
				>
					<Database size={14} /> PostgreSQL
				</div>
				<div
					class="flex items-center gap-1.5 bg-[var(--notion-gray)] px-2.5 py-1.5 rounded text-sm text-[var(--notion-text)] border border-[var(--notion-border)]"
				>
					<Triangle size={14} /> Prisma
				</div>
				<div
					class="flex items-center gap-1.5 bg-[var(--notion-gray)] px-2.5 py-1.5 rounded text-sm text-[var(--notion-text)] border border-[var(--notion-border)]"
				>
					<CloudRain size={14} /> Drizzle
				</div>
				<div
					class="flex items-center gap-1.5 bg-[var(--notion-gray)] px-2.5 py-1.5 rounded text-sm text-[var(--notion-text)] border border-[var(--notion-border)]"
				>
					<Database size={14} /> Mongoose
				</div>
			</div>
		</div>
		<div class="flex flex-col gap-2">
			<div class="flex items-center gap-2 font-medium text-[var(--notion-text)] mb-1 pl-1">
				<Terminal size={18} />
				DevOps & Tools
			</div>
			<div class="flex flex-wrap gap-2">
				<div
					class="flex items-center gap-1.5 bg-[var(--notion-gray)] px-2.5 py-1.5 rounded text-sm text-[var(--notion-text)] border border-[var(--notion-border)]"
				>
					<CircleDot size={14} /> Ubuntu
				</div>
				<div
					class="flex items-center gap-1.5 bg-[var(--notion-gray)] px-2.5 py-1.5 rounded text-sm text-[var(--notion-text)] border border-[var(--notion-border)]"
				>
					<Cloud size={14} /> CloudFlare
				</div>
				<div
					class="flex items-center gap-1.5 bg-[var(--notion-gray)] px-2.5 py-1.5 rounded text-sm text-[var(--notion-text)] border border-[var(--notion-border)]"
				>
					<Container size={14} /> Docker
				</div>
				<div
					class="flex items-center gap-1.5 bg-[var(--notion-gray)] px-2.5 py-1.5 rounded text-sm text-[var(--notion-text)] border border-[var(--notion-border)]"
				>
					<Network size={14} /> Kubernetes
				</div>
				<div
					class="flex items-center gap-1.5 bg-[var(--notion-gray)] px-2.5 py-1.5 rounded text-sm text-[var(--notion-text)] border border-[var(--notion-border)]"
				>
					<GitBranch size={14} /> Git
				</div>
				<div
					class="flex items-center gap-1.5 bg-[var(--notion-gray)] px-2.5 py-1.5 rounded text-sm text-[var(--notion-text)] border border-[var(--notion-border)]"
				>
					<Github size={14} /> GitHub Actions
				</div>
				<div
					class="flex items-center gap-1.5 bg-[var(--notion-gray)] px-2.5 py-1.5 rounded text-sm text-[var(--notion-text)] border border-[var(--notion-border)]"
				>
					<Box size={14} /> Vagrant
				</div>
				<div
					class="flex items-center gap-1.5 bg-[var(--notion-gray)] px-2.5 py-1.5 rounded text-sm text-[var(--notion-text)] border border-[var(--notion-border)]"
				>
					<Wrench size={14} /> Ansible
				</div>
			</div>
		</div>
	</div>

	<NotionBlock>
		<div
			class="bg-[var(--notion-gray)] p-3 rounded mt-2 mb-8 flex items-start gap-3 text-[15px] text-[var(--notion-text)]"
		>
			<span class="mt-0.5 flex-shrink-0">🌱</span>
			<span class="font-medium">
				I'm always eager to learn! I am open to challenging opportunities that require diving into
				new fields and mastering new technologies.
			</span>
		</div>
	</NotionBlock>

	<!-- Experience Section -->
	<NotionBlock>
		<div class="flex items-center gap-2 border-b border-[var(--notion-border)] pb-2 mb-4 mt-8">
			<span class="text-xl">💼</span>
			<h2 class="text-xl font-semibold text-[var(--notion-text)]">Experience</h2>
		</div>
	</NotionBlock>

	<div class="mb-8 flex flex-col gap-6">
		{#each experienceData as exp}
			<div class="flex flex-col gap-1">
				<div class="flex items-center gap-2">
					<h3 class="text-lg font-semibold text-[var(--notion-text)]">{exp.company}</h3>
					{#if exp.totalDuration}
						<span class="text-sm text-[#9b9a97] italic ml-2">({exp.totalDuration})</span>
					{/if}
				</div>

				{#each exp.roles as role}
					<div class="mt-2 pl-4 border-l-2 border-[var(--notion-border)]">
						<div class="font-medium text-[var(--notion-text)]">{role.title}</div>
						<div class="text-sm text-[#9b9a97] mb-1">{role.duration} • {role.location}</div>
						{#if role.tasks && role.tasks.length > 0}
							<ul class="list-disc pl-5 mt-1 space-y-1 text-sm text-[var(--notion-text)]">
								{#each role.tasks as task}
									<li>{task}</li>
								{/each}
							</ul>
						{/if}
					</div>
				{/each}
			</div>
		{/each}
	</div>

	<!-- Achievements Section -->
	<NotionBlock>
		<div class="flex items-center gap-2 border-b border-[var(--notion-border)] pb-2 mb-4 mt-8">
			<span class="text-xl">🏆</span>
			<h2 class="text-xl font-semibold text-[var(--notion-text)]">Achievements</h2>
			<a
				href="/projects"
				class="ml-auto flex items-center gap-1 text-xs text-[#9b9a97] hover:bg-[var(--notion-hover)] px-2 py-1 rounded transition-colors no-underline"
			>
				<span>More details on /projects</span>
				<span class="text-[10px]">↗</span>
			</a>
		</div>
	</NotionBlock>

	<NotionBlock>
		<ul class="list-disc pl-6 space-y-2 text-[var(--notion-text)]">
			<li>
				<span class="font-medium">2nd Place on GEMASTIK XVIII Smart City Division (2025)</span> - Developed
				an innovative smart city solution for Jakarta's flood control system.
			</li>
			<li>
				<span class="font-medium">2nd Place on Technology Development - KRTI (2025)</span> - Designed
				and implemented advanced control systems for unmanned aerial vehicles for disaster surveillance
				and response.
			</li>
			<li>
				<span class="font-medium"
					>3rd Place on Web Development Hackathon Fit Competition 2025 - UKSW</span
				> - Developed an interactive mapping platform designed to translate complex environmental data
				into intuitive, personalized visuals
			</li>
			<li>
				<span class="font-medium"
					>Finalist Teknofest 2025 International UAV Competition Free Mission Category</span
				> - Finalist in the International UAV Competition Free Mission Category, showcasing a custom auto
				mapping flight, autonomous system, and cloud surveillance system.
			</li>
			<li>
				<span class="font-medium"
					>Best Methodology Award on Technology Development - KRTI (2024)</span
				> - Recognized for comprehensive methodology of our innovation and systematic engineering approach.
			</li>
		</ul>
	</NotionBlock>

	<NotionBlock>
		<div class="h-6"></div>
	</NotionBlock>

	<NotionBlock>
		<div class="flex items-center gap-2 border-b border-[var(--notion-border)] pb-2 mb-4 mt-8">
			<span class="text-xl">🚀</span>
			<h2 class="text-xl font-semibold text-[var(--notion-text)]">Selected Projects</h2>
			<button
				class="ml-auto flex items-center gap-1 text-xs text-[#9b9a97] hover:bg-[var(--notion-hover)] px-2 py-1 rounded transition-colors"
				onclick={() => (viewMode = viewMode === 'gallery' ? 'list' : 'gallery')}
			>
				{#if viewMode === 'gallery'}
					<List size={14} />
					<span>List View</span>
				{:else}
					<LayoutGrid size={14} />
					<span>Gallery View</span>
				{/if}
			</button>
		</div>
	</NotionBlock>

	<NotionGallery items={featuredProjects} {viewMode} showViewMore={true} />

	<NotionBlock>
		<div class="h-6"></div>
	</NotionBlock>

	<GithubContributions />

	<NotionBlock>
		<div class="text-sm text-[#9b9a97] mt-12 mb-8 border-t border-[var(--notion-border)] pt-4">
			Built with 💓 by Dimas Andhika himself • {new Date().getFullYear()}
		</div>
	</NotionBlock>
</NotionPage>

<svelte:window bind:scrollY />

{#if scrollY > 300}
	<button
		class="fixed bottom-8 right-8 p-3 bg-[var(--notion-bg)] shadow-lg rounded-full border border-[var(--notion-border)] text-[var(--notion-text)] hover:bg-[var(--notion-hover)] transition-all z-50 cursor-pointer"
		onclick={scrollToTop}
		aria-label="Back to top"
	>
		<ArrowUp size={20} />
	</button>
{/if}

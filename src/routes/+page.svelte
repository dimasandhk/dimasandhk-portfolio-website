<script lang="ts">
    import NotionPage from '$lib/components/NotionPage.svelte';
    import NotionBlock from '$lib/components/NotionBlock.svelte';
    import NotionGallery from '$lib/components/NotionGallery.svelte';
    import GithubContributions from '$lib/components/GithubContributions.svelte';
    import AppWindow from 'lucide-svelte/icons/app-window';
    import Server from 'lucide-svelte/icons/server';
    import Terminal from 'lucide-svelte/icons/terminal';

    const projects = [
        {
            title: "E-Commerce Dashboard",
            tags: ["React", "Dashboard", "Sales"],
            image: ""
        },
        {
            title: "Social Media App",
            tags: ["Mobile", "Flutter", "Social"],
             image: ""
        },
        {
            title: "Portfolio 2024",
            tags: ["SvelteKit", "Design", "Vercel"],
             image: ""
        },
        {
            title: "AI Chat Interface",
            tags: ["OpenAI", "Next.js", "Streaming"],
             image: ""
        }
    ];
</script>

<NotionPage title="Dimas Andhika's Portfolio" icon="👋" coverImage="/Banner_Linked_baru.png">
    <!-- <NotionBlock> -->
        <!-- <div class="h-4"></div> Spacer -->
    <!-- </NotionBlock> -->

    <NotionBlock>
        <h2 class="text-2xl font-semibold mb-2 mt-4 text-[#37352f]">About Me</h2>
    </NotionBlock>
    <NotionBlock>
        <p class="text-[16px] leading-[1.5]">
            Hi there! I'm Dimas Andhika a passionate software engineer who loves building something that is useful and innovative as well as considering best practice for a clean codebase. A third-year undergraduate at Institute Technology of Sepuluh Nopember Surabaya, studying Information Technology. Experienced in software engineering, and collaborative work, supported by a strong academic and non-academic track, as well as intra- and interpersonal skills.
        </p>
    </NotionBlock>

    <NotionBlock>
       <div class="bg-[#f1f1ef] p-4 rounded mt-4 mb-4 border border-[#e9e9e7] flex items-start">
           <span class="mr-2 flex-shrink-0">💡</span> 
           <span class="font-medium">Currently open for Internship or Freelance opportunities! Hit me up on <a href="https://www.linkedin.com/in/dimasandhk/" target="_blank" rel="noopener noreferrer" class="underline hover:text-gray-600">LinkedIn</a> or <a href="mailto:dimasandhikadiputra@gmail.com" class="underline hover:text-gray-600">Email</a>!</span>
       </div>
    </NotionBlock>

    <!-- Skills Section -->
     <NotionBlock>
        <div class="flex items-center gap-2 border-b border-[#e9e9e7] pb-2 mb-4 mt-8">
            <span class="text-xl">🛠️</span>
            <h2 class="text-xl font-semibold text-[#37352f]">Skills</h2>
        </div>
    </NotionBlock>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="flex flex-col gap-2">
            <div class="flex items-center gap-2 font-medium text-[#37352f] mb-1 pl-1">
                <AppWindow size={18} />
                Frontend
            </div>
            <div class="bg-[#f7f7f5] p-3 rounded text-sm text-[#37352f] leading-relaxed">
                Javascript • Typescript<br>
                ReactJS • NextJS • VueJS<br>
                Svelte • Tailwind CSS
            </div>
        </div>
        <div class="flex flex-col gap-2">
            <div class="flex items-center gap-2 font-medium text-[#37352f] mb-1 pl-1">
                <Server size={18} />
                Backend
            </div>
            <div class="bg-[#f7f7f5] p-3 rounded text-sm text-[#37352f] leading-relaxed">
                NodeJS • ExpressJS • NestJS<br>
                Python • Flask • Django<br>
                MySQL • NoSQL • Firebase<br>
                C • C++
            </div>
        </div>
        <div class="flex flex-col gap-2">
            <div class="flex items-center gap-2 font-medium text-[#37352f] mb-1 pl-1">
                <Terminal size={18} />
                DevOps & Tools
            </div>
            <div class="bg-[#f7f7f5] p-3 rounded text-sm text-[#37352f] leading-relaxed">
                Git • GitHub • Actions<br>
                Docker • Kubernetes<br>
                Ubuntu • CloudFlare<br>
                Jupyter
            </div>
        </div>
    </div>

    <NotionBlock>
       <div class="bg-[#f1f1ef] p-3 rounded mt-2 mb-8 flex items-start gap-3 text-[15px] text-[#37352f]">
           <span class="mt-0.5 flex-shrink-0">🌱</span> 
           <span class="font-medium">
               I'm always eager to learn! I am open to challenging opportunities that require diving into new fields and mastering new technologies.
           </span>
       </div>
    </NotionBlock>

    <!-- Achievements Section -->
    <NotionBlock>
        <div class="flex items-center gap-2 border-b border-[#e9e9e7] pb-2 mb-4 mt-8">
            <span class="text-xl">🏆</span>
            <h2 class="text-xl font-semibold text-[#37352f]">Achievements</h2>
        </div>
    </NotionBlock>

    <NotionBlock>
        <ul class="list-disc pl-6 space-y-2 text-[#37352f]">
            <li>
                <span class="font-medium">2nd Place on GEMASTIK XVIII Smart City Division (2025)</span> - Developed an innovative smart city solution for Jakarta's flood control system.
            </li>
            <li>
                <span class="font-medium">2nd Place on Technology Development - KRTI (2025)</span> - Designed and implemented advanced control systems for unmanned aerial vehicles for disaster surveillance and response.
            </li>
            <li>
                <span class="font-medium">3rd Place on Web Development Hackathon Fit Competition 2025 - UKSW</span> - Developed an interactive mapping platform designed to translate complex environmental data into intuitive, personalized visuals
            </li>
            <li>
                <span class="font-medium">Best Methodology Award on Technology Development - KRTI (2024)</span> - Recognized for comprehensive methodology of our innovation and systematic engineering approach.
            </li>
        </ul>
    </NotionBlock>

    <NotionBlock>
        <div class="h-6"></div> 
    </NotionBlock>

    <NotionBlock>
        <div class="flex items-center gap-2 border-b border-[#e9e9e7] pb-2 mb-4 mt-8">
            <span class="text-xl">🚀</span>
            <h2 class="text-xl font-semibold text-[#37352f]">Selected Projects</h2>
             <span class="ml-auto text-xs text-[#9b9a97]">Gallery View</span>
        </div>
    </NotionBlock>

    <NotionGallery items={projects} />

    <GithubContributions />

    <NotionBlock>
        <div class="text-sm text-[#9b9a97] mt-12 mb-8 border-t border-[#e9e9e7] pt-4">
            Built with 💓 by Dimas Andhika himself • {new Date().getFullYear()}
        </div>
    </NotionBlock>
</NotionPage>

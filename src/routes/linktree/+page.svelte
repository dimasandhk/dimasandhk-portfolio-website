<script lang="ts">
    import NotionPage from '$lib/components/NotionPage.svelte';
    import NotionBlock from '$lib/components/NotionBlock.svelte';
    import House from 'lucide-svelte/icons/house';
    import Github from 'lucide-svelte/icons/github';
    import Linkedin from 'lucide-svelte/icons/linkedin';
    import Mail from 'lucide-svelte/icons/mail';
    import Instagram from 'lucide-svelte/icons/instagram';
    import ExternalLink from 'lucide-svelte/icons/external-link';

    const links = [
        { 
            label: "Main Portfolio", 
            url: "/", 
            icon: House,
            desc: "Back to my main website"
        },
        { 
            label: "LinkedIn", 
            url: "https://www.linkedin.com/in/dimasandhk/", 
            icon: Linkedin,
            desc: "Connect with me professionally"
        },
        { 
            label: "GitHub", 
            url: "https://github.com/dimasandhk", 
            icon: Github,
            desc: "Check out my open source work"
        },
        { 
            label: "Email", 
            url: "mailto:dimasandhikadiputra@gmail.com", 
            icon: Mail,
            desc: "Get in touch directly"
        },
        { 
            label: "Instagram", 
            url: "https://instagram.com/dimas.andhk", 
            icon: Instagram,
            desc: "Follow my daily updates"
        }
    ];

    let videos = $state<any[]>([]);
    
    import { onMount } from 'svelte';

    onMount(async () => {
        try {
            const res = await fetch('https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UCNqSlVr9_fJ-682ILT-MBHA&maxResults=2&order=date&type=video&key=AIzaSyCSIVIRw-guAKkBQEVCdQenaOg24skiboM');
            if (res.ok) {
                const data = await res.json();
                videos = data.items;
            }
        } catch (e) {
            console.error('Failed to fetch videos', e);
        }
    });
</script>

<NotionPage title="Links" icon="🔗" coverImage="/Banner_Linked_baru.png" mobileCoverImage="/Banner_Linked_mobile.png" domicile="Jakarta, Indonesia | GMT+7">
    <NotionBlock>
        <p class="text-[16px] leading-[1.5] mb-6">
            Everything you need to find me on the internet.
        </p>
    </NotionBlock>

    <div class="flex flex-col gap-3">
        {#each links as link}
            {@const Icon = link.icon}
            <NotionBlock>
                <a 
                    href={link.url} 
                    target={link.url.startsWith('/') ? '_self' : '_blank'} 
                    rel={link.url.startsWith('/') ? '' : 'noopener noreferrer'}
                    class="flex items-center gap-4 p-3 rounded hover:bg-[var(--notion-hover)] border border-transparent hover:border-[var(--notion-border)] transition-all group"
                >
                    <div class="flex items-center justify-center w-10 h-10 rounded bg-[var(--notion-bg)] border border-[var(--notion-border)] shadow-sm text-[var(--notion-text)]">
                        <Icon size={20} />
                    </div>
                    
                    <div class="flex flex-col flex-1">
                        <span class="font-medium text-[var(--notion-text)] group-hover:text-[var(--notion-text)]">{link.label}</span>
                        <span class="text-xs text-[#9b9a97]">{link.desc}</span>
                    </div>

                    <div class="text-[#9b9a97] opacity-0 group-hover:opacity-100 transition-opacity">
                        <ExternalLink size={16} />
                    </div>
                </a>
            </NotionBlock>
        {/each}
    </div>

    {#if videos.length > 0}
        <NotionBlock>
            <div class="flex items-center gap-2 border-b border-[var(--notion-border)] pb-2 mb-4 mt-8">
                <span class="text-xl">📺</span>
                <h2 class="text-xl font-semibold text-[var(--notion-text)]">Latest Videos</h2>
            </div>
        </NotionBlock>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            {#each videos as video}
                <NotionBlock>
                    <div class="rounded-lg overflow-hidden border border-[var(--notion-border)] bg-[var(--notion-bg)]">
                         <div class="aspect-video w-full">
                            <iframe 
                                width="100%" 
                                height="100%" 
                                src={`https://www.youtube.com/embed/${video.id.videoId}`} 
                                title={video.snippet.title} 
                                frameborder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                allowfullscreen
                            ></iframe>
                        </div>
                        <div class="p-3">
                             <a href={`https://www.youtube.com/watch?v=${video.id.videoId}`} target="_blank" rel="noopener noreferrer" class="font-medium text-[var(--notion-text)] hover:underline line-clamp-2">
                                {video.snippet.title}
                            </a>
                            <div class="text-xs text-[#9b9a97] mt-1">
                                {new Date(video.snippet.publishedAt).toLocaleDateString()}
                            </div>
                        </div>
                    </div>
                </NotionBlock>
            {/each}
        </div>
    {/if}
    
    <NotionBlock>
        <div class="text-sm text-[#9b9a97] mt-12 mb-8 border-t border-[var(--notion-border)] pt-4 text-center">
            © {new Date().getFullYear()} Dimas Andhika
        </div>
    </NotionBlock>
</NotionPage>

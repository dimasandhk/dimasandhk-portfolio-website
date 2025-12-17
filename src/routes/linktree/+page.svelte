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
</script>

<NotionPage title="Links" icon="🔗" coverImage="/Banner_Linked_baru.png" mobileCoverImage="/Banner_Linked_mobile.png" domicile="Jakarta, Indonesia | GMT+7">
    <NotionBlock>
        <p class="text-[16px] leading-[1.5] mb-6">
            Everything you need to find me on the internet.
        </p>
    </NotionBlock>

    <div class="flex flex-col gap-3">
        {#each links as link}
            <NotionBlock>
                <a 
                    href={link.url} 
                    target={link.url.startsWith('/') ? '_self' : '_blank'} 
                    rel={link.url.startsWith('/') ? '' : 'noopener noreferrer'}
                    class="flex items-center gap-4 p-3 rounded hover:bg-[#f1f1ef] border border-transparent hover:border-[#e9e9e7] transition-all group"
                >
                    <div class="flex items-center justify-center w-10 h-10 rounded bg-white border border-[#e9e9e7] shadow-sm text-[#37352f]">
                        <svelte:component this={link.icon} size={20} />
                    </div>
                    
                    <div class="flex flex-col flex-1">
                        <span class="font-medium text-[#37352f] group-hover:text-black">{link.label}</span>
                        <span class="text-xs text-[#9b9a97]">{link.desc}</span>
                    </div>

                    <div class="text-[#9b9a97] opacity-0 group-hover:opacity-100 transition-opacity">
                        <ExternalLink size={16} />
                    </div>
                </a>
            </NotionBlock>
        {/each}
    </div>
    
    <NotionBlock>
        <div class="text-sm text-[#9b9a97] mt-12 mb-8 border-t border-[#e9e9e7] pt-4 text-center">
            © {new Date().getFullYear()} Dimas Andhika
        </div>
    </NotionBlock>
</NotionPage>

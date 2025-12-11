<script lang="ts">
	import './layout.css';
    import { fade, fly } from 'svelte/transition';
    import FloatingNav from '$lib/components/FloatingNav.svelte';
    import Contact from 'lucide-svelte/icons/contact'

	let { children } = $props();

    let isContactOpen = $state(false);

    function toggleContact() {
        isContactOpen = !isContactOpen;
    }
</script>

<div class="min-h-screen w-full bg-[#ffffff] text-[#37352f]">
	<!-- Main Content -->
	<main class="w-full relative">
        <!-- Minimal Topbar like public Notion -->
        <div class="sticky top-0 z-10 flex h-11 items-center justify-between px-3 bg-white/95 backdrop-blur-sm transition-all border-b border-[#e9e9e7]">
             <div class="flex items-center gap-2 text-sm text-[#37352f]">
                 <div class="flex items-center gap-1 hover:bg-[#e9e9e7] px-2 py-1 rounded cursor-pointer">
                    <span class="text-base">👋</span>
                    <span class="font-medium">Dimas Andhika's Portfolio</span>
                 </div>
             </div>
             <div class="flex items-center gap-2">
                  <button onclick={toggleContact} class="flex items-center gap-1.5 text-sm cursor-pointer font-medium hover:bg-[#e9e9e7] px-2 py-1 rounded transition-colors text-[#37352f]">
                    <Contact size={16} />
                    <span>Contact</span>
                  </button>
             </div>
        </div>

		{@render children()}

        <FloatingNav />

        <!-- Contact Modal -->
        {#if isContactOpen}
            <!-- Backdrop -->
            <div 
                class="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-[2px]"
                transition:fade={{ duration: 200 }}
                onclick={(e) => { if (e.target === e.currentTarget) isContactOpen = false; }}
                role="button"
                tabindex="0"
                onkeydown={(e) => e.key === 'Escape' && (isContactOpen = false)}
            >
                <!-- Modal Content -->
                <div 
                    class="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl border border-[#e9e9e7]"
                    transition:fly={{ y: 20, duration: 300 }}
                    role="dialog"
                    aria-modal="true"
                    tabindex="-1"
                >
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-lg font-semibold text-[#37352f]">Get in Touch</h3>
                        <button onclick={() => isContactOpen = false} class="text-[#9b9a97] cursor-pointer hover:text-[#37352f] transition-colors p-1 rounded">
                             ✕
                        </button>
                    </div>
                    
                    <p class="text-sm text-[#37352f] mb-6 leading-relaxed">
                        Feel free to reach out for collaborations, opportunities, or just a friendly hello!
                    </p>

                    <div class="space-y-2">
                        <a href="mailto:dimasandhikadiputra@gmail.com" class="flex items-center gap-3 p-2 rounded-lg hover:bg-[#f7f7f5] transition-colors group">
                            <span class="flex h-8 w-8 items-center justify-center rounded bg-[#ffe2dd] text-lg">📧</span>
                            <div class="flex flex-col">
                                <span class="text-sm font-medium text-[#37352f]">Email</span>
                                <span class="text-xs text-[#787774]">dimasandhikadiputra@gmail.com</span>
                            </div>
                        </a>
                        
                        <a href="https://www.linkedin.com/in/dimasandhk/" target="_blank" rel="noopener noreferrer" class="flex items-center gap-3 p-2 rounded-lg hover:bg-[#f7f7f5] transition-colors group">
                            <span class="flex h-8 w-8 items-center justify-center rounded bg-[#e3e2e0] text-lg">💼</span>
                            <div class="flex flex-col">
                                <span class="text-sm font-medium text-[#37352f]">LinkedIn</span>
                                <span class="text-xs text-[#787774]">Connect professionally</span>
                            </div>
                        </a>

                        <a href="https://github.com/dimasandhk" target="_blank" rel="noopener noreferrer" class="flex items-center gap-3 p-2 rounded-lg hover:bg-[#f7f7f5] transition-colors group">
                            <span class="flex h-8 w-8 items-center justify-center rounded bg-[#d3e5ef] text-lg">💻</span>
                            <div class="flex flex-col">
                                <span class="text-sm font-medium text-[#37352f]">GitHub</span>
                                <span class="text-xs text-[#787774]">Check out my code</span>
                            </div>
                        </a>
                         <a href="https://instagram.com/dimas.andhk" target="_blank" rel="noopener noreferrer" class="flex items-center gap-3 p-2 rounded-lg hover:bg-[#f7f7f5] transition-colors group">
                            <span class="flex h-8 w-8 items-center justify-center rounded bg-[#fadce9] text-lg">📸</span>
                            <div class="flex flex-col">
                                <span class="text-sm font-medium text-[#37352f]">Instagram</span>
                                <span class="text-xs text-[#787774]">Follow my daily updates</span>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        {/if}
	</main>
</div>

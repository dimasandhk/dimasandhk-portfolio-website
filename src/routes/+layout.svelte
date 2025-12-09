<script lang="ts">
	import './layout.css';

	let { children } = $props();
</script>

<div class="min-h-screen w-full bg-[#ffffff] text-[#37352f]">
	<!-- Main Content -->
	<main class="w-full">
        <!-- Minimal Topbar like public Notion -->
        <div class="sticky top-0 z-10 flex h-11 items-center justify-between px-3 bg-white/95 backdrop-blur-sm transition-all border-b border-[#e9e9e7]">
             <div class="flex items-center gap-2 text-sm text-[#37352f]">
                 <div class="flex items-center gap-1 hover:bg-[#e9e9e7] px-2 py-1 rounded cursor-pointer">
                    <span class="text-base">👋</span>
                    <span class="font-medium">Dimas Andhika's Portfolio</span>
                 </div>
             </div>
             <div class="flex items-center gap-2">
                  <a href="mailto:contact@example.com" class="text-sm font-medium hover:bg-[#e9e9e7] px-2 py-1 rounded">Contact</a>
             </div>
        </div>

		{@render children()}
	</main>
</div>

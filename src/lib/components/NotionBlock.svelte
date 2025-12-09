<script lang="ts">
    interface Props {
        children?: import('svelte').Snippet;
        bg?: string;
    }
    let { children, bg }: Props = $props();
</script>

<div class="hover:bg-transparent rounded relative {bg ? bg : ''} py-1">
    <div class="w-full">
         {@render children?.()}
    </div>
</div>

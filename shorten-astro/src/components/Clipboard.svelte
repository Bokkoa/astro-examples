<script>
  import { onMount } from 'svelte'

  export let urlResult;

  let textArea;

  onMount(() => {
    textArea.select()
    document.execCommand('copy')
  })
</script>

<textarea bind:value={urlResult} bind:this={textArea}></textarea>
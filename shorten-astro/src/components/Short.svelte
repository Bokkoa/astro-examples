<script>
  import Clipboard from "./Clipboard.svelte";

  const copy = () => {
    const app = new Clipboard({
      target: document.getElementById('clipboard'),
      props: {
        urlResult
      }
    })
    app.$destroy();
  }
  let url = '';
  let urlResult = '';
  let show = false;

  const fetchUrl = async () => {
    const response = await fetch('https://api.shrtco.de/v2/shorten?url=' + url)
    const data = await response.json()
    console.log(data.result.short_link)

    urlResult = data.result.short_link
    show = true;
  }

  const styleInput = "bg-gray-200 appeareance-none border-2 border-gray-200 rounded w-full py-3 px-4 text-gray-700 leadin-tight focus:outline-none focus:bg-white focus:border-purple-500"

  const styleButton = "bg-purple-500 hover:bg-purple-400 text-white font-bold py-2 px-10 rounded"
</script>


<div class="md:flex md:items-center mb-6">
  <div class="md:w-1/3">
    <label for="" class="block text-gray-500 font-bold md:text-right pr-4">
      URL to shorten
    </label>
  </div>
  <cldiv class="md:w-1/3">
    <input type="text" placeholder="Exampe://www.mysite.com" bind:value={url} class={styleInput}>
  </cldiv>
</div>

<div class="md:flex md:items-center justify-center mt-10">
  <button type="button" class={styleButton} on:click={fetchUrl} >
      Shorten
  </button>
</div>

{#if show}
<div class="md:flex md:items-center justify-center mt-10">
  <input type="text" bind:value={urlResult} class="text-5xl text-pink-500">
  <button class={styleButton} on:click={copy}>Copy</button>
  <div id="clipboard"></div>
</div>
{/if}
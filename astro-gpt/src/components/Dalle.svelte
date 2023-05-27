<script>
  import Loader from "./Loader.svelte";
  let prompt = ""
  let url = ""
  let isLoading = false

  const APIKEY = "supersecretapikey"
  const OPENAI_URL = "https://api.openai.com/v1/images/generations"
  const apiSubmit = async () => {
    isLoading = true
    url = ""
    const body = {
      prompt,
      n: 1,
      size: "512x512"
    }
    try {
      const response = await fetch(OPENAI_URL, {
        method: 'POST',
        headers: {
          'Content-Type': "application/json",
          Authorization: `Bearer ${APIKEY}`,
        },
        body: JSON.stringify(body),

      })
      const choices = await response.json()
      url = choices.data[0].url
      if(url.length > 0) {
        isLoading = false
        prompt = ""
      }
    } catch(err){
      isLoading = false
      alert('Api error')
    }
  }
</script>

<div class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
  <div class="px-4 py-5 sm:px-6">
    <h2 class="text-6xl font-medium text-gray-900">Dall-E Generator</h2>
  </div>
  <div class="border-t border-gray-200">
    <div class="px-4 py-5 sm:p-6">
      <div class="mb-4">
        <textarea
          bind:value={prompt}
          class="border-2 border-pink-500 rounded-md w-full py-2 px-3"
          rows="4"
          placeholder="Description here"
        />
      </div>
      <div>
        <button
          class="px-4 py-2 text-white bg-pink-500 rounded-md hover:bg-pink-600 focus:outline-none"
          on:click={apiSubmit}
          >Send</button
        >
      </div>
      {#if isLoading}
      <Loader />
      {:else}
        <img src={url} alt="IA Url Result" class="mt-4" >
      {/if}
    </div>
  </div>
</div>

<script>
  import Loader from "./Loader.svelte";
  let prompt = ""
  let result  = ""
  let isLoading = false
  let isText = false

  const APIKEY = "supersecretapikey"
  const OPENAI_URL = "https://api.openai.com/v1/completions"
  const apiSubmit = async (responseType) => {
    if(responseType === "text") {
      isText = true
    } else {
      isText = false
    }
    isLoading = true
    result = ""
    const body = {
      prompt,
      max_tokens: 1024,
      temperature: 0.7, // response randomness
      model: 'text-davinci-003'
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
      const {choices} = await response.json()
      result = choices[0].text;
      if(result.length > 0) {
        isLoading = false
        prompt = ""
      }
    } catch(err){
      isLoading = false
      alert('Api error')
    }
  }
</script>

<div class="max-w mx-auto bg-white rounded-xl shadow-md overflow-hidden">
  <div class="px-4 py-5 sm:px-6">
    <h2 class="text-6xl font-medium text-gray-900">Chat GPT</h2>
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
          on:click={() => apiSubmit('code')}
          >I Want a Code Response</button>
        <button
          class="px-4 py-2 text-white bg-purple-500 rounded-md hover:bg-pink-600 focus:outline-none"
          on:click={() => apiSubmit('text')}
          >I want a text response</button>
      </div>
      {#if isLoading}
      <Loader />
      {:else}
        {#if isText}
          <p>{result}</p>
        {:else}
          <pre>{result}</pre>
        {/if}
      {/if}
    </div>
  </div>
</div>

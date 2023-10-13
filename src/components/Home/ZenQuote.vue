<template>
  <div v-if="quote" class="w-80 m-auto">
    <blockquote>
      "{{ quote.q }}"
      <footer>- {{ quote.a }}</footer>
    </blockquote>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import Swal from 'sweetalert2';

  interface Quote {
    q: string;
    a: string;
  }

  export default defineComponent({
    name: 'RandomQuote',
    setup() {
      const quotesCache = ref<Quote[]>([]); // ref for array of quotes
      const quote = ref<Quote | null>(null); // ref to store currently displayed quote

      const fetchQuotes = async (): Promise<Quote[]> => {
        try {
          // request to api to fetch quotes using CORS (This did not work for me so temp fix is handled in error pop up)
          const response = await fetch('https://cors-anywhere.herokuapp.com/https://zenquotes.io/api/quotes/');
          if (!response.ok) throw new Error('Failed to fetch quotes');
          return await response.json() as Quote[];
        } catch (err) {
          // Error handling with instructions on how to resolve
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Error fetching quotes!',
            html: 'Click <a href="https://cors-anywhere.herokuapp.com/corsdemo" target="_blank">here</a> to request temporary access to server, then reload the page.',
          });
          return [];
        }
      };
      // Get & display random quote
      const getRandomQuote = async () => {
        if (quotesCache.value.length === 0) {
          // Get quotes from API if cache is empty
          quotesCache.value = await fetchQuotes();
        }
        // Get a random quote from the cache
        const randomIndex = Math.floor(Math.random() * quotesCache.value.length);
        quote.value = quotesCache.value.splice(randomIndex, 1)[0] || null;
      };

      // call function on mounting component
      onMounted(getRandomQuote);

      // return quote and function to template
      return {
        quote,
        getRandomQuote
      };
    },
  });
</script>
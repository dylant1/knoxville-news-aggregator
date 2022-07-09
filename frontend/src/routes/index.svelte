<script  lang="ts">
    let today = new Date().toDateString()
    let yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 3)
    let parsedToday = Date.parse(today)
    let parsedYesterday = Date.parse(yesterday.toDateString())
    const getHeadlines = async (from: number, to: number) => {
        let response = await fetch(`http://localhost:5050/headlines/${from}-${to}`)
        let result = await response.json()
        return result;
    }
    console.log(parsedToday, parsedYesterday)


</script>


<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<script>
	import '../app.css';
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';
	let ready = false;
	onMount(() => (ready = true));
</script>

<main>
	<slot />
</main>

{#if ready}
	<hr />
	<footer in:fade>
		<p>Made with <span title="Svelte ⚡️">🧡</span> in <span title="Sweden 🇸🇪">Stockholm</span></p>
	</footer>
{/if}

<style>
	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 1440px;
		margin: 0 auto;
		box-sizing: border-box;
	}

	hr {
		width: 100%;
		height: 1px;
		border: 0;
		background: #000000;
		box-shadow: 0px 1px 0px rgba(255, 255, 255, 0.075);
		margin: 0;
		bottom: 0;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
	}

	@media (min-width: 768px) {
		footer {
			padding: 24px 0;
		}
	}
</style>

<script context="module">
	export const prerender = true;
</script>

<script>
	import { BlurhashImage } from 'svelte-blurhash';

	import Github from '$lib/icons/github.svelte';
	import Instagram from '$lib/icons/instagram.svelte';
	import Linkedin from '$lib/icons/linkedin.svelte';
	import Telegram from '$lib/icons/telegram.svelte';
	import Twitter from '$lib/icons/twitter.svelte';
	import Youtube from '$lib/icons/youtube.svelte';

	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';
	let ready = false;
	onMount(() => (ready = true));

	import { style } from 'svelte-body';

	$: innerWidth = 0;
	$: innerHeight = 0;
</script>

<svelte:window bind:innerWidth bind:innerHeight />

<svelte:head>
	<title>Oka Si - Personal website</title>
</svelte:head>

<svelte:body use:style={`min-height: ${innerHeight}px;`} />

{#if ready}
	<section in:fade>
		<div class="container">
			<div class="content" style="position: relative;">
				<h1 title="🤝">
					Hello, I’m <span>Oka Si</span> ✌️
				</h1>

				<h2 title="👨‍💻">Full-Stack JavaScript Developer 🤓</h2>

				<div class="passion" title="✨">
					<h3 style="text-transform: uppercase;">Passion for</h3>
					<ul class="passionlist">
						<li>longevity</li>
						<li>voluntaryism</li>
						<li>accessible UX</li>
						<li>cutting-edge tech</li>
					</ul>
				</div>

				<div class="iconrow">
					<a href="https://github.com/okasi" target="_blank" title="Github">
						<Github class="icon" />
					</a>
					<a href="https://www.linkedin.com/in/okasi" target="_blank" title="LinkedIn">
						<Linkedin class="icon" />
					</a>
					<a href="https://t.me/okasi_me" target="_blank" title="Telegram">
						<Telegram class="icon" />
					</a>
					<a
						href="https://www.youtube.com/channel/UCoSvb8yzs5O1RzAlM24uU2Q"
						target="_blank"
						title="YouTube"
					>
						<Youtube class="icon" />
					</a>
					<a href="https://twitter.com/okasi_me" target="_blank" title="Twitter">
						<Twitter class="icon" />
					</a>
					<a href="https://www.instagram.com/okasi.me/" target="_blank" title="Instagram">
						<Instagram class="icon" />
					</a>
				</div>
			</div>
			<div class="profile" title="📷">
				<BlurhashImage
					src={'/OkaSiPurple.jpg'}
					hash={'eXKwbqk9_4WBE0xcRjV[oyR%M|M|M_axt7_3WUocagRjt8WUR$t7j]'}
					width={innerWidth > 768 ? 256 : 128}
					height={innerWidth > 768 ? 256 : 128}
					fadeDuration={1440}
				/>
			</div>
		</div>
	</section>
{/if}

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
	}

	.container {
		text-align: center;
		display: flex;
		flex-wrap: wrap-reverse;
		width: 100%;
		justify-content: space-around;
		margin: 0 auto;
		align-items: center;
		flex-direction: column-reverse;
	}

	.content::before {
		content: '';
		width: 200%;
		max-width: 99vw;
		height: 200%;
		position: absolute;
		top: -50%;
		right: 0%;
		bottom: 0%;
		left: -50%;
		z-index: -1;
		background: radial-gradient(50% 50% at 50% 50%, #afa2cd 0%, rgba(255, 255, 255, 0) 100%);
		opacity: 0.05;
	}

	h1 {
		font-weight: 500;
		font-size: 1.875rem;
		margin: 0;
		line-height: 100%;
	}

	h1 > span {
		font-weight: 300;
	}

	h2 {
		font-size: 1rem;
		font-weight: 500;
		margin: 32px 0;
		line-height: 100%;
	}

	h3 {
		font-size: 0.8rem;
		font-weight: 600;
		letter-spacing: 2px;
		margin: 0;
	}

	.passion {
		display: none;
	}

	.passionlist {
		font-size: 0.8rem;
		padding: 0;
		margin: 0;
		margin-bottom: 32px;
	}

	.passionlist > li {
		list-style-type: none;
	}

	.profile {
		border-radius: 256px;
		overflow: hidden;
		position: relative;
		z-index: 0;
		height: 128px;
		width: 128px;
		margin-bottom: 32px;
	}

	.iconrow {
		display: flex;
		flex-direction: row;
		justify-items: center;
		margin: 0 -24px;
		justify-content: center;
		margin-bottom: 12px;
	}

	.iconrow > a {
		display: inline-flex;
		padding: 12px;
		margin: -12px 0;
	}

	.iconrow > a:hover {
		opacity: 0.75;
	}

	:global(.icon) {
		height: 26px;
	}

	@media (min-width: 768px) {
		.container {
			flex-direction: row;
			text-align: left;
			align-items: flex-end;
		}
		h1 {
			font-size: 4.5rem;
		}
		h2 {
			font-size: 2.5rem;
		}
		h3 {
			font-size: 1.5rem;
		}
		.passion {
			display: block;
		}
		.passionlist {
			font-size: 1.5rem;
		}

		:global(.icon) {
			height: 42px;
		}

		.iconrow {
			justify-content: start;
		}

		.iconrow > a {
			padding: 24px;
			margin: -24px 0;
		}

		.profile {
			height: 256px;
			width: 256px;
		}
	}
</style>

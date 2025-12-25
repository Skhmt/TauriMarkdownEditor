<script lang="ts">
	let dialogEl: HTMLDialogElement;

	let { show, confirm, title } = $props();

	$effect(() => {
		if (show) {
			dialogEl.showModal();
		}
	});

	function cancel() {
		dialogEl.close();
	}

	function submit() {
		confirm();
		dialogEl.close();
	}
</script>

<!-- svelte-ignore slot_element_deprecated -->
<dialog closedby="any" bind:this={dialogEl}>
	<div>
		<strong>{title}</strong>
	</div>
	<slot></slot>
	<div>
		<button onclick={cancel} class="cancel">Cancel</button>
		<button onclick={submit}>Do it</button>
	</div>
</dialog>

<style>
	.cancel {
		border-color: red;
		border-width: 1px;
		background-color: rgba(0, 0, 0, 0);
		/* color: red; */
		/* background-color: black; */
	}

	dialog {
		box-shadow: 0px 0px 10px;
		border: 1px solid black;
		border-radius: 8px;
		padding: 30px;
	}

	dialog::backdrop {
		background-color: rgba(0, 0, 0, 0.5);
		backdrop-filter: blur(2px);
	}
</style>

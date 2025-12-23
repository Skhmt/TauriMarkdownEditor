<script>
	// fontawesome
	import './css/fontawesome.min.css';
	import './css/solid.min.css';

	// easyMDE
	import EasyMDE from 'easymde';
	import 'easymde/dist/easymde.min.css';

	// highlight.js
	import hljs from 'highlight.js';
	import 'highlight.js/styles/tomorrow-night-bright.min.css';

	import { onMount } from 'svelte';

	import createToolbar from './lib/toolbar.js';

	let textAreaElement;
	let dialogElement;
	let emde;
	let isSaved = false;
	let fileHandle;

	onMount(() => {
		emde = new EasyMDE({
			element: textAreaElement,
			autoDownloadFontAwesome: false,
			renderingConfig: {
				codeSyntaxHighlighting: true,
				hljs,
			},
			lineNumbers: true,
			indentWithTabs: true,
			tabSize: 4,
			// initialValue: "foo bar",
			toolbar: createToolbar(newFile, openFile, saveFile),
		});

		emde.value("```js \nconsole.log('test');\n```");
	});

	//
	function newFile() {
		if (!isSaved) {
			// confirm action
			// saveFile() if user wants to save
			dialogElement.showModal();
		}
		emde.value('');
	}

	async function openFile() {
		[fileHandle] = await window.showOpenFilePicker();

		const file = await fileHandle.getFile();
		const content = await file.text();
		emde.value(content);
	}

	async function saveFile() {
		let handle = fileHandle ? fileHandle : await getSaveFileHandle();

		const writable = await handle.createWritable();
		await writable.write(emde.value());
		await writable.close();
	}

	async function getSaveFileHandle() {
		const saveFileHandle = await window.showSaveFilePicker({
			types: [
				{
					description: 'Markdown',
					accept: {
						'text/plain': ['.md'],
					},
				},
			],
		});
		return saveFileHandle;
	}

	async function saveAsFile() {
		const saveFileHandle = await getSaveFileHandle();
		const writable = await saveFileHandle.createWritable();
		await writable.write(emde.value());
		await writable.close();
	}
</script>

<div>
	<textarea id="editor" bind:this={textAreaElement}></textarea>

	<dialog closedby="any" bind:this={dialogElement}>
		<slot></slot>
		<button onclick={() => dialogElement.close()}>close</button>
		<button>ok</button>
	</dialog>
</div>

<style>
	dialog {
		box-shadow: 0px 0px 10px;
		border: 1px solid black;
		border-radius: 8px;
		padding: 1.5rem;
	}

	dialog::backdrop {
		background-color: rgba(0, 0, 0, 0.5);
		backdrop-filter: blur(2px);
	}
</style>

<script lang="ts">
	import { onMount } from "svelte";

	// bespoke modules
	import createToolbar from "./lib/toolbar.ts";
	import Modal from "./lib/Modal.svelte";

	// tauri
	import { getCurrentWindow } from "@tauri-apps/api/window";

	// fontawesome
	import "./css/fontawesome.min.css";
	import "./css/all.min.css";

	// easyMDE
	import EasyMDE from "easymde";
	import "easymde/dist/easymde.min.css";

	// highlight.js
	import hljs from "highlight.js";
	import "highlight.js/styles/tomorrow-night-bright.min.css";

	let textAreaElement: HTMLTextAreaElement;
	let emde: EasyMDE;
	let isSaved = $state(true);
	let fileName: string | null = $state(null);
	let fileHandle: FileSystemFileHandle | null;
	let isOver = $state(false);
	let windowTitle = $state("");

	// @ts-ignore
	const appWindow = getCurrentWindow ? getCurrentWindow() : null;

	// modal state
	let showModal = $state(false);
	let modalContent = $state("lorem ipsum");
	let modalCallback = $state(() => {
		alert("modal callback test");
	});

	function updateTitle() {
		let title = "";
		if (fileName) title += fileName;
		else title += "[untitled]";

		if (!isSaved) title += " *";

		appWindow?.setTitle(title);
		windowTitle = title;
	}
	updateTitle();

	onMount(() => {
		emde = new EasyMDE({
			element: textAreaElement,
			autoDownloadFontAwesome: false,
			renderingConfig: {
				codeSyntaxHighlighting: true,
				hljs,
			},
			uploadImage: false,
			spellChecker: false,
			lineNumbers: true,
			indentWithTabs: true,
			tabSize: 4,
			// initialValue: "foo bar",
			toolbar: createToolbar(newFile, openFile, saveFile),
		});

		emde.codemirror.on("change", () => (isSaved = false));
	});

	function newFile() {
		if (!isSaved) {
			// confirm action
			// saveFile() if user wants to save
			// dialogElement.showModal();
		}
		emde!.value("");
		isSaved = true;
		fileName = null;
		fileHandle = null;
		updateTitle();
	}

	async function openFile() {
		if (!isSaved) {
			// confirm action
		}

		// @ts-ignore showOpenFilePicker is available
		[fileHandle] = await window.showOpenFilePicker();

		if (!fileHandle) return;

		fileName = fileHandle.name;

		const file = await fileHandle.getFile();
		const content = await file.text();
		emde!.value(content);
		isSaved = true;
		updateTitle();
	}

	async function saveFile() {
		let handle = fileHandle ? fileHandle : await getSaveFileHandle();

		const writable = await handle.createWritable();
		await writable.write(emde!.value());
		await writable.close();

		isSaved = true;
		updateTitle();
	}

	async function getSaveFileHandle() {
		// @ts-ignore showSaveFilePicker is available
		const saveFileHandle = await window.showSaveFilePicker({
			types: [
				{
					description: "Markdown",
					accept: {
						"text/plain": [".md"],
					},
				},
			],
		});
		return saveFileHandle;
	}

	// async function saveAsFile() {
	// // also update title and filename
	// 	const saveFileHandle = await getSaveFileHandle();
	// 	const writable = await saveFileHandle.createWritable();
	// 	await writable.write(emde.value());
	// 	await writable.close();
	// }

	function keyDownHandler(e: KeyboardEvent) {
		if (e.ctrlKey || e.metaKey) {
			if (e.key === "s") {
				e.preventDefault();
				saveFile();
			} else if (e.key === "m") {
				e.preventDefault();
				newFile();
			} else if (e.key === "o") {
				e.preventDefault();
				openFile();
			}
		}
	}

	function dragOverHandler(e: DragEvent) {
		e.preventDefault();
		isOver = true;
	}

	function dragLeaveHandler(e: DragEvent) {
		e.preventDefault();
		if (!e.relatedTarget) isOver = false;
	}

	async function dropHandler(e: DragEvent) {
		e.preventDefault();
		e.stopImmediatePropagation();
		isOver = false;

		if (!e.dataTransfer) return;

		// TODO: check if unsaved

		const files = Array.from(e.dataTransfer.files);
		if (files.length > 0) {
			const file = files[0];
			const text = await file.text();
			fileName = file.name;
			emde!.value(text);
			isSaved = true;
		}
	}
</script>

<svelte:head>
	<title>{windowTitle}</title>
	<link rel="icon" href="./src/mdp-512.png" />
</svelte:head>

<svelte:window
	onkeydown={keyDownHandler}
	ondragovercapture={dragOverHandler}
	ondragleavecapture={dragLeaveHandler}
	ondropcapture={dropHandler}
/>

<div class="editor-dark">
	<textarea id="editor" bind:this={textAreaElement}></textarea>

	{#if isOver}
		<div class="drop-overlay">
			<i class="fa fa-file-import fa-5x dropicon" aria-hidden="true"></i>
		</div>
	{/if}

	<Modal show={showModal} confirm={modalCallback} title="test title"
		>{modalContent}</Modal
	>
</div>

<style>
	.drop-overlay {
		position: fixed;
		z-index: 9001;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		backdrop-filter: blur(2px);
		display: flex;
		justify-content: center;
		pointer-events: none; /* important */
		align-items: center;
	}

	.dropicon {
		color: white;
		text-shadow: 0px 0px 15px black;
	}

	/* The dotted "interior" frame */
	.drop-overlay::after {
		content: "";
		position: absolute;
		top: 20px; /* Gap from top */
		left: 20px; /* Gap from left */
		right: 20px; /* Gap from right */
		bottom: 20px; /* Gap from bottom */
		border: 4px dashed #ffffff;
		border-radius: 15px; /* Optional: rounds the corners */
	}
</style>

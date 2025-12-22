<script>
    // fontawesome
    import "./css/fontawesome.min.css";
    import "./css/solid.min.css";

    // easyMDE
    import EasyMDE from "easymde";
    import "easymde/dist/easymde.min.css";

    // highlight.js
    import hljs from "highlight.js";
    import "highlight.js/styles/tomorrow-night-bright.min.css";

    import { onMount } from "svelte";

    let textAreaElement;
    let emde;
    let isSaved = false;

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
            // initialValue: "```js \nconsole.log('test');\n```",
            toolbar: [
                {
                    name: "New",
                    action: () => {
                        alert("test");
                    },
                    className: "fa fa-file-plus",
                    title: "New",
                    noDisable: true,
                },
                {
                    name: "Open",
                    action: () => {
                        alert("test");
                    },
                    className: "fa fa-folder-open",
                    title: "Open",
                    noDisable: true,
                },
                {
                    name: "Save",
                    action: () => {
                        alert("test");
                    },
                    className: "fa fa-save title-text",
                    title: "Save",
                    noDisable: true,
                },
                "|",
                "bold",
                "italic",
                "strikethrough",
                "|",
                "heading-1",
                "heading-2",
                "heading-3",
                "|",
                "quote",
                "code",
                "|",
                "ordered-list",
                "unordered-list",
                "|",
                "link",
                "image",
                "table",
                "|",
                "preview",
                // "guide",
            ],
        });

        emde.value("```js \nconsole.log('test');\n```");
    });

    //
    function newFile() {
        if (!isSaved) {
            // confirm action
            // saveFile() if user wants to save
        }
        emde.value("");
    }

    function openFile() {}

    function saveFile() {}
</script>

<div>
    <textarea id="editor" bind:this={textAreaElement}></textarea>
</div>

<style>
</style>

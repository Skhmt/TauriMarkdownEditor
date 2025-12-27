import EasyMDE from "easymde";

const faWeight = 'fal'; // far for regular, fas for solid, fal for light,

export default function createToolbar(newFn: () => void, openFn: () => void, saveFn: () => void): any[] {
	return [
		{
			name: "New",
			action: newFn,
			className: `${faWeight} fa-file-plus no-disable`,
			title: "New file (Ctrl-M)",
			noDisable: true,
		},
		{
			name: "Open",
			action: openFn,
			className: `${faWeight} fa-folder-open no-disable`,
			title: "Open file (Ctrl-O)",
			noDisable: true,
		},
		{
			name: "Save",
			action: saveFn,
			className: `${faWeight} fa-save no-disable`,
			title: "Save file (Ctrl-S)",
			noDisable: true,
		},
		"|",
		{
			name: "bold",
			action: EasyMDE.toggleBold,
			className: `${faWeight} fa-bold`,
			title: "Bold",
		},
		{
			name: "italic",
			action: EasyMDE.toggleItalic,
			className: `${faWeight} fa-italic`,
			title: "Italic",
		},
		{
			name: "strikethrough",
			action: EasyMDE.toggleStrikethrough,
			className: `${faWeight} fa-strikethrough`,
			title: "Strikethrough",
		},
		"|",
		{
			name: "heading-1",
			action: EasyMDE.toggleHeading1,
			className: `${faWeight} fa-heading`,
			title: "Heading 1",
		},
		{
			name: "heading-2",
			action: EasyMDE.toggleHeading2,
			className: `${faWeight} fa-heading`,
			title: "Heading 2",
		},
		{
			name: "heading-3",
			action: EasyMDE.toggleHeading3,
			className: `${faWeight} fa-heading`,
			title: "Heading 3",
		},
		"|",
		{
			name: "quote",
			action: EasyMDE.toggleBlockquote,
			className: `${faWeight} fa-quote-left`,
			title: "Quote",
		},
		{
			name: "code",
			action: EasyMDE.toggleCodeBlock,
			className: `${faWeight} fa-code`,
			title: "Code",
		},
		"|",
		{
			name: "ordered-list",
			action: EasyMDE.toggleOrderedList,
			className: `${faWeight} fa-list-ol`,
			title: "Ordered List",
		},
		{
			name: "unordered-list",
			action: EasyMDE.toggleUnorderedList,
			className: `${faWeight} fa-list-ul`,
			title: "Unordered List",
		},
		"|",
		{
			name: "link",
			action: EasyMDE.drawLink,
			className: `${faWeight} fa-link`,
			title: "Link",
		},
		{
			name: "image",
			action: EasyMDE.drawImage,
			className: `${faWeight} fa-image`,
			title: "Image",
		},
		{
			name: "table",
			action: EasyMDE.drawTable,
			className: `${faWeight} fa-table`,
			title: "Table",
		},
		"|",
		{
			name: "preview",
			action: EasyMDE.togglePreview,
			className: `${faWeight} fa-eye no-disable`,
			title: "Preview",
		},
		// "guide",
	];
}
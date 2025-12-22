// import { invoke } from "@tauri-apps/api/core";
import { mount } from 'svelte';

// @ts-ignore
import App from './App.svelte';

// @ts-ignore
const app = mount(App, { target: document.getElementById("app") });
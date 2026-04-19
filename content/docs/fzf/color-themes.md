---
weight: 5
title: "Color Themes"
bookToc: false
---

<style>
.fzf-gen { --ui-bg: #1c1c1c; --ui-fg: #d0d0d0; --ui-border: #4e4e4e; --ui-accent: #afd787; --ui-muted: #87875f; --ui-surface: #262626; font-family: system-ui, -apple-system, sans-serif; color: var(--ui-fg); margin: 0 -1rem; }
.fzf-gen *, .fzf-gen *::before, .fzf-gen *::after { box-sizing: border-box; }
.fzf-gen h2, .fzf-gen h3, .fzf-gen h4 { margin: 0; color: var(--ui-fg); font-family: system-ui, -apple-system, sans-serif; }
.fzf-topbar { display: flex; flex-wrap: wrap; gap: 0.5rem; align-items: center; padding: 0.75rem 1rem; background: var(--ui-surface); border-bottom: 1px solid var(--ui-border); position: sticky; top: 0; z-index: 100; }
.fzf-topbar label { font-size: 0.8rem; color: var(--ui-muted); margin-right: 0.2rem; }
.fzf-topbar select, .fzf-topbar button, .fzf-topbar input[type="text"] { font-size: 0.85rem; padding: 0.35rem 0.6rem; border-radius: 4px; border: 1px solid var(--ui-border); background: var(--ui-bg); color: var(--ui-fg); cursor: pointer; font-family: inherit; }
.fzf-topbar select:hover, .fzf-topbar button:hover { border-color: var(--ui-accent); }
.fzf-topbar .spacer { flex: 1; }
.fzf-btn-copy { background: var(--ui-accent) !important; color: #fff !important; border-color: var(--ui-accent) !important; font-weight: 600; }
.fzf-version-note { font-size: 0.75rem; color: var(--ui-muted); padding: 0.5rem 1rem; background: var(--ui-surface); border-bottom: 1px solid var(--ui-border); }
.fzf-version-note code { background: var(--ui-bg); padding: 1px 4px; border-radius: 3px; font-family: 'SF Mono', Menlo, Monaco, monospace; font-size: 0.72rem; color: var(--ui-fg); }
.fzf-btn-copy:hover { opacity: 0.85; }
.fzf-main { display: grid; grid-template-columns: 1fr 320px; grid-template-rows: 1fr auto; gap: 0; min-height: 500px; }
.fzf-main .fzf-preview-wrap { grid-column: 1; grid-row: 1; }
.fzf-main .fzf-controls { grid-column: 2; grid-row: 1 / -1; }
@media (max-width: 900px) { .fzf-main { display: flex; flex-direction: column; grid-template-columns: 1fr; } }
.fzf-preview-wrap { padding: 1.25rem; display: flex; flex-direction: column; gap: 0.75rem; }
.fzf-gen .fzf-terminal { background: transparent !important; padding: 0 !important; border-radius: 0 !important; overflow-x: hidden !important; }
.fzf-preview-label-top { font-size: 0.75rem; color: var(--ui-muted); text-transform: uppercase; letter-spacing: 0.05em; }
.fzf-terminal { font-family: 'SF Mono', 'Cascadia Code', 'JetBrains Mono', Menlo, Monaco, monospace; font-size: 13px; line-height: 1; margin: 0; padding: 0; overflow: hidden; white-space: pre; color: var(--c-fg, #d0d0d0); background: transparent; border: none; }
.fzf-controls { background: var(--ui-surface); border-left: 1px solid var(--ui-border); overflow-y: auto; max-height: calc(100vh - 50px); position: sticky; top: 50px; display: flex; flex-direction: column; }
@media (max-width: 900px) { .fzf-controls { position: static; max-height: none; border-left: none; border-top: 1px solid var(--ui-border); } }
.fzf-tabs { display: flex; border-bottom: 1px solid var(--ui-border); flex-shrink: 0; }
.fzf-tab { flex: 1; padding: 0.5rem 0.75rem; font-size: 0.8rem; font-weight: 600; color: var(--ui-muted); background: none; border: none; cursor: pointer; text-align: center; border-bottom: 2px solid transparent; font-family: inherit; }
.fzf-tab:hover { color: var(--ui-fg); }
.fzf-tab.active { color: var(--ui-accent); border-bottom-color: var(--ui-accent); }
.fzf-tab-content { display: none; overflow-y: auto; flex: 1; }
.fzf-tab-content.active { display: block; }
.fzf-ctrl-group { border-bottom: 1px solid var(--ui-border); }
.fzf-ctrl-group-header { display: flex; align-items: center; justify-content: space-between; padding: 0.6rem 0.75rem; cursor: pointer; user-select: none; font-size: 0.8rem; font-weight: 600; color: var(--ui-fg); }
.fzf-ctrl-group-header:hover { background: rgba(255,255,255,0.03); }
.fzf-ctrl-group-header .arrow { font-size: 0.65rem; color: var(--ui-muted); transition: transform 0.15s; }
.fzf-ctrl-group.collapsed .arrow { transform: rotate(-90deg); }
.fzf-ctrl-group.collapsed .fzf-ctrl-group-body { display: none; }
.fzf-ctrl-group-body { padding: 0 0.75rem 0.6rem; display: grid; grid-template-columns: 1fr 1fr; gap: 0.35rem 0.75rem; }
.fzf-color-ctrl { display: flex; align-items: center; gap: 0.4rem; }
.fzf-color-ctrl label { font-size: 0.72rem; color: var(--ui-muted); flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; cursor: pointer; }
.fzf-color-ctrl label:hover { color: var(--ui-fg); }
.fzf-color-ctrl .color-wrap { position: relative; width: 26px; height: 22px; flex-shrink: 0; }
.fzf-color-ctrl input[type="color"] { -webkit-appearance: none; appearance: none; width: 26px; height: 22px; border: 1px solid var(--ui-border); border-radius: 3px; padding: 1px; cursor: pointer; background: transparent; flex-shrink: 0; }
.fzf-color-ctrl input[type="color"]::-webkit-color-swatch-wrapper { padding: 0; }
.fzf-color-ctrl input[type="color"]::-webkit-color-swatch { border: none; border-radius: 2px; }
.fzf-color-ctrl .color-unset { position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; display: none; z-index: 1; }
.fzf-color-ctrl .color-unset::before, .fzf-color-ctrl .color-unset::after { content: ''; position: absolute; top: 50%; left: 50%; width: 80%; height: 2px; background: #ff4444; }
.fzf-color-ctrl .color-unset::before { transform: translate(-50%, -50%) rotate(45deg); }
.fzf-color-ctrl .color-unset::after { transform: translate(-50%, -50%) rotate(-45deg); }
.fzf-color-ctrl.unset .color-unset { display: block; }
.fzf-color-ctrl.unset input[type="color"] { opacity: 0.25; }
.fzf-color-ctrl .reset-btn { font-size: 0.65rem; color: var(--ui-muted); cursor: pointer; opacity: 0; padding: 0 2px; background: none; border: none; flex-shrink: 0; }
.fzf-color-ctrl:hover .reset-btn { opacity: 0.6; }
.fzf-color-ctrl .reset-btn:hover { opacity: 1; color: var(--ui-accent); }
.fzf-color-ctrl .attr-popup { display: none; position: absolute; top: 100%; left: 0; background: var(--ui-bg); border: 1px solid var(--ui-border); border-radius: 4px; padding: 4px 6px; z-index: 300; box-shadow: 0 2px 8px rgba(0,0,0,0.3); white-space: nowrap; }
.fzf-color-ctrl .attr-popup.open { display: block; }
.fzf-color-ctrl .attr-popup label { font-size: 0.65rem; color: var(--ui-muted); cursor: pointer; display: flex; align-items: center; gap: 3px; padding: 1px 0; width: auto; flex: none; overflow: visible; }
.fzf-color-ctrl .attr-popup label:hover { color: var(--ui-fg); }
.fzf-color-ctrl .attr-popup input { margin: 0; }
.fzf-color-ctrl .has-attrs::after { content: ''; position: absolute; bottom: 1px; right: 1px; width: 5px; height: 5px; background: var(--ui-accent); border-radius: 50%; }
.fzf-opt-ctrl { display: flex; align-items: center; gap: 0.4rem; grid-column: 1 / -1; }
.fzf-opt-ctrl label { font-size: 0.72rem; color: var(--ui-muted); min-width: 0; white-space: nowrap; width: 10em; flex-shrink: 0; overflow: visible; text-overflow: ellipsis; position: relative; }
.fzf-opt-ctrl label[data-tip]:hover::after { content: attr(data-tip); position: absolute; left: 0; top: 120%; background: var(--ui-bg); color: var(--ui-fg); border: 1px solid var(--ui-border); border-radius: 4px; padding: 4px 8px; font-size: 0.68rem; white-space: normal; width: 220px; z-index: 200; pointer-events: none; line-height: 1.4; box-shadow: 0 2px 8px rgba(0,0,0,0.3); }
.fzf-opt-ctrl select, .fzf-opt-ctrl input[type="text"] { font-size: 0.72rem; padding: 2px 4px; border-radius: 3px; border: 1px solid var(--ui-border); background: var(--ui-bg); color: var(--ui-fg); font-family: inherit; flex: 1; min-width: 0; }
.fzf-opt-ctrl input[type="checkbox"] { margin: 0; flex-shrink: 0; }
.fzf-opt-ctrl input[type="range"] { height: 16px; cursor: pointer; accent-color: var(--ui-accent); }
.fzf-export { padding: 0.75rem 1rem; background: var(--ui-surface); border-top: 1px solid var(--ui-border); }
.fzf-export-label { font-size: 0.75rem; color: var(--ui-muted); margin-bottom: 0.35rem; }
.fzf-export-box { font-family: 'SF Mono', Menlo, Monaco, 'Courier New', monospace; font-size: 0.75rem; background: var(--ui-bg); border: 1px solid var(--ui-border); border-radius: 4px; padding: 0.5rem 0.6rem; color: var(--ui-fg); width: 100%; min-height: 6rem; resize: vertical; line-height: 1.45; word-break: break-all; }
</style>
<div class="fzf-gen" id="fzfGen">
<div class="fzf-topbar">
<label for="presetSelect">Theme</label>
<select id="presetSelect"><option value="custom">Custom</option></select>
<label for="termBgInput">Terminal bg</label>
<input type="color" id="termBgInput" value="#262626" style="width:30px;height:26px;padding:1px;border:1px solid var(--ui-border);border-radius:4px;background:transparent;cursor:pointer;">
<label for="queryInput">Query</label>
<input type="text" id="queryInput" value="re" style="width:80px;" spellcheck="false" autocomplete="off">
<div class="spacer"></div>
<button id="btnReset" title="Reset all options">Reset</button>
<button class="fzf-btn-copy" id="btnCopy" title="Copy to clipboard">Copy</button>
</div>
<div class="fzf-version-note">
Note: some options shown here require <strong>fzf 0.72.0</strong> or above.
</div>
<div class="fzf-main">
<div class="fzf-preview-wrap" style="background:#262626">
<pre class="fzf-terminal" id="fzfTerminal"></pre>
</div>
<div class="fzf-controls" id="fzfControls">
<div class="fzf-tabs">
<button class="fzf-tab active" data-tab="options">Options</button>
<button class="fzf-tab" data-tab="colors">Colors</button>
</div>
<div class="fzf-tab-content active" id="tabOptions"></div>
<div class="fzf-tab-content" id="tabColors"></div>
</div>
</div>
<div class="fzf-export" id="fzfExport">
<div class="fzf-export-label">Export</div>
<textarea class="fzf-export-box" id="exportBox" readonly rows="6"></textarea>
</div>
</div>
<script src="/js/fzf-color-themes.js?v=15"></script>
<script>void(0);
</script>

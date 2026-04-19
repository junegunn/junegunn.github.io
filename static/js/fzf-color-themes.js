(function() {
'use strict';
var GROUPS = [
  { name: 'Window', colors: [
    { id: 'fg', label: 'fg' },
    { id: 'bg', label: 'bg' },
    { id: 'border', label: 'border' },
    { id: 'label', label: 'label' },
    { id: 'separator', label: 'separator' },
  ]},
  { name: 'Input', colors: [
    { id: 'prompt', label: 'prompt' },
    { id: 'query', label: 'query' },
    { id: 'ghost', label: 'ghost' },
    { id: 'input-bg', label: 'input-bg' },
    { id: 'input-border', label: 'input-border' },
    { id: 'input-label', label: 'input-label' },
  ]},
  { name: 'List', colors: [
    { id: 'list-fg', label: 'list-fg' },
    { id: 'list-bg', label: 'list-bg' },
    { id: 'list-border', label: 'list-border' },
    { id: 'list-label', label: 'list-label' },
    { id: 'gutter', label: 'gutter' },
    { id: 'scrollbar', label: 'scrollbar' },
    { id: 'alt-bg', label: 'alt-bg' },
    { id: 'alt-gutter', label: 'alt-gutter' },
    { id: 'gap-line', label: 'gap-line' },
    { id: 'hl', label: 'hl' },
  ]},
  { name: 'Current Line', colors: [
    { id: 'current-fg', label: 'current-fg (fg+)' },
    { id: 'current-bg', label: 'current-bg (bg+)' },
    { id: 'current-hl', label: 'current-hl (hl+)' },
  ]},
  { name: 'Selected', colors: [
    { id: 'selected-fg', label: 'selected-fg' },
    { id: 'selected-bg', label: 'selected-bg' },
    { id: 'selected-hl', label: 'selected-hl' },
  ]},
  { name: 'Status', colors: [
    { id: 'info', label: 'info' },
    { id: 'spinner', label: 'spinner' },
    { id: 'pointer', label: 'pointer' },
    { id: 'marker', label: 'marker' },
  ]},
  { name: 'Header', colors: [
    { id: 'header', label: 'header' },
    { id: 'header-bg', label: 'header-bg' },
    { id: 'header-border', label: 'header-border' },
    { id: 'header-label', label: 'header-label' },
  ]},
  { name: 'Footer', colors: [
    { id: 'footer', label: 'footer' },
    { id: 'footer-bg', label: 'footer-bg' },
    { id: 'footer-border', label: 'footer-border' },
    { id: 'footer-label', label: 'footer-label' },
  ]},
  { name: 'Preview', colors: [
    { id: 'preview-fg', label: 'preview-fg' },
    { id: 'preview-bg', label: 'preview-bg' },
    { id: 'preview-border', label: 'preview-border' },
    { id: 'preview-label', label: 'preview-label' },
    { id: 'preview-scrollbar', label: 'preview-scrollbar' },
  ]},
];
var PRESETS = {
  'Default Dark': {
    hl:'#87af87', 'current-fg':'#e4e4e4', 'current-bg':'#303030', 'current-hl':'#afd7af',
    info:'#afaf87', prompt:'#87afd7', pointer:'#d7005f', marker:'#d75f87', spinner:'#afd700',
    header:'#87afaf', footer:'#87afaf',
    border:'#5f5f5f', label:'#afafaf', gutter:'#303030',
  },
  'Default Light': {
    hl:'#5f8787', 'current-fg':'#3a3a3a', 'current-bg':'#c6c6c6', 'current-hl':'#005f5f',
    info:'#87875f', prompt:'#005faf', pointer:'#d7005f', marker:'#d75f87', spinner:'#5f875f',
    header:'#0087af', footer:'#0087af',
    border:'#afafaf', label:'#5f5f5f', gutter:'#c6c6c6',
  },
  'Ayu Mirage': {
    fg:'#cbccc6', bg:'#1f2430', hl:'#ffcc66', 'current-fg':'#707a8c', 'current-bg':'#191e2a', 'current-hl':'#ffcc66',
    info:'#73d0ff', prompt:'#707a8c', pointer:'#cbccc6', marker:'#e0e1dc', spinner:'#73d0ff', header:'#d4bfff',
    border:'#4a5064', gutter:'#191e2a',
  },
  'Catppuccin Frappe': {
    fg:'#c6d0f5', bg:'#303446', hl:'#e78284', 'current-fg':'#c6d0f5', 'current-bg':'#414559', 'current-hl':'#e78284',
    info:'#ca9ee6', prompt:'#ca9ee6', pointer:'#f2d5cf', marker:'#f5e0db', spinner:'#f2d5cf', header:'#e78284',
    border:'#626880', gutter:'#414559',
  },
  'Catppuccin Latte': {
    fg:'#4c4f69', bg:'#eff1f5', hl:'#d20f39', 'current-fg':'#4c4f69', 'current-bg':'#ccd0da', 'current-hl':'#d20f39',
    info:'#8839ef', prompt:'#8839ef', pointer:'#dc8a78', marker:'#c4786a', spinner:'#dc8a78', header:'#d20f39',
    border:'#9ca0b0', gutter:'#ccd0da',
  },
  'Catppuccin Macchiato': {
    fg:'#cad3f5', bg:'#24273a', hl:'#ed8796', 'current-fg':'#cad3f5', 'current-bg':'#363a4f', 'current-hl':'#ed8796',
    info:'#c6a0f6', prompt:'#c6a0f6', pointer:'#f4dbd6', marker:'#f7e6e2', spinner:'#f4dbd6', header:'#ed8796',
    border:'#5b6078', gutter:'#363a4f',
  },
  'Catppuccin Mocha': {
    fg:'#cdd6f4', bg:'#1e1e2e', hl:'#f38ba8', 'current-fg':'#cdd6f4', 'current-bg':'#313244', 'current-hl':'#f38ba8',
    info:'#cba6f7', prompt:'#cba6f7', pointer:'#f5e0dc', marker:'#f8ebe8', spinner:'#f5e0dc', header:'#f38ba8',
    border:'#585b70', gutter:'#313244',
  },
  'Dracula': {
    fg:'#f8f8f2', bg:'#282a36', hl:'#bd93f9', 'current-fg':'#f8f8f2', 'current-bg':'#44475a', 'current-hl':'#bd93f9',
    info:'#ffb86c', prompt:'#50fa7b', pointer:'#ff79c6', marker:'#ff9ed4', spinner:'#ffb86c', header:'#6272a4',
    border:'#6272a4', gutter:'#44475a',
  },
  'Everforest Dark': {
    fg:'#d3c6aa', bg:'#2d353b', hl:'#a7c080', 'current-fg':'#d3c6aa', 'current-bg':'#343f44', 'current-hl':'#a7c080',
    info:'#dbbc7f', prompt:'#7fbbb3', pointer:'#e67e80', marker:'#eda0a2', spinner:'#7fbbb3', header:'#a7c080',
    border:'#4f585e', gutter:'#343f44',
  },
  'Flexoki Dark': {
    fg:'#cecdc3', bg:'#100f0f', hl:'#d0a215', 'current-fg':'#cecdc3', 'current-bg':'#1c1b1a', 'current-hl':'#d0a215',
    info:'#879a39', prompt:'#4385be', pointer:'#af3029', marker:'#d4635d', spinner:'#3aa99f', header:'#8b7ec8',
    footer:'#8b7ec8', border:'#343331', label:'#575653', gutter:'#1c1b1a',
  },
  'Flexoki Light': {
    fg:'#403e3c', bg:'#fffcf0', hl:'#ad8301', 'current-fg':'#403e3c', 'current-bg':'#f2f0e5', 'current-hl':'#ad8301',
    info:'#66800b', prompt:'#205ea6', pointer:'#af3029', marker:'#8a2822', spinner:'#24837b', header:'#5e409d',
    footer:'#5e409d', border:'#cecdc3', label:'#878580', gutter:'#f2f0e5',
  },
  'Gruvbox Dark': {
    fg:'#ebdbb2', bg:'#282828', hl:'#fabd2f', 'current-fg':'#ebdbb2', 'current-bg':'#3c3836', 'current-hl':'#fabd2f',
    info:'#83a598', prompt:'#bdae93', pointer:'#83a598', marker:'#a8c4b9', spinner:'#fabd2f', header:'#665c54',
    border:'#504945', gutter:'#3c3836',
  },
  'Gruvbox Light': {
    fg:'#3c3836', bg:'#fbf1c7', hl:'#b57614', 'current-fg':'#3c3836', 'current-bg':'#ebdbb2', 'current-hl':'#b57614',
    info:'#076678', prompt:'#665c54', pointer:'#076678', marker:'#3a8a98', spinner:'#b57614', header:'#928374',
    border:'#bdae93', gutter:'#ebdbb2',
  },
  'Iceberg Dark': {
    fg:'#c6c8d1', bg:'#161821', hl:'#84a0c6', 'current-fg':'#c6c8d1', 'current-bg':'#1e2132', 'current-hl':'#84a0c6',
    info:'#6b7089', prompt:'#89b8c2', pointer:'#e27878', marker:'#eca0a0', spinner:'#a093c7', header:'#89b8c2',
    footer:'#89b8c2', border:'#444b71', label:'#6b7089', gutter:'#1e2132',
  },
  'Iceberg Light': {
    fg:'#33374c', bg:'#e8e9ec', hl:'#2d539e', 'current-fg':'#33374c', 'current-bg':'#dcdfe7', 'current-hl':'#2d539e',
    info:'#8389a3', prompt:'#3f83a6', pointer:'#cc517a', marker:'#a8456a', spinner:'#7759b4', header:'#3f83a6',
    footer:'#3f83a6', border:'#c9cdd7', label:'#8b90a0', gutter:'#dcdfe7',
  },
  'Jellybeans': {
    fg:'#e8e8d3', bg:'#151515', hl:'#fad07a', 'current-fg':'#e8e8d3', 'current-bg':'#333333', 'current-hl':'#ffb964',
    info:'#8fbfdc', prompt:'#8197bf', pointer:'#cf6a4c', marker:'#e09478', spinner:'#8fbfdc',
    header:'#8197bf', footer:'#8197bf',
    border:'#404040', label:'#888888', gutter:'#333333',
  },
  'Kanagawa': {
    fg:'#DCD7BA', bg:'#1F1F28', hl:'#7E9CD8', 'current-fg':'#DCD7BA', 'current-bg':'#2A2A37', 'current-hl':'#7E9CD8',
    info:'#7AA89F', prompt:'#E6C384', pointer:'#957FB8', marker:'#b4a3d0', spinner:'#7AA89F', header:'#6A9589',
    border:'#54546D', gutter:'#2A2A37',
  },
  'Melange Dark': {
    fg:'#ece1d7', bg:'#292522', hl:'#ebc06d', 'current-fg':'#ece1d7', 'current-bg':'#34302c', 'current-hl':'#ebc06d',
    info:'#86a3a3', prompt:'#b380b0', pointer:'#cf6f4e', marker:'#e09878', spinner:'#99d59d', header:'#86a3a3',
    footer:'#86a3a3', border:'#4a4541', label:'#6a6561', gutter:'#34302c',
  },
  'Melange Light': {
    fg:'#54433a', bg:'#f1f1f1', hl:'#9f6a25', 'current-fg':'#54433a', 'current-bg':'#e5e1db', 'current-hl':'#9f6a25',
    info:'#4f7272', prompt:'#824e7e', pointer:'#b65c3e', marker:'#9a5035', spinner:'#4e7548', header:'#4f7272',
    footer:'#4f7272', border:'#c9c2b7', label:'#90897e', gutter:'#e5e1db',
  },
  'Modus Operandi': {
    fg:'#000000', bg:'#ffffff', hl:'#0031a9', 'current-fg':'#000000', 'current-bg':'#e0e0e0', 'current-hl':'#0031a9',
    info:'#00663f', prompt:'#5317ac', pointer:'#a60000', marker:'#802020', spinner:'#005e8b', header:'#005e8b',
    footer:'#005e8b', border:'#c0c0c0', label:'#585858', gutter:'#e0e0e0',
  },
  'Modus Vivendi': {
    fg:'#ffffff', bg:'#000000', hl:'#79a8ff', 'current-fg':'#ffffff', 'current-bg':'#1e1e1e', 'current-hl':'#79a8ff',
    info:'#6ae4b9', prompt:'#b6a0ff', pointer:'#ff7f86', marker:'#ffa8ad', spinner:'#00d3d0', header:'#00bcff',
    footer:'#00bcff', border:'#535353', label:'#989898', gutter:'#1e1e1e',
  },
  'Monokai Pro': {
    fg:'#fcfcfa', bg:'#2d2a2e', hl:'#ffd866', 'current-fg':'#fcfcfa', 'current-bg':'#403e41', 'current-hl':'#ffd866',
    info:'#78dce8', prompt:'#ab9df2', pointer:'#ff6188', marker:'#ff8da6', spinner:'#a9dc76', header:'#78dce8',
    footer:'#78dce8', border:'#5b595c', label:'#939293', gutter:'#403e41',
  },
  'Moonfly': {
    fg:'#b2b2b2', bg:'#080808', hl:'#80a0ff', 'current-fg':'#c6c6c6', 'current-bg':'#1a1a2e', 'current-hl':'#80a0ff',
    info:'#36c692', prompt:'#ae81ff', pointer:'#ff5454', marker:'#ff8080', spinner:'#79dac8', header:'#74b2ff',
    footer:'#74b2ff', border:'#303030', label:'#686868', gutter:'#1a1a2e',
  },
  'Night Owl': {
    fg:'#d6deeb', bg:'#011627', hl:'#addb67', 'current-fg':'#d6deeb', 'current-bg':'#0b2942', 'current-hl':'#addb67',
    info:'#82aaff', prompt:'#c792ea', pointer:'#ef5350', marker:'#f57e7c', spinner:'#7fdbca', header:'#82aaff',
    footer:'#82aaff', border:'#1d3b53', label:'#5f7e97', gutter:'#0b2942',
  },
  'Nightfox': {
    fg:'#cdcecf', bg:'#192330', hl:'#63cdcf', 'current-fg':'#cdcecf', 'current-bg':'#2b3b51', 'current-hl':'#63cdcf',
    info:'#aeafb0', prompt:'#719cd6', pointer:'#c94f6d', marker:'#df7e94', spinner:'#81b29a', header:'#9d79d6',
    footer:'#9d79d6', border:'#39506d', label:'#71839b', gutter:'#2b3b51',
  },
  'Nord': {
    fg:'#D8DEE9', bg:'#2E3440', hl:'#A3BE8C', 'current-fg':'#D8DEE9', 'current-bg':'#434C5E', 'current-hl':'#A3BE8C',
    info:'#4C566A', prompt:'#81A1C1', pointer:'#BF616A', marker:'#d08888', spinner:'#4C566A', header:'#4C566A',
    border:'#4C566A', gutter:'#434C5E',
  },
  'One Dark': {
    fg:'#abb2bf', bg:'#282c34', hl:'#c678dd', 'current-fg':'#ffffff', 'current-bg':'#4b5263', 'current-hl':'#d858fe',
    info:'#98c379', prompt:'#61afef', pointer:'#be5046', marker:'#d87c73', spinner:'#61afef', header:'#61afef',
    border:'#5c6370', gutter:'#4b5263',
  },
  'Palenight': {
    fg:'#a6accd', bg:'#292d3e', hl:'#c792ea', 'current-fg':'#a6accd', 'current-bg':'#34324a', 'current-hl':'#c792ea',
    info:'#82aaff', prompt:'#c3e88d', pointer:'#f07178', marker:'#f59da2', spinner:'#89ddff', header:'#82aaff',
    footer:'#82aaff', border:'#4e5579', label:'#676e95', gutter:'#34324a',
  },
  'Paper Color': {
    fg:'#4d4d4c', bg:'#eeeeee', hl:'#d7005f', 'current-fg':'#4d4d4c', 'current-bg':'#e8e8e8', 'current-hl':'#d7005f',
    info:'#4271ae', prompt:'#8959a8', pointer:'#d7005f', marker:'#b5204f', spinner:'#4271ae', header:'#4271ae',
    border:'#b0b0b0', gutter:'#e8e8e8',
  },
  'Rose Pine': {
    fg:'#908caa', bg:'#191724', hl:'#ebbcba', 'current-fg':'#e0def4', 'current-bg':'#26233a', 'current-hl':'#ebbcba',
    info:'#9ccfd8', prompt:'#908caa', pointer:'#c4a7e7', marker:'#d4c0ee', spinner:'#f6c177', header:'#31748f',
    border:'#403d52', gutter:'#26233a',
    'preview-fg':'#e0def4',
  },
  'Rose Pine Dawn': {
    fg:'#797593', bg:'#faf4ed', hl:'#d7827e', 'current-fg':'#575279', 'current-bg':'#f2e9e1', 'current-hl':'#d7827e',
    info:'#56949f', prompt:'#797593', pointer:'#907aa9', marker:'#7a6890', spinner:'#ea9d34', header:'#286983',
    border:'#dfdad9', gutter:'#f2e9e1',
    'preview-fg':'#575279',
  },
  'Solarized Dark': {
    fg:'#839496', bg:'#002b36', hl:'#b58900', 'current-fg':'#eee8d5', 'current-bg':'#073642', 'current-hl':'#b58900',
    info:'#2aa198', prompt:'#859900', pointer:'#cb4b16', marker:'#e08050', spinner:'#2aa198', header:'#586e75',
    border:'#586e75', gutter:'#073642',
  },
  'Solarized Light': {
    fg:'#657b83', bg:'#fdf6e3', hl:'#268bd2', 'current-fg':'#586e75', 'current-bg':'#eee8d5', 'current-hl':'#268bd2',
    info:'#268bd2', prompt:'#268bd2', pointer:'#cb4b16', marker:'#a84012', spinner:'#268bd2', header:'#93a1a1',
    border:'#93a1a1', gutter:'#eee8d5',
  },
  'Srcery': {
    fg:'#fce8c3', bg:'#1c1b19', hl:'#fbb829', 'current-fg':'#fce8c3', 'current-bg':'#2d2b28', 'current-hl':'#fbb829',
    info:'#519f50', prompt:'#68a8e4', pointer:'#ef2f27', marker:'#ff5c57', spinner:'#0aaeb3', header:'#2c78bf',
    footer:'#2c78bf', border:'#918175', label:'#918175', gutter:'#2d2b28',
  },
  'Tokyo Night': {
    fg:'#c0caf5', bg:'#1a1b26', hl:'#2ac3de', 'current-fg':'#c0caf5', 'current-bg':'#283457', 'current-hl':'#2ac3de',
    info:'#545c7e', prompt:'#2ac3de', pointer:'#ff007c', marker:'#ff5da0', spinner:'#ff007c', header:'#ff9e64',
    border:'#27a1b9', separator:'#ff9e64', gutter:'#283457', query:'#c0caf5',
  },
  'Tokyo Night Day': {
    fg:'#3760bf', bg:'#d0d5e3', hl:'#188092', 'current-fg':'#3760bf', 'current-bg':'#b7c1e3', 'current-hl':'#188092',
    info:'#8990b3', prompt:'#188092', pointer:'#d20065', marker:'#a80050', spinner:'#d20065', header:'#b15c00',
    border:'#4094a3', separator:'#b15c00', gutter:'#b7c1e3', query:'#3760bf',
  },
  'Tomorrow Night': {
    fg:'#c5c8c6', bg:'#1d1f21', hl:'#b294bb', 'current-fg':'#c5c8c6', 'current-bg':'#373b41', 'current-hl':'#b294bb',
    info:'#969896', prompt:'#b5bd68', pointer:'#81a2be', marker:'#a4bdd4', spinner:'#8abeb7', header:'#81a2be',
    border:'#4a4e54', gutter:'#373b41',
  },
  'Zenburn': {
    fg:'#dcdccc', bg:'#3f3f3f', hl:'#f0dfaf', 'current-fg':'#dcdccc', 'current-bg':'#4f4f4f', 'current-hl':'#f0dfaf',
    info:'#7f9f7f', prompt:'#8cd0d3', pointer:'#cc9393', marker:'#ddb0b0', spinner:'#7f9f7f', header:'#93e0e3',
    footer:'#93e0e3', border:'#5f5f5f', label:'#6f6f6f', gutter:'#4f4f4f',
  },
};
var ALL_ITEMS = [
  'src/reader.go', 'src/result.go', 'src/result_others.go',
  'src/result_test.go', 'src/reader_test.go', 'src/result_x86.go',
  'src/core.go', 'src/merger.go', 'src/server.go', 'src/matcher.go',
  'src/terminal.go', 'src/pattern.go', 'src/cache.go', 'src/item.go',
  'src/tokenizer.go', 'src/history.go', 'src/options.go', 'src/algo/normalize.go',
  'src/util/chars_test.go', 'src/util/eventbox.go', 'src/protector/protector.go',
  'src/terminal_unix.go', 'src/terminal_windows.go', 'src/ansi.go',
  'src/ansi_test.go', 'src/chunklist.go', 'src/chunklist_test.go',
  'src/constants.go', 'src/merger_test.go', 'src/tui/tui.go',
  'src/tui/light.go', 'src/tui/tcell.go', 'src/tui/eventtype_string.go',
  'src/algo/algo.go', 'src/algo/algo_test.go', 'src/util/util.go',
  'src/util/atomicbool.go', 'src/util/slab.go', 'src/proxy.go',
  'src/actiontype_string.go', 'src/options_test.go',
  'src/tui/tui_test.go', 'src/tui/light_unix.go', 'src/tui/light_windows.go',
  'src/algo/algo_bench_test.go', 'src/util/chars.go', 'src/util/eventbox_test.go',
  'src/protector/protector_unix.go', 'src/protector/protector_windows.go',
  'src/terminal_test.go', 'src/core_test.go', 'src/pattern_test.go',
  'src/tokenizer_test.go', 'src/server_test.go', 'src/ansi_bench_test.go',
  'src/result_bench_test.go', 'src/history_test.go',
];
var SELECTED = { 1: true, 2: true, 3: true, 5: true };
function fuzzyMatch(text, query) {
  if (!query) return { match: true, positions: [] };
  var lower = text.toLowerCase(), q = query.toLowerCase();
  // Forward scan: find the end position
  var ti = 0;
  for (var qi = 0; qi < q.length; qi++) {
    var found = false;
    while (ti < lower.length) {
      if (lower[ti] === q[qi]) { ti++; found = true; break; }
      ti++;
    }
    if (!found) return { match: false, positions: [] };
  }
  // Backward scan: find the shortest match
  var end = ti;
  var positions = [];
  ti = end - 1;
  for (var qi = q.length - 1; qi >= 0; qi--) {
    while (ti >= 0) {
      if (lower[ti] === q[qi]) { positions.push(ti); ti--; break; }
      ti--;
    }
  }
  positions.reverse();
  return { match: true, positions: positions };
}
function getFilteredItems(query) {
  var results = [];
  ALL_ITEMS.forEach(function(text, idx) {
    var m = fuzzyMatch(text, query);
    if (m.match) {
      var hl = [];
      var pos = m.positions;
      if (pos.length > 0) {
        var start = pos[0], end = pos[0] + 1;
        for (var i = 1; i < pos.length; i++) {
          if (pos[i] === end) { end++; }
          else { hl.push([start, end]); start = pos[i]; end = pos[i] + 1; }
        }
        hl.push([start, end]);
      }
      results.push({ text: text, hl: hl, selected: !!SELECTED[idx], origIdx: idx });
    }
  });
  return results;
}

var COLS = 80, ROWS = 36;
var _sbMainChar = '\u2502', _sbPreviewChar = '\u2502';
var buf = [];
var state = {};
var attrs = {}; // attrs['hl'] = { bold: true, italic: false, ... }
var ATTR_NAMES = ['bold', 'italic', 'dim', 'underline', 'strikethrough', 'reverse'];
var currentPreset = 'Default Dark';

function clearBuf() {
  buf = [];
  for (var r = 0; r < ROWS; r++) {
    var row = [];
    for (var c = 0; c < COLS; c++) {
      row.push({ ch: ' ', fg: null, bg: null });
    }
    buf.push(row);
  }
}

function setCell(r, c, ch, fg, bg) {
  if (r < 0 || r >= ROWS || c < 0 || c >= COLS) return;
  buf[r][c].ch = ch;
  if (fg !== undefined) buf[r][c].fg = fg;
  if (bg !== undefined) buf[r][c].bg = bg;
}

function setText(r, c, text, fg, bg) {
  for (var i = 0; i < text.length; i++) {
    if (c + i >= COLS) break;
    setCell(r, c + i, text[i], fg, bg);
  }
}

function fillRow(r, c1, c2, ch, fg, bg) {
  for (var c = c1; c < c2; c++) {
    setCell(r, c, ch, fg, bg);
  }
}

function fillBg(r, c1, c2, bg) {
  for (var c = c1; c < c2; c++) {
    if (r >= 0 && r < ROWS && c >= 0 && c < COLS) {
      buf[r][c].bg = bg;
    }
  }
}

function fillRect(r1, c1, r2, c2, bg) {
  for (var r = r1; r < r2; r++) {
    fillBg(r, c1, c2, bg);
  }
}

var BORDERS = {
  rounded:   { tl: '\u256d', tr: '\u256e', bl: '\u2570', br: '\u256f', h: '\u2500', v: '\u2502', tl2: '\u251c', tr2: '\u2524' },
  sharp:     { tl: '\u250c', tr: '\u2510', bl: '\u2514', br: '\u2518', h: '\u2500', v: '\u2502', tl2: '\u251c', tr2: '\u2524' },
  bold:      { tl: '\u250f', tr: '\u2513', bl: '\u2517', br: '\u251b', h: '\u2501', v: '\u2503', tl2: '\u2520', tr2: '\u2528' },
  double:    { tl: '\u2554', tr: '\u2557', bl: '\u255a', br: '\u255d', h: '\u2550', v: '\u2551', tl2: '\u2560', tr2: '\u2563' },
  block:     { tl: '\u259b', tr: '\u259c', bl: '\u2599', br: '\u259f', h: '\u2580', v: '\u258c', bh: '\u2584', rv: '\u2590', tl2: '\u258c', tr2: '\u2590' },
  thinblock: { tl: '\u{1FB7D}', tr: '\u{1FB7E}', bl: '\u{1FB7C}', br: '\u{1FB7F}', h: '\u2594', v: '\u258f', bh: '\u2581', rv: '\u2595', tl2: '\u258f', tr2: '\u2595' },
};

function drawBox(r, c, w, h, borderStyle, color) {
  var b = BORDERS[borderStyle] || BORDERS.rounded;
  if (w < 2 || h < 2) return;
  setCell(r, c, b.tl, color);
  setCell(r, c + w - 1, b.tr, color);
  setCell(r + h - 1, c, b.bl, color);
  setCell(r + h - 1, c + w - 1, b.br, color);
  var bh = b.bh || b.h;
  var rv = b.rv || b.v;
  for (var i = 1; i < w - 1; i++) {
    setCell(r, c + i, b.h, color);
    setCell(r + h - 1, c + i, bh, color);
  }
  for (var j = 1; j < h - 1; j++) {
    setCell(r + j, c, b.v, color);
    setCell(r + j, c + w - 1, rv, color);
  }
}

function drawHLine(r, c1, c2, borderStyle, color) {
  var b = BORDERS[borderStyle] || BORDERS.rounded;
  for (var c = c1; c < c2; c++) {
    setCell(r, c, b.h, color);
  }
}

function drawInlineSep(r, c1, c2, outerBorderStyle, color, bg) {
  var b = BORDERS[outerBorderStyle] || BORDERS.rounded;
  setCell(r, c1, b.tl2, color, bg);
  setCell(r, c2 - 1, b.tr2, color, bg);
  for (var c = c1 + 1; c < c2 - 1; c++) {
    setCell(r, c, b.h, color, bg);
  }
}

function fillSep(r, c1, c2, sepStr, color) {
  if (!sepStr) return;
  var len = sepStr.length;
  for (var c = c1; c < c2; c++) {
    setCell(r, c, sepStr[(c - c1) % len], color);
  }
}

function drawVLine(r1, r2, c, borderStyle, color) {
  var b = BORDERS[borderStyle] || BORDERS.rounded;
  for (var r = r1; r < r2; r++) {
    setCell(r, c, b.v, color);
  }
}

function parseLabelPos(labelPos) {
  if (!labelPos) return { offset: 'center', edge: 'top' };
  var parts = labelPos.split(/[:,]/);
  var offset = 'center';
  var edge = 'top';
  for (var i = 0; i < parts.length; i++) {
    var p = parts[i].trim();
    if (p === 'top' || p === 'bottom') {
      edge = p;
    } else if (p === 'center' || p === '') {
      offset = 'center';
    } else {
      offset = p;
    }
  }
  return { offset: offset, edge: edge };
}
function drawLabel(r, c, w, h, text, color, labelPos, bg) {
  var parsed = parseLabelPos(labelPos);
  var labelStr = ' ' + text + ' ';
  var labelR = (parsed.edge === 'bottom') ? r + h - 1 : r;
  var pos;
  var n = parseInt(parsed.offset, 10);
  if (parsed.offset === 'center' || parsed.offset === '' || n === 0) {
    pos = c + Math.floor((w - labelStr.length) / 2);
  } else if (!isNaN(n)) {
    if (n > 0) {
      pos = c + n - 1;
    } else {
      pos = c + w + n - labelStr.length + 1;
    }
  } else {
    pos = c + Math.floor((w - labelStr.length) / 2);
  }
  // Only overwrite bg if explicitly provided (e.g. list label over inline section)
  if (bg !== undefined) {
    for (var ci = pos; ci < pos + labelStr.length; ci++) {
      if (ci >= 0 && ci < COLS && labelR >= 0 && labelR < ROWS) buf[labelR][ci].bg = bg;
    }
  }
  setText(labelR, pos, labelStr, color);
}

function drawScrollbar(r, c, height, thumbPos, thumbSize, trackColor, thumbColor, sbChar) {
  var ch = sbChar || '\u2502';
  for (var i = 0; i < height; i++) {
    if (i >= thumbPos && i < thumbPos + thumbSize) {
      setCell(r + i, c, ch, thumbColor || trackColor);
    }
  }
}

function escHtml(s) {
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

var PREVIEW_LINES = [
  [['cm', '// src/reader.go']],
  [['kw', 'package'], ['', ' fzf']],
  [['', '']],
  [['kw', 'import'], ['', ' (']],
  [['', '  '], ['str', '"bytes"']],
  [['', '  '], ['str', '"io"']],
  [['', '  '], ['str', '"os"']],
  [['', '  '], ['str', '"path/filepath"']],
  [['', '  '], ['str', '"sync"']],
  [['', '  '], ['str', '"sync/atomic"']],
  [['', ')']],
  [['', '']],
  [['cm', '// Reader reads from command or standard input']],
  [['kw', 'type'], ['', ' '], ['fn', 'Reader'], ['', ' '], ['kw', 'struct'], ['', ' {']],
  [['', '  pusher  '], ['kw', 'func'], ['', '([]'], ['kw', 'byte'], ['', ') '], ['kw', 'bool']],
  [['', '  event   '], ['kw', 'int32']],
  [['', '  cancel  '], ['kw', 'bool']],
  [['', '}']],
  [['', '']],
  [['cm', '// NewReader creates a new Reader']],
  [['kw', 'func'], ['', ' '], ['fn', 'NewReader'], ['', '(pusher '], ['kw', 'func'], ['', '([]'], ['kw', 'byte'], ['', ') '], ['kw', 'bool'], ['', ') *Reader {']],
  [['', '  '], ['kw', 'return'], ['', ' &Reader{']],
  [['', '    pusher: pusher,']],
  [['', '    event:  '], ['num', '0'], ['', ',']],
  [['', '    cancel: '], ['kw', 'false'], ['', ',']],
  [['', '  }']],
  [['', '}']],
  [['', '']],
  [['cm', '// ReadSource reads data from the source']],
  [['kw', 'func'], ['', ' (r *Reader) '], ['fn', 'ReadSource'], ['', '(ctx context.Context) {']],
  [['', '  '], ['kw', 'var'], ['', ' buf bytes.Buffer']],
  [['', '  scanner := bufio.NewScanner(r.input)']],
  [['', '  '], ['kw', 'for'], ['', ' scanner.Scan() {']],
  [['', '    r.pusher(scanner.Bytes())']],
  [['', '  }']],
  [['', '}']],
];
var PREVIEW_COLORS = { kw: '#c678dd', fn: '#61afef', str: '#98c379', cm: '#5c6370', num: '#d19a66' };

function getCol(id, fallback1, fallback2) {
  return state[id] || (fallback1 && state[fallback1]) || fallback2 || null;
}

function renderFzf() {
  clearBuf();
  var styleRaw = document.getElementById('styleSelect').value;
  var styleParts = styleRaw.split(':');
  var style = styleParts[0];
  var fullBorderStyle = styleParts[1] || 'rounded';
  var borderVal = document.getElementById('borderSelect').value;
  var border = borderVal === '' ? 'none' : (borderVal === '(no argument)' ? fullBorderStyle : borderVal);
  var layout = document.getElementById('layoutSelect').value;
  var infoRaw = document.getElementById('infoSelect').value;
  var info = infoRaw || (style === 'full' ? 'inline-right' : 'default');
  var highlightLine = document.getElementById('highlightLineCheck').checked;
  var query = document.getElementById('queryInput').value;
  var gapOn = document.getElementById('opt-gap').checked;
  var gapLineStr = document.getElementById('opt-gap-line').value || '\u2508';
  var separatorRaw = document.getElementById('opt-separator').value;
  var noSeparator = document.getElementById('opt-no-separator').checked;
  var separatorStr = noSeparator ? '' : (separatorRaw || (style === 'minimal' ? '' : '\u2500'));
  var headerFirst = document.getElementById('opt-header-first').checked;
  var ptrChar = document.getElementById('opt-pointer').value;
  var mkChar = document.getElementById('opt-marker').value;
  var gutterChar = document.getElementById('opt-gutter').value;
  _sbMainChar = document.getElementById('opt-scrollbar-main').value || '\u2502';
  _sbPreviewChar = document.getElementById('opt-scrollbar-preview').value || _sbMainChar;

  var items = getFilteredItems(query);
  var total = ALL_ITEMS.length;
  var matched = items.length;
  var selCount = Object.keys(SELECTED).length;
  var infoText = matched + '/' + total + (selCount > 0 ? ' (' + selCount + ')' : '');

  var borderColor = getCol('border', null, '#5f5f5f');
  var labelColor = getCol('label', null, '#afafaf');
  var sepColor = getCol('separator', 'border', '#5f5f5f');
  var fgColor = state.fg || null;
  var bgColor = state.bg || null;
  var promptColor = getCol('prompt', null, '#87afd7');
  var queryColor = getCol('query', 'fg', '#d0d0d0');
  var ghostColor = getCol('ghost', null, '#626262');
  var infoColor = getCol('info', null, '#afaf87');
  var spinnerColor = getCol('spinner', null, '#afd700');
  var headerColor = getCol('header', null, '#87afaf');
  var footerColor = getCol('footer', 'header', '#87afaf');
  var pointerColor = getCol('pointer', null, '#d7005f');
  var markerColor = getCol('marker', null, '#d75f87');
  var gutterColor = getCol('gutter', 'current-bg', null);
  var scrollbarColor = getCol('scrollbar', 'border', '#5f5f5f');
  var hlColor = getCol('hl', null, '#87af87');
  var curFg = getCol('current-fg', 'fg', '#e4e4e4');
  var curBg = getCol('current-bg', null, '#303030');
  var curHl = getCol('current-hl', 'hl', '#afd7af');
  var selFg = getCol('selected-fg', 'fg', null);
  var selBg = getCol('selected-bg', null, null);
  var selHl = getCol('selected-hl', 'hl', null);
  var pvFg = getCol('preview-fg', 'fg', null);
  var pvBg = getCol('preview-bg', 'bg', null);
  var pvBorderColor = getCol('preview-border', 'border', '#5f5f5f');
  var pvLabelColor = getCol('preview-label', 'label', null) || labelColor;
  var pvScrollbarColor = getCol('preview-scrollbar', 'scrollbar', null) || scrollbarColor;
  var inputBg = getCol('input-bg', null, null);
  var inputBorderColor = getCol('input-border', 'border', '#5f5f5f');
  var inputLabelColor = getCol('input-label', 'label', null) || labelColor;
  var headerBg = getCol('header-bg', null, null);
  var headerBorderColor = getCol('header-border', 'border', '#5f5f5f');
  var headerLabelColor = getCol('header-label', 'label', null) || labelColor;
  var footerBg = getCol('footer-bg', null, null);
  var footerBorderColor = getCol('footer-border', 'border', '#5f5f5f');
  var footerLabelColor = getCol('footer-label', 'label', null) || labelColor;
  var listBg = getCol('list-bg', 'bg', null);
  var listFg = getCol('list-fg', null, null);
  var listBorderColor = getCol('list-border', 'border', '#5f5f5f');
  var listLabelColor = getCol('list-label', 'label', null) || labelColor;
  var altBg = getCol('alt-bg', null, null);
  var gapLineColor = getCol('gap-line', 'border', '#5f5f5f');

  var borderLabelPos = document.getElementById('opt-border-label-pos').value.trim();
  var inputLabelPos = document.getElementById('opt-input-label-pos').value.trim();
  var listLabelPos = document.getElementById('opt-list-label-pos').value.trim();
  var headerLabelPos = document.getElementById('opt-header-label-pos').value.trim();
  var footerLabelPos = document.getElementById('opt-footer-label-pos').value.trim();
  var previewLabelPos = document.getElementById('opt-preview-label-pos').value.trim();


  function parseSpacing(val, totalW, totalH) {
    var parts = val.replace(/,/g, ' ').trim().split(/\s+/);
    if (parts.length === 0 || (parts.length === 1 && parts[0] === '')) return [0, 0, 0, 0];
    function resolve(s, total) {
      if (s.indexOf('%') >= 0) return Math.round(total * parseFloat(s) / 100);
      return parseInt(s, 10) || 0;
    }
    if (parts.length === 1) { var v = resolve(parts[0], totalH), h = resolve(parts[0], totalW); return [v, h, v, h]; }
    if (parts.length === 2) { var v = resolve(parts[0], totalH), h = resolve(parts[1], totalW); return [v, h, v, h]; }
    if (parts.length === 3) { return [resolve(parts[0], totalH), resolve(parts[1], totalW), resolve(parts[2], totalH), resolve(parts[1], totalW)]; }
    return [resolve(parts[0], totalH), resolve(parts[1], totalW), resolve(parts[2], totalH), resolve(parts[3], totalW)];
  }
  var mParsed = parseSpacing(document.getElementById('marginInput').value, COLS, ROWS);
  var pParsed = parseSpacing(document.getElementById('paddingInput').value, COLS, ROWS);

  var mTop = mParsed[0], mRight = mParsed[1], mBot = mParsed[2], mLeft = mParsed[3];
  var pTop = pParsed[0], pRight = pParsed[1], pBot = pParsed[2], pLeft = pParsed[3];

  var boxTop = mTop;
  var boxLeft = mLeft;
  var boxW = COLS - mLeft - mRight;
  var boxH = ROWS - mTop - mBot;

  var hasBorder = (border !== 'none');
  var ob = hasBorder ? 1 : 0;
  var innerTop = boxTop + ob + pTop;
  var innerBot = boxTop + boxH - ob - pBot;
  var innerLeft = boxLeft + ob + pLeft;
  var innerRight = boxLeft + boxW - ob - pRight;
  var innerW = innerRight - innerLeft;
  var innerH = innerBot - innerTop;

  if (bgColor) fillRect(boxTop, boxLeft, boxTop + boxH, boxLeft + boxW, bgColor);

  if (hasBorder) {
    drawBox(boxTop, boxLeft, boxW, boxH, border, borderColor);
    drawLabel(boxTop, boxLeft, boxW, boxH, 'Demo', labelColor, borderLabelPos);
  }

  var pvWidth = Math.floor(innerW / 2);
  var leftWidth = innerW - pvWidth;
  var pvLeft = innerLeft + leftWidth;
  var pvRight = innerRight;
  var leftRight = pvLeft;

  var isFull = (style === 'full');
  var fullPad = isFull ? 1 : 0;
  var fullGapV = 0;

  var contentLeft = innerLeft + fullPad;
  var contentRight = leftRight;
  var contentW = contentRight - contentLeft;

  function normBorder(v, fallback) {
    if (v === '') return fallback;
    if (v === '(no argument)') return 'rounded';
    return v;
  }
  var fullDefault = isFull ? fullBorderStyle : 'none';
  var optInputBorder = normBorder(document.getElementById('opt-input-border').value, fullDefault);
  var optListBorder = normBorder(document.getElementById('opt-list-border').value, fullDefault);
  var optHeaderBorder = normBorder(document.getElementById('opt-header-border').value, fullDefault);
  var optFooterBorder = normBorder(document.getElementById('opt-footer-border').value, fullDefault);
  var pvDefault = style === 'minimal' ? 'line' : (isFull ? fullBorderStyle : 'rounded');
  var optPreviewBorder = normBorder(document.getElementById('opt-preview-border').value, pvDefault);

  var inputBorderStyle = optInputBorder;
  var headerBorderStyle = optHeaderBorder;
  var footerBorderStyle = optFooterBorder;
  var pvBorderStyle = optPreviewBorder;

  var inputIsLine = inputBorderStyle === 'line';
  var headerIsLine = headerBorderStyle === 'line';
  var footerIsLine = footerBorderStyle === 'line';
  var inputIsInline = false;
  var listBordered = (optListBorder && optListBorder !== 'none' && optListBorder !== 'line');
  // Inline requires list border with top+bottom; fallback to line otherwise
  var headerIsInline = headerBorderStyle === 'inline' && listBordered;
  var footerIsInline = footerBorderStyle === 'inline' && listBordered;
  if (headerBorderStyle === 'inline' && !listBordered) headerIsLine = true;
  if (footerBorderStyle === 'inline' && !listBordered) footerIsLine = true;
  var listIsLine = false;
  var inputBordered = (optInputBorder && optInputBorder !== 'none' && optInputBorder !== 'line' && optInputBorder !== 'inline');
  var headerBordered = (optHeaderBorder && optHeaderBorder !== 'none' && optHeaderBorder !== 'line' && optHeaderBorder !== 'inline');
  var footerBordered = (optFooterBorder && optFooterBorder !== 'none' && optFooterBorder !== 'line' && optFooterBorder !== 'inline');

  var sections = [];

  var hasInfoLine = (info === 'default' || info === 'right');
  var infoInInput = hasInfoLine && (inputBordered || inputIsLine || inputIsInline);
  var inputH = inputBordered ? (infoInInput ? 4 : 3) : (inputIsLine || inputIsInline) ? (infoInInput ? 3 : 2) : 1;
  var infoH = (hasInfoLine && !infoInInput) ? 1 : 0;
  var headerH = headerBordered ? 3 : (headerIsLine || headerIsInline) ? 2 : 1;
  var footerH = footerBordered ? 3 : 2;

  // Inline sections are embedded inside the list border, not separate sections
  var inlineHeaderH = headerIsInline ? 2 : 0; // separator + content
  var inlineFooterH = footerIsInline ? 2 : 0;
  var extHeaderH = headerIsInline ? 0 : headerH;
  var extFooterH = footerIsInline ? 0 : footerH;

  if (layout === 'reverse') {
    sections.push({ type: 'input', h: inputH });
    if (infoH) sections.push({ type: 'info', h: infoH });
    if (headerFirst && !headerIsInline) {
      sections.splice(0, 0, { type: 'header', h: extHeaderH });
    } else if (!headerIsInline) {
      sections.push({ type: 'header', h: extHeaderH });
    }
    sections.push({ type: 'list', h: 0 });
    if (!footerIsInline) sections.push({ type: 'footer', h: extFooterH });
  } else {
    if (!footerIsInline) sections.push({ type: 'footer', h: extFooterH });
    sections.push({ type: 'list', h: 0 });
    if (headerFirst && !headerIsInline) {
      if (infoH) sections.push({ type: 'info', h: infoH });
      sections.push({ type: 'input', h: inputH });
      sections.push({ type: 'header', h: extHeaderH });
    } else {
      if (!headerIsInline) sections.push({ type: 'header', h: extHeaderH });
      if (infoH) sections.push({ type: 'info', h: infoH });
      sections.push({ type: 'input', h: inputH });
    }
  }

  var fixedH = 0;
  sections.forEach(function(s) { fixedH += s.h; });
  var gapCount = isFull ? sections.length - 1 : 0;
  fixedH += gapCount * fullGapV;
  var listH = innerH - fixedH;
  if (listH < 1) listH = 1;
  sections.forEach(function(s) { if (s.type === 'list') s.h = listH; });

  var curRow = innerTop;
  sections.forEach(function(s) {
    s.top = curRow;
    curRow += s.h + (isFull ? fullGapV : 0);
  });

  sections.forEach(function(s) {
    var t = s.top;
    var h = s.h;
    var l = contentLeft;
    var r = contentRight;
    var w = contentW;

    if (s.type === 'input') {
      if (inputBg) fillRect(t, l, t + h, r, inputBg);
      if (inputBordered) {
        drawBox(t, l, w, h, inputBorderStyle, inputBorderColor);
        drawLabel(t, l, w, h, 'Input', inputLabelColor, inputLabelPos);
        if (infoInInput) {
          var iiLeft = l + 1 + 2;
          var iiRight = l + w - 1;
          if (info === 'right') {
            var iiPos = iiRight - infoText.length - 1;
            setText(t + 1, iiPos, infoText, infoColor);
            fillSep(t + 1, iiLeft, iiPos - 1, separatorStr, sepColor);
          } else {
            setText(t + 1, iiLeft, infoText, infoColor);
            fillSep(t + 1, iiLeft + infoText.length + 1, iiRight, separatorStr, sepColor);
          }
          drawInputRow(t + 2, l + 1, w - 2, query, promptColor, queryColor, ghostColor, info, infoText, infoColor, spinnerColor, sepColor);
        } else {
          drawInputRow(t + 1, l + 1, w - 2, query, promptColor, queryColor, ghostColor, info, infoText, infoColor, spinnerColor, sepColor);
        }
      } else if (inputIsInline) {
        var inlLeft = boxLeft;
        var inlRight = boxLeft + boxW;
        var lineAtBottom = (layout === 'reverse');
        if (lineAtBottom) {
          drawInlineSep(t + h - 1, inlLeft, inlRight, border, inputBorderColor);
          drawLabel(t + h - 1, inlLeft, boxW, 1, 'Input', inputLabelColor, inputLabelPos);
          if (infoInInput) {
            var iiLeft = l + 3;
            if (info === 'right') {
              var iiPos = r - infoText.length - 1;
              setText(t, iiPos, infoText, infoColor);
              fillSep(t, iiLeft, iiPos - 1, separatorStr, sepColor);
            } else {
              setText(t, iiLeft, infoText, infoColor);
              fillSep(t, iiLeft + infoText.length + 1, r, separatorStr, sepColor);
            }
            drawInputRow(t + 1, l + 1, w - 1, query, promptColor, queryColor, ghostColor, info, infoText, infoColor, spinnerColor, sepColor);
          } else {
            drawInputRow(t, l + 1, w - 1, query, promptColor, queryColor, ghostColor, info, infoText, infoColor, spinnerColor, sepColor);
          }
        } else {
          drawInlineSep(t, inlLeft, inlRight, border, inputBorderColor);
          drawLabel(t, inlLeft, boxW, 1, 'Input', inputLabelColor, inputLabelPos);
          if (infoInInput) {
            var iiLeft = l + 3;
            if (info === 'right') {
              var iiPos = r - infoText.length - 1;
              setText(t + 1, iiPos, infoText, infoColor);
              fillSep(t + 1, iiLeft, iiPos - 1, separatorStr, sepColor);
            } else {
              setText(t + 1, iiLeft, infoText, infoColor);
              fillSep(t + 1, iiLeft + infoText.length + 1, r, separatorStr, sepColor);
            }
            drawInputRow(t + 2, l + 1, w - 1, query, promptColor, queryColor, ghostColor, info, infoText, infoColor, spinnerColor, sepColor);
          } else {
            drawInputRow(t + 1, l + 1, w - 1, query, promptColor, queryColor, ghostColor, info, infoText, infoColor, spinnerColor, sepColor);
          }
        }
      } else if (inputIsLine) {
        var lineAtBottom = (layout === 'reverse');
        if (lineAtBottom) {
          drawHLine(t + h - 1, l, r, 'rounded', inputBorderColor);
          drawLabel(t + h - 1, l, w, 1, 'Input', inputLabelColor, inputLabelPos);
          if (infoInInput) {
            var iiLeft = l + 3;
            if (info === 'right') {
              var iiPos = r - infoText.length - 1;
              setText(t, iiPos, infoText, infoColor);
              fillSep(t, iiLeft, iiPos - 1, separatorStr, sepColor);
            } else {
              setText(t, iiLeft, infoText, infoColor);
              fillSep(t, iiLeft + infoText.length + 1, r, separatorStr, sepColor);
            }
            drawInputRow(t + 1, l + 1, w - 1, query, promptColor, queryColor, ghostColor, info, infoText, infoColor, spinnerColor, sepColor);
          } else {
            drawInputRow(t, l + 1, w - 1, query, promptColor, queryColor, ghostColor, info, infoText, infoColor, spinnerColor, sepColor);
          }
        } else {
          drawHLine(t, l, r, 'rounded', inputBorderColor);
          drawLabel(t, l, w, 1, 'Input', inputLabelColor, inputLabelPos);
          if (infoInInput) {
            var iiLeft = l + 3;
            if (info === 'right') {
              var iiPos = r - infoText.length - 1;
              setText(t + 1, iiPos, infoText, infoColor);
              fillSep(t + 1, iiLeft, iiPos - 1, separatorStr, sepColor);
            } else {
              setText(t + 1, iiLeft, infoText, infoColor);
              fillSep(t + 1, iiLeft + infoText.length + 1, r, separatorStr, sepColor);
            }
            drawInputRow(t + 2, l + 1, w - 1, query, promptColor, queryColor, ghostColor, info, infoText, infoColor, spinnerColor, sepColor);
          } else {
            drawInputRow(t + 1, l + 1, w - 1, query, promptColor, queryColor, ghostColor, info, infoText, infoColor, spinnerColor, sepColor);
          }
        }
      } else {
        drawInputRow(t, l + (isFull ? 0 : 1), w - (isFull ? 0 : 1), query, promptColor, queryColor, ghostColor, info, infoText, infoColor, spinnerColor, sepColor);
      }
    } else if (s.type === 'info') {
      var infoLeft = l + (isFull ? 0 : 1) + 2;
      var infoRight = r;
      if (info === 'right') {
        var irPos = infoRight - infoText.length - 1;
        setText(t, irPos, infoText, infoColor);
        setCell(t, irPos - 2, '\u280b', spinnerColor);
        fillSep(t, infoLeft, irPos - 3, separatorStr, sepColor);
      } else {
        setCell(t, infoLeft, '\u280b', spinnerColor);
        setText(t, infoLeft + 2, infoText, infoColor);
        var sepStart = infoLeft + 2 + infoText.length + 1;
        if (sepStart < infoRight) {
          fillSep(t, sepStart, infoRight, separatorStr, sepColor);
        }
      }
    } else if (s.type === 'header') {
      if (headerBg) fillRect(t, l, t + h, r, headerBg);
      var headerText = 'CTRL-R Reload | CTRL-/ Preview';
      if (headerBordered) {
        drawBox(t, l, w, h, headerBorderStyle, headerBorderColor);
        drawLabel(t, l, w, h, 'Header', headerLabelColor, headerLabelPos);
        setText(t + 1, l + 1 + 2, headerText, headerColor);
      } else if (headerIsLine) {
        var hLineAtBottom = (layout === 'reverse');
        if (hLineAtBottom) {
          setText(t, l + 3, headerText, headerColor);
          drawHLine(t + 1, l, r, 'rounded', headerBorderColor);
          drawLabel(t + 1, l, w, 1, 'Header', headerLabelColor, headerLabelPos);
        } else {
          drawHLine(t, l, r, 'rounded', headerBorderColor);
          drawLabel(t, l, w, 1, 'Header', headerLabelColor, headerLabelPos);
          setText(t + 1, l + 3, headerText, headerColor);
        }
      } else {
        var hpad = isFull ? 0 : 3;
        setText(t, l + hpad, headerText, headerColor);
      }
    } else if (s.type === 'footer') {
      if (footerBg) fillRect(t, l, t + h, r, footerBg);
      var footerText = '4 selected';
      if (footerBordered) {
        drawBox(t, l, w, h, footerBorderStyle, footerBorderColor);
        drawLabel(t, l, w, h, 'Footer', footerLabelColor, footerLabelPos);
        setText(t + 1, l + 1 + 2, footerText, footerColor);
      } else if (footerIsLine) {
        var fLineAtTop = (layout === 'reverse');
        if (fLineAtTop) {
          drawHLine(t, l, r, 'rounded', footerBorderColor);
          drawLabel(t, l, w, 1, 'Footer', footerLabelColor, footerLabelPos);
          setText(t + 1, l + 3, footerText, footerColor);
        } else {
          setText(t, l + 3, footerText, footerColor);
          drawHLine(t + 1, l, r, 'rounded', footerBorderColor);
          drawLabel(t + 1, l, w, 1, 'Footer', footerLabelColor, footerLabelPos);
        }
      } else {
        if (layout !== 'reverse') {
          drawHLine(t + 1, l, r, border, footerBorderColor);
          setText(t, l + 3, footerText, footerColor);
        } else {
          drawHLine(t, l, r, border, footerBorderColor);
          setText(t + 1, l + 3, footerText, footerColor);
        }
      }
    } else if (s.type === 'list') {
      if (listBg) fillRect(t, l, t + h, r, listBg);
      if (listBordered) {
        var listBorderStyle = optListBorder || fullBorderStyle;
        var listBorder = listBorderStyle;
        drawBox(t, l, w, h, listBorderStyle, listBorderColor);
        // Draw inline sections inside the list box
        var listInnerTop = t + 1;
        var listInnerH = h - 2;
        var listInnerLeft = l + 1;
        var listInnerW = w - 2;
        // Inline header at top of list (reverse layout) or bottom (default)
        if (headerIsInline && listInnerH >= 2) {
          if (layout === 'reverse') {
            // Color the top border of list box with header-border color, header bg behind it
            for (var ci = l; ci < l + w; ci++) { var cell = buf[t][ci]; if (cell) { cell.fg = headerBorderColor; if (headerBg) cell.bg = headerBg; } }
            // Left/right verticals adjacent to header content
            setCell(listInnerTop, l, BORDERS[listBorder].v, headerBorderColor, headerBg);
            setCell(listInnerTop, l + w - 1, (BORDERS[listBorder].rv || BORDERS[listBorder].v), headerBorderColor, headerBg);
            if (headerBg) fillBg(listInnerTop, listInnerLeft, listInnerLeft + listInnerW, headerBg);
            setText(listInnerTop, listInnerLeft + 2, 'CTRL-R Reload | CTRL-/ Preview', headerColor);
            drawInlineSep(listInnerTop + 1, l, l + w, listBorder, headerBorderColor, headerBg);
            drawLabel(listInnerTop + 1, l, w, 1, 'Header', headerLabelColor, headerLabelPos);
            listInnerTop += 2;
            listInnerH -= 2;
          } else {
            var hRow = t + h - 2;
            // Color the bottom border of list box with header-border color, header bg behind it
            for (var ci = l; ci < l + w; ci++) { var cell = buf[t + h - 1][ci]; if (cell) { cell.fg = headerBorderColor; if (headerBg) cell.bg = headerBg; } }
            // Left/right verticals adjacent to header content
            setCell(hRow, l, BORDERS[listBorder].v, headerBorderColor, headerBg);
            setCell(hRow, l + w - 1, (BORDERS[listBorder].rv || BORDERS[listBorder].v), headerBorderColor, headerBg);
            if (headerBg) fillBg(hRow, listInnerLeft, listInnerLeft + listInnerW, headerBg);
            drawInlineSep(hRow - 1, l, l + w, listBorder, headerBorderColor, headerBg);
            drawLabel(hRow - 1, l, w, 1, 'Header', headerLabelColor, headerLabelPos);
            setText(hRow, listInnerLeft + 2, 'CTRL-R Reload | CTRL-/ Preview', headerColor);
            listInnerH -= 2;
          }
        }
        // Inline footer at bottom (reverse) or top (default)
        if (footerIsInline && listInnerH >= 2) {
          if (layout !== 'reverse') {
            // Color the top border of list box with footer-border color, footer bg behind it
            for (var ci = l; ci < l + w; ci++) { var cell = buf[t][ci]; if (cell) { cell.fg = footerBorderColor; if (footerBg) cell.bg = footerBg; } }
            // Left/right verticals adjacent to footer content
            setCell(listInnerTop, l, BORDERS[listBorder].v, footerBorderColor, footerBg);
            setCell(listInnerTop, l + w - 1, (BORDERS[listBorder].rv || BORDERS[listBorder].v), footerBorderColor, footerBg);
            if (footerBg) fillBg(listInnerTop, listInnerLeft, listInnerLeft + listInnerW, footerBg);
            setText(listInnerTop, listInnerLeft + 2, '4 selected', footerColor);
            drawInlineSep(listInnerTop + 1, l, l + w, listBorder, footerBorderColor, footerBg);
            drawLabel(listInnerTop + 1, l, w, 1, 'Footer', footerLabelColor, footerLabelPos);
            listInnerTop += 2;
            listInnerH -= 2;
          } else {
            var fRow = t + h - 2;
            // Color the bottom border with footer-border color, footer bg behind it
            for (var ci = l; ci < l + w; ci++) { var cell = buf[t + h - 1][ci]; if (cell) { cell.fg = footerBorderColor; if (footerBg) cell.bg = footerBg; } }
            setCell(fRow, l, BORDERS[listBorder].v, footerBorderColor, footerBg);
            setCell(fRow, l + w - 1, (BORDERS[listBorder].rv || BORDERS[listBorder].v), footerBorderColor, footerBg);
            if (footerBg) fillBg(fRow, listInnerLeft, listInnerLeft + listInnerW, footerBg);
            drawInlineSep(fRow - 1, l, l + w, listBorder, footerBorderColor, footerBg);
            drawLabel(fRow - 1, l, w, 1, 'Footer', footerLabelColor, footerLabelPos);
            setText(fRow, listInnerLeft + 2, '4 selected', footerColor);
            listInnerH -= 2;
          }
        }
        drawListItems(listInnerTop, listInnerLeft, listInnerW, listInnerH, items, layout, highlightLine, gapOn,
          fgColor, hlColor, curFg, curBg, curHl, selFg, selBg, selHl,
          pointerColor, markerColor, gutterColor, gutterChar, ptrChar, mkChar,
          scrollbarColor, listFg, altBg, gapLineColor, gapLineStr, false, style === 'minimal');
        // Draw list label LAST so inline border coloring doesn't override it
        drawLabel(t, l, w, h, 'List', listLabelColor, listLabelPos, listBg);
      } else if (listIsLine) {
        drawHLine(t, l, r, 'rounded', listBorderColor);
        drawListItems(t + 1, l + 1, w - 1, h - 1, items, layout, highlightLine, gapOn,
          fgColor, hlColor, curFg, curBg, curHl, selFg, selBg, selHl,
          pointerColor, markerColor, gutterColor, gutterChar, ptrChar, mkChar,
          scrollbarColor, listFg, altBg, gapLineColor, gapLineStr, false, style === 'minimal');
      } else {
        drawListItems(t, l + (isFull ? 0 : 1), w - (isFull ? 0 : 1), h, items, layout, highlightLine, gapOn,
          fgColor, hlColor, curFg, curBg, curHl, selFg, selBg, selHl,
          pointerColor, markerColor, gutterColor, gutterChar, ptrChar, mkChar,
          scrollbarColor, listFg, altBg, gapLineColor, gapLineStr, false, style === 'minimal');
      }
    }
  });

  drawPreviewPane(innerTop, pvLeft, pvWidth, innerH, isFull, border, pvBorderStyle,
    pvBorderColor, pvLabelColor, pvFg, pvBg, pvScrollbarColor, previewLabelPos, infoColor);


  renderToHtml();
}

function drawInputRow(r, c, w, query, promptColor, queryColor, ghostColor, info, infoText, infoColor, spinnerColor, sepColor) {
  setText(r, c, '> ', promptColor);
  var qStart = c + 2;
  if (query) {
    setText(r, qStart, query, queryColor);
    var cursorPos = qStart + query.length;
    if (cursorPos < c + w) setCell(r, cursorPos, '\u2588', queryColor);
  } else {
    setText(r, qStart, 'Type to search...', ghostColor);
    setCell(r, qStart, '\u2588', queryColor);
  }
  if (info === 'inline') {
    var sepStr = ' < ';
    var pos = qStart + (query ? query.length + 1 : 1);
    setText(r, pos, sepStr, promptColor);
    setCell(r, pos + sepStr.length, '\u280b', spinnerColor);
    setText(r, pos + sepStr.length + 2, infoText, infoColor);
  } else if (info === 'inline-right') {
    var irPos = c + w - infoText.length;
    setText(r, irPos, infoText, infoColor);
    setCell(r, irPos - 2, '\u280b', spinnerColor);
  }
}

function drawListItems(top, left, w, h, items, layout, highlightLine, gapOn,
    fgColor, hlColor, curFg, curBg, curHl, selFg, selBg, selHl,
    pointerColor, markerColor, gutterColor, gutterChar, ptrChar, mkChar,
    scrollbarColor, listFg, altBg, gapLineColor, gapLineStr, noGutter, noGutterStrip) {

  var ptrW = ptrChar ? Math.min(ptrChar.length, 2) : 0;
  var mkW = mkChar ? Math.min(mkChar.length, 2) : 0;
  var gutterW = noGutter ? 0 : (ptrW + mkW);
  var hasGutter = gutterW > 0;
  var textStart = left + gutterW;

  var displayItems = [];
  for (var i = 0; i < items.length; i++) {
    if (gapOn && i > 0) displayItems.push({ type: 'gap' });
    displayItems.push({ type: 'item', item: items[i], idx: i });
  }

  var visibleLines;
  if (layout === 'default') {
    visibleLines = [];
    var count = 0;
    for (var di = 0; di < displayItems.length && count < h; di++) {
      visibleLines.push(displayItems[di]);
      count++;
    }
    visibleLines.reverse();
  } else {
    visibleLines = displayItems.slice(0, h);
  }

  var startRow = (layout === 'default') ? h - visibleLines.length : 0;
  for (var row = 0; row < visibleLines.length; row++) {
    var r = top + startRow + row;
    if (r >= top + h) break;
    var entry = visibleLines[row];
    if (entry.type === 'gap') {
      if (hasGutter && gutterChar && ptrW > 0 && !noGutterStrip) {
        setCell(r, left, gutterChar[0] || ' ', gutterColor);
        for (var gi = 1; gi < ptrW; gi++) setCell(r, left + gi, ' ', gutterColor);
      }
      for (var gc = left + gutterW; gc < left + w; gc++) {
        setCell(r, gc, gapLineStr[(gc - left - gutterW) % gapLineStr.length], gapLineColor);
      }
      continue;
    }

    var item = entry.item;
    var isCurrent = (entry.idx === 0);
    var isSelected = item.selected;
    var isAlt = (entry.idx % 2 === 1);

    var lineFg = fgColor;
    var lineBg = null;
    var lineHl = hlColor;
    var lineGutterColor = gutterColor;

    if (isCurrent) {
      lineFg = curFg;
      lineBg = curBg;
      lineHl = curHl;
    }
    if (isSelected) {
      if (selFg) lineFg = selFg;
      if (selBg) lineBg = selBg;
      if (selHl) lineHl = selHl;
    }
    if (isAlt && altBg && !isCurrent) {
      lineBg = altBg;
    }

    if (hasGutter) {
      if (isCurrent && ptrW > 0) {
        var ptr = ptrChar.substring(0, ptrW);
        while (ptr.length < ptrW) ptr += ' ';
        for (var gi = 0; gi < ptrW; gi++) setCell(r, left + gi, ptr[gi], pointerColor);
      } else if (gutterChar && ptrW > 0 && !noGutterStrip) {
        setCell(r, left, gutterChar[0] || ' ', lineGutterColor);
        for (var gi = 1; gi < ptrW; gi++) setCell(r, left + gi, ' ', lineGutterColor);
      }

      if (isSelected && mkW > 0) {
        var mk = mkChar.substring(0, mkW);
        while (mk.length < mkW) mk += ' ';
        for (var gi = 0; gi < mkW; gi++) setCell(r, left + ptrW + gi, mk[gi], markerColor);
      }
    }

    if (highlightLine && isCurrent && curBg) {
      fillBg(r, left, left + w - 1, curBg);
    } else if (isCurrent && curBg) {
      var textLen = item.text.length;
      var bgEnd = Math.min(textStart + textLen, left + w - 1);
      fillBg(r, left, bgEnd, curBg);
    } else if (lineBg) {
      var bgStart = textStart;
      var textLen = item.text.length;
      var bgEnd = Math.min(textStart + textLen, left + w - 1);
      fillBg(r, bgStart, bgEnd, lineBg);
    }

    var text = item.text;
    var hlRanges = item.hl;
    var col = textStart;
    if (hlRanges && hlRanges.length > 0) {
      var last = 0;
      hlRanges.forEach(function(hr) {
        if (hr[0] > last) {
          var seg = text.substring(last, hr[0]);
          setText(r, col, seg, lineFg);
          col += seg.length;
        }
        var hlSeg = text.substring(hr[0], hr[1]);
        setText(r, col, hlSeg, lineHl);
        col += hlSeg.length;
        last = hr[1];
      });
      if (last < text.length) {
        setText(r, col, text.substring(last), lineFg);
      }
    } else {
      setText(r, col, text, listFg || lineFg);
    }
  }

  var sbCol = left + w - 1;
  if (items.length > h) {
    var thumbSize = Math.max(1, Math.round(h * 0.25));
    var thumbPos = (layout === 'default') ? h - thumbSize : 0;
    drawScrollbar(top, sbCol, h, thumbPos, thumbSize, null, scrollbarColor, _sbMainChar);
  }
}

function drawPreviewPane(top, left, width, height, isFull, border, pvBorderStyle,
    pvBorderColor, pvLabelColor, pvFg, pvBg, pvScrollbarColor, previewLabelPos, infoColor) {

  if (pvBg) fillRect(top, left, top + height, left + width, pvBg);

  var pvIsLine = (pvBorderStyle === 'line');
  var pvHasBorder = (pvBorderStyle && pvBorderStyle !== 'none' && pvBorderStyle !== 'line');
  var contentTop, contentLeft, contentW, contentH;
  if (pvHasBorder) {
    var bLeft, bTop, bW, bH;
    if (isFull) {
      bLeft = left;
      bTop = top;
      bW = width - 1;
      bH = height;
    } else {
      bLeft = left;
      bTop = top;
      bW = width;
      bH = height;
    }
    drawBox(bTop, bLeft, bW, bH, pvBorderStyle, pvBorderColor);
    drawLabel(bTop, bLeft, bW, bH, 'Preview', pvLabelColor, previewLabelPos);
    contentTop = bTop + 1;
    contentLeft = bLeft + 2;
    contentW = bW - 3;
    contentH = bH - 2;
  } else if (pvIsLine) {
    drawVLine(top, top + height, left, border, pvBorderColor);
    contentTop = top;
    contentLeft = left + 2;
    contentW = width - 2;
    contentH = height;
  } else {
    contentTop = top;
    contentLeft = left;
    contentW = width;
    contentH = height;
  }

  var sbCol = contentLeft + contentW - 1;
  var maxTextCol = sbCol;
  for (var pr = 0; pr < contentH && pr < PREVIEW_LINES.length; pr++) {
    var line = PREVIEW_LINES[pr];
    var pc = contentLeft;
    for (var s = 0; s < line.length; s++) {
      var seg = line[s];
      var segColor = seg[0] ? (PREVIEW_COLORS[seg[0]] || pvFg) : pvFg;
      var text = seg[1];
      var remaining = maxTextCol - pc;
      if (remaining <= 0) break;
      if (text.length > remaining) text = text.substring(0, remaining);
      setText(contentTop + pr, pc, text, segColor);
      pc += seg[1].length;
    }
  }
  if (pvHasBorder) {
    var lineCounter = '1/' + PREVIEW_LINES.length;
    var lcCol = sbCol - lineCounter.length;
    for (var ci = 0; ci < lineCounter.length; ci++) {
      setCell(contentTop, lcCol + ci, lineCounter[ci], pvBg || '#262626', infoColor);
    }
  }

  var sbH = contentH;
  if (PREVIEW_LINES.length > contentH) {
    var thumbSize = Math.max(1, Math.round(sbH * 0.25));
    drawScrollbar(contentTop, sbCol, sbH, 0, thumbSize, null, pvScrollbarColor, _sbPreviewChar);
  }
}

function renderToHtml() {
  var pre = document.getElementById('fzfTerminal');
  var html = '';
  for (var r = 0; r < ROWS; r++) {
    var spans = [];
    var curFg = null, curBg = null, curText = '';
    for (var c = 0; c < COLS; c++) {
      var cell = buf[r][c];
      if (cell.fg !== curFg || cell.bg !== curBg) {
        if (curText) spans.push(makeSpan(curText, curFg, curBg));
        curFg = cell.fg; curBg = cell.bg; curText = cell.ch;
      } else {
        curText += cell.ch;
      }
    }
    if (curText) spans.push(makeSpan(curText, curFg, curBg));
    html += spans.join('') + '\n';
  }
  pre.innerHTML = html;
}

function needsFixedWidth(text) {
  for (var i = 0; i < text.length; i++) {
    var code = text.charCodeAt(i);
    if (code >= 0x2800 && code <= 0x28FF) return true;  // Braille
    if (code >= 0x1FB00) return true;  // Symbols for Legacy Computing (thinblock corners)
  }
  return false;
}
function makeSpan(text, fg, bg) {
  var s = '';
  if (fg) s += 'color:' + fg + ';';
  if (bg) s += 'background:' + bg + ';';
  if (needsFixedWidth(text)) s += 'display:inline-block;width:' + text.length + 'ch;';
  if (s) return '<span style="' + s + '">' + escHtml(text) + '</span>';
  return escHtml(text);
}

function init() {
  buildPresetSelect();
  buildControls();
  bindEvents();
  // Hide conditional fields initially
  onDisplayChange();
  var hadParams = deserializeFromUrl();
  if (!hadParams) {
    applyPreset(currentPreset);
    initDone = true;
  }
  // If hadParams, initDone is set in applyDeserializedState
  // If hadParams, applyDeserializedState will call applyColors async
}

function buildPresetSelect() {
  var sel = document.getElementById('presetSelect');
  sel.innerHTML = '<option value="custom">Custom</option>';
  Object.keys(PRESETS).forEach(function(name) {
    var opt = document.createElement('option');
    opt.value = name;
    opt.textContent = name;
    if (name === currentPreset) opt.selected = true;
    sel.appendChild(opt);
  });
}
var BORDER_STYLES = ['rounded','sharp','bold','double','block','thinblock','inline','line','none'];
var STYLE_OPTIONS = ['default','minimal','full','full:sharp','full:bold','full:double','full:block','full:thinblock','full:line'];
var LAYOUT_OPTIONS = ['default','reverse','reverse-list'];
var INFO_OPTIONS = ['default','right','inline','inline-right','hidden'];
var DISPLAY_OPTS = [
  { id: 'styleSelect', label: '--style', type: 'select', options: STYLE_OPTIONS, value: 'default', noEmpty: true, tip: 'Apply a style preset (default, minimal, full[:BORDER_STYLE])' },
  { id: 'layoutSelect', label: '--layout', type: 'select', options: LAYOUT_OPTIONS, value: 'default', noEmpty: true, tip: 'Choose the layout (default: prompt at bottom, reverse: prompt at top)' },
  { id: 'infoSelect', label: '--info', type: 'select', options: INFO_OPTIONS, value: '', emptyLabel: '(not set)', tip: 'Determines the display style of the info line (match counter)' },
  { id: 'marginInput', label: '--margin', type: 'text', value: '0', tip: 'Comma-separated margin around the finder (TRBL or TB,RL). Percent values allowed.' },
  { id: 'paddingInput', label: '--padding', type: 'text', value: '0', tip: 'Comma-separated padding inside the border (TRBL or TB,RL). Percent values allowed.' },
  { id: 'opt-separator', label: '--separator', type: 'text', value: '', tip: 'String to use as the horizontal separator on the info line.' },
  { id: 'opt-no-separator', label: '--no-separator', type: 'check', value: false, tip: 'Hide the horizontal separator on the info line' },
  { id: 'opt-pointer', label: '--pointer', type: 'text', value: '\u258c', maxLength: 2, tip: 'Pointer character for the current line (up to 2 chars). Empty removes the column.' },
  { id: 'opt-marker', label: '--marker', type: 'text', value: '\u258c', maxLength: 2, tip: 'Multi-select marker character (up to 2 chars). Empty removes the column.' },
  { id: 'opt-gutter', label: '--gutter', type: 'text', value: '\u258c', maxLength: 1, tip: 'Gutter character displayed on non-current lines (1 char).' },
  { id: 'opt-scrollbar-main', label: '--scrollbar (main)', type: 'text', value: '\u2502', maxLength: 1, tip: 'Scrollbar character for the main list. Default: │' },
  { id: 'opt-scrollbar-preview', label: '--scrollbar (preview)', type: 'text', value: '', maxLength: 1, tip: 'Scrollbar character for the preview window. Default: same as main.' },
  { id: 'highlightLineCheck', label: '--highlight-line', type: 'check', value: false, tip: 'Highlight the whole current line (always on in full style)' },
  { id: 'opt-gap', label: '--gap', type: 'check', value: false, tip: 'Insert a gap line between each item' },
  { id: 'opt-gap-line', label: '--gap-line', type: 'text', value: '', tip: 'String for the gap line (repeated). Default: dashed line.' },
  { id: 'opt-header-first', label: '--header-first', type: 'check', value: false, tip: 'Display the header above the prompt' },
  { id: 'borderSelect', label: '--border', type: 'select', options: ['(no argument)','rounded','sharp','bold','double','block','thinblock','none'], value: '(no argument)', emptyLabel: '(not set)', tip: 'Draw a border around the fzf finder' },
  { id: 'opt-border-label-pos', label: '--border-label-pos', type: 'label-pos', value: '', tip: 'Position of the outer border label (N[:top|bottom])' },
  { id: 'opt-input-border', label: '--input-border', type: 'select', options: ['(no argument)','rounded','sharp','bold','double','block','thinblock','line','none'], value: '', emptyLabel: '(not set)', tip: 'Draw a border around the input section' },
  { id: 'opt-input-label-pos', label: '--input-label-pos', type: 'label-pos', value: '', tip: 'Position of the input border label' },
  { id: 'opt-list-border', label: '--list-border', type: 'select', options: ['(no argument)','rounded','sharp','bold','double','block','thinblock','none'], value: '', emptyLabel: '(not set)', tip: 'Draw a border around the list section' },
  { id: 'opt-list-label-pos', label: '--list-label-pos', type: 'label-pos', value: '', tip: 'Position of the list border label' },
  { id: 'opt-header-border', label: '--header-border', type: 'select', options: ['(no argument)'].concat(BORDER_STYLES), value: '', emptyLabel: '(not set)', tip: 'Draw a border around the header section' },
  { id: 'opt-header-label-pos', label: '--header-label-pos', type: 'label-pos', value: '', tip: 'Position of the header border label' },
  { id: 'opt-footer-border', label: '--footer-border', type: 'select', options: ['(no argument)'].concat(BORDER_STYLES), value: '', emptyLabel: '(not set)', tip: 'Draw a border around the footer section' },
  { id: 'opt-footer-label-pos', label: '--footer-label-pos', type: 'label-pos', value: '', tip: 'Position of the footer border label' },
  { id: 'opt-preview-border', label: '--preview-border', type: 'select', options: ['(no argument)'].concat(BORDER_STYLES), value: '', emptyLabel: '(not set)', tip: 'Draw a border around the preview window' },
  { id: 'opt-preview-label-pos', label: '--preview-label-pos', type: 'label-pos', value: '', tip: 'Position of the preview border label' },
];
function buildDisplayOpts(container) {
  var body = document.createElement('div');
  body.className = 'fzf-ctrl-group-body';
  body.style.padding = '0.6rem 0.75rem';
  DISPLAY_OPTS.forEach(function(opt) {
    var ctrl = document.createElement('div');
    ctrl.className = 'fzf-opt-ctrl';
    var lbl = document.createElement('label');
    lbl.textContent = opt.label;
    lbl.htmlFor = opt.id;
    if (opt.tip) lbl.dataset.tip = opt.tip;
    if (opt.type === 'text') {
      var inp = document.createElement('input');
      inp.type = 'text';
      inp.id = opt.id;
      inp.value = opt.value;
      inp.style.width = '50px';
      if (opt.maxLength) inp.maxLength = opt.maxLength;
      inp.addEventListener('input', onDisplayChange);
      ctrl.appendChild(lbl);
      ctrl.appendChild(inp);
    } else if (opt.type === 'check') {
      var inp = document.createElement('input');
      inp.type = 'checkbox';
      inp.id = opt.id;
      inp.checked = opt.value;
      inp.addEventListener('change', onDisplayChange);
      ctrl.appendChild(lbl);
      ctrl.appendChild(inp);
    } else if (opt.type === 'select') {
      var sel = document.createElement('select');
      sel.id = opt.id;
      if (!opt.noEmpty) {
        var empty = document.createElement('option');
        empty.value = '';
        empty.textContent = opt.emptyLabel || '(default)';
        sel.appendChild(empty);
      }
      opt.options.forEach(function(v) {
        var o = document.createElement('option');
        o.value = v;
        o.textContent = v;
        if (opt.value === v) o.selected = true;
        sel.appendChild(o);
      });
      sel.addEventListener('change', onDisplayChange);
      ctrl.appendChild(lbl);
      ctrl.appendChild(sel);
    } else if (opt.type === 'label-pos') {
      var negChk = document.createElement('input');
      negChk.type = 'checkbox';
      negChk.title = 'negative (from right)';
      negChk.style.flexShrink = '0';
      var negLbl = document.createElement('label');
      negLbl.textContent = '\u2212';
      negLbl.style.fontSize = '0.72rem';
      negLbl.style.color = 'var(--ui-muted)';
      negLbl.style.width = 'auto';
      negLbl.style.flexShrink = '0';
      negLbl.style.cursor = 'pointer';
      negLbl.onclick = function() { negChk.checked = !negChk.checked; updateLabelPos(); };
      var range = document.createElement('input');
      range.type = 'range';
      range.min = 0;
      range.max = 40;
      range.value = 0;
      range.style.flex = '1';
      range.style.minWidth = '0';
      var btmChk = document.createElement('input');
      btmChk.type = 'checkbox';
      btmChk.title = 'bottom';
      btmChk.style.flexShrink = '0';
      var btmLbl = document.createElement('label');
      btmLbl.textContent = 'btm';
      btmLbl.style.fontSize = '0.65rem';
      btmLbl.style.color = 'var(--ui-muted)';
      btmLbl.style.width = 'auto';
      btmLbl.style.flexShrink = '0';
      btmLbl.style.cursor = 'pointer';
      btmLbl.onclick = function() { btmChk.checked = !btmChk.checked; updateLabelPos(); };
      var hidden = document.createElement('input');
      hidden.type = 'hidden';
      hidden.id = opt.id;
      hidden.value = opt.value;
      function updateLabelPos() {
        var v = parseInt(range.value, 10);
        if (negChk.checked && v > 0) v = -v;
        var str = v === 0 ? '' : String(v);
        if (btmChk.checked && str) str += ':bottom';
        else if (btmChk.checked) str = '0:bottom';
        hidden.value = str;
        onDisplayChange();
      }
      range.addEventListener('input', updateLabelPos);
      negChk.addEventListener('change', updateLabelPos);
      btmChk.addEventListener('change', updateLabelPos);
      ctrl.appendChild(lbl);
      ctrl.appendChild(negChk);
      ctrl.appendChild(negLbl);
      ctrl.appendChild(range);
      ctrl.appendChild(btmChk);
      ctrl.appendChild(btmLbl);
      ctrl.appendChild(hidden);
    }
    body.appendChild(ctrl);
  });
  container.appendChild(body);
}
var lastStyle = 'default';
function onDisplayChange(e) {
  var styleVal = document.getElementById('styleSelect').value;
  if (styleVal !== lastStyle) {
    var hlCheck = document.getElementById('highlightLineCheck');
    hlCheck.checked = styleVal.startsWith('full');
    lastStyle = styleVal;
  }
  // Hide --gap-line when --gap is unchecked
  var gapLineEl = document.getElementById('opt-gap-line');
  if (gapLineEl) gapLineEl.closest('.fzf-opt-ctrl').style.display = document.getElementById('opt-gap').checked ? '' : 'none';
  var sepEl = document.getElementById('opt-separator');
  if (sepEl) sepEl.closest('.fzf-opt-ctrl').style.display = document.getElementById('opt-no-separator').checked ? 'none' : '';

  // Hide label-pos fields when their section border is not active
  var labelPosPairs = [
    ['opt-border-label-pos', 'borderSelect'],
    ['opt-input-label-pos', 'opt-input-border'],
    ['opt-list-label-pos', 'opt-list-border'],
    ['opt-header-label-pos', 'opt-header-border'],
    ['opt-footer-label-pos', 'opt-footer-border'],
    ['opt-preview-label-pos', 'opt-preview-border'],
  ];
  var styleVal2 = document.getElementById('styleSelect').value;
  var isFull2 = styleVal2.startsWith('full');
  labelPosPairs.forEach(function(pair) {
    var posEl = document.getElementById(pair[0]);
    if (!posEl) return;
    var borderEl = document.getElementById(pair[1]);
    var hasBorder;
    var bv = borderEl ? borderEl.value : '';
    if (pair[1] === 'borderSelect') {
      hasBorder = bv !== '' && bv !== 'none';
    } else {
      hasBorder = isFull2 ? (bv !== 'none') : (bv && bv !== 'none' && bv !== '');
    }
    posEl.closest('.fzf-opt-ctrl').style.display = hasBorder ? '' : 'none';
  });

  if (initDone) {
    renderFzf();
    updateExport();
  }
}

// Short param keys for display opts

function serializeState() {
  var obj = {};
  if (currentPreset !== 'Default Dark') obj.t = currentPreset;
  // Only store color diffs from the preset
  var preset = PRESETS[currentPreset] || {};
  var colors = {};
  Object.keys(state).forEach(function(k) {
    if (state[k] && state[k] !== preset[k]) colors[k] = state[k];
  });
  // Check for removed preset colors
  Object.keys(preset).forEach(function(k) {
    if (preset[k] && !state[k]) colors[k] = '';
  });
  if (Object.keys(colors).length > 0) obj.c = colors;
  var attrsDiff = {};
  Object.keys(attrs).forEach(function(k) {
    var active = [];
    ATTR_NAMES.forEach(function(a) { if (attrs[k][a]) active.push(a); });
    if (active.length > 0) attrsDiff[k] = active;
  });
  if (Object.keys(attrsDiff).length > 0) obj.a = attrsDiff;
  var opts = {};
  DISPLAY_OPTS.forEach(function(opt) {
    var el = document.getElementById(opt.id);
    if (!el) return;
    if (opt.type === 'check') {
      if (el.checked !== opt.value) opts[opt.id] = el.checked ? 1 : 0;
    } else if (opt.type === 'label-pos') {
      if (el.value) opts[opt.id] = el.value;
    } else {
      if (el.value !== opt.value) opts[opt.id] = el.value;
    }
  });
  if (Object.keys(opts).length > 0) obj.o = opts;
  var tbg = document.getElementById('termBgInput').value;
  if (tbg !== '#262626') obj.tbg = tbg;
  var q = document.getElementById('queryInput').value;
  if (q !== 're') obj.q = q;
  return obj;
}
function deflate(str) {
  var data = new TextEncoder().encode(str);
  var cs = new CompressionStream('deflate-raw');
  var writer = cs.writable.getWriter();
  writer.write(data);
  writer.close();
  return new Response(cs.readable).arrayBuffer().then(function(buf) {
    var bytes = new Uint8Array(buf);
    var binary = '';
    for (var i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
    return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  });
}
function inflate(encoded) {
  var binary = atob(encoded.replace(/-/g, '+').replace(/_/g, '/'));
  var bytes = new Uint8Array(binary.length);
  for (var i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  var ds = new DecompressionStream('deflate-raw');
  var writer = ds.writable.getWriter();
  writer.write(bytes);
  writer.close();
  return new Response(ds.readable).text();
}
var initDone = false;
function serializeToUrl() {
  if (!initDone) return;
  var obj = serializeState();
  var json = JSON.stringify(obj);
  if (json === '{}') {
    history.replaceState(null, '', window.location.pathname);
    return;
  }
  deflate(json).then(function(encoded) {
    history.replaceState(null, '', window.location.pathname + '?s=' + encoded);
  });
}
function deserializeFromUrl() {
  var params = new URLSearchParams(window.location.search);
  var s = params.get('s');
  if (!s) return false;
  try {
    // Try compressed first
    var pending = inflate(s).then(function(json) {
      return JSON.parse(json);
    }).catch(function() {
      // Fallback to uncompressed base64
      var json = decodeURIComponent(escape(atob(s.replace(/-/g, '+').replace(/_/g, '/'))));
      return JSON.parse(json);
    });
    pending.then(function(obj) { applyDeserializedState(obj); });
    return true;
  } catch(e) { return false; }
}
function applyDeserializedState(obj) {
  var presetName = obj.t || 'Default Dark';
  if (PRESETS[presetName]) {
    currentPreset = presetName;
    document.getElementById('presetSelect').value = presetName;
    state = {};
    Object.keys(PRESETS[presetName]).forEach(function(k) { state[k] = PRESETS[presetName][k]; });
  }
  if (obj.c) {
    Object.keys(obj.c).forEach(function(k) { state[k] = obj.c[k]; });
  }
  syncControls();

  if (obj.o) {
    DISPLAY_OPTS.forEach(function(opt) {
      if (!(opt.id in obj.o)) return;
      var el = document.getElementById(opt.id);
      if (!el) return;
      if (opt.type === 'check') {
        el.checked = !!obj.o[opt.id];
      } else {
        el.value = obj.o[opt.id];
      }
    });
  }
  attrs = {};
  if (obj.a) {
    Object.keys(obj.a).forEach(function(k) {
      attrs[k] = {};
      obj.a[k].forEach(function(a) { attrs[k][a] = true; });
    });
  }
  if (obj.tbg) document.getElementById('termBgInput').value = obj.tbg;
  if (obj.q !== undefined) document.getElementById('queryInput').value = obj.q;
  initDone = true;
  lastStyle = '';
  onDisplayChange();
}
function buildControls() {
  var optionsTab = document.getElementById('tabOptions');
  var colorsTab = document.getElementById('tabColors');
  optionsTab.innerHTML = '';
  colorsTab.innerHTML = '';
  buildDisplayOpts(optionsTab);
  // Tab switching
  var tabs = document.querySelectorAll('.fzf-tab');
  tabs.forEach(function(tab) {
    tab.addEventListener('click', function() {
      tabs.forEach(function(t) { t.classList.remove('active'); });
      tab.classList.add('active');
      document.querySelectorAll('.fzf-tab-content').forEach(function(c) { c.classList.remove('active'); });
      document.getElementById('tab' + tab.dataset.tab.charAt(0).toUpperCase() + tab.dataset.tab.slice(1)).classList.add('active');
    });
  });
  GROUPS.forEach(function(group, gi) {
    var div = document.createElement('div');
    div.className = 'fzf-ctrl-group collapsed';
    var header = document.createElement('div');
    header.className = 'fzf-ctrl-group-header';
    header.innerHTML = group.name + ' <span class="arrow">&#9660;</span>';
    header.onclick = function() {
      var wasCollapsed = div.classList.contains('collapsed');
      // Collapse all color groups
      colorsTab.querySelectorAll('.fzf-ctrl-group').forEach(function(g) { g.classList.add('collapsed'); });
      if (wasCollapsed) div.classList.remove('collapsed');
    };
    div.appendChild(header);
    var body = document.createElement('div');
    body.className = 'fzf-ctrl-group-body';
    group.colors.forEach(function(c) {
      var ctrl = document.createElement('div');
      ctrl.className = 'fzf-color-ctrl' + (state[c.id] ? '' : ' unset');
      var wrap = document.createElement('div');
      wrap.className = 'color-wrap';
      var inp = document.createElement('input');
      inp.type = 'color';
      inp.id = 'ctrl-' + c.id;
      inp.dataset.colorId = c.id;
      inp.value = '#888888';
      var xmark = document.createElement('div');
      xmark.className = 'color-unset';
      inp.addEventListener('input', function() {
        state[c.id] = inp.value;
        ctrl.classList.remove('unset');
        applyColors();
      });
      // Marker for modified - applied when color differs from preset
      wrap.appendChild(inp);
      wrap.appendChild(xmark);
      var lbl = document.createElement('label');
      lbl.textContent = c.label;
      lbl.htmlFor = inp.id;
      var rst = document.createElement('button');
      rst.className = 'reset-btn';
      rst.textContent = '\u00d7';
      rst.title = 'Unset';
      rst.onclick = function() {
        delete state[c.id];
        ctrl.classList.add('unset');
        inp.value = DEFAULT_COLORS[c.id] || '#888888';
        applyColors();
      };
      var attrPopup = document.createElement('div');
      attrPopup.className = 'attr-popup';
      ATTR_NAMES.forEach(function(a) {
        var al = document.createElement('label');
        var achk = document.createElement('input');
        achk.type = 'checkbox';
        achk.dataset.colorId = c.id;
        achk.dataset.attr = a;
        achk.checked = !!(attrs[c.id] && attrs[c.id][a]);
        achk.addEventListener('change', function() {
          if (!attrs[c.id]) attrs[c.id] = {};
          attrs[c.id][a] = achk.checked;
          var hasAny = ATTR_NAMES.some(function(n) { return attrs[c.id][n]; });
          wrap.classList.toggle('has-attrs', hasAny);
          applyColors();
        });
        al.appendChild(achk);
        al.appendChild(document.createTextNode(a));
        attrPopup.appendChild(al);
      });
      wrap.appendChild(attrPopup);
      wrap.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        // Close all other popups
        document.querySelectorAll('.attr-popup.open').forEach(function(p) { p.classList.remove('open'); });
        attrPopup.classList.toggle('open');
      });
      document.addEventListener('click', function(e) {
        if (!wrap.contains(e.target)) attrPopup.classList.remove('open');
      });
      if (attrs[c.id] && ATTR_NAMES.some(function(n) { return attrs[c.id][n]; })) {
        wrap.classList.add('has-attrs');
      }
      ctrl.appendChild(wrap);
      ctrl.appendChild(lbl);
      ctrl.appendChild(rst);
      body.appendChild(ctrl);
    });
    div.appendChild(body);
    colorsTab.appendChild(div);
  });
}
function applyPreset(name) {
  var preset = PRESETS[name];
  if (!preset) return;
  state = {};
  Object.keys(preset).forEach(function(k) {
    state[k] = preset[k];
  });
  // Auto-set terminal bg when preset doesn't define bg
  var termBgInput = document.getElementById('termBgInput');
  if (state.bg) {
    // Use a slightly different shade from the theme bg for the terminal
    var bg = state.bg;
    var r = parseInt(bg.slice(1,3),16), g = parseInt(bg.slice(3,5),16), b = parseInt(bg.slice(5,7),16);
    var brightness = r*0.299 + g*0.587 + b*0.114;
    if (brightness > 128) {
      // Light theme: terminal bg slightly lighter
      termBgInput.value = '#' + [Math.min(255,r+10),Math.min(255,g+10),Math.min(255,b+10)].map(function(v){return ('0'+v.toString(16)).slice(-2);}).join('');
    } else {
      // Dark theme: terminal bg slightly darker
      termBgInput.value = '#' + [Math.max(0,r-10),Math.max(0,g-10),Math.max(0,b-10)].map(function(v){return ('0'+v.toString(16)).slice(-2);}).join('');
    }
  } else {
    var isLight = name.match(/[Ll]ight|[Ll]atte|[Dd]awn|[Dd]ay|Paper/);
    termBgInput.value = isLight ? '#e8e8e8' : '#262626';
  }
  applyColors();
  syncControls();
}
function applyColors() {
  var wrap = document.querySelector('.fzf-preview-wrap');
  var pre = document.getElementById('fzfTerminal');
  var termBgInput = document.getElementById('termBgInput');
  wrap.style.background = termBgInput.value;
  if (state.fg) {
    pre.style.color = state.fg;
  } else {
    // Default terminal fg: light for dark bg, dark for light bg
    var tbg = termBgInput.value;
    var brightness = parseInt(tbg.slice(1,3),16)*0.299 + parseInt(tbg.slice(3,5),16)*0.587 + parseInt(tbg.slice(5,7),16)*0.114;
    pre.style.color = brightness > 128 ? '#4e4e4e' : '#d0d0d0';
  }
  renderFzf();
  updateExport();
}
// fzf's built-in Dark256 defaults (colors that are always set regardless of theme)
var DEFAULT_COLORS = {
  hl:'#87af87',
  'current-fg':'#e4e4e4', 'current-bg':'#303030', 'current-hl':'#afd7af',
  info:'#afaf87', prompt:'#87afd7', pointer:'#d7005f', marker:'#d75f87',
  spinner:'#afd700', header:'#87afaf', footer:'#87afaf',
  border:'#5f5f5f', label:'#afafaf', gutter:'#303030',
};
// Inheritance tree from fzf man page (indentation = parent)
var COLOR_FALLBACKS = {
  // fg
  //   list-fg
  //     selected-fg
  //   preview-fg
  'list-fg': ['fg'],
  'selected-fg': ['list-fg', 'fg'],
  'preview-fg': ['fg'],
  // bg
  //   list-bg
  //     selected-bg
  //   preview-bg
  //   input-bg
  //   header-bg
  //   footer-bg
  'list-bg': ['bg'],
  'selected-bg': ['list-bg', 'bg'],
  'preview-bg': ['bg'],
  'input-bg': ['bg'],
  'header-bg': ['bg'],
  'footer-bg': ['bg'],
  // hl
  //   selected-hl
  'selected-hl': ['hl'],
  // current-bg
  //   gutter
  'gutter': ['current-bg'],
  'alt-bg': ['list-bg', 'bg'],
  'alt-gutter': ['gutter', 'current-bg'],
  // query (input-fg)
  //   ghost
  //   disabled
  'query': ['fg'],
  'ghost': ['query', 'fg'],
  'disabled': ['query', 'fg'],
  // border
  //   list-border
  //     scrollbar
  //     separator
  //     gap-line
  //   preview-border
  //     preview-scrollbar
  //   input-border
  //   header-border
  //   footer-border
  'list-border': ['border'],
  'scrollbar': ['list-border', 'border'],
  'separator': ['list-border', 'border'],
  'gap-line': ['list-border', 'border'],
  'preview-border': ['border'],
  'preview-scrollbar': ['preview-border', 'border'],
  'input-border': ['border'],
  'header-border': ['border'],
  'footer-border': ['border'],
  // label
  //   list-label
  //   preview-label
  //   input-label
  //   header-label
  //   footer-label
  'list-label': ['label'],
  'preview-label': ['label'],
  'input-label': ['label'],
  'header-label': ['label'],
  'footer-label': ['label'],
  // header -> footer
  'footer': ['header'],
};
function resolveColor(id) {
  if (state[id]) return state[id];
  if (DEFAULT_COLORS[id]) return DEFAULT_COLORS[id];
  var chain = COLOR_FALLBACKS[id];
  if (chain) {
    for (var i = 0; i < chain.length; i++) {
      var v = resolveColor(chain[i]);
      if (v) return v;
    }
  }
  // Terminal colors as ultimate fallback for fg/bg
  if (id === 'bg') {
    var tbg = document.getElementById('termBgInput');
    return tbg ? tbg.value : null;
  }
  if (id === 'fg') {
    var tbg = document.getElementById('termBgInput');
    if (!tbg) return null;
    var v = tbg.value;
    var brightness = parseInt(v.slice(1,3),16)*0.299 + parseInt(v.slice(3,5),16)*0.587 + parseInt(v.slice(5,7),16)*0.114;
    return brightness > 128 ? '#4e4e4e' : '#d0d0d0';
  }
  return null;
}
function syncControls() {
  GROUPS.forEach(function(g) {
    g.colors.forEach(function(c) {
      var inp = document.getElementById('ctrl-' + c.id);
      if (!inp) return;
      var ctrl = inp.closest('.fzf-color-ctrl');
      var eff = resolveColor(c.id);
      inp.value = eff || '#888888';
      if (state[c.id]) {
        if (ctrl) ctrl.classList.remove('unset');
      } else {
        if (ctrl) ctrl.classList.add('unset');
      }
      // Sync attribute checkboxes and has-attrs indicator
      var wrap = inp.closest('.color-wrap');
      if (wrap) {
        var hasAny = false;
        ATTR_NAMES.forEach(function(a) {
          var chk = wrap.querySelector('.attr-popup input[data-color-id="' + c.id + '"][data-attr="' + a + '"]');
          if (chk) {
            chk.checked = !!(attrs[c.id] && attrs[c.id][a]);
            if (chk.checked) hasAny = true;
          }
        });
        wrap.classList.toggle('has-attrs', hasAny);
      }
    });
  });
}
function updateExport() {
  var parts = [];
  var aliases = {
    'current-fg': 'fg+', 'current-bg': 'bg+', 'current-hl': 'hl+',
  };
  var order = [
    'fg','bg','hl','current-fg','current-bg','current-hl',
    'selected-fg','selected-bg','selected-hl',
    'info','prompt','pointer','marker','spinner','header','query','ghost','disabled',
    'border','label','separator','scrollbar','gutter',
    'list-fg','list-bg','list-border','list-label',
    'alt-bg','alt-gutter','gap-line',
    'input-bg','input-border','input-label',
    'header-bg','header-border','header-label',
    'footer','footer-bg','footer-border','footer-label',
    'preview-fg','preview-bg','preview-border','preview-label','preview-scrollbar',
  ];
  var isDefaultPreset = (currentPreset === 'Default Dark' || currentPreset === 'Default Light');
  var preset = PRESETS[currentPreset] || {};
  order.forEach(function(key) {
    var hasColor = isDefaultPreset ? (state[key] && state[key] !== preset[key]) : !!state[key];
    if (hasColor || attrs[key]) {
      var name = aliases[key] || key;
      var val = hasColor ? state[key] : '';
      if (attrs[key]) {
        var attrList = [];
        ATTR_NAMES.forEach(function(a) { if (attrs[key][a]) attrList.push(a); });
        if (attrList.length > 0) val += (val ? ':' : '') + attrList.join(':');
      }
      if (val) parts.push(name + ':' + val);
    }
  });
  // Base scheme prefix for default presets
  var baseScheme = '';
  if (currentPreset === 'Default Dark') baseScheme = 'dark';
  else if (currentPreset === 'Default Light') baseScheme = 'light';
  if (baseScheme) {
    if (parts.length > 0) {
      parts.unshift(baseScheme);
    } else {
      parts.push(baseScheme);
    }
  }
  var styleRaw = document.getElementById('styleSelect').value;
  var border = document.getElementById('borderSelect').value;
  var layout = document.getElementById('layoutSelect').value;
  var info = document.getElementById('infoSelect').value;
  var marginVal = document.getElementById('marginInput').value.trim();
  var paddingVal = document.getElementById('paddingInput').value.trim();
  var lines = [];
  if (styleRaw !== 'default') {
    lines.push('--style=' + styleRaw);
  }
  if (border === '' || border === '(no argument)') {
    // default - no export
  } else {
    lines.push('--border=' + border);
  }
  if (layout !== 'default') {
    lines.push('--layout=' + layout);
  }
  if (info) {
    lines.push('--info=' + info);
  }
  var hlChecked = document.getElementById('highlightLineCheck').checked;
  if (styleRaw.startsWith('full')) {
    if (!hlChecked) lines.push('--no-highlight-line');
  } else {
    if (hlChecked) lines.push('--highlight-line');
  }
  if (marginVal && marginVal !== '0') {
    lines.push('--margin=' + marginVal);
  }
  if (paddingVal && paddingVal !== '0') {
    lines.push('--padding=' + paddingVal);
  }
  var ptrVal = document.getElementById('opt-pointer').value;
  var mkVal = document.getElementById('opt-marker').value;
  var gutterVal = document.getElementById('opt-gutter').value;
  var sepVal = document.getElementById('opt-separator').value;
  if (document.getElementById('opt-no-separator').checked) {
    lines.push('--no-separator');
  } else if (sepVal) {
    lines.push('--separator=' + sepVal);
  }
  if (ptrVal && ptrVal !== '\u258c') lines.push('--pointer=' + ptrVal);
  if (mkVal && mkVal !== '\u258c') lines.push('--marker=' + mkVal);
  if (gutterVal && gutterVal !== '\u258c') lines.push('--gutter=' + gutterVal);
  var sbMain = document.getElementById('opt-scrollbar-main').value;
  var sbPv = document.getElementById('opt-scrollbar-preview').value;
  if ((sbMain && sbMain !== '\u2502') || sbPv) {
    var sbStr = (sbMain || '\u2502') + (sbPv || '');
    lines.push('--scrollbar=' + sbStr);
  }
  if (document.getElementById('opt-gap').checked) lines.push('--gap');
  var gapLineVal = document.getElementById('opt-gap-line').value;
  if (gapLineVal) lines.push('--gap-line=' + gapLineVal);
  if (document.getElementById('opt-header-first').checked) lines.push('--header-first');
  var isFull = styleRaw.startsWith('full');
  var optFields = ['input-border','list-border','header-border','footer-border','preview-border'];
  optFields.forEach(function(f) {
    var v = document.getElementById('opt-' + f).value;
    if (v === '') {
      // (not set) - no export
    } else if (v === '(no argument)') {
      lines.push('--' + f);
    } else if (v === 'none') {
      if (isFull) lines.push('--' + f + '=none');
    } else {
      lines.push('--' + f + '=' + v);
    }
  });
  var posFields = ['border-label-pos','input-label-pos','list-label-pos','header-label-pos','footer-label-pos','preview-label-pos'];
  posFields.forEach(function(f) {
    var v = document.getElementById('opt-' + f).value.trim();
    if (v) lines.push('--' + f + '=' + v);
  });
  if (parts.length > 0) {
    var colorStr = parts.join(',');
    if (colorStr.length > 60) {
      var cur = [];
      var curLen = 0;
      parts.forEach(function(p) {
        if (curLen + p.length + 1 > 60 && cur.length > 0) {
          lines.push('--color=' + cur.join(','));
          cur = [p];
          curLen = p.length;
        } else {
          cur.push(p);
          curLen += p.length + 1;
        }
      });
      if (cur.length > 0) lines.push('--color=' + cur.join(','));
    } else {
      lines.push('--color=' + colorStr);
    }
  }
  var inner = lines.join('\n  ');
  var exportStr = lines.length > 0 ? "export FZF_DEFAULT_OPTS=$'" + inner.replace(/\\/g, '\\\\').replace(/'/g, "\\'") + "'" : '';
  document.getElementById('exportBox').value = exportStr;
  serializeToUrl();
}
function bindEvents() {
  document.getElementById('presetSelect').addEventListener('change', function() {
    var val = this.value;
    if (val === 'custom') return;
    currentPreset = val;
    applyPreset(val);
  });
  document.getElementById('queryInput').addEventListener('input', function() { renderFzf(); serializeToUrl(); });
  document.getElementById('termBgInput').addEventListener('input', function() { applyColors(); });
  document.getElementById('btnReset').addEventListener('click', function() {
    // Reset state and attrs
    currentPreset = 'Default Dark';
    document.getElementById('presetSelect').value = 'Default Dark';
    state = {};
    var preset = PRESETS['Default Dark'];
    Object.keys(preset).forEach(function(k) { state[k] = preset[k]; });
    attrs = {};
    // Reset terminal bg
    document.getElementById('termBgInput').value = '#262626';
    // Reset query
    document.getElementById('queryInput').value = 're';
    // Reset all display opts
    DISPLAY_OPTS.forEach(function(opt) {
      var el = document.getElementById(opt.id);
      if (!el) return;
      if (opt.type === 'check') el.checked = opt.value;
      else el.value = opt.value;
    });
    // Reset label-pos controls (range sliders + checkboxes)
    document.querySelectorAll('.fzf-opt-ctrl input[type="range"]').forEach(function(r) { r.value = 0; });
    document.querySelectorAll('.fzf-opt-ctrl input[type="checkbox"][title]').forEach(function(c) { c.checked = false; });
    // Close any open attribute popups
    document.querySelectorAll('.attr-popup').forEach(function(p) { p.classList.remove('open'); });
    document.querySelectorAll('.has-attrs').forEach(function(w) { w.classList.remove('has-attrs'); });
    // Reset attribute checkboxes
    document.querySelectorAll('.attr-popup input[type="checkbox"]').forEach(function(c) { c.checked = false; });
    // Sync and render
    syncControls();
    lastStyle = '';
    onDisplayChange();
  });
  document.getElementById('btnCopy').addEventListener('click', function() {
    var box = document.getElementById('exportBox');
    var text = box.value;
    if (!text) return;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(function() {
        showCopyFeedback();
      });
    } else {
      box.select();
      document.execCommand('copy');
      showCopyFeedback();
    }
  });
}
function showCopyFeedback() {
  var btn = document.getElementById('btnCopy');
  var orig = btn.textContent;
  btn.textContent = 'Copied!';
  setTimeout(function() { btn.textContent = orig; }, 1500);
}
init();
})();

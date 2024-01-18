// Copyright 2024 Khalil Estell
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

let input = "";
let term = new Terminal({
  fontFamily: "Andale Mono, courier-new, courier, monospace",
  scrollback: 1024 * 100,
  cursorBlink: true,
  tabStopWidth: 1,
  lineHeight: 1,
  fontSize: 18,
  theme: {
    green: "lime",
  },
});

term.open(document.getElementById("terminal"));
const fit_addon = new FitAddon.FitAddon();
term.loadAddon(fit_addon);
term.loadAddon(new WebLinksAddon.WebLinksAddon());
fit_addon.fit();

window.addEventListener("resize", () => {
  fit_addon.fit();
});

term.onData(function (data) {
  const ENTER = "\r";
  const BACKSPACE = "\x7f";
  const UP = "\x1b[A";
  const DOWN = "\x1b[B";
  const LEFT = "\x1b[D";
  const RIGHT = "\x1b[C";

  switch (data) {
    case ENTER:
      handleSubmit();
      break;
    case BACKSPACE:
      handleDelete();
      break;
    case UP:
    case DOWN:
    case LEFT:
    case RIGHT:
      break; // TODO: Handle arrow keys like #serial-input
    default:
      if (flags.get("local-echo-select")) {
        term.write("\x1b[32m" + data + "\x1b[0m");
      }
      writeCharacterToDevice(data);
      break;
  }
});

function clearTerminal() {
  input = "";
  term.reset();
}

function handleDelete() {
  input = input.slice(0, -1);
  term.write("\b \b");
}

async function handleSubmit() {
  if (port) {
    await writeToDevice(input);
  }
  input = "";
  term.writeln("");
}

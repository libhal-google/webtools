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

let history_position = 0;
let command_history = [];
const flags = new Flags();
const change_event = new Event("change");
const collator = new Intl.Collator(undefined, {
  numeric: true,
  sensitivity: "base",
});

document.querySelector("#options-btn").addEventListener("click", () => {
  document.querySelector("#options-dialog").showModal();
});

document
  .querySelector("#close-options-dialog-btn")
  .addEventListener("click", () => {
    document.querySelector("#options-dialog").close();
  });

document.querySelector("#help-btn").addEventListener("click", () => {
  document.querySelector("#help-dialog").showModal();
});

document
  .querySelector("#close-help-dialog-btn")
  .addEventListener("click", () => {
    document.querySelector("#help-dialog").close();
  });

document.querySelector("#upload-btn").addEventListener("click", () => {
  document.querySelector("#upload-dialog").showModal();
});

document
  .querySelector("#close-upload-dialog-btn")
  .addEventListener("click", () => {
    document.querySelector("#upload-dialog").close();
  });

document.querySelector("#connect-btn").addEventListener("click", async () => {
  device_connected ? disconnectFromDevice() : connectToDevice();
});

document.querySelector("#clear-btn").addEventListener("click", () => {
  clearTerminal();
});

document.querySelector("#dtr-checkbox").addEventListener("click", async () => {
  let dataTerminalReady = !!document.querySelector("#dtr-checkbox").checked;
  await port.setSignals({ dataTerminalReady });
});

document.querySelector("#rts-checkbox").addEventListener("click", async () => {
  let requestToSend = !!document.querySelector("#rts-checkbox").checked;
  await port.setSignals({ requestToSend });
});

document.querySelector("#clear-history-btn").addEventListener("click", () => {
  command_history = [];
  history_position = 0;
  document.querySelector("#serial-input").value = "";
  document.querySelector("#options-dialog").close();
});

document.querySelector("#serial-input").addEventListener("keyup", (event) => {
  const DOWN_ARROW = 38;
  const UP_ARROW = 40;
  const ENTER_KEY = 13;

  let count_change_flag = true;

  switch (event.which) {
    case UP_ARROW:
      if (history_position > 0) {
        history_position--;
      }
      break;
    case DOWN_ARROW:
      if (history_position < command_history.length) {
        history_position++;
      }
      break;
    case ENTER_KEY:
      document.querySelector("#send-btn").click();
      break;
    default:
      count_change_flag = false;
      break;
  }

  if (count_change_flag) {
    let command = command_history[command_history.length - history_position];
    if (command) {
      document.querySelector("#serial-input").value = command;
    }
  }
});

document.querySelector("#baudrate").addEventListener("change", function () {
  var baudrate_custom = document.querySelector("#baudrate_custom");

  if (this.value === "custom") {
    baudrate_custom.style.display = "";
  } else {
    baudrate_custom.style.display = "none";
  }
});

document.querySelector("#send-btn").addEventListener("click", async () => {
  const input = document.querySelector("#serial-input").value;
  if (input !== command_history[command_history.length - 1]) {
    command_history.push(input);
  }
  history_position = 0;
  if (flags.get("local-echo-select")) {
    term.writeln("\x1b[32m" + input + "\x1b[0m");
  }
  document.querySelector("#serial-input").value = "";
  await writeToDevice(input);
});

document.querySelector("#serial-upload").addEventListener("click", () => {
  let serial_file = document.querySelector("#serial-file").files;
  if (!device_connected) {
    alert("Please connect a device before uploading a file.");
    return;
  } else if (serial_file.length === 0) {
    alert("No file selected");
    console.debug("No file");
    return;
  }

  let file = serial_file.item(0);
  let reader = new FileReader();

  reader.onload = async () => {
    const writer = port.writable.getWriter();
    await writer.write(reader.result);
    writer.releaseLock();
  };
  reader.readAsArrayBuffer(file);
});

function generateCommandListHtml(command_list) {
  if (!command_list) {
    return "";
  }

  let html = "";
  for (let command of command_list) {
    html += `<option value="${command}" />`;
  }
  return html;
}

flags.attach("baudrate", "change", "115200");
flags.attach("carriage-return-checkbox", "change");
flags.attach("newline-select", "change", true);
flags.attach("local-echo-select", "change", false);
flags.bind(
  "command-history",
  (command_list) => {
    document.querySelector("#command-history").innerHTML =
      generateCommandListHtml(command_list);
    console.debug("Command history updated");
  },
  []
);

window.addEventListener("load", () => {
  flags.initialize();
  var dropdown = document.querySelector("#baudrate");

  var event = new Event("change", {
    bubbles: true,
    cancelable: true,
  });

  dropdown.dispatchEvent(event);
});

window.onbeforeunload = () => {
  let command_history = flags.get("command-history");
  if (command_history) {
    flags.set("command-history", command_history.slice(0, 99));
  }
  flags.teardown();
  return null;
};

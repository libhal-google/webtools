// Copyright 2023 Google LLC
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

let port;
let reader;
let device_connected = false;
const decoder = new TextDecoder("utf-8");
const encoder = new TextEncoder("utf-8");

function getBaudRate() {
  let baudrate = document.querySelector("#baudrate").value;
  if (baudrate === "custom") {
    baudrate = document.querySelector("#baudrate_custom").value;
  }
  return Number(baudrate);
}

async function connectToDevice() {
  try {
    port = await navigator.serial.requestPort();

    const baud_rate = getBaudRate();
    await port.open({ baudRate: baud_rate });
    await port.setSignals({ dataTerminalReady: false, requestToSend: false });
    device_connected = true;
    document.querySelector("#connect-btn").innerText = "Disconnect";
    document.querySelector("#baudrate").setAttribute("disabled", true);
    document.querySelector("#dtr-checkbox").removeAttribute("disabled");
    document.querySelector("#rts-checkbox").removeAttribute("disabled");
    readFromDevice();
  } catch (error) {
    const notFoundText = "NotFoundError: No port selected by the user.";
    const userCancelledConnecting = String(error) === notFoundText;
    if (!userCancelledConnecting) {
      alert(`Could not connect to serial device: ${error}`);
    }
  }
}

async function readFromDevice() {
  while (port.readable && device_connected) {
    reader = port.readable.getReader();
    try {
      while (true) {
        const { value, done } = await reader.read();
        if (done) {
          break;
        }
        let decoded = new TextDecoder().decode(value);
        decoded = decoded.replace(/\n/g, "\r\n");
        term.write(decoded);
      }
    } catch (error) {
      disconnectFromDevice();
      console.error(error);
    } finally {
      reader.releaseLock();
    }
  }
  await port.close();
}

async function writeToDevice(input) {
  let cr = flags.get("carriage-return-checkbox") ? "\r" : "";
  let nl = flags.get("newline-select") ? "\n" : "";
  const payload = `${input}${cr}${nl}`;

  if (port.writable) {
    const writer = port.writable.getWriter();
    try {
      await writer.write(encoder.encode(payload));
    } catch (error) {
      console.error(error);
    } finally {
      writer.releaseLock();
    }
  }
}

async function writeCharacterToDevice(input) {
  const payload = `${input}`;

  if (port.writable) {
    const writer = port.writable.getWriter();
    try {
      await writer.write(encoder.encode(payload));
    } catch (error) {
      console.error(error);
    } finally {
      writer.releaseLock();
    }
  }
}

function disconnectFromDevice() {
  device_connected = false;
  if (reader && reader.cancel) {
    reader.cancel();
  }
  document.querySelector("#connect-btn").innerText = "Connect";
  document.querySelector("#baudrate").removeAttribute("disabled");
  document.querySelector("#dtr-checkbox").setAttribute("disabled", true);
  document.querySelector("#rts-checkbox").setAttribute("disabled", true);
  document.querySelector("#dtr-checkbox").removeAttribute("disabled");
  document.querySelector("#rts-checkbox").removeAttribute("disabled");
}

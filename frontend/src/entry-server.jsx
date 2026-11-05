// Build-time prerender entry: renders one route to HTML (see scripts/prerender.mjs).
import React from "react";
import { renderToPipeableStream } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Buffer } from "node:buffer";
import { Writable } from "node:stream";
import { AppRoutes } from "./App";

export function render(url) {
  const helmetContext = {};
  return new Promise((resolve, reject) => {
    // Collect copies of the raw bytes and decode once at the end (decoding chunk by chunk breaks a
    // character split across two chunks). React 18's stream encoder also has a bug: when a
    // multi-byte character (–, ₹, Tamil, Devanagari…) does not fit at the end of its 2 KB buffer,
    // it moves the character to the next buffer but still sends the old one at full length,
    // padded with NUL bytes. No text is lost, and HTML never contains NUL, so removing them
    // restores the exact output.
    const chunks = [];
    const sink = new Writable({
      write(chunk, _enc, cb) { chunks.push(Buffer.from(chunk)); cb(); },
      final(cb) {
        const html = Buffer.concat(chunks).toString("utf8").replaceAll(String.fromCharCode(0), "");
        resolve({ html, helmet: helmetContext.helmet });
        cb();
      },
    });
    const stream = renderToPipeableStream(
      <HelmetProvider context={helmetContext}>
        <StaticRouter location={url}>
          <AppRoutes />
        </StaticRouter>
      </HelmetProvider>,
      {
        // wait for lazy pages so the full content is in the HTML
        onAllReady() { stream.pipe(sink); },
        onError(e) { reject(e); },
      },
    );
  });
}

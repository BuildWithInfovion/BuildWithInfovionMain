// Build-time prerender entry: renders one route to HTML (see scripts/prerender.mjs).
import React from "react";
import { renderToPipeableStream } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Writable } from "node:stream";
import { AppRoutes } from "./App";

export function render(url) {
  const helmetContext = {};
  return new Promise((resolve, reject) => {
    let html = "";
    const sink = new Writable({
      write(chunk, _enc, cb) { html += chunk.toString(); cb(); },
      final(cb) { resolve({ html, helmet: helmetContext.helmet }); cb(); },
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

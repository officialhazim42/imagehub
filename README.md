# ImageHub

ImageHub is a static, browser-based image utility site. Image processing runs locally in the browser; the project does not require a build step or application server.

## Run Locally

Open `pages/index.html` in a browser, or serve the project directory with Python:

```sh
python3 -m http.server 8000
```

Then visit `http://localhost:8000/pages/index.html`.

## Project Structure

- `pages/` contains the main site pages, including the home page, guides, history, dashboard, about, and terms pages.
- `tools/` contains the individual image tool pages.
- `assets/css/` and `assets/js/` contain shared styling and behavior.
- `assets/icons/` contains the SVG icons used throughout the site.

## Using an Image Tool

1. Open a tool from the home page and select or drop an image. The HTML-to-image tool accepts HTML instead.
2. Adjust the tool settings, then choose its processing action. For tools with live editing, make edits before creating the preview.
3. Inspect the Before/After comparison. The Download button appears after both preview images have loaded.
4. Choose **Download** to review the confirmation dialog, then choose **Confirm download** to save the result. Cancel closes the dialog without downloading.
5. Choose **Clear** to remove the current image, preview, and staged download.

Some tools support multiple input images. They show the first input and first result in the comparison preview; confirming the download saves all converted results.

## Shared Tool Behavior

`assets/js/shared.js` provides the common menu, guides, history, comparison preview, reset, and download-confirmation behavior. `assets/css/shared.css` contains shared page and tool styles. Each tool page contains its own processing logic and calls `downloadBlob()` when its output is ready.

The download flow is intentionally staged:

1. `downloadBlob()` stores the processed file and updates the After preview.
2. The shared code waits for the Before and After images to load, displays the comparison, then enables the Download button.
3. Clicking Download opens the confirmation dialog. The browser download is initiated only by Confirm download.

The guides page is available at `guides.html` and from the Guides control on tool pages. Tool history and theme preference are stored in browser local storage.
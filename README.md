# AI Sensei Plus

A browser extension for [AI Sensei](https://ai-sensei.com)

## Features

- [ ] Change the tab's title to have the name of the players
- [ ] Put the tags on the game page.
- [x] Eliminate red notification markers.
  - [ ] Create an option setting for opting out of this one.
- [ ] Collapse all SVG gobans on the games page, so we can get normal performance back.
  - I don't think think this is responsible for the performance issues.
- [ ] Add games statistics to the games page.
  - [x] Add mistake statistics to the game page
- [x] Change the winner's name color to make it easier to identify who won.
- [ ] Add option for numbering moves on the preview.

## Development

## How to Build Locally

1. `npm i`
2. `npm run dev`
3. Load the unpacked folder as an extension on your (Chromium) browser.

## References

- [AI Sensei](https://ai-sensei.com)
- Development:
  - CRXJS
    - [Stack Overflow - How to use imports in browser extensions?](https://stackoverflow.com/questions/48104433/how-to-import-es6-modules-in-content-script-for-chrome-extension)
    - [CRXJS](https://github.com/crxjs/chrome-extension-tools)

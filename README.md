# Steel Marty

A small face. A long memory. A job to do.

Steel Marty is an exploratory design report for a physical companion and a persistent agent. The name comes from martensite. The report connects a CoreInk device, Pi Durable, and proposed Steel compute services.

[Read the report](https://nibzard.github.io/marty/)

The report includes a moodboard, character studies, system diagrams, a device preview, QR pairing, device management, a cost model, and a pilot plan. It marks source facts, design proposals, and test targets.

## Build and preview

Use Python 3. The HTML build has no external dependencies.

1. Run `python3 build_report.py`.
2. Run `python3 -m http.server 8000 --directory output`.
3. Open `http://localhost:8000`.

The build produces the web report and `output/steel-marty-report.html`. The standalone HTML includes its images, fonts, and interactive studies.

`downloads/steel-marty-report.pdf` is the print snapshot. Update it from the report's **Print / Save PDF** control after content changes. The build copies it into the published site.

## Publication

Push to `main` to publish through GitHub Actions. The workflow builds the report and deploys `output/` to GitHub Pages.

The demo QR code opens the report's pairing section. It does not register a device. The device and cost controls are local illustrations.

## Files

- `index.html`: report content and diagrams.
- `report.css`: responsive layout and print styles.
- `report.js`: device states and the cost model.
- `assets/`: illustrations, photographs, and fonts.
- `build_report.py`: web and standalone exports.
- `PRODUCT.md` and `DESIGN.md`: product and design decisions.

## Attribution

The report includes a source register. M5Stack retains rights to its product photograph. The project founder supplied the Marty character reference. Other concept images were generated for this report.

Chivo and Source Serif 4 use the SIL Open Font License. Their notices are in `assets/licenses/`.

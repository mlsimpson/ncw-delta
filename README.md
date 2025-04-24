# Testing Delta 'Book a Flight'

## Approach

Delta's 'Book a Flight' page presents a robust webapp with a variety of factors to test and validate.
It includes text entry, modal windows, date selections, drop-down menus, and more. Several components such as 'Trip Type' present complex options and configurations.
As such, a spreadsheet containing test scenarios is hierarchically organized into:

- Top level sections (header, footer, and widget)
- Components in each section
- Unique options in each component
- Various combined component configurations

The 'Book a Flight' widget provides many options for the user to enter data as well as maintaining restrictions that would otherwise result in invalid configurations.
The 'happy path' (that is, the ideal working combination of selections) is validated as well as ensuring that invalid selections are not possible for the users to select.

The spreadsheet has two sheets. The first is an exhaustive list of test scenarios, both positive and negative. The second provides detailed test cases that apply to several test scenarios.

## Automation

[Playwright](https://playwright.dev), an E2E testing framework maintained by Microsoft, is used.
Rationale:

- It is open source, so many features are not locked behind upsells.
- It is actively developed by Microsoft, and has a thriving community including a public Discord where core developers work offer support and work with community developers.
- It is multi-lingual (JavaScript, TypeScript, Python, Java, C#)
- It's leading language is TypeScript, which helps test developers write fewer bugs.
- It supports multiple browsers out of the box (Chromium, Firefox, WebKit)
- It runs tests in parallel by default
- It interacts directly with the browser DOM via Chrome DevTools Protocol
- Reports and traces are automatically generated
- It provides robust visual and interactive debugging tools

Drawbacks:

- While Chromium based browsers provide the DevTools protocol natively, Firefox and WebKit do not and thus patched binaries must be installed (these are provided upstream and in the install instructions).
- Users (Testers, Developers, CI/CD consumers, etc.) must download the browsers to use from upstream sources.

### Setting up testing environment

Requirements:

- Linux on x86_64 or arm64 architecture (Windows Subsystem for Linux is also supported)
- Latest version of [Node.js](https://nodejs.org/en) 18, 20, or 22

Install Playwright and run tests automatically:

1. Clone this repo to a new directory and navigate to this directory
2. Run `./run_tests.sh`
3. When asked if you want to overwrite `playwright.config.ts`, type `N` (False)

Install Playwright and run tests manually:
1. Clone this repo to a new directory and navigate to this directory
2. Download and install [Playwright](https://playwright.dev) (select defaults for all questions during installation)
3. Move `delta.spec.ts` and `pom.ts` into the `tests` directory, and delete `tests/example.spec.ts`
4. Run the tests: `npx playwright test --headed`

Rationale:

- Two automated tests are provided. One tests the 'happy path' of selecting valid options for all required components (From, To, Date). The other validates that a negative scenario can not happen (that is, a departure date in the past)
- A minimal Page Object Model is utilized to provide quick and easy reuse and minimal new code when writing new tests
- At each step in the 'happy path', assertions are called to ensure success and stop the test if failed
- Tests are run in headed mode (that is, the actual browsers are used and appear on desktop during the tests). This is due to the fact that running these tests in headless mode triggers bot detection on the webapp
- Per Playwright documentation, selecting locators via `getByRole` is preferred, so at locator strategy was prioritized while writing the automation scripts
- Only Firefox and Chromium are browser targets, as WebKit was unable to open the date picker

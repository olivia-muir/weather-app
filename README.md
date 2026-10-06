# Weather App

A Next.js weather app using TypeScript and a Playwright test suite built as a dev and test automation portfolio project.

**Live demo:** https://weather-app-pi-drab-90.vercel.app/

## Features

- API integration with Open-Meteo to pull in current temperature and wind speed for Bend, Oregon
- Handles error/loading states
- 10-minute upstream resource caching

## Stack

```
App: Next.js, TypeScript, React, Tailwind
Testing: Playwright
CI/CD: GitHub Actions - deployed on Vercel
Data: Open-Meteo API
```

## Test Approach

- Tests for API failures and loading states.
- UI tests mock weather API to create deterministic testing even if API is down allowing test suite to trigger failures on demand.
- Loading state is tested without timed waits by using a gate/promise to prevent race conditions.
- Type check, build, and tests run in CI upon each push.
- Open-Meteo service is checked via API contract test checking the response shape in order to potentially catch upstream changes that mocked tests may miss.


## How to Run Locally

First, after cloning the repo run `nvm use` and `npm install`

Next, run the development server with `npm run dev`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Use `npx playwright test` to run Playwright test suite and `npx playwright show-report` to open the report.

## Roadmap

- Location search
- °F/°C toggle
- User accounts with saved locations
- Interactive map
- Page objects
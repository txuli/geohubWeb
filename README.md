# GeoHub Web

Frontend for the [GeoHub API](https://api.geohub.pm) — an interactive explorer and documentation portal for geographic data on countries and cities worldwide.

## Features

- **Live API Explorer** — test all endpoints in real time with syntax-highlighted JSON responses
- **Formatted views** — country and city responses rendered as clean data cards
- **Terminal demo** — animated preview of a random API call on page load
- **Endpoint documentation** — parameter tables and example URLs for every endpoint
- **Copy to clipboard** — one-click copy of any API response
- **Geolocation** — nearme endpoint finds cities near the user's IP location

## Tech Stack

- [Vue 3](https://vuejs.org/) + TypeScript
- [Vite](https://vite.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Pinia](https://pinia.vuejs.org/) for state management

## API Endpoints

| Endpoint | Description | Parameters |
|---|---|---|
| `GET /getCountry` | Single country data | `country` (required) |
| `GET /getCountries` | All countries | — |
| `GET /getRandomCountry` | Random countries | `limit` (1–50) |
| `GET /getCity` | Cities with filters | `country` (required), `city`, `minPopulation`, `maxPopulation`, `page`, `pageSize` |
| `GET /getrandomCity` | Random cities | `limit` (1–50) |
| `GET /nearme` | Cities nearest to IP | `max` (radius in meters) |

Base URL: `https://api.geohub.pm`


# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [0.2.0] - 2021-10-18

### Added

- Add integration for recent uploads to directly jump into playback
- Main menu screen to select: see recent uploads, search, and quit

### Changed

- Since inquirer choices can include a `value` key during returns, the reverse search back to value has been removed and adjusted
- Renamed search to searchForAnime for easier context

## [0.1.0] - 2021-10-17

### Added

- MVP where users can query for anime from gogoanime and watch a specific episode
- Integration with gogoanime through scraping their site
- Very basic CLI UX
- Project setup

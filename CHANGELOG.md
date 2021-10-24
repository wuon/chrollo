# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased]

### Added

- Prettier and eslint integration to keep styling consistent between workspaces
- Added ApiClient type. This should pave the road to begin adding additional scrapers from different anime sites
- Added check during initialization to check if `mpv` has been installed on the user's system
- Automated mpv installation on windows, established the pipeline for future platforms

### Removed

- Figlet npm package, opted to instead just print raw test to reduce package size. (Don't think it makes sense to use figlet just for 1 aspect of the code)

### Fixed

- If no search results were found, re-prompt the user for a new search query
- fixed chrollo mpv not exist error reporting on windows

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

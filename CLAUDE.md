# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

3D CAD file sharing platform built with Laravel 12 + React 18 + Inertia.js. Features a hierarchical content organization system (Types > Categories > Subcategories > Files) with public browsing and admin management interfaces.

## Tech Stack

- **Backend:** Laravel 12, PHP 8.2+, Eloquent ORM, Sanctum auth
- **Frontend:** React 18, Inertia.js, Tailwind CSS, Headless UI
- **Build:** Vite 7, Laravel Vite Plugin
- **Database:** SQLite (dev), configurable to MySQL/PostgreSQL
- **Routing:** Ziggy (exposes Laravel routes to JS)

## Commands

```bash
# Initial setup
composer setup          # Install deps, generate key, migrate, build frontend

# Development (runs all services concurrently)
composer dev            # Laravel serve + queue + logs (pail) + Vite

# Testing
composer test           # PHPUnit tests with config clear
php artisan test --filter=TestName  # Run single test

# Code formatting
./vendor/bin/pint       # PHP code style (PSR-12)

# Database
php artisan migrate
php artisan migrate:fresh --seed
```

## Architecture

### Inertia.js Pattern
Server-side routing in Laravel renders React page components. No separate API layer for most operations.

- Routes defined in `routes/web.php` return `Inertia::render('PageName', $props)`
- Props passed to React components in `resources/js/Pages/`
- Layouts in `resources/js/Layouts/` (Guest, Authenticated, Admin)
- Shared data via `HandleInertiaRequests` middleware

### Data Hierarchy
Types → Categories → Subcategories → Files

Currently stored as frontend data in `resources/js/data/categories.js` with helper functions:
- `getTypeBySlug()`, `getCategoryBySlug()`, `getSubcategoryBySlug()`
- `getAllSubcategories()`, `getPopularSubcategories()`

### Route Structure
```
/                           → Home
/3d, /planos               → Type main pages
/{type}/{category}         → Category view (e.g., /3d/mecanica)
/{type}/{category}/{sub}   → Subcategory/files list
/file/{slug}               → File detail
/admin/*                   → Admin panel (currently visual testing only)
```

### Key Directories
```
app/Http/Controllers/      → Route handlers
resources/js/Pages/        → React page components
resources/js/Components/   → Reusable React components
resources/js/data/         → Frontend data store (categories.js)
routes/web.php            → All route definitions
```

## Current State

- Branch `migraciones-db`: Working on database migrations for the hierarchy
- Admin routes currently return mock data for UI development
- Auth scaffolded via Laravel Breeze

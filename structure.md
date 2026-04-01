# React Routing Practice Task — Project Blueprint

## Purpose
This document is the **single source of truth** for building the project in phases with clean routing, predictable folder structure, reusable layout, and minimal rework.

It is written so that:
- you can start coding without ambiguity
- Codex can generate code module-by-module easily
- components, routes, context, forms, and data flow stay organized
- implementation errors reduce because structure is decided first

---

# 1. Project Summary

## Goal
Recreate the AdminKit-style dashboard in React with strong focus on:
- React Router
- scalable structure
- reusable layout
- Context API
- React Hook Form
- clean separation of UI, state, and data

## Main Build Strategy
We will **not** start with full pixel-perfect UI.
We will build in this order:

1. app skeleton
2. routes
3. layouts
4. shared state
5. pages
6. forms
7. dashboard widgets
8. polish and responsiveness

This prevents messy refactors later.

---

# 2. Tech Stack

## Core
- React
- Vite
- React Router DOM
- React Hook Form

## State
- Context API
- custom hooks around context

## Styling
Choose one and keep it consistent:

### Better option if speed matters
- Tailwind CSS

For productivity, **Tailwind CSS is recommended** because:
- layout is faster
- spacing is consistent
- component styling becomes predictable
- Codex can generate UI faster

## Icons
- Lucide React or React Icons

## Charts
- Recharts

## Optional utilities
- clsx
- dayjs

---

# 3. High-Level Architecture

## App Architecture
The app will have 2 major layout groups:

1. **Dashboard Layout**
   - sidebar
   - top navbar
   - content area
   - footer

2. **Auth Layout**
   - sign in
   - sign up
   - reset password

## Route Philosophy
- all dashboard pages live under the dashboard shell
- auth pages use separate shell
- unknown routes go to 404
- error page exists independently

---

# 4. Final Route Map

## Dashboard Routes
- `/` → AnalyticsPage
- `/dashboard-crypto` → CryptoPage
- `/dashboard-ecommerce` → EcommercePage

## App / Content Routes
- `/pages-profile` → ProfilePage
- `/pages-settings` → SettingsPage
- `/pages-projects` → ProjectsPage
- `/pages-clients` → ClientsPage
- `/pages-orders` → OrdersPage
- `/pages-pricing` → PricingPage
- `/pages-chat` → ChatPage
- `/pages-tasks` → TasksPage
- `/calendar` → CalendarPage
- `/pages-invoice` → InvoicePage
- `/pages-blank` → BlankPage

## Auth Routes
- `/pages-sign-in` → SignInPage
- `/pages-sign-up` → SignUpPage
- `/pages-reset-password` → ResetPasswordPage

## Error Routes
- `/pages-500` → Error500Page
- `*` → NotFoundPage

---

# 5. Folder Structure

```txt
src/
  assets/
    images/
    icons/

  components/
    layout/
      Sidebar.jsx
      SidebarGroup.jsx
      SidebarItem.jsx
      Navbar.jsx
      Footer.jsx
      PageContainer.jsx
      Breadcrumbs.jsx

    common/
      PageHeader.jsx
      StatCard.jsx
      SectionCard.jsx
      TableCard.jsx
      EmptyState.jsx
      Loader.jsx
      Tabs.jsx
      SearchInput.jsx
      StatusBadge.jsx

    charts/
      PriceChart.jsx
      SalesChart.jsx
      RevenueChart.jsx

    crypto/
      BalanceCard.jsx
      MarketTickerCard.jsx
      MarketTable.jsx
      OrderBookTable.jsx
      OperationTabs.jsx
      TradeForm.jsx

    forms/
      FormInput.jsx
      FormSelect.jsx
      FormTextarea.jsx
      FormCheckbox.jsx
      FormError.jsx
      PasswordField.jsx

  layouts/
    DashboardLayout.jsx
    AuthLayout.jsx

  pages/
    dashboard/
      AnalyticsPage.jsx
      CryptoPage.jsx
      EcommercePage.jsx

    app/
      ProfilePage.jsx
      SettingsPage.jsx
      ProjectsPage.jsx
      ClientsPage.jsx
      OrdersPage.jsx
      PricingPage.jsx
      ChatPage.jsx
      TasksPage.jsx
      CalendarPage.jsx
      InvoicePage.jsx
      BlankPage.jsx

    auth/
      SignInPage.jsx
      SignUpPage.jsx
      ResetPasswordPage.jsx

    error/
      NotFoundPage.jsx
      Error500Page.jsx

  routes/
    AppRouter.jsx
    routeConfig.js

  context/
    AppContext.jsx
    AuthContext.jsx
    ThemeContext.jsx

  hooks/
    useAppContext.js
    useAuthContext.js
    useTheme.js

  data/
    sidebarMenu.js
    navbarData.js
    analyticsData.js
    cryptoData.js
    projectsData.js
    clientsData.js
    ordersData.js
    chatData.js
    tasksData.js
    pricingData.js
    calendarData.js
    notificationsData.js

  services/
    authService.js
    dashboardService.js
    cryptoService.js

  utils/
    constants.js
    formatCurrency.js
    formatDate.js
    getStatusColor.js

  styles/
    globals.css
    variables.css
    layout.css
    components.css

  App.jsx
  main.jsx
```

---

# 6. Component Ownership Map

This section answers: **which component lives where and why.**

## Layout Components

### `DashboardLayout`
**Location:** `src/layouts/DashboardLayout.jsx`

**Responsibility:**
- render sidebar
- render navbar
- render footer
- render page content using `Outlet`
- control overall dashboard shell

**Contains:**
- `Sidebar`
- `Navbar`
- `PageContainer`
- `Footer`

---

### `AuthLayout`
**Location:** `src/layouts/AuthLayout.jsx`

**Responsibility:**
- render simple centered auth screen
- no sidebar
- no dashboard navbar
- clean auth wrapper

---

### `Sidebar`
**Location:** `src/components/layout/Sidebar.jsx`

**Responsibility:**
- show navigation groups
- render links using route config or menu data
- highlight active route
- optional collapse/expand

**Reads data from:**
- `src/data/sidebarMenu.js`

**Reads state from:**
- `AppContext` → `sidebarOpen`

---

### `Navbar`
**Location:** `src/components/layout/Navbar.jsx`

**Responsibility:**
- page top actions
- theme toggle
- notification dropdown
- message dropdown
- user dropdown
- mobile sidebar toggle

**Reads data from:**
- `notificationsData.js`
- `navbarData.js`

**Reads state from:**
- `AppContext`
- `AuthContext`
- `ThemeContext`

---

### `Footer`
**Location:** `src/components/layout/Footer.jsx`

**Responsibility:**
- static bottom links
- copyright

---

# 7. Common Reusable Components

## `PageHeader`
Used in:
- CryptoPage
- AnalyticsPage
- EcommercePage
- SettingsPage
- ProfilePage
- InvoicePage
- etc.

**Props example:**
- `title`
- `subtitle`
- `actions`

---

## `StatCard`
Used for:
- dashboard top summary cards
- analytics metrics
- ecommerce KPIs
- crypto balance cards

**Props example:**
- `title`
- `value`
- `change`
- `trend`
- `icon`

---

## `SectionCard`
Generic wrapper around any section.
Used to standardize:
- spacing
- padding
- title area
- actions
- card border/radius

---

## `TableCard`
Generic table container.
Used for:
- markets table
- buy orders
- sell orders
- clients
- orders
- invoice items

---

## `Tabs`
Reusable tabs for:
- crypto operations
- settings subsections
- optional analytics filters

---

# 8. Crypto Page Breakdown

## Page Component
### `CryptoPage`
**Location:** `src/pages/dashboard/CryptoPage.jsx`

**Contains sections in this order:**
1. page header
2. top summary stat cards
3. main price chart card
4. markets table
5. sell orders table
6. buy orders table
7. operation tabs form

---

## Subcomponents

### `BalanceCard`
Shows top balance info.

### `MarketTickerCard`
Shows pair like:
- USD/BTC
- LTC/BTC
- ETH/BTC
- XMR/BTC

### `PriceChart`
Main price chart.

### `MarketTable`
Shows market rows.

### `OrderBookTable`
Reusable for both:
- Buy Orders
- Sell Orders

### `OperationTabs`
Tabs:
- Buy
- Sell
- Send

### `TradeForm`
Form inside operation tabs.
This will use **React Hook Form**.

---

# 9. Context Design

Context should only manage **shared state**, not every small field.

## `AppContext`
**Location:** `src/context/AppContext.jsx`

**State it owns:**
- `sidebarOpen`
- `setSidebarOpen`
- `selectedCryptoPair`
- `setSelectedCryptoPair`
- `notifications`
- `setNotifications`
- `activeLanguage`
- `setActiveLanguage`

**Used by:**
- Sidebar
- Navbar
- CryptoPage
- PriceChart
- OperationTabs

---

## `AuthContext`
**Location:** `src/context/AuthContext.jsx`

**State it owns:**
- `user`
- `setUser`
- `isAuthenticated`
- `login`
- `logout`

**Used by:**
- SignInPage
- Navbar
- protected page decisions if needed

---

## `ThemeContext`
**Location:** `src/context/ThemeContext.jsx`

**State it owns:**
- `theme`
- `setTheme`
- `toggleTheme`

**Allowed values:**
- `dark`
- `light`

**Why separate theme context?**
Keeps theme logic isolated and avoids overloading AppContext.

---

# 10. Custom Hooks

## `useAppContext`
Returns app context safely.

## `useAuthContext`
Returns auth context safely.

## `useTheme`
Returns theme context safely.

This keeps imports clean and reduces repetitive `useContext(...)` logic.

---

# 11. Data Flow Map

This section answers: **where data comes from and where it goes.**

## Static Page Data
For this assignment, most data can start as local mock data.

### Source files
- `cryptoData.js`
- `analyticsData.js`
- `ordersData.js`
- `clientsData.js`
- `chatData.js`

### Flow
`data/*.js` → page component → child component props → UI render

Example:
`cryptoData.js` → `CryptoPage.jsx` → `MarketTable.jsx`

---

## Shared UI State Flow
Example: sidebar toggle

`Navbar` button click  
→ `AppContext.setSidebarOpen()`  
→ `Sidebar` reads updated state  
→ sidebar expands/collapses

---

## Theme Flow
`Navbar theme toggle`  
→ `ThemeContext.toggleTheme()`  
→ root wrapper class changes  
→ all pages follow theme variables/classes

---

## Auth Flow
`SignInPage form submit`  
→ React Hook Form validates  
→ `login(formData)` in `AuthContext`  
→ user state updated  
→ optional navigate to `/`

---

## Crypto Pair Flow
`Market pair selection`  
→ `setSelectedCryptoPair(pair)`  
→ `PriceChart` updates  
→ `TradeForm` default selected pair can update

---

# 12. React Hook Form Usage Plan

React Hook Form should be used only for real forms.

## Forms that must use RHF
- Sign In
- Sign Up
- Reset Password
- Settings form
- TradeForm in crypto page

## Forms that may use RHF later
- Profile edit
- filter/search forms if needed

## RHF Pattern
Each form page should follow this structure:

1. initialize `useForm`
2. register fields
3. validate
4. submit handler
5. optionally push data into context or local state

## Shared form components
To avoid duplication:
- `FormInput`
- `PasswordField`
- `FormSelect`
- `FormError`

These components should accept:
- label
- name
- type
- register
- error
- placeholder

---

# 13. Theme System Definition

A theme system must be defined **before styling starts**.

## Recommended default
Start with **dark dashboard theme** because the reference looks dark.

## Theme options
- `dark`
- `light`

## Theme storage
Option A:
- Context only

Option B:
- Context + localStorage

### Recommended
Use:
- `ThemeContext`
- persist value in `localStorage`

## Theme application
At app root, apply:
- `data-theme="dark"` or `data-theme="light"`
or
- `className="theme-dark"` / `theme-light`

## Theme tokens to define
- background
- surface
- border
- primary text
- secondary text
- accent
- success
- danger
- warning

## Example theme variable categories
- `--bg-main`
- `--bg-card`
- `--text-primary`
- `--text-secondary`
- `--border-color`
- `--accent-color`

---

# 14. Route Configuration Strategy

Instead of scattering routes everywhere, maintain a route config.

## `routeConfig.js`
Store:
- path
- label
- element
- layout group
- menu visibility
- icon if needed

This helps:
- route generation
- sidebar generation
- future scaling

## `sidebarMenu.js`
Can be separate if you want grouped navigation independent of routes.

### Better approach
Keep `sidebarMenu.js` for grouped display and `routeConfig.js` for route rendering.

---

# 15. Implementation Phases

This is the most important section for productivity.

## Phase 0 — Setup and Planning
### Goal
Prepare project foundation.

### Tasks
- create Vite app
- install dependencies
- create folder structure
- define route inventory
- create empty pages
- decide styling strategy
- create this blueprint file

### Output
- app runs
- all folders exist
- no confusion about architecture

---

## Phase 1 — Routing Skeleton
### Goal
Make navigation work before design.

### Tasks
- create `AppRouter`
- configure `DashboardLayout`
- configure `AuthLayout`
- create placeholder pages
- add all routes
- add `NotFoundPage`
- add `Error500Page`

### Output
- clicking sidebar links changes pages correctly
- auth pages open in auth layout
- unmatched route shows 404

---

## Phase 2 — Layout Shell
### Goal
Build reusable dashboard structure.

### Tasks
- build `Sidebar`
- build `Navbar`
- build `Footer`
- build `PageContainer`
- build `PageHeader`
- add responsive shell behavior

### Output
- reusable dashboard skeleton ready
- every page renders inside same shell

---

## Phase 3 — Context Foundation
### Goal
Add shared state management.

### Tasks
- create `AppContext`
- create `AuthContext`
- create `ThemeContext`
- create custom hooks
- wrap providers in `main.jsx`

### Output
- sidebar state centralized
- auth state centralized
- theme state centralized

---

## Phase 4 — Auth Forms with React Hook Form
### Goal
Implement clean working forms first.

### Tasks
- build shared input components
- build Sign In
- build Sign Up
- build Reset Password
- validate fields
- connect submit flow to `AuthContext`

### Output
- forms validate properly
- structure is ready for other forms

---

## Phase 5 — Crypto Dashboard Core
### Goal
Build the main assignment page.

### Tasks
- build top summary cards
- build price chart section
- build markets table
- build buy/sell order tables
- build operation tabs
- build trade form with RHF
- connect selected pair with shared state if needed

### Output
- crypto dashboard mostly complete
- major assignment requirement covered

---

## Phase 6 — Analytics and Ecommerce Pages
### Goal
Add other dashboard pages.

### Tasks
- create analytics widgets
- create ecommerce widgets
- reuse common cards and table sections
- add chart components

### Output
- dashboard section feels complete
- component reuse improves

---

## Phase 7 — Content Pages
### Goal
Add remaining app pages progressively.

### Priority order
1. Settings
2. Profile
3. Invoice
4. Projects
5. Clients
6. Orders
7. Pricing
8. Chat
9. Tasks
10. Calendar
11. Blank

### Output
- all routes have meaningful content
- reusable patterns validated

---

## Phase 8 — Styling and Theme Polish
### Goal
Make app visually strong and consistent.

### Tasks
- spacing system
- typography system
- theme variables
- hover/focus states
- active nav styles
- card consistency
- responsive adjustments

### Output
- app looks professional
- less CSS chaos

---

## Phase 9 — QA and Refactor
### Goal
Clean the codebase before submission.

### Tasks
- remove dead code
- fix inconsistent props
- fix route naming mismatches
- test navigation
- test forms
- test theme toggle
- test responsive layout
- ensure no console errors

### Output
- stable submission-ready project

---

# 16. Coding Order Inside Each Phase

To reduce errors, use this exact coding order:

## For a new page
1. create page file
2. add route
3. add sidebar link if needed
4. render static heading
5. add section wrappers
6. plug in data
7. create child components
8. style last

## For a new form
1. create UI shell
2. add RHF
3. add validation
4. add submit handler
5. connect context/service if needed
6. add error states
7. style last

## For a new reusable component
1. define props clearly
2. keep markup minimal
3. test with one page
4. then reuse elsewhere

---

# 17. Naming Conventions

## Pages
Use:
- `CryptoPage.jsx`
- `SettingsPage.jsx`

## Layouts
Use:
- `DashboardLayout.jsx`
- `AuthLayout.jsx`

## Components
Use:
- `StatCard.jsx`
- `TradeForm.jsx`

## Context
Use:
- `AppContext.jsx`
- `AuthContext.jsx`

## Hooks
Use:
- `useTheme.js`
- `useAuthContext.js`

## Data files
Use:
- `cryptoData.js`
- `ordersData.js`

Keep naming singular and predictable.

---

# 18. Common Mistakes to Avoid

## Routing mistakes
- mixing auth routes into dashboard layout
- forgetting `Outlet`
- using inconsistent route paths
- hardcoding routes in too many places

## Context mistakes
- putting all state in one giant context
- storing form input state in context unnecessarily
- updating global state too often

## RHF mistakes
- mixing controlled and uncontrolled patterns carelessly
- not passing errors properly
- creating repeated form markup instead of shared inputs

## UI mistakes
- styling before architecture is stable
- making page-specific cards too early
- duplicating table code

---

# 19. Suggested Initial Mock Data Files

## `cryptoData.js`
Should export:
- summaryCards
- tickerPairs
- marketRows
- sellOrders
- buyOrders

## `analyticsData.js`
Should export:
- statCards
- browserUsage
- recentMovements
- salesSeries

## `ordersData.js`
Should export:
- orders list
- status info

## `clientsData.js`
Should export:
- client rows

This keeps the UI independent from future API integration.

---

# 20. Future API-Ready Structure

Even if the current task uses mock data, code in a way that future API integration becomes easy.

## Pattern
`service` fetches data  
→ page stores data in local state  
→ passes to reusable components

For now services can simply return mock data.

Example:
- `cryptoService.js` returns local data
- later it can be replaced by real API

This avoids major rewrites.

---

# 21. Minimal Deliverable vs Ideal Deliverable

## Minimal deliverable
- all routes working
- dashboard shell done
- crypto page done
- auth forms done
- settings form done
- no major errors

## Ideal deliverable
- analytics + ecommerce done
- multiple content pages filled
- theme toggle done
- responsive layout done
- reusable components polished

---

# 22. Definition of Done

A phase is done only when:
- code runs
- no console errors
- route integration complete
- component connected properly
- naming matches the blueprint
- basic testing done

Do not mark a phase done only because UI exists.

---

# 23. Recommended Start Sequence for Coding

## Day 1
- Phase 0
- Phase 1

## Day 2
- Phase 2
- Phase 3

## Day 3
- Phase 4
- start Phase 5

## Day 4
- complete Phase 5
- Phase 6

## Day 5
- Phase 7
- Phase 8
- Phase 9

---

# 24. Exact First Files to Create

Create in this order:

1. `src/routes/AppRouter.jsx`
2. `src/layouts/DashboardLayout.jsx`
3. `src/layouts/AuthLayout.jsx`
4. placeholder page files
5. `src/data/sidebarMenu.js`
6. `src/components/layout/Sidebar.jsx`
7. `src/components/layout/Navbar.jsx`
8. `src/components/layout/Footer.jsx`
9. `src/context/AppContext.jsx`
10. `src/context/AuthContext.jsx`
11. `src/context/ThemeContext.jsx`

This order minimizes dependency confusion.

---

# 25. Final Recommendation for Codex

When asking Codex to write code, do not say:
- "make full project"

Instead ask in controlled chunks like:
- "Create AppRouter with these exact routes"
- "Create DashboardLayout with Sidebar, Navbar, Footer, Outlet"
- "Create AppContext with sidebarOpen and selectedCryptoPair"
- "Create SignInPage using React Hook Form"
- "Create CryptoPage with reusable sections using mock data"

This blueprint is made so Codex can build the project **piece by piece without breaking structure**.

---

# 26. Final Build Rule

**Architecture first, UI second, polish last.**

That is the safest path for this project.



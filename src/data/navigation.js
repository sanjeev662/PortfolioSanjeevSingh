/**
 * Single source of truth for the primary navigation.
 *
 * Shared by Navbar (desktop + mobile menus) and anywhere else that needs the
 * route list, e.g. footer links. Do NOT re-declare a `navItems` array in a
 * component — adding a route in one copy and forgetting the other is the exact
 * bug this module prevents. Paths must match the <Route> table in src/App.js.
 */

export const NAV_ITEMS = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About" },
  { path: "/domain", label: "Domain" },
  { path: "/projects", label: "Projects" },
  { path: "/certificates", label: "Certificates" },
  { path: "/contacts", label: "Contact" },
];

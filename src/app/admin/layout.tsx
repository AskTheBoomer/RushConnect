import Link from "next/link";
import { logout } from "../login/actions";

const links = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/inquiries", label: "Inquiries" },
  { href: "/admin/reviews", label: "Reviews" },
  { href: "/admin/content", label: "Content" },
] as const;

// Shared frame for every owner portal page: prototype banner, navigation, log out.
// Visual design is placeholder; Herbert's UI work replaces the styling.
export default function AdminLayout({ children }: LayoutProps<"/admin">) {
  return (
    <div className="flex min-h-screen flex-col">
      <p className="bg-amber-100 px-4 py-2 text-center text-sm text-amber-900">
        Prototype: screens show sample data. Editing is added in Sprint 3.
      </p>
      <header className="border-b border-gray-200">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-3">
          <span className="font-semibold">Rush Connect · Owner Portal</span>
          <nav className="flex flex-wrap gap-4 text-sm">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="hover:underline">
                {link.label}
              </Link>
            ))}
          </nav>
          <form action={logout}>
            <button type="submit" className="rounded border border-gray-300 px-3 py-1 text-sm">
              Log out
            </button>
          </form>
        </div>
      </header>
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8">{children}</main>
    </div>
  );
}

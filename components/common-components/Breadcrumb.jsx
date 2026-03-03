import Link from "next/link";

export default function Breadcrumb() {
  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600">
      {/* Home */}
      <Link href="/" className="hover:text-black">
        Home
      </Link>

      <span>/</span>

      {/* Jobs */}
      <Link
        href="/jobs"
        className="hover:text-black"
        onClick={() => window.location.reload()}
      >
        Job
      </Link>

      <span>/</span>

      {/* Current Page */}
      <span className="font-medium text-black">Job Detail</span>
    </nav>
  );
}

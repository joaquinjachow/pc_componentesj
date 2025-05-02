import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Navbar() {
  const router = useRouter();
  const path = router.pathname;

  return (
    <nav className="bg-white shadow-sm p-6">
      <div className="flex justify-center space-x-4 text-blue-600 font-semibold">
        {path !== '/' && (
          <Link href="/" className="hover:underline">
            Home
          </Link>
        )}
        {path !== '/categoria' && (
          <Link href="/categoria" className="hover:underline">
            Categorías
          </Link>
        )}
        {path !== '/carrito' && (
          <Link href="/carrito" className="hover:underline">
            Carrito
          </Link>
        )}
      </div>
    </nav>
  );
}
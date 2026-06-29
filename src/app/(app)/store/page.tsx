import { redirect } from "next/navigation";

/**
 * The standalone "Tienda"/Store no longer exists.
 *
 * Everything is FREE and open: the former store ("Intercambio de Recursos")
 * has been folded into the open file library ("Librería Global"), which now
 * lives — together with the personal library ("Mi Biblioteca") — inside the
 * unified "Documentos" section.
 *
 * This route is kept as a permanent redirect so any old links to /store keep
 * working and land users directly in Documentos -> open library (free).
 *
 * Server component: the redirect runs on the server, is fully SSR-safe and
 * stateless. No store concept remains anywhere in the product.
 */
export default function StoreRedirectPage(): never {
  redirect("/library?view=global");
}

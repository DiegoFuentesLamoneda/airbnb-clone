import Link from "next/link";

interface RoomNotFoundProps {
  /** El identificador que venía en la URL y no existe. */
  id: string;
}

/** Qué se ve cuando la URL apunta a un alojamiento que no está en los datos. */
const RoomNotFound = ({ id }: RoomNotFoundProps) => (
  <main className="mx-auto max-w-[1120px] px-5 py-16 text-center md:px-10">
    <h1 className="text-2xl font-semibold">Alojamiento no encontrado</h1>
    <p className="mt-2 text-muted">
      No existe ningún alojamiento con el identificador «{id}».
    </p>
    <Link
      href="/catalog"
      className="mt-6 inline-block rounded-lg bg-rausch px-5 py-3 font-semibold text-white transition hover:bg-rausch-dark"
    >
      Volver al catálogo
    </Link>
  </main>
);

export default RoomNotFound;

interface RoomDescriptionProps {
  description: string;
}

const RoomDescription = ({ description }: RoomDescriptionProps) => (
  <section className="border-b border-hairline py-6">
    <h2 className="text-xl font-semibold">Sobre este alojamiento</h2>
    <p className="mt-3 text-sm leading-relaxed text-muted">{description}</p>
  </section>
);

export default RoomDescription;

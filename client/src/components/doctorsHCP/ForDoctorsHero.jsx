export default function ForDoctorsHero({ data }) {
  return (
    <section>
      <div className="container mx-auto max-w-7xl px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">
          {data.title}
        </h1>
        <p className="text-muted-foreground max-w-4xl">
          {data.description}
        </p>
      </div>
    </section>
  );
}

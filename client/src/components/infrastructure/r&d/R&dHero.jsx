export default function RdFdHero({ data }) {
  return (
    <section className="py-1">
      <div className="container mx-auto max-w-7xl px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          {data.title}
        </h1>
        <p className="text-muted-foreground max-w-3xl leading-relaxed">
          {data.description}
        </p>
      </div>
    </section>
  );
}

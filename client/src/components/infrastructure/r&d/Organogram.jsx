import { Card, CardContent } from "@/components/ui/card";

export default function RdFdOrganogram({ data }) {
  return (
    <section>
      <div className="container mx-auto max-w-7xl px-4 space-y-10">
        <h2 className="text-2xl font-semibold">
          {data.title}
        </h2>

        <div>
          <h3 className="text-xl font-medium mb-4">
            R&D Departments
          </h3>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {data.departments.map((dept, index) => (
              <Card key={index} className="bg-orange-100 text-center">
                <CardContent className="p-4 font-medium text-sm">
                  {dept}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-medium mb-4">
            Organizational Hierarchy
          </h3>

          <div className="flex flex-wrap gap-4 items-center">
            {data.hierarchy.map((role, index) => (
              <div
                key={index}
                className="flex items-center gap-2"
              >
                <Card className="bg-orange-100">
                  <CardContent className="px-5 py-3 text-sm font-medium">
                    {role}
                  </CardContent>
                </Card>

                {index !== data.hierarchy.length - 1 && (
                  <span className="text-muted-foreground">→</span>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

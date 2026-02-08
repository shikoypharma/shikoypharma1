import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell
} from "@/components/ui/table";

export default function ForDoctorsTables({ data }) {
  return (
    <section className="pb-16">
      <div className="container mx-auto max-w-7xl px-4 space-y-12">

        {data.categories.map((category, index) => (
          <div key={index}>
            <h2 className="text-2xl font-semibold mb-4 text-center">
              {category.name}
            </h2>

            <div className="rounded-lg border overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product Description</TableHead>
                    <TableHead>Brand</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {category.rows.map((row, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">
                        {row[0]}
                      </TableCell>
                      <TableCell>
                        {row[1]}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        ))}

        <p className="text-xs text-muted-foreground pt-6 border-t">
          {data.disclaimer}
        </p>

      </div>
    </section>
  );
}

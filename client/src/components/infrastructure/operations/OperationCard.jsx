import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function OperationCard({ operation }) {
  return (
    <Card className="rounded-2xl hover:shadow-lg transition-all">
      <CardHeader>
        <CardTitle className="text-lg">
          {operation.title}
        </CardTitle>
      </CardHeader>

      <CardContent className="text-sm text-muted-foreground leading-relaxed">
        {operation.description}
      </CardContent>
    </Card>
  );
}

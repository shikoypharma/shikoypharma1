export default function ProductImageSection({ image, productName }) {
  return (
    <div className="w-full h-96 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
      <img
        src={image}
        alt={productName}
        className="w-full h-full object-cover"
        onError={(e) => {
          e.target.src =
            "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'%3E%3Crect fill='%23e5e7eb' width='400' height='400'/%3E%3Ctext x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-size='20' fill='%239ca3af'%3ENo Image%3C/text%3E%3C/svg%3E";
        }}
      />
    </div>
  );
}

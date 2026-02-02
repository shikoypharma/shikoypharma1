export default function ProductInfo({ product }) {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium text-blue-600 mb-2">{product.category}</p>
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">{product.name}</h1>
        <p className="text-base text-gray-700">{product.composition}</p>
      </div>

      <div className="inline-flex items-center px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg">
        <span className="text-sm font-medium text-blue-600">Strength: {product.strength}</span>
      </div>

      <div className="space-y-3 p-6 bg-gray-50 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">About {product.name}</h3>
        <p className="text-gray-700 leading-relaxed">{product.description || `${product.name} is a formulation of ${product.composition}.`}</p>
      </div>
    </div>
  );
}

async function fetchCategories() {
    try {
        const response = await fetch('http://localhost:5001/api/product-categories');
        const data = await response.json();
        console.log(JSON.stringify(data.map(c => ({ name: c.name, slug: c.slug })), null, 2));
    } catch (error) {
        console.error(error.message);
    }
}

fetchCategories();

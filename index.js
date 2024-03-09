document.addEventListener("DOMContentLoaded", function () {
    const productDataUrl = "data.json"; // Path to your JSON file

    // Function to hide all products
    const hideAllProducts = () => {
        const product = document.querySelectorAll(".product");
        product.forEach(item => {
            item.style.display = "none";
        });
    };

    // Function to display products based on JSON data
    const displayProducts = (products) => {
        const productList = document.getElementById("product-list");

        // Clear existing products
        productList.innerHTML = "";

        products.forEach(product => {
            const productDiv = document.createElement("div");
            productDiv.classList.add("product");

            const img = document.createElement("img");
            img.src = product.imageUrl;
            img.alt = product.name;
            productDiv.appendChild(img);

            const pDetails = document.createElement("div");
            pDetails.classList.add("p-details");

            const h4 = document.createElement("h4");
            h4.textContent = product.name;
            pDetails.appendChild(h4);

            const h5 = document.createElement("h5");
            h5.textContent = "$" + product.price;
            pDetails.appendChild(h5);

            productDiv.appendChild(pDetails);

            productList.appendChild(productDiv);
        });
    };

    // Function to perform search
    const search = () => {
        const searchbox = document.getElementById("search-item").value.trim().toUpperCase();

        if (!searchbox) {
            // If search box is empty, hide all products
            hideAllProducts();
            return;
        }

        // Fetch products from JSON file
        fetch(productDataUrl)
            .then(response => response.json())
            .then(products => {
                // Filter products based on search input
                const filteredProducts = products.filter(product =>
                    product.name.toUpperCase().includes(searchbox)
                );

                // Display filtered products
                displayProducts(filteredProducts);
            })
            .catch(error => console.error("Error fetching products:", error));
    };

    // Call the hideAllProducts function when the DOM content is loaded
    hideAllProducts();

    // Bind the search function to the keyup event of the search input
    document.getElementById("search-item").addEventListener("keyup", search);
});

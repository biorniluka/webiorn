// Example car data
const cars = [
    { name: "PORSCHE", brand: "PORSCHE", type: "CAYENE", year: 2015, price: 75, rating: 4.9 },
    { name: "MERCEDES-BENZ", brand: "MERCEDES-BENZ", type: "ML", year: 2015, price: 70, rating: 4.9 },
    // Add more cars here...
];

// Function to render cars
function renderCars(carList) {
    const carListContainer = document.getElementById("carList");
    carListContainer.innerHTML = ""; // Clear existing cars

    carList.forEach((car) => {
        const carItem = document.createElement("div");
        carItem.classList.add("car-item");

        carItem.innerHTML = `
            <div class="car-details">
                <h3>${car.name} ${car.type}</h3>
                <p><strong>Marka:</strong> ${car.brand}</p>
                <p><strong>Viti:</strong> ${car.year}</p>
                <p><strong>Çmimi:</strong> €${car.price}/ditë</p>
                <button class="btn reserve-btn" onclick="openReservationModal('${car.name}', '${car.type}', ${car.price})">
                    Rezervo Tani
                </button>
            </div>
        `;

        carListContainer.appendChild(carItem);
    });
}

// Initial render
renderCars(cars);
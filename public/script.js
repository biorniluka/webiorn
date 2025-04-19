// Fetch and render cars, handle modal, gallery, sorting, and reservation logic

// Car data is now local, no backend needed!
const cars = [
    { name: "PORSCHE", brand: "PORSCHE", type: "CAYENE", year: 2015, price: 75, rating: 4.9 },
    { name: "MERCEDES-BENZ", brand: "MERCEDES-BENZ", type: "ML", year: 2015, price: 70, rating: 4.9 },
    { name: "VOLKSWAGEN", brand: "VOLKSWAGEN", type: "TOUAREG", year: 2014, price: 65, rating: 4.8 },
    { name: "AUDI", brand: "AUDI", type: "A6", year: 2014, price: 60, rating: 4.7 },
    { name: "VOLKSWAGEN", brand: "VOLKSWAGEN", type: "GOLF 7", year: 2016, price: 40, rating: 4.8 },
    { name: "VOLKSWAGEN", brand: "VOLKSWAGEN", type: "GOLF 6", year: 2012, price: 30, rating: 4.7 },
    { name: "AUDI", brand: "AUDI", type: "A3", year: 2011, price: 28, rating: 4.5 },
    { name: "AUDI", brand: "AUDI", type: "A3", year: 2013, price: 35, rating: 4.7 },
    { name: "VOLKSWAGEN", brand: "VOLKSWAGEN", type: "GOLF 6+", year: 2010, price: 28, rating: 4.0 },
    { name: "VOLKSWAGEN", brand: "VOLKSWAGEN", type: "GOLF 5", year: 2010, price: 28, rating: 3.9 }
];
let currentSort = 'default';

window.addEventListener('DOMContentLoaded', () => {
    renderCars(cars);
    setupSortFilter();
    setupModalHandlers();
});


// Render car cards
function renderCars(carList) {
    const carListContainer = document.getElementById("carList");
    carListContainer.innerHTML = "";
    carList.forEach((car, idx) => {
        const carItem = document.createElement("div");
        carItem.classList.add("car-item");
        // Determine images
        let imagePaths = getImagePaths(car);
        // Gallery HTML
        carItem.innerHTML = `
            <div class="car-gallery">
                <div class="gallery-container">
                    ${imagePaths.map((img, i) => `<img src="${img}" alt="${car.name} ${car.type}" class="gallery-img${i === 0 ? ' active' : ''}" onerror="this.src='images/placeholder.jpg'">`).join('')}
                    <button class="gallery-nav prev">‹</button>
                    <button class="gallery-nav next">›</button>
                </div>
                <div class="gallery-dots">
                    ${imagePaths.map((_, i) => `<div class="dot${i === 0 ? ' active' : ''}"></div>`).join('')}
                </div>
            </div>
            <div class="car-info">
                <h3>${car.name} ${car.type} (${car.year})</h3>
                <p><strong>Çmimi:</strong> €${car.price} për ditë</p>
                <p><strong>Vlerësimi:</strong> ${car.rating} / 5</p>
                <button class="reserve-btn">Rezervo <i class="fas fa-calendar-check"></i></button>
            </div>
        `;
        carListContainer.appendChild(carItem);
        // Gallery logic
        setupGallery(carItem, imagePaths);
        // Reservation button
        carItem.querySelector('.reserve-btn').addEventListener('click', () => {
            window.openReservationModal(`${car.name} ${car.type}`);
        });
    });
}

// Get image paths for a car
function getImagePaths(car) {
    // Use your previous logic or fallback to placeholder
    if (car.name === "PORSCHE") return ["images/porsche_1.jpg","images/porsche_2.jpg","images/porsche_3.jpg"];
    if (car.name === "MERCEDES-BENZ") return ["images/mercedes_1.jpg","images/mercedes_2.jpg","images/mercedes_3.jpg"];
    if (car.name === "VOLKSWAGEN" && car.type === "TOUAREG") return ["images/touareg_1.jpg","images/touareg_2.jpg","images/touareg_3.jpg"];
    if (car.name === "AUDI" && car.type === "A3" && car.year === 2011) return ["images/audi_a3_2011_1.jpg","images/audi_a3_2011_2.jpg","images/audi_a3_2011_3.jpg"];
    if (car.name === "AUDI" && car.type === "A3" && car.year === 2013) return ["images/audi_a3_2013_1.jpg","images/audi_a3_2013_2.jpg","images/audi_a3_2013_3.jpg"];
    if (car.name === "AUDI" && car.type === "A6") return ["images/audi_a6_1.jpg","images/audi_a6_2.jpg","images/audi_a6_3.jpg"];
    if (car.name === "VOLKSWAGEN" && car.type === "GOLF 5") return ["images/golf5_1.jpg","images/golf5_2.jpg","images/golf5_3.jpg"];
    if (car.name === "VOLKSWAGEN" && car.type === "GOLF 6") return ["images/golf6_1.jpg","images/golf6_2.jpg","images/golf6_3.jpg"];
    if (car.name === "VOLKSWAGEN" && car.type === "GOLF 6+") return ["images/golf6plus_1.jpg","images/golf6plus_2.jpg","images/golf6plus_3.jpg"];
    if (car.name === "VOLKSWAGEN" && car.type === "GOLF 7") return ["images/golf7_1.jpg","images/golf7_2.jpg","images/golf7_3.jpg"];
    return ["images/placeholder.jpg"];
}

// Gallery logic
function setupGallery(carItem, imagePaths) {
    const imgs = carItem.querySelectorAll('.gallery-img');
    const dots = carItem.querySelectorAll('.dot');
    const prevBtn = carItem.querySelector('.gallery-nav.prev');
    const nextBtn = carItem.querySelector('.gallery-nav.next');
    let idx = 0;
    function updateGallery(newIdx) {
        imgs[idx].classList.remove('active');
        dots[idx].classList.remove('active');
        idx = newIdx;
        imgs[idx].classList.add('active');
        dots[idx].classList.add('active');
    }
    prevBtn.addEventListener('click', () => {
        updateGallery((idx - 1 + imgs.length) % imgs.length);
    });
    nextBtn.addEventListener('click', () => {
        updateGallery((idx + 1) % imgs.length);
    });
    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => updateGallery(i));
    });
}

// Modal logic
function setupModalHandlers() {
    // Modal open/close
    window.openReservationModal = function(carName) {
        const modal = document.getElementById('reservationModal');
        if (!modal) return;
        modal.style.display = 'flex';
        document.getElementById('carName').innerText = carName;
        document.getElementById('reservationForm').reset();
        document.getElementById('reservationMessage').innerText = '';
    };
    window.closeReservationModal = function() {
        const modal = document.getElementById('reservationModal');
        if (!modal) return;
        modal.style.display = 'none';
    };
    // Close on background click
    document.addEventListener('click', (e) => {
        const modal = document.getElementById('reservationModal');
        if (modal && e.target === modal) window.closeReservationModal();
    });
    // Form submit
    const form = document.getElementById('reservationForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const car = document.getElementById('carName').innerText;
            const name = form.elements['name'].value;
            const phone = form.elements['phone'].value;
            const date = form.elements['date'].value;
            // Compose WhatsApp message
            const msg = encodeURIComponent(
                `Pershendetje! Dua te rezervoj makinen ${car} per daten ${date}. Emri: ${name}, Telefoni: ${phone}`
            );
            const waUrl = `https://wa.me/355684055754?text=${msg}`;
            window.open(waUrl, '_blank');
            window.closeReservationModal();
        });
    }
}

// Sort filter logic
function setupSortFilter() {
    const sortFilter = document.getElementById('sortFilter');
    if (!sortFilter) return;
    sortFilter.addEventListener('change', function() {
        currentSort = sortFilter.value;
        let sortedCars = [...cars];
        if (currentSort === 'price-asc') sortedCars.sort((a, b) => a.price - b.price);
        else if (currentSort === 'price-desc') sortedCars.sort((a, b) => b.price - a.price);
        else if (currentSort === 'rating') sortedCars.sort((a, b) => b.rating - a.rating);
        renderCars(sortedCars);
    });
}

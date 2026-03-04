// script.js
const scooters = [
    {
        id: "yamaha",
        name: "Yamaha TMAX 560",
        image: "./images/tmax.jpg",
        specs: {
            engine: "562 cc parallel-twin, liquid-cooled, DOHC",
            horsepower: "47 hp @ 7,000 rpm",
            torque: "55.7 Nm @ 5,250 rpm",
            topSpeed: "165 km/h",
            transmission: "CVT automatic (V-belt)",
            fuelCapacity: "15 liters",
            brakingSystem: "Dual 267 mm front discs + rear disc with ABS",
            technologyFeatures: "7\" TFT display, keyless entry, traction control, smartphone connectivity",
            comfortFeatures: "Adjustable windshield, 2-helmet under-seat storage, ergonomic design",
            intendedUsage: "Premium maxi-scooter for commuting and long-distance touring"
        },
        comparison: {
            engine: "562 cc parallel-twin",
            power: "47 hp",
            torque: "55.7 Nm",
            topSpeed: "165 km/h",
            weight: "220 kg",
            fuelCapacity: "15 L",
            braking: "Dual-disc ABS",
            technology: "TFT + connectivity + traction control",
            idealUsage: "Sport touring / highway"
        }
    },
    {
        id: "zontes",
        name: "Zontes 350E",
        image: "./images/zontes.jpg",
        specs: {
            engine: "349 cc single-cylinder, liquid-cooled, SOHC 4-valve",
            horsepower: "37 hp @ 7,500 rpm",
            torque: "38 Nm @ 6,000 rpm",
            topSpeed: "145 km/h",
            transmission: "CVT automatic",
            fuelCapacity: "16 liters",
            brakingSystem: "Front & rear disc with dual-channel ABS",
            technologyFeatures: "Full LED lighting, digital LCD, USB charging, keyless start",
            comfortFeatures: "Low 770 mm seat height, adjustable handlebars",
            intendedUsage: "Dynamic urban and suburban daily commuter"
        },
        comparison: {
            engine: "349 cc single-cylinder",
            power: "37 hp",
            torque: "38 Nm",
            topSpeed: "145 km/h",
            weight: "200 kg",
            fuelCapacity: "16 L",
            braking: "Disc ABS",
            technology: "LED + digital cluster + keyless",
            idealUsage: "Sporty city commuting"
        }
    },
    {
        id: "keeway",
        name: "Keeway Nexy 125",
        image: "./images/keeway.jpg",
        specs: {
            engine: "124.8 cc single-cylinder, liquid-cooled, DOHC 4-valve",
            horsepower: "12 hp @ 8,250 rpm",
            torque: "11.7 Nm @ 6,500 rpm",
            topSpeed: "105 km/h",
            transmission: "CVT automatic",
            fuelCapacity: "8 liters",
            brakingSystem: "Front disc, rear drum with CBS",
            technologyFeatures: "Digital instrument cluster, LED lighting, hybrid efficiency mode",
            comfortFeatures: "Compact lightweight chassis, easy parking",
            intendedUsage: "Entry-level city scooter for daily short commutes"
        },
        comparison: {
            engine: "124.8 cc single-cylinder",
            power: "12 hp",
            torque: "11.7 Nm",
            topSpeed: "105 km/h",
            weight: "130 kg",
            fuelCapacity: "8 L",
            braking: "Disc + drum CBS",
            technology: "Digital + LED",
            idealUsage: "Urban beginner mobility"
        }
    }
];

let viewed = new Set();
let activeScooterId = null;

function createScooterCard(scooter) {
    const card = document.createElement('div');
    card.className = `scooter-card ${activeScooterId === scooter.id ? 'active' : ''}`;
    card.innerHTML = `
        <img src="${scooter.image}" alt="${scooter.name}">
        <div class="card-content">
            <h3>${scooter.name}</h3>
            <p>Click to view detailed specifications</p>
        </div>
    `;
    card.addEventListener('click', () => selectScooter(scooter.id));
    return card;
}

function renderScooterGrid() {
    const grid = document.getElementById('scooter-grid');
    grid.innerHTML = '';
    scooters.forEach(scooter => {
        grid.appendChild(createScooterCard(scooter));
    });
}

function updateProgress() {
    document.getElementById('viewed-count').textContent = viewed.size;
    const percentage = (viewed.size / 3) * 100;
    document.getElementById('progress-fill').style.width = `${percentage}%`;

    document.getElementById('comparison-btn').classList.toggle('hidden', viewed.size !== 3);
}

function selectScooter(id) {
    const scooter = scooters.find(s => s.id === id);
    if (!scooter) return;

    viewed.add(id);
    updateProgress();

    activeScooterId = id;
    renderScooterGrid();

    showDetails(scooter);
}

function showDetails(scooter) {
    const section = document.getElementById('details-section');
    const content = document.getElementById('details-content');

    let specsHTML = '';
    Object.entries(scooter.specs).forEach(([key, value]) => {
        const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
        specsHTML += `
            <div class="spec-item">
                <div class="spec-label">${label}</div>
                <div class="spec-value">${value}</div>
            </div>
        `;
    });

    content.innerHTML = `
        <div class="details-image">
            <img src="${scooter.image}" alt="${scooter.name}">
        </div>
        <div class="details-specs">
            <h3>${scooter.name}</h3>
            <div class="spec-grid">
                ${specsHTML}
            </div>
        </div>
    `;

    section.classList.remove('hidden');
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function closeDetails() {
    document.getElementById('details-section').classList.add('hidden');
    activeScooterId = null;
    renderScooterGrid();
}

function renderComparisonTable() {
    const tbody = document.querySelector('#comparison-table tbody');
    tbody.innerHTML = '';

    const features = [
        { label: "Engine", key: "engine" },
        { label: "Power", key: "power" },
        { label: "Torque", key: "torque" },
        { label: "Top Speed", key: "topSpeed" },
        { label: "Weight", key: "weight" },
        { label: "Fuel Capacity", key: "fuelCapacity" },
        { label: "Braking", key: "braking" },
        { label: "Technology", key: "technology" },
        { label: "Ideal Usage", key: "idealUsage" }
    ];

    features.forEach(f => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${f.label}</td>
            <td>${scooters[0].comparison[f.key]}</td>
            <td>${scooters[1].comparison[f.key]}</td>
            <td>${scooters[2].comparison[f.key]}</td>
        `;
        tbody.appendChild(tr);
    });
}

function showComparison() {
    if (viewed.size !== 3) return;
    const section = document.getElementById('comparison-section');
    renderComparisonTable();
    section.classList.remove('hidden');
    section.scrollIntoView({ behavior: 'smooth' });
}

function hideComparison() {
    document.getElementById('comparison-section').classList.add('hidden');
}

// Init
document.addEventListener('DOMContentLoaded', () => {
    renderScooterGrid();
    updateProgress();

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            const details = document.getElementById('details-section');
            if (!details.classList.contains('hidden')) closeDetails();
        }
    });
});
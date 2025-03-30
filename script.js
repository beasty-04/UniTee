// Theme initialization
document.documentElement.setAttribute('data-theme', 
    localStorage.getItem('theme') || 
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
);

// Conversion data structure (easy to add new types)
const conversionData = {
    length: {
        icon: '📏',
        name: 'Length',
        units: {
            meter: 1,
            kilometer: 1000,
            mile: 1609.34,
            foot: 0.3048,
            inch: 0.0254
        }
    },
    area: {
        icon: '🌐',
        name: 'Area',
        units: {
            m2: 1,
            km2: 1000000,
            hectare: 10000,
            acre: 4046.86,
            ft2: 0.092903
        }
    },
    speed: {
        icon: '🚀',
        name: 'Speed',
        units: {
            mps: 1,         // meters per second
            kph: 0.277778,  // km/h to m/s
            mph: 0.44704,   // miles/h to m/s
            knot: 0.514444,
            fps: 0.3048      // feet/s to m/s
        }
    },
    power: {
        icon: '⚡',
        name: 'Power',
        units: {
            watt: 1,
            kilowatt: 1000,
            horsepower: 745.7,
            btu_hr: 0.293071
        }
    },
    volume: {
        icon: '🧴',
        name: 'Volume',
        units: {
            liter: 1,
            m3: 1000,
            gallon_us: 3.78541,
            gallon_uk: 4.54609,
            ft3: 28.3168
        }
    },
    pressure: {
        icon: '🎚️',
        name: 'Pressure',
        units: {
            pascal: 1,
            bar: 100000,
            psi: 6894.76,
            atm: 101325,
            torr: 133.322
        }
    },
    energy: {
        icon: '🔋',
        name: 'Energy',
        units: {
            joule: 1,
            kwh: 3600000,
            calorie: 4.184,
            btu: 1055.06,
            ev: 1.60218e-19
        }
    },
    torque: {
        icon: '🔧',
        name: 'Torque',
        units: {
            nm: 1,          // Newton-meter
            lbft: 1.35582,  // Pound-foot
            kgfm: 9.80665   // Kilogram-force meter
        }
    },
    mass: {
        icon: '⚖️',
        name: 'Mass',
        units: {
            kilogram: 1,
            gram: 0.001,
            pound: 0.453592,
            ounce: 0.0283495,
            ton: 1000
        }
    },
    temperature: {
        icon: '🌡️',
        name: 'Temperature',
        units: {
            celsius: 'Celsius',
            fahrenheit: 'Fahrenheit',
            kelvin: 'Kelvin'
        }
    }
    // Add more conversion types here...
};

// Single conversion function for all types
function convert(category) {
    const input = parseFloat(document.getElementById(`${category}-input`).value);
    const fromUnit = document.getElementById(`${category}-from`).value;
    const toUnit = document.getElementById(`${category}-to`).value;
    
    const baseValue = input * conversionData[category].units[fromUnit];
    const result = baseValue / conversionData[category].units[toUnit];
    
    const resultElement = document.getElementById(`${category}-result`);
    resultElement.textContent = `${input} ${fromUnit} = ${result.toFixed(4)} ${toUnit}`;
    resultElement.style.animation = 'slide-up 0.4s ease-out';
}

// Generate converter cards dynamically
function initConverters() {
    const grid = document.querySelector('.converter-grid');
    
    Object.entries(conversionData).forEach(([key, data]) => {
        const card = document.createElement('div');
        card.className = 'glass-card p-6 rounded-2xl transition-all hover:transform hover:scale-[1.02]';
        card.innerHTML = `
            <h3 class="text-xl font-bold mb-4">${data.icon} ${data.name}</h3>
            <div class="space-y-4">
                <input type="number" id="${key}-input" placeholder="Enter value" 
                    class="w-full p-3 rounded-lg bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-purple-400">
                
                <select id="${key}-from" class="select-style">
                    ${Object.keys(data.units).map(unit => `<option value="${unit}">${unit}</option>`).join('')}
                </select>
                
                <select id="${key}-to" class="select-style">
                    ${Object.keys(data.units).map(unit => `<option value="${unit}">${unit}</option>`).join('')}
                </select>
                
                <button onclick="convert('${key}')" class="btn-primary">Convert</button>
                <div id="${key}-result" class="result-box"></div>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Initialize converters when page loads
window.addEventListener('DOMContentLoaded', initConverters);

// Input validation
document.querySelectorAll('input[type="number"]').forEach(input => {
    input.addEventListener('input', () => {
        const resultElement = input.closest('.space-y-4').querySelector('.result-box');
        if (!input.value) {
            resultElement.textContent = '';
        }
    });
});
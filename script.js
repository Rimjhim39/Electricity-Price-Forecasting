let chart;

async function predict() {

    const date = document.getElementById("date").value;
    const horizon = document.getElementById("horizon").value;

    try {

        const response = await fetch("http://127.0.0.1:5000/predict", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                date: date,
                horizon: horizon
            })

        });

        const data = await response.json();

        plotGraph(data.prices);
        fillTable(data.prices);
        showRecommendation(data.recommendation);

    } catch (error) {

        console.error("Backend connection error:", error);
        alert("Backend server is not running");

    }

}

function plotGraph(prices) {

    const canvas = document.getElementById("priceChart");

    const ctx = canvas.getContext("2d");

    // Improve resolution
    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvas.clientWidth * dpr;
    canvas.height = canvas.clientHeight * dpr;
    ctx.scale(dpr, dpr);

    if (chart) chart.destroy();

    chart = new Chart(ctx, {

        type: "line",

        data: {

            labels: prices.map((_, i) => "Hour " + (i + 1)),

            datasets: [{

                label: "Predicted Price (₹)",

                data: prices,

                borderColor: "#00e5ff",
                backgroundColor: "rgba(0,229,255,0.2)",

                tension: 0.35,
                fill: true,

                borderWidth: 3,
                pointRadius: 4,
                pointHoverRadius: 6

            }]
        },

        options: {

            responsive: true,
            maintainAspectRatio: false,

            animation: {
                duration: 1200
            },

            plugins: {

                legend: {
                    display: true,
                    labels: {
                        font: {
                            size: 14
                        }
                    }
                }

            },

            scales: {

                x: {
                    ticks: {
                        font: {
                            size: 13
                        }
                    }
                },

                y: {
                    beginAtZero: false,
                    ticks: {
                        font: {
                            size: 13
                        }
                    }
                }

            }

        }

    });

}

function fillTable(prices) {

    const tbody = document.querySelector("#priceTable tbody");

    tbody.innerHTML = "";

    prices.forEach((price, index) => {

        const row = `
            <tr>
                <td>${index + 1}</td>
                <td>${price}</td>
            </tr>`;

        tbody.innerHTML += row;

    });

}

function showRecommendation(rec) {

    const box = document.getElementById("recommendation");

    box.innerHTML = "Recommendation: " + rec;

    if (rec === "BUY") {

        box.style.background = "#d4edda";
        box.style.color = "#155724";

    } else {

        box.style.background = "#f8d7da";
        box.style.color = "#721c24";

    }

}


/* ⚡ ELECTRIC VISUAL EFFECTS */

const sparksContainer = document.querySelector(".sparks");

for (let i = 0; i < 12; i++) {

    const bolt = document.createElement("span");

    bolt.style.left = Math.random() * 100 + "%";
    bolt.style.top = Math.random() * 100 + "%";
    bolt.style.animationDelay = Math.random() * 5 + "s";

    sparksContainer.appendChild(bolt);

}


const particleContainer = document.querySelector(".particles");

for (let i = 0; i < 35; i++) {

    const particle = document.createElement("span");

    particle.style.left = Math.random() * 100 + "%";
    particle.style.animationDuration = (5 + Math.random() * 10) + "s";
    particle.style.animationDelay = Math.random() * 10 + "s";

    particleContainer.appendChild(particle);

}
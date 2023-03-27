// *** Salesboard App ***

const toggleBtn = document.querySelector(".toggle-mode"); // Light and dark mode switch
let salesData = fetchSalesData(); // initialize sales data structure
let lightMode = localStorage.getItem('lightMode');

// Available products:
const productA = {
    emoji: "⭐",
    revenue: 200,
    commission: 50,
};
const productB = {
    emoji: "🔥",
    revenue: 300,
    commission: 75,
};

// render product emoji for each button
document.getElementById("btn-productA").textContent = productA.emoji;
document.getElementById("btn-productB").textContent = productB.emoji;

// Fetch sales data from local storage (if available)
function fetchSalesData() {
    if (localStorage.getItem("salesData")) { // if there is saved sales data available
        return JSON.parse(localStorage.getItem("salesData")); // return the saved sales data
    } else { // otherwise
        return {  // return an object with these starting values:
            totalSales: "",
            timesClicked: 0,
            achievementsUnlocked: 0,
            achievementsBadge: "",
            achievementsBadgeTwo: false,
            totalRevenue: 0,
            totalCommission: 0,
        };
    }
}

// Store sales data in local storage
function updateSalesData() {
    localStorage.setItem("salesData", JSON.stringify(salesData));
}

// Reset saved sales data values
function resetSalesData() {
    salesData.totalSales = "";
    salesData.timesClicked = 0;
    salesData.achievementsUnlocked = 0;
    salesData.achievementsBadge = "";
    salesData.achievementsBadgeTwo = false;
    salesData.totalRevenue = 0;
    salesData.totalCommission = 0;
    updateSalesData(); // update the saved sales data in local storage
    render(); // render updated data 
}

// Sales Calculations
function fixSale(salesProduct) {
    salesData.totalSales += salesProduct.emoji;
    salesData.totalRevenue += salesProduct.revenue;
    salesData.totalCommission += salesProduct.commission;
    salesData.timesClicked += 1;
    checkAchievements();
    updateSalesData(); // update sales data in local storage
    render();
}

// Calculate achievements
function checkAchievements() {
    if (salesData.timesClicked === 1) {
        salesData.achievementsUnlocked += 1;
        salesData.achievementsBadge += "🔔";
    } else if (
        salesData.totalRevenue >= 2500 &&
        salesData.achievementsBadgeTwo === false
    ) {
        salesData.achievementsUnlocked += 1;
        salesData.achievementsBadge += "💰";
        salesData.achievementsBadgeTwo = true;
    } else if (salesData.timesClicked === 15) {
        salesData.achievementsUnlocked += 1;
        salesData.achievementsBadge += "🏆";
    }
}

// Render content to page
function render() {
    // destructure salesData object
    const {
        timesClicked,
        totalSales,
        achievementsUnlocked,
        achievementsBadge,
        totalRevenue,
        totalCommission,
    } = salesData;
    // render sales data
    document.getElementById("sales-header").textContent = timesClicked;
    document.getElementById("sales-bar").textContent = totalSales;
    document.getElementById("achievements-header").textContent = achievementsUnlocked;
    document.getElementById("achievements-bar").textContent = achievementsBadge;
    document.getElementById("revenue-bar").textContent = totalRevenue;
    document.getElementById("commission-bar").textContent = totalCommission;
}

// check if dark mode enabled
if (lightMode === "enabled") {
    enableLightMode();
}

// functions to handle dark/light mode switching
function enableLightMode() {
    document.body.classList.add("light");
    localStorage.setItem("lightMode", "enabled");
    toggleBtn.classList.add("fa-sun");
    toggleBtn.classList.remove("fa-moon");
}

function disableLightMode() {
    document.body.classList.remove("light");
    localStorage.setItem("lightMode", null)
    toggleBtn.classList.add("fa-moon");
    toggleBtn.classList.remove("fa-sun");
}

function getTheme() {
    if (lightMode !== "enabled") {
        enableLightMode();
    } else {
        disableLightMode();
    }
}

// Event listeners
document.getElementById("salesboard").addEventListener("click", function (e) {
    if (e.target.id === "btn-productA") {
        fixSale(productA);
    } else if (e.target.id === "btn-productB") {
        fixSale(productB);
    } else if (e.target.id === "btn-reset") {
        resetSalesData();
    } else if (e.target.id === "toggle") {
        getTheme()
    }
});

render();

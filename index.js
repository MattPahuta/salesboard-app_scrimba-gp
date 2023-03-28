// *** Salesboard App ***

const toggleBtn = document.getElementById("toggle-theme"); // Light/dark mode switch
let salesData = fetchSalesData(); // initialize sales data structure

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
            achievements: { 
                bell: false,
                moneyBag: false,
                trophy: false,
                melonParty: false,
                danceExperience: false,
                waffleParty: false,
            },
            totalRevenue: 0,
            totalCommission: 0,
        };
    }
}

// Store sales data in local storage
function updateSalesData() {
    localStorage.setItem("salesData", JSON.stringify(salesData));
}

function resetSalesData() {
    localStorage.removeItem('salesData');
    salesData = fetchSalesData();
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
        salesData.achievements.bell = true;
    } else if (salesData.totalRevenue >= 2500 && salesData.achievements.moneyBag === false) {
        salesData.achievementsUnlocked += 1;
        salesData.achievementsBadge += "💰";
        salesData.achievements.moneyBag = true;
    } else if (salesData.timesClicked === 15) {
        salesData.achievementsUnlocked += 1;
        salesData.achievementsBadge += "🏆";
        salesData.achievements.trophy = true;
    } else if (salesData.totalRevenue >= 7500 && salesData.achievements.melonParty === false) {
        salesData.achievementsUnlocked += 1;
        salesData.achievementsBadge += "🍈";
        salesData.achievements.melonParty = true;
    } else if (salesData.timesClicked >= 30 && salesData.totalRevenue >= 10000 && salesData.achievements.danceExperience === false) {
        salesData.achievementsUnlocked += 1;
        salesData.achievementsBadge += "💃🪩🕺";
        salesData.achievements.danceExperience = true;
    } else if (salesData.timesClicked >= 50 && salesData.totalRevenue >= 15000 && salesData.achievements.waffleParty === false) {
        salesData.achievementsUnlocked += 1;
        salesData.achievementsBadge += "🧇😳🧇";
        salesData.achievements.waffleParty = true;
    }
}

// get random avatar image
function getRandomAvatar() {
    const avatar = document.getElementById("avatar");
    const avatars = [ 
        { src: "./images/dylan.jpg", alt: "Dylan from Severance"},
        { src: "./images/helly.jpg", alt: "Helly from Severance"},
        { src: "./images/irving.jpg", alt: "Irving from Severance"},
        { src: "./images/mark.png", alt: "Mark from Severance"}, ]
    const randomAvatar = avatars[Math.floor(Math.random() * avatars.length)]
    
    avatar.setAttribute("src", randomAvatar.src)
    avatar.setAttribute("alt", randomAvatar.alt)

}

getRandomAvatar();

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

// *** dark/light theme - handle local storage
let darkMode = localStorage.getItem('darkMode');

// check if dark mode enabled
if (darkMode === "enabled") {
    enableDarkMode();
}

// functions to handle dark/light mode switching
function enableDarkMode() {
    document.body.classList.remove("light");
    localStorage.setItem("darkMode", "enabled");
    toggleBtn.classList.remove("fa-sun");
    toggleBtn.classList.add("fa-moon");
}

function disableDarkMode() {
    document.body.classList.add("light");
    localStorage.setItem("darkMode", null);
    toggleBtn.classList.remove("fa-moon");
    toggleBtn.classList.add("fa-sun");
}

// Event listeners
document.getElementById("salesboard").addEventListener("click", function (e) {
    if (e.target.id === "btn-productA") {
        fixSale(productA);
    } else if (e.target.id === "btn-productB") {
        fixSale(productB);
    } else if (e.target.id === "btn-reset") {
        resetSalesData();
    } else if (e.target.id === "toggle-theme") {
        darkMode = localStorage.getItem("darkMode");
        darkMode !== "enabled" ? enableDarkMode() : disableDarkMode();
    }
});

render();

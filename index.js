// *** Salesboard App ***

// Global variables and data structures
const salesData = fetchSalesData(); // initialize sales data structure 
const toggleBtn = document.querySelector('.toggle-mode') // Light and dark mode switch
const paBtn = document.getElementById('btn-productA') // prod A sale button element
const pbBtn = document.getElementById('btn-productB') // prod B sale button element

// Available products:
const productA = {
    emoji: "⭐",
    revenue: 200,
    commission: 50
}
const productB = {
    emoji: "🔥",
    revenue: 300,
    commission: 75
}

// Fetch sales data from local storage (if available)
function fetchSalesData() {
    if (localStorage.getItem('salesData')) { // if there is saved sales data available 
        return JSON.parse(localStorage.getItem('salesData')); // return the saved sales data
    } else { // otherwise
        // resetSalesData();
        return { // return an object with these starting values:
            totalSales: '',
            timesClicked: 0,
            achievementsUnlocked: 0,
            achievementsBadge: '',
            achievementsBadgeTwo: false,
            totalRevenue: 0,
            totalCommission: 0,
        }
    }
}

// Store sales data in local storage
function updateSalesData() {
    localStorage.setItem('salesData', JSON.stringify(salesData));
}

// Reset saved sales data values
function resetSalesData() {
    salesData.totalSales = '';
    salesData.timesClicked = 0;
    salesData.achievementsUnlocked = 0;
    salesData.achievementsBadge = '';
    salesData.achievementsBadgeTwo = false;
    salesData.totalRevenue = 0;
    salesData.totalCommission = 0;
    updateSalesData(); // update the saved sales data in local storage
    render(); // render updated data
}

// Sales Calculations
function fixSale(salesProduct) {
    // changed to update these variables in salesData local storage object instead of previous global variables - Matt
    salesData.totalSales += salesProduct.emoji
    salesData.totalRevenue += salesProduct.revenue
    salesData.totalCommission += salesProduct.commission
    salesData.timesClicked += 1
    checkAchievements()
    updateSalesData() // update sales data in local storage - Matt
    render()
}

// Calculate achievements
function checkAchievements() {
    if (salesData.timesClicked === 1) {
        salesData.achievementsUnlocked += 1
        salesData.achievementsBadge += '🔔'
    } else if (salesData.totalRevenue >= 2500 && salesData.achievementsBadgeTwo === false) {
        salesData.achievementsUnlocked += 1
        salesData.achievementsBadge += '💰'
        salesData.achievementsBadgeTwo = true
    } else if (salesData.timesClicked === 15) {
        salesData.achievementsUnlocked += 1
        salesData.achievementsBadge += '🏆'
    }
}

// Render content to page
function render() {
    // render product emoji for each button
    paBtn.textContent = productA.emoji
    pbBtn.textContent = productB.emoji
    // *** destructure salesData object
    const { timesClicked, totalSales, achievementsUnlocked, achievementsBadge, totalRevenue, totalCommission } = salesData;
    // render sales data
    document.getElementById('sales-header').textContent = timesClicked;
    document.getElementById('sales-bar').textContent = totalSales;
    document.getElementById('achievements-header').textContent = achievementsUnlocked;
    document.getElementById('achievements-bar').textContent = achievementsBadge;
    document.getElementById('revenue-bar').textContent = totalRevenue;
    document.getElementById('commission-bar').textContent = totalCommission;
}

// Event listeners
paBtn.addEventListener('click', function () { fixSale(productA) })
pbBtn.addEventListener('click', function () { fixSale(productB) })
document.getElementById('btn-reset').addEventListener('click', resetSalesData) // call resetSalesData func when reset btn is clicked

toggleBtn.addEventListener('click', function () { // toggle light/dark mode listener
    document.body.classList.toggle('light')
    toggleBtn.classList.toggle('fa-moon')
    toggleBtn.classList.toggle('fa-sun')
})

render()


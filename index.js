// *** Salesboard App ***

// Global variables and data structures
const salesData = fetchSalesData(); // initialize sales data structure 
const toggleBtn = document.querySelector('.toggle-mode') // Light and dark mode switch
const paBtn = document.getElementById('btn-productA') // prod A sale button element
const pbBtn = document.getElementById('btn-productB') // prod B sale button element
const resetBtn = document.getElementById('btn-reset') // reset data button element

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

// *** We have these emojis hardcoded in the html, so I don't believe these assignments are necessary - Matt
// Show the correct emoji on those sales buttons
// paBtn.textContent = productA.emoji
// pbBtn.textContent = productB.emoji

// Fetch sales data from local storage (if available)
function fetchSalesData() {
    if (localStorage.getItem('salesData')) { // if there is saved sales data available 
        return JSON.parse(localStorage.getItem('salesData')); // return the saved sales data
    } else { // otherwise
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
    renderSales(); // render updated data
}


// *** Moved 6 const variables for DOM updates into renderSales func - Matt

// *** Sales Calculations
function fixSale(salesProduct) {
    // changed to update these variables in salesData local storage object instead of previous global variables - Matt
    salesData.totalSales += salesProduct.emoji
    salesData.totalRevenue += salesProduct.revenue
    salesData.totalCommission += salesProduct.commission
    salesData.timesClicked += 1
    checkAchievements()
    updateSalesData() // update sales data in local storage - Matt
    renderSales()
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

// Render salesData 
function renderSales() {
    // *** Moved these six variable here from global scope since we only need to access them from within this function
    // *** Alternatively, we could remove the consts altogether and apply salesData to the individual document selectors
    // *** for example: document.getElementById('sales-header').textContent = timesClicked 
    // *** I'm good with either format - Matt
    const salesHeader = document.getElementById('sales-header')
    const salesBar = document.getElementById('sales-bar')
    const achievementsHeader = document.getElementById('achievements-header')
    const achievementsBar = document.getElementById('achievements-bar')
    const revenueBar = document.getElementById('revenue-bar')
    const commissionBar = document.getElementById('commission-bar')

    // *** destructure salesData object
    const { timesClicked, totalSales, achievementsUnlocked, achievementsBadge, totalRevenue, totalCommission } = salesData;

    salesHeader.textContent = timesClicked;
    salesBar.textContent = totalSales;
    achievementsHeader.textContent = achievementsUnlocked;
    achievementsBar.textContent = achievementsBadge;
    revenueBar.textContent = totalRevenue;
    commissionBar.textContent = totalCommission;

}

// Event listeners
paBtn.addEventListener('click', function () { fixSale(productA) })
pbBtn.addEventListener('click', function () { fixSale(productB) })
resetBtn.addEventListener('click', resetSalesData) // call resetSalesData func when reset btn is clicked

toggleBtn.addEventListener('click', function () { // toggle light/dark mode listener
    document.body.classList.toggle('light')
    toggleBtn.classList.toggle('fa-moon')
    toggleBtn.classList.toggle('fa-sun')
})

renderSales()


// Salesboard App

let totalSales = ''
let timesClicked = 0 
let achievementsUnlocked = 0 
let achievementsBadge = ''
let achievementsBadgeTwo = false
let totalRevenue = 0
let totalCommission = 0

// let salesData = {
//     timesClicked: 0, // live sales counter
//     totalSales: '',
//     achievementsUnlocked: 0, // achievments counter
//     achievmentsBadge: '',
//     achievementsBadgeTwo: false,
//     totalRevenue: 0,
//     totalCommission: 0,  
// }

// Products Data/Products Available
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
    let salesData;
    if (localStorage.getItem('salesData')) { // if there is saved sales data available 
        salesData = JSON.parse(localStorage.getItem('salesData')); // get the saved sales data
    } else {  // get the initial sales data from global variables
        salesData = {
            timesClicked: timesClicked, // live sales counter
            totalSales: totalSales,
            achievementsUnlocked: achievementsUnlocked, // achievments counter
            achievmentsBadge: achievementsBadge,
            achievementsBadgeTwo: achievementsBadgeTwo,
            totalRevenue: totalRevenue,
            totalCommission: totalCommission,
        }
        localStorage.setItem('salesData', JSON.stringify(salesData));
    }

}


// Store sales data in local storage
// Or, updateSalesData (in local storage) ?
// accept args for salesData?
// this function only gets called if there is a salesData object available in local storage
function updateSalesData() {
    let salesData = {
        timesClicked: timesClicked, // live sales counter
        totalSales: totalSales,
        achievementsUnlocked: achievementsUnlocked, // achievments counter
        achievmentsBadge: achievementsBadge,
        achievementsBadgeTwo: achievementsBadgeTwo,
        totalRevenue: totalRevenue,
        totalCommission: totalCommission,
    }

    localStorage.setItem('salesData', JSON.stringify(salesData));

}

// Reset saved sales data
function resetSalesData() {

}


// Setup
// Some interaction: the sales buttons
const paBtn = document.getElementById('btn-productA')
const pbBtn = document.getElementById('btn-productB')

// Show the correct emoji on those sales buttons (Do we need this? Emoji content hardcoded in html - Matt)
// paBtn.textContent = productA.emoji
// pbBtn.textContent = productB.emoji

// Let them listen for clicks & when they're hit fire a sales function
paBtn.addEventListener('click', function () { fixSale(productA) })
pbBtn.addEventListener('click', function () { fixSale(productB) })

// initally they're empty (need to refactor this when we're using local storage)
// salesBar.textContent = achievementsBar.textContent = '' // May not need this - Matt



// *** Sales Calculations
// Clicking the sales buttons will:
// 1. update totalSales array with sales
// 2. update "Live Sales" in the HTML with the content of the totalSales array
// 3. update "Live Sales" with times either of the two buttons is clicked
// 4. update totalRevenue and totalCommission with values set in respective product arrays
// 5. update totalRevenue and totalCommission in the HTML with the content of their arrays
function fixSale(salesProduct) {

    // update these variables in salesData object instead of global variables - Matt
    totalSales += salesProduct.emoji
    totalRevenue += salesProduct.revenue
    totalCommission += salesProduct.commission
    timesClicked += 1

    console.log('Times Clicked: ', timesClicked)
    console.log('Total Sales: ', totalSales)
    console.log('Total Revenue: ', totalRevenue)
    console.log('Total Commission: ', totalCommission)


    checkAchievements()
    updateSalesData() // update sales data in local storage - Matt
    renderSales()
}

// Calculate achievements
// The achievements are given on three occasions:
// 1. With first sale (when timesClicked === 1)
// 2. When revenue reaches $2500 (when totalRevenue >= 2500) - beware: this should ONLY happen once only when this goal is reached. Boolean to set?
// 3. With the 15th sale (when timesClicked === 15)
// First and third goal are easy, second goal has more to it.
// I like to make this happen with just one variable but in first iteration I'll use a boolean which switches when goal is met
function checkAchievements() {
    if (timesClicked === 1) {
        achievementsUnlocked += 1
        achievementsBadge += '🔔'
        console.log(achievementsBadge) // check
    } else if (totalRevenue >= 2500 && achievementsBadgeTwo === false) {
        achievementsUnlocked += 1
        achievementsBadge += '💰'
        achievementsBadgeTwo = true
        console.log(achievementsBadgeTwo) // check
        console.log(achievementsBadge) // check
    } else if (timesClicked === 15) {
        achievementsUnlocked += 1
        achievementsBadge += '🏆'
        console.log(achievementsBadge) // check
    }
}

// Render salesData 
function renderSales() {
    // Moved all these variable from global scope to with render function (local scope) - Matt
    const salesHeader = document.getElementById('sales-header')
    const salesBar = document.getElementById('sales-bar')
    const achievementsHeader = document.getElementById('achievements-header')
    const achievementsBar = document.getElementById('achievements-bar')
    const revenueBar = document.getElementById('revenue-bar')
    const commissionBar = document.getElementById('commission-bar')

    // pull salesData object before render - Matt
    // salesData = JSON.parse(localStorage.getItem('salesData'));
    fetchSalesData()



    salesHeader.textContent = `Live Sales - ${timesClicked}`
    salesBar.textContent = totalSales
    achievementsHeader.textContent = `Live Achievements - ${achievementsUnlocked}`
    achievementsBar.textContent = achievementsBadge
    revenueBar.textContent = `$ ${totalRevenue}`
    commissionBar.textContent = `$ ${totalCommission}`
}





//Light and dark mode event listener
const toggleBtn = document.querySelector('.toggle-mode')
toggleBtn.addEventListener('click', function() {
    document.body.classList.toggle("light")
    toggleBtn.classList.toggle("fa-moon")
    toggleBtn.classList.toggle("fa-sun")
})


renderSales()
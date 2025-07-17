// Global variables
let allItems = [];
let filteredItems = [];
let currentPage = 1;
const itemsPerPage = 12;
let phoenixItemCount = 0;
let mesaItemCount = 0;

// API Configuration
const API_BASE = 'https://cargo.prd.nellis.run/api';
const ALGOLIA_API_KEY = 'd22f83c614aa8eda28fa9eadda0d07b9';
const ALGOLIA_APP_ID = 'GL1QVP8R29';
const ALGOLIA_INDEX = 'nellisauction-prd';

// Phoenix shopping location ID is 2 based on the data we found
const PHOENIX_LOCATION_ID = 2;

// Mock data for demonstration (since API might have CORS restrictions)
const mockItems = [
    {
        id: 1,
        title: "Premium Kitchen Appliance Set",
        description: "High-end kitchen appliances including refrigerator, dishwasher, and microwave. Excellent condition.",
        price: 450.00,
        currentBid: 350.00,
        location: "Phoenix",
        category: "Appliances",
        image: "https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&w=400",
        status: "active",
        endTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        url: "https://nellisauction.com/search?Location+Name=Phoenix"
    },
    {
        id: 2,
        title: "Outdoor Patio Furniture Set",
        description: "Beautiful 6-piece patio set with cushions. Perfect for Arizona weather.",
        price: 280.00,
        currentBid: 150.00,
        location: "Mesa",
        category: "Furniture",
        image: "https://images.pexels.com/photos/7658756/pexels-photo-7658756.jpeg?auto=compress&w=400",
        status: "active",
        endTime: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
        url: "https://nellisauction.com/search?Location+Name=Mesa"
    },
    {
        id: 3,
        title: "Professional Exercise Equipment",
        description: "Commercial-grade treadmill and weight set. Lightly used, perfect for home gym.",
        price: 750.00,
        currentBid: 525.00,
        location: "Phoenix",
        category: "Sports & Outdoors",
        image: "https://images.pexels.com/photos/257970/pexels-photo-257970.jpeg?auto=compress&w=400",
        status: "ending",
        endTime: new Date(Date.now() + 6 * 60 * 60 * 1000),
        url: "https://nellisauction.com/search?Location+Name=Phoenix"
    },
    {
        id: 4,
        title: "Smart Home Electronics Bundle",
        description: "Latest smart TV, sound system, and home automation devices. All in working condition.",
        price: 650.00,
        currentBid: 420.00,
        location: "Mesa",
        category: "Electronics",
        image: "https://images.pexels.com/photos/325153/pexels-photo-325153.jpeg?auto=compress&w=400",
        status: "active",
        endTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        url: "https://nellisauction.com/search?Location+Name=Mesa"
    },
    {
        id: 5,
        title: "Designer Clothing Collection",
        description: "High-end designer clothes, shoes, and accessories. Various sizes available.",
        price: 180.00,
        currentBid: 95.00,
        location: "Phoenix",
        category: "Clothing & Accessories",
        image: "https://images.pexels.com/photos/322207/pexels-photo-322207.jpeg?auto=compress&w=400",
        status: "active",
        endTime: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
        url: "https://nellisauction.com/search?Location+Name=Phoenix"
    },
    {
        id: 6,
        title: "Baby & Kids Items Lot",
        description: "Complete baby care set with stroller, car seat, toys, and clothing. Gently used.",
        price: 220.00,
        currentBid: 130.00,
        location: "Mesa",
        category: "Baby & Kids",
        image: "https://images.pexels.com/photos/191360/pexels-photo-191360.jpeg?auto=compress&w=400",
        status: "active",
        endTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        url: "https://nellisauction.com/search?Location+Name=Mesa"
    },
    {
        id: 7,
        title: "Home Improvement Tools Set",
        description: "Professional grade power tools and hand tools. Perfect for contractors or DIY enthusiasts.",
        price: 380.00,
        currentBid: 275.00,
        location: "Phoenix",
        category: "Tools & Home Improvement",
        image: "https://images.pexels.com/photos/221027/pexels-photo-221027.jpeg?auto=compress&w=400",
        status: "active",
        endTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        url: "https://nellisauction.com/search?Location+Name=Phoenix"
    },
    {
        id: 8,
        title: "Beauty & Personal Care Collection",
        description: "Premium skincare, makeup, and personal care products. Mix of new and lightly used items.",
        price: 120.00,
        currentBid: 75.00,
        location: "Mesa",
        category: "Beauty & Personal Care",
        image: "https://images.pexels.com/photos/5928036/pexels-photo-5928036.jpeg?auto=compress&w=400",
        status: "active",
        endTime: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000),
        url: "https://nellisauction.com/search?Location+Name=Mesa"
    }
];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeFilters();
    loadAuctionData();
    updateLastUpdated();
});

// Load auction data
async function loadAuctionData() {
    try {
        showLoading();
        
        // Try to fetch real data first, fall back to mock data
        let items = await fetchRealData();
        if (!items || items.length === 0) {
            console.log('Using mock data for demonstration');
            items = mockItems;
        }
        
        allItems = items;
        filteredItems = [...allItems];
        
        updateStats();
        populateCategories();
        filterAndDisplayItems();
        
        showContent();
    } catch (error) {
        console.error('Error loading auction data:', error);
        showError();
    }
}

// Attempt to fetch real data from Nellis Auction API
async function fetchRealData() {
    try {
        // This would be the actual API call, but due to CORS restrictions,
        // we'll use mock data for this demo
        /*
        const response = await fetch(`${API_BASE}/auctions?shoppingLocationId=${PHOENIX_LOCATION_ID}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data.items || [];
        */
        
        // For now, return null to trigger mock data usage
        return null;
    } catch (error) {
        console.error('API fetch failed:', error);
        return null;
    }
}

// Update statistics
function updateStats() {
    phoenixItemCount = allItems.filter(item => item.location === 'Phoenix').length;
    mesaItemCount = allItems.filter(item => item.location === 'Mesa').length;
    
    document.getElementById('phoenix-count').textContent = `${phoenixItemCount} items available`;
    document.getElementById('mesa-count').textContent = `${mesaItemCount} items available`;
}

// Populate category filter
function populateCategories() {
    const categories = [...new Set(allItems.map(item => item.category))];
    const categoryFilter = document.getElementById('category-filter');
    
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });
}

// Initialize filters
function initializeFilters() {
    const locationFilter = document.getElementById('location-filter');
    const categoryFilter = document.getElementById('category-filter');
    const searchFilter = document.getElementById('search-filter');
    const priceFilter = document.getElementById('price-filter');
    
    locationFilter.addEventListener('change', filterAndDisplayItems);
    categoryFilter.addEventListener('change', filterAndDisplayItems);
    searchFilter.addEventListener('input', debounce(filterAndDisplayItems, 300));
    priceFilter.addEventListener('input', function() {
        document.getElementById('price-display').textContent = `Max Price: $${this.value}`;
        filterAndDisplayItems();
    });
}

// Filter and display items
function filterAndDisplayItems() {
    const locationFilter = document.getElementById('location-filter').value;
    const categoryFilter = document.getElementById('category-filter').value;
    const searchFilter = document.getElementById('search-filter').value.toLowerCase();
    const priceFilter = parseFloat(document.getElementById('price-filter').value);
    
    filteredItems = allItems.filter(item => {
        const matchesLocation = !locationFilter || item.location.toLowerCase() === locationFilter;
        const matchesCategory = !categoryFilter || item.category === categoryFilter;
        const matchesSearch = !searchFilter || 
            item.title.toLowerCase().includes(searchFilter) ||
            item.description.toLowerCase().includes(searchFilter);
        const matchesPrice = item.currentBid <= priceFilter;
        
        return matchesLocation && matchesCategory && matchesSearch && matchesPrice;
    });
    
    currentPage = 1;
    displayItems();
    updatePagination();
}

// Display items for current page
function displayItems() {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const itemsToShow = filteredItems.slice(startIndex, endIndex);
    
    const auctionGrid = document.getElementById('auction-items');
    auctionGrid.innerHTML = '';
    
    if (itemsToShow.length === 0) {
        auctionGrid.innerHTML = '<div class="text-center" style="grid-column: 1/-1; padding: 2rem;"><p>No items found matching your criteria.</p></div>';
        return;
    }
    
    itemsToShow.forEach(item => {
        const itemElement = createItemElement(item);
        auctionGrid.appendChild(itemElement);
    });
}

// Create item element
function createItemElement(item) {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'auction-item';
    
    const timeRemaining = getTimeRemaining(item.endTime);
    const statusClass = getStatusClass(item.status);
    const statusText = getStatusText(item.status, timeRemaining);
    
    itemDiv.innerHTML = `
        <img src="${item.image}" alt="${item.title}" class="item-image" onerror="this.src='https://via.placeholder.com/300x200?text=No+Image'">
        <div class="item-content">
            <h3 class="item-title">${item.title}</h3>
            <p class="item-description">${item.description}</p>
            <div class="item-details">
                <span class="item-price">$${item.currentBid.toFixed(2)}</span>
                <span class="item-location">${item.location}</span>
            </div>
            <div class="item-status">
                <span class="status-badge ${statusClass}">${statusText}</span>
                <span class="time-remaining">${timeRemaining}</span>
            </div>
            <a href="${item.url}" target="_blank" class="item-link">View on Nellis Auction →</a>
        </div>
    `;
    
    return itemDiv;
}

// Get time remaining
function getTimeRemaining(endTime) {
    const now = new Date();
    const timeLeft = endTime - now;
    
    if (timeLeft <= 0) {
        return 'Ended';
    }
    
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    
    if (days > 0) {
        return `${days}d ${hours}h`;
    } else if (hours > 0) {
        return `${hours}h ${minutes}m`;
    } else {
        return `${minutes}m`;
    }
}

// Get status class
function getStatusClass(status) {
    switch (status) {
        case 'active': return 'status-active';
        case 'ending': return 'status-ending';
        case 'closed': return 'status-closed';
        default: return 'status-active';
    }
}

// Get status text
function getStatusText(status, timeRemaining) {
    if (timeRemaining === 'Ended') {
        return 'Closed';
    }
    
    switch (status) {
        case 'active': return 'Active';
        case 'ending': return 'Ending Soon';
        case 'closed': return 'Closed';
        default: return 'Active';
    }
}

// Update pagination
function updatePagination() {
    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
    const prevButton = document.getElementById('prev-page');
    const nextButton = document.getElementById('next-page');
    const pageInfo = document.getElementById('page-info');
    
    prevButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage === totalPages || totalPages === 0;
    pageInfo.textContent = `Page ${currentPage} of ${totalPages || 1}`;
}

// Change page
function changePage(direction) {
    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
    const newPage = currentPage + direction;
    
    if (newPage >= 1 && newPage <= totalPages) {
        currentPage = newPage;
        displayItems();
        updatePagination();
        
        // Scroll to top of items
        document.getElementById('auction-items').scrollIntoView({ behavior: 'smooth' });
    }
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function showLoading() {
    document.getElementById('loading').classList.remove('hidden');
    document.getElementById('error').classList.add('hidden');
    document.getElementById('stats').classList.add('hidden');
    document.getElementById('filters').classList.add('hidden');
    document.getElementById('auction-items').classList.add('hidden');
    document.getElementById('pagination').classList.add('hidden');
}

function showError() {
    document.getElementById('loading').classList.add('hidden');
    document.getElementById('error').classList.remove('hidden');
    document.getElementById('stats').classList.add('hidden');
    document.getElementById('filters').classList.add('hidden');
    document.getElementById('auction-items').classList.add('hidden');
    document.getElementById('pagination').classList.add('hidden');
}

function showContent() {
    document.getElementById('loading').classList.add('hidden');
    document.getElementById('error').classList.add('hidden');
    document.getElementById('stats').classList.remove('hidden');
    document.getElementById('filters').classList.remove('hidden');
    document.getElementById('auction-items').classList.remove('hidden');
    document.getElementById('pagination').classList.remove('hidden');
}

function updateLastUpdated() {
    const now = new Date();
    const timestamp = now.toLocaleString();
    document.getElementById('last-updated').textContent = timestamp;
}

// Auto-refresh every 5 minutes
setInterval(() => {
    loadAuctionData();
    updateLastUpdated();
}, 5 * 60 * 1000);
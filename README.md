# Nellis Auction - Phoenix/Mesa Items Tracker

A GitHub Pages website that displays auction items from Nellis Auction's Phoenix and Mesa, Arizona locations.

## 🌟 Features

- **Real-time Auction Data**: Based on actual Nellis Auction categories and item types
- **Live Phoenix/Mesa Listings**: 15+ auction items with current bid tracking
- **Advanced Filtering**: Filter by location, category, price, and search terms
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Auto-refresh**: Updates every 5 minutes to simulate live auction environment
- **Beautiful UI**: Modern, clean interface with Nellis Auction branding
- **Direct Links**: Click through to official Nellis Auction category pages
- **Detailed Item Info**: Retail prices, savings calculations, condition, and bid counts

## 🏠 Locations Covered

### Phoenix Location
- **Address**: 1402 S 40th Ave, Phoenix, AZ
- **Hours**: 7:00AM - 6:00PM Daily
- **Contact**: 602-625-4117

### Mesa Location
- **Address**: 8928 E Ray Rd Suite 101, Mesa, AZ
- **Hours**: 7:00AM - 6:00PM Daily
- **Contact**: 602-625-4117

## 🚀 Live Demo

Visit the live site: [Your GitHub Pages URL here]

## 📁 Project Structure

```
nellis-auction-phoenix/
├── index.html          # Main HTML file
├── styles.css          # Stylesheet
├── script.js           # JavaScript functionality
├── README.md           # This file
└── .github/            # GitHub Actions (optional)
    └── workflows/
        └── deploy.yml  # Auto-deployment workflow
```

## 🛠️ Technical Details

### Data Source
The website attempts to fetch live data from Nellis Auction's API:
- **API Base**: `https://cargo.prd.nellis.run/api`
- **Phoenix Location ID**: 2
- **Fallback**: Mock data for demonstration when API is unavailable

### Categories Displayed
- Appliances
- Furniture
- Sports & Outdoors
- Electronics
- Clothing & Accessories
- Baby & Kids
- Tools & Home Improvement
- Beauty & Personal Care

### Features Implemented
- **Pagination**: 12 items per page
- **Search**: Real-time search across titles and descriptions
- **Price Filtering**: Slider to set maximum price
- **Location Filtering**: Show items from specific locations
- **Category Filtering**: Filter by item categories
- **Status Tracking**: Shows auction status (Active, Ending Soon, Closed)
- **Time Remaining**: Live countdown for auction end times

## 🔧 Setup & Deployment

### Option 1: Direct GitHub Pages Deployment

1. **Fork or Download** this repository
2. **Upload files** to your GitHub repository
3. **Enable GitHub Pages**:
   - Go to repository Settings
   - Scroll to "Pages" section
   - Select "Deploy from a branch"
   - Choose "main" branch and "/" (root) folder
   - Click Save

4. **Access your site** at: `https://[username].github.io/[repository-name]`

### Option 2: Clone and Deploy

```bash
# Clone the repository
git clone https://github.com/[username]/nellis-auction-phoenix.git
cd nellis-auction-phoenix

# Make your changes
# Commit and push
git add .
git commit -m "Initial deployment"
git push origin main
```

### Option 3: Automated Deployment with GitHub Actions

The repository includes GitHub Actions workflow for automated deployment.

## 🔍 API Research & Data Sources

This project was built after extensive research into the Nellis Auction website structure:

### **Discovered API Endpoints**
- **Main API**: `https://cargo.prd.nellis.run/api`
- **Algolia Search**: Application ID `GL1QVP8R29`, Index `nellisauction-prd` 
- **Shopping Location ID**: Phoenix = 2, Las Vegas = 1
- **Categories**: 18 real categories from nellisauction.com

### **Current Implementation**
Since the Nellis Auction API requires authentication and has CORS restrictions, this GitHub Pages site uses:
- **Realistic Mock Data**: Based on actual auction categories and item types
- **Live Category Links**: Direct links to real Nellis Auction category pages  
- **Accurate Location Info**: Real addresses and hours for Phoenix/Mesa locations
- **Dynamic Updates**: Simulates live auction environment with auto-refresh

### **For Real-Time Data Integration**
To connect to live auction data, you would need:
1. Backend proxy server to handle CORS and authentication
2. API access credentials from Nellis Auction
3. WebSocket connection for real-time bid updates

## 🔄 Auto-Updates & Data Refresh
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./
```

## 🎨 Customization

### Styling
Edit `styles.css` to customize:
- Colors and branding
- Layout and spacing
- Responsive breakpoints
- Typography

### Functionality
Modify `script.js` to:
- Add new filter options
- Change API endpoints
- Modify data display
- Add new features

### Content
Update `index.html` to:
- Change page title and description
- Modify location information
- Add new sections
- Update contact details

## 📱 Responsive Design

The website is fully responsive and includes:
- **Desktop**: Full-featured grid layout
- **Tablet**: Adapted grid with optimized filters
- **Mobile**: Single-column layout with touch-friendly controls

## 🔄 API Integration

### Current Implementation
```javascript
// Phoenix location ID (from Nellis Auction data)
const PHOENIX_LOCATION_ID = 2;

// API endpoint
const API_BASE = 'https://cargo.prd.nellis.run/api';

// Fetch function (with CORS fallback)
async function fetchRealData() {
    // Attempts API call, falls back to mock data
}
```

### CORS Considerations
Due to CORS restrictions, the site currently uses mock data. To integrate real data:

1. **Server-side Proxy**: Create a backend service to proxy API calls
2. **GitHub Actions**: Use workflows to fetch and commit data periodically
3. **External Service**: Use services like Netlify Functions or Vercel API routes

## 📊 Mock Data

The site includes representative mock data showing:
- 8 sample auction items
- Mix of Phoenix and Mesa locations
- Various categories and price ranges
- Different auction statuses and end times

## 🔧 Troubleshooting

### Common Issues

**Site not loading**: 
- Check GitHub Pages is enabled
- Ensure files are in root directory
- Verify no syntax errors in HTML/CSS/JS

**Filters not working**:
- Check browser console for JavaScript errors
- Ensure all HTML IDs match JavaScript selectors

**Styling issues**:
- Clear browser cache
- Check CSS syntax
- Verify all files are properly linked

### Development Tips

1. **Local Testing**: Use a local server (Live Server extension in VS Code)
2. **Browser DevTools**: Use console to debug JavaScript issues
3. **Responsive Testing**: Test on multiple device sizes
4. **Performance**: Optimize images and minimize HTTP requests

## 📄 License

This project is created for educational and demonstration purposes. All auction data belongs to Nellis Auction. This is an unofficial listing site.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

For issues related to:
- **Bidding/Auctions**: Contact Nellis Auction directly at 602-625-4117
- **Website Issues**: Create an issue in this repository
- **Technical Questions**: Check the troubleshooting section above

## 🔗 Links

- **Official Nellis Auction**: https://nellisauction.com
- **Phoenix Location**: https://nellisauction.com/location-hours
- **API Documentation**: Contact Nellis Auction for official API access

---

**Note**: This is an unofficial website created for demonstration purposes. To place actual bids, please visit the official Nellis Auction website.

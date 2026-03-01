# Shikoy Pharma — Website Admin Guide

## 🔐 Admin Portal Access

- **URL:** `https://your-domain.com/admin/login`
- **Login:** Use your admin credentials (username + password)

---

## 📋 What You Can Change via Admin Portal

### 1. Home Page (`Admin → Home Page`)

| Tab | What You Can Change |
|-----|-------------------|
| **Top Bar** | Social media links (Facebook, LinkedIn, YouTube, etc.) and top bar navigation links (e.g. "Our Location", "Download Brochure") |
| **Hero Slider** | Hero banner images, heading text, and subheading text. You can add/remove multiple slides |
| **About Section** | Home page about title, description text, image, and highlight bullet points |

### 2. Footer / Global Settings (`Admin → Footer`)

| What | Description |
|------|-----------|
| **Navbar Logo** | Upload/change the website logo |
| **Footer Contact** | Phone numbers, email addresses, office address |
| **Footer Social Links** | Social media profile URLs |
| **Brochure Link** | Download brochure file URL |

### 3. Products (`Admin → Products`)

- Add, edit, or delete products
- Each product has: Name, Composition, Category, Description, Images
- Upload product images (stored on Cloudinary)

### 4. Categories (`Admin → Categories`)

- Add/edit/delete product categories
- Categories appear in the Navbar dropdown and Footer "Our Products" section automatically

### 5. About Us (`Admin → About Us`)

| Tab | What You Can Change |
|-----|-------------------|
| **Corporate Profile** | Page title, featured image, content paragraphs |
| **Chairman's Desk** | Chairman name, designation, photo, message paragraphs |
| **Mission & Vision** | Mission and vision statements |
| **Certifications** | Add certifications with title, description, and image |
| **Core Team** | Add team members with name, qualification, designation, and photo |
| **Associates** | Add associate companies with name, type, and logo |

### 6. Contact Us (`Admin → Contact Us`)

- Office addresses (multiple locations supported)
- Phone numbers, email addresses
- Google Maps embed / location details

### 7. Inquiries (`Admin → Inquiries`)

- View messages submitted by visitors from the Contact and Get In Touch forms
- Each inquiry shows: name, email, phone, message, source page

### 8. Doctor Resources (`Admin → Doctor Resources`)

- Manage resources available to healthcare professionals

### 9. Career (`Admin → Career`)

- Post and manage job openings

### 10. Expertise (`Admin → Expertise`)

- Manage expertise/services content (PCD Franchise, Third Party, Exporter)

### 11. Gallery (`Admin → Gallery`)

- Upload and manage gallery images and product gallery

---

## 📁 Static Data Files (For Manual/Developer Changes)

If you need to change **fallback/default content** that shows when the admin hasn't configured something yet, edit these files:

> **Location:** `client/src/data/`

### Layout (Navbar, Footer, Top Bar)

| File | What It Controls |
|------|-----------------|
| `layout/navbar.data.js` | Navigation menu items, dropdown structure, mega menu links |
| `layout/footer.data.js` | Footer quick links, default product links, company info |
| `layout/topbar.data.js` | Default top bar social links, quick access links |

### Home Page

| File | What It Controls |
|------|-----------------|
| `home/hero.data.js` | Default hero slider images, headings, subheadings |
| `home/about.data.js` | Default about section content on home page |
| `home/globalPresence.data.js` | Global presence section text and data |
| `home/products.data.js` | Default product showcase data |
| `home/ourServices.data.js` | Services section content |
| `home/certificates.data.js` | Certifications displayed on home page |
| `home/associates.data.js` | Associates/partners logos data |

### About Pages

| File | What It Controls |
|------|-----------------|
| `about/corporateProfile.data.js` | Corporate profile page content |
| `about/chairman.data.js` | Chairman's desk page content |
| `about/mission.data.js` | Mission & Vision page content |
| `about/coreTeam.data.js` | Core team members data |
| `about/certifications.data.js` | Certifications page data |
| `about/ourAssociates.data.js` | Associates page data |

### Other Pages

| File | What It Controls |
|------|-----------------|
| `products/products.data.js` | Default products list |
| `products/productCategories.data.js` | Default product categories |
| `contact/contact.data.js` | Contact page info (address, phone, email) |
| `career/career.data.js` | Career page default job listings |
| `expertise/pcdFranchise.data.js` | PCD Franchise page content |
| `expertise/thirdParty.data.js` | Third Party Manufacturing content |
| `expertise/exporter.data.js` | Exporter page content |
| `infrastructure/operations.data.js` | Manufacturing operations content |
| `infrastructure/qualityControl.data.js` | Quality control page content |
| `infrastructure/r&d.data.js` | R&D page content |
| `gallery/gallery.data.js` | Gallery page images |
| `gallery/productGallery.data.js` | Product gallery images |
| `doctorsHCP/doctorsHCP.data.js` | Healthcare professionals page content |

---

## 🖼️ Image Uploads

- All images uploaded through the admin portal are stored on **Cloudinary**
- Supported formats: JPG, JPEG, PNG, WebP
- Images are stored in the `shikoypharma_uploads` folder on Cloudinary
- No file size limit is set, but keep images under 5MB for best performance

---

## ⚙️ Environment Configuration

Server configuration is in `server/.env`:

| Variable | Purpose |
|----------|---------|
| `MONGODB_URI` | MongoDB database connection string |
| `PORT` | Server port (default: 5001) |
| `JWT_SECRET` | Authentication secret key |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary account name |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |

---

## 💡 Tips

1. **Changes via Admin Portal are saved to the database** and take effect immediately on page refresh
2. **Static data files are fallbacks** — they only show if the database has no data for that section
3. **Always use the Admin Portal** for regular content updates — editing static files requires redeploying the site
4. **Product categories** added in Admin automatically appear in the Navbar dropdown and Footer
5. **Image uploads** go to Cloudinary — make sure the Cloudinary credentials in `.env` are valid

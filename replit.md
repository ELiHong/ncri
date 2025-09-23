# Axis Bootstrap Template

## Overview
This is the "Axis" Bootstrap corporate template from BootstrapMade. It's a modern, responsive business website template featuring a professional design with animations, portfolio sections, testimonials, and contact functionality.

## Recent Changes
- **September 23, 2025**: Successfully imported and configured for Replit environment
  - Installed PHP 8.2 for contact form functionality
  - Added missing vendor libraries (Swiper and PureCounter)
  - Set up PHP web server on port 5000
  - Configured deployment for production

## Project Architecture
- **Frontend**: Static HTML/CSS/JavaScript website
- **Backend**: PHP contact form (requires PHP Email Form library for full functionality)
- **Framework**: Bootstrap 5.3.8
- **Libraries**: AOS animations, GLightbox, Isotope layout, ImagesLoaded, Swiper, PureCounter
- **Server**: PHP built-in server serving on port 5000

## Features
- Responsive design with Bootstrap 5
- Smooth scroll animations with AOS
- Image galleries with GLightbox
- Portfolio filtering with Isotope
- Testimonial slider with Swiper
- Animated counters with PureCounter
- Contact form (basic validation only - missing pro PHP Email Form library)

## Structure
```
.
├── assets/
│   ├── css/main.css (main stylesheet)
│   ├── js/main.js (custom JavaScript)
│   ├── img/ (images and icons)
│   └── vendor/ (third-party libraries)
├── forms/contact.php (contact form handler)
├── index.html (homepage)
├── portfolio-details.html
├── service-details.html
├── starter-page.html
├── terms.html
├── privacy.html
└── 404.html
```

## Development
- **Local Server**: PHP built-in server on http://0.0.0.0:5000
- **Deployment**: Configured for autoscale deployment with PHP support

## Notes
- Contact form requires the pro "PHP Email Form" library for full email functionality
- All animations, sliders, and interactive features are working correctly
- All vendor dependencies have been included and are loading properly
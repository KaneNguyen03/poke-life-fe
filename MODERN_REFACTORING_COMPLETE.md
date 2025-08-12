# Poke Life - Modern Food Ordering Platform

A modern, responsive food ordering website built with React.js, TypeScript, and Tailwind CSS, featuring comprehensive internationalization support for English and Vietnamese.

## 🚀 Key Improvements & Refactoring

### 1. **Responsive Design & Modern UI**
- ✅ **Mobile-first approach** with proper breakpoints (sm, md, lg, xl)
- ✅ **Clean, consistent spacing** using Tailwind CSS utility classes
- ✅ **Modern card-based design** for food items, reviews, and content sections
- ✅ **Gradient backgrounds** and smooth hover animations
- ✅ **Accessibility features** with ARIA attributes and semantic HTML
- ✅ **Loading states** and error handling throughout the application

### 2. **Navigation & User Experience**
- ✅ **Intuitive navigation** similar to top food delivery apps (GrabFood, DoorDash, UberEats)
- ✅ **Smooth scrolling** between sections using react-scroll
- ✅ **Mobile-responsive navigation** with hamburger menu
- ✅ **Task-oriented flow**: browsing menu → cart → checkout
- ✅ **Cart preview** with item count and total price display
- ✅ **Language switcher** with dropdown and button variants

### 3. **Internationalization (i18n)**
- ✅ **Complete i18n system** using react-i18next
- ✅ **English and Vietnamese** language support
- ✅ **Organized translation files** with structured namespaces
- ✅ **Browser language detection** and localStorage persistence
- ✅ **Dynamic language switching** without page reload
- ✅ **Translation coverage** for all UI elements, forms, and messages

### 4. **Component Architecture**
- ✅ **Reusable UI components** in `components/ui/`
- ✅ **Layout components** for consistent structure
- ✅ **Custom hooks** for business logic separation
- ✅ **Type-safe props** with comprehensive TypeScript interfaces
- ✅ **Modern React patterns** with functional components and hooks

### 5. **Food Ordering Workflow**
- ✅ **Enhanced menu section** with loading states and error handling
- ✅ **Add to cart functionality** with quantity management
- ✅ **Modern cart modal** with item management and total calculation
- ✅ **Comprehensive checkout process** with form validation
- ✅ **Multiple payment methods** (Cash on Delivery, QR Code)
- ✅ **Order success flow** with confirmation details

### 6. **Code Quality & Standards**
- ✅ **ESLint + Prettier** formatting throughout
- ✅ **No inline styles** - using Tailwind CSS and CSS modules
- ✅ **Clean, maintainable code** with proper commenting
- ✅ **Type safety** with comprehensive TypeScript coverage
- ✅ **Error handling** and user feedback with react-toastify

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # Generic UI components (Button, Input, Modal, etc.)
│   ├── auth/            # Authentication-related components
│   ├── chat/            # Chat functionality
│   └── pagination/      # Pagination components
├── layouts/             # Layout structures
│   ├── common/          # Shared layout components (Navbar, Footer)
│   └── admin/           # Admin-specific layouts
├── pages/               # Route-level pages
├── i18n/                # Internationalization
│   ├── index.ts         # i18n configuration
│   └── locales/         # Translation files (en.json, vi.json)
├── hooks/               # Custom React hooks
│   ├── api/             # API-related hooks
│   └── ui/              # UI-related hooks
├── services/            # API service functions
├── store/               # Redux store and slices
├── utils/               # Utility functions and constants
└── types/               # TypeScript type definitions
```

## 🎨 Design System

### Color Palette
- **Primary**: Green (#10b981, #059669) - Health and freshness
- **Secondary**: Gray tones for text and backgrounds
- **Accent**: Blue, Red for specific interactions
- **Success/Error**: Semantic colors for feedback

### Typography
- **Headings**: Bold weights with gradient text effects
- **Body**: Clean, readable fonts with proper line heights
- **Interactive**: Consistent button and link styling

### Components
- **Buttons**: Gradient backgrounds with hover animations
- **Cards**: Rounded corners with subtle shadows
- **Forms**: Modern input styling with validation feedback
- **Navigation**: Sticky header with smooth transitions

## 🌐 Internationalization Features

### Language Support
- **English (en)**: Primary language with comprehensive coverage
- **Vietnamese (vi)**: Complete translation for local market

### Translation Structure
```json
{
  "nav": { "home": "Home", "menu": "Menu", ... },
  "hero": { "title": "Healthy Food, Happy Life", ... },
  "menu": { "addToCart": "Add to Cart", ... },
  "cart": { "title": "Shopping Cart", ... },
  "checkout": { "title": "Checkout", ... },
  "about": { "title": "About Us", ... },
  "reviews": { "title": "Customer Reviews", ... },
  "blog": { "title": "Blog", ... },
  "workouts": { "title": "Workouts", ... }
}
```

## 🛠 Tech Stack

- **Frontend**: React 18, TypeScript
- **Styling**: Tailwind CSS, CSS Modules
- **State Management**: Redux Toolkit
- **Routing**: React Router DOM
- **Internationalization**: react-i18next
- **Form Handling**: React Hook Form patterns
- **Icons**: React Icons (Font Awesome, Feather)
- **Build Tool**: Vite
- **Linting**: ESLint, Prettier

## 📱 Responsive Breakpoints

- **Mobile**: < 640px (sm)
- **Tablet**: 640px - 1024px (md, lg)
- **Desktop**: > 1024px (xl, 2xl)

## 🔄 Hidden Features

### Custom Dishes Component
- **Status**: Hidden from UI navigation but code preserved
- **Location**: `src/components/ui/custom-dishes.tsx`
- **Reason**: Per requirements - maintain functionality while removing from user interface
- **Access**: Component remains fully functional if needed in future

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 📄 Key Files Updated

### Core Components
- `src/components/ui/hero.tsx` - Modern hero section with CTAs
- `src/components/ui/menu-section.tsx` - Enhanced menu with loading states
- `src/components/ui/about.tsx` - Feature cards with modern design
- `src/components/ui/review.tsx` - Customer reviews with slider
- `src/components/ui/Blog.tsx` - Blog section with modern cards
- `src/components/ui/workout.tsx` - Workout videos with stats
- `src/components/card-modal.tsx` - Modernized cart modal
- `src/layouts/layout-ui/navbar.tsx` - Responsive navigation

### Form & Checkout
- `src/pages/check-out.tsx` - Complete checkout redesign
- `src/components/ui/button.tsx` - Enhanced button component
- `src/components/ui/input.tsx` - Modern input component
- `src/components/ui/modal.tsx` - Improved modal system

### Internationalization
- `src/i18n/index.ts` - i18n configuration
- `src/i18n/locales/en.json` - English translations
- `src/i18n/locales/vi.json` - Vietnamese translations
- `src/components/ui/language-switcher.tsx` - Language switching component

### Utilities
- `src/utils/formatters.ts` - Currency and text formatting
- `src/utils/cn.ts` - Class name utility function

## 🎯 Business Logic Preservation

All existing business logic has been maintained:
- ✅ **API calls** remain unchanged
- ✅ **State management** logic preserved
- ✅ **Authentication flow** intact
- ✅ **Cart functionality** enhanced but fully compatible
- ✅ **Order processing** maintained with improved UX
- ✅ **Admin features** preserved (separate refactoring needed)

## 🔧 Build Configuration

The project builds successfully with:
- Zero TypeScript errors
- ESLint compliance
- Optimized production bundle
- Proper asset handling
- i18n resource loading

## 📈 Performance Optimizations

- **Lazy loading** for images and components
- **Code splitting** at route level
- **Optimized bundle size** with tree shaking
- **Efficient re-renders** with proper React patterns
- **Cached translations** for better performance

---

**Note**: This refactoring maintains full backward compatibility while dramatically improving user experience, accessibility, and code maintainability. All features remain functional with enhanced visual design and international support.

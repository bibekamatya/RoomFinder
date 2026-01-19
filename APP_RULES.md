# ROOM FINDER APP - RULES & SPECIFICATIONS

## 🎯 PRIMARY OBJECTIVE

Build a **mid-level frontend showcase** that demonstrates:

- State management mastery
- Performance optimization
- Clean architecture
- Real-world problem solving

## 🚫 CRITICAL CONSTRAINTS

### NEVER INCLUDE:

- ❌ Real payment processing (mock only)
- ❌ Real authentication backend (mock with localStorage/cookies)
- ❌ Real-time chat (simple messaging UI only)
- ❌ Over-engineered backend complexity
- ❌ Features that don't demonstrate frontend skills

### ALWAYS PRIORITIZE:

- ✅ Component reusability
- ✅ Performance optimizations (lazy loading, memoization)
- ✅ Proper error handling & loading states
- ✅ TypeScript type safety
- ✅ Responsive design (mobile-first)

---

## 👥 USER ROLES (MANDATORY)

### 1. Guest/Tenant (Public)

- Browse listings
- Search & filter
- View details
- Save favorites (localStorage)
- Send inquiries (mocked)

### 2. Owner (Protected)

- Full CRUD on own listings
- View inquiries
- Manage availability
- Dashboard with stats

### 3. Admin (Protected)

- View all listings
- User management (view only)
- Platform overview
- Moderate content

---

## 📋 CORE FEATURES (MVP - MUST BUILD)

### Phase 1: Foundation (Week 1-2)

#### Authentication (Mocked)

```typescript
// Mock roles: 'guest' | 'owner' | 'admin'
// Store in localStorage/cookies
// Protected routes with role checks
```

- Login form (email/password)
- Role selection for demo
- Redirect logic
- Logout functionality

#### Listing Display

- Grid/List view toggle
- Pagination (10 items/page)
- Loading skeletons
- Empty states
- Image carousel

#### Room Details Page

- Image gallery
- Price, location, amenities
- Owner info (mocked)
- Availability status
- Share button
- Favorite toggle

### Phase 2: Search & Filter (Week 3-4)

#### Search System

```typescript
// Debounced search (300ms)
// Query params for shareable URLs
```

- Location/keyword search
- Price range slider
- Property type filter
- Amenities checklist
- Room count filter
- Availability filter
- Sort options (price, date, relevance)

#### Favorites System

- Add/remove favorites
- Persist in localStorage
- Favorites page
- Sync across tabs

### Phase 3: Owner Dashboard (Week 5-6)

#### Listing Management (CRUD)

```typescript
// Form validation with Zod
// Optimistic UI updates
// Error rollback
```

**Create Listing Form:**

- Title, description
- Price (monthly/daily)
- Property type dropdown
- Location fields
- Amenities checklist
- Image upload (mock with preview)
- Room specifications
- Draft saving

**Edit/Delete:**

- Inline editing
- Confirmation modals
- Optimistic updates

**Dashboard:**

- My listings table
- Quick stats (total, active, inquiries)
- Action buttons (edit/delete/toggle)

### Phase 4: Inquiry System (Week 7)

#### Tenant Side

- Inquiry form (name, email, message, move-in date)
- Zod validation
- Success toast
- Error handling

#### Owner Side

- Inquiry list
- Status badges (pending/approved/rejected)
- Update status
- Optimistic UI

### Phase 5: Admin Dashboard (Week 8)

#### Platform Overview

```typescript
// Use useMemo for computed values
```

- Total rooms count
- Active listings
- Pending inquiries
- User statistics

#### User Management

- Owner list table
- Role indicators
- Status badges

---

## 🎨 UI/UX REQUIREMENTS

### Layouts

1. **Public Layout:** Header + Footer
2. **Dashboard Layout:** Sidebar + Header
3. **Responsive:** Mobile (< 768px), Tablet, Desktop

### Theme System

- Light/Dark mode toggle
- Persist preference (localStorage)
- CSS variables for colors

### Feedback States

- Loading: Skeleton loaders
- Success: Toast notifications
- Error: Toast + inline messages
- Empty: Friendly empty states

### Components Library

```
/components
  /ui (shadcn/ui style)
    - Button
    - Input
    - Card
    - Badge
    - Dialog
    - Select
    - Slider
  /features
    - RoomCard
    - SearchBar
    - FilterPanel
    - RoomForm
    - InquiryForm
```

---

## ⚡ PERFORMANCE RULES

### Code Splitting

```typescript
// Lazy load routes
const OwnerDashboard = lazy(() => import("@/features/owner/Dashboard"));

// Lazy load heavy components
const MapView = lazy(() => import("@/components/MapView"));
```

### Memoization

```typescript
// Use useMemo for:
- Filtered/sorted lists
- Computed statistics
- Expensive calculations

// Use useCallback for:
- Event handlers passed to children
- Debounced functions
- API calls
```

### Image Optimization

- Next.js Image component
- Lazy loading
- Blur placeholders
- Responsive sizes

### Data Fetching

```typescript
// TanStack Query
- Caching strategy
- Background refetch
- Pagination
- Optimistic updates
```

---

## 🗂️ FOLDER STRUCTURE

```
/src
  /app                    # Next.js 14 App Router
    /(public)
      /rooms
      /rooms/[id]
    /(dashboard)
      /owner
      /admin
    /api                  # Mock API routes
  /features               # Feature-based modules
    /auth
    /rooms
    /inquiries
    /favorites
  /components
    /ui
    /layout
  /lib
    /api                  # API client
    /utils
    /validations          # Zod schemas
  /hooks                  # Custom hooks
  /types                  # TypeScript types
  /styles
```

---

## 🔧 TECH STACK (LOCKED)

### Core

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui

### State & Data

- **Server State:** TanStack Query
- **Client State:** React Context + hooks
- **Forms:** React Hook Form
- **Validation:** Zod

### Optional (If Time Allows)

- **Maps:** Leaflet (lighter than Google Maps)
- **Charts:** Recharts (for admin dashboard)

---

## 📊 DATA MODELS

### Room Listing

```typescript
interface Room {
  id: string;
  title: string;
  description: string;
  price: number;
  priceType: "monthly" | "daily";
  propertyType: "apartment" | "room" | "house";
  location: {
    address: string;
    city: string;
    area: string;
  };
  amenities: string[];
  images: string[];
  specifications: {
    size?: number;
    rooms?: number;
    bathrooms?: number;
    furnished: boolean;
  };
  availability: "available" | "rented" | "pending";
  ownerId: string;
  createdAt: string;
  updatedAt: string;
}
```

### Inquiry

```typescript
interface Inquiry {
  id: string;
  roomId: string;
  tenantName: string;
  tenantEmail: string;
  message: string;
  moveInDate: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}
```

### User (Mocked)

```typescript
interface User {
  id: string;
  name: string;
  email: string;
  role: "guest" | "owner" | "admin";
  avatar?: string;
}
```

---

## 🎯 DEMONSTRATION CHECKLIST

### Must Demonstrate:

- [ ] Role-based routing
- [ ] Protected routes
- [ ] Form validation (Zod)
- [ ] Optimistic UI updates
- [ ] Error boundaries
- [ ] Loading states (skeletons)
- [ ] Debounced search
- [ ] Pagination
- [ ] Code splitting
- [ ] useMemo usage
- [ ] useCallback usage
- [ ] Custom hooks
- [ ] TypeScript generics
- [ ] Responsive design
- [ ] Dark mode
- [ ] Toast notifications
- [ ] Modal dialogs
- [ ] Image optimization
- [ ] localStorage persistence

---

## 🚀 IMPLEMENTATION PHASES

### Week 1-2: Foundation

- [ ] Project setup (Next.js + TypeScript + Tailwind)
- [ ] UI components library
- [ ] Mock auth system
- [ ] Basic routing
- [ ] Room listing page
- [ ] Room details page

### Week 3-4: Search & Discovery

- [ ] Search bar with debounce
- [ ] Filter panel
- [ ] Sort functionality
- [ ] Favorites system
- [ ] Pagination

### Week 5-6: Owner Features

- [ ] Owner dashboard layout
- [ ] Create listing form
- [ ] Edit/delete listings
- [ ] My listings table
- [ ] Image upload (mock)

### Week 7: Inquiry System

- [ ] Inquiry form
- [ ] Inquiry list for owners
- [ ] Status management
- [ ] Notifications

### Week 8: Admin & Polish

- [ ] Admin dashboard
- [ ] Platform statistics
- [ ] User management view
- [ ] Performance optimizations
- [ ] Error handling polish

### Week 9-10: Deployment

- [ ] Deploy to Vercel
- [ ] Environment variables
- [ ] README documentation
- [ ] Demo video
- [ ] Portfolio write-up

---

## 🎨 DESIGN PRINCIPLES

### Color Palette

```css
/* Light Mode */
--primary: #3b82f6 /* Blue */ --secondary: #10b981 /* Green */ --accent: #f59e0b /* Amber */
  --danger: #ef4444 /* Red */ /* Dark Mode */ --primary-dark: #60a5fa --secondary-dark: #34d399;
```

### Typography

- **Headings:** Inter/Geist Sans (bold)
- **Body:** Inter/Geist Sans (regular)
- **Code:** Geist Mono

### Spacing

- Use Tailwind's spacing scale (4px base)
- Consistent padding/margin

---

## 🔐 MOCK DATA STRATEGY

### Mock API Routes

```typescript
// /api/rooms - GET, POST
// /api/rooms/[id] - GET, PUT, DELETE
// /api/inquiries - GET, POST
// /api/inquiries/[id] - PUT
// /api/auth/login - POST
// /api/auth/logout - POST
```

### Sample Data

- 20-30 room listings
- 3 mock users (guest, owner, admin)
- 10-15 inquiries
- Realistic Nepal locations (Kathmandu, Pokhara, Lalitpur)

---

## 📝 CODE QUALITY RULES

### TypeScript

- No `any` types
- Strict mode enabled
- Interface over type (for objects)
- Proper generics usage

### Components

- Max 200 lines per component
- Single responsibility
- Props interface defined
- Default exports for pages, named for components

### Hooks

- Custom hooks start with `use`
- Extract reusable logic
- Proper dependency arrays

### Naming

- PascalCase: Components, Types
- camelCase: Functions, variables
- UPPER_CASE: Constants
- kebab-case: Files, folders

---

## 🎯 PORTFOLIO PRESENTATION

### README Must Include:

1. **Hero screenshot**
2. **Tech stack badges**
3. **Key features list**
4. **Performance metrics**
5. **Setup instructions**
6. **Demo credentials**
7. **Architecture diagram**
8. **Lessons learned**

### Demo Video (3-5 min):

1. Quick overview
2. Search & filter demo
3. Create listing flow
4. Owner dashboard
5. Admin view
6. Mobile responsiveness
7. Performance highlights

---

## ⚠️ SCOPE CREEP PREVENTION

### If You're Tempted to Add:

- Real payments → **NO** (mock only)
- Real chat → **NO** (simple messaging UI)
- Email notifications → **NO** (toast only)
- SMS verification → **NO** (mock verification)
- Advanced analytics → **NO** (basic stats only)
- Social login → **NO** (email/password mock)

### Ask Yourself:

> "Does this feature demonstrate frontend skills better than what I already have?"

If NO → Skip it.

---

## 🏁 DEFINITION OF DONE

### A Feature is Complete When:

- [ ] Works on mobile & desktop
- [ ] Has loading state
- [ ] Has error state
- [ ] Has empty state
- [ ] TypeScript types defined
- [ ] Validation implemented
- [ ] Accessible (keyboard navigation)
- [ ] Tested manually
- [ ] No console errors
- [ ] Performance optimized

---

## 🎓 LEARNING GOALS

This project should teach you:

1. **Architecture:** Feature-based structure
2. **State:** Server vs Client state
3. **Performance:** Memoization, lazy loading
4. **UX:** Loading states, error handling
5. **TypeScript:** Advanced types, generics
6. **React:** Custom hooks, composition
7. **Next.js:** App Router, API routes
8. **Deployment:** Vercel, environment variables

---

## 📞 INTERVIEW TALKING POINTS

When presenting this project:

1. **"I chose feature-based architecture because..."**
2. **"I optimized performance by..."**
3. **"I handled edge cases like..."**
4. **"I used TanStack Query for..."**
5. **"I implemented optimistic updates to..."**
6. **"The biggest challenge was..."**
7. **"If I had more time, I would..."**

---

## 🎯 SUCCESS METRICS

### This Project is Successful If:

- ✅ Loads in < 2 seconds
- ✅ Works perfectly on mobile
- ✅ No TypeScript errors
- ✅ Clean, readable code
- ✅ Proper error handling
- ✅ Demonstrates 10+ advanced concepts
- ✅ Looks professional
- ✅ You can explain every decision

---

## 🔄 ITERATION RULES

### After MVP:

1. Get feedback from 3 developers
2. Fix critical bugs only
3. Add ONE impressive feature
4. Polish existing features
5. Optimize performance
6. Write documentation

### Don't:

- Keep adding features endlessly
- Rewrite working code
- Over-optimize prematurely
- Ignore feedback

---

## 🎬 FINAL CHECKLIST

Before calling it "done":

- [ ] All core features work
- [ ] Mobile responsive
- [ ] Dark mode works
- [ ] No console errors
- [ ] TypeScript strict mode passes
- [ ] README is complete
- [ ] Demo video recorded
- [ ] Deployed to Vercel
- [ ] Custom domain (optional)
- [ ] Portfolio case study written

---

**Remember:** This is a **frontend showcase**, not a production app. Focus on demonstrating skills, not building a startup.

**Time Budget:** 8-10 weeks (10-15 hours/week)

**End Goal:** Land mid-level frontend interviews at good companies.

# Google Analytics Tracking Guide

This guide shows you how to implement custom event tracking in your Savvy World application using the analytics utilities.

## Setup Complete ✓

Google Analytics has been set up with:
- **Package**: `@next/third-parties/google`
- **GA Measurement ID**: `G-W5W59KEFQX`
- **Location**: Root layout (`src/app/layout.tsx`)
- **Tracking**: All pages automatically tracked

## Analytics Utility

The analytics utility is located at `src/lib/analytics.ts` and provides type-safe event tracking functions.

---

## Quick Examples by Use Case

### 1. Track Button Clicks

Import and use in any component:

```typescript
import { trackButtonClick } from '@/lib/analytics';

// In your button's onClick handler
<button
  onClick={() => {
    trackButtonClick('Contact Us', 'hero-section');
    // Your existing logic...
  }}
>
  Contact Us
</button>
```

**Real Example - Update Footer Links:**

```tsx
// src/components/shared/footer/UnifiedFooter.tsx
import { trackLinkClick } from '@/lib/analytics';

// When rendering footer links (around line 127):
<a
  href={link.href}
  onClick={() => trackLinkClick(link.href, link.label, 'footer')}
  className="text-sm text-gray-600 hover:text-[#3960F9] transition-colors"
>
  {link.label}
</a>
```

---

### 2. Track Language Changes

**Update LanguageSwitcher Component:**

```tsx
// src/components/shared/LanguageSwitcher/LanguageSwitcher.tsx
import { trackLanguageChange } from '@/lib/analytics';

const switchLanguage = () => {
  const newLang = currentLang === 'en' ? 'ar' : 'en';

  // Track the language change
  trackLanguageChange(currentLang, newLang);

  setIsTransitioning(true);
  // ... rest of your existing code
};
```

---

### 3. Track Contact Form Submissions

**Update ContactPage Component:**

```tsx
// src/components/contact-page/ContactPage.tsx
import { trackContact } from '@/lib/analytics';

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()

  // Validation...
  if (!formData.email || !formData.email.includes('@')) {
    setStatus("error")
    trackContact('error', { error_message: 'Invalid email' });
    return
  }

  setIsSubmitting(true)
  trackContact('submit', { language: lang });

  try {
    const response = await fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: formData.email, lang }),
    })

    if (response.ok) {
      setStatus("success")
      trackContact('success', { language: lang });
      // ... rest of code
    } else {
      setStatus("error")
      trackContact('error', { error_message: 'API error' });
    }
  } catch (error) {
    setStatus("error")
    trackContact('error', { error_message: 'Network error' });
  } finally {
    setIsSubmitting(false)
  }
}
```

---

### 4. Track Newsletter Subscriptions

If you have a newsletter form in PromoSection or Footer:

```tsx
import { trackNewsletter } from '@/lib/analytics';

const handleNewsletterSubmit = async (email: string) => {
  trackNewsletter('subscribe');

  try {
    const response = await fetch('/api/subscribe', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });

    if (response.ok) {
      trackNewsletter('success');
    } else {
      trackNewsletter('error', 'Subscription failed');
    }
  } catch (error) {
    trackNewsletter('error', 'Network error');
  }
};
```

---

### 5. Track Video Interactions

If you have videos on your site (e.g., in MediaPage):

```tsx
import { trackVideo } from '@/lib/analytics';

<video
  onPlay={() => trackVideo('play', 'Savvy Intro Video', 0)}
  onPause={() => trackVideo('pause', 'Savvy Intro Video', 50)}
  onEnded={() => trackVideo('complete', 'Savvy Intro Video', 100)}
>
  <source src="/videos/intro.mp4" type="video/mp4" />
</video>
```

---

### 6. Track Scroll Depth

Add scroll tracking to any page:

```tsx
import { trackScrollDepth } from '@/lib/analytics';
import { useEffect } from 'react';

export default function SomePage() {
  useEffect(() => {
    const milestones = [25, 50, 75, 100];
    let tracked: number[] = [];

    const handleScroll = () => {
      const scrollPercent =
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;

      milestones.forEach(milestone => {
        if (scrollPercent >= milestone && !tracked.includes(milestone)) {
          trackScrollDepth(milestone, window.location.pathname);
          tracked.push(milestone);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ... rest of component
}
```

---

### 7. Track Custom Events

For any custom interaction:

```tsx
import { trackEvent, EventName, EventCategory } from '@/lib/analytics';

// Track a CTA button click
trackEvent(EventName.BUTTON_CLICK, {
  category: EventCategory.USER_INTERACTION,
  label: 'Hero Section',
  button_text: 'Explore Savvy Expo',
  value: 1
});

// Track navigation to a specific section
trackEvent('section_navigation', {
  category: EventCategory.NAVIGATION,
  label: 'Services Section',
  from_section: 'hero',
  to_section: 'services'
});

// Track when users view a project
trackEvent('project_view', {
  category: EventCategory.ENGAGEMENT,
  project_name: 'Smart City Project',
  project_type: 'innovation',
  language: 'ar'
});
```

---

## Available Tracking Functions

| Function | Use Case | Example |
|----------|----------|---------|
| `trackEvent()` | General custom events | Any user interaction |
| `trackButtonClick()` | Button clicks | CTA, navigation buttons |
| `trackLinkClick()` | Link clicks | Footer links, navigation |
| `trackForm()` | Form interactions | Start, submit, success, error |
| `trackNewsletter()` | Newsletter actions | Subscribe, success, error |
| `trackContact()` | Contact form | Submit, success, error |
| `trackLanguageChange()` | Language switching | AR ↔ EN |
| `trackScrollDepth()` | Scroll engagement | 25%, 50%, 75%, 100% |
| `trackVideo()` | Video interactions | Play, pause, complete |

---

## Event Categories

Use these predefined categories for consistency:

- `EventCategory.NAVIGATION` - Page/section navigation
- `EventCategory.USER_INTERACTION` - Clicks, hovers, interactions
- `EventCategory.FORM` - Form-related events
- `EventCategory.ENGAGEMENT` - Content engagement
- `EventCategory.MEDIA` - Video, image interactions
- `EventCategory.LANGUAGE` - Language changes
- `EventCategory.NEWSLETTER` - Newsletter subscriptions
- `EventCategory.CONTACT` - Contact form submissions

---

## Best Practices

### ✅ DO:
- Track user interactions that indicate engagement
- Use descriptive labels and button text
- Include context (location, language, page type)
- Track both success AND error states
- Use the predefined EventName and EventCategory enums

### ❌ DON'T:
- Track personally identifiable information (PII)
- Track passwords or sensitive data
- Send user emails to GA (use hashed IDs instead)
- Track too many events (focus on meaningful interactions)
- Forget to track error states

---

## Viewing Your Analytics

1. Go to [Google Analytics](https://analytics.google.com/)
2. Select your property (Savvy World)
3. Navigate to:
   - **Reports → Engagement → Events** - See all tracked events
   - **Reports → Engagement → Pages** - See page views
   - **Realtime** - See live user activity

---

## Custom Dimensions (Optional)

For more advanced tracking, you can set up custom dimensions in GA4:

```tsx
import { trackEvent } from '@/lib/analytics';

trackEvent('page_view', {
  category: EventCategory.NAVIGATION,
  language: 'ar',
  page_type: 'media',
  user_segment: 'returning_visitor',
  device_type: 'mobile'
});
```

---

## Testing Analytics

In development mode, events are logged to the console:

```
📊 GA Event: button_click {
  category: 'user_interaction',
  label: 'hero-section',
  button_text: 'Contact Us'
}
```

In production, events are sent to Google Analytics.

---

## Need Help?

- **Analytics Utility**: `src/lib/analytics.ts`
- **Google Analytics**: https://analytics.google.com/
- **GA4 Documentation**: https://support.google.com/analytics/

---

**Note**: All tracking is client-side only. Events will only fire in the browser, not during server-side rendering.

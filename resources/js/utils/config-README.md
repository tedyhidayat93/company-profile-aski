# Configuration System Documentation

## Overview

Sistem configuration menggunakan middleware Laravel untuk mengirim data configuration ke semua halaman frontend melalui Inertia.js.

## Setup

Middleware `ShareSiteConfiguration` sudah terdaftar di `bootstrap/app.php` dan mengirim:
- `siteconfig` - Array lengkap dengan semua configuration data
- `siteconfig_simple` - Object key-value untuk backward compatibility

## Usage

### 1. Basic Usage dengan `useConfig` Hook

```typescript
import { useConfig } from '@/utils/config';

export function MyComponent() {
  const { getConfig } = useConfig();
  
  return (
    <div>
      <h1>{getConfig('site_title', 'Default Title')}</h1>
      <p>{getConfig('contact_email', 'contact@example.com')}</p>
    </div>
  );
}
```

### 2. Single Configuration dengan `useConfiguration`

```typescript
import { useConfiguration } from '@/utils/config';

export function SiteTitle() {
  const siteTitle = useConfiguration('site_title', 'Default Title');
  
  return <h1>{siteTitle}</h1>;
}
```

### 3. Group Configurations

```typescript
import { useGroupConfigurations } from '@/utils/config';

export function SocialLinks() {
  const socialConfigs = useGroupConfigurations('social');
  
  return (
    <div>
      {socialConfigs.facebook && (
        <a href={socialConfigs.facebook.value}>Facebook</a>
      )}
      {socialConfigs.instagram && (
        <a href={socialConfigs.instagram.value}>Instagram</a>
      )}
    </div>
  );
}
```

### 4. Get All Configurations

```typescript
import { useConfig } from '@/utils/config';

export function ConfigDebug() {
  const { getAll } = useConfig();
  const allConfigs = getAll();
  
  return (
    <pre>{JSON.stringify(allConfigs, null, 2)}</pre>
  );
}
```

## Available Configuration Keys

### Site Configuration
- `site_title` - Judul website
- `site_name` - Nama perusahaan
- `site_tagline` - Tagline/deskripsi singkat
- `contact_email` - Email kontak
- `contact_phone` - Telepon kontak
- `address` - Alamat perusahaan

### Social Media
- `social_facebook` - URL Facebook
- `social_instagram` - URL Instagram
- `social_twitter` - URL Twitter
- `social_youtube` - URL YouTube
- `social_tiktok` - URL TikTok

### Homepage
- `hero_title` - Judul hero section
- `hero_description` - Deskripsi hero section
- `search_placeholder` - Placeholder search box
- `cta_button_text` - Text tombol CTA

### Top Bar Messages
- `topbar_message1` - Pesan top bar 1
- `topbar_message2` - Pesan top bar 2
- `topbar_message3` - Pesan top bar 3
- `topbar_message4` - Pesan top bar 4

### Maps
- `google_maps_embed` - Embed code Google Maps

## Configuration Structure

Data configuration memiliki struktur berikut:

```typescript
interface Configuration {
  id: number;
  key: string;
  value: string;
  type: string;
  label: string;
  description: string;
  group: string;
}
```

## Best Practices

1. **Selalu gunakan default values**: `getConfig('key', 'default_value')`
2. **Gunakan group untuk related configs**: `useGroupConfigurations('social')`
3. **Cache friendly**: Data di-cache di middleware, tidak ada API call tambahan
4. **Type safe**: Helper functions sudah TypeScript-friendly

## Examples in Components

### Header Component
```typescript
export function Header() {
  const { getConfig } = useConfig();
  
  return (
    <header>
      <a href={`tel:${getConfig('contact_phone', '+1234567890')}`}>
        {getConfig('contact_phone', '+1234567890')}
      </a>
      <button>
        {getConfig('cta_button_text', 'Contact Us')}
      </button>
    </header>
  );
}
```

### Footer Component
```typescript
export function Footer() {
  const { getConfig } = useConfig();
  
  return (
    <footer>
      <h3>{getConfig('site_name', 'Company Name')}</h3>
      <p>{getConfig('site_tagline', 'Company tagline')}</p>
      <p>&copy; {new Date().getFullYear()} {getConfig('site_name', 'Company Name')}</p>
    </footer>
  );
}
```

### Homepage Component
```typescript
export function Homepage() {
  const { getConfig } = useConfig();
  
  return (
    <div>
      <Head title={getConfig('site_title', 'Home')} />
      <section>
        <h1>{getConfig('hero_title', 'Welcome')}</h1>
        <p>{getConfig('hero_description', 'Description')}</p>
      </section>
    </div>
  );
}
```

## Migration dari Props ke useConfig

**Before:**
```typescript
// Di layout
<Footer siteConfig={siteconfig} />

// Di component
interface FooterProps {
  siteConfig?: Record<string, any>;
}

export function Footer({ siteConfig = {} }: FooterProps) {
  return <p>{siteConfig.site_name || 'Default'}</p>;
}
```

**After:**
```typescript
// Di layout
<Footer />

// Di component
export function Footer() {
  const { getConfig } = useConfig();
  return <p>{getConfig('site_name', 'Default')}</p>;
}
```

## Benefits

1. **No Props Drilling** - Tidak perlu passing props melalui banyak component
2. **Global Access** - Configuration tersedia di semua halaman
3. **Performance** - Data di-load sekali di middleware
4. **Maintainable** - Centralized configuration management
5. **Type Safe** - Full TypeScript support

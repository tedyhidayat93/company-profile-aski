import { Head } from '@inertiajs/react';

import AppearanceTabs from '@/components/appearance-tabs';
import HeadingSmall from '@/components/heading-small';
import { type BreadcrumbItem } from '@/types';

import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { edit as editAppearance } from '@/routes/settings/appearance';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Pengaturan Tampilan',
    href: editAppearance().url,
  },
];

export default function Appearance() {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Pengaturan Tampilan" />

      <SettingsLayout>
        <div className="space-y-6">
          <HeadingSmall
            title="Pengaturan Tampilan"
            description="Ubah pengaturan tampilan Website anda sesuai keinginan, seperti tema gelap atau terang, ukuran font, dan lainnya. Semua perubahan akan diterapkan secara langsung."
          />
          <AppearanceTabs />
        </div>
      </SettingsLayout>
    </AppLayout>
  );
}

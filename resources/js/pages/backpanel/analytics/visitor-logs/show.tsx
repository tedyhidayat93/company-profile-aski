import { Head, Link, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { type BreadcrumbItem } from '@/types';
import AppLayout from '@/layouts/app-layout';
import { 
  ArrowLeft, 
  Monitor, 
  Smartphone, 
  Tablet,
  Eye,
  Globe2Icon,
  Navigation,
  Network,
  MapPin,
  Clock,
  Info
} from 'lucide-react';

// --- LEAFLET IMPORTS ---
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { cn } from '@/lib/utils';

// Fix untuk default marker icon Leaflet yang sering hilang saat bundling (Vite/Webpack)
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

interface LogVisitor {
  id: number;
  action: string;
  page: string;
  message: string;
  ip_address: string;
  provider: string;
  device: string;
  user_agent: string;
  latitude: number | null;
  longitude: number | null;
  city: string | null;
  region: string | null;
  country: string | null;
  url_path: string;
  http_method: string;
  created_at: string;
  updated_at: string;
  device_label: string;
  full_location: string;
}

interface Props {
  visitorLog: LogVisitor;
}

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Analitik', href: '/cpanel/analytics/visitor-logs' },
  { title: 'Log Pengunjung', href: '/cpanel/analytics/visitor-logs' },
  { title: 'Detail', href: '#' },
];

const getDeviceIcon = (device: string) => {
  switch (device) {
    case 'phone': return <Smartphone className="h-5 w-5 text-slate-600" />;
    case 'tablet': return <Tablet className="h-5 w-5 text-slate-600" />;
    default: return <Monitor className="h-5 w-5 text-slate-600" />;
  }
};

const getActionColor = (action: string) => {
  switch (action) {
    case 'visit': return 'bg-blue-100 text-blue-800';
    case 'click': return 'bg-green-100 text-green-800';
    case 'submit':
    case 'contact_page_submit':
      return 'bg-orange-100 text-orange-800';
    case 'whatsapp_quote_request':
      return 'bg-emerald-100 text-emerald-800';
    default: return 'bg-slate-100 text-slate-800';
  }
};

const getHttpMethodColor = (method: string) => {
  switch (method) {
    case 'GET': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    case 'POST': return 'bg-blue-50 text-blue-700 border-blue-200';
    case 'PUT': return 'bg-amber-50 text-amber-700 border-amber-200';
    case 'DELETE': return 'bg-rose-50 text-rose-700 border-rose-200';
    default: return 'bg-slate-50 text-slate-700 border-slate-200';
  }
};

export default function VisitorLogShow({ visitorLog }: Props) {
  // Ambil actionOptions global props dari middleware backend
  const { actionOptions = [] } = usePage().props as any;

  // Resolusi nama label aksi agar rapi
  const getActionLabel = (actionValue: string) => {
    const found = actionOptions.find((opt: any) => opt.value === actionValue);
    return found ? found.label : actionValue.replace(/_/g, ' ');
  };

  const hasCoordinates = visitorLog.latitude && visitorLog.longitude;
  const position: [number, number] = hasCoordinates 
    ? [Number(visitorLog.latitude), Number(visitorLog.longitude)] 
    : [0, 0];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={`Log Pengunjung #${visitorLog.id}`} />

      <div className="space-y-6 p-6">
        
        {/* HERO HEADER */}
        <div className="rounded-xl border border-slate-200 bg-gradient-to-r from-slate-50 to-white p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-sm mt-1">
              {getDeviceIcon(visitorLog.device)}
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl font-bold tracking-tight text-slate-900">
                  {visitorLog.ip_address}
                </h2>
                <Badge className={cn("normal-case shadow-none border-0 font-semibold", getActionColor(visitorLog.action))}>
                  {getActionLabel(visitorLog.action)}
                </Badge>
                <Badge variant="outline" className={cn("shadow-none font-mono", getHttpMethodColor(visitorLog.http_method))}>
                  {visitorLog.http_method}
                </Badge>
              </div>

              <p className="text-sm text-slate-500 font-medium">
                {visitorLog.device_label} • {visitorLog.full_location || 'Lokasi tidak diketahui'}
              </p>
            </div>
          </div>

          <Button variant="outline" size="sm" asChild className="self-start md:self-center">
            <Link href="/cpanel/analytics/visitor-logs">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Kembali
            </Link>
          </Button>
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* LEFT COLUMN: Data Teknis Utama */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* INFORMASI UTAMA */}
            <Card className="shadow-sm">
              <CardHeader className="flex flex-row items-center gap-2 pb-3">
                <Info className="h-4 w-4 text-blue-600" />
                <CardTitle className="text-base font-semibold">Informasi Sesi & URL</CardTitle>
              </CardHeader>

              <CardContent className="divide-y divide-slate-100 text-sm">
                <div className="py-3 flex flex-col sm:flex-row sm:justify-between gap-1">
                  <span className="text-slate-500 font-medium">Halaman Utama (Page Name)</span>
                  <span className="text-slate-800 font-semibold text-right max-w-md break-all">{visitorLog.page}</span>
                </div>

                <div className="py-3 flex flex-col sm:flex-row sm:justify-between gap-1">
                  <span className="text-slate-500 font-medium">Path URL</span>
                  <span className="font-mono text-xs bg-slate-50 px-2 py-1 rounded text-slate-700 text-right max-w-md break-all">
                    {visitorLog.url_path}
                  </span>
                </div>

                <div className="py-3 flex flex-col sm:flex-row sm:justify-between gap-1">
                  <span className="text-slate-500 font-medium">Pesan / Payload Log</span>
                  <span className="text-slate-700 italic text-right max-w-md">
                    {visitorLog.message || <span className="text-slate-400 not-italic text-xs">Tidak ada data payload</span>}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* PETA LOKASI & GEOLOKASI */}
            <Card className="shadow-sm overflow-hidden">
              <CardHeader className="flex flex-row items-center gap-2 pb-3">
                <MapPin className="h-4 w-4 text-rose-600" />
                <div>
                  <CardTitle className="text-base font-semibold">Geolokasi & Jaringan</CardTitle>
                  <CardDescription>Detail lokasi fisik penyedia layanan internet (ISP)</CardDescription>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-slate-50 p-4 rounded-xl text-sm">
                  <div>
                    <p className="text-xs text-slate-500 font-medium">Negara</p>
                    <p className="font-semibold text-slate-800">{visitorLog.country || '-'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-medium">Provinsi/Wilayah</p>
                    <p className="font-semibold text-slate-800">{visitorLog.region || '-'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-medium">Kota</p>
                    <p className="font-semibold text-slate-800">{visitorLog.city || '-'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-medium">Provider / ISP</p>
                    <p className="font-semibold text-slate-800 truncate" title={visitorLog.provider}>{visitorLog.provider || '-'}</p>
                  </div>
                </div>

                {/* INTEGRASI MAP LEAFLET */}
                {hasCoordinates ? (
                  <div className="space-y-3">
                    <div className="h-64 w-full rounded-xl border border-slate-200 overflow-hidden z-0 relative">
                      <MapContainer 
                        center={position} 
                        zoom={12} 
                        scrollWheelZoom={false} 
                        className="h-full w-full"
                      >
                        <TileLayer
                          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={position}>
                          <Popup>
                            <div className="text-xs font-sans space-y-1">
                              <p className="font-bold">{visitorLog.ip_address}</p>
                              <p>{visitorLog.full_location}</p>
                            </div>
                          </Popup>
                        </Marker>
                      </MapContainer>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs text-slate-500 gap-2">
                      <p className="font-mono">Koordinat: {visitorLog.latitude}, {visitorLog.longitude}</p>
                      <Button size="sm" variant="outline" className="h-8 text-xs" asChild>
                        <a
                          href={`https://www.google.com/maps?q=${visitorLog.latitude},${visitorLog.longitude}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <Navigation className="h-3.5 w-3.5 mr-1.5 text-blue-600" />
                          Buka di Google Maps External
                        </a>
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 border border-dashed rounded-xl bg-slate-50/50 text-slate-400">
                    <MapPin className="h-8 w-8 stroke-1 mb-2" />
                    <p className="text-xs font-medium">Titik koordinat GPS tidak tersedia pada log ini</p>
                  </div>
                )}
              </CardContent>
            </Card>

          </div>

          {/* RIGHT COLUMN: Sidebar Metadata & Aksi */}
          <div className="space-y-6">

            {/* KARTU TEMPO & WAKTU */}
            <Card className="shadow-sm">
              <CardHeader className="flex flex-row items-center gap-2 pb-3">
                <Clock className="h-4 w-4 text-amber-600" />
                <CardTitle className="text-base font-semibold">Stempel Waktu</CardTitle>
              </CardHeader>

              <CardContent className="space-y-3 text-sm">
                <div className="bg-slate-50 p-3 rounded-lg">
                  <p className="text-xs text-slate-500 font-medium mb-0.5">Pertama Terdeteksi</p>
                  <p className="font-semibold text-slate-800">
                    {new Date(visitorLog.created_at).toLocaleString('id-ID', { dateStyle: 'long', timeStyle: 'medium' })}
                  </p>
                </div>

                <div className="bg-slate-50 p-3 rounded-lg">
                  <p className="text-xs text-slate-500 font-medium mb-0.5">Pembaruan Terakhir</p>
                  <p className="font-semibold text-slate-800">
                    {new Date(visitorLog.updated_at).toLocaleString('id-ID', { dateStyle: 'long', timeStyle: 'medium' })}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* USER AGENT & TECH */}
            <Card className="shadow-sm">
              <CardHeader className="flex flex-row items-center gap-2 pb-3">
                <Network className="h-4 w-4 text-indigo-600" />
                <CardTitle className="text-base font-semibold">Informasi Browser</CardTitle>
              </CardHeader>

              <CardContent>
                <div className="rounded-lg border bg-slate-50 p-3">
                  <p className="text-xs font-mono break-all text-slate-600 leading-relaxed">
                    {visitorLog.user_agent}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* AKSI CEPAT */}
            <Card className="shadow-sm bg-gradient-to-b from-white to-slate-50/50">
              <CardHeader>
                <CardTitle className="text-base font-semibold">Tindakan Lanjutan</CardTitle>
              </CardHeader>

              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full bg-white text-slate-700 border-slate-200" asChild>
                  <Link href="/cpanel/analytics/visitor-logs">
                    <Eye className="h-4 w-4 mr-2 text-slate-500" />
                    Lihat Semua Log
                  </Link>
                </Button>

                {visitorLog.url_path && (
                  <Button variant="default" className="w-full bg-blue-600 hover:bg-blue-700 text-white" asChild>
                    <a href={`/${visitorLog.url_path}`} target="_blank" rel="noreferrer">
                      <Globe2Icon className="h-4 w-4 mr-2" />
                      Buka Tautan Halaman
                    </a>
                  </Button>
                )}
              </CardContent>
            </Card>

          </div>

        </div>
      </div>
    </AppLayout>
  );
}
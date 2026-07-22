import React, { useState, useMemo } from 'react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { List, Globe, BarChart3, MapPin, ActivitySquare } from 'lucide-react';

interface TrafficData {
  time?: string;
  date?: string;
  visitors: number;
}

interface WebsiteTrafficData {
  today: TrafficData[];
  thisMonth: TrafficData[];
  last3Months: TrafficData[];
  thisYear: TrafficData[];
}

interface CountryData {
  country: string;
  visitors: number;
}

interface RegionData {
  region: string;
  visitors: number;
}

type ActiveTab = 'traffic' | 'country' | 'region';

export default function TrafficVisitorCharts({
  websiteTrafficData,
  countryStats = [],
  regionStats = [],
}: {
  websiteTrafficData: WebsiteTrafficData;
  countryStats: CountryData[];
  regionStats: RegionData[];
}) {
  const [activeTab, setActiveTab] = useState<ActiveTab>('traffic');
  const [filter, setFilter] = useState<keyof WebsiteTrafficData>('thisMonth');

  // Menentukan Key untuk XAxis Grafik Utama
  const currentData = websiteTrafficData[filter] || [];
  const dataKey = filter === 'today' ? 'time' : 'date';

  const isEmpty = currentData.length === 0;
  const isAllZero = useMemo(() => currentData.every((d) => d.visitors === 0), [currentData]);

  // Konfigurasi Filter Waktu
  const timeFilters = [
    { key: 'today', label: 'Hari Ini' },
    { key: 'thisMonth', label: 'Bulan Ini' },
    { key: 'last3Months', label: '3 Bulan' },
    { key: 'thisYear', label: '1 Tahun' },
  ] as const;

  return (
    <div className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xs overflow-hidden">
      
      {/* ─── HEADER & TABS CONTROL ─── */}
      <div className="p-6 border-b border-zinc-100 dark:border-zinc-900 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center bg-slate-800 dark:bg-zinc-900/20">
        <div>
          <h2 className="text-lg font-bold text-orange-300 dark:text-zinc-50 tracking-tight">
            Analisis Pengunjung
          </h2>
          <p className="text-xs text-zinc-100 dark:text-zinc-500 mt-0.5">
            Pantau performa trafik dan demografi situs Anda
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex bg-zinc-100 dark:bg-zinc-900 p-1 rounded-xl w-full sm:w-auto">
          <button
            onClick={() => setActiveTab('traffic')}
            className={`flex items-center justify-center gap-2 text-xs font-bold px-4 py-2 rounded-lg transition-all flex-1 sm:flex-initial ${
              activeTab === 'traffic'
                ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 shadow-xs'
                : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            Kunjungan Situs
          </button>
          <button
            onClick={() => setActiveTab('country')}
            className={`flex items-center justify-center gap-2 text-xs font-bold px-4 py-2 rounded-lg transition-all flex-1 sm:flex-initial ${
              activeTab === 'country'
                ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 shadow-xs'
                : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            Negara
          </button>
          <button
            onClick={() => setActiveTab('region')}
            className={`flex items-center justify-center gap-2 text-xs font-bold px-4 py-2 rounded-lg transition-all flex-1 sm:flex-initial ${
              activeTab === 'region'
                ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 shadow-xs'
                : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            Wilayah
          </button>
        </div>
      </div>

      {/* ─── CHARTS SUB-HEADER (SUB-FILTERS & LOG ACTION) ─── */}
      <div className="px-6 pt-5 pb-2 flex flex-wrap gap-3 items-center justify-between">
        <div>
          {activeTab === 'traffic' ? (
            <div className="flex gap-1 bg-zinc-50 dark:bg-zinc-900/60 p-1 border border-zinc-200/60 dark:border-zinc-800 rounded-xl">
              {timeFilters.map((tf) => (
                <button
                  key={tf.key}
                  onClick={() => setFilter(tf.key)}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                    filter === tf.key
                      ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-xs'
                      : 'text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/50'
                  }`}
                >
                  {tf.label}
                </button>
              ))}
            </div>
          ) : (
            <span className="text-xs font-extrabold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              Peringkat Teratas Demografi
            </span>
          )}
        </div>

        <Button variant="secondary" size="sm" className="h-8 text-xs font-bold rounded-xl" asChild>
          <Link href="/cpanel/analytics/visitor-logs">
            <ActivitySquare className="h-3.5 w-3.5 mr-1.5" />
            Lihat Detail
          </Link>
        </Button>
      </div>

      {/* ─── MAIN CONTENT DISPLAY ─── */}
      <div className="p-6 h-[340px] relative">
        
        {/* TAB 1: TRAFIK KUNJUNGAN UTAMA */}
        {activeTab === 'traffic' && (
          <>
            {!isEmpty ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={currentData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.15}/>
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f4f4f5" className="dark:stroke-zinc-800/60" />
                  <XAxis
                    dataKey={dataKey}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#a1a1aa', fontSize: 11, fontWeight: 500 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#a1a1aa', fontSize: 11, fontWeight: 500 }}
                  />
                  <Tooltip
                    cursor={{ stroke: '#2563eb', strokeWidth: 1, strokeDasharray: '4 4' }}
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      borderRadius: '12px',
                      border: '1px solid #e4e4e7',
                      fontSize: '12px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="visitors"
                    name="Pengunjung"
                    stroke="#2563eb"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#colorVisitors)"
                    activeDot={{ r: 5, strokeWidth: 0, fill: '#2563eb' }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="text-xl mb-2">📊</div>
                <p className="text-xs font-semibold text-zinc-400 dark:text-zinc-500">Belum ada data rekaman trafik</p>
              </div>
            )}
            
            {isAllZero && !isEmpty && (
              <div className="absolute bottom-6 left-0 right-0 text-center text-[11px] font-medium text-zinc-400 bg-white/80 dark:bg-zinc-950/85 py-1 backdrop-blur-xs">
                Tidak ada aktivitas dari pengunjung (0 visitors)
              </div>
            )}
          </>
        )}

        {/* TAB 2: DEMOGRAFI NEGARA */}
        {activeTab === 'country' && (
          <div className="w-full h-full">
            {countryStats.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={countryStats} layout="vertical" margin={{ top: 5, right: 15, left: 10, bottom: 5 }}>
                  <XAxis type="number" hide />
                  <YAxis
                    dataKey="country"
                    type="category"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#71717a', fontSize: 11, fontWeight: 600 }}
                    width={90}
                  />
                  <Tooltip cursor={{ fill: 'transparent' }} />
                  <Bar dataKey="visitors" name="Pengunjung" radius={[0, 6, 6, 0]} barSize={14}>
                    {countryStats.map((_, i) => (
                      <Cell key={i} fill="#2563eb" fillOpacity={Math.max(0.3, 1 - i * 0.15)} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="text-xl mb-2">🌍</div>
                <p className="text-xs font-semibold text-zinc-400">Data negara belum terekam</p>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: DEMOGRAFI WILAYAH */}
        {activeTab === 'region' && (
          <div className="w-full h-full">
            {regionStats.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={regionStats} layout="vertical" margin={{ top: 5, right: 15, left: 10, bottom: 5 }}>
                  <XAxis type="number" hide />
                  <YAxis
                    dataKey="region"
                    type="category"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#71717a', fontSize: 11, fontWeight: 600 }}
                    width={90}
                  />
                  <Tooltip cursor={{ fill: 'transparent' }} />
                  <Bar dataKey="visitors" name="Pengunjung" radius={[0, 6, 6, 0]} barSize={14}>
                    {regionStats.map((_, i) => (
                      <Cell key={i} fill="#10b981" fillOpacity={Math.max(0.3, 1 - i * 0.15)} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="text-xl mb-2">📍</div>
                <p className="text-xs font-semibold text-zinc-400">Data wilayah belum terekam</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
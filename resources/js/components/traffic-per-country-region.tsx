import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
} from 'recharts';

export interface CountryData {
  country: string;
  visitors: number;
}

export interface RegionData {
  region: string;
  visitors: number;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    name: string;
  }>;
  label?: string;
}

export default function TrafficPerCountryRegion({ countryStats, regionStats }: { countryStats: CountryData[], regionStats: RegionData[] }) {
  // Komponen Tooltip Custom agar lebih elegan
  const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 shadow-xl border border-slate-100 rounded-lg">
          <p className="text-xs font-bold text-slate-500 uppercase mb-1">{label}</p>
          <p className="text-sm font-extrabold text-slate-900">
            {payload[0].value.toLocaleString()} <span className="text-slate-400 font-normal">Kunjungan</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Chart Per Negara */}
      <Card className="border-none shadow-sm ring-1 ring-slate-200 bg-white/50 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-md font-bold tracking-tight text-slate-700">Kunjungan per Negara</CardTitle>
          <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
        </CardHeader>
        <CardContent>
          <div className="h-[350px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={countryStats}
                layout="vertical" // Membuat bar jadi horizontal
                margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
              >
                {/* Menghilangkan garis vertikal agar lebih clean */}
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
                
                <XAxis type="number" hide /> {/* Sumbu angka disembunyikan untuk look minimalis */}
                <YAxis 
                  dataKey="country" 
                  type="category" 
                  axisLine={false} 
                  tickLine={false}
                  fontSize={12}
                  width={80}
                  className="font-medium text-slate-600"
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f8fafc' }} />
                
                <Bar 
                  dataKey="visitors" 
                  radius={[0, 10, 10, 0]} // Bar rounded hanya di ujung kanan
                  barSize={20}
                >
                  <LabelList 
                    dataKey="visitors" 
                    position="right" 
                    fontSize={11}
                    fill="#475569"
                    formatter={(value: any) => Number(value).toLocaleString()}
                  />
                  {countryStats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill="#3b82f6" fillOpacity={1 - index * 0.15} /> 
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Chart Per Wilayah */}
      <Card className="border-none shadow-sm ring-1 ring-slate-200 bg-white/50 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-md font-bold tracking-tight text-slate-700">Kunjungan per Wilayah</CardTitle>
          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
        </CardHeader>
        <CardContent>
          <div className="h-[350px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={regionStats}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
                
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="region" 
                  type="category" 
                  axisLine={false} 
                  tickLine={false}
                  fontSize={12}
                  width={80}
                  className="font-medium text-slate-600"
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f8fafc' }} />
                
                <Bar 
                  dataKey="visitors" 
                  radius={[0, 10, 10, 0]}
                  barSize={20}
                >
                  <LabelList 
                    dataKey="visitors" 
                    position="right" 
                    fontSize={11}
                    fill="#475569"
                    formatter={(value: any) => Number(value).toLocaleString()}
                  />
                  {regionStats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill="#10b981" fillOpacity={1 - index * 0.15} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

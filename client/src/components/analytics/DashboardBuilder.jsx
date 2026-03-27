import React from 'react';
import Card, { CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Layout, Plus, Search, Filter } from 'lucide-react';
import Button from '@/components/ui/Button';

const DashboardBuilder = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-black text-white uppercase tracking-tight">DASHBOARD BUILDER</h3>
          <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mt-1">ÖZELLEŞTİRİLMİŞ ANALİTİK GÖRÜNÜMLERİ OLUŞTURUN</p>
        </div>
        <Button icon={Plus} size="sm">YENİ PANEL EKLE</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card glass className="p-8 border-dashed border-white/5 flex flex-col items-center justify-center space-y-4 hover:border-[var(--color-neon)]/20 transition-all cursor-pointer group">
          <div className="p-4 rounded-full bg-white/5 group-hover:scale-110 transition-transform">
            <Layout className="w-8 h-8 text-gray-600 group-hover:text-[var(--color-neon)]" />
          </div>
          <div className="text-center">
            <div className="text-[10px] font-black text-white uppercase tracking-[0.2em] mb-1">ŞABLON SEÇİN</div>
            <div className="text-[8px] font-bold text-gray-600 uppercase tracking-widest">HAZIR DÜZENLERDEN BAŞLAYIN</div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DashboardBuilder;

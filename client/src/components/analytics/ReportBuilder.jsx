import React from 'react';
import Card, { CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { FileText, Download, Share2, Plus, Calendar } from 'lucide-react';
import Button from '@/components/ui/Button';

const ReportBuilder = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-black text-white uppercase tracking-tight">RAPOR OLUŞTURUCU</h3>
          <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mt-1">OTOMATİZE VE ÖZEL RAPORLAMA MERKEZİ</p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" icon={Calendar} size="sm">PLANLA</Button>
          <Button icon={Plus} size="sm">YENİ RAPOR</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card glass className="p-6 border-white/5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-500/10 rounded-lg">
                <FileText className="w-5 h-5 text-green-400" />
              </div>
              <span className="text-[10px] font-black text-white uppercase tracking-widest">SON RAPORLAR</span>
            </div>
            <span className="text-[10px] font-bold text-gray-600 uppercase">GÜNCEL</span>
          </div>
          
          <div className="space-y-2">
            {[1, 2, 3].map(i => (
              <div key={i} className="p-4 bg-white/5 rounded-xl border border-white/5 hover:border-white/10 transition-all flex items-center justify-between group">
                <div>
                  <div className="text-sm font-bold text-white uppercase tracking-tight">Q1 Performans Analizi_v{i}</div>
                  <div className="text-[9px] font-bold text-gray-500 uppercase mt-1">SİSTEM GENELİ • 12 MART 2026</div>
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="ghost" size="sm" icon={Download} />
                  <Button variant="ghost" size="sm" icon={Share2} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card glass className="p-6 border-white/5 bg-gradient-to-br from-[var(--color-neon)]/5 to-transparent">
          <div className="h-full flex flex-col items-center justify-center text-center space-y-4 p-8">
            <div className="p-4 rounded-3xl bg-[var(--color-neon)]/10 border border-[var(--color-neon)]/20 shadow-[0_0_20px_rgba(0,240,255,0.1)]">
              <Plus className="w-10 h-10 text-[var(--color-neon)]" />
            </div>
            <div className="space-y-2">
              <div className="text-sm font-black text-white uppercase tracking-widest italic">YENİ ANALİZ RAPORU</div>
              <p className="text-[10px] font-bold text-gray-600 uppercase tracking-[0.2em] max-w-[200px]">VERİ SETİNİ SEÇİN VE YAPAY ZEKA RAPORUNUZU HAZIRLASIN</p>
            </div>
            <Button className="mt-4">SİHİRBAZI BAŞLAT</Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ReportBuilder;

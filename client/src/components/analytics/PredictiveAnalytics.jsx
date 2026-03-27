import React from 'react';
import Card, { CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Brain, Zap, Target, TrendingUp, Activity, AlertTriangle } from 'lucide-react';
import Button from '@/components/ui/Button';

const PredictiveAnalytics = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-black text-white uppercase tracking-tight">AI ÖNGÖRÜ MERKEZİ</h3>
          <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mt-1">MAKİNE ÖĞRENİMİ VE GELECEK PROJEKSİYONLARI</p>
        </div>
        <Button icon={Zap} size="sm">YENİ MODEL EĞİT</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card glass neon className="lg:col-span-2 p-6 border-white/5 space-y-8 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
            <Brain className="w-40 h-40 text-[var(--color-neon)]" />
          </div>
          
          <div className="flex items-start justify-between">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 rounded-full bg-[var(--color-neon)] animate-pulse" />
                <span className="text-[10px] font-black text-white uppercase tracking-[0.3em]">AKTİF ÖNGÖRÜ MOTORU</span>
              </div>
              <h4 className="text-4xl font-black text-white uppercase tracking-tighter italic">NEURAL ENGINE v4.2</h4>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest max-w-md leading-relaxed">
                CANLI VERİ AKIŞI ÜZERİNDEN GELECEK 30 GÜNLÜK TRENDLERİ ANALİZ EDİYOR. %94.2 DOĞRULUK ORANI İLE ÇALIŞIYOR.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/5">
            {[
              { label: 'TREND GÜVENİ', val: '94.2%', icon: <Target className="w-4 h-4 text-[var(--color-neon)]" /> },
              { label: 'VERİ DERİNLİĞİ', val: '1.2 PB', icon: <Activity className="w-4 h-4 text-green-400" /> },
              { label: 'RİSK SKORU', val: 'LOW', icon: <TrendingUp className="w-4 h-4 text-yellow-400" /> }
            ].map(stat => (
              <div key={stat.label} className="space-y-1">
                <div className="flex items-center space-x-2">
                  {stat.icon}
                  <span className="text-[10px] font-black text-white uppercase tracking-widest italic">{stat.val}</span>
                </div>
                <div className="text-[8px] font-bold text-gray-600 uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </Card>

        <Card glass className="p-6 border-white/5 space-y-6">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="w-5 h-5 text-yellow-400" />
            <span className="text-[10px] font-black text-white uppercase tracking-widest">KRİTİK UYARILAR</span>
          </div>
          
          <div className="space-y-4">
            {[1, 2].map(i => (
              <div key={i} className="p-4 bg-yellow-400/5 rounded-2xl border border-yellow-400/10 space-y-2">
                <div className="text-[10px] font-black text-yellow-400 uppercase tracking-widest italic">ANOMALİ TESPİT EDİLDİ</div>
                <p className="text-[9px] font-bold text-gray-400 uppercase leading-relaxed">TRAFİK HACMİNDE BEKLENMEDİK ARTIŞ GÖZLENDİ. SİSTEM OTOMATİK OLARAK ÖLÇEKLENDİ.</p>
              </div>
            ))}
          </div>
          
          <Button variant="secondary" className="w-full py-4 text-[10px] font-black uppercase tracking-widest">TÜM ANALİZLERİ GÖR</Button>
        </Card>
      </div>
    </div>
  );
};

export default PredictiveAnalytics;

import React, { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ChevronDown, 
  ChevronUp, 
  HelpCircle, 
  Search, 
  Zap, 
  Shield, 
  CreditCard, 
  Settings,
  MessageSquare,
  ArrowRight
} from 'lucide-react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { cn } from '@/utils/cn'

const FAQItem = ({ question, answer, isOpen, onToggle }) => {
  return (
    <div className="mb-4">
      <button
        onClick={onToggle}
        className={cn(
          "w-full text-left p-6 glass rounded-2xl border border-white/5 transition-all duration-500 group relative overflow-hidden",
          isOpen ? "bg-white/5 border-[var(--color-neon)]/30 shadow-[0_0_30px_rgba(0,240,255,0.05)]" : "hover:bg-white/5 hover:border-white/10"
        )}
      >
        {/* Active Glow Effect */}
        {isOpen && (
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-neon)]/5 to-transparent pointer-events-none" />
        )}

        <div className="flex items-center justify-between relative z-10">
          <span className={cn(
            "text-lg font-bold transition-colors duration-300",
            isOpen ? "text-[var(--color-neon)]" : "text-white group-hover:text-white"
          )}>
            {question}
          </span>
          <div className={cn(
            "p-2 rounded-lg bg-white/5 border border-white/5 transition-all duration-500",
            isOpen && "rotate-180 border-[var(--color-neon)]/30 bg-[var(--color-neon)]/10"
          )}>
            <ChevronDown className={cn(
              "w-5 h-5 transition-colors",
              isOpen ? "text-[var(--color-neon)]" : "text-gray-500"
            )} />
          </div>
        </div>
        
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            >
              <p className="mt-5 text-gray-400 leading-relaxed border-t border-white/5 pt-5 text-sm font-medium">
                {answer}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </div>
  )
}

const FAQ = () => {
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [openIndex, setOpenIndex] = useState(null)

  const categories = [
    { id: 'all', label: 'TÜMÜ', icon: Zap },
    { id: 'general', label: 'GENEL', icon: MessageSquare },
    { id: 'security', label: 'GÜVENLİK', icon: Shield },
    { id: 'pricing', label: 'FİYATLANDIRMA', icon: CreditCard },
    { id: 'technical', label: 'TEKNİK', icon: Settings }
  ]

  const faqs = [
    {
      category: 'security',
      question: 'Platformunuz nasıl bir güvenlik sağlıyor?',
      answer: 'Platformumuz, gerçek zamanlı AI modelleri kullanarak ağ trafiğinizi, kullanıcı davranışlarını ve sistem günlüklerini analiz eder. Anomalileri henüz bir saldırıya dönüşmeden tespit eder ve otomatik olarak savunma mekanizmalarını devreye sokar.'
    },
    {
      category: 'technical',
      question: 'Mevcut sistemlerimle entegrasyonu ne kadar sürer?',
      answer: 'Gelişmiş API mimarimiz sayesinde Slack, GitHub, AWS, Google Cloud gibi popüler servislerle entegrasyon süresi genellikle 5 dakikadan azdır. Özel sistemler için kapsamlı SDK ve dokümantasyon desteği sağlıyoruz.'
    },
    {
      category: 'general',
      question: 'Verilerimiz nerede depolanıyor?',
      answer: 'Verileriniz, seçtiğiniz bölgeye bağlı olarak (örneğin Avrupa Birliği standartlarına uygun olarak Almanya veya İrlanda) yüksek güvenlikli AWS ve Google Cloud altyapılarında, end-to-end şifreleme ile depolanır.'
    },
    {
      category: 'pricing',
      question: 'Enterprise paketi için özel bir fiyatlandırma alabilir miyim?',
      answer: 'Kesinlikle. Büyük ölçekli kurumlar için özel altyapı ihtiyaçları, özel ML model eğitimi ve yerinde kurulum seçeneklerimize göre size özel bir teklif hazırlayabiliriz. İletişim sayfamızdan bize ulaşabilirsiniz.'
    },
    {
      category: 'technical',
      question: 'AI modelleriniz ne sıklıkla güncelleniyor?',
      answer: 'Modellerimiz, küresel tehdit istihbarat ağımızdan gelen yeni verilerle sürekli olarak güncellenir. Ayrıca platform, her hafta yeni çıkan siber güvenlik tehditlerine karşı optimize edilmiş model güncellemelerini otomatik olarak alır.'
    },
    {
      category: 'security',
      question: 'Veri gizliliği standartlarınız nelerdir?',
      answer: 'Axiar, SOC2 ve GDPR uyumludur. Tüm veriler dinlenme ve iletim sırasında AES-256 ile şifrelenir. Ayrıca "Sıfır Güven" (Zero Trust) mimarisi ile her istek doğrulanır.'
    }
  ]

  const filteredFaqs = useMemo(() => {
    return faqs.filter(faq => {
      const matchesCategory = activeCategory === 'all' || faq.category === activeCategory
      const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [activeCategory, searchQuery])

  return (
    <section id="faq" className="py-32 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-[var(--color-neon)]/20 to-transparent" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex p-3 rounded-2xl bg-[var(--color-neon)]/10 border border-[var(--color-neon)]/20 mb-6 shadow-[0_0_20px_rgba(0,240,255,0.1)]"
          >
            <HelpCircle className="w-8 h-8 text-[var(--color-neon)]" />
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 uppercase tracking-tighter">
            SIKÇA SORULAN <span className="text-[var(--color-neon)]">SORULAR</span>
          </h2>
          <p className="text-gray-400 text-sm font-bold uppercase tracking-[0.3em]">
            SİSTEM VE PLATFORM HAKKINDA TEKNİK BİLGİ MERKEZİ
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-12 group">
          <div className="absolute inset-0 bg-[var(--color-neon)]/5 blur-xl group-focus-within:bg-[var(--color-neon)]/10 transition-all duration-500 rounded-3xl" />
          <div className="relative flex items-center bg-black/40 border border-white/5 rounded-2xl p-2 group-focus-within:border-[var(--color-neon)]/30 transition-all">
            <Search className="w-5 h-5 text-gray-500 ml-4" />
            <input 
              type="text"
              placeholder="SORU VEYA ANAHTAR KELİME ARA..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border-none focus:ring-0 text-white placeholder-gray-600 px-4 py-3 text-xs font-black tracking-widest uppercase"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "flex items-center space-x-2 px-5 py-2.5 rounded-xl border text-[10px] font-black uppercase tracking-widest transition-all duration-300",
                activeCategory === cat.id 
                  ? "bg-[var(--color-neon)]/10 border-[var(--color-neon)]/30 text-white shadow-[0_0_20px_rgba(0,240,255,0.1)]" 
                  : "bg-white/5 border-white/5 text-gray-500 hover:text-white hover:border-white/10"
              )}
            >
              <cat.icon className={cn("w-3.5 h-3.5", activeCategory === cat.id ? "text-[var(--color-neon)]" : "text-gray-600")} />
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* FAQ List */}
        <motion.div
          layout
          className="min-h-[400px]"
        >
          <AnimatePresence mode="popLayout">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, index) => (
                <motion.div
                  key={faq.question}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <FAQItem 
                    question={faq.question} 
                    answer={faq.answer} 
                    isOpen={openIndex === index}
                    onToggle={() => setOpenIndex(openIndex === index ? null : index)}
                  />
                </motion.div>
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20 border-2 border-dashed border-white/5 rounded-3xl"
              >
                <div className="text-gray-600 font-black uppercase tracking-widest text-[10px]">
                  ARAMANIZA UYGUN SONUÇ BULUNAMADI
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* CTA Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-20"
        >
          <Card glass neon className="p-10 border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <MessageSquare className="w-32 h-32 text-[var(--color-neon)]" />
            </div>
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-3 text-center md:text-left">
                <h4 className="text-2xl font-black text-white uppercase tracking-tight italic">HALA SORUNUZ MU VAR?</h4>
                <p className="text-sm text-gray-400 font-medium max-w-md">
                  TEKNİK DESTEK EKİBİMİZ 7/24 SİZE YARDIMCI OLMAK İÇİN BURADA. BİZE MESAJ GÖNDERİN VEYA DOKÜMANTASYONA GÖZ ATIN.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="secondary" className="px-8 py-4 text-[10px] font-black uppercase tracking-widest bg-white/5 border-white/10 hover:bg-white/10">
                  DOKÜMANTASYON
                </Button>
                <Link to="/#contact">
                  <Button className="px-8 py-4 text-[10px] font-black uppercase tracking-widest shadow-[0_0_20px_rgba(0,240,255,0.2)]">
                    BİZE ULAŞIN
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}

export default FAQ

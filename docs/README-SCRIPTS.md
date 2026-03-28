# 🚀 Axiar Intelligence Platform - Scripts

## 📜 Script Dosyaları

Proje yönetimini kolaylaştırmak için özel `.bat` script'leri oluşturulmuştur.

### 🎯 Kullanım

#### 1. **start.bat** - Tam Başlatma
```bash
# Çift tıkla veya komut satırından çalıştır:
start.bat
```

**Yapar:**
- ✅ Node.js ve npm kontrolü
- 📦 Bağımlılıkları kurar (gerekirse)
- 🗄️ Supabase'i başlatır
- 🚀 Development server'ı başlatır
- 🌐 Browser'ı otomatik açar

---

#### 2. **start-dev.bat** - Hızlı Başlatma
```bash
# Sadece frontend için:
start-dev.bat
```

**Yapar:**
- ✅ Node.js kontrolü
- 📦 Bağımlılıkları kurar (gerekirse)
- 🚀 Sadece development server'ı başlatır
- 🌐 Browser'ı otomatik açar

---

#### 3. **build.bat** - Build İşlemi
```bash
# Production build için:
build.bat
```

**Yapar:**
- ✅ Node.js kontrolü
- 📦 Bağımlılıkları kurar (gerekirse)
- 🧹 Önceki build'i temizler
- 🏗️ Production build'i oluşturur
- 📊 Preview seçeneği sunar

---

## 🛠️ Manuel Komutlar

### Development
```bash
cd client
npm install
npm run dev
```

### Build
```bash
cd client
npm run build
npm run preview
```

### Supabase
```bash
supabase start
supabase stop
supabase db reset
```

---

## 📋 Gereksinimler

- **Node.js** 18+ - [nodejs.org](https://nodejs.org/)
- **npm** - Node.js ile birlikte gelir
- **Supabase CLI** - `npm install -g supabase`

---

## 🔧 Sorun Giderme

### Node.js Hatası
```
[HATA] Node.js bulunamadı!
```
**Çözüm:** [Node.js](https://nodejs.org/) kurun

### Port Hatası
```
Port 5173 is already in use
```
**Çözüm:** 
```bash
# Farklı port ile başlat:
cd client
npm run dev -- --port 3000
```

### Bağımlılık Hatası
```
[HATA] Bağımlılıklar kurulamadı!
```
**Çözüm:**
```bash
# Temiz kurulum:
cd client
rmdir /s /q node_modules
del package-lock.json
npm install
```

---

## 🌟 İpuçları

1. **İlk kullanım:** `start.bat` kullanın
2. **Hızlı başlatma:** `start-dev.bat` kullanın
3. **Deploy öncesi:** `build.bat` kullanın
4. **Hata durumunda:** Manuel komutları deneyin
5. **Browser açılmıyorsa:** Manuel olarak `http://localhost:5173` açın

---

## 📞 Destek

Sorun yaşarsanız:
- 📧 **E-posta:** support@axiar.io
- 🐛 **GitHub Issues:** Proje repository'si
- 💬 **Discord:** Axiar Community

---

**Happy Coding! 🚀**

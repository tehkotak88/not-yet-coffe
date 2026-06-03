import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "motion/react";
import { Coffee, Instagram, MapPin, Clock, Star, Zap, X, Home, Info, Phone, Menu as MenuIcon, MessageCircle } from "lucide-react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

const TRANSLATIONS = {
  est: "Est. 2025",
  nowBrewing: "Now Brewing in Makassar",
  notYet: "NOT YET",
  coffee: "COFFEE",
  premiumLocalBlend: "Premium Local Blend",
  openDaily: "Open Daily",
  location: "Location",
  minasaUpa: "Minasa Upa",
  tambahEspresso: "TAMBAH ESPRESSO +2K",
  startsFrom: "Starts From",
  best: "Best",
  seller: "Seller",
  premiumSelection: "Premium Selection",
  bestSeller: "Best Seller",
  productDescription: "Product Description",
  serviceStyle: "Service Style",
  iceHotAvailable: "Ice / Hot Available",
  availability: "Availability",
  inStock: "In Stock",
  filosofiTitle1: "Filosofi di Balik Setiap ",
  filosofiTitle2: "Seduhan Kami",
  filosofiP1_1: "Di ",
  filosofiP1_2: "Not Yet Coffee",
  filosofiP1_3: ", kami percaya bahwa kopi bukan sekadar minuman, melainkan sebuah perjalanan rasa yang patut dinikmati tanpa terburu-buru. Itulah mengapa setiap cangkir yang kami sajikan adalah hasil dari dedikasi tinggi, mulai dari pemilihan biji kopi terbaik hingga metode penyeduhan yang presisi untuk mengeluarkan profil rasa yang paling autentik.",
  filosofiP2_1: "Berlokasi di ketenangan ",
  filosofiP2_2: "BTN Minasa Upa",
  filosofiP2_3: ", kedai kami dirancang sebagai pelarian sejenak dari hiruk-pikuk rutinitas. Kami menyediakan ruang yang bukan hanya sekadar tempat duduk, tapi sebuah ekosistem kreatif di mana Anda bisa bekerja dengan fokus atau berbagi tawa bersama komunitas pecinta kopi Makassar lainnya.",
  filosofiP3_1: "Kami mengundang Anda untuk berkunjung setiap ",
  filosofiP3_2: "hari",
  filosofiP3_3: ", mulai pukul 08:00 pagi. Khusus pada ",
  filosofiP3_4: "akhir pekan",
  filosofiP3_5: ", kami buka hingga pukul 00:00 malam untuk menemani waktu santai Anda lebih lama. Jangan lupa untuk mengikuti linimasa kami di Instagram guna mendapatkan info promo eksklusif dan menjadi bagian dari semangat komunitas kami yang terus tumbuh. Selamat menikmati waktu tunggu Anda bersama kami.",
  notYetCoffee: "NOTYET COFFEE",
  visitUs: "Visit Us",
  ourLocation: "OUR LOCATION",
  btnMinasaUpaLine1: "BTN MINASA UPA BLOK F 15 / 14,",
  makassar: "MAKASSAR",
  chatWithUs: "Chat With Us",
  officialGuide: "Official Guide",
  informasi: "INFORMASI",
  coffeeSeries: "COFFEE SERIES",
  matchaSeries: "MATCHA SERIES",
  nonCoffee: "NON COFFEE",
  satuLiter: "SATU LITER",
  whatsAppOrder: "WhatsApp Order",
  followUsForUpdates: "Follow us for updates",
  btnMinasaUpaFull: "BTN MINASA UPA BLOK F 15 / 14",
  visitOurLocalOutlet: "Visit our local outlet",
  tambahEspresso2k: "*TAMBAH ESPRESSO 2K*",
  setiapHari: "* SETIAP HARI *",
  premiumBlend: "* PREMIUM BLEND *",
  bestSellerBadge: "★ BEST SELLER",
  closeModal: "Close Modal",
  chatOnWhatsApp: "Chat on WhatsApp",
  notYetCoffeeLogoAlt: "Not Yet Coffee Logo",
  nyLogoAlt: "NY Logo",
  logoAlt: "Logo",
  phoneNumber: "+62 881-8161-616",
  instagramHandle: "@notyetcoffee"
};

const MENU_DATA = {
  coffee: [
    { id: 16, name: "KOPI NOT AREN", price: "13K", best: true, desc: "Kopi susu dengan paduan gula aren asli yang memberikan rasa manis alami dan aroma kopi yang kuat. Diseduh menggunakan ekstraksi biji kopi House Blend (Arabica & Robusta) pilihan nusantara.", image: "/gambar/kopi not aren.jpeg" },
    { id: 15, name: "KOPI SEA SALT BUTTERSCOTCH", price: "18K", best: true, desc: "Kombinasi sempurna antara espresso premium, susu segar, dan sirup butterscotch dengan sentuhan sea salt yang gurih. Menggunakan racikan biji kopi pilihan (House Blend).", image: "/gambar/KOPI SEA SALT BUTTERSCOT.png" },
    { id: 2, name: "KOPI SALTED CARAMEL", price: "18K", best: true, desc: "Menu andalan kami: Perpaduan espresso dengan gula aren organik murni dan sentuhan sea salt yang memberikan keseimbangan rasa manis dan gurih. Diekstrak dari biji kopi Arabica berkualitas tinggi.", image: "/gambar/Kopi Salted Caramel.png" },
    { id: 1, name: "ICE KOPI NOT LATTE / HOT", price: "13K", best: false, desc: "Espresso double shot yang kuat dipadukan dengan susu segar yang dikukus hingga berbusa lembut, menciptakan tekstur creamy yang sempurna. Diseduh menggunakan biji kopi 100% Arabica.", image: "/gambar/Kopi Not Susu.png" },
    { id: 3, name: "ICE KOPI NOT SUSU / HOT", price: "13K", best: false, desc: "Sentuhan rasa klasik yang membawa nostalgia, menggabungkan kopi hitam pekat dengan kental manis premium yang kaya rasa. Menggunakan racikan biji kopi House Blend spesial kami.", image: "/gambar/Kopi Not Susu.png" },
    { id: 4, name: "ICE AMERICANO / HOT", price: "10K", best: false, desc: "Menggunakan biji kopi 100% Arabica dengan menggunakan kualitas beans premium blend.", image: "/gambar/americano.png" },
    { id: 8, name: "KOPI NOT PANCO (PANDAN COCONUT)", price: "15K", best: false, desc: "Perpaduan unik espresso (dari biji kopi House Blend premium) dengan pandan dan kelapa yang memberikan aroma khas dan rasa eksotis. Sempurna untuk mencari cita rasa yang berbeda dan memorable.", image: "/gambar/Kopi Not Panco dan Pandan Coconut.jpeg" },
  ],
  nonCoffee: [
    { id: 5, name: "ICE COKELAT / HOT", price: "13K", best: false, desc: "Minuman cokelat hitam premium pilihan yang dipadukan dengan susu segar full cream, memberikan sensasi rasa cokelat asli yang mendalam, kental, dan mewah tanpa perasa buatan.", image: "/gambar/Cokelat.png" },
    { id: 7, name: "RED VELVET", price: "13K", best: false, desc: "Ekstrak rasa kue Red Velvet asli yang kaya dan manis lembut dipadukan dengan susu segar krimi, menghadirkan sensasi makan kue premium dalam setiap tegukan.", image: "/gambar/Red velvet.png" },
    { id: 10, name: "THAI TEA", price: "13K", best: false, desc: "Seduhan daun teh hitam asli khas Thailand pilihan yang disajikan dengan takaran kental manis dan susu evaporasi yang pas, menciptakan profil rasa teh yang otentik dan menyegarkan.", image: "/gambar/Thai Tea.png" },
  ],
  matcha: [
    { id: 6, name: "ICE MATCHA LATTE / HOT", price: "18K", best: true, desc: "Bubuk Matcha premium 100% asli Jepang yang disajikan dengan susu segar dan foam lembut, diolah dengan resep rahasia Not Yet Coffee untuk rasa otentik yang tak terlupakan.", image: "/gambar/Matcha Latte.png" },
    { id: 17, name: "MATCHA STROBERI", price: "20K", best: true, desc: "Perpaduan unik antara bubuk matcha premium Jepang dan selai stroberi segar buatan sendiri (homemade) yang memberikan rasa manis dan asam yang sangat seimbang.", image: "/gambar/Matcha Stroberi.png" }
  ],
  liter: [
    { id: 12, name: "SATU LITER MATCHA", price: "85K", best: false, desc: "Minuman satu liter dari bubuk Matcha premium asli Jepang. Menyajikan rasa teh hijau autentik yang kaya antioksidan dengan tekstur creamy yang memuaskan, sangat cocok untuk berbagi.", image: "/gambar/Matcha Latteee.png" },
    { id: 13, name: "SATU LITER KOPI NOT AREN", price: "75K", best: false, desc: "Kopi satu liter yang diekstrak dari biji kopi Robusta kualitas terbaik, dicampur dengan gula aren murni alami. Memberikan rasa manis legit dan aroma kopi yang kuat.", image: "/gambar/Kopi Not Arennn.jpeg" },
    { id: 14, name: "SATU LITER COKLAT", price: "75K", best: false, desc: "Cokelat hitam premium asli dalam kemasan satu liter, dipadukan dengan susu segar full cream untuk sensasi rasa cokelat yang intens dan creamy. Sangat sempurna untuk acara keluarga.", image: "/gambar/Coklattt.png" },
  ]
};

const CatalogHeader = () => (
  <header className="relative pt-32 pb-20 px-6 overflow-hidden">
    {/* Decorative Elements */}
    <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-[120px] -translate-y-1/2" />
    <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-white/5 rounded-full blur-[100px] translate-y-1/2" />

    <div className="max-w-6xl mx-auto relative z-10">
      <div className="flex flex-col md:flex-row items-center justify-between gap-12 mb-20">
        <motion.div
          initial={{ y: -30, opacity: 0, rotate: -5 }}
          animate={{ y: 0, opacity: 1, rotate: -3 }}
          whileHover={{ rotate: 0, scale: 1.05 }}
          className="flex flex-col relative"
        >
          <div className="bg-white p-6 rounded-[32px] shadow-[20px_20px_60px_rgba(0,0,0,0.3)] border-4 border-white/50 relative group">
            <img src="/gambar/logo.jpeg" alt={TRANSLATIONS.notYetCoffeeLogoAlt} className="w-40 h-40 object-contain rounded-2xl" />
            <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
          </div>
          {/* Badge */}
          <div className="absolute -bottom-4 -right-4 bg-white text-brand-red px-4 py-2 rounded-2xl shadow-xl font-black text-[10px] uppercase tracking-widest rotate-6 border-2 border-brand-red/10">
            {TRANSLATIONS.est}
          </div>
        </motion.div>

        <motion.div
          initial={{ x: 30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="text-center md:text-right"
        >
          <div className="space-y-6">
            <div className="flex flex-col items-center md:items-end gap-2">
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white text-brand-red px-5 py-1.5 rounded-full font-black text-[11px] uppercase tracking-[0.3em] shadow-[0_10px_30px_rgba(255,255,255,0.2)]"
              >
                {TRANSLATIONS.nowBrewing}
              </motion.div>
              <h1 className="font-display font-black text-5xl md:text-7xl text-white tracking-tighter leading-none drop-shadow-2xl">
                {TRANSLATIONS.notYet}<br /><span className="text-white/40 italic">{TRANSLATIONS.coffee}</span>
              </h1>
              <p className="font-display font-bold text-sm text-white/60 tracking-[0.4em] uppercase mt-2">{TRANSLATIONS.premiumLocalBlend}</p>
            </div>
            
            <div className="flex items-center justify-center md:justify-end gap-8 pt-4">
              <div className="flex items-center gap-3 group cursor-default">
                <div className="p-2 bg-white/10 rounded-xl group-hover:bg-white/20 transition-colors">
                  <Clock className="w-4 h-4 text-white" />
                </div>
                <div className="text-left">
                  <p className="text-[9px] font-black text-white/40 uppercase tracking-widest leading-none mb-1">{TRANSLATIONS.openDaily}</p>
                  <p className="text-[11px] font-bold text-white uppercase tracking-wider">{"08:00 - 23:00"}</p>
                </div>
              </div>
              <div className="h-8 w-[1px] bg-white/10" />
              <div className="flex items-center gap-3 group cursor-default">
                <div className="p-2 bg-white/10 rounded-xl group-hover:bg-white/20 transition-colors">
                  <MapPin className="w-4 h-4 text-white" />
                </div>
                <div className="text-left">
                  <p className="text-[9px] font-black text-white/40 uppercase tracking-widest leading-none mb-1">{TRANSLATIONS.location}</p>
                  <p className="text-[11px] font-bold text-white uppercase tracking-wider">{TRANSLATIONS.minasaUpa}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Integrated Promo Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/5 backdrop-blur-xl border border-white/10 p-4 rounded-3xl flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 shadow-2xl max-w-4xl mx-auto"
      >
        <span className="text-white font-black italic tracking-[0.2em] text-[10px] uppercase">
          {TRANSLATIONS.setiapHari}
        </span>
        <div className="h-6 w-[2px] bg-white/20 hidden md:block" />
        <span className="bg-white text-brand-red px-4 py-1 text-[11px] font-black uppercase rotate-1 rounded shadow-lg">
          {TRANSLATIONS.tambahEspresso}
        </span>
        <div className="h-6 w-[2px] bg-white/20 hidden md:block" />
        <span className="text-white font-black italic tracking-[0.2em] text-[10px] uppercase">
          {TRANSLATIONS.premiumBlend}
        </span>
      </motion.div>
    </div>
  </header>
);

const PriceTag = ({ price }: { price: string }) => (
  <motion.div
    initial={{ scale: 0, rotate: -20 }}
    whileInView={{ scale: 1, rotate: -5 }}
    whileHover={{ scale: 1.1, rotate: 0 }}
    className="relative z-20"
  >
    <div className="bg-white text-brand-red px-4 py-2 sm:px-6 sm:py-3 rounded-xl sm:rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.3)] border-2 border-brand-red/5 flex flex-col items-center">
      <span className="text-[7px] sm:text-[8px] font-black uppercase tracking-[0.3em] opacity-40 mb-0.5 sm:mb-1">{TRANSLATIONS.startsFrom}</span>
      <span className="font-display font-black text-xl sm:text-2xl tracking-tighter leading-none">
        {price}
      </span>
    </div>
  </motion.div>
);

const BestSellerSign = () => (
  <motion.div
    initial={{ scale: 0, rotate: 20 }}
    whileInView={{ scale: 1, rotate: 10 }}
    whileHover={{ scale: 1.1, rotate: 0 }}
    className="relative z-20"
  >
    <div className="bg-[#FFD700] p-0.5 rounded-2xl shadow-xl">
      <div className="bg-white px-4 py-2 rounded-[14px] flex items-center gap-2 border-2 border-[#FFD700]/20">
        <Star className="w-4 h-4 text-[#FFD700] fill-[#FFD700]" />
        <div className="flex flex-col">
          <span className="font-display font-black text-[9px] text-black tracking-widest leading-none uppercase">{TRANSLATIONS.best}</span>
          <span className="font-display font-black text-[9px] text-black tracking-widest leading-none uppercase">{TRANSLATIONS.seller}</span>
        </div>
      </div>
    </div>
  </motion.div>
);

const MenuItem = ({ item, onClick }: { item: any, onClick: () => void, key?: string | number }) => {
  const [isHovering, setIsHovering] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
    if (!isHovering) setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    x.set(0);
    y.set(0);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      style={{ perspective: 1200 }}
      className="relative flex flex-col items-center group mb-24 px-4"
    >
      <motion.div
        animate={!isHovering ? {
          rotateX: [1, -1, 1],
          rotateY: [1.5, -1.5, 1.5],
        } : {}}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          rotateX: isHovering ? rotateX : 0,
          rotateY: isHovering ? rotateY : 0,
          transformStyle: "preserve-3d",
        }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        className="relative w-full max-w-[300px] aspect-[4/5] cursor-pointer focus:outline-none"
      >
        <div 
          style={{ transform: "translateZ(120px)" }}
          className="absolute top-4 left-4 z-[100] pointer-events-none"
        >
          <PriceTag price={item.price} />
        </div>
        
        {item.best && (
          <div 
            style={{ transform: "translateZ(110px)" }}
            className="absolute bottom-4 right-4 z-[90] pointer-events-none"
          >
            <BestSellerSign />
          </div>
        )}

        <div className="w-full h-full rounded-[48px] overflow-hidden bg-white shadow-[0_30px_60px_rgba(0,0,0,0.3)] group-hover:shadow-[0_50px_100px_rgba(0,0,0,0.5)] transition-shadow duration-500 relative">
          <img
            src={item.image}
            alt={item.name}
            style={{ transform: "translateZ(10px)" }}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            referrerPolicy="no-referrer"
          />
          {/* Glare effect */}
          <motion.div 
            style={{
              background: useTransform(
                [mouseXSpring, mouseYSpring],
                ([mx, my]) => `radial-gradient(circle at ${((mx as number) + 0.5) * 100}% ${((my as number) + 0.5) * 100}%, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 70%)`
              ),
              zIndex: 40,
              pointerEvents: "none"
            }}
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
          />
        </div>
      </motion.div>

      <motion.div
        className="text-center w-full mt-6"
        style={{ transform: "translateZ(30px)" }}
      >
        <h3 className="font-display font-black text-[22px] leading-tight tracking-tight text-white mb-1 uppercase group-hover:tracking-wider transition-all duration-300">
          {item.name}
        </h3>
        {/* Mobile-only Badges */}
        <div className="flex flex-col items-center gap-2 mb-3 sm:hidden">
          {item.best && (
            <span className="text-[8px] bg-amber-400 text-black px-3 py-1 rounded-full font-black uppercase tracking-[0.2em] shadow-lg">
              {TRANSLATIONS.bestSellerBadge}
            </span>
          )}
          <span className="bg-white text-brand-red px-5 py-1.5 rounded-full font-black text-xs shadow-xl tracking-tighter">
            {item.price}
          </span>
        </div>
        <p className="font-sans text-[10px] text-white/70 leading-relaxed max-w-[200px] mx-auto italic opacity-80 group-hover:opacity-100 transition-opacity">
          {item.desc.substring(0, 80)}...
        </p>
      </motion.div>
    </motion.div>
  );
};

const INFO_DATA = [
  {
    id: 1,
    title: "FRESHLY BREWED",
    value: "Setiap cangkir kopi kami diseduh dengan metode presisi segera setelah Anda memesan. Ini menjamin aroma yang kuat dan profil rasa biji kopi pilihan tetap terjaga hingga ke tangan Anda.",
    icon: Coffee
  },
  {
    id: 2,
    title: "STRATEGIC LOCATION",
    value: "BTN MINASA UPA BLOK F 15 / 14, Makassar. Kedai kami menawarkan suasana yang tenang dan nyaman, menjadikannya tempat ideal untuk bekerja maupun bersantai.",
    icon: MapPin
  },
  {
    id: 3,
    name: "OPERATIONAL HOURS",
    value: "Kami melayani setiap hari mulai pukul 08:00 pagi. Untuk hari kerja kami buka hingga 23:00, sementara pada akhir pekan (Sabtu & Minggu) kami melayani lebih lama hingga pukul 00:00 malam.",
    icon: Clock
  },
  {
    id: 4,
    name: "VIBRANT COMMUNITY",
    value: "Bergabunglah dengan komunitas pecinta kopi kami di Instagram @notyetcoffee. Dapatkan informasi terkini mengenai promo harian, event musik, hingga edukasi seputar proses pengolahan kopi.",
    icon: Instagram
  },
];

const InfoCard = ({ item }: { item: any, key?: string | number }) => {
  const [isHovering, setIsHovering] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
    if (!isHovering) setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      style={{ perspective: 1000 }}
      className="relative h-full"
    >
      <motion.div
        animate={!isHovering ? {
          rotateX: [1, -1, 1],
          rotateY: [2, -2, 2],
        } : {}}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          rotateX: isHovering ? rotateX : 0,
          rotateY: isHovering ? rotateY : 0,
          transformStyle: "preserve-3d",
        }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="bg-white p-10 rounded-[40px] border-4 border-white/20 shadow-2xl flex flex-col items-center text-center group h-full cursor-default select-none relative overflow-hidden"
      >
        <div 
          style={{ transform: "translateZ(40px)" }}
          className="w-20 h-20 rounded-3xl bg-brand-red flex items-center justify-center mb-8 shadow-xl group-hover:rotate-12 transition-transform shrink-0"
        >
          <item.icon className="w-10 h-10 text-white" />
        </div>
        
        <h4 
          style={{ transform: "translateZ(30px)" }}
          className="font-display font-black text-brand-red text-xl uppercase tracking-widest mb-4"
        >
          {item.name || item.title}
        </h4>
        
        <p 
          style={{ transform: "translateZ(20px)" }}
          className="font-sans font-semibold text-brand-red/80 text-[11px] leading-relaxed uppercase italic"
        >
          {item.value}
        </p>

        {/* Glare effect */}
        <motion.div 
          style={{
            background: useTransform(
              [mouseXSpring, mouseYSpring],
              ([mx, my]) => `radial-gradient(circle at ${((mx as number) + 0.5) * 100}% ${((my as number) + 0.5) * 100}%, rgba(185,28,28,0.05) 0%, rgba(185,28,28,0) 80%)`
            ),
            zIndex: 0
          }}
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
        />
      </motion.div>
    </motion.div>
  );
};

const MenuModal = ({ item, onClose }: { item: any, onClose: () => void }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();

      // Basic focus trap or arrow nav inside modal could go here
    };

    window.addEventListener("keydown", handleKeyDown);

    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  // Focus modal on mount
  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.focus();
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[999] flex items-start md:items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-lg overflow-y-auto overscroll-none"
      onClick={onClose}
    >
      {/* Enhanced Close Button — Floating at the top right, always on top of everything */}
      <motion.button
        initial={{ scale: 0, rotate: -90 }}
        animate={{ scale: 1, rotate: 0 }}
        onClick={onClose}
        className="fixed top-4 right-4 md:top-10 md:right-10 z-[1001] bg-white text-brand-red p-3 md:p-4 rounded-full shadow-[0_0_30px_rgba(0,0,0,0.3)] hover:scale-110 active:scale-95 transition-all group"
        aria-label={TRANSLATIONS.closeModal}
      >
        <X className="w-6 h-6 md:w-8 md:h-8 group-hover:rotate-90 transition-transform duration-300" />
      </motion.button>

      <motion.div
        ref={modalRef}
        tabIndex={-1}
        initial={{ scale: 0.8, y: 50, opacity: 0, rotateX: 10 }}
        animate={{ scale: 1, y: 0, opacity: 1, rotateX: 0 }}
        exit={{ scale: 0.8, y: 50, opacity: 0, rotateX: -10 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        style={{ transformStyle: "preserve-3d", perspective: 1200 }}
        className="bg-white rounded-[32px] md:rounded-[40px] w-full max-w-4xl overflow-hidden shadow-[0px_50px_100px_rgba(0,0,0,0.6)] relative focus:outline-none my-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex flex-col md:flex-row h-full max-h-none">
          {/* Product Image Section */}
          <div className="md:w-1/2 relative bg-gray-50 overflow-hidden">
            <motion.div
              animate={{
                rotateX: [0, 3, -3, 0],
                rotateY: [0, -4, 4, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{ transformStyle: "preserve-3d", perspective: 1000 }}
              className="w-full h-full"
            >
              <motion.img
                src={item.image}
                alt={item.name}
                whileHover={{ scale: 1.05, rotateZ: 1 }}
                className="w-full h-full object-cover min-h-[300px] md:min-h-[500px] shadow-2xl"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
          </div>

          {/* Product Details Section */}
          <div className="md:w-1/2 p-8 md:p-14 flex flex-col justify-center bg-white relative">
            <div className="mb-8 pt-2 md:pt-0">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-brand-red text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-brand-red/20">
                  {TRANSLATIONS.premiumSelection}
                </span>
                {item.best && (
                  <span className="bg-amber-400 text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-amber-400/20">
                    {TRANSLATIONS.bestSeller}
                  </span>
                )}
              </div>

              <h2 className="font-display font-black text-4xl md:text-5xl text-brand-red leading-[0.9] mb-4 uppercase tracking-tighter">
                {item.name}
              </h2>

              <div className="flex items-center gap-4 mb-2">
                <div className="h-[2px] w-16 bg-brand-red/20" />
                <span className="font-display font-black text-brand-red text-3xl tracking-tight">{item.price}</span>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-black/20 mb-3">{TRANSLATIONS.productDescription}</h4>
                <p className="font-sans text-brand-red/80 text-base leading-relaxed italic font-medium">
                  {`"${item.desc}"`}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-8 py-8 border-y border-brand-red/10">
                <div>
                  <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-black/20 mb-2">{TRANSLATIONS.serviceStyle}</h4>
                  <p className="font-black text-sm text-brand-red uppercase tracking-widest">{TRANSLATIONS.iceHotAvailable}</p>
                </div>
                <div>
                  <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-black/20 mb-2">{TRANSLATIONS.availability}</h4>
                  <p className="font-black text-sm text-brand-red uppercase tracking-widest">{TRANSLATIONS.inStock}</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const InfoParagraph = () => {
  const [isHovering, setIsHovering] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
    if (!isHovering) setIsHovering(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      style={{ perspective: 1000 }}
      className="max-w-4xl mx-auto relative group"
    >
      <motion.div
        animate={!isHovering ? {
          rotateX: [0.5, -0.5, 0.5],
          rotateY: [1, -1, 1],
        } : {}}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          rotateX: isHovering ? rotateX : 0,
          rotateY: isHovering ? rotateY : 0,
          transformStyle: "preserve-3d",
        }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => {
          setIsHovering(false);
          x.set(0);
          y.set(0);
        }}
        className="bg-white/5 backdrop-blur-sm p-10 md:p-16 rounded-[48px] border border-white/10 text-center md:text-left relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl group-hover:bg-white/10 transition-colors" />

        <div style={{ transform: "translateZ(30px)" }} className="relative z-10">
          <h3 className="font-display font-black text-white text-3xl md:text-4xl mb-8 leading-tight uppercase tracking-tight">
            {TRANSLATIONS.filosofiTitle1}<span className="text-white/40">{TRANSLATIONS.filosofiTitle2}</span>
          </h3>

          <div className="space-y-6 font-sans text-white/80 text-sm md:text-base leading-relaxed italic">
            <p>
              {TRANSLATIONS.filosofiP1_1}<strong>{TRANSLATIONS.filosofiP1_2}</strong>{TRANSLATIONS.filosofiP1_3}
            </p>
            <p>
              {TRANSLATIONS.filosofiP2_1}<strong>{TRANSLATIONS.filosofiP2_2}</strong>{TRANSLATIONS.filosofiP2_3}
            </p>
            <p>
              {TRANSLATIONS.filosofiP3_1}<strong>{TRANSLATIONS.filosofiP3_2}</strong>{TRANSLATIONS.filosofiP3_3}<strong>{TRANSLATIONS.filosofiP3_4}</strong>{TRANSLATIONS.filosofiP3_5}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "HOME", href: "#home", icon: Home },
    { name: "ABOUT", href: "#about", icon: Info },
    { name: "MENU", href: "#menu", icon: Coffee },
    { name: "CONTACT", href: "#contact", icon: Phone },
  ];

  return (
    <>
      <nav
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-[120] transition-all duration-500 w-[95%] max-w-4xl ${
          isScrolled 
          ? "py-3 px-6 bg-white/10 backdrop-blur-2xl border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.3)] rounded-full" 
          : "py-4 px-8 bg-transparent rounded-none"
        }`}
      >
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 group cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setIsMobileMenuOpen(false);
              window.history.replaceState(null, '', window.location.pathname);
            }}
          >
            <div className="bg-white p-1.5 rounded-xl rotate-[-8deg] group-hover:rotate-0 transition-all duration-500 shadow-lg overflow-hidden shrink-0">
              <img src="/gambar/logo.jpeg" alt={TRANSLATIONS.nyLogoAlt} className="w-8 h-8 object-cover" />
            </div>
            <span className="font-display font-black text-white text-base tracking-tighter hidden sm:block">{TRANSLATIONS.notYetCoffee}</span>
          </motion.div>

          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={(e) => {
                  e.preventDefault();
                  const target = document.querySelector(link.href);
                  if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                    window.history.replaceState(null, '', window.location.pathname);
                  }
                }}
                className="font-display font-black text-white/80 hover:text-white text-[11px] tracking-[0.25em] transition-all duration-300 relative group py-2"
              >
                {link.name}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-white transition-all duration-500 group-hover:w-full opacity-0 group-hover:opacity-100" />
              </motion.a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              className="md:hidden relative z-[200] text-white p-2 flex items-center justify-center cursor-pointer"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="fixed inset-0 z-[110] bg-brand-red flex flex-col items-center justify-center"
          >
            <div className="flex flex-col gap-10 items-center">
              <motion.div
                initial={{ scale: 0, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                className="bg-white p-3 rounded-2xl shadow-xl mb-4"
              >
                <img src="/gambar/logo.jpeg" alt={TRANSLATIONS.logoAlt} className="w-20 h-20 object-contain rounded-xl" />
              </motion.div>
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                  onClick={(e) => {
                    e.preventDefault();
                    setIsMobileMenuOpen(false);
                    const target = document.querySelector(link.href);
                    if (target) {
                      setTimeout(() => {
                        target.scrollIntoView({ behavior: 'smooth' });
                        window.history.replaceState(null, '', window.location.pathname);
                      }, 100);
                    }
                  }}
                  className="font-display font-black text-white text-4xl uppercase tracking-widest flex items-center gap-4 hover:text-white/70 transition-colors"
                >
                  <link.icon className="w-8 h-8 opacity-50" />
                  {link.name}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const GoogleMap = () => (
  <section id="contact" className="mt-32 mb-20">
    <div className="relative mb-16 text-center">
      <span className="bg-white text-brand-red px-6 py-2 rounded-full font-black text-xs uppercase tracking-[0.4em] mb-4 inline-block shadow-xl">
        {TRANSLATIONS.visitUs}
      </span>
      <h2 className="font-display font-black text-6xl md:text-[80px] leading-tight text-white block">
        {TRANSLATIONS.ourLocation}
      </h2>
    </div>

    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="w-full h-[450px] rounded-[48px] overflow-hidden border-8 border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.5)] bg-white/5 relative group"
    >
      <iframe
        title="Not Yet Coffee location"
        src="https://maps.google.com/maps?q=Not%20Yet%20Coffee%20Makassar%20BTN%20Minasa%20Upa&t=&z=15&ie=UTF8&iwloc=&output=embed"
        width="100%"
        height="100%"
        style={{ border: 0, filter: 'grayscale(100%) invert(100%) contrast(90%)' }}
        allowFullScreen={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />

      {/* Interactive Overlay Info */}
      <div className="absolute bottom-10 left-10 z-10 hidden md:block">
        <div className="bg-white p-6 rounded-3xl shadow-2xl border-4 border-brand-red/10 max-w-xs transform -rotate-2">
          <h4 className="font-display font-black text-brand-red text-xl uppercase mb-2">{TRANSLATIONS.notYetCoffee}</h4>
          <p className="text-brand-red/70 text-[10px] font-black uppercase leading-relaxed">
            {TRANSLATIONS.btnMinasaUpaLine1}<br />
            {TRANSLATIONS.makassar}
          </p>
        </div>
      </div>
    </motion.div>
  </section>
);

const FloatingSocialButtons = () => (
  <div className="fixed bottom-8 right-8 z-[150] flex flex-col gap-4">

    <motion.a
      href="https://wa.me/628818161616"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="bg-[#25D366] text-white p-5 rounded-full shadow-[0_20px_50px_rgba(37,211,102,0.4)] flex items-center justify-center group"
      aria-label={TRANSLATIONS.chatOnWhatsApp}
    >
      <MessageCircle className="w-8 h-8 fill-white/20" />
      <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-3 transition-all duration-500 font-display font-black text-xs uppercase tracking-widest whitespace-nowrap">
        {TRANSLATIONS.chatWithUs}
      </span>
    </motion.a>
  </div>
);

export default function App() {
  const [selectedItem, setSelectedItem] = useState<any>(null);

  // Global Arrow Key Navigation
  useEffect(() => {
    const handleArrowNav = (e: KeyboardEvent) => {
      if (selectedItem) return; // Don't nav in background when modal is open

      const items = Array.from(document.querySelectorAll('[tabindex="0"]')) as HTMLElement[];
      const currentIndex = items.indexOf(document.activeElement as HTMLElement);

      if (currentIndex === -1 && (e.key === "ArrowDown" || e.key === "ArrowRight")) {
        items[0]?.focus();
        return;
      }

      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        const nextIndex = (currentIndex + 1) % items.length;
        items[nextIndex]?.focus();
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        const prevIndex = (currentIndex - 1 + items.length) % items.length;
        items[prevIndex]?.focus();
      }
    };

    window.addEventListener("keydown", handleArrowNav);
    return () => window.removeEventListener("keydown", handleArrowNav);
  }, [selectedItem]);

  return (
    <div id="home" className="min-h-screen bg-brand-red pb-20 selection:bg-white selection:text-brand-red relative">
      <Navbar />
      <FloatingSocialButtons />
      <AnimatePresence>
        {selectedItem && (
          <MenuModal item={selectedItem} onClose={() => setSelectedItem(null)} />
        )}
      </AnimatePresence>

      <CatalogHeader />

      <main className="max-w-7xl mx-auto px-6 text-center lg:text-left">

        {/* Information Catalog Section - NOW AT TOP */}
        <section id="about" className="mb-32 mt-32 md:mt-12">
          <div className="relative mb-16 text-center">
            <span className="bg-white text-brand-red px-6 py-2 rounded-full font-black text-xs uppercase tracking-[0.4em] mb-4 inline-block shadow-xl">
              {TRANSLATIONS.officialGuide}
            </span>
            <h2 className="font-display font-black text-6xl md:text-[80px] leading-tight text-white block">
              {TRANSLATIONS.informasi}
            </h2>
          </div>

          {/* Paragraph Version of Info Catalog - NOW AT TOP OF SECTION */}
          <div className="mb-20">
            <InfoParagraph />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {INFO_DATA.map((info) => (
              <InfoCard key={info.id} item={info} />
            ))}
          </div>
        </section>

        {/* Coffee Section */}
        <section id="menu" className="mb-24 scroll-mt-24">
          <div className="relative mb-16 text-center">
            <h2 className="font-display font-black text-6xl md:text-8xl tracking-tight text-white block">
              {TRANSLATIONS.coffeeSeries}
            </h2>
            <div className="h-4 bg-white/10 w-[80%] mx-auto -mt-6 rounded-full blur-xl" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-12">
            {MENU_DATA.coffee.map((item) => (
              <MenuItem key={item.id} item={item} onClick={() => setSelectedItem(item)} />
            ))}
          </div>
        </section>

        {/* Matcha Section */}
        <section className="mb-32">
          <div className="relative mb-16 text-center">
            <h2 className="font-display font-black text-6xl md:text-8xl tracking-tight text-white block">
              {TRANSLATIONS.matchaSeries}
            </h2>
            <div className="h-4 bg-white/10 w-[80%] mx-auto -mt-6 rounded-full blur-xl" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-12">
            {MENU_DATA.matcha.map((item) => (
              <MenuItem key={item.id} item={item} onClick={() => setSelectedItem(item)} />
            ))}
          </div>
        </section>

        {/* Non Coffee Section */}
        <section className="mb-32">
          <div className="relative mb-16 text-center">
            <h2 className="font-display font-black text-6xl md:text-8xl tracking-tight text-white block">
              {TRANSLATIONS.nonCoffee}
            </h2>
            <div className="h-4 bg-white/10 w-[80%] mx-auto -mt-6 rounded-full blur-xl" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-12">
            {MENU_DATA.nonCoffee.map((item) => (
              <MenuItem key={item.id} item={item} onClick={() => setSelectedItem(item)} />
            ))}
          </div>
        </section>

        {/* Satu Liter Section */}
        <section className="mb-32">
          <div className="relative mb-16 text-center">
            <h2 className="font-display font-black text-6xl md:text-8xl tracking-tight text-white block">
              {TRANSLATIONS.satuLiter}
            </h2>
            <div className="h-4 bg-white/10 w-[80%] mx-auto -mt-6 rounded-full blur-xl" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-12">
            {MENU_DATA.liter.map((item) => (
              <MenuItem key={item.id} item={item} onClick={() => setSelectedItem(item)} />
            ))}
          </div>
        </section>

        {/* Google Map Section */}
        <GoogleMap />

        {/* Info & Footer */}
        <footer className="mt-40 pt-16 border-t border-white/20">
          <div className="grid md:grid-cols-3 gap-12 items-center text-center md:text-left">
            <div className="flex flex-col gap-4">
              <a
                href="https://wa.me/628818161616"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center md:justify-start gap-4 group"
              >
                <div className="bg-white/10 p-2 rounded-lg group-hover:bg-[#25D366] transition-colors">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-black text-white text-sm tracking-widest uppercase">{TRANSLATIONS.phoneNumber}</h4>
                  <p className="text-xs text-white/50 font-bold uppercase group-hover:text-white transition-colors">{TRANSLATIONS.whatsAppOrder}</p>
                </div>
              </a>
              <a
                href="https://instagram.com/notyetcoffee"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center md:justify-start gap-4 group"
              >
                <div className="bg-white/10 p-2 rounded-lg group-hover:bg-gradient-to-tr group-hover:from-[#f9ce34] group-hover:to-[#ee2a7b] transition-colors">
                  <Instagram className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-black text-white text-sm tracking-widest uppercase">{TRANSLATIONS.instagramHandle}</h4>
                  <p className="text-xs text-white/50 font-bold uppercase group-hover:text-white transition-colors">{TRANSLATIONS.followUsForUpdates}</p>
                </div>
              </a>

              <div className="flex items-start justify-center md:justify-start gap-4">
                <div className="bg-white/10 p-2 rounded-lg">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-black text-white text-sm tracking-widest uppercase leading-tight">{TRANSLATIONS.btnMinasaUpaFull}</h4>
                  <p className="text-xs text-white/50 font-bold uppercase mt-1">{TRANSLATIONS.visitOurLocalOutlet}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center gap-6">
              <motion.div
                animate={{
                  rotate: [-2, 2, -2],
                  y: [0, -5, 0],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                whileHover={{ scale: 1.1, rotate: 0 }}
                className="inline-block bg-white text-brand-red px-8 py-4 rounded-3xl font-display font-black text-2xl uppercase italic shadow-[0_20px_50px_rgba(255,255,255,0.3)] rotate-[-2deg] border-4 border-white active:scale-95 transition-transform cursor-default select-none"
              >
                {TRANSLATIONS.tambahEspresso2k}
              </motion.div>
            </div>

            <div className="flex flex-col md:items-end gap-2 pr-4">
              <p className="text-white font-black text-[10px] tracking-[0.5em] uppercase opacity-20">
                ©2025 NOT YET COFFEE STUDIO
              </p>
              <div className="flex gap-4">
                <div className="w-8 h-[2px] bg-white/20" />
                <div className="w-8 h-[2px] bg-white/20" />
                <div className="w-8 h-[2px] bg-white/20" />
              </div>
            </div>
          </div>
        </footer>
      </main>
      <Analytics />
      <SpeedInsights />
    </div>
  );
}

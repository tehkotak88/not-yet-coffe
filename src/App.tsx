import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Coffee, Instagram, MapPin, Clock, Star, Zap, X, Home, Info, Phone, Menu as MenuIcon, MessageCircle } from "lucide-react";

const MENU_DATA = {
  coffee: [
    { id: 16, name: "KOPI NOT AREN", price: "13K", best: true, desc: "Kopi susu dengan paduan gula aren asli yang memberikan rasa manis alami dan aroma kopi yang kuat. Diseduh menggunakan ekstraksi biji kopi House Blend (Arabica & Robusta) pilihan nusantara.", image: "/gambar/Kopi Not Susu.png" },
    { id: 2, name: "KOPI SALTED CARAMEL", price: "13K", best: true, desc: "Menu andalan kami: Perpaduan espresso dengan gula aren organik murni dan sentuhan sea salt yang memberikan keseimbangan rasa manis dan gurih. Diekstrak dari biji kopi Arabica berkualitas tinggi.", image: "/gambar/Kopi Salted Caramel.png" },
    { id: 15, name: "KOPI SEA SALT BUTTERSCOTCH", price: "15K", best: true, desc: "Kombinasi sempurna antara espresso premium, susu segar, dan sirup butterscotch dengan sentuhan sea salt yang gurih. Menggunakan racikan biji kopi pilihan (House Blend).", image: "/gambar/KOPI SEA SALT BUTTERSCOT.png" },
    { id: 1, name: "KOPI NOT LATTE", price: "13K", best: false, desc: "Espresso double shot yang kuat dipadukan dengan susu segar yang dikukus hingga berbusa lembut, menciptakan tekstur creamy yang sempurna. Diseduh menggunakan biji kopi 100% Arabica.", image: "/gambar/Kopi Not Latte.png" },
    { id: 3, name: "KOPI NOT SUSU", price: "13K", best: false, desc: "Sentuhan rasa klasik yang membawa nostalgia, menggabungkan kopi hitam pekat dengan kental manis premium yang kaya rasa. Menggunakan racikan biji kopi House Blend spesial kami.", image: "/gambar/Kopi Not Susu.png" },
    { id: 4, name: "AMERICANO", price: "10K", best: false, desc: "Ekstraksi espresso murni yang jernih menggunakan biji kopi 100% Arabica house roast kami, disajikan untuk kesegaran rasa kopi yang jujur dengan notes rasa yang khas.", image: "/gambar/americano.png" },
    { id: 8, name: "KOPI NOT PANCO", price: "14K", best: false, desc: "Perpaduan unik espresso (dari biji kopi House Blend premium) dengan pandan dan kelapa yang memberikan aroma khas dan rasa eksotis. Sempurna untuk mencari cita rasa yang berbeda dan memorable.", image: "/gambar/Kopi Not Panco dan Pandan Coconut.jpeg" },
  ],
  nonCoffee: [
    { id: 5, name: "COKELAT", price: "13K", best: false, desc: "Minuman cokelat hitam premium pilihan yang dipadukan dengan susu segar full cream, memberikan sensasi rasa cokelat asli yang mendalam, kental, dan mewah tanpa perasa buatan.", image: "/gambar/Cokelat.png" },
    { id: 7, name: "RED VELVET", price: "13K", best: false, desc: "Ekstrak rasa kue Red Velvet asli yang kaya dan manis lembut dipadukan dengan susu segar krimi, menghadirkan sensasi makan kue premium dalam setiap tegukan.", image: "/gambar/Red velvet.png" },
    { id: 10, name: "THAI TEA", price: "13K", best: false, desc: "Seduhan daun teh hitam asli khas Thailand pilihan yang disajikan dengan takaran kental manis dan susu evaporasi yang pas, menciptakan profil rasa teh yang otentik dan menyegarkan.", image: "/gambar/Thai Tea.png" },
  ],
  matcha: [
    { id: 6, name: "MATCHA LATTE", price: "18K", best: true, desc: "Bubuk Matcha premium 100% asli Jepang yang disajikan dengan susu segar dan foam lembut, diolah dengan resep rahasia Not Yet Coffee untuk rasa otentik yang tak terlupakan.", image: "/gambar/Matcha Latte.png" },
    { id: 17, name: "MATCHA STROBERI", price: "20K", best: true, desc: "Perpaduan unik antara bubuk matcha premium Jepang dan selai stroberi segar buatan sendiri (homemade) yang memberikan rasa manis dan asam yang sangat seimbang.", image: "/gambar/Matcha Stroberi.png" }
  ],
  liter: [
    { id: 12, name: "SATU LITER MATCHA", price: "85K", best: false, desc: "Minuman satu liter dari bubuk Matcha premium asli Jepang. Menyajikan rasa teh hijau autentik yang kaya antioksidan dengan tekstur creamy yang memuaskan, sangat cocok untuk berbagi.", image: "/gambar/Matcha Latteee.png" },
    { id: 13, name: "SATU LITER KOPI NOT AREN", price: "75K", best: false, desc: "Kopi satu liter yang diekstrak dari biji kopi Robusta kualitas terbaik, dicampur dengan gula aren murni alami. Memberikan rasa manis legit dan aroma kopi yang kuat.", image: "/gambar/Kopi Not Arennn.jpeg" },
    { id: 14, name: "SATU LITER COKLAT", price: "75K", best: false, desc: "Cokelat hitam premium asli dalam kemasan satu liter, dipadukan dengan susu segar full cream untuk sensasi rasa cokelat yang intens dan creamy. Sangat sempurna untuk acara keluarga.", image: "/gambar/Coklattt.png" },
  ]
};

const CatalogHeader = () => (
  <header className="relative pt-12 pb-8 px-6 overflow-hidden">
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex flex-col"
        >
          <div className="bg-white p-5 rounded-xl shadow-[12px_12px_0px_0px_rgba(0,0,0,0.15)] -rotate-3 border-2 border-white mb-4">
            <img src="/gambar/logo.jpeg" alt="Not Yet Coffee Logo" className="w-32 h-32 object-contain" />
          </div>
        </motion.div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center md:text-right relative"
        >
          <div className="relative z-10 space-y-4">
            <div className="flex flex-col items-center md:items-end gap-1">
              <div className="bg-white text-brand-red px-4 py-1 rounded-md font-black text-[10px] uppercase tracking-widest shadow-lg">
                Operational Hours
              </div>
              <span className="font-display font-black text-3xl text-white tracking-widest drop-shadow-md">OPEN EVERYDAY</span>
              <span className="font-display font-bold text-sm text-white/90 tracking-widest uppercase">MON-FRI: 08-23 | SAT-SUN: 08-00</span>
            </div>
            <div className="flex items-center justify-center md:justify-end gap-6 text-[10px] font-bold uppercase tracking-widest text-white/80">
              <div className="flex items-center gap-2">
                <Instagram className="w-3 h-3" />
                <span>@notyetcoffee</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3 h-3" />
                <span>Minasa Upa Blok F</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Integrated Promo Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-md border-y border-white/20 py-4 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-12"
      >
        <span className="text-white font-black italic tracking-[0.2em] transform -rotate-1">
          * SETIAP HARI *
        </span>
        <div className="h-6 w-[2px] bg-white/20 hidden md:block" />
        <span className="bg-white text-brand-red px-4 py-1 text-sm font-black uppercase rotate-1">
          TAMBAH ESPRESSO +2K
        </span>
        <div className="h-6 w-[2px] bg-white/20 hidden md:block" />
        <span className="text-white font-black italic tracking-[0.2em] transform -rotate-1">
          * PREMIUM BLEND *
        </span>
      </motion.div>
    </div>
  </header>
);

const PriceTag = ({ price }: { price: string }) => (
  <motion.div
    initial={{ scale: 0 }}
    whileInView={{ scale: 1 }}
    className="absolute -top-6 -left-2 z-20"
  >
    <div className="relative flex items-center justify-center w-20 h-20">
      <div className="absolute inset-0 bg-white shadow-xl jagged-price" />
      <span className="relative z-10 font-display font-black text-brand-red text-2xl tracking-tighter select-none">
        {price}
      </span>
    </div>
  </motion.div>
);

const BestSellerSign = () => (
  <motion.div
    initial={{ x: 20, opacity: 0 }}
    whileInView={{ x: 0, opacity: 1 }}
    className="absolute -bottom-6 -right-2 z-20"
  >
    <div className="bg-white p-1 rounded-full shadow-2xl border-4 border-[#FFD700]">
      <div className="bg-white p-2 rounded-full border-2 border-[#FFD700] flex flex-col items-center justify-center w-16 h-16">
        <Star className="w-5 h-5 text-[#FFD700] fill-[#FFD700]" />
        <span className="font-display font-black text-[8px] text-black tracking-tight leading-none mt-1">BEST</span>
        <span className="font-display font-black text-[8px] text-black tracking-tight leading-none">SELLER</span>
      </div>
    </div>
  </motion.div>
);

const MenuItem = ({ item, onClick }: { item: any, onClick: () => void, key?: string | number }) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -8 }}
      whileFocus={{ y: -8, outline: "none" }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      className="relative flex flex-col items-center group mb-20 px-8 cursor-pointer focus:outline-none focus:ring-4 focus:ring-white/20 rounded-[40px]"
    >
      <div className="relative w-full max-w-[280px] aspect-[4/5] mb-6">
        <PriceTag price={item.price} />
        {item.best && <BestSellerSign />}

        <div className="w-full h-full rounded-[40px] overflow-hidden bg-white shadow-2xl transform transition-all duration-500 group-hover:scale-105 group-focus:scale-105 group-hover:shadow-[0_20px_60px_rgba(255,255,255,0.15)]">
          <div className="absolute inset-0 gloss-effect z-10 pointer-events-none opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-500" />
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover transition-all duration-700"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      <motion.div
        className="text-center w-full"
        transition={{ delay: 0.1 }}
      >
        <h3 className="font-display font-black text-[22px] leading-tight tracking-tight text-white mb-1 uppercase group-hover:tracking-wider group-focus:tracking-wider transition-all duration-300">
          {item.name}
        </h3>
        <p className="font-display font-bold text-[9px] text-white/40 tracking-[0.2em] uppercase mb-3 inline-block group-hover:text-white/80 group-focus:text-white/80 transition-colors">
          (ICE / HOT)
        </p>
        <p className="font-sans text-[10px] text-white/70 leading-relaxed max-w-[200px] mx-auto italic opacity-80 group-hover:opacity-100 group-focus:opacity-100 transition-opacity">
          {item.desc}
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
    name: "STRATEGIC LOCATION",
    value: "Terletak di BTN Minasa Upa Blok F 15 / 14, kedai kami menawarkan suasana yang tenang dan nyaman, jauh dari hiruk-pikuk kota, menjadikannya tempat ideal untuk bekerja maupun bersantai.",
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

const InfoCard = ({ item }: { item: any, key?: string | number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    className="bg-white p-10 rounded-[40px] border-4 border-white/20 shadow-2xl flex flex-col items-center text-center group h-full"
  >
    <div className="w-20 h-20 rounded-3xl bg-brand-red flex items-center justify-center mb-8 shadow-xl group-hover:rotate-12 transition-transform shrink-0">
      <item.icon className="w-10 h-10 text-white" />
    </div>
    <h4 className="font-display font-black text-brand-red text-xl uppercase tracking-widest mb-4">
      {item.name || item.title}
    </h4>
    <p className="font-sans font-semibold text-brand-red/80 text-[11px] leading-relaxed uppercase italic">
      {item.value}
    </p>
  </motion.div>
);

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
        aria-label="Close Modal"
      >
        <X className="w-6 h-6 md:w-8 md:h-8 group-hover:rotate-90 transition-transform duration-300" />
      </motion.button>

      <motion.div
        ref={modalRef}
        tabIndex={-1}
        initial={{ scale: 0.9, y: 50, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 50, opacity: 0 }}
        className="bg-white rounded-[32px] md:rounded-[40px] w-full max-w-4xl overflow-hidden shadow-[0px_50px_100px_rgba(0,0,0,0.6)] relative focus:outline-none my-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex flex-col md:flex-row h-full max-h-none">
          {/* Product Image Section */}
          <div className="md:w-1/2 relative bg-gray-50">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover min-h-[300px] md:min-h-[500px]"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>

          {/* Product Details Section */}
          <div className="md:w-1/2 p-8 md:p-14 flex flex-col justify-center bg-white relative">
            <div className="mb-8 pt-2 md:pt-0">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-brand-red text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-brand-red/20">
                  Premium Selection
                </span>
                {item.best && (
                  <span className="bg-amber-400 text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-amber-400/20">
                    Best Seller
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
                <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-black/20 mb-3">Product Description</h4>
                <p className="font-sans text-brand-red/80 text-base leading-relaxed italic font-medium">
                  "{item.desc}"
                </p>
              </div>

              <div className="grid grid-cols-2 gap-8 py-8 border-y border-brand-red/10">
                <div>
                  <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-black/20 mb-2">Service Style</h4>
                  <p className="font-black text-sm text-brand-red uppercase tracking-widest">Ice / Hot Available</p>
                </div>
                <div>
                  <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-black/20 mb-2">Availability</h4>
                  <p className="font-black text-sm text-brand-red uppercase tracking-widest">In Stock</p>
                </div>
              </div>

              <div>
                <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-black/20 mb-4 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-brand-red" />
                  Perfect Pairing
                </h4>
                <div className="flex items-center gap-5 bg-brand-red/[0.03] p-5 rounded-[24px] border border-brand-red/5 hover:bg-brand-red/[0.06] transition-colors cursor-default group/pair">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-xl shrink-0">
                    <img
                      src="https://picsum.photos/seed/pastry/400/400"
                      alt="Pairing"
                      className="w-full h-full object-cover group-hover/pair:scale-110 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <p className="font-display font-black text-brand-red text-sm uppercase tracking-wider mb-1">Butter Croissant</p>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] bg-brand-red/10 text-brand-red px-2 py-0.5 rounded font-black">+ RP 15.000</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const InfoParagraph = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    className="max-w-4xl mx-auto bg-white/5 backdrop-blur-sm p-10 md:p-16 rounded-[48px] border border-white/10 text-center md:text-left relative overflow-hidden group"
  >
    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl group-hover:bg-white/10 transition-colors" />

    <div className="relative z-10">
      <h3 className="font-display font-black text-white text-3xl md:text-4xl mb-8 leading-tight uppercase tracking-tight">
        Filosofi di Balik Setiap <span className="text-white/40">Seduhan Kami</span>
      </h3>

      <div className="space-y-6 font-sans text-white/80 text-sm md:text-base leading-relaxed italic">
        <p>
          Di <strong>Not Yet Coffee</strong>, kami percaya bahwa kopi bukan sekadar minuman, melainkan sebuah perjalanan rasa yang patut dinikmati tanpa terburu-buru. Itulah mengapa setiap cangkir yang kami sajikan adalah hasil dari dedikasi tinggi, mulai dari pemilihan biji kopi terbaik hingga metode penyeduhan yang presisi untuk mengeluarkan profil rasa yang paling autentik.
        </p>
        <p>
          Berlokasi di ketenangan <strong>BTN Minasa Upa</strong>, kedai kami dirancang sebagai pelarian sejenak dari hiruk-pikuk rutinitas. Kami menyediakan ruang yang bukan hanya sekadar tempat duduk, tapi sebuah ekosistem kreatif di mana Anda bisa bekerja dengan fokus atau berbagi tawa bersama komunitas pecinta kopi Makassar lainnya.
        </p>
        <p>
          Kami mengundang Anda untuk berkunjung setiap <strong>hari</strong>, mulai pukul 08:00 pagi. Khusus pada <strong>akhir pekan</strong>, kami buka hingga pukul 00:00 malam untuk menemani waktu santai Anda lebih lama. Jangan lupa untuk mengikuti linimasa kami di Instagram guna mendapatkan info promo eksklusif dan menjadi bagian dari semangat komunitas kami yang terus tumbuh. Selamat menikmati waktu tunggu Anda bersama kami.
        </p>
      </div>
    </div>
  </motion.div>
);

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
        className={`fixed top-0 left-0 right-0 z-[120] transition-all duration-500 ${isScrolled ? "py-4 bg-brand-red/80 backdrop-blur-xl border-b border-white/10 shadow-2xl" : "py-8 bg-transparent"
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 group cursor-pointer"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setIsMobileMenuOpen(false);
            }}
          >
            <div className="bg-white p-1 rounded-lg rotate-[-5deg] group-hover:rotate-0 transition-transform overflow-hidden">
              <img src="/gambar/logo.jpeg" alt="NY Logo" className="w-10 h-10 object-cover" />
            </div>
            <span className="font-display font-black text-white text-lg tracking-tighter">NOTYET COFFEE</span>
          </motion.div>

          <div className="hidden md:flex items-center gap-8">
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
                  }
                }}
                className="font-display font-black text-white/70 hover:text-white text-xs tracking-[0.2em] transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-white transition-all group-hover:w-full" />
              </motion.a>
            ))}
          </div>

          <button
            type="button"
            className="md:hidden relative z-[200] text-white p-4 -mr-4 flex items-center justify-center cursor-pointer pointer-events-auto select-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="w-8 h-8 pointer-events-none" /> : <MenuIcon className="w-8 h-8 pointer-events-none" />}
          </button>
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
        Visit Us
      </span>
      <h2 className="font-display font-black text-6xl md:text-[80px] leading-tight text-white block">
        OUR LOCATION
      </h2>
    </div>

    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="w-full h-[450px] rounded-[48px] overflow-hidden border-8 border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.5)] bg-white/5 relative group"
    >
      <iframe
        title="Not Yet Coffee location"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15894.499696956!2d119.46782236977538!3d-5.180499!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dbee3495f548d47%3A0xc6cb1c49122a21b3!2sBTN%20Minasa%20Upa!5e0!3m2!1sid!2sid!4v1713538800000!5m2!1sid!2sid"
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
          <h4 className="font-display font-black text-brand-red text-xl uppercase mb-2">Not Yet Coffee</h4>
          <p className="text-brand-red/70 text-xs font-bold uppercase leading-relaxed italic">
            BTN MINASA UPA BLOK F 15 / 14,<br />
            Gedung Merah - Lantai 1
          </p>
        </div>
      </div>
    </motion.div>
  </section>
);

const FloatingSocialButtons = () => (
  <div className="fixed bottom-8 right-8 z-[150] flex flex-col gap-4">
    <motion.a
      href="https://www.tiktok.com/@not.yet.coffee?_r=1&_t=ZS-95lPGMnqpT6"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="bg-[#111111] text-white p-5 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.4)] flex items-center justify-center group"
      aria-label="Follow on TikTok"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 opacity-80 group-hover:opacity-100 transition-opacity">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 2.78-1.15 5.54-3.33 7.36-1.37 1.15-3.1 1.83-4.91 2.01-1.64.16-3.33-.08-4.81-.88-2.61-1.4-4.22-4.14-4.27-7.14-.04-2.52 1.05-5.01 2.97-6.72 1.58-1.4 3.66-2.18 5.76-2.29v4.06c-1.44.02-2.88.54-3.95 1.51-.95.86-1.48 2.15-1.48 3.46.03 1.48.65 2.91 1.73 3.91 1.03.96 2.47 1.45 3.89 1.34 1.48-.12 2.87-.84 3.79-2 1.01-1.28 1.44-2.91 1.41-4.52V0h4.15z" />
      </svg>
      <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-3 transition-all duration-500 font-display font-black text-xs uppercase tracking-widest whitespace-nowrap">
        Follow Us
      </span>
    </motion.a>
    <motion.a
      href="https://wa.me/628818161616"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="bg-[#25D366] text-white p-5 rounded-full shadow-[0_20px_50px_rgba(37,211,102,0.4)] flex items-center justify-center group"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-8 h-8 fill-white/20" />
      <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-3 transition-all duration-500 font-display font-black text-xs uppercase tracking-widest whitespace-nowrap">
        Chat With Us
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
              Official Guide
            </span>
            <h2 className="font-display font-black text-6xl md:text-[80px] leading-tight text-white block">
              INFORMASI
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
              COFFEE SERIES
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
              MATCHA SERIES
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
              NON COFFEE
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
              SATU LITER
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
                  <h4 className="font-black text-white text-sm tracking-widest uppercase">+62 881-8161-616</h4>
                  <p className="text-xs text-white/50 font-bold uppercase group-hover:text-white transition-colors">WhatsApp Order</p>
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
                  <h4 className="font-black text-white text-sm tracking-widest uppercase">@notyetcoffee</h4>
                  <p className="text-xs text-white/50 font-bold uppercase group-hover:text-white transition-colors">Follow us for updates</p>
                </div>
              </a>
              <a
                href="https://www.tiktok.com/@not.yet.coffee?_r=1&_t=ZS-95lPGMnqpT6"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center md:justify-start gap-4 group"
              >
                <div className="bg-white/10 p-2 rounded-lg group-hover:bg-gradient-to-br group-hover:from-[#00f2fe] group-hover:via-[#111111] group-hover:to-[#fe0979] transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 2.78-1.15 5.54-3.33 7.36-1.37 1.15-3.1 1.83-4.91 2.01-1.64.16-3.33-.08-4.81-.88-2.61-1.4-4.22-4.14-4.27-7.14-.04-2.52 1.05-5.01 2.97-6.72 1.58-1.4 3.66-2.18 5.76-2.29v4.06c-1.44.02-2.88.54-3.95 1.51-.95.86-1.48 2.15-1.48 3.46.03 1.48.65 2.91 1.73 3.91 1.03.96 2.47 1.45 3.89 1.34 1.48-.12 2.87-.84 3.79-2 1.01-1.28 1.44-2.91 1.41-4.52V0h4.15z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-black text-white text-sm tracking-widest uppercase">@not.yet.coffee</h4>
                  <p className="text-xs text-white/50 font-bold uppercase group-hover:text-white transition-colors">Watch our videos</p>
                </div>
              </a>
              <div className="flex items-start justify-center md:justify-start gap-4">
                <div className="bg-white/10 p-2 rounded-lg">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-black text-white text-sm tracking-widest uppercase leading-tight">BTN MINASA UPA BLOK F 15 / 14</h4>
                  <p className="text-xs text-white/50 font-bold uppercase mt-1">Visit our local outlet</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center gap-6">
              <div className="inline-block bg-white text-brand-red px-8 py-4 rounded-3xl font-display font-black text-2xl uppercase italic shadow-2xl rotate-[-2deg] border-4 border-white active:scale-95 transition-transform cursor-default select-none">
                *TAMBAH ESPRESSO 2K*
              </div>
            </div>

            <div className="flex flex-col md:items-end gap-2 pr-4">
              <p className="text-white font-black text-[10px] tracking-[0.5em] uppercase opacity-20">
                ©2024 NOT YET COFFEE STUDIO
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
    </div>
  );
}

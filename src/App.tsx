import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Coffee, Instagram, MapPin, Clock, Star, Zap, X, Home, Info, Phone, Menu as MenuIcon, MessageCircle } from "lucide-react";

const MENU_DATA = {
  coffee: [
    { id: 1, name: "KOPI NOT LATTE", price: "13K", best: false, desc: "Espresso double shot yang kuat dipadukan dengan susu segar yang dikukus hingga berbusa lembut, menciptakan tekstur creamy yang sempurna.", image: "https://picsum.photos/seed/coffee-latte/500/600" },
    { id: 2, name: "KOPI NOT AREN", price: "13K", best: true, desc: "Menu andalan kami: Perpaduan espresso lokal dengan gula aren organik murni dan sentuhan sea salt yang memberikan keseimbangan rasa manis dan gurih.", image: "https://picsum.photos/seed/coffee-aren/500/600" },
    { id: 3, name: "KOPI NOT SUSU", price: "13K", best: false, desc: "Sentuhan rasa klasik yang membawa nostalgia, menggabungkan kopi hitam pekat dengan kental manis premium yang kaya rasa.", image: "https://picsum.photos/seed/coffee-milk/500/600" },
    { id: 4, name: "AMERICANO", price: "10K", best: false, desc: "Ekstraksi espresso murni yang jernih menggunakan biji kopi pilihan house roast kami, disajikan untuk kesegaran rasa kopi yang jujur.", image: "https://picsum.photos/seed/americano/500/600" },
  ],
  nonCoffee: [
    { id: 5, name: "COKELAT", price: "13K", best: false, desc: "Cokelat hitam premium pilihan yang dipadukan dengan susu segar, memberikan sensasi rasa cokelat yang mendalam, kental, dan mewah.", image: "https://picsum.photos/seed/chocolate/500/600" },
    { id: 6, name: "MATCHA", price: "18K", best: true, desc: "Sajian Matcha spesial kami dengan foam lembut, diolah dengan resep rahasia Not Yet Coffee untuk rasa yang tak terlupakan.", image: "https://media.ais.studio/api/v1/attachments/80f76906-96ec-41e5-8208-8e6f1f44c4ec/500/600" },
    { id: 7, name: "RED VELVET", price: "13K", best: false, desc: "Rasa kue Red Velvet yang kaya dan manis lembut dipadukan dengan susu krimi, menghadirkan sensasi makan kue dalam setiap tegukan.", image: "https://picsum.photos/seed/red-velvet/500/600" },
    { id: 10, name: "THAI TEA", price: "13K", best: false, desc: "Seduhan daun teh asli Thailand pilihan yang disajikan dengan kental manis dan evaporasi, menciptakan rasa teh yang unik dan menyegarkan.", image: "https://picsum.photos/seed/thai-tea/500/600" },
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
            <div className="flex flex-col items-center">
              <span className="font-display font-black text-brand-red text-6xl leading-[0.8]">NOT</span>
              <span className="font-display font-black text-brand-red text-6xl leading-[0.5] mt-1">YET</span>
              <span className="font-display font-bold text-brand-red text-sm mt-4 tracking-[0.3em]">COFFEE</span>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center md:text-right relative"
        >
          <div className="relative z-10 space-y-4">
            <div className="flex flex-col items-center md:items-end gap-2">
               <div className="bg-white text-brand-red px-4 py-1 rounded-md font-black text-[10px] uppercase tracking-widest shadow-lg">
                  Operational Hours
               </div>
               <span className="font-display font-black text-4xl text-white tracking-widest drop-shadow-md">08:00 - 23:00</span>
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
    value: "Kami melayani setiap Selasa hingga Minggu mulai pukul 08:00 pagi hingga 23:00 malam. Kami tutup pada hari Senin untuk perawatan berkala guna memastikan kualitas layanan tetap prima.", 
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
    return () => window.removeEventListener("keydown", handleKeyDown);
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
      className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-brand-red/90 backdrop-blur-xl"
      onClick={onClose}
    >
      <motion.div 
        ref={modalRef}
        tabIndex={-1}
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-white rounded-[40px] w-full max-w-2xl overflow-hidden shadow-[0px_40px_100px_rgba(0,0,0,0.5)] border-8 border-white relative focus:outline-none"
        onClick={e => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-[110] bg-brand-red text-white p-3 rounded-full shadow-xl hover:scale-110 active:scale-95 transition-transform"
          aria-label="Close Modal"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex flex-col md:flex-row h-full">
          <div className="md:w-1/2 aspect-square md:aspect-auto">
            <img 
              src={item.image} 
              alt={item.name} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
            <div className="mb-6">
              <span className="bg-brand-red/10 text-brand-red px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-3 inline-block">
                Premium Menu
              </span>
              <h2 className="font-display font-black text-4xl text-brand-red leading-none mb-2 uppercase">
                {item.name}
              </h2>
              <div className="flex items-center gap-2 mb-4">
                 <div className="h-1 w-12 bg-brand-red rounded-full" />
                 <span className="font-display font-black text-brand-red text-2xl">{item.price}</span>
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-[10px] font-black uppercase tracking-widest text-black/30 mb-2">Description</h4>
                <p className="font-sans text-brand-red/70 text-sm leading-relaxed italic">
                  {item.desc}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-brand-red/10">
                 <div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-black/30 mb-1">Variant</h4>
                    <p className="font-bold text-xs text-brand-red">Hot / Ice</p>
                 </div>
                 <div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-black/30 mb-1">Availabilty</h4>
                    <p className="font-bold text-xs text-brand-red">In Store</p>
                 </div>
              </div>

              <div className="pt-6 border-t border-brand-red/10">
                 <h4 className="text-[10px] font-black uppercase tracking-widest text-black/30 mb-3 flex items-center gap-2">
                   <Zap className="w-3 h-3 text-brand-red" />
                   Recommended Pairing
                 </h4>
                 <div className="flex items-center gap-4 bg-brand-red/5 p-4 rounded-2xl border border-brand-red/10 group/pair cursor-default">
                    <div className="w-12 h-12 rounded-xl overflow-hidden shadow-md shrink-0">
                       <img 
                          src="https://picsum.photos/seed/pastry/200/200" 
                          alt="Pairing" 
                          className="w-full h-full object-cover group-hover/pair:scale-110 transition-transform" 
                          referrerPolicy="no-referrer"
                       />
                    </div>
                    <div>
                       <p className="font-display font-black text-brand-red text-xs uppercase leading-tight">BUTTER CROISSANT</p>
                       <p className="font-sans text-[10px] text-brand-red/60 uppercase font-black italic mt-1">+ Rp 15.000</p>
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
          Kami mengundang Anda untuk berkunjung setiap <strong>Selasa hingga Minggu</strong>, mulai pukul 08:00 hingga 23:00. Jangan lupa untuk mengikuti linimasa kami di Instagram guna mendapatkan info promo eksklusif dan menjadi bagian dari semangat komunitas kami yang terus tumbuh. Selamat menikmati waktu tunggu Anda bersama kami.
        </p>
      </div>
    </div>
  </motion.div>
);

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

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
    <nav 
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        isScrolled ? "py-4 bg-brand-red/80 backdrop-blur-xl border-b border-white/10 shadow-2xl" : "py-8 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 group cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div className="bg-white p-2 rounded-lg rotate-[-5deg] group-hover:rotate-0 transition-transform">
             <span className="font-display font-black text-brand-red text-xl leading-none">NY</span>
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
              className="font-display font-black text-white/70 hover:text-white text-xs tracking-[0.2em] transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-white transition-all group-hover:w-full" />
            </motion.a>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="md:hidden text-white"
        >
          <MenuIcon className="w-6 h-6" />
        </motion.div>
      </div>
    </nav>
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

const WhatsAppButton = () => (
  <motion.a
    href="https://wa.me/628818161616"
    target="_blank"
    rel="noopener noreferrer"
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    className="fixed bottom-8 right-8 z-[150] bg-[#25D366] text-white p-5 rounded-full shadow-[0_20px_50px_rgba(37,211,102,0.4)] flex items-center justify-center group"
    aria-label="Chat on WhatsApp"
  >
    <MessageCircle className="w-8 h-8 fill-white/20" />
    <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-3 transition-all duration-500 font-display font-black text-xs uppercase tracking-widest whitespace-nowrap">
      Chat With Us
    </span>
  </motion.a>
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
      <WhatsAppButton />
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

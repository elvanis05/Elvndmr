import React, { useState, useEffect, createContext, useContext } from 'react';
import './index.css';

// --- Multi-Language Support ---
const translations = {
  en: {
    nav: { home: "Home", gallery: "Gallery", skills: "Skills", projects: "Projects", resume: "Resume" },
    hero: {
      roles: ["Creative Developer", "Teacher", "Web Manager"],
      subtitle: "I create technology and teach the future.",
      viewWork: "View My Work",
      reviewResume: "Review Resume"
    },
    gallery: {
      title: "Visual Space",
      subtitle: "Hover to reveal details and pause the gallery",
      list: [
        { title: 'WEB PROJECT', desc: 'Pizza Sales Website' },
        { title: 'WEB PROJECT', desc: 'Pizza sales website order menu' },
        { title: 'WEB PROJECT', desc: 'A portfolio site for personal use' },
        { title: 'WEB PROJECT', desc: 'A project created for a tour company.' },
        { title: 'WEB PROJECT', desc: 'Dashboard for tour site' },
        { title: 'WEB PROJECT', desc: 'Hotel management panel for tour website' },
        { title: 'WEB PROJECT', desc: 'Tour management panel for tour website' },
        { title: 'CANVA WORK', desc: 'A video project for school promotion' },
        { title: 'CANVA WORK', desc: 'School lunch list design' },
        { title: 'CANVA WORK', desc: 'An announcement video for the STS exam' },
        { title: 'CANVA WORK', desc: 'Social media post for Kahoot quiz' },
        { title: 'CANVA WORK', desc: 'A video from a company operating in the agricultural sector.' },
        { title: 'CANVA WORK', desc: 'Social media sharing for agricultural work.' },
        { title: 'CANVA WORK', desc: 'School break sharing' },
        { title: 'WEB PROJECT', desc: 'Simple app for movie watchlists...' },
        { title: 'LOCAL PROJECT', desc: 'Car tracker AI' },
        { title: 'Coming Soon', desc: 'coming soon...' },
        { title: 'Coming Soon', desc: 'coming soon...' },
        { title: 'Coming Soon', desc: 'coming soon...' }
      ]
    },
    skills: {
      title: "SKILLS",
      subtitle: "Tools and technologies I use to build"
    },
    projects: {
      title: "My Projects",
      explore: "( Explore )",
      viewDetails: "Click to view details",
      viewLive: "View Live",
      adminPanel: "Open Admin Panel",
      aiAssisted: "🤖 AI Assisted",
      humanCode: "🧑‍💻 100% Human Code",
      techStack: "Tech Stack",
      aiBadge: "🤖 AI",
      humanBadge: "🧑‍💻 NO AI",
      list: [
        { title: 'Holiday Company', desc: 'A modern holiday booking and management platform with a secure backend.' },
        { title: 'Tour Management', desc: 'A comprehensive tour management panel for the holiday platform.' },
        { title: 'Pizza Sales Website', desc: 'A fully functional pizza ordering website with a custom shopping cart and menu.' },
        { title: 'Personal Website', desc: 'A personal portfolio website showcasing my creative projects and professional journey.' },
        { title: 'Movie Watchlist', desc: 'A movie tracking application built with React and Redux for managing personal watchlists.' }
      ]
    },
    resume: {
      title: "My Journey",
      subtitle: "Professional Experience & Education",
      items: [
        { title: "IT & Software Teacher / Web Manager", org: "Açı College", desc: "Leading Information Technology and Software courses while managing and maintaining the official school website operations." },
        { title: "Frontend Developer Training", org: "Workintech", desc: "Intensive training focusing on modern frontend technologies, React ecosystem, and professional software development workflows." },
        { title: "Branch Manager", org: "Öncü Dürüm Turizm Sanayi ve Ticaret Ltd. Şti.", desc: "Managed full branch operations including sales, procurement, inventory, and financial tracking. Oversaw online sales channels, advertising, and employee management." },
        { title: "Assistant Store Manager", org: "BİM A.Ş.", desc: "Responsible for stock control, inventory accuracy, and daily system records. Ensured store organization and operational efficiency." },
        { title: "BSc in Computer Science", org: "Amasya University (BÖTE)", desc: "Graduated with a focus on educational technologies, instructional design, and human-computer interaction principles applied to web systems." },
        { title: "High School Diploma", org: "Amasya 12 Haziran Anatolian High School", desc: "Foundational education with a focus on science and mathematics." }
      ],
      certsTitle: "Additional Qualifications",
      certsDate: "Certifications",
      certsList: [
        "Frontend Developer Certificate – Workintech (2025)",
        "Hygiene Certificate – İstanbul Gedik University (2023)",
        "Computer Literacy Certificate – Public Education Center (2018)",
        "Active contributor – International Amasya BÖTE Congress (2015–2016)"
      ]
    },
    footer: { rights: "All rights reserved." }
  },
  tr: {
    nav: { home: "Ana Sayfa", gallery: "Galeri", skills: "Yetenekler", projects: "Projeler", resume: "Özgeçmiş" },
    hero: {
      roles: ["Kreatif Geliştirici", "Öğretmen", "Web Yöneticisi", "Restoran Müdürü"],
      subtitle: "Teknoloji üretiyor ve geleceği öğretiyorum.",
      viewWork: "Çalışmalarımı Gör",
      reviewResume: "Özgeçmişi İncele"
    },
    gallery: {
      title: "Görsel Alan",
      subtitle: "Detayları görmek ve galeriyi duraklatmak için üzerine gelin",
      list: [
        { title: 'WEB PROJESİ', desc: 'Pizza Satış Sitesi' },
        { title: 'WEB PROJESİ', desc: 'Pizza satış sitesi sipariş menüsü' },
        { title: 'WEB PROJESİ', desc: 'Kişisel kullanım için portfolyo sitesi' },
        { title: 'WEB PROJESİ', desc: 'Bir tur şirketi için oluşturulmuş proje.' },
        { title: 'WEB PROJESİ', desc: 'Tur sitesi yönetim paneli (dashboard)' },
        { title: 'WEB PROJESİ', desc: 'Tur sitesi için otel yönetim paneli' },
        { title: 'WEB PROJESİ', desc: 'Tur sitesi için tur yönetim paneli' },
        { title: 'CANVA ÇALIŞMASI', desc: 'Okul tanıtımı için video projesi' },
        { title: 'CANVA ÇALIŞMASI', desc: 'Okul yemek listesi tasarımı' },
        { title: 'CANVA ÇALIŞMASI', desc: 'STS sınavı için duyuru videosu' },
        { title: 'CANVA ÇALIŞMASI', desc: 'Kahoot bilgi yarışması için sosyal medya görseli' },
        { title: 'CANVA ÇALIŞMASI', desc: 'Tarım sektöründe faaliyet gösteren bir şirket için tanıtım videosu.' },
        { title: 'CANVA ÇALIŞMASI', desc: 'Tarım çalışmaları için sosyal medya paylaşımı.' },
        { title: 'CANVA ÇALIŞMASI', desc: 'Okul teneffüs paylaşımı' },
        { title: 'WEB PROJESİ', desc: 'Film izleme listeleri için basit uygulama...' },
        { title: 'YEREL PROJE', desc: 'Yapay zeka tabanlı araç takip sistemi' },
        { title: 'Yakında', desc: 'yakında...' },
        { title: 'Yakında', desc: 'yakında...' },
        { title: 'Yakında', desc: 'yakında...' }
      ]
    },
    skills: {
      title: "YETENEKLER",
      subtitle: "İnşa etmek için kullandığım araçlar ve teknolojiler"
    },
    projects: {
      title: "Projelerim",
      explore: "( Keşfet )",
      viewDetails: "Detaylar için tıklayın",
      viewLive: "Canlı Gör",
      adminPanel: "Admin Panelini Aç",
      aiAssisted: "🤖 AI Destekli",
      humanCode: "🧑‍💻 %100 İnsan Kodu",
      techStack: "Teknoloji Yığını",
      aiBadge: "🤖 AI",
      humanBadge: "🧑‍💻 İNSAN KODU",
      list: [
        { title: 'Holiday Company', desc: 'Güvenli bir backend yapısına sahip modern bir tatil rezervasyon ve yönetim platformu.' },
        { title: 'Tur Yönetimi', desc: 'Tatil platformu için kapsamlı bir tur yönetim paneli.' },
        { title: 'Pizza Satış Sitesi', desc: 'Özel alışveriş sepeti ve menüsü olan tam fonksiyonel bir pizza sipariş sitesi.' },
        { title: 'Kişisel Web Sitesi', desc: 'Yaratıcı projelerimi ve profesyonel yolculuğumu sergileyen kişisel portfolyo sitesi.' },
        { title: 'Film İzleme Listesi', desc: 'Kişisel izleme listelerini yönetmek için React ve Redux ile oluşturulmuş bir film takip uygulaması.' }
      ]
    },
    resume: {
      title: "Yolculuğum",
      subtitle: "Profesyonel Deneyim ve Eğitim",
      items: [
        { title: "Bilişim Teknolojileri Öğretmeni / Web Yöneticisi", org: "Açı Koleji", desc: "Bilişim Teknolojileri ve Yazılım derslerini işlerken resmi okul web sitesi operasyonlarını yönetme." },
        { title: "Frontend Geliştirici Eğitimi", org: "Workintech", desc: "Modern frontend teknolojileri, React ekosistemi ve profesyonel yazılım geliştirme iş akışlarına odaklanan yoğun eğitim." },
        { title: "Şube Müdürü", org: "Öncü Dürüm Turizm Sanayi ve Ticaret Ltd. Şti.", desc: "Satış, satın alma, envanter ve finansal takip dahil olmak üzere tüm şube operasyonlarını yönetti. Çevrimiçi satış kanallarını, reklamları ve çalışan yönetimini denetledi." },
        { title: "Mağaza Sorumlu Yardımcısı", org: "BİM A.Ş.", desc: "Stok kontrolü, envanter doğruluğu ve günlük sistem kayıtlarından sorumluydu. Mağaza organizasyonunu ve operasyonel verimliliği sağladı." },
        { title: "Bilgisayar Bilimleri Lisansı", org: "Amasya Üniversitesi (BÖTE)", desc: "Web sistemlerine uygulanan eğitim teknolojileri, öğretim tasarımı ve insan-bilgisayar etkileşimi ilkeleri üzerine odaklanarak mezun oldu." },
        { title: "Lise Diploması", org: "Amasya 12 Haziran Anadolu Lisesi", desc: "Fen ve matematik odaklı temel eğitim." }
      ],
      certsTitle: "Ek Nitelikler",
      certsDate: "Sertifikalar",
      certsList: [
        "Frontend Developer Sertifikası – Workintech (2025)",
        "Hijyen Belgesi – İstanbul Gedik Üniversitesi (2023)",
        "Bilgisayar İşletmenliği Sertifikası – Halk Eğitim Merkezi (2018)",
        "Aktif Katılımcı – Uluslararası Amasya BÖTE Kongresi (2015–2016)"
      ]
    },
    footer: { rights: "Tüm hakları saklıdır." }
  },
  nl: {
    nav: { home: "Home", gallery: "Galerij", skills: "Vaardigheden", projects: "Projecten", resume: "Resume" },
    hero: {
      roles: ["Creatieve Developer", "Leraar", "Web Manager", "Restaurant Manager"],
      subtitle: "Ik creëer technologie en onderwijs de toekomst.",
      viewWork: "Bekijk Mijn Werk",
      reviewResume: "Bekijk Resume"
    },
    gallery: {
      title: "Visuele Ruimte",
      subtitle: "Hover om details te onthullen en de galerij te pauzeren",
      list: [
        { title: 'WEBPROJECT', desc: 'Pizza Verkoop Website' },
        { title: 'WEBPROJECT', desc: 'Pizza verkoop website bestelmenu' },
        { title: 'WEBPROJECT', desc: 'Een portfoliosite voor persoonlijk gebruik' },
        { title: 'WEBPROJECT', desc: 'Een project gemaakt voor een reisbureau.' },
        { title: 'WEBPROJECT', desc: 'Dashboard voor toursite' },
        { title: 'WEBPROJECT', desc: 'Hotelbeheerpaneel voor toursite' },
        { title: 'WEBPROJECT', desc: 'Tourbeheerpaneel voor toursite' },
        { title: 'CANVA WERK', desc: 'Een videoproject voor schoolpromotie' },
        { title: 'CANVA WERK', desc: 'Schoollunch menu-ontwerp' },
        { title: 'CANVA WERK', desc: 'Een aankondigingsvideo voor het STS-examen' },
        { title: 'CANVA WERK', desc: 'Social media post voor Kahoot quiz' },
        { title: 'CANVA WERK', desc: 'Een video voor een bedrijf in de agrarische sector.' },
        { title: 'CANVA WERK', desc: 'Social media post voor agrarisch werk.' },
        { title: 'CANVA WERK', desc: 'Schoolpauze post' },
        { title: 'WEBPROJECT', desc: 'Eenvoudige app voor filmwatchlists...' },
        { title: 'LOKAAL PROJECT', desc: 'Auto tracker AI' },
        { title: 'Binnenkort', desc: 'binnenkort...' },
        { title: 'Binnenkort', desc: 'binnenkort...' },
        { title: 'Binnenkort', desc: 'binnenkort...' }
      ]
    },
    skills: {
      title: "VAARDIGHEDEN",
      subtitle: "Tools en technologieën die ik gebruik om te bouwen"
    },
    projects: {
      title: "Mijn Projecten",
      explore: "( Ontdek )",
      viewDetails: "Klik voor details",
      viewLive: "Bekijk Live",
      adminPanel: "Open Admin Paneel",
      aiAssisted: "🤖 AI Ondersteund",
      humanCode: "🧑‍💻 100% Menselijke Code",
      techStack: "Tech Stack",
      aiBadge: "🤖 AI",
      humanBadge: "🧑‍💻 GEEN AI",
      list: [
        { title: 'Holiday Company', desc: 'Een modern vakantieboekings- en beheerplatform met een beveiligde backend.' },
        { title: 'Tourbeheer', desc: 'Een uitgebreid tourbeheerpaneel voor het vakantieplatform.' },
        { title: 'Pizza Verkoop Website', desc: 'Een volledig functionele pizza-bestelwebsite met een aangepast winkelwagentje en menu.' },
        { title: 'Persoonlijke Website', desc: 'Een persoonlijke portfoliowebsite die mijn creative projecten en professionele reis laat zien.' },
        { title: 'Film Watchlist', desc: 'Een app voor het bijhouden van films, gebouwd met React en Redux voor het beheren van persoonlijke watchlists.' }
      ]
    },
    resume: {
      title: "Mijn Reis",
      subtitle: "Professionele Ervaring & Opleiding",
      items: [
        { title: "IT & Software Leraar / Web Manager", org: "Açı College", desc: "Leiden van IT- en softwarecursussen terwijl ik de officiële website-operaties van de school beheer." },
        { title: "Frontend Developer Training", org: "Workintech", desc: "Intensieve training gericht op moderne frontend technologieën en professionele workflows." },
        { title: "Filiaalmanager", org: "Öncü Dürüm Turizm Sanayi ve Ticaret Ltd. Şti.", desc: "Beheer van alle filiaaloperaties inclusief verkoop, inkoop en voorraadbeheer." },
        { title: "Assistent Store Manager", org: "BİM A.Ş.", desc: "Verantwoordelijk voor voorraadbeheer en winkelorganisatie." },
        { title: "BSc in Informatica", org: "Amasya University (BÖTE)", desc: "Afgestudeerd met een focus op educatieve technologieën en interactieprincipes." },
        { title: "Middelbare School Diploma", org: "Amasya 12 Haziran Anatolian High School", desc: "Fundamenteel onderwijs gericht op wetenschap en wiskunde." }
      ],
      certsTitle: "Extra Kwalificaties",
      certsDate: "Certificeringen",
      certsList: [
        "Frontend Developer-certificaat – Workintech (2025)",
        "Hygiënecertificaat – İstanbul Gedik University (2023)",
        "Computervaardigheidscertificaat – Public Education Center (2018)",
        "Actieve bijdrager – Internationaal Amasya BÖTE-congres (2015–2016)"
      ]
    },
    footer: { rights: "Alle rechten voorbehouden." }
  },
  de: {
    nav: { home: "Startseite", gallery: "Galerie", skills: "Fähigkeiten", projects: "Projekte", resume: "Lebenslauf" },
    hero: {
      roles: ["Kreativer Entwickler", "Lehrer", "Web-Manager", "Restaurantleiter"],
      subtitle: "Ich erschaffe Technologie und lehre die Zukunft.",
      viewWork: "Meine Arbeit sehen",
      reviewResume: "Lebenslauf prüfen"
    },
    gallery: {
      title: "Visueller Raum",
      subtitle: "Hovern, um Details anzuzeigen und die Galerie anzuhalten",
      list: [
        { title: 'WEB-PROJEKT', desc: 'Pizza-Verkaufswebsite' },
        { title: 'WEB-PROJEKT', desc: 'Pizza-Bestellmenü der Website' },
        { title: 'WEB-PROJEKT', desc: 'Eine Portfolio-Website für den persönlichen Gebrauch' },
        { title: 'WEB-PROJEKT', desc: 'Ein Projekt für ein Reiseunternehmen.' },
        { title: 'WEB-PROJEKT', desc: 'Dashboard für Reise-Website' },
        { title: 'WEB-PROJEKT', desc: 'Hotel-Management-Panel für Reise-Website' },
        { title: 'WEB-PROJEKT', desc: 'Tour-Management-Panel für Reise-Website' },
        { title: 'CANVA-ARBEIT', desc: 'Ein Videoprojekt für Schulwerbung' },
        { title: 'CANVA-ARBEIT', desc: 'Schulmittagessen Menü-Design' },
        { title: 'CANVA-ARBEIT', desc: 'Ein Ankündigungsvideo für die STS-Prüfung' },
        { title: 'CANVA-ARBEIT', desc: 'Social-Media-Post für Kahoot-Quiz' },
        { title: 'CANVA-ARBEIT', desc: 'Ein Video für ein Unternehmen im Agrarsektor.' },
        { title: 'CANVA-ARBEIT', desc: 'Social-Media-Post für landwirtschaftliche Arbeiten.' },
        { title: 'CANVA-ARBEIT', desc: 'Schulpause Beitrag' },
        { title: 'WEB-PROJEKT', desc: 'Einfache App für Film-Watchlists...' },
        { title: 'LOKALES PROJEKT', desc: 'Auto-Tracker KI' },
        { title: 'Demnächst', desc: 'demnächst...' },
        { title: 'Demnächst', desc: 'demnächst...' },
        { title: 'Demnächst', desc: 'demnächst...' }
      ]
    },
    skills: {
      title: "FÄHIGKEITEN",
      subtitle: "Tools und Technologien, mit denen ich baue"
    },
    projects: {
      title: "Meine Projekte",
      explore: "( Erkunden )",
      viewDetails: "Klicken für Details",
      viewLive: "Live ansehen",
      adminPanel: "Admin-Panel öffnen",
      aiAssisted: "🤖 KI-gestützt",
      humanCode: "🧑‍💻 100% Menschlicher Code",
      techStack: "Tech-Stack",
      aiBadge: "🤖 KI",
      humanBadge: "🧑‍💻 KEINE KI",
      list: [
        { title: 'Holiday Company', desc: 'Eine moderne Urlaubsverarbeitungs- und Verwaltungsplattform mit sicherem Backend.' },
        { title: 'Tour-Management', desc: 'Ein umfassendes Tour-Management-Panel für die Urlaubs-Plattform.' },
        { title: 'Pizza-Verkaufswebsite', desc: 'Eine voll funktionsfähige Pizza-Bestellwebsite mit individuellem Warenkorb und Menü.' },
        { title: 'Persönliche Website', desc: 'Eine persönliche Portfolio-Website, die meine kreativen Projekte und meinen beruflichen Weg zeigt.' },
        { title: 'Film-Watchlist', desc: 'Eine Film-Tracking-Anwendung, die mit React und Redux zur Verwaltung persönlicher Watchlists erstellt wurde.' }
      ]
    },
    resume: {
      title: "Meine Reise",
      subtitle: "Berufserfahrung & Ausbildung",
      items: [
        { title: "IT- & Softwarelehrer / Webmanager", org: "Açı College", desc: "Leitung von IT- und Softwarekursen sowie Verwaltung der offiziellen Schulwebsite." },
        { title: "Frontend-Entwickler-Training", org: "Workintech", desc: "Intensives Training mit Fokus auf moderne Frontend-Technologien und Workflows." },
        { title: "Filialleiter", org: "Öncü Dürüm Turizm Sanayi ve Ticaret Ltd. Şti.", desc: "Verwaltung des gesamten Filialbetriebs einschließlich Verkauf, Einkauf und Finanzen." },
        { title: "Stellvertretender Filialleiter", org: "BİM A.Ş.", desc: "Verantwortlich für Lagerkontrolle, Bestandsgenauigkeit und tägliche Aufzeichnungen." },
        { title: "BSc in Informatik", org: "Amasya University (BÖTE)", desc: "Abschluss mit Fokus auf Bildungstechnologien und Interaktionsprinzipien." },
        { title: "Abitur", org: "Amasya 12 Haziran Anatolian High School", desc: "Grundausbildung mit Fokus auf Naturwissenschaften und Mathematik." }
      ],
      certsTitle: "Zusätzliche Qualifikationen",
      certsDate: "Zertifikate",
      certsList: [
        "Frontend-Entwickler-Zertifikat – Workintech (2025)",
        "Hygienezertifikat – Universität İstanbul Gedik (2023)",
        "Zertifikat über Computerkenntnisse – Volkshochschule (2018)",
        "Aktiver Teilnehmer – Internationaler Amasya BÖTE-Kongress (2015–2016)"
      ]
    },
    footer: { rights: "Alle Rechte vorbehalten." }
  }
};

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState('tr');
  const t = translations[lang];

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

const Hero = () => {
  const { t } = useLanguage();
  const roles = t.hero.roles;
  const [currentRole, setCurrentRole] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [roles.length]);

  return (
    <header id="hero">
      <nav>
        <div className="logo">ELVAN DEMİR<span>.</span></div>
        <ul className="nav-links">
          <li><a href="#hero">{t.nav.home}</a></li>
          <li><a href="#gallery">{t.nav.gallery}</a></li>
          <li><a href="#skills">{t.nav.skills}</a></li>
          <li><a href="#projects">{t.nav.projects}</a></li>
          <li><a href="#resume">{t.nav.resume}</a></li>
        </ul>
        <LanguageSwitcher />
      </nav>
      <div className="hero-content">
        <div className="hero-main">
          <div className="hero-text">
            <div className="glitch-wrapper">
              <h1 className="glitch" data-text={roles[currentRole]}>
                {roles[currentRole]}
              </h1>
            </div>

            <div className="social-links">
              <a href="https://www.linkedin.com/in/elvan-demir-437139252/" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
              </a>
              <a href="https://x.com/nocelvis00" aria-label="X (Twitter)" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
              </a>
              <a href="https://www.instagram.com/elvsdmr/" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
              </a>
              <a href="https://github.com/elvanis05?tab=repositories" aria-label="GitHub" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
              </a>
              <a href="https://codepen.io/Elvan-Demir-the-styleful" aria-label="CodePen" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24"><path d="M24 8.25c0-.129-.026-.254-.078-.372-.053-.119-.133-.225-.236-.312L12.472.246a1.189 1.189 0 00-1.444 0L.314 7.566C.211 7.653.131 7.759.078 7.878A1.173 1.173 0 000 8.25v7.5c0 .129.026.254.078.372.053.119.133.225.236.312l11.214 7.32a1.189 1.189 0 001.444 0l11.214-7.32c.103-.087.183-.193.236-.312s.078-.243.078-.372v-7.5zm-11.25 10.92l-6.848-4.47 2.378-1.574 4.47 2.955v3.089zm0-4.665l-3.32-2.195 3.32-2.195 3.32 2.195-3.32 2.195zm0-9.255v3.089l-4.47 2.955-2.378-1.574 6.848-4.47zm1.5 0l6.848 4.47-2.378 1.574-4.47-2.955V5.25zm0 9.255l3.32-2.195 3.32 2.195-6.64 4.39V14.505z" /></svg>
              </a>
              <a href="mailto:elvanus05@gmail.com" aria-label="Email">
                <svg viewBox="0 0 24 24"><path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z" /></svg>
              </a>
            </div>

            <p className="subtitle">{t.hero.subtitle}</p>
            <div className="hero-buttons">
              <a href="#projects" className="btn primary-btn">{t.hero.viewWork}</a>
              <a href="#resume" className="btn secondary-btn">{t.hero.reviewResume}</a>
            </div>
          </div>

          <div className="hero-image-container">
            <div className="image-glow"></div>
            <img src="/Myimg.jpg" alt="Elvan Profile" className="hero-profile-img" />
          </div>
        </div>
      </div>
    </header>
  );
};

const LanguageSwitcher = () => {
  const { lang, setLang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = React.useRef(null);

  const languages = [
    { code: 'en', name: 'English', flagUrl: 'https://flagcdn.com/w40/gb.png', alt: 'GB flag' },
    { code: 'tr', name: 'Türkçe', flagUrl: 'https://flagcdn.com/w40/tr.png', alt: 'TR flag' },
    { code: 'nl', name: 'Dutch', flagUrl: 'https://flagcdn.com/w40/nl.png', alt: 'NL flag' },
    { code: 'de', name: 'Deutsch', flagUrl: 'https://flagcdn.com/w40/de.png', alt: 'DE flag' }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="lang-switcher" ref={dropdownRef}>
      <button onClick={() => setIsOpen(!isOpen)} className="lang-btn" type="button">
        <img
          src={languages.find(l => l.code === lang).flagUrl}
          alt={languages.find(l => l.code === lang).alt}
          className="lang-flag-img"
        />
        <span>{lang.toUpperCase()}</span>
        <span style={{ fontSize: '0.7rem', opacity: 0.5 }}>{isOpen ? '▲' : '▼'}</span>
      </button>
      {isOpen && (
        <ul className="lang-dropdown">
          {languages.map((l) => (
            <li key={l.code} onClick={() => { setLang(l.code); setIsOpen(false); }}>
              <img src={l.flagUrl} alt={l.alt} className="lang-flag-img" />
              <span className="lang-name">{l.name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const Gallery = () => {
  const { t } = useLanguage();
  const galleryData = [
    { img: '/Gallery/pizzahome.png' },
    { img: '/Gallery/pizzaorder.png' },
    { img: '/Gallery/Personweb.png' },
    { img: '/Gallery/stra.png' },
    { img: '/Gallery/stradash.png' },
    { img: '/Gallery/strahotel.png' },
    { img: '/Gallery/stratours.png' },
    { img: '/Gallery/canvaschool1.png' },
    { img: '/Gallery/schollmenu.png' },
    { img: '/Gallery/sts.png' },
    { img: '/Gallery/kahoot.jpg' },
    { img: '/Gallery/trm.png' },
    { img: '/Gallery/btk.png' },
    { img: '/Gallery/mola.png' },
    { img: '/Gallery/CinemaList.png' },
    { img: '/Gallery/car.png' },
    { img: '/Gallery/coming.jpg' },
    { img: '/Gallery/coming.jpg' },
    { img: '/Gallery/coming.jpg' }
  ];

  const numItems = galleryData.length;

  return (
    <section id="gallery" className="gallery-scroll-wrapper section" style={{ padding: 0 }}>
      <div className="gallery-header">
        <h2>{t.gallery.title}</h2>
        <p>{t.gallery.subtitle}</p>
      </div>

      <div className="gallery-auto-scene" style={{ '--n': numItems }}>
        <section className="assembly">
          {galleryData.map((item, idx) => {
            const itemTrans = t.gallery.list && t.gallery.list[idx] ? t.gallery.list[idx] : { title: '', desc: '' };
            return (
              <article key={idx} style={{ '--i': idx, '--url': `url(${item.img})` }}>
                <header>
                  <h2>{itemTrans.title}</h2>
                  <em>{itemTrans.desc}</em>
                </header>
                <figure>
                  <img src={item.img} alt={itemTrans.title} />
                </figure>
              </article>
            );
          })}
        </section>
      </div>
    </section>
  );
};

const Skills = () => {
  const { t } = useLanguage();
  const allSkills = [
    { name: 'JavaScript', icon: '/icon/javascript.svg' },
    { name: 'Adobe Flash', icon: '/icon/flash.svg' },
    { name: 'React', icon: '/icon/react.svg' },
    { name: 'Tailwind', icon: '/icon/tailwind.svg' },
    { name: 'Node.js', icon: '/icon/nodejs.svg' },
    { name: 'VS Code', icon: '/icon/vscode.svg' },
    { name: 'Figma', icon: '/icon/figma.svg' },
    { name: 'Microsoft Office', icon: '/icon/oficce.svg' },
    { name: 'Redux', icon: '/icon/redux.svg' },
    { name: 'Cypress', icon: '/icon/cypress.svg' },
    { name: 'HTML5', icon: '/icon/html5.svg' },
    { name: 'CSS3', icon: '/icon/css3.svg' },
    { name: 'Canva', icon: '/icon/canva.svg' },
    { name: 'CapCut', icon: '/icon/capcut.png' },
    { name: 'Google Antigravity', icon: '/icon/google-antigravity.svg' },
    { name: 'Claude Code', icon: '/icon/claude.svg' }
  ];

  return (
    <section id="skills" className="section">
      <div className="section-title">
        <h2>{t.skills.title}</h2>
        <p>{t.skills.subtitle}</p>
      </div>
      <div className="skills-grid">
        {allSkills.map((skill, index) => (
          <div className="skill-item" key={index}>
            <img src={skill.icon} alt={skill.name} />
            <p>{skill.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const skillIcons = {
  html5: "/icon/html5.svg",
  css3: "/icon/css3.svg",
  javascript: "/icon/javascript.svg",
  react: "/icon/react.svg",
  nodejs: "/icon/nodejs.svg",
  figma: "/icon/figma.svg",
  python: "/icon/python.svg",
  typescript: "/icon/typescript.svg",
  mongodb: "/icon/mongodb.svg",
  tailwind: "/icon/tailwind.svg",
  vscode: "/icon/vscode.svg",
  redux: "/icon/redux.svg",
  canva: "/icon/canva.svg",
  capcut: "/icon/capcut.png",
  flash: "/icon/flash.svg",
  office: "/icon/oficce.svg",
  antigravity: "/icon/google-antigravity.svg",
  claudecode: "/icon/claude.svg",
  cypress: "/icon/cypress.svg"
};

const Projects = () => {
  const { t } = useLanguage();
  const [modalData, setModalData] = useState(null);

  const projectsBase = [
    { isAI: true, skills: ['html5', 'javascript', 'css3', 'react', 'nodejs', 'antigravity'], img: '/Gallery/stra.png', link: 'https://holiday-company-2026.vercel.app/' },
    { isAI: true, skills: ['html5', 'javascript', 'css3', 'react', 'nodejs', 'antigravity'], img: '/Gallery/stratours.png', link: 'https://holiday-company-2026.vercel.app/admin' },
    { isAI: false, skills: ['html5', 'javascript', 'css3', 'react', 'nodejs', 'vscode'], img: '/Gallery/pizzahome.png', link: 'https://fsweb-s8-challenge-pizza-green.vercel.app/' },
    { isAI: false, skills: ['html5', 'css3', 'javascript', 'vscode'], img: '/Gallery/Personweb.png', link: 'https://my-site-kufi.vercel.app/' },
    { isAI: false, skills: ['react', 'redux', 'javascript', 'css3', 'vscode'], img: '/Gallery/CinemaList.png', link: 'https://fsweb-s10g3-redux-watchlist-solutio-three.vercel.app/' },
  ];

  const projectsList = projectsBase.map((p, i) => ({
    ...p,
    title: t.projects.list[i].title,
    desc: t.projects.list[i].desc
  }));

  const openModal = (project, e) => {
    e.preventDefault();
    setModalData(project);
  };

  const closeModal = () => {
    setModalData(null);
  };

  useEffect(() => {
    if (modalData) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [modalData]);

  return (
    <section id="projects" className="section">
      <div className="content-wrap">
        <h1>{t.projects.title}</h1>
        <h6>{t.projects.explore}</h6>
        <p><span style={{ opacity: 0.8 }}>▼</span><br /><span style={{ opacity: .6 }}>▼</span><br /><span style={{ opacity: .4 }}>▼</span><br /><span style={{ opacity: .2 }}>▼</span></p>
      </div>

      <ul id="hexGrid">
        {projectsList.map((proj, idx) => (
          <li className="hex" key={idx}>
            <a className="hexIn" href="#modal" onClick={(e) => openModal(proj, e)}>
              <img src={proj.img} alt={proj.title} />
              <div className={`ai-badge ${proj.isAI ? 'ai' : 'no-ai'}`}>
                {proj.isAI ? t.projects.aiBadge : t.projects.humanBadge}
              </div>
              <h1>{proj.title}</h1>
              <p className="hex-desc">{t.projects.viewDetails}</p>
            </a>
          </li>
        ))}
      </ul>

      {modalData && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <span className="close-modal" onClick={closeModal}>&times;</span>
            <img src={modalData.img} alt={modalData.title} />
            <div className="modal-info">
              <h2>{modalData.title}</h2>
              <div className={`modal-ai-badge ${modalData.isAI ? 'ai' : 'no-ai'}`}>
                {modalData.isAI ? t.projects.aiAssisted : t.projects.humanCode}
              </div>
              <p>{modalData.desc}</p>

              {modalData.skills && modalData.skills.length > 0 && (
                <div className="modal-skills">
                  <h4>{t.projects.techStack}</h4>
                  <div className="modal-skills-icons">
                    {modalData.skills.map(skill => (
                      skillIcons[skill.toLowerCase()] && (
                        <img
                          key={skill}
                          src={skillIcons[skill.toLowerCase()]}
                          alt={skill}
                          title={skill.charAt(0).toUpperCase() + skill.slice(1)}
                        />
                      )
                    ))}
                  </div>
                </div>
              )}

              <a href={modalData.link} target="_blank" rel="noopener noreferrer" className="btn primary-btn">
                {modalData.link.includes('admin') ? t.projects.adminPanel : t.projects.viewLive}
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

const Resume = () => {
  const { t } = useLanguage();
  return (
    <section id="resume" className="section">
      <div className="section-title">
        <h2>{t.resume.title}</h2>
        <p>{t.resume.subtitle}</p>
      </div>
      <div className="timeline">
        {t.resume.items.map((item, idx) => (
          <div className="timeline-item" key={idx}>
            <div className="timeline-dot"></div>
            <div className="timeline-date">
              {idx === 0 ? "2025 - 2026" :
                idx === 1 ? "2025" :
                  idx === 2 ? "01/2023 - 05/2024" :
                    idx === 3 ? "03/2022 - 05/2022" :
                      idx === 4 ? "2015 - 2020" :
                        "2011 - 2015"}
            </div>
            <div className="timeline-content">
              <h3>{item.title}</h3>
              <p>{item.org}</p>
              <p className="timeline-desc">{item.desc}</p>
            </div>
          </div>
        ))}

        <div className="timeline-item">
          <div className="timeline-dot"></div>
          <div className="timeline-date">{t.resume.certsDate}</div>
          <div className="timeline-content">
            <h3>{t.resume.certsTitle}</h3>
            <ul style={{ listStyle: 'none', padding: 0, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              {t.resume.certsList && t.resume.certsList.map((cert, index) => (
                <li key={index}>• {cert}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

function AppContent() {
  const { t } = useLanguage();
  return (
    <>
      <Hero />
      <Gallery />
      <Skills />
      <Projects />
      <Resume />
      <footer>
        <p>&copy; 2026 Elvan. {t.footer.rights}</p>
      </footer>
    </>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;

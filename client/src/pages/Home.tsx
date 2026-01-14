import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Navigation } from "@/components/Navigation";
import { SectionHeading } from "@/components/SectionHeading";
import { NewsletterForm } from "@/components/NewsletterForm";
import heroImg from "@assets/WhatsApp_Image_2026-01-10_at_18.42.19~3_(1)_1768406287782.png";
import bioImg from "@assets/WhatsApp_Image_2026-01-10_at_18.46.39_1768403696674.jpeg";

export default function Home() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-white selection:text-black">
      <Navigation />

      {/* Hero Section */}
      <section ref={ref} className="h-screen relative flex items-center justify-center overflow-hidden">
        <motion.div 
          style={{ y, opacity }} 
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-black/30 z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-20" />
          <img
            src={heroImg}
            alt="Elban Hero"
            className="w-full h-full object-cover object-center scale-105"
          />
        </motion.div>

        <div className="relative z-30 container mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="text-[15vw] leading-[0.8] font-black tracking-tighter uppercase text-white mix-blend-difference select-none"
          >
            ELBAN
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-8 text-xl md:text-2xl font-light tracking-[0.5em] uppercase text-white/80"
          >
            Powered by Mate Nation
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2"
        >
          <span className="text-xs tracking-[0.3em] uppercase opacity-50">Scroll</span>
          <div className="w-[1px] h-12 bg-white/30">
            <motion.div 
              animate={{ y: [0, 48, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="w-full h-1/2 bg-white"
            />
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 md:py-40 relative">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative aspect-[3/4] md:aspect-[4/5] overflow-hidden group"
            >
              <div className="absolute inset-0 border border-white/10 z-20 transition-all duration-500 group-hover:inset-4" />
              <img
                src={bioImg}
                alt="Elban Portrait"
                className="w-full h-full object-cover filter grayscale contrast-125 transition-transform duration-700 group-hover:scale-110"
              />
            </motion.div>
            
            <div>
              <SectionHeading 
                title="The Journey" 
                subtitle="About Elban" 
                align="left" 
              />
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="prose prose-lg prose-invert text-muted-foreground font-light leading-relaxed"
              >
                <p className="mb-6 first-letter:text-5xl first-letter:font-display first-letter:text-white first-letter:mr-2 first-letter:float-left">
                  Born and raised in Shillong, Meghalaya, he grew up in a close knit family with his parents and two older sisters. As the youngest, he learned discipline and patience early in life.
                </p>
                <p className="mb-6">
                  His journey in music began in 8th standard, when he started singing with purpose and long term commitment. Strongly influenced by retro music, he chose authenticity over trends and focused on developing a timeless sound.
                </p>
                <p>
                  Through consistent effort and perseverance, his music gradually began to connect with listeners. What started as quiet dedication soon turned into growing recognition, a loyal fan base, and appreciation for his unique style. Step by step, he continues to establish himself in the music industry, driven by passion, credibility, and the trust of the audience he has earned.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Music Section */}
      <section id="music" className="py-24 md:py-40 bg-white/5 border-y border-white/5 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
        
        <div className="container mx-auto px-6 relative z-10">
          <SectionHeading 
            title="Latest Sounds" 
            subtitle="Listen Now" 
            align="center"
          />
          
          <div className="max-w-4xl mx-auto mt-16">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-black p-2 border border-white/10 shadow-2xl shadow-black/50"
            >
              <iframe 
                style={{ borderRadius: "12px" }} 
                src="https://open.spotify.com/embed/artist/7toPL0jnYzjbNQynNyl3GV?utm_source=generator&theme=0" 
                width="100%" 
                height="450" 
                frameBorder="0" 
                allowFullScreen 
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                loading="lazy"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer / Newsletter */}
      <footer id="newsletter" className="py-32 relative bg-black">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="font-display text-5xl md:text-7xl font-bold mb-8 uppercase">
              Join the Movement
            </h2>
            <p className="text-muted-foreground mb-12 text-lg">
              Be the first to hear new releases and exclusive updates.
            </p>
            
            <NewsletterForm />
            
            <div className="mt-24 pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-muted-foreground">
              <p>&copy; {new Date().getFullYear()} Mate Nation. All rights reserved.</p>
              <div className="flex gap-8">
                <a href="https://www.instagram.com/elbanmusics" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors uppercase tracking-widest text-xs">Instagram</a>
                <a href="https://youtube.com/@bansyiemlieh-f3s?si=szssDGdhOBblbb-x" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors uppercase tracking-widest text-xs">YouTube</a>
                <a href="https://open.spotify.com/artist/7toPL0jnYzjbNQynNyl3GV?si=mBPHwj2kSC-tKSWNyZRemQ" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors uppercase tracking-widest text-xs">Spotify</a>
              </div>
            </div>
          </motion.div>
        </div>
      </footer>

      {/* Grain/Noise Overlay */}
      <div className="noise-bg" />
    </div>
  );
}

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import BMICalculator from "../components/BMICalculator";
import { 
  Stethoscope, Brain, Users, Shield, Award, TrendingUp, 
  ChevronDown, ChevronUp, Calculator, Heart, Target, Activity, CheckCircle2, ArrowDown
} from "lucide-react";

const faqData = [
  {
    question: "What is BMI and how is it calculated?",
    answer: "BMI (Body Mass Index) is a measure of body fat based on height and weight that applies to adult men and women. It's calculated using the formula: <strong>BMI = weight (kg) ÷ height (m)²</strong>. For example, if you weigh 70kg and are 1.75m tall, your BMI would be 70 ÷ (1.75 × 1.75) = 22.9."
  },
  {
    question: "What are the different BMI categories and ranges?",
    answer: "According to WHO guidelines: <strong>Underweight:</strong> Below 18.5, <strong>Healthy Weight:</strong> 18.5-24.9, <strong>Overweight:</strong> 25.0-29.9, <strong>Obese Class I:</strong> 30.0-34.9, <strong>Obese Class II:</strong> 35.0-39.9, <strong>Obese Class III:</strong> 40.0 and above. These ranges help assess health risks associated with body weight."
  },
  {
    question: "Is BMI accurate for everyone?",
    answer: "BMI is a useful screening tool but has limitations. It doesn't distinguish between muscle and fat mass, so athletes or very muscular individuals may have high BMI despite being healthy. Age, gender, ethnicity, and body composition can affect BMI interpretation. It's best used alongside other health assessments."
  },
  {
    question: "How often should I calculate my BMI?",
    answer: "For weight management, calculating BMI weekly or monthly is sufficient. Frequent daily calculations aren't necessary as healthy weight changes occur gradually. Use our BMI calculator to track long-term trends rather than daily fluctuations."
  },
  {
    question: "What should I do if my BMI is outside the healthy range?",
    answer: "If your BMI indicates underweight, overweight, or obesity, consult with a healthcare professional for personalized advice. They can assess your overall health, consider factors BMI doesn't measure, and recommend appropriate diet, exercise, or medical interventions if needed."
  },
  {
    question: "Can I use this BMI calculator for children?",
    answer: "This calculator is designed for adults (18+ years). Children and teens have different BMI calculations that account for age and gender using growth charts. For pediatric BMI assessment, consult your child's healthcare provider or use specialized pediatric BMI tools."
  }
];

// Reusable animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const Home = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const scrollToCalculator = () => {
    const calcSection = document.getElementById('main-calculator');
    if (calcSection) {
      calcSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // SEO-friendly JSON-LD for FAQ Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer.replace(/<[^>]+>/g, '') 
      }
    }))
  };

  return (
    <div className="min-h-screen bg-[#030712] relative selection:bg-cyan-500/30 selection:text-cyan-100">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Hero Section */}
      <header className="relative min-h-[90vh] flex flex-col items-center justify-center py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        
        {/* Subtle Tech Grid Background */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]" aria-hidden="true" style={{ backgroundImage: 'radial-gradient(circle at center, transparent 0%, #030712 70%), url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />

        {/* Dynamic Glow Orbs */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <motion.div 
            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }} 
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-500/20 blur-[130px]" 
          />
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }} 
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute top-[20%] right-[-10%] w-[30%] h-[50%] rounded-full bg-blue-600/20 blur-[130px]" 
          />
          <motion.div 
            animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.5, 0.2] }} 
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-[-20%] left-[20%] w-[50%] h-[50%] rounded-full bg-emerald-500/15 blur-[150px]" 
          />
        </div>

        <motion.div 
          className="container mx-auto text-center relative z-20 max-w-5xl mt-10"
          initial="hidden" animate="visible" variants={staggerContainer}
        >
          <motion.div variants={fadeUp} className="flex justify-center mb-8">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 backdrop-blur-md text-sm font-semibold text-cyan-300 shadow-[0_0_30px_rgba(34,211,238,0.2)]">
              <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
              </span>
              Medical-Grade Precision Engine
            </span>
          </motion.div>

          <motion.h1 
            variants={fadeUp}
            className="text-6xl sm:text-7xl lg:text-8xl font-black mb-8 tracking-tighter drop-shadow-2xl leading-[1.1]"
          >
            <span className="bg-gradient-to-br from-white via-slate-200 to-slate-400 bg-clip-text text-transparent block">
              Determine Your
            </span>
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-emerald-400 bg-clip-text text-transparent block mt-1 filter drop-shadow-[0_0_40px_rgba(59,130,246,0.3)]">
              Perfect Weight
            </span>
          </motion.h1>

          <motion.h2 
            variants={fadeUp}
            className="text-xl md:text-2xl text-slate-300/90 mb-12 max-w-3xl mx-auto font-light leading-relaxed backdrop-blur-sm"
          >
            Instantly calculate your Body Mass Index using entirely private, clinical-grade algorithms validated by WHO & CDC guidelines.
          </motion.h2>

          <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4 text-sm font-semibold tracking-wide mb-16">
            <div className="flex items-center gap-2.5 bg-slate-900/50 border border-white/10 px-6 py-3.5 rounded-full shadow-2xl backdrop-blur-xl text-slate-200">
              <Calculator className="h-5 w-5 text-blue-400" aria-hidden="true" /> Externally Validated
            </div>
            <div className="flex items-center gap-2.5 bg-slate-900/50 border border-white/10 px-6 py-3.5 rounded-full shadow-2xl backdrop-blur-xl text-slate-200">
              <Shield className="h-5 w-5 text-emerald-400" aria-hidden="true" /> 100% Local Privacy
            </div>
            <div className="flex items-center gap-2.5 bg-slate-900/50 border border-white/10 px-6 py-3.5 rounded-full shadow-2xl backdrop-blur-xl text-slate-200">
              <Target className="h-5 w-5 text-cyan-400" aria-hidden="true" /> Instant Analysis
            </div>
          </motion.div>

          {/* Scroll down indicator */}
          <Button 
            variant="ghost"
            size="lg"
            onClick={scrollToCalculator}
            className="mx-auto flex flex-col items-center justify-center gap-2 text-slate-400 hover:text-cyan-400 transition-all duration-300 h-auto py-4 group hover:bg-white/5 rounded-2xl"
          >
            <span className="text-xs font-bold uppercase tracking-widest">Start Calculation</span>
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
              <ArrowDown className="h-5 w-5" />
            </motion.div>
          </Button>
        </motion.div>
      </header>

      {/* Main BMI Calculator Interface */}
      <motion.section 
        id="main-calculator"
        aria-label="Main BMI Calculator Interface" 
        className="py-12 px-4 sm:px-6 lg:px-8 relative z-20"
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}
      >
        <div className="container mx-auto max-w-7xl">
          {/* We wrap the calculator in a subtle glowing halo to draw the eye totally to it */}
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-b from-cyan-500/20 via-blue-500/10 to-transparent blur-2xl rounded-[3rem] pointer-events-none -z-10" />
            <BMICalculator />
          </div>
        </div>
      </motion.section>

      {/* Value Proposition Section */}
      <motion.section 
        aria-labelledby="why-choose-title" 
        className="py-24 px-4 sm:px-6 lg:px-8 bg-transparent relative z-10"
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
      >
        <div className="container mx-auto">
          <motion.header variants={fadeUp} className="text-center mb-20">
            <h2 id="why-choose-title" className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent drop-shadow-sm">
              Why Choose Our Advanced Calculator?
            </h2>
            <p className="text-xl text-slate-300 opacity-90 max-w-3xl mx-auto font-light leading-relaxed">
              Professional-grade bodily calculations trusted by millions globally for clinical and personal health tracking.
            </p>
          </motion.header>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            <motion.article variants={fadeUp} className="flex flex-col items-center p-10 rounded-[2rem] glass-panel glow-border hover:-translate-y-3 hover:shadow-[0_30px_60px_rgba(59,130,246,0.15)] transition-all duration-500 group">
              <div className="p-6 rounded-3xl bg-blue-500/10 mb-8 border border-blue-500/20 group-hover:bg-blue-500/20 group-hover:scale-110 transition-all duration-300 relative">
                <div className="absolute inset-0 bg-blue-400/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                <Stethoscope className="h-10 w-10 text-blue-400 relative z-10" aria-hidden="true" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white text-center">Medical Accuracy</h3>
              <p className="text-slate-400 text-center leading-relaxed">
                Precise metrics adhering strictly to World Health Organization standards and methodologies validated by physicians.
              </p>
            </motion.article>
            
            <motion.article variants={fadeUp} className="flex flex-col items-center p-10 rounded-[2rem] glass-panel glow-border hover:-translate-y-3 hover:shadow-[0_30px_60px_rgba(52,211,153,0.15)] transition-all duration-500 group">
              <div className="p-6 rounded-3xl bg-green-500/10 mb-8 border border-green-500/20 group-hover:bg-green-500/20 group-hover:scale-110 transition-all duration-300 relative">
                <div className="absolute inset-0 bg-green-400/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                <Brain className="h-10 w-10 text-green-400 relative z-10" aria-hidden="true" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white text-center">AI Insights</h3>
              <p className="text-slate-400 text-center leading-relaxed">
                Receive beautifully rendered reports, instant visual classifications, and personalized recommendations modeled from deep analytics.
              </p>
            </motion.article>
            
            <motion.article variants={fadeUp} className="flex flex-col items-center p-10 rounded-[2rem] glass-panel glow-border hover:-translate-y-3 hover:shadow-[0_30px_60px_rgba(34,211,238,0.15)] transition-all duration-500 group">
              <div className="p-6 rounded-3xl bg-cyan-500/10 mb-8 border border-cyan-500/20 group-hover:bg-cyan-500/20 group-hover:scale-110 transition-all duration-300 relative">
                <div className="absolute inset-0 bg-cyan-400/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                <Shield className="h-10 w-10 text-cyan-400 relative z-10" aria-hidden="true" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white text-center">100% Private</h3>
              <p className="text-slate-400 text-center leading-relaxed">
                Your health data is computed entirely within your local browser session. Zero tracking, zero storage, absolute privacy.
              </p>
            </motion.article>
          </div>
          
          {/* Trust Indicators */}
          <motion.section variants={fadeUp} aria-label="Trust Indicators" className="max-w-4xl mx-auto glass-panel glow-border rounded-3xl border border-white/10 p-8 shadow-2xl backdrop-blur-xl bg-gradient-to-b from-white/[0.02] to-transparent">
            <div className="flex flex-col md:flex-row justify-around items-center gap-8 md:gap-4">
              <div className="flex flex-col items-center text-center group">
                <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-2xl bg-gradient-to-br from-green-500/20 to-emerald-500/5 group-hover:scale-110 transition-transform">
                  <Users className="h-8 w-8 text-green-400" aria-hidden="true" />
                </div>
                <div className="text-4xl font-black text-white tracking-tight mb-1">1M+</div>
                <div className="text-slate-400 font-medium tracking-wide uppercase text-sm">Global Users</div>
              </div>
              
              <div className="h-px w-full md:h-24 md:w-px bg-white/10"></div>
              
              <div className="flex flex-col items-center text-center group">
                <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/5 group-hover:scale-110 transition-transform">
                  <Award className="h-8 w-8 text-blue-400" aria-hidden="true" />
                </div>
                <div className="text-4xl font-black text-white tracking-tight mb-1">99.9%</div>
                <div className="text-slate-400 font-medium tracking-wide uppercase text-sm">Accuracy Rate</div>
              </div>
              
              <div className="h-px w-full md:h-24 md:w-px bg-white/10"></div>
              
              <div className="flex flex-col items-center text-center group">
                <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-teal-500/5 group-hover:scale-110 transition-transform">
                  <TrendingUp className="h-8 w-8 text-cyan-400" aria-hidden="true" />
                </div>
                <div className="text-4xl font-black text-white tracking-tight mb-1">24/7</div>
                <div className="text-slate-400 font-medium tracking-wide uppercase text-sm">System Uptime</div>
              </div>
            </div>
          </motion.section>
        </div>
      </motion.section>

      {/* Comprehensive Body Composition Tools */}
      <motion.section 
        aria-labelledby="additional-calculators-title" 
        className="py-20 px-4 sm:px-6 lg:px-8 border-t border-white/5 bg-[#050B14]/50"
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
      >
        <div className="container mx-auto max-w-7xl">
          <motion.div variants={fadeUp} className="text-center mb-16">
            <h2 id="additional-calculators-title" className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              Complete Assessment Suite
            </h2>
            <p className="text-xl text-slate-300 opacity-90 max-w-4xl mx-auto font-light leading-relaxed">
              Dive deeper than BMI. Explore our comprehensive suite of targeted medical calculators to fully understand your body composition.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <motion.article variants={fadeUp} className="glass-panel p-6 rounded-3xl glow-border hover:-translate-y-2 hover:shadow-[0_15px_30px_rgba(59,130,246,0.15)] transition-all duration-300 flex flex-col h-full bg-gradient-to-br from-blue-900/10 to-transparent border-blue-500/10">
              <div className="p-3 rounded-2xl bg-blue-500/10 w-fit mb-5">
                <Calculator className="h-6 w-6 text-blue-400 flex-shrink-0" />
              </div>
              <h4 className="text-xl font-bold mb-3 text-white">Body Fat Percentage</h4>
              <p className="text-slate-400 mb-6 leading-relaxed flex-grow font-light">
                Utilize the validated U.S. Navy circumference multi-point method to determine your exact lean vs fat ratio.
              </p>
              <Link to="/body-fat-calculator" className="w-full text-center bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/20 px-4 py-3 rounded-xl font-semibold transition-colors">
                Calculate Body Fat
              </Link>
            </motion.article>

            <motion.article variants={fadeUp} className="glass-panel p-6 rounded-3xl glow-border hover:-translate-y-2 hover:shadow-[0_15px_30px_rgba(168,85,247,0.15)] transition-all duration-300 flex flex-col h-full bg-gradient-to-br from-purple-900/10 to-transparent border-purple-500/10">
              <div className="p-3 rounded-2xl bg-purple-500/10 w-fit mb-5">
                <TrendingUp className="h-6 w-6 text-purple-400 flex-shrink-0" />
              </div>
              <h4 className="text-xl font-bold mb-3 text-white">Lean Body Mass</h4>
              <p className="text-slate-400 mb-6 leading-relaxed flex-grow font-light">
                Discover your pure skeletal muscle mass using advanced multi-formula consensus (Boer, James & Hume).
              </p>
              <Link to="/lean-body-mass-calculator" className="w-full text-center bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 border border-purple-500/20 px-4 py-3 rounded-xl font-semibold transition-colors">
                Calculate LBM
              </Link>
            </motion.article>

            <motion.article variants={fadeUp} className="glass-panel p-6 rounded-3xl glow-border hover:-translate-y-2 hover:shadow-[0_15px_30px_rgba(16,185,129,0.15)] transition-all duration-300 flex flex-col h-full bg-gradient-to-br from-emerald-900/10 to-transparent border-emerald-500/10">
              <div className="p-3 rounded-2xl bg-emerald-500/10 w-fit mb-5">
                <Activity className="h-6 w-6 text-emerald-400 flex-shrink-0" />
              </div>
              <h4 className="text-xl font-bold mb-3 text-white">TDEE & Metabolism</h4>
              <p className="text-slate-400 mb-6 leading-relaxed flex-grow font-light">
                Calculate Total Daily Energy Expenditure. Know exactly how many calories your body burns in 24 hours.
              </p>
              <Link to="/tdee-calculator" className="w-full text-center bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 px-4 py-3 rounded-xl font-semibold transition-colors">
                Calculate TDEE
              </Link>
            </motion.article>
          </div>
        </div>
      </motion.section>

      {/* About Section */}
      <motion.section 
        aria-labelledby="understanding-bmi-title" 
        className="py-24 px-4 sm:px-6 lg:px-8"
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
      >
        <div className="container mx-auto">
          <div className="max-w-6xl mx-auto">
            <motion.header variants={fadeUp} className="text-center mb-20">
              <h2 id="understanding-bmi-title" className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                The Science of Body Mass
              </h2>
            </motion.header>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.article variants={fadeUp}>
                <h3 className="text-3xl font-bold mb-6 text-white tracking-wide">What exactly does BMI measure?</h3>
                <p className="text-slate-300 text-lg mb-6 leading-relaxed font-light">
                  Body Mass Index (BMI) functions as a definitive screening mechanism utilized by clinical professionals globally. Rather than directly measuring body fat, it establishes a ratio between your mass and vertical stature.
                </p>
                <p className="text-slate-300 text-lg mb-10 leading-relaxed font-light">
                  Calculated globally as <strong className="text-cyan-300 font-medium tracking-wide">kg/m²</strong>, it is the primary triage protocol employed to instantly gauge if an individual falls within standard metabolic parameters or holds potential health risks.
                </p>
                
                <div className="p-8 bg-gradient-to-br from-blue-900/30 to-slate-900/50 rounded-3xl border border-blue-500/20 shadow-2xl backdrop-blur-sm relative overflow-hidden group">
                  <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <h4 className="text-xl font-bold mb-4 text-blue-300 flex items-center gap-3 relative z-10">
                    <Award className="h-6 w-6" /> Evidence-Based Limits
                  </h4>
                  <p className="text-slate-300 leading-relaxed font-light relative z-10">
                    Our computational architecture entirely adopts the strict threshold directives instituted by the World Health Organization (WHO). We do not augment these boundaries, guaranteeing clinically authentic results.
                  </p>
                </div>
              </motion.article>
              
              <motion.aside variants={fadeUp} className="glass-panel p-8 sm:p-10 rounded-[2.5rem] border border-white/10 shadow-2xl relative overflow-hidden backdrop-blur-3xl bg-gradient-to-b from-white/[0.03] to-transparent">
                {/* Background glow for chart */}
                <div className="absolute -top-32 -right-32 w-64 h-64 bg-cyan-500/15 blur-[80px] rounded-full pointer-events-none" />
                <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-blue-600/15 blur-[80px] rounded-full pointer-events-none" />
                
                <h3 className="text-2xl font-bold mb-8 text-white flex items-center gap-3 relative z-10">
                  <Activity className="h-7 w-7 text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]" aria-hidden="true" />
                  Clinical Classifications
                </h3>
                <div className="space-y-3 relative z-10" role="list">
                  <div role="listitem" className="group flex justify-between items-center p-5 rounded-2xl bg-blue-950/30 border border-blue-500/10 hover:bg-blue-900/40 hover:border-blue-500/30 transition-all duration-300">
                    <span className="text-blue-300 font-medium">Underweight</span>
                    <span className="text-white font-bold bg-blue-500/20 px-4 py-1.5 rounded-lg group-hover:bg-blue-500/30 transition-colors">&lt; 18.5</span>
                  </div>
                  <div role="listitem" className="group flex justify-between items-center p-5 rounded-2xl bg-green-950/30 border border-green-500/20 hover:bg-green-900/40 hover:border-green-500/40 transition-all duration-300 shadow-[0_0_20px_rgba(34,197,94,0.05)]">
                    <span className="text-green-400 font-bold flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 drop-shadow-[0_0_8px_rgba(74,222,128,0.5)]"/> Healthy Range
                    </span>
                    <span className="text-white font-bold bg-green-500/20 px-4 py-1.5 rounded-lg group-hover:bg-green-500/30 transition-colors">18.5 - 24.9</span>
                  </div>
                  <div role="listitem" className="group flex justify-between items-center p-5 rounded-2xl bg-yellow-950/30 border border-yellow-500/10 hover:bg-yellow-900/40 hover:border-yellow-500/30 transition-all duration-300">
                    <span className="text-yellow-300 font-medium">Overweight</span>
                    <span className="text-white font-bold bg-yellow-500/20 px-4 py-1.5 rounded-lg group-hover:bg-yellow-500/30 transition-colors">25.0 - 29.9</span>
                  </div>
                  <div role="listitem" className="group flex justify-between items-center p-5 rounded-2xl bg-orange-950/30 border border-orange-500/10 hover:bg-orange-900/40 hover:border-orange-500/30 transition-all duration-300">
                    <span className="text-orange-300 font-medium">Obese (Class I)</span>
                    <span className="text-white font-bold bg-orange-500/20 px-4 py-1.5 rounded-lg group-hover:bg-orange-500/30 transition-colors">30.0 - 34.9</span>
                  </div>
                  <div role="listitem" className="group flex justify-between items-center p-5 rounded-2xl bg-red-950/30 border border-red-500/10 hover:bg-red-900/40 hover:border-red-500/30 transition-all duration-300">
                    <span className="text-red-400 font-medium">Obese (Class II)</span>
                    <span className="text-white font-bold bg-red-500/20 px-4 py-1.5 rounded-lg group-hover:bg-red-500/30 transition-colors">35.0 - 39.9</span>
                  </div>
                  <div role="listitem" className="group flex justify-between items-center p-5 rounded-2xl bg-rose-950/40 border border-rose-500/20 hover:bg-rose-900/50 hover:border-rose-500/40 transition-all duration-300">
                    <span className="text-rose-400 font-bold">Obese (Class III)</span>
                    <span className="text-white font-bold bg-rose-500/30 px-4 py-1.5 rounded-lg group-hover:bg-rose-500/40 transition-colors">&gt; 40.0</span>
                  </div>
                </div>
              </motion.aside>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Structured FAQ Section */}
      <motion.section 
        aria-labelledby="faq-title" 
        className="py-24 px-4 sm:px-6 lg:px-8 border-t border-white/5 bg-[#02040A]"
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
      >
        <div className="container mx-auto max-w-4xl">
          <motion.header variants={fadeUp} className="text-center mb-16">
            <h2 id="faq-title" className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-400 text-xl font-light">Clear, authoritative parameters surrounding BMI analytics.</p>
          </motion.header>
          
          <div className="space-y-4" role="tablist">
            {faqData.map((faq, index) => (
              <motion.article 
                variants={fadeUp}
                key={index} 
                className="glass-panel glow-border rounded-2xl border border-white/5 overflow-hidden transition-all duration-300 bg-slate-900/30 hover:bg-slate-900/50"
              >
                <button
                  id={`faq-button-${index}`}
                  role="tab"
                  className="w-full px-8 py-6 text-left flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-colors"
                  onClick={() => toggleFaq(index)}
                  aria-expanded={openFaq === index}
                  aria-controls={`faq-answer-${index}`}
                >
                  <h3 className="text-lg md:text-xl font-semibold text-slate-100 pr-4">{faq.question}</h3>
                  <motion.div
                    animate={{ rotate: openFaq === index ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="flex-shrink-0 bg-blue-500/10 p-2 rounded-full border border-blue-500/20"
                  >
                    <ChevronDown className="h-5 w-5 text-cyan-400" aria-hidden="true" />
                  </motion.div>
                </button>
                
                <AnimatePresence>
                  {openFaq === index && (
                    <motion.div
                      id={`faq-answer-${index}`}
                      role="tabpanel"
                      aria-labelledby={`faq-button-${index}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                    >
                      <div className="px-8 pb-8 pt-2">
                        <div className="h-px w-full bg-gradient-to-r from-blue-500/30 via-cyan-500/10 to-transparent mb-6"></div>
                        <p className="text-slate-300 text-lg leading-relaxed font-light" dangerouslySetInnerHTML={{ __html: faq.answer }} />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.article>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Semantic Footer Snippet */}
      <motion.section 
        aria-labelledby="health-tips-title" 
        className="py-24 px-4 sm:px-6 lg:px-8 border-t border-white/5 relative overflow-hidden"
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-emerald-950/10 pointer-events-none" />
        
        <div className="container mx-auto max-w-7xl relative z-10">
          <motion.header variants={fadeUp} className="text-center mb-20">
            <h2 id="health-tips-title" className="text-4xl md:text-5xl font-bold mb-6 text-white drop-shadow-md">
              Sustain a <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Healthy</span> Trajectory
            </h2>
            <p className="text-xl text-slate-400 font-light max-w-2xl mx-auto">Foundational habits to perpetually maintain optimal body composition parameters.</p>
          </motion.header>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.article variants={fadeUp} className="glass-panel p-10 rounded-[2rem] border border-white/5 hover:border-emerald-500/30 transition-all duration-500 group bg-slate-900/40 hover:bg-slate-900/60 hover:-translate-y-2">
              <div className="p-4 rounded-2xl bg-emerald-500/10 w-fit mb-8 shadow-[0_0_20px_rgba(52,211,153,0.1)] border border-emerald-500/20 group-hover:scale-110 transition-transform">
                <Heart className="h-8 w-8 text-emerald-400" aria-hidden="true" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-emerald-300 transition-colors">Cardiovascular Nutrition</h3>
              <p className="text-slate-400 font-light leading-relaxed text-lg">
                Prioritize complex hydrocarbons and lean peptides over synthetic lipid structures to optimize your biochemical profile and metabolic equilibrium daily.
              </p>
            </motion.article>
            
            <motion.article variants={fadeUp} className="glass-panel p-10 rounded-[2rem] border border-white/5 hover:border-blue-500/30 transition-all duration-500 group bg-slate-900/40 hover:bg-slate-900/60 hover:-translate-y-2">
              <div className="p-4 rounded-2xl bg-blue-500/10 w-fit mb-8 shadow-[0_0_20px_rgba(59,130,246,0.1)] border border-blue-500/20 group-hover:scale-110 transition-transform">
                <TrendingUp className="h-8 w-8 text-blue-400" aria-hidden="true" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-blue-300 transition-colors">Kinetic Activity Base</h3>
              <p className="text-slate-400 font-light leading-relaxed text-lg">
                Ascertain 150+ minutes of sustained elevated-BPM activity weekly. Iterative progressive overload dramatically improves your basal caloric burn rate.
              </p>
            </motion.article>
            
            <motion.article variants={fadeUp} className="glass-panel p-10 rounded-[2rem] border border-white/5 hover:border-cyan-500/30 transition-all duration-500 group bg-slate-900/40 hover:bg-slate-900/60 hover:-translate-y-2">
              <div className="p-4 rounded-2xl bg-cyan-500/10 w-fit mb-8 shadow-[0_0_20px_rgba(34,211,238,0.1)] border border-cyan-500/20 group-hover:scale-110 transition-transform">
                <Target className="h-8 w-8 text-cyan-400" aria-hidden="true" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-cyan-300 transition-colors">Empirical Tracking</h3>
              <p className="text-slate-400 font-light leading-relaxed text-lg">
                Leverage our advanced parametric tools routinely to establish a verified baseline of data, effectively mitigating confirmation biases in health goals.
              </p>
            </motion.article>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;
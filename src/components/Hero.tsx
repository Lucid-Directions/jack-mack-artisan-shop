
import { ArrowRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="home" className="pt-20 pb-8 md:pt-24 md:pb-16 relative overflow-hidden min-h-[90vh] md:h-screen">
      {/* Background Image */}
      <div 
        className="absolute inset-0"
        style={{
          transform: `translateY(${scrollY * 0.5}px)`,
        }}
      >
        <img 
          src="/lovable-uploads/2af935d2-551b-49c5-b4f7-73d0dbb25d38.png" 
          alt="Wood stack background" 
          className="w-full h-full object-cover"
        />
      </div>

      <div 
        className="container mx-auto px-4 relative z-10 h-full flex items-center"
        style={{
          transform: `translateY(${scrollY * -0.3}px)`,
        }}
      >
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full">
          {/* Left Column - Text Content */}
          <div className="animate-fade-in text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start space-x-2 mb-4 md:mb-6">
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 md:h-5 md:w-5 text-yellow-500 fill-current" />
                ))}
              </div>
              <span className="text-white font-medium drop-shadow-lg text-sm md:text-base">Handcrafted Excellence</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-white mb-4 md:mb-6 leading-tight drop-shadow-lg">
              Artisan
              <span className="block text-white">Woodturning</span>
            </h1>
            
            <p className="text-base md:text-xl text-white/90 mb-6 md:mb-8 leading-relaxed drop-shadow-lg max-w-lg mx-auto lg:mx-0">
              Each piece is meticulously handcrafted from carefully selected wood, 
              creating unique artworks and functional pieces that bring natural 
              beauty into your home.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 items-center justify-center lg:justify-start">
              <Button 
                size="lg" 
                className="bg-nature-moss hover:bg-nature-forest text-nature-sage font-medium px-6 md:px-8 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 w-full sm:w-auto text-sm md:text-base"
                onClick={() => document.getElementById('art')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Shop One-Off Art
                <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="border-white text-white hover:bg-white hover:text-nature-forest px-6 md:px-8 py-3 rounded-xl transition-all duration-300 w-full sm:w-auto text-sm md:text-base"
                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Meet Jack
              </Button>
            </div>
          </div>

          {/* Right Column - Featured Image - Hidden on mobile */}
          <div className="relative animate-fade-in hidden lg:block">
            <div className="relative bg-gradient-to-br from-white/20 to-white/30 rounded-2xl p-8 shadow-2xl backdrop-blur-sm overflow-hidden">
              <div className="relative z-10 aspect-square bg-white/90 rounded-xl shadow-inner flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-32 h-32 bg-nature-moss/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-4xl font-playfair text-nature-forest">JM</span>
                  </div>
                  <p className="text-nature-charcoal/60 italic">
                    "Every piece tells a story of the wood's journey from tree to treasured artwork."
                  </p>
                  <p className="text-nature-moss font-medium mt-2">- Jack Mack</p>
                </div>
              </div>
            </div>
            
            {/* Floating Badge */}
            <div className="absolute -top-4 -right-4 bg-nature-forest text-nature-sage px-4 py-2 rounded-xl shadow-lg">
              <span className="font-medium">1 of 1 Pieces</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

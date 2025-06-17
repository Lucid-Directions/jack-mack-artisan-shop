
import { Award, Clock, Hammer, Leaf } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const About = () => {
  const features = [
    {
      icon: <Hammer className="h-8 w-8" />,
      title: "Master Craftsmanship",
      description: "Over 20 years of woodturning expertise, creating pieces that last generations."
    },
    {
      icon: <Leaf className="h-8 w-8" />,
      title: "Sustainable Sourcing",
      description: "Responsibly sourced local woods, supporting sustainable forestry practices."
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Award-Winning Quality",
      description: "Recognized by woodworking guilds for exceptional attention to detail."
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: "Timeless Design",
      description: "Classic techniques meet contemporary aesthetics for enduring beauty."
    }
  ];

  return (
    <section id="about" className="py-20 bg-nature-sage">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Image */}
          <div className="relative">
            <div className="relative aspect-square bg-gradient-to-br from-nature-moss/30 to-nature-forest/40 rounded-2xl shadow-2xl flex items-center justify-center overflow-hidden">
              {/* Woodturning background image */}
              <div className="absolute inset-0 rounded-2xl overflow-hidden">
                <img 
                  src="/lovable-uploads/543cccf1-1936-4f02-b8a4-0944074e131d.png" 
                  alt="Jack Mack woodturning" 
                  className="w-full h-full object-cover opacity-30"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-nature-moss/40 to-nature-forest/50"></div>
              </div>
              
              <div className="relative z-10 w-80 h-80 bg-nature-sage/90 rounded-xl shadow-inner flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 bg-nature-moss rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg">
                    <span className="text-5xl font-playfair text-nature-sage font-bold">J</span>
                  </div>
                  <h3 className="text-2xl font-playfair font-bold text-nature-forest mb-2">Jack Mack</h3>
                  <p className="text-nature-charcoal/60">Master Woodturner</p>
                </div>
              </div>
            </div>
            
            {/* Floating Stats */}
            <div className="absolute -bottom-6 -right-6 grid grid-cols-2 gap-4">
              <div className="bg-nature-forest text-nature-sage p-4 rounded-xl shadow-lg text-center">
                <div className="text-2xl font-bold">20+</div>
                <div className="text-sm">Years</div>
              </div>
              <div className="bg-nature-moss text-nature-sage p-4 rounded-xl shadow-lg text-center">
                <div className="text-2xl font-bold">5000+</div>
                <div className="text-sm">Pieces</div>
              </div>
            </div>
          </div>

          {/* Right Column - Content */}
          <div>
            <h2 className="text-4xl font-playfair font-bold text-nature-forest mb-6">
              Meet the Artisan Behind Each Piece
            </h2>
            
            <p className="text-lg text-nature-charcoal/80 mb-8 leading-relaxed">
              Jack Mack discovered his passion for woodturning over twenty years ago in a small workshop 
              tucked away in the countryside. What started as a weekend hobby quickly became a calling, 
              as Jack found himself drawn to the meditative rhythm of the lathe and the endless possibilities 
              hidden within each piece of wood.
            </p>
            
            <p className="text-lg text-nature-charcoal/80 mb-12 leading-relaxed">
              Today, Jack's workshop is home to an ever-growing collection of unique pieces, each one 
              telling the story of the tree it came from. From locally sourced oak and ash to exotic 
              burls discovered on woodland walks, every creation is a celebration of nature's artistry 
              enhanced by human skill.
            </p>

            {/* Features Grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <Card key={index} className="border-nature-moss/20 bg-nature-sage/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="text-nature-moss mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="font-playfair font-semibold text-nature-forest mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-nature-charcoal/70 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

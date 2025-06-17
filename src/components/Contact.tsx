
import ContactInfo from './ContactInfo';
import ContactForm from './ContactForm';

const Contact = () => {
  return (
    <section id="contact" className="py-20 nature-grain-bg relative overflow-hidden">
      {/* Background Workshop Image */}
      <div className="absolute inset-0 opacity-35">
        <img 
          src="/lovable-uploads/54c5f08a-ba4a-4be9-a112-1f629d1b3525.png" 
          alt="Jack at work in his workshop" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-nature-sage/70"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-playfair font-bold text-nature-forest mb-4">
            Get in Touch
          </h2>
          <p className="text-xl text-nature-charcoal/70 max-w-2xl mx-auto">
            Have a custom piece in mind? Questions about our craftsmanship? 
            We'd love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          <ContactInfo />
          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default Contact;

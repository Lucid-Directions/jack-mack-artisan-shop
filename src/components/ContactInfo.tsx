
import { Mail, MapPin, Clock } from 'lucide-react';
import ContactInfoCard from './ContactInfoCard';

const ContactInfo = () => {
  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email",
      content: "info@jackmackwoodturning.com",
      subtitle: "We'll respond within 24 hours"
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Workshop",
      content: "Countryside Workshop, UK",
      subtitle: "Visits by appointment only"
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Hours",
      content: "24/7 Available",
      subtitle: "Always here to help"
    }
  ];

  return (
    <div>
      <h3 className="text-2xl font-playfair font-semibold text-nature-forest mb-8">
        Let's Start a Conversation
      </h3>
      
      <div className="space-y-6 mb-8">
        {contactInfo.map((info, index) => (
          <ContactInfoCard
            key={index}
            icon={info.icon}
            title={info.title}
            content={info.content}
            subtitle={info.subtitle}
          />
        ))}
      </div>

      <div className="bg-nature-forest/10 rounded-xl p-6 border border-nature-moss/20">
        <h4 className="font-playfair font-semibold text-nature-forest mb-3">
          Custom Commissions Welcome
        </h4>
        <p className="text-nature-charcoal/70 leading-relaxed">
          Each custom piece is a collaboration between your vision and our craftsmanship. 
          We work closely with you to create something truly unique that fits your space and style perfectly.
        </p>
      </div>
    </div>
  );
};

export default ContactInfo;

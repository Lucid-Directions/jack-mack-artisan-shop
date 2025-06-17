
import { Card, CardContent } from '@/components/ui/card';

interface ContactInfoCardProps {
  icon: React.ReactNode;
  title: string;
  content: string;
  subtitle: string;
}

const ContactInfoCard = ({ icon, title, content, subtitle }: ContactInfoCardProps) => {
  return (
    <Card className="border-nature-moss/20 bg-nature-sage/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <div className="text-nature-moss mt-1">
            {icon}
          </div>
          <div>
            <h4 className="font-semibold text-nature-forest mb-1">
              {title}
            </h4>
            <p className="text-nature-charcoal font-medium mb-1">
              {content}
            </p>
            <p className="text-nature-charcoal/60 text-sm">
              {subtitle}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContactInfoCard;

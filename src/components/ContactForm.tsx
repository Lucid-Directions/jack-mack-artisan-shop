
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Card className="border-nature-moss/20 bg-nature-sage shadow-xl">
      <CardContent className="p-8">
        <h3 className="text-2xl font-playfair font-semibold text-nature-forest mb-6">
          Send us a Message
        </h3>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-gray-500 font-medium mb-2">
                Full Name
              </label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="border-nature-moss/30 focus:border-nature-moss bg-nature-sage text-gray-500 placeholder:text-gray-400"
                placeholder="Your name"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-500 font-medium mb-2">
                Email Address
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="border-nature-moss/30 focus:border-nature-moss bg-nature-sage text-gray-500 placeholder:text-gray-400"
                placeholder="your.email@example.com"
                required
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="subject" className="block text-gray-500 font-medium mb-2">
              Subject
            </label>
            <Input
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="border-nature-moss/30 focus:border-nature-moss bg-nature-sage text-gray-500 placeholder:text-gray-400"
              placeholder="What can we help you with?"
              required
            />
          </div>
          
          <div>
            <label htmlFor="message" className="block text-gray-500 font-medium mb-2">
              Message
            </label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={6}
              className="border-nature-moss/30 focus:border-nature-moss bg-nature-sage resize-none text-gray-500 placeholder:text-gray-400"
              placeholder="Tell us about your project or ask us anything..."
              required
            />
          </div>
          
          <Button 
            type="submit" 
            size="lg" 
            className="w-full bg-nature-moss hover:bg-nature-forest text-nature-sage font-medium py-3 rounded-xl transition-all duration-300"
          >
            Send Message
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ContactForm;

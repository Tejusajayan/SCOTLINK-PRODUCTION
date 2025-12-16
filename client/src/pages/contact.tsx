import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Layout } from "@/components/layout/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Phone, Mail, MapPin, Clock, Send, Loader2, CheckCircle } from "lucide-react";
import { SEO } from "@/components/seo";
import { contactFormSchema, type ContactFormData } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import heroImage from "@assets/industrial_shipping__dca51243.jpg";

export default function Contact() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      // Client-side sanitization before sending
      const sanitizedData = {
        name: data.name.trim().replace(/[<>]/g, ''),
        email: data.email.trim().toLowerCase(),
        phone: data.phone.trim().replace(/[<>]/g, ''),
        message: data.message.trim().replace(/[<>]/g, ''),
      };

      const res = await apiRequest("POST", "/api/contact", sanitizedData);
      return res.json();
    },
    onSuccess: () => {
      setSubmitted(true);
      form.reset();
      toast({
        title: "Message Sent!",
        description: "We'll get back to you as soon as possible.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to send message",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ContactFormData) => {
    mutation.mutate(data);
  };

  return (
    <Layout>
      <SEO
        title="Contact Us"
        description="Get in touch with Scotlink Logistics for a free consultation and quote for your lashing and packing needs."
      />
      <section className="relative py-20 lg:py-28 bg-[#2D3748]" data-testid="section-contact-hero">
        <div className="absolute inset-0 opacity-20">
          <img
            src={heroImage}
            alt="Contact Scotlink Logistics for Cargo Securing Services"
            className="w-full h-full object-cover opacity-100"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#2D3748] via-[#2D3748]/90 to-[#2D3748]/80" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4" data-testid="text-contact-title">
            Contact Us
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Get in touch with us for a free consultation and quote
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-background" data-testid="section-contact-form">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-px w-8 bg-primary" />
                  <span className="text-primary font-medium text-sm uppercase tracking-wider">
                    Get In Touch
                  </span>
                </div>
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Send Us a Message
                </h2>
                <p className="text-muted-foreground">
                  Fill out the form below and our team will get back to you within 24 hours.
                </p>
              </div>

              {submitted ? (
                <Card className="border-primary/20 bg-primary/5" data-testid="card-success">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Thank You!</h3>
                    <p className="text-muted-foreground mb-6">
                      Your message has been sent successfully. We'll respond shortly.
                    </p>
                    <Button onClick={() => setSubmitted(false)} variant="outline" data-testid="button-new-message">
                      Send Another Message
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <Card data-testid="card-contact-form">
                  <CardContent className="p-6">
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name</FormLabel>
                              <FormControl>
                                <Input placeholder="John Doe" {...field} data-testid="input-name" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email Address</FormLabel>
                                <FormControl>
                                  <Input placeholder="john@example.com" type="email" {...field} data-testid="input-email" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Phone Number</FormLabel>
                                <FormControl>
                                  <Input placeholder="+1 (234) 567-890" {...field} data-testid="input-phone" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name="message"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Message</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Tell us about your cargo and requirements..."
                                  className="min-h-[150px] resize-none"
                                  {...field}
                                  data-testid="input-message"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <Button
                          type="submit"
                          className="w-full gap-2"
                          disabled={mutation.isPending}
                          data-testid="button-submit-contact"
                        >
                          {mutation.isPending ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />
                              Sending...
                            </>
                          ) : (
                            <>
                              <Send className="w-4 h-4" />
                              Send Message
                            </>
                          )}
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              )}
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-6">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4" data-testid="contact-address">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">Address</h4>
                      <p className="text-muted-foreground">
                        6, 30st, Umm Ramool<br />
                        Al Rashidiya, Dubai, UAE
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4" data-testid="contact-phone">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">Phone</h4>
                      <a href="tel:+1234567890" className="text-muted-foreground hover:text-primary transition-colors">
                        +971503785501
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4" data-testid="contact-email">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">Email</h4>
                      <a href="mailto:sales@scotlinklogistics.com" className="text-muted-foreground hover:text-primary transition-colors">
                        sales@scotlinklogistics.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4" data-testid="contact-hours">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">Business Hours</h4>
                      <p className="text-muted-foreground">
                        Monday - Friday: 8:00 AM - 6:00 PM<br />
                        Saturday: 9:00 AM - 6:00 PM
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/*<Card className="overflow-hidden" data-testid="card-map">
                <div className="h-[300px] bg-muted">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115492.45182228551!2d55.30787129273324!3d25.23223882253816!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x76640f6e55a63d3%3A0x28a208e4d8c0889a!2sScotlink%20Logistics%20Services%20LLC!5e0!3m2!1sen!2sae!4v1765718236945!5m2!1sen!2sae"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Scotlink Logistics Location"
                  />
                </div>
              </Card>*/}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

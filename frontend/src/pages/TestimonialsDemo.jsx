import React from "react";
import { CircularTestimonials } from "../components/ui/circular-testimonials";

const testimonials = [
  {
    quote:
      "Roomify has transformed how we manage our conference rooms. The real-time availability and seamless booking process have made scheduling meetings effortless. Highly recommended for any organization!",
    name: "Priya Sharma",
    designation: "Operations Manager, Tech Solutions India",
    src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80",
  },
  {
    quote:
      "The intuitive interface and smart scheduling features are outstanding. We've reduced booking conflicts by 90% since implementing Roomify. The customer support team is also incredibly responsive and helpful.",
    name: "Rajesh Kumar",
    designation: "IT Director, Mumbai Enterprises",
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
  },
  {
    quote:
      "As a facility manager, Roomify has been a game-changer. The analytics dashboard helps us optimize room utilization, and the automated notifications keep everyone informed. Best investment we've made this year!",
    name: "Ananya Patel",
    designation: "Facility Manager, Bangalore Tech Park",
    src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&q=80",
  },
  {
    quote:
      "Roomify's calendar integration and mobile app make booking rooms on-the-go incredibly easy. The platform is reliable, fast, and has significantly improved our workplace efficiency. Absolutely love it!",
    name: "Vikram Singh",
    designation: "HR Head, Delhi Corporate Hub",
    src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80",
  },
  {
    quote:
      "The attention to detail in Roomify is impressive. From real-time availability to automated reminders, everything works flawlessly. Our team productivity has increased significantly since we started using it.",
    name: "Meera Reddy",
    designation: "Project Manager, Hyderabad Solutions",
    src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80",
  },
];

export default function TestimonialsDemo() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="bg-slate-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            What Our Clients Say
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Trusted by leading organizations across India for seamless room booking
          </p>
        </div>
      </div>

      {/* Light Theme Testimonials */}
      <section className="py-16">
        <div className="bg-[#f7f7fa] p-8 md:p-20 rounded-lg min-h-[300px] flex flex-wrap gap-6 items-center justify-center relative mx-4">
          <div
            className="items-center justify-center relative flex w-full"
            style={{ maxWidth: "1456px" }}
          >
            <CircularTestimonials
              testimonials={testimonials}
              autoplay={true}
              colors={{
                name: "#0a0a0a",
                designation: "#454545",
                testimony: "#171717",
                arrowBackground: "#141414",
                arrowForeground: "#f1f1f7",
                arrowHoverBackground: "#00A6FB",
              }}
              fontSizes={{
                name: "28px",
                designation: "20px",
                quote: "20px",
              }}
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-slate-900 mb-2">1000+</div>
              <div className="text-gray-600">Happy Clients</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-slate-900 mb-2">50K+</div>
              <div className="text-gray-600">Bookings Made</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-slate-900 mb-2">99.9%</div>
              <div className="text-gray-600">Uptime</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-slate-900 mb-2">4.9/5</div>
              <div className="text-gray-600">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Dark Theme Testimonials */}
      <section className="py-16">
        <div className="bg-[#060507] p-8 md:p-16 rounded-lg min-h-[300px] flex flex-wrap gap-6 items-center justify-center relative mx-4">
          <div
            className="items-center justify-center relative flex w-full"
            style={{ maxWidth: "1024px" }}
          >
            <CircularTestimonials
              testimonials={testimonials}
              autoplay={true}
              colors={{
                name: "#f7f7ff",
                designation: "#e1e1e1",
                testimony: "#f1f1f7",
                arrowBackground: "#0582CA",
                arrowForeground: "#141414",
                arrowHoverBackground: "#f7f7ff",
              }}
              fontSizes={{
                name: "28px",
                designation: "20px",
                quote: "20px",
              }}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Join Thousands of Satisfied Customers
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Experience the future of room booking management with Roomify
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => (window.location.href = "/rooms")}
              className="px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-all shadow-lg"
            >
              Get Started Free
            </button>
            <button
              onClick={() => (window.location.href = "/bookings")}
              className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all"
            >
              View Demo
            </button>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 bg-white border-t border-gray-200">
        <div className="container mx-auto px-4">
          <p className="text-center text-gray-600 mb-8 font-semibold">
            TRUSTED BY LEADING ORGANIZATIONS
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60">
            <div className="text-2xl font-bold text-gray-800">TCS</div>
            <div className="text-2xl font-bold text-gray-800">Infosys</div>
            <div className="text-2xl font-bold text-gray-800">Wipro</div>
            <div className="text-2xl font-bold text-gray-800">HCL</div>
            <div className="text-2xl font-bold text-gray-800">Tech Mahindra</div>
          </div>
        </div>
      </section>
    </div>
  );
}

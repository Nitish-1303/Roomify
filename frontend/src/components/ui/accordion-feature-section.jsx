import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./accordion";

const defaultFeatures = [
  {
    id: 1,
    title: "Real-Time Room Availability",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    description:
      "Browse through available conference rooms with real-time availability status. Each room displays instant booking status, capacity, amenities, and location details. Simply select your preferred room and time slot to make a reservation.",
  },
  {
    id: 2,
    title: "Smart Scheduling System",
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80",
    description:
      "Our intelligent scheduling system prevents double bookings and conflicts. Filter rooms by date, time, and capacity to find the perfect space. The calendar view shows availability at a glance with color-coded status indicators.",
  },
  {
    id: 3,
    title: "Advanced Analytics Dashboard",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    description:
      "Track room utilization, booking patterns, and occupancy rates with comprehensive analytics. Generate detailed reports to optimize space usage and make data-driven decisions. Monitor trends and identify peak booking times.",
  },
  {
    id: 4,
    title: "Mobile-Friendly Interface",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80",
    description:
      "Book rooms on-the-go with our fully responsive mobile interface. Access all features from any device - desktop, tablet, or smartphone. Receive instant notifications and manage bookings from anywhere.",
  },
  {
    id: 5,
    title: "Automated Notifications",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80",
    description:
      "Stay informed with automated email and in-app notifications. Get reminders before meetings, booking confirmations, and status updates. Never miss an important meeting with our smart notification system.",
  },
];

const AccordionFeatureSection = ({ features = defaultFeatures }) => {
  const [activeTabId, setActiveTabId] = useState(1);
  const [activeImage, setActiveImage] = useState(features[0].image);

  return (
    <section className="py-32">
      <div className="container mx-auto px-4">
        <div className="mb-12 flex w-full items-start justify-between gap-12">
          <div className="w-full md:w-1/2">
            <Accordion type="single" className="w-full" defaultValue="item-1">
              {features.map((tab) => (
                <AccordionItem key={tab.id} value={`item-${tab.id}`}>
                  <AccordionTrigger
                    onClick={() => {
                      setActiveImage(tab.image);
                      setActiveTabId(tab.id);
                    }}
                    className="cursor-pointer py-5 !no-underline transition"
                  >
                    <h6
                      className={`text-xl font-semibold ${
                        tab.id === activeTabId
                          ? "text-foreground"
                          : "text-muted-foreground"
                      }`}
                    >
                      {tab.title}
                    </h6>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="mt-3 text-muted-foreground">
                      {tab.description}
                    </p>
                    <div className="mt-4 md:hidden">
                      <img
                        src={tab.image}
                        alt={tab.title}
                        className="h-full max-h-80 w-full rounded-md object-cover"
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          <div className="relative m-auto hidden w-1/2 overflow-hidden rounded-xl bg-muted md:block">
            <img
              src={activeImage}
              alt="Feature preview"
              className="aspect-[4/3] rounded-md object-cover pl-4"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export { AccordionFeatureSection };
export default AccordionFeatureSection;

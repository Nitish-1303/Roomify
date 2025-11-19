import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./accordion";

const defaultFAQs = [
  {
    id: 1,
    question: "How do I book a conference room?",
    answer:
      "Booking a room is simple! Navigate to the Rooms page, browse available spaces, and click 'Reserve Room' on your preferred option. Select your desired date and time slot, then submit your booking request. You'll receive instant confirmation via email and in-app notification.",
    category: "Booking",
  },
  {
    id: 2,
    question: "Can I cancel or modify my booking?",
    answer:
      "Yes, you can cancel or modify your bookings from the Bookings page. Click on your booking to view details, then select 'Cancel' or 'Modify'. Please note that cancellations made less than 2 hours before the scheduled time may require admin approval.",
    category: "Booking",
  },
  {
    id: 3,
    question: "How do I check room availability in real-time?",
    answer:
      "Our platform shows real-time availability on every room card with color-coded badges. Green means 'Available Now', yellow indicates 'Partially Booked', and red shows 'Fully Booked'. You can also use the Calendar View to see availability across multiple days and time slots.",
    category: "Availability",
  },
  {
    id: 4,
    question: "What amenities are included in the conference rooms?",
    answer:
      "All our conference rooms come equipped with high-speed WiFi, display screens/projectors, whiteboards, and complimentary coffee/tea. Specific amenities vary by room and are clearly listed on each room card. Premium rooms may include video conferencing equipment and additional seating.",
    category: "Facilities",
  },
  {
    id: 5,
    question: "How far in advance can I book a room?",
    answer:
      "You can book rooms up to 90 days in advance. For recurring bookings or special events requiring longer advance notice, please contact your facility manager or admin. Same-day bookings are also available based on real-time availability.",
    category: "Booking",
  },
  {
    id: 6,
    question: "What happens if I'm late to my booking?",
    answer:
      "We have a 15-minute grace period for all bookings. If you haven't checked in within 15 minutes of your scheduled start time, the system may automatically release the room for other users. To avoid this, you can send a notification through the app if you're running late.",
    category: "Policies",
  },
  {
    id: 7,
    question: "Can I book rooms for external guests?",
    answer:
      "Yes, registered users can book rooms for meetings with external guests. When making your booking, you can specify the number of external attendees. Please ensure all guests sign in at reception and follow your organization's visitor policies.",
    category: "Booking",
  },
  {
    id: 8,
    question: "How do I access analytics and reports?",
    answer:
      "Admins and managers can access comprehensive analytics from the Analytics page. View room utilization rates, booking patterns, peak usage times, and generate custom reports. Export data in CSV or PDF format for presentations and planning purposes.",
    category: "Analytics",
  },
  {
    id: 9,
    question: "Is there a mobile app available?",
    answer:
      "Yes! Roomify is fully responsive and works seamlessly on all devices. Access the platform through your mobile browser for the same features as desktop. You can book rooms, check availability, receive notifications, and manage bookings on-the-go.",
    category: "Technical",
  },
  {
    id: 10,
    question: "What should I do if I encounter technical issues?",
    answer:
      "For technical issues, first try refreshing your browser or clearing cache. If the problem persists, contact our support team through the Help section or email support@roomify.com. Include details about the issue, browser type, and any error messages for faster resolution.",
    category: "Technical",
  },
];

const FAQAccordion = ({ faqs = defaultFAQs, showCategories = false }) => {
  const [activeId, setActiveId] = useState(null);

  // Group FAQs by category if needed
  const groupedFAQs = showCategories
    ? faqs.reduce((acc, faq) => {
        const category = faq.category || "General";
        if (!acc[category]) acc[category] = [];
        acc[category].push(faq);
        return acc;
      }, {})
    : { All: faqs };

  return (
    <div className="w-full">
      {Object.entries(groupedFAQs).map(([category, categoryFAQs]) => (
        <div key={category} className="mb-8">
          {showCategories && (
            <h3 className="text-2xl font-bold mb-4 text-gray-900">{category}</h3>
          )}
          <Accordion type="single" collapsible className="w-full">
            {categoryFAQs.map((faq) => (
              <AccordionItem key={faq.id} value={`item-${faq.id}`}>
                <AccordionTrigger
                  onClick={() => setActiveId(faq.id)}
                  className="cursor-pointer py-5 text-left hover:no-underline"
                >
                  <h6
                    className={`text-lg font-semibold ${
                      faq.id === activeId
                        ? "text-blue-600"
                        : "text-gray-900"
                    }`}
                  >
                    {faq.question}
                  </h6>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      ))}
    </div>
  );
};

export { FAQAccordion };
export default FAQAccordion;

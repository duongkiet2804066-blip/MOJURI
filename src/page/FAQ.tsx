import React, { useState } from "react";
import { Link } from "react-router-dom";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      question: "What metals do you use in your jewelry?",
      answer: "We use only high-grade materials: 14k solid gold, 18k gold vermeil (thick gold layer over sterling silver), and recycled 925 sterling silver. All metals are nickel-free and hypoallergenic, making them safe for sensitive skin."
    },
    {
      question: "How long does shipping take?",
      answer: "Orders are typically processed within 1-2 business days. Standard shipping takes 3-5 business days within the country. International shipping takes 7-14 business days depending on location. Free shipping applies to all orders over $400."
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy for all unworn jewelry items in their original packaging. Return shipping is free for domestic orders. Sale items and personalized pieces are final sale."
    },
    {
      question: "How do I care for my vermeil and sterling silver jewelry?",
      answer: "To extend the life of your jewelry, remove it before showering, swimming, or working out. Avoid direct contact with perfume, hairspray, and sanitizers. Wipe with a dry microfibre polishing cloth after wear and store in an airtight pouch."
    },
    {
      question: "Do you offer a warranty?",
      answer: "Yes! All MoJuri products are covered by a 2-year warranty from the date of purchase. This covers any manufacturing defects. We also provide professional repair services if your jewelry is damaged through normal wear."
    }
  ];

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div id="primary" className="content-area">
      {/* Title */}
      <div id="title" className="page-title">
        <div className="section-container">
          <div className="content-title-heading">
            <h1 className="text-title-heading" style={{ fontFamily: "Cormorant Garamond" }}>
              Frequently Asked Questions
            </h1>
          </div>
          <div className="breadcrumbs">
            <Link to="/">Home</Link><span className="delimiter"></span>FAQ
          </div>
        </div>
      </div>

      <div id="content" className="site-content" role="main">
        <div className="section-padding">
          <div className="section-container small" style={{ maxWidth: "800px", margin: "0 auto" }}>
            
            <div style={{ textAlign: "center", marginBottom: "50px" }}>
              <h2 style={{ fontFamily: "Cormorant Garamond", fontSize: "36px" }}>Common Inquiries</h2>
              <p style={{ color: "#666" }}>Find quick answers about ordering, shipping, materials, and care.</p>
            </div>

            <div className="faq-list" style={{ borderTop: "1px solid #eee" }}>
              {faqs.map((faq, index) => {
                const isOpen = openIndex === index;
                return (
                  <div 
                    key={index} 
                    style={{ 
                      borderBottom: "1px solid #eee", 
                      padding: "20px 0",
                      transition: "all 0.3s ease"
                    }}
                  >
                    <div 
                      onClick={() => handleToggle(index)}
                      style={{ 
                        display: "flex", 
                        justifyContent: "space-between", 
                        alignItems: "center", 
                        cursor: "pointer",
                        fontWeight: "bold",
                        fontSize: "18px",
                        color: isOpen ? "#bfa37a" : "#111",
                        fontFamily: "Cormorant Garamond"
                      }}
                    >
                      <span>{faq.question}</span>
                      <span style={{ fontSize: "20px" }}>{isOpen ? "−" : "+"}</span>
                    </div>

                    <div 
                      style={{ 
                        maxHeight: isOpen ? "200px" : "0", 
                        overflow: "hidden", 
                        transition: "all 0.3s ease",
                        color: "#666",
                        fontSize: "14px",
                        lineHeight: "1.7",
                        marginTop: isOpen ? "15px" : "0"
                      }}
                    >
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={{ marginTop: "60px", background: "#f9f9f9", padding: "30px", borderRadius: "8px", textAlign: "center" }}>
              <h3 style={{ fontFamily: "Cormorant Garamond", fontSize: "24px" }}>Still Have Questions?</h3>
              <p style={{ color: "#666", marginBottom: "20px", fontSize: "14px" }}>Our support team is available 24/7. Drop us a line and we'll reply shortly.</p>
              <Link 
                to="/contact" 
                style={{ 
                  background: "#bfa37a", 
                  color: "#fff", 
                  padding: "10px 25px", 
                  textTransform: "uppercase", 
                  fontWeight: "bold", 
                  fontSize: "12px", 
                  borderRadius: "4px",
                  display: "inline-block"
                }}
              >
                Contact Support
              </Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;

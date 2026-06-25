import React, { useState } from "react";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill in all fields.");
      return;
    }
    alert(`Thank you ${formData.name}! Your message has been sent successfully.`);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div id="primary" className="content-area">
      <div id="title" className="page-title">
        <div className="section-container">
          <div className="content-title-heading">
            <h1 className="text-title-heading" style={{ fontFamily: "Cormorant Garamond" }}>
              Contact Us
            </h1>
          </div>
          <div className="breadcrumbs">
            <a href="/">Home</a><span className="delimiter"></span>Contact Us
          </div>
        </div>
      </div>

      <div id="content" className="site-content" role="main">
        <div className="page-contact">
          
          {/* Map Section */}
          <section className="section section-padding">
            <div className="section-container small">
              <div className="block block-contact-map">
                <div className="block-widget-wrap">
                  <iframe 
                    src="https://maps.google.com/maps?q=London%20Eye%2C%20London%2C%20United%20Kingdom&amp;t=m&amp;z=10&amp;output=embed&amp;iwloc=near" 
                    aria-label="London Eye, London, United Kingdom"
                    style={{ width: "100%", height: "450px", border: 0 }}
                  ></iframe>
                </div>
              </div>
            </div>
          </section>

          {/* Info Section */}
          <section className="section section-padding m-b-70">
            <div className="section-container">
              <div className="block block-contact-info">
                <div className="block-widget-wrap text-center">
                  <div className="info-title" style={{ marginBottom: "40px" }}>
                    <h2 style={{ fontFamily: "Cormorant Garamond", fontSize: "36px" }}>Need Help?</h2>
                  </div>
                  <div className="info-items">
                    <div className="row">
                      <div className="col-md-4 sm-m-b-30">
                        <div className="info-item">
                          <div className="item-tilte">
                            <h2 style={{ fontFamily: "Cormorant Garamond" }}>Phone</h2>
                          </div>
                          <div className="item-content" style={{ color: "#666" }}>
                            810.222.5439
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4 sm-m-b-30">
                        <div className="info-item">
                          <div className="item-tilte">
                            <h2 style={{ fontFamily: "Cormorant Garamond" }}>Customer Service</h2>
                          </div>
                          <div className="item-content" style={{ color: "#666" }}>
                            <p>Monday to Friday</p>
                            <p>8:00am – 4:00pm Sydney, NSW time (UTC +10)</p>
                            <p>Saturday and Sunday closed</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="info-item">
                          <div className="item-tilte">
                            <h2 style={{ fontFamily: "Cormorant Garamond" }}>Returns</h2>
                          </div>
                          <div className="item-content small-width" style={{ color: "#666" }}>
                            For information on Returns and Refunds, please click <a href="#" style={{ color: "#cb8161" }}>here.</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Form Section */}
          <section className="section section-padding background-img bg-img-7 p-t-70 p-b-70 m-b-0" style={{ background: "#f9f9f9", padding: "60px 0" }}>
            <div className="section-container small" style={{ maxWidth: "800px", margin: "0 auto" }}>
              <div className="block block-contact-form">
                <div className="block-widget-wrap">
                  <div className="block-title text-center" style={{ marginBottom: "35px" }}>
                    <h2 style={{ fontFamily: "Cormorant Garamond", fontSize: "36px" }}>Send Us Your Questions!</h2>
                    <div className="sub-title" style={{ color: "#666" }}>We’ll get back to you within two days.</div>
                  </div>
                  <div className="block-content">
                    <form onSubmit={handleSubmit} className="contact-form">
                      <div className="contact-us-form">
                        <div className="row">
                          <div className="col-sm-12 col-md-6" style={{ marginBottom: "20px" }}>
                            <label className="required" style={{ fontWeight: 600 }}>Name</label><br />
                            <span className="form-control-wrap">
                              <input 
                                type="text" 
                                className="form-control" 
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "4px" }}
                              />
                            </span>
                          </div>
                          <div className="col-sm-12 col-md-6" style={{ marginBottom: "20px" }}>
                            <label className="required" style={{ fontWeight: 600 }}>Email</label><br />
                            <span className="form-control-wrap">
                              <input 
                                type="email" 
                                className="form-control" 
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "4px" }}
                              />
                            </span>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-sm-12" style={{ marginBottom: "20px" }}>
                            <label className="required" style={{ fontWeight: 600 }}>Message</label><br />
                            <span className="form-control-wrap">
                              <textarea 
                                cols={40} 
                                rows={10} 
                                className="form-control"
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "4px" }}
                              ></textarea>
                            </span>
                          </div>
                        </div>
                        <div className="form-button text-center">
                          <input 
                            type="submit" 
                            value="Submit" 
                            className="button" 
                            style={{ background: "#cb8161", color: "#fff", border: "none", padding: "12px 40px", textTransform: "uppercase", fontWeight: "bold", borderRadius: "4px", cursor: "pointer" }}
                          />
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default Contact;

import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer id="site-footer" className="site-footer background four-columns">
      <div className="footer">
        <div className="section-padding">
          <div className="section-container">
            <div className="block-widget-wrap">
              <div className="row">
                <div className="col-lg-3 col-md-6 column-1">
                  <div className="block block-menu m-b-20">
                    <h2 className="block-title">Contact Us</h2>
                    <div className="block-content">
                      <ul>
                        <li>
                          <span>Head Office:</span> 26 Wyle Cop, Shrewsbury, Shropshire, SY1 1XD
                        </li>
                        <li>
                          <span>Tel:</span> 01743 234500
                        </li>
                        <li>
                          <span>Email:</span> <a href="mailto:support@mojuri.com">support@mojuri.com</a>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="block block-social">
                    <ul className="social-link">
                      <li><a href="#"><i className="fa fa-twitter"></i></a></li>
                      <li><a href="#"><i className="fa fa-instagram"></i></a></li>
                      <li><a href="#"><i className="fa fa-dribbble"></i></a></li>
                      <li><a href="#"><i className="fa fa-behance"></i></a></li>
                    </ul>
                  </div>
                </div>

                <div className="col-lg-3 col-md-6 column-2">
                  <div className="block block-menu">
                    <h2 className="block-title">Customer Services</h2>
                    <div className="block-content">
                      <ul>
                        <li>
                          <Link to="/contact">Contact Us</Link>
                        </li>
                        <li>
                          <Link to="/shop">Track Your Order</Link>
                        </li>
                        <li>
                          <Link to="/shop">Product Care & Repair</Link>
                        </li>
                        <li>
                          <Link to="/shop">Book an Appointment</Link>
                        </li>
                        <li>
                          <Link to="/faq">Frequently Asked Questions</Link>
                        </li>
                        <li>
                          <Link to="/shop">Shipping & Returns</Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="col-lg-3 col-md-6 column-3">
                  <div className="block block-menu">
                    <h2 className="block-title">About Us</h2>
                    <div className="block-content">
                      <ul>
                        <li>
                          <Link to="/about">About Us</Link>
                        </li>
                        <li>
                          <Link to="/faq">FAQ</Link>
                        </li>
                        <li>
                          <Link to="/about">Our Producers</Link>
                        </li>
                        <li>
                          <Link to="/about">Sitemap</Link>
                        </li>
                        <li>
                          <Link to="/about">Terms & Conditions</Link>
                        </li>
                        <li>
                          <Link to="/about">Privacy Policy</Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="col-lg-3 col-md-6 column-4">
                  <div className="block block-menu">
                    <h2 className="block-title">Catalog</h2>
                    <div className="block-content">
                      <ul>
                        <li>
                          <Link to="/shop?category=Earrings">Earrings</Link>
                        </li>
                        <li>
                          <Link to="/shop?category=Necklaces">Necklaces</Link>
                        </li>
                        <li>
                          <Link to="/shop?category=Bracelets">Bracelets</Link>
                        </li>
                        <li>
                          <Link to="/shop?category=Rings">Rings</Link>
                        </li>
                        <li>
                          <Link to="/shop">Jewelry Box</Link>
                        </li>
                        <li>
                          <Link to="/shop">Studs</Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="section-padding">
          <div className="section-container">
            <div className="block-widget-wrap">
              <div className="row">
                <div className="col-md-6">
                  <div className="footer-left">
                    <p className="copyright">Copyright © 2026. All Right Reserved</p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="footer-right">
                    <div className="block block-image">
                      <img width="309" height="32" src="/media/payments.png" alt="Payments" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

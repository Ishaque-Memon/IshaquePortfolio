import React, { useState, useEffect, useRef } from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import emailjs from "emailjs-com";
import { gsap } from "gsap";
import "./Contact.css";

const Contact = () => {

   const mRef = useRef(null);
   const iRef = useRef(null);
   const containerRef = useRef(null);

   const [loading, setLoading] = useState(false);  // Track loading state
   const MILoading = loading
   
   useEffect(()=> {
 
    if(MILoading){

    document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [MILoading]
  );

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [notification, setNotification] = useState({
    message: "",
    type: "",
    showPopup: false,
  });

  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  useEffect(() => {
    if (loading && mRef.current && iRef.current) {
      const timeline = gsap.timeline({ repeat: -1, repeatDelay: 1 });
  
      timeline
        .to(mRef.current, {
          y: -20,
          scale: 1.2,
          rotation: 360,
          duration: 1,
          ease: "power1.inOut",
        })
        .to(mRef.current, { y: 0, scale: 1, duration: 0.5, ease: "bounce.out" })
        .to(
          iRef.current,
          {
            y: 20,
            scale: 1.2,
            rotation: -360,
            duration: 1,
            ease: "power1.inOut",
          },
          "<"
        )
        .to(iRef.current, { y: 0, scale: 1, duration: 0.5, ease: "bounce.out" });
  
      // Cleanup to avoid multiple instances of the timeline
      return () => timeline.kill();
    }
  }, [loading]); // Re-run the effect whenever loading changes
  

  // Disable scrolling when the popup is visible
  useEffect(() => {


    if (notification.showPopup) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [notification.showPopup]);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFocus = (e) => {
    e.target.parentNode.classList.add("focus");
  };

  const handleBlur = (e) => {
    if (e.target.value === "") {
      e.target.parentNode.classList.remove("focus");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsFormSubmitted(true);  // Mark form as submitted
    setLoading(true);  // Set loading state to true

    // Send form data using Email.js
    emailjs
      .sendForm(
        "service_2jtsv4n",
        "template_l8liz6k",
        e.target,
        "nGbeCCRi3CG9sW0M3"
      )
      .then(
        (result) => {
          console.log("Email sent: ", result.text);
          setNotification({
            message: "Thank you! Your message has been sent.",
            type: "success",
            showPopup: true,
          });
          setFormData({ name: "", email: "", phone: "", message: "" });
        },
        (error) => {
          console.error("Error sending email: ", error.text);
          setNotification({
            message: "Failed to send message, please try again.",
            type: "error",
            showPopup: false,
          });
        }
      )
      .finally(() => {
        setLoading(false);  // Set loading state back to false after email is sent
      });
  };

  const handlePopupClose = () => {
    setNotification({
      message: "",
      type: "",
      showPopup: false,
    });
    setIsFormSubmitted(false);  // Reset form submission status
  };

  return (
    <div id="contact" className="contact-container relative">
      <span className={`big-circle bg-gradient-to-r from-yellow-500 via-orange-500 to-red-600 form ${isFormSubmitted ? "blurred" : ""}`}></span>

      {/* Logo centered and dynamic loading indicator */}
    
      {loading && MILoading  && (

        <div className="MI_Container">
        <div className={`MI-logo absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center z-10`}>
          <div className="outer-circle absolute w-12 h-12 md:w-16 md:h-16 border-2 border-solid rounded-full"></div>
          <div className="inner-circle absolute w-10 h-10 md:w-12 md:h-12 border-2 border-solid rounded-full"></div>
          <div 
          ref={containerRef}
          className="relative z-10 flex items-center space-x-1 text-[1.5rem]">
            <span
              ref={mRef}
              className="text-yellow-400"
              style={{
                textShadow: "0 0 4px rgb(245, 202, 91), 0 0 8px rgb(245, 202, 91)",
              }}
            >
              M
            </span>
            <span
             ref={iRef}
              style={{
                textShadow: "0px 0px 6px rgba(255, 255, 255, 0.8)",
              }}
            >
              I
            </span>
          </div>
        </div>
        </div>
              )}

      {/* Content */}
      <div className={`form ${isFormSubmitted ? "blurred" : ""}`}>
        <div className="contact-info">
          <h3 className="title">Let's get in touch</h3>
          <p className="text">
            Have any questions? Reach out to us, and we will respond as soon as possible!
          </p>
          <div className="social-media">
            <p>Connect with us:</p>
            <div className="social-icons">
              <a href="/" className="social-icon" aria-label="Facebook">
                <FaFacebookF />
              </a>
              <a href="/" className="social-icon" aria-label="Twitter">
                <FaTwitter />
              </a>
              <a href="/" className="social-icon" aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href="/" className="social-icon" aria-label="LinkedIn">
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </div>

        <div className="contact-form">
          <form onSubmit={handleSubmit} autoComplete="off">
            <h3 className="title">Contact us</h3>
            <div className="input-container">
              <input
                type="text"
                name="name"
                value={formData.name}
                className="input"
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                required
              />
              <label>Full Name</label>
              <span>Your full name</span>
            </div>
            <div className="input-container">
              <input
                type="email"
                name="email"
                value={formData.email}
                className="input"
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                required
              />
              <label>Email Address</label>
              <span>Your email address</span>
            </div>
            <div className="input-container">
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                className="input"
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                pattern="[0-9]{10}"
                required
              />
              <label>Phone Number</label>
              <span>Enter a 10-digit number</span>
            </div>
            <div className="input-container textarea ">
              <textarea
                name="message"
                value={formData.message}
                className="input"
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                required
              ></textarea>
              <label>Your Message</label>
              <span>Your message to us</span>
            </div>
            <input type="submit" value="Send Message" className="btn" />
          </form>
        </div>
      </div>

      {/* Success Popup with Celebration Effect */}
      {notification.showPopup && (
        <div className="popup-container">
          <div className={`popup ${notification.type === "success" ? "success" : "error"}`}>
            <h3>Thank You!</h3>
            <p>Your message has been sent successfully.</p>
            <button className="close-btn" onClick={handlePopupClose}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contact;

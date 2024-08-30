import React, { useState } from "react";
import emailjs from 'emailjs-com';

const Help = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs.sendForm('your_service_id', 'your_template_id', e.target, 'your_user_id')
      .then((result) => {
        console.log('Message sent:', result.text);
        alert("Your message has been sent!");
        setForm({
          name: "",
          email: "",
          message: ""
        });
      }, (error) => {
        console.error('Error sending message:', error);
        alert("There was an error sending your message. Please try again later.");
      });
  };

  return (
    <div className="flex flex-col items-center bg-white py-12 px-6 min-h-screen">
      <h2 className="text-4xl font-bold text-gray-800 mb-8">Help & Support</h2>
      <p className="text-lg text-gray-600 mb-8 text-center max-w-2xl">
        If you have any questions or need assistance, please fill out the form below or contact us at
        <a href="mailto:sangamsubedi2610@gmail.com" className="text-green-600 hover:underline ml-1">
          sangamsubedi2610@gmail.com
        </a>.
      </p>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl bg-gray-100 p-8 rounded-lg shadow-lg"
      >
        <div className="mb-6">
          <label className="block text-gray-700 text-lg font-medium mb-2" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white text-gray-800 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Your Name"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-lg font-medium mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white text-gray-800 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Your Email"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-lg font-medium mb-2" htmlFor="message">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={form.message}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white text-gray-800 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Your Message or Inquiry"
            rows="5"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-green-600 text-white font-bold py-3 px-6 rounded-full hover:bg-green-700 transition-colors duration-300"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Help;

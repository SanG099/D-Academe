import React from "react";

const About = () => {
  return (
    <div className="flex flex-col items-center p-6 bg-gray-800 rounded-lg shadow-lg mt-10 mx-auto max-w-3xl">
      <h2 className="text-3xl font-semibold text-white mb-4">About Us</h2>
      <p className="text-white mb-4">
      At [Website Name], we believe that learning should be accessible, equitable, and free from traditional barriers. Our decentralized platform empowers individuals to take control of their education by connecting learners, educators, and content creators from around the globe in a collaborative, peer-to-peer environment.</p>
      <p className="text-white mb-4">
      We aim to revolutionize education by leveraging the power of decentralization. By removing intermediaries and central authorities, we provide a transparent, learner-centric experience that prioritizes your needs, not profits.</p>
      <p className="text-white mb-4">
      Our platform uses blockchain technology to ensure that educational content is secure, accessible, and verifiable. Courses, resources, and credentials are distributed across a decentralized network, giving you complete control over your learning journey. Earn and share credentials directly without the need for traditional institutions.</p>
      <p className="text-white">
      Whether you’re a learner, an educator, or a creator, [Website Name] offers a place to connect, collaborate, and grow. Join us in building a future where education is truly open and accessible to all.
      </p>
    </div>
  );
};

export default About;
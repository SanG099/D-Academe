import React from "react";

const About = () => {
  return (
    <div className="flex flex-col items-center p-8 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900 rounded-xl shadow-2xl mt-12 mx-auto max-w-4xl">
      <h2 className="text-4xl font-bold text-white mb-6 text-center">About Us</h2>
      <p className="text-gray-200 mb-6 text-lg leading-relaxed text-center">
        At <span className="font-semibold">D-Academe</span>, we believe that learning should be accessible, equitable, and free from traditional barriers. Our decentralized platform empowers individuals to take control of their education by connecting learners, educators, and content creators from around the globe in a collaborative, peer-to-peer environment.
      </p>
      <p className="text-gray-200 mb-6 text-lg leading-relaxed text-center">
        We aim to revolutionize education by leveraging the power of decentralization. By removing intermediaries and central authorities, we provide a transparent, learner-centric experience that prioritizes your needs, not profits.
      </p>
      <p className="text-gray-200 mb-6 text-lg leading-relaxed text-center">
        Our platform uses blockchain technology to ensure that educational content is secure, accessible, and verifiable. Courses, resources, and credentials are distributed across a decentralized network, giving you complete control over your learning journey. Earn and share credentials directly without the need for traditional institutions.
      </p>
      <p className="text-gray-200 text-lg leading-relaxed text-center">
        Whether you’re a learner, an educator, or a creator, <span className="font-semibold">D-Academe</span> offers a place to connect, collaborate, and grow. Join us in building a future where education is truly open and accessible to all.
      </p>
    </div>
  );
};

export default About;

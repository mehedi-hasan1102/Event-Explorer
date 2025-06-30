
// import { Helmet } from "react-helmet-async";


// const About = () => {
//     return (
//       <div className="max-w-3xl mx-auto px-4 py-10">
//          <Helmet>
//         <title>About| Event Explorer</title>
//       </Helmet>
//         <h1 className="text-3xl font-bold mb-4 text-primary">About Event Explorer</h1>
//         <p className="mb-4">
//           Welcome to <strong>Event Explorer</strong> – your destination to discover exciting local events and reserve your spot with ease.
//         </p>
  
//         <h2 className="text-xl font-semibold mt-6 mb-2">Terms & Conditions</h2>
//         <ul className="list-disc list-inside space-y-2 text-sm">
//           <li>Users must provide accurate information when registering or booking events.</li>
//           <li>Event availability and details are subject to change without prior notice.</li>
//           <li>We are not responsible for cancellations or no-shows by event organizers.</li>
//         </ul>
  
//         <h2 className="text-xl font-semibold mt-6 mb-2">Privacy Policy</h2>
//         <ul className="list-disc list-inside space-y-2 text-sm">
//           <li>Your email and profile details are stored securely via Firebase Authentication.</li>
//           <li>We do not sell or share your personal data with third parties.</li>
//           <li>By using our app, you consent to our data practices as outlined here.</li>
//         </ul>
//       </div>
//     );
//   };
  
//   export default About;
  import { Helmet } from "react-helmet-async";

const About = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10 flex flex-col md:flex-row items-start gap-8">
      <Helmet>
        <title>About | Event Explorer</title>
      </Helmet>

      {/* Image Section */}
      <div className="md:w-1/2 flex-shrink-0">
        <img
          src="https://i.ibb.co/KjtZT5dF/abiut.jpg" 
          alt="About Event Explorer"
          className="rounded-lg shadow-lg w-full object-cover"
        />
      </div>

      {/* Text Content Section */}
      <div className="md:w-1/2">
        <h1 className="text-3xl font-bold mb-4 text-primary">About Event Explorer</h1>
        <p className="mb-4">
          Welcome to <strong>Event Explorer</strong> – your destination to discover exciting local events and reserve your spot with ease.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">Terms & Conditions</h2>
        <ul className="list-disc list-inside space-y-2 text-sm">
          <li>Users must provide accurate information when registering or booking events.</li>
          <li>Event availability and details are subject to change without prior notice.</li>
          <li>We are not responsible for cancellations or no-shows by event organizers.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2">Privacy Policy</h2>
        <ul className="list-disc list-inside space-y-2 text-sm">
          <li>Your email and profile details are stored securely via Firebase Authentication.</li>
          <li>We do not sell or share your personal data with third parties.</li>
          <li>By using our app, you consent to our data practices as outlined here.</li>
        </ul>
      </div>
    </div>
  );
};

export default About;

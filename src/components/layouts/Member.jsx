import React, { useState } from "react";
import Container from "../Container";
import Flex from "../Flex";
import { FaTwitter, FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import Images from "../Images";

const Member = () => {
  // eslint-disable-next-line no-unused-vars
  const [teamMembers, setTeamMembers] = useState([
    {
      id: 1,
      name: "John Abraham",
      role: "Lead Consultant",
      img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop",
      socials: [
        { icon: FaTwitter, link: "" },
        { icon: FaFacebookF, link: "" },
        { icon: FaInstagram, link: "" },
        { icon: FaLinkedinIn, link: "" },
      ],
    },
    {
      id: 2,
      name: "Sarah Connor",
      role: "Medical Specialist",
      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
      socials: [
        { icon: FaTwitter, link: "" },
        { icon: FaFacebookF, link: "" },
        { icon: FaInstagram, link: "" },
        { icon: FaLinkedinIn, link: "" },
      ],
    },
    {
      id: 3,
      name: "Michael Smith",
      role: "Senior Surgeon",
      img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop",
      socials: [
        { icon: FaTwitter, link: "" },
        { icon: FaFacebookF, link: "" },
        { icon: FaInstagram, link: "" },
        { icon: FaLinkedinIn, link: "" },
      ],
    },
  ]);

  return (
    <div className="py-20 lg:py-32 bg-[#F9FBF5]">
      <Container className={"px-4 lg:px-0"}>
        <div className="text-center mb-16">
          <span className="text-[#80B500] font-nuni font-bold tracking-[0.2em] uppercase text-sm">
            Meet The Experts
          </span>
          <h3 className="text-[36px] md:text-5xl lg:text-6xl font-extrabold text-[#232323] font-int mt-3 mb-5">
            Our Team Members
          </h3>
          <p className="text-base md:text-lg text-[#546375] font-nuni max-w-2xl mx-auto">
            A highly efficient slip-ring scanner for today's diagnostic requirements, brought to you by our dedicated professionals.
          </p>
        </div>
        {/* team */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {teamMembers.map((member) => (
            <div 
              key={member.id} 
              className="group cursor-pointer flex flex-col items-center"
            >
              <div className="relative w-full aspect-4/5 rounded-4xl overflow-hidden bg-white shadow-[0_10px_30px_rgba(0,0,0,0.05)] transition-all duration-500 hover:shadow-[0_20px_40px_rgba(128,181,0,0.15)] hover:-translate-y-2">
                {/* image */}
                <Images 
                  imgSrc={member.img} 
                  className="w-full h-full object-cover bg-gray-100 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110" 
                  alt={member.name} 
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#1A1A1A]/90 via-[#1A1A1A]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                {/* social icons */}
                <div className="absolute bottom-0 left-0 w-full p-8 flex justify-center gap-4 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out z-10">
                  {member.socials.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={index}
                        href={social.link}
                        className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex justify-center items-center text-white hover:bg-[#80B500] hover:border-[#80B500] hover:scale-110 hover:-translate-y-1 transition-all duration-300 shadow-lg"
                      >
                        <Icon size={16} />
                      </a>
                    );
                  })}
                </div>
              </div>
              {/* info */}
              <div className="mt-8 text-center px-4 w-full">
                <h5 className="text-[24px] md:text-[26px] text-[#232323] font-int font-extrabold group-hover:text-[#80B500] transition-colors duration-300 truncate">
                  {member.name}
                </h5>
                <p className="text-xs md:text-sm font-nuni font-bold text-gray-500 uppercase tracking-widest mt-2 truncate">
                  {member.role}
                </p>
              </div>
              
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Member;
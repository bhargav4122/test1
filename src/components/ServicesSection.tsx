// components/landing/ServicesSection.tsx

"use client";

//import { navigation } from "@/config/navigation";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { servicesDropdown, industriesDropdown } from "@/data/navigationData"; 
import NavDropdown from "@/components/NavDropdown";
import { DropdownItem } from "@/types/navigation";

export default function ServicesSection() {
  const services =
    navigation.find((item) => item.title === "Services")?.items || [];

  return (
    <section id="services" className="py-16 bg-gray-950">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-white mb-8">Our Services</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services
            .filter((service) => service.type !== "separator")
            .map((service, index) => (
              <Link
                href={service.href}
                key={index}
                className="block bg-gray-900 hover:bg-gray-800 p-6 rounded-2xl shadow transition"
              >
                <h3 className="text-xl font-semibold text-white mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-400 text-sm">{service.description}</p>
              </Link>
            ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/services"
            className="inline-flex items-center text-blue-500 hover:text-blue-400 transition"
          >
            View All Services <ExternalLink className="ml-2 w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

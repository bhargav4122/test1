
import React, { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";

export default function Testimonials() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const testimonials = [
    {
      content: "DataSphere transformed how we understand customer behavior. The insights we've gained have directly contributed to a 28% increase in customer retention.",
      author: "Sarah Johnson",
      position: "CTO, RetailTech Inc.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&h=200"
    },
    {
      content: "Implementing DataSphere's predictive analytics has revolutionized our supply chain management. We've reduced operational costs by 22% in just six months.",
      author: "Michael Chen",
      position: "COO, Global Logistics",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&h=200"
    },
    {
      content: "The level of customer support we've received from the DataSphere team is exceptional. They've been true partners in our digital transformation journey.",
      author: "Emily Rodriguez",
      position: "Digital Director, HealthServe",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&h=200"
    }
  ];

  return (
    <section id="testimonials" className="section-padding relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[800px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-b from-primary/5 to-transparent opacity-30 blur-3xl"></div>
      </div>
      
      <div ref={ref} className="mx-auto max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-4">
            Success Stories
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Trusted by industry leaders
          </h2>
          <p className="text-lg text-muted-foreground">
            See how businesses are achieving remarkable results with our data solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`premium-card transform transition-all duration-700 ${
                inView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="relative">
                <div className="mb-6 text-lg leading-relaxed text-gray-700">
                  <span className="absolute top-0 left-0 text-6xl text-primary opacity-20">"</span>
                  <p className="relative z-10 pt-6">{testimonial.content}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                    <img
                      src={testimonial.image}
                      alt={testimonial.author}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold">{testimonial.author}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.position}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
import { useState, useEffect } from 'react'

// Icons as SVG components for better performance
const Icons = {
  Menu: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  ),
  Close: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
  ArrowRight: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
    </svg>
  ),
  ExternalLink: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  ),
  GitHub: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
  ),
  LinkedIn: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
    </svg>
  ),
  Facebook: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
    </svg>
  ),
  Mail: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
    </svg>
  ),
  MapPin: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
    </svg>
  ),
  Code: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  Server: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="2" width="20" height="8" rx="2" ry="2" /><rect x="2" y="14" width="20" height="8" rx="2" ry="2" /><line x1="6" y1="6" x2="6.01" y2="6" /><line x1="6" y1="18" x2="6.01" y2="18" />
    </svg>
  ),
  Smartphone: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="5" y="2" width="14" height="20" rx="2" ry="2" /><line x1="12" y1="18" x2="12.01" y2="18" />
    </svg>
  ),
  Layout: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="9" y1="21" x2="9" y2="9" />
    </svg>
  ),
  Cloud: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
    </svg>
  ),
  Figma: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z" /><path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z" /><path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z" /><path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z" /><path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z" />
    </svg>
  ),
  Briefcase: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  ),
  Award: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="8" r="7" /><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
    </svg>
  ),
  Users: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  Zap: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
}

// Project data
const projects = [
  {
    title: "HSQ Towers",
    type: "Real Estate Website",
    description: "A premium real estate website showcasing luxury properties with immersive galleries and lead generation features.",
    techs: ["WordPress", "PHP", "JavaScript", "CSS3"],
    link: "https://hsqtowers.com",
    image: "/images/hsqwebsite.png"
  },
  {
    title: "HSQ Tower CRM",
    type: "CRM System",
    description: "Custom-built CRM solution for real estate management with client tracking, deal pipelines, and reporting.",
    techs: ["MERN Stack", "MongoDB", "Express.js", "React", "Node.js"],
    link: "https://hsqtower.org",
    image: "/images/hsqcrm.png"
  },
  {
    title: "Vorniqo Solutions",
    type: "Agency Website",
    description: "Modern digital agency website with dynamic animations, service showcases, and client portfolio.",
    techs: ["WordPress", "Framer", "JavaScript", "Custom Theme"],
    link: "https://vorniqosolutions.com",
    image: "/images/vorniqosolutions.png"
  },
  {
    title: "UiDesignz",
    type: "Design Agency",
    description: "Creative design agency platform featuring portfolio galleries, service pages, and project showcases.",
    techs: ["WordPress", "Custom Theme", "PHP", "CSS3"],
    link: "https://uidesignz.com",
    image: "/images/uidesignz.png"
  },
  {
    title: "SwiftRide",
    type: "Mobile Application",
    description: "Ride-sharing mobile application with real-time tracking, booking system, and payment integration.",
    techs: ["React Native", "Node.js", "MongoDB", "Firebase"],
    link: "https://swiftride-frontend.vercel.app/",
    image: "/images/swiftride.png"
  },
  {
    title: "Mawsool",
    type: "Delivery Platform",
    description: "Multi-vendor delivery marketplace with order management, real-time tracking, and payment integration.",
    techs: ["MERN Stack", "Redux", "Stripe", "AWS"],
    link: "https://mawsool.tech/",
    image: "/images/mawsool.png"
  }
]


// Skills data
const skills = [
  {
    icon: <Icons.Code />,
    title: "Frontend Development",
    techs: ["React", "Next.js", "JavaScript", "TypeScript", "HTML5", "CSS3"]
  },
  {
    icon: <Icons.Server />,
    title: "Backend Development",
    techs: ["Node.js", "Express.js", "MongoDB", "REST APIs", "GraphQL"]
  },
  {
    icon: <Icons.Layout />,
    title: "CMS Development",
    techs: ["WordPress", "Framer", "Custom Themes", "WooCommerce", "Elementor"]
  },
  {
    icon: <Icons.Smartphone />,
    title: "Mobile Development",
    techs: ["React Native", "Android", "iOS", "Firebase", "Push Notifications"]
  },
  {
    icon: <Icons.Cloud />,
    title: "DevOps & Cloud",
    techs: ["Docker", "AWS", "CI/CD", "Linux", "Nginx", "Git"]
  },
  {
    icon: <Icons.Figma />,
    title: "Design Conversion",
    techs: ["Figma to Framer", "Figma to WordPress", "Figma to Code", "Responsive Design"]
  }
]

// Services data
const services = [
  {
    icon: <Icons.Figma />,
    title: "Figma to Framer",
    description: "Pixel-perfect conversion of your Figma designs to fully functional, interactive Framer websites with animations and CMS integration."
  },
  {
    icon: <Icons.Layout />,
    title: "Figma to WordPress",
    description: "Transform your Figma mockups into custom WordPress themes with full admin control, SEO optimization, and plugin integration."
  },
  {
    icon: <Icons.Code />,
    title: "Full-Stack Development",
    description: "End-to-end MERN stack applications with modern architecture, scalable database design, and secure API development."
  },
  {
    icon: <Icons.Smartphone />,
    title: "Mobile App Development",
    description: "Cross-platform mobile applications using React Native with native performance, push notifications, and app store deployment."
  },
  {
    icon: <Icons.Cloud />,
    title: "DevOps Services",
    description: "CI/CD pipelines, Docker containerization, cloud deployment, server management, and performance optimization."
  }
]

// Navbar Component
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#projects", label: "Projects" },
    { href: "#services", label: "Services" },
    { href: "#contact", label: "Contact" }
  ]

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <a href="#" className="nav-logo">BA.</a>
        <div className={`nav-menu ${menuOpen ? 'active' : ''}`}>
          {navLinks.map(link => (
            <a 
              key={link.href} 
              href={link.href} 
              className="nav-link"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a href="#contact" className="btn btn-primary nav-cta" onClick={() => setMenuOpen(false)}>
            Hire Me
          </a>
        </div>
        <button 
          className={`menu-toggle ${menuOpen ? 'active' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  )
}

// Hero Component
function Hero() {
  const roles = [
    "MERN Stack Developer",
    "WordPress Expert",
    "Framer Specialist",
    "DevOps Engineer",
    "React Native Developer"
  ]

  return (
    <section className="hero" id="home">
      <div className="hero-bg">
        <div className="hero-gradient-1"></div>
        <div className="hero-gradient-2"></div>
      </div>
      <div className="container">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="hero-badge-dot"></span>
            Available for new opportunities
          </div>
          <h1 className="hero-title">
            Hi, I'm <span className="gradient-text">Basit Ali</span>
          </h1>
          <div className="hero-roles">
            {roles.map((role, i) => (
              <span key={i} className="hero-role gradient-text">{role}</span>
            ))}
          </div>
          <p className="hero-description">
            A passionate Full-Stack Developer with 2.5+ years of experience crafting exceptional digital experiences. 
            I specialize in transforming creative visions into high-performance web and mobile applications.
          </p>
          <div className="hero-buttons">
            <a href="#projects" className="btn btn-primary">
              View My Work <Icons.ArrowRight />
            </a>
            <a href="#contact" className="btn btn-secondary">
              Get In Touch
            </a>
          </div>
          <div className="hero-stats">
            <div className="hero-stat">
              <div className="hero-stat-number">2.5+</div>
              <div className="hero-stat-label">Years Experience</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-number">30+</div>
              <div className="hero-stat-label">Projects Completed</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-number">20+</div>
              <div className="hero-stat-label">Happy Clients</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// About Component
function About() {
  return (
    <section className="about section" id="about">
      <div className="container">
        <div className="about-grid">
          <div className="about-image">
            <div className="about-image-wrapper">
              <div className="about-image-inner">
                <img src="/images/Basitali.png" alt="Basit Ali" className="about-avatar-img" />
              </div>
            </div>
          </div>
          <div className="about-content">
            <h2>About <span className="gradient-text">Me</span></h2>
            <p className="about-text">
              I'm a versatile Full-Stack Developer based in Islamabad, Pakistan, with a proven track record 
              of delivering high-quality digital solutions. My expertise spans across the MERN stack, WordPress, 
              Framer, and mobile app development with React Native.
            </p>
            <p className="about-text">
              What sets me apart is my ability to bridge the gap between design and development. 
              I excel at converting Figma designs into pixel-perfect, responsive websites—whether 
              that's building custom WordPress themes or creating interactive Framer sites.
            </p>
            <div className="about-highlights">
              <div className="about-highlight">
                <div className="about-highlight-icon"><Icons.Briefcase /></div>
                <div className="about-highlight-text">2.5+ Years Experience</div>
              </div>
              <div className="about-highlight">
                <div className="about-highlight-icon"><Icons.Award /></div>
                <div className="about-highlight-text">Industry Best Practices</div>
              </div>
              <div className="about-highlight">
                <div className="about-highlight-icon"><Icons.Users /></div>
                <div className="about-highlight-text">Client-Focused Approach</div>
              </div>
              <div className="about-highlight">
                <div className="about-highlight-icon"><Icons.Zap /></div>
                <div className="about-highlight-text">Fast Delivery</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Skills Component
function Skills() {
  return (
    <section className="section" id="skills">
      <div className="container">
        <div className="section-header">
          <div className="section-subtitle">What I Do</div>
          <h2 className="section-title">My <span className="gradient-text">Skills</span></h2>
        </div>
        <div className="skills-grid">
          {skills.map((skill, i) => (
            <div key={i} className="skill-card glass-card">
              <div className="skill-icon">{skill.icon}</div>
              <h3 className="skill-title">{skill.title}</h3>
              <div className="skill-techs">
                {skill.techs.map((tech, j) => (
                  <span key={j} className="skill-tech">{tech}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Projects Component
function Projects() {
  return (
    <section className="projects section" id="projects">
      <div className="container">
        <div className="section-header">
          <div className="section-subtitle">My Work</div>
          <h2 className="section-title">Featured <span className="gradient-text">Projects</span></h2>
        </div>
        <div className="projects-grid">
          {projects.map((project, i) => (
            <div key={i} className="project-card glass-card">
              <div className="project-image">
                <img src={project.image} alt={project.title} />
              </div>
              <div className="project-content">
                <div className="project-type">{project.type}</div>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-techs">
                  {project.techs.map((tech, j) => (
                    <span key={j} className="project-tech">{tech}</span>
                  ))}
                </div>
                <div className="project-links">
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">
                      <Icons.ExternalLink /> Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Services Component
function Services() {
  return (
    <section className="section" id="services">
      <div className="container">
        <div className="section-header">
          <div className="section-subtitle">What I Offer</div>
          <h2 className="section-title">My <span className="gradient-text">Services</span></h2>
        </div>
        <div className="services-grid">
          {services.map((service, i) => (
            <div key={i} className="service-card glass-card">
              <div className="service-icon">{service.icon}</div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Contact Component
function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    const mailtoLink = `mailto:rajaalix2022@gmail.com?subject=Portfolio Contact from ${formData.name}&body=${encodeURIComponent(formData.message)}%0A%0AFrom: ${formData.email}`
    window.open(mailtoLink)
  }

  return (
    <section className="contact section" id="contact">
      <div className="container">
        <div className="contact-grid">
          <div className="contact-info">
            <h2>Let's Work <span className="gradient-text">Together</span></h2>
            <p className="contact-text">
              Have a project in mind? I'd love to hear about it. Whether you need a website, 
              mobile app, or want to bring your Figma designs to life, let's create something amazing together.
            </p>
            <div className="contact-methods">
              <div className="contact-method">
                <div className="contact-method-icon"><Icons.Mail /></div>
                <div className="contact-method-content">
                  <h4>Email</h4>
                  <p><a href="mailto:rajaalix2022@gmail.com">rajaalix2022@gmail.com</a></p>
                </div>
              </div>
              <div className="contact-method">
                <div className="contact-method-icon"><Icons.MapPin /></div>
                <div className="contact-method-content">
                  <h4>Location</h4>
                  <p>Margala Town, Islamabad</p>
                </div>
              </div>
            </div>
          </div>
          <form className="contact-form glass-card" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="name">Your Name</label>
              <input 
                type="text" 
                id="name" 
                className="form-input" 
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="email">Your Email</label>
              <input 
                type="email" 
                id="email" 
                className="form-input" 
                placeholder="john@example.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="message">Your Message</label>
              <textarea 
                id="message" 
                className="form-textarea" 
                placeholder="Tell me about your project..."
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary form-submit">
              Send Message <Icons.ArrowRight />
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

// Footer Component
function Footer() {
  const year = new Date().getFullYear()
  
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <a href="#" className="footer-logo">Basit Ali</a>
          <div className="footer-social">
            <a href="https://github.com/DevBasitali" target="_blank" rel="noopener noreferrer" className="footer-social-link">
              <Icons.GitHub />
            </a>
            <a href="https://www.linkedin.com/in/DevBasitali" target="_blank" rel="noopener noreferrer" className="footer-social-link">
              <Icons.LinkedIn />
            </a>
            <a href="https://www.facebook.com/share/1C2VtrmruY/" target="_blank" rel="noopener noreferrer" className="footer-social-link">
              <Icons.Facebook />
            </a>
            <a href="mailto:rajaalix2022@gmail.com" className="footer-social-link">
              <Icons.Mail />
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="footer-copyright">
            © {year} Basit Ali. All rights reserved. Built with ❤️ and React.
          </p>
        </div>
      </div>
    </footer>
  )
}

// Main App Component
function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Services />
      <Contact />
      <Footer />
    </>
  )
}

export default App

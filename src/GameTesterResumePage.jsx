import { motion } from "framer-motion";
import BattlefieldBackground from "./BattlefieldBackground";
import { resumeData } from "./gameTesterResumeData";

const sectionVariants = {
  hidden: { opacity: 0, y: 48 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.08,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1]
    }
  })
};

function RevealSection({ id, eyebrow, title, copy, children }) {
  return (
    <motion.section
      id={id}
      className="section shell"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="section-heading">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h2>{title}</h2>
        </div>
        {copy ? <p className="section-copy">{copy}</p> : null}
      </div>
      {children}
    </motion.section>
  );
}

export default function App() {
  return (
    <div className="page">
      <BattlefieldBackground />
      <div className="noise" />
      <motion.div
        className="orb orb-a"
        animate={{ x: [0, 24, -16, 0], y: [0, -18, 14, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="orb orb-b"
        animate={{ x: [0, -30, 20, 0], y: [0, 22, -24, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="content-layer">
      <header className="hero shell">
        <motion.nav
          className="topbar"
          initial={{ opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="brand-block">
            <span className="brand-mark">SJ</span>
            <div>
              <p>{resumeData.name}</p>
              <span>{resumeData.title}</span>
            </div>
          </div>
          <div className="top-links">
            <a href="#skills">Skills</a>
            <a href="#experience">Experience</a>
            <a href="#education">Education</a>
            <a href="#contact">Contact</a>
          </div>
        </motion.nav>

        <div className="hero-grid">
          <motion.div
            className="hero-copy"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <p className="eyebrow">Recruiter-ready gaming resume</p>
            <h1>
              Game QA instincts,
              <span> competitive focus, and bug-hunting discipline.</span>
            </h1>
            <p className="hero-text">{resumeData.heroIntro}</p>
            <p className="hero-summary">{resumeData.summary}</p>

            <div className="hero-actions">
              <a className="button primary" href={`mailto:${resumeData.email}`}>
                Contact Me
              </a>
              <a className="button secondary" href={resumeData.linkedin} target="_blank" rel="noreferrer">
                View LinkedIn
              </a>
              <a className="button secondary" href={resumeData.github} target="_blank" rel="noreferrer">
                View GitHub
              </a>
            </div>

            <div className="hero-meta">
              <span>{resumeData.location}</span>
              <span>{resumeData.availability}</span>
              <span>Gamer Tag: {resumeData.gamerTag}</span>
            </div>
          </motion.div>

          <motion.div
            className="hero-panel"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="panel-header">
              <p className="eyebrow">Live QA profile</p>
              <span className="status-pill">Ready for testing roles</span>
            </div>

            <div className="scanner-card">
              <div className="scanner-line" />
              <div className="scanner-copy">
                <p className="micro-label">Focus Zone</p>
                <h3>Manual testing, bug capture, UI checks, gameplay consistency.</h3>
                <p>
                  Built for studios seeking a detail-first junior tester who understands player
                  feel, reports issues clearly, and keeps quality grounded in actual play.
                </p>
              </div>
            </div>

            <div className="stat-grid">
              {resumeData.stats.map((stat, index) => (
                <motion.article
                  key={stat.label}
                  className="stat-card"
                  custom={index}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </motion.article>
              ))}
            </div>
          </motion.div>
        </div>
      </header>

      <RevealSection
        id="skills"
        eyebrow="Loadout"
        title="Core skills built around practical QA thinking"
        copy="This resume highlights my skills in finding and reporting issues in a clear and simple way."
      >
        <div className="skills-grid">
          {resumeData.skills.map((group, index) => (
            <motion.article
              key={group.title}
              className="skill-card"
              variants={cardVariants}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              whileHover={{ y: -8, rotateX: -4, rotateY: 4 }}
            >
              <p className="micro-label">{String(index + 1).padStart(2, "0")}</p>
              <h3>{group.title}</h3>
              <div className="tag-list">
                {group.items.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </RevealSection>

      <RevealSection
        id="experience"
        eyebrow="Mission Log"
        title="Gaming and project experience that supports a QA path"
        copy="My experience with tools and software is presented clearly, with a modern and attractive design."
      >
        <div className="timeline">
          {resumeData.experience.map((item, index) => (
            <motion.article
              key={item.title}
              className="timeline-card"
              variants={cardVariants}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <div className="timeline-rail">
                <span />
              </div>
              <div className="timeline-body">
                <p className="eyebrow">{item.eyebrow}</p>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
                <div className="tag-list compact">
                  {item.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </RevealSection>

      <RevealSection
        id="education"
        eyebrow="Systems"
        title="Tools, platforms, and education stack"
        copy="The platform and software exposure stays grounded in the resume while the layout frames it like a futuristic operator dashboard."
      >
        <div className="systems-grid">
          <motion.article
            className="systems-card education-card"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
          >
            <p className="micro-label">Education</p>
            <h3>{resumeData.education.degree}</h3>
            <p>{resumeData.education.school}</p>
            <strong>Graduation: {resumeData.education.year}</strong>
          </motion.article>

          <motion.article
            className="systems-card"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
          >
            <p className="micro-label">Tools & Platforms</p>
            <div className="tag-list">
              {resumeData.tools.map((tool) => (
                <span key={tool}>{tool}</span>
              ))}
            </div>
          </motion.article>

          <motion.article
            className="systems-card"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
          >
            <p className="micro-label">Strengths</p>
            <ul className="strength-list">
              {resumeData.strengths.map((strength) => (
                <li key={strength}>{strength}</li>
              ))}
            </ul>
          </motion.article>
        </div>
      </RevealSection>

      <RevealSection
        id="contact"
        eyebrow="Final Checkpoint"
        title="Open to game testing opportunities"
        copy="Designed as a one-screen closing CTA so recruiters can act immediately after scanning the key signals."
      >
        <motion.div
          className="contact-card"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7 }}
        >
          <div>
            <p className="micro-label">Contact Channel</p>
            <h3>{resumeData.name}</h3>
            <p className="contact-copy">
              Junior QA-focused candidate with a hands-on gaming background, practical manual
              testing mindset, and a strong eye for bugs, friction, and consistency.
            </p>
          </div>

          <div className="contact-grid">
            <a href={`tel:${resumeData.phone.replace(/\s+/g, "")}`}>{resumeData.phone}</a>
            <a href={`mailto:${resumeData.email}`}>{resumeData.email}</a>
            <a href={resumeData.linkedin} target="_blank" rel="noreferrer">
              {resumeData.linkedinLabel}
            </a>
            <a href={resumeData.github} target="_blank" rel="noreferrer">
              {resumeData.githubLabel}
            </a>
            <span>Gamer Tag: {resumeData.gamerTag}</span>
          </div>
        </motion.div>
      </RevealSection>
      </div>
    </div>
  );
}

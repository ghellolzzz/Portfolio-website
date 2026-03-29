export const portfolioData = {
  profile: {
    name: 'Mee Ghel Fetalvero',
    title: 'Software Developer',
    tagline:
      'I build clean, scalable web applications with a focus on user experience, performance, and real-world impact.',
    intro:
      'I am a software-focused student and builder who enjoys turning ideas into responsive, production-ready web applications. I have hands-on experience building full-stack systems with secure backend architecture, clean APIs, and intuitive frontends.',
    location: 'Based in Singapore',
    availability:
      'Actively seeking internships and oppurtunities to contribute, learn, and grow in real-world development teams',
    profileImage: '/images/profile.jpeg',
    resumeUrl: '/resume.pdf',
  },
  stats: [
    { value: '8+', label: 'Total Projects Done' },
    { value: '6', label: 'Languages explored' },
    { value: '100%', label: 'Full Stack Development' },
  ],
  focusAreas: [
    'Building responsive,user-focused interfaces with clean UI/UX',
    'Designing and Developing scalable RESTful APIs',
    'Developing secure full-stack applications (JWT, validation, OWASP practices)',
    'Structuring databases and managing efficient data flow',
    'Collaborating in team environments using Git as well as involving in Agile Methodologies such as SCRUM'
  ],
  skills: [
    {
      category: 'Languages',
      items: ['JavaScript', 'JAVA', 'Python', 'SQL', 'HTML', 'CSS'],
    },
    {
      category: 'Frontend',
      items: ['React', 'Tailwind CSS', 'Vite', 'Responsive Design', 'Accessibility'],
    },
    {
      category: 'Backend',
      items: ['Node.js', 'Express', 'REST APIs', 'Authentication', 'Data Modeling'],
    },
    {
      category: 'Database & Cloud',
      items: ['Supabase', 'MySQL', 'PostgreSQL', 'neonDb', 'Render deploment'],
    },
    {
      category: 'Tools',
      items: ['Git', 'GitHub', 'Postman', 'Figma', 'VS Code'],
    },
    {
      category: 'Workflow',
      items: ['Agile teamwork', 'Problem solving', 'Debugging', 'Presentation', 'Documentation'],
    },
  ],
  projects: [
    {
      title: 'Fitness Challenge Game Comvined with Pet Elements',
      summary:
        'As part of my Backend development module project, I decided to build a fitess challenge game where users can earn points through completing challenges and adopting pets',
      impact:
        'Make users stay fit by getting motivated through engaging them with pets',
      stack: ['Javascript', 'HTML', 'CSS', 'Node.js', 'Express', 'MYSQL'],
      image: '/images/Fitness-Challenge-Game.jpg',
      links: [
        { label: 'Video Demo', url: 'https://www.youtube.com/watch?v=9QrdrXj-6O0' },
        { label: 'Repository', url: 'https://github.com/ghellolzzz/Fitness-Challenge-Game' },
      ],
      highlight: true,
    },
    {
      title: 'GreenLoop x E-COLLECT(Hackathon Project)',
      summary:
        'As part of SPs Sustainability Hackathon, we were tasked to tackle sustainability challenges in the campus. As such, we built a prototype for a QR-based reusable container that is combined with gamified features. It allows users to colect gacha rewards through collecting and unboxing blindboxes',
      impact:
        'Encourage recyling behavior and making SP campus more sustainable',
      stack: ['React', 'Tailwind CSS'],
      image: '/images/Sp-sustainability.jpg',
      links: [
        { label: 'Video Demo', url: 'https://www.youtube.com/watch?v=9QrdrXj-6O0' },
        { label: 'Repository', url: 'https://github.com/ghellolzzz/SP-sustainability' },
        { label: 'Slides Showcase', url: 'https://www.canva.com/design/DAHAjMA-0_o/vMj0NILrzrz1XBFf5qEV7w/edit?utm_content=DAHAjMA-0_o&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton' }
      ],
      highlight: false,
    },
    {
      title: 'Taskify - Task management application',
      summary:
        'As part of my continuous integration and continuous delivery module, me and my teammates decided to build a task management website. Users are able to set tasks, manage goals as well as collaborate with other people. ',
      impact:
        'Allows users to have a productive lifestyle and collaborate with other people',
      stack: ['JavaScript', 'HTML', 'CSS', 'Node JS', 'Express', 'NeonDB'],
      image: '/images/Dashboard-preview.png',
      links: [
        { label: 'Live', url: 'https://taskify-yr5w.onrender.com' },
        { label: 'Repository', url: 'https://github.com/ghellolzzz/Taskify' },
      ],
      highlight: false,
    },

  ],
  timeline: [
    {
      date: 'Mar 2026 - Present',
      title: 'Intern',
      organization: 'Aires Applied Quantum Technology (Singapore, On-site)',
      description:
        'Contributing to hands-on software tasks in a real engineering environment while applying Java and React.js in practical development work.',
    },
    {
      date: 'Sep 2025 - Present',
      title: 'International Student Club (Welfare Department)',
      organization: 'Singapore Polytechnic (Full-time, On-site)',
      description:
        'Supported event planning and welfare initiatives, and participated in team discussions and reflections to improve student engagement.',
    },
    {
      date: 'Jan 2024 - Jan 2026',
      title: 'Food Service Worker',
      organization: 'ACE Management Services Pte Ltd (Part-time, Hybrid)',
      description:
        'Gained hands-on operations experience in high-volume F&B settings, delivering consistent food and beverage service with strong communication.',
    },
    {
      date: 'Sep 2024 - Sep 2025',
      title: 'Food Server',
      organization: 'Pan Pacific Singapore (Part-time, On-site)',
      description:
        'Was attached for awhile to gain some working world experience. Had the privilege to coordinate with other while ensuring customer requests are met. ',
    },
  ],
  activities: [
    {
      title: 'International Student Club (Welfare Department)',
      role: 'CCA Member',
      period: 'Sep 2025 - Present',
      organization: 'Singapore Polytechnic',
      description:
        'Contributed to welfare planning and student support initiatives through collaborative event work and team reflection sessions.',
      highlights: [
        'Helped plan and support student-focused welfare events.',
        'Worked closely with teammates in discussions and post-event reflections.',
        'Strengthened communication and teamwork through regular committee collaboration.',
      ],
      gallery: [
        {
          src: '/images/activities/Asean-Sparks.jpeg',
          alt: 'International Student Club welfare planning session',
          caption: 'OGL of group 10 for ASEAN Sparks Hackathon collabroated with Ngee Ann Poly (2025)',
        },
        {
          src: '/images/activities/CNY-Event.jpeg',
          alt: 'International Student Club event support',
          caption: 'ISC Chinese New Year Event (2026)',
        },
        {
          src: '/images/activities/Constellation-carnival.jpeg',
          alt: 'International Student Club event support',
          caption: 'Constellation-carnival event (2026)',
        },

      ],
    },
    {
      title: 'Volleyball CCA and School Leadership',
      role: 'Team Representative and Committee Secretary',
      period: 'Secondary School Years',
      organization: 'Presbyterian High School',
      description:
        'Represented the volleyball team while taking on student leadership and community initiative responsibilities in school.',
      highlights: [
        'Volunteered for school open house outreach (2022 and 2023).',
        'Served as a volleyball committee member and secretary for communications.',
        'Participated in Project Blessing by planning activities for elderly residents.',
        'Participated in the Australian Maths Competition (2021).',
      ],

    },
  ],
  otherActivities: [
    {
      title: 'SP Sustainability Hackathon',
      role: 'Participant',
      period: 'Feb 2026',
      description:
        'Collaborated with teammates to ideate and prototype a sustainability-focused solution for campus use under hackathon constraints. Achieved 2nd place.',
      gallery: [
        {
          src: '/images/activities/Hackathon-group-photo.jpeg',
          alt: 'SP Sustainability Hackathon project showcase',
          caption: 'Group Photo with Student Development Director',
          date: 'Feb 2026',
        },
        {
          src: '/images/activities/Certificate.jpeg',
          alt: 'SP Sustainability Hackathon project showcase',
          caption: 'Certificate for achieving 2nd Place',
          date: 'Feb 2026',
        },
      ],
    },
    {
      title: 'Singapore Polytechnic Open House User',
      role: 'Student Contributor',
      period: 'Jan 2026',
      description:
        'I was able to welcome, direct and guide the visitors for School Of Computing Open House',
      gallery: [
        {
          src: '/images/activities/Open-House.jpeg',
          alt: 'Short accessibility text',
          caption: 'Singapore Poly OpenHouse 2026',
          date: 'Jan 2026',
        },
      ],
    },
    {
      title: 'Singapore Polytechnic Halloween Event',
      role: 'Scarer',
      period: 'Sept 2024',
      description:
        'Participated as a scarer in SPs annual highly anticipated halloween event, contributing to an immersive spooky experience for students and guests. ',
      gallery: [
        {
          src: '/images/activities/Halloween.jpeg',
          alt: 'Short accessibility text',
          caption: 'Singapore Poly OpenHouse 2026',
          date: 'Jan 2026',
        },
      ],
    },
    {
      title: 'Beyond SOC 2026',
      role: 'Student Contributor',
      period: 'Feb 2026',
      description:
        'I was appointed to do registration booth where I had to handle year 3 students registration for the event. On top of that, I had to manage the crowd and guide the students on where to attend next.',
      gallery: [
        {
          src: '/images/activities/Beyond-soc.jpeg',
          alt: 'Short accessibility text',
          caption: 'Beyond SOC 2026',
          date: 'Feb 2026',
        },
      ],
    },
    {
      title: 'Overseas Study Trip To HCMC',
      role: ' Participant',
      period: 'Dec 2025',
      description:
        'Participated in an overseas study trip to Ho Chi Minh City, engaging in industry visits, workshops, and cultural exchanges with both business and computing students.',
      gallery: [
        {
          src: '/images/activities/Independant -palace.jpeg',
          alt: 'Short accessibility text',
          caption: 'Group photo at Independant palace',
          date: 'Dec 2025',
        },
         {
          src: '/images/activities/Van-Lang.jpeg',
          alt: 'Short accessibility text',
          caption: 'Group photo at Van Lang University',
          date: 'Dec 2025',
        },
        {
          src: '/images/activities/AI-workshop.jpeg',
          alt: 'Short accessibility text',
          caption: 'AI workshop with Mr Mic Nguyen',
          date: 'Dec 2025',
        },
      ],
    },
  ],
  contacts: [
    { label: 'Email', value: 'mgf_21@icloud.com', url: 'mailto:mgf_21@icloud.com' },
    { label: 'LinkedIn', value: 'linkedin.com/in/meeghel', url: 'https://www.linkedin.com/in/meeghel/' },
    { label: 'GitHub', value: 'github.com/ghellolzzz', url: 'https://github.com/ghellolzzz' },
    { label: 'Resume', value: 'Open resume PDF', url: '/resume.pdf' },
  ],
  navigation: [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Journey', href: '#journey' },
    { label: 'Activities', href: '#activities' },
    { label: 'Other CCA', href: '#other-activities' },
    { label: 'Contact', href: '#contact' },
  ],
}

// ============================================================================
// PORTFOLIO_DATA — Kazi Atiqur Rahman
// Enterprise Infrastructure & Systems Engineer · Dhaka, Bangladesh
// ----------------------------------------------------------------------------
// Single self-contained data module for the single-page portfolio site.
// Plain ES module — no imports, no other exports.
//
// ★ CONTENT UPDATE GUIDE: nearly all site content lives in this one file.
//   Change text here, run `npm run build`, redeploy. See CONTENT_UPDATE_GUIDE.md.
//
// Editorial rules baked into this file:
//   1. Factual accuracy first: no invented achievements, metrics, or claims.
//   2. Ongoing items are explicitly marked as 'Ongoing'.
//   3. Cybersecurity and cloud are a DEVELOPING direction, not expertise.
//   4. The Square Group project is an ongoing deployment — no 'completed'
//      claims. [EDITABLE] comments mark spots to update as work progresses.
//   5. Missing assets render documented placeholders until real files land.
// ============================================================================

export const PORTFOLIO_DATA = {

  // ==========================================================================
  // SITE META
  // ==========================================================================
  site: {
    title: 'Kazi Atiqur Rahman — Enterprise Infrastructure & Systems Engineer',
    description: 'Portfolio of Kazi Atiqur Rahman, Assistant System Engineer at Smart Technologies (BD) Ltd. — hands-on HPE ProLiant server, enterprise storage, backup, and virtualization experience from datacenter projects across Bangladesh.',
    footerTitle: 'Enterprise Infrastructure & Systems Engineer',
    ogImage: 'assets/favicon-512.png'
  },

  // ==========================================================================
  // CONTACT
  // ==========================================================================
  contact: {
    email: 'iamatiq7@gmail.com',
    phone: '+880 1521 584 666',
    location: 'Dhaka, Bangladesh',
    linkedin: 'https://www.linkedin.com/in/iamatiq7',
    github: 'https://github.com/iamatiq7',
    portfolio: 'https://iamatiq7.github.io/Portfolio/'
  },

  // ==========================================================================
  // HERO
  // ==========================================================================
  hero: {
    name: 'Kazi Atiqur Rahman',
    title: 'Enterprise Infrastructure & Systems Engineer',
    workplace: 'Smart Technologies (BD) Ltd. · Enterprise Services',
    educationShort: 'BSc CSE, AUST',
    tagline: 'Keeping enterprise servers, storage, and backup running — one health check, one log, one rack at a time.',
    summary: 'Assistant System Engineer at Smart Technologies (BD) Ltd., working hands-on with HPE ProLiant servers, enterprise storage, SAN, and backup infrastructure inside production datacenter environments — from deployment and diagnostics to health checks and OEM case management. Alongside daily operations, I am building steadily toward deeper virtualization, cloud, and security expertise.',
    stats: [
      { value: 'Gen10–Gen12', label: 'HPE ProLiant platforms' },
      { value: 'Enterprise', label: 'backup & storage environments' },
      { value: 'HCIA-DCS', label: 'Huawei certified' },
      { value: '7', label: 'projects in my portfolio' }
    ]
  },

  // ==========================================================================
  // ABOUT
  // ==========================================================================
  about: {
    paragraphs: [
      'I am Kazi Atiqur Rahman, an Enterprise Infrastructure & Systems Engineer based in Dhaka, Bangladesh. I work as an Assistant System Engineer at Smart Technologies (BD) Ltd. within the Enterprise Services team — Server, Storage & Backup — where my daily work keeps enterprise hardware healthy, supported, and documented across customer datacenters.',
      'My path here started with a BSc in Computer Science and Engineering at Ahsanullah University of Science and Technology (2019–2024). What began as coursework in networking, operating systems, databases, and deep learning research steadily became a clear direction: the infrastructure layer itself — the servers, storage, and networks that everything else depends on. Joining Smart Technologies (BD) Ltd. in December 2024 turned that direction into daily practice.',
      'Today my focus is enterprise infrastructure: HPE ProLiant servers from Gen10 through Gen12, enterprise storage such as HPE Alletra and MSA over Fibre Channel and iSCSI, Veeam-based backup with StoreEver tape libraries, and VMware virtualization — supported by disciplined operations like AHS/IML log analysis, health checks, MoPs, and OEM case management. Exposure to real datacenter projects for organizations such as Robi, bKash, City Bank, and government platforms has shown me how enterprise deployments actually run.',
      'Looking ahead, I am deepening my virtualization and cloud knowledge while actively building toward cybersecurity — ethical hacking, network security, and infrastructure hardening are the direction I am working toward, one certification and one lab at a time. I believe the best infrastructure engineers understand not only how systems run, but how they fail.'
    ],
    highlights: [
      { icon: 'server', title: 'HPE ProLiant platforms', text: 'Hands-on work across Gen10, Gen10 Plus, Gen11, and Gen12 servers.' },
      { icon: 'database', title: 'Enterprise storage & SAN', text: 'Alletra, MSA, Fibre Channel, and iSCSI environments.' },
      { icon: 'shield', title: 'Backup infrastructure', text: 'Veeam Backup & Replication with HPE StoreEver tape libraries.' },
      { icon: 'wrench', title: 'Structured enterprise support', text: 'OEM coordination, case management, health checks, and MoPs.' },
      { icon: 'network', title: 'Datacenter project exposure', text: 'Telecom, banking, and government customer environments.' },
      { icon: 'layers', title: 'Virtualization practice', text: 'ESXi, vCenter, HA/DRS/vMotion — lab-proven and growing.' }
    ],
    quickFacts: {
      role: 'Assistant System Engineer',
      company: 'Smart Technologies (BD) Ltd.',
      dept: 'Enterprise Services',
      domain: 'Server, Storage & Backup',
      education: 'BSc CSE, AUST (2024)',
      languages: 'Bangla, English'
    },
    philosophy: 'Good infrastructure is invisible — when it works, nobody notices. My job is to make it work, and to know exactly why when it doesn\'t.'
  },

  // ==========================================================================
  // EXPERTISE — 6 categories, each with an honest note about depth level
  // ==========================================================================
  expertise: [
    {
      id: 'servers',
      title: 'Enterprise Server Infrastructure',
      short: 'HPE ProLiant and mission-critical servers — deployment, diagnostics, and lifecycle support.',
      items: [
        'HPE ProLiant DL380 Gen10', 'HPE ProLiant DL380 Gen10 Plus', 'HPE ProLiant DL380a Gen11',
        'HPE ProLiant DL360 Gen12', 'HPE ProLiant DL320 Gen12', 'HPE Superdome Flex 280',
        'HPE Synergy 480 Gen10 Plus', 'Deployment & Configuration', 'Hardware Troubleshooting',
        'CPU / Memory / RAID / NIC / HBA Diagnostics', 'SPP Firmware & BIOS Upgrades',
        'iLO Remote Management', 'AHS & IML Analysis', 'HPE SSA', 'Health Checks & Preventive Maintenance',
        'OEM Case Management', 'Warranty & RMA Support'
      ],
      note: 'Daily hands-on work — my primary area of responsibility.'
    },
    {
      id: 'storage',
      title: 'Enterprise Storage',
      short: 'Block storage and SAN — provisioning, connectivity, and datastore management.',
      items: [
        'HPE Alletra 4120', 'HPE MSA 1060 FC', 'Fibre Channel SAN', 'iSCSI',
        'VMFS Datastores', 'LUN Provisioning', 'Multipathing'
      ],
      note: 'Hands-on support and project exposure within live enterprise environments.'
    },
    {
      id: 'backup',
      title: 'Enterprise Backup',
      short: 'Data protection with Veeam and tape — jobs, monitoring, and restore fundamentals.',
      items: [
        'Veeam Backup & Replication', 'HPE StoreEver MSL Tape Library',
        'Backup Job Management', 'Backup Monitoring', 'Restore Fundamentals'
      ],
      note: 'Working knowledge built through enterprise backup projects.'
    },
    {
      id: 'virtualization',
      title: 'Virtualization',
      short: 'The VMware stack — from ESXi fundamentals to vSphere Foundation deployment exposure.',
      items: [
        'VMware ESXi', 'vCenter Server', 'VMware vSphere', 'VMware VVF', 'vMotion',
        'HA / DRS', 'vSAN', 'VDS', 'NSX', 'VMware Cloud Foundation (VCF)', 'Morpheus'
      ],
      note: 'ESXi/vCenter/HA/DRS/vMotion lab-proven; production exposure via VVF 9.0 project; vSAN, VDS, NSX, VCF, Morpheus at familiarity level.'
    },
    {
      id: 'os-network',
      title: 'OS & Networking',
      short: 'The server-side fundamentals everything else sits on.',
      items: [
        'RHEL', 'Windows Server', 'Active Directory (AD DS)', 'DNS', 'NTP',
        'TCP/IP', 'VLANs', 'Fibre Channel', 'iSCSI'
      ],
      note: 'Working knowledge — applied in labs, deployments, and daily support.'
    },
    {
      id: 'operations',
      title: 'Support & Operations',
      short: 'Process-driven enterprise support — from logs to customer reporting.',
      items: [
        'HPE OEM Coordination', 'Case Management', 'AHS / IML Analysis', 'MoP Preparation',
        'Health Check Reporting', 'Customer Communication', 'Datacenter Operations',
        'Warranty & RMA Management', 'Technical Documentation'
      ],
      note: 'Core daily practice — structured, documentation-first enterprise support.'
    }
  ],

  // ==========================================================================
  // EXPERIENCE
  // ==========================================================================
  experience: [
    {
      company: 'Smart Technologies (BD) Ltd.',
      role: 'Assistant System Engineer',
      dept: 'Enterprise Services — Server, Storage & Backup',
      period: 'Dec 2024 — Present',
      location: 'Dhaka, Bangladesh',
      summary: 'Smart Technologies (BD) Ltd. is an IT solutions and services provider in Bangladesh. Within the Enterprise Services — Server, Storage & Backup team, I support server, storage, and backup infrastructure for enterprise and government customers through hands-on hardware work, structured OEM processes, and disciplined datacenter operations.',
      responsibilities: [
        'Deploy, maintain, and troubleshoot enterprise server infrastructure across HPE ProLiant Gen10–Gen12 platforms.',
        'Administer HPE ProLiant servers — installation, hardware configuration, and post-deployment hardware support.',
        'Support enterprise storage environments including HPE Alletra and MSA arrays over Fibre Channel SAN and iSCSI.',
        'Perform firmware, BIOS, and iLO maintenance using HPE SPP and iLO remote management.',
        'Diagnose hardware faults across CPU, memory, RAID, NIC, and HBA components and perform component replacement.',
        'Analyze AHS, IML, and diagnostic logs to isolate root causes and drive issues to resolution.',
        'Coordinate with HPE OEM support — case creation, escalation, tracking, and closure.',
        'Manage warranty and RMA processes for timely component replacement.',
        'Conduct datacenter health checks and preventive maintenance with structured reporting.',
        'Prepare MoPs (Method of Procedure) and technical documentation for enterprise operations.',
        'Communicate with customers and support enterprise infrastructure projects, including ongoing backup and virtualization deployments.'
      ]
    }
  ],

  // ==========================================================================
  // PROJECTS — enterprise, datacenter, and lab work
  // Status values: 'Ongoing' | 'Enterprise Project' | 'Lab Project'
  // ==========================================================================
  projects: [
    {
      // [EDITABLE] Ongoing project — update overview/outcomes as milestones
      // land. Add photos under public/assets/projects/square-group/ when
      // available and list them in a `photos` array here.
      id: 'square-group-backup',
      title: 'Enterprise Backup Infrastructure',
      org: 'Square Group',
      category: 'Backup & Storage Infrastructure',
      status: 'Ongoing',
      tech: [
        'HPE Alletra 4120', 'HPE MSA 1060 FC', 'Veeam Backup & Replication',
        'HPE ProLiant DL360 Gen12', 'HPE ProLiant DL320 Gen12', 'HPE StoreEver MSL Tape Library'
      ],
      overview: 'Supporting an ongoing enterprise backup infrastructure deployment for Square Group — spanning HPE Alletra and MSA storage, Veeam backup software, Gen12 ProLiant servers, and a StoreEver MSL tape library for long-term retention.',
      role: 'Supporting the ongoing deployment as part of the Smart Technologies enterprise services team. Exact implementation scope and responsibilities will be detailed as the project advances.',
      outcomes: [
        'Project in progress — deployment is ongoing.',
        'Milestones, architecture details, and final outcomes will be documented here as the project advances.'
      ],
      editableNote: 'Project photographs and detailed scope will be added as the project progresses.',
      galleryFolder: 'square-group'
    },
    {
      id: 'robi-vvf-9',
      title: 'VMware vSphere Foundation 9.0 Deployment',
      org: 'Robi',
      category: 'Virtualization',
      status: 'Enterprise Project',
      tech: [
        'HPE Synergy 480 Gen10 Plus', 'VMware VVF 9.0', 'VMware vSphere & vCenter',
        'Fibre Channel SAN', 'VMFS Datastores', 'VMware Cloud Foundation (VCF) components'
      ],
      overview: 'Deployment and configuration exposure on a VMware vSphere Foundation 9.0 environment built on HPE Synergy 480 Gen10 Plus composable infrastructure — including FC SAN connectivity, VMFS datastore provisioning, and VCF-related components.',
      role: 'Deployment & configuration exposure as part of the supporting engineering team.',
      outcomes: [
        'Practical exposure to VVF 9.0 deployment workflows and HPE Synergy composable infrastructure.',
        'Hands-on experience with FC SAN connectivity and VMFS datastore provisioning in an enterprise setting.'
      ],
      galleryFolder: 'robi'
    },
    {
      id: 'superdome-flex-280-lab',
      title: 'Superdome Flex 280 Virtualization Lab',
      org: 'Self-directed Lab',
      category: 'Virtualization',
      status: 'Lab Project',
      tech: [
        'ESXi 8.0.3', 'Nested ESXi', 'vCenter Server', 'Windows Server 2025',
        'AD DS & DNS', 'FreeNAS / iSCSI', 'HA / DRS / vMotion'
      ],
      overview: 'A self-built virtualization lab on the HPE Superdome Flex 280 — running ESXi 8.0.3 with nested ESXi hosts, a vCenter server, Windows Server 2025 with AD DS and DNS, and FreeNAS providing iSCSI shared storage.',
      role: 'Designed, built, and validated the environment end-to-end.',
      outcomes: [
        'A working nested-virtualization environment for practicing vCenter deployment and HA/DRS/vMotion behavior.',
        'iSCSI-backed shared storage experience — safe to break, rebuild, and learn from.'
      ],
      galleryFolder: 'superdome-lab'
    },
    {
      id: 'ibaspp-superdome',
      title: 'iBAS++ Superdome Deployment',
      org: 'Government of Bangladesh — iBAS++',
      category: 'Server Infrastructure',
      status: 'Enterprise Project',
      tech: ['HPE Superdome Flex 280', 'Enterprise Server Deployment'],
      overview: 'Supported the deployment of HPE Superdome Flex 280 infrastructure for iBAS++ — the integrated budget and accounting system platform of the Government of Bangladesh.',
      role: 'Supporting role in deployment activities.',
      outcomes: [
        'Contributed to deployment activities for a mission-critical government platform.'
      ],
      galleryFolder: 'ibaspp'
    },
    {
      id: 'citybank-gib-dc-shifting',
      title: 'Data Center Shifting',
      org: 'City Bank PLC & GIB PLC',
      category: 'Datacenter Operations',
      status: 'Enterprise Project',
      tech: ['Datacenter Relocation', 'Infrastructure Migration', 'Enterprise Server Infrastructure'],
      overview: 'Supported datacenter shifting activities for City Bank PLC and GIB PLC — assisting with infrastructure relocation while maintaining the integrity of enterprise systems during the move.',
      role: 'Supporting role in infrastructure relocation activities.',
      outcomes: [
        'Contributed to structured datacenter relocation work for enterprise customers.'
      ],
      galleryFolder: 'citybank-gib'
    },
    {
      id: 'bkash-server-deployment',
      title: 'Server Deployment Project',
      org: 'bKash',
      category: 'Server Infrastructure',
      status: 'Enterprise Project',
      tech: ['HPE ProLiant Servers', 'Enterprise Server Deployment'],
      overview: 'Supported a server deployment project for bKash — 11 servers within the deployment scope.',
      role: 'Supporting role in server deployment activities.',
      outcomes: [
        'Supported the deployment of 11 servers as part of the project team.'
      ],
      galleryFolder: 'bkash'
    },
    {
      id: 'election-commission-pam',
      title: 'Election Commission PAM Project',
      org: 'Election Commission of Bangladesh',
      category: 'Enterprise Infrastructure',
      status: 'Enterprise Project',
      tech: ['Enterprise Server Infrastructure', 'Project Support'],
      overview: 'Provided support on the Election Commission PAM project as part of the Smart Technologies engineering team.',
      role: 'Supporting role in project activities.',
      outcomes: [
        'Contributed to project support activities for a government customer.'
      ],
      galleryFolder: 'ec-pam'
    }
  ],

  // ==========================================================================
  // SOFTWARE PROJECTS — academic & self-built applications
  // ==========================================================================
  softwareProjects: [
    {
      title: 'Easy Home',
      tech: ['C#', 'HTML', 'CSS'],
      description: 'A landlord–tenant rental web application built with C# and a clean HTML/CSS interface — designed to connect landlords and tenants and simplify property listing and rental management.'
    },
    {
      title: 'Open-OPD',
      tech: ['TypeScript', 'Java', 'DBMS'],
      description: 'An online outpatient department (OPD) patient booking system developed with TypeScript, Java, and a relational database backend.'
    },
    {
      title: 'Smart Vehicle Speed Limit Enforcement System',
      tech: ['Arduino UNO', 'C', 'Bluetooth', 'RFID', 'Servo Motor', 'Sonar Sensor'],
      description: 'An embedded prototype that measures vehicle speed with a sonar sensor and enforces limits through a servo-controlled barrier — with RFID for vehicle identification and Bluetooth for communication, programmed in C.'
    }
  ],

  // ==========================================================================
  // THESIS — undergraduate research
  // ==========================================================================
  thesis: [
    {
      title: 'Deep Learning-Based Disease Detection in Citrus Plants: A Comparative Analysis using YOLO',
      description: 'A comparative analysis of YOLO-based deep learning models for detecting diseases in citrus plants — evaluating detection performance across model variants.'
    },
    {
      title: 'Comparative Analysis of Deep CNN Models in the Classification of Pulmonary Diseases using ResNet50, InceptionV3, DenseNet201 and Ensemble',
      description: 'A comparative evaluation of ResNet50, InceptionV3, DenseNet201, and an ensemble approach for classifying pulmonary diseases — benchmarking performance across architectures.'
    }
  ],

  // ==========================================================================
  // EDUCATION
  // ==========================================================================
  education: [
    {
      degree: 'BSc in Computer Science & Engineering',
      institution: 'Ahsanullah University of Science and Technology (AUST)',
      period: '2019 – 2024',
      result: 'CGPA 3.195 / 4.00',
      note: 'Coursework across networking, operating systems, databases, and deep learning — with two thesis publications in computer-vision research.'
    },
    {
      degree: 'Higher Secondary Certificate (HSC) — Science',
      institution: 'Birshreshtha Munshi Abdur Rouf Public College',
      period: '2017 – 2019',
      result: 'GPA 5.00 / 5.00'
    },
    {
      degree: 'Secondary School Certificate (SSC) — Science',
      institution: 'Jadunath Pilot Model School and College',
      period: '2014 – 2017',
      result: 'GPA 5.00 / 5.00'
    }
  ],

  // ==========================================================================
  // CERTIFICATIONS — earned qualifications and in-progress goals
  //   featured: true → shown as the large card with certificate image support.
  //   image:     filename under public/assets/certifications/
  // ==========================================================================
  certifications: [
    {
      name: 'HCIA-DCS — Data Center System',
      issuer: 'Huawei',
      status: 'Earned',
      featured: true,
      image: 'huawei-hcia-dcs.jpg',
      description: 'Huawei Certified ICT Associate — Data Center System. Covers data center server, storage, and network fundamentals for enterprise environments.'
    },
    { name: 'HPE Standard ProLiant and Blade Server', issuer: 'HPE', status: 'Earned', note: 'Service & Solution Qualification' },
    { name: 'HPE StoreEasy ProLiant-Based NAS', issuer: 'HPE', status: 'Earned', note: 'Service & Solution Qualification' },
    { name: 'HPE Modular Storage Arrays (MSA)', issuer: 'HPE', status: 'Earned', note: 'Service & Solution Qualification' },
    { name: 'Storage Foundation Test', issuer: 'HPE', status: 'Earned', note: 'Service & Solution Qualification' },
    { name: 'HPE Alletra 4000', issuer: 'HPE', status: 'Earned', note: 'Service & Solution Qualification' },
    { name: 'HPE StoreEver ESL Gen3 Tape Libraries', issuer: 'HPE', status: 'Earned', note: 'Service & Solution Qualification' },
    { name: 'HPE StoreEver MSL Tape Libraries and 1/8 Autoloader', issuer: 'HPE', status: 'Earned', note: 'Service & Solution Qualification' },
    { name: 'HPE StoreFabric M-Series Ethernet iSCSI Switches', issuer: 'HPE', status: 'Earned', note: 'Service & Solution Qualification' },
    { name: 'HPE Aruba OS-CX', issuer: 'HPE', status: 'Earned', note: 'Service & Solution Qualification' },
    { name: 'FCIA-Fusion Server xFusion', issuer: 'HPE', status: 'Earned', note: 'Service & Solution Qualification' },
    { name: 'RHCSA — Red Hat Certified System Administrator', issuer: 'Red Hat', status: 'In Progress', note: 'Ongoing — currently preparing.' },
    { name: 'CCNA — Cisco Certified Network Associate', issuer: 'Cisco', status: 'In Progress', note: 'Ongoing — currently preparing.' }
  ],

  // ==========================================================================
  // FUTURE FOCUS — cybersecurity direction (developing, not established)
  // ==========================================================================
  futureFocus: {
    title: 'Where I\'m Headed',
    intro: 'My next chapter is about depth and security. I am deepening my virtualization and cloud knowledge while actively building a cybersecurity skill set — studying ethical hacking, network security, and infrastructure hardening, with RHCSA and CCNA preparation underway.',
    items: [
      'Cybersecurity', 'Ethical Hacking', 'Network Security', 'Linux Security',
      'Infrastructure Security', 'Vulnerability Assessment', 'Penetration Testing'
    ],
    note: 'A developing direction — actively learning, not yet an established practice area.'
  },

  // ==========================================================================
  // GALLERY — Beyond Engineering
  // [EDITABLE] To add an album after the site is live:
  //   1. Create public/assets/gallery/<album-folder>/
  //   2. Copy photos there (01.jpg, 02.jpg, …)
  //   3. Add an entry to albums below:
  //      { id: 'thesis', folder: 'thesis', title: 'Thesis Project Team',
  //        date: '2024', description: '…',
  //        photos: [{ file: '01.jpg', caption: 'Team at the final demo' }, …] }
  // The section currently renders a documented empty state.
  // ==========================================================================
  gallery: {
    title: 'Beyond Engineering',
    intro: 'Team photographs, thesis projects, workshops, and professional events — the people and moments behind the engineering journey.',
    albums: []
  },

  // ==========================================================================
  // ASSET PATHS — files under public/ are served at these paths
  // ==========================================================================
  assetPaths: {
    profile: 'assets/profile/profile-photo.jpg',
    resume: 'assets/resume/Kazi_Atiqur_Rahman_Resume.pdf',
    galleryBase: 'assets/gallery/',
    projectsBase: 'assets/projects/',
    certsBase: 'assets/certifications/'
  },

  // ==========================================================================
  // PLACEHOLDERS — one-line hints shown until real assets are added
  // ==========================================================================
  placeholders: {
    profileNote: 'Replace assets/profile/profile-photo.jpg with a professional portrait.',
    certNote: 'Upload the certificate scan to assets/certifications/huawei-hcia-dcs.jpg to display it here.',
    resumeNote: 'Replace assets/resume/Kazi_Atiqur_Rahman_Resume.pdf with the latest resume.'
  }
};

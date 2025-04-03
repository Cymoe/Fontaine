'use client';

import Link from 'next/link';

const LogoIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" rx="8" fill="#FF90BC"/>
    <path d="M12 8H20V12H16V24H12V8Z" fill="#333333"/>
  </svg>
);

interface FooterColumnProps {
  title: string;
  links: Array<{
    name: string;
    href: string;
  }>;
}

const FooterColumn = ({ title, links }: FooterColumnProps) => (
  <div className="footer-column">
    <h4>{title}</h4>
    {links.map((link) => (
      <Link key={link.name} href={link.href}>
        {link.name}
      </Link>
    ))}
  </div>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  const columns = [
    {
      id: 'product',
      title: 'Product',
      links: [
        { name: 'Features', href: '#' },
        { name: 'Pricing', href: '#' },
        { name: 'Examples', href: '#' },
      ]
    },
    {
      id: 'company',
      title: 'Company',
      links: [
        { name: 'About', href: '#' },
        { name: 'Blog', href: '#' },
        { name: 'Careers', href: '#' },
      ]
    },
    {
      id: 'resources',
      title: 'Resources',
      links: [
        { name: 'Documentation', href: '#' },
        { name: 'Support', href: '#' },
        { name: 'Contact', href: '#' },
      ]
    }
  ];

  return (
    <footer>
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo">
            <LogoIcon />
            <span>Fontaine</span>
          </div>
          <div className="footer-links">
            {columns.map((column) => (
              <FooterColumn 
                key={column.id}
                title={column.title}
                links={column.links}
              />
            ))}
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {currentYear} Fontaine. All rights reserved.</p>
          <div className="legal-links">
            <Link href="#">Privacy Policy</Link>
            <Link href="#">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
} 
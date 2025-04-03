'use client';

interface ThemeSwitcherProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export default function ThemeSwitcher({ theme, toggleTheme }: ThemeSwitcherProps) {
  return (
    <div className="theme-switch" onClick={toggleTheme}>
      {theme === 'light' ? (
        <svg className="theme-switch-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" fill="currentColor"/>
          <path d="M12 2V4M12 20V22M4 12H2M6.31412 6.31412L4.8999 4.8999M17.6859 6.31412L19.1001 4.8999M6.31412 17.69L4.8999 19.1042M17.6859 17.69L19.1001 19.1042M22 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ) : (
        <svg className="theme-switch-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21.5287 15.9294C20.7671 16.1584 19.9672 16.2778 19.1455 16.2778C14.8893 16.2778 11.4399 12.8284 11.4399 8.57221C11.4399 5.9538 12.714 3.62022 14.6991 2.14549C14.2502 2.05133 13.7894 2 13.3206 2C8.43077 2 4.46667 5.96409 4.46667 10.8539C4.46667 15.7437 8.43077 19.7078 13.3206 19.7078C17.0412 19.7078 20.2296 18.176 21.5287 15.9294Z" fill="currentColor" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        </svg>
      )}
    </div>
  );
} 
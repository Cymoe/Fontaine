'use client';

import Image from 'next/image';

export default function Demo() {
  return (
    <section className="demo">
      <div className="container">
        <div className="font-preview">
          <Image 
            src="/images/font-preview-gen.svg" 
            alt="Font generation preview" 
            width={1200} 
            height={800} 
            className="preview-image"
            priority
          />
        </div>
      </div>
    </section>
  );
} 